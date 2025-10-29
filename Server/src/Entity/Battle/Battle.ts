import type { AttributeKey } from "src/InterFacesEnumsAndTypes/Enums";
import type { GameTimeInterface } from "../../InterFacesEnumsAndTypes/Time";
import { statMod } from "../../Utils/statMod";
import { BuffsAndDebuffsEnum } from "../BuffsAndDebuffs/enum";
import { buffsAndDebuffsRepository } from "../BuffsAndDebuffs/repository";
import type { Character } from "../Character/Character";
import { trainAttribute } from "../Character/Subclass/Stats/train";
import type { Location } from "../Location/Location";
import type { Party } from "../Party/Party";
import type { TurnResult } from "../Skill/types";
import { BattleReport } from "./BattleReport";
import { getPlayableSkill } from "./getPlayableSkill";
import { battleTypeConfig, type BattleType } from "./types";
import { activateBreathingSkillTurnPassive } from "../BreathingSkill/activeBreathingSkill";

export class Battle {
  id: string;
  isOngoing: boolean;
  partyA: Party;
  partyB: Party;
  battleReport: BattleReport;
  location: Location;
  gameTime: GameTimeInterface;
  battleType: BattleType;
  allParticipants: Character[];
  constructor(
    partyA: Party,
    partyB: Party,
    location: Location,
    gameTime: GameTimeInterface,
    battleType: BattleType,
  ) {
    this.id = Bun.randomUUIDv7();
    this.isOngoing = true;
    this.partyA = partyA;
    this.partyB = partyB;
    this.battleReport = new BattleReport(
      partyA,
      partyB,
      location.id,
      battleType,
    );
    this.location = location;
    this.gameTime = gameTime;
    this.battleType = battleType;
    this.allParticipants = [
      ...partyA.characters.filter(
        (char): char is Character => char !== "none" && !char.vitals.isDead,
      ),
      ...partyB.characters.filter(
        (char): char is Character => char !== "none" && !char.vitals.isDead,
      ),
    ];
  }

  async startBattle() {
    // Battle Loop should return Result of the Battle along with TurnReport[]
    console.log("\n========== BATTLE STARTED ==========");
    console.log(`Party A: ${this.partyA.characters.filter(c => c !== "none").map(c => c.name.en).join(", ")}`);
    console.log(`Party B: ${this.partyB.characters.filter(c => c !== "none").map(c => c.name.en).join(", ")}`);
    console.log("=====================================\n");

    await this.battleLoop();
  }

  private async battleLoop() {
    if (this.allParticipants.length === 0)
      throw new Error("No participants found in the battle.");

    this.isOngoing = true;
    let turnCount = 0;

    while (this.isOngoing) {
      if (turnCount >= 100) {
        this.isOngoing = false;
        console.log(`\n--- Battle ended due to turn limit (100 turns) ---`);
        console.log(`Party A survivors:`);
        this.partyA.characters.filter(c => c !== "none").forEach(c => {
          console.log(`  - ${c.name.en}: HP ${c.vitals.hp.current}/${c.vitals.hp.max}${c.vitals.isDead ? ' (DEAD)' : ''}`);
        });
        console.log(`Party B survivors:`);
        this.partyB.characters.filter(c => c !== "none").forEach(c => {
          console.log(`  - ${c.name.en}: HP ${c.vitals.hp.current}/${c.vitals.hp.max}${c.vitals.isDead ? ' (DEAD)' : ''}`);
        });
        break;
      }

      for (const actor of this.allParticipants) {
        if (!actor || actor.vitals.isDead) {
          continue;
        }

        if (updateAbGaugeAndDecideTurnTaking(actor)) {
          turnCount++;
          console.log(`\n--- Turn ${turnCount} ---`);
          console.log(`${actor.name.en} (HP: ${actor.vitals.hp.current}/${actor.vitals.hp.max}) takes turn`);

          const canTakeTurn = resolveBuffAndDebuff(actor);
          if (canTakeTurn.ableToTakesTurn) {
            const actorTurnResult = this.startActorTurn(actor);
            console.log(`→ ${actorTurnResult.content.en}`);
            this.battleReport.addTurnResult(actorTurnResult);

            this.allParticipants.push(
              this.allParticipants.shift() as Character,
            );
          } else {
            const turnResult: TurnResult = {
              content: {
                en: `${actor.name.en} cannot take action due to ${buffsAndDebuffsRepository[canTakeTurn.reason!].name.en}.`,
                th: `${actor.name.th} ไม่สามารถเข้าสู่เทิร์นได้เพราะ ${buffsAndDebuffsRepository[canTakeTurn.reason!].name.th}.`,
              },
              actor: {
                actorId: actor.id,
                effect: []
              },
              targets: []
            }
            console.log(`→ ${turnResult.content.en}`);
            this.battleReport.addTurnResult(turnResult);
          }

          const battleStatus = this.checkBattleEnd();
          if (
            battleStatus.status === BattleStatus.END ||
            battleStatus.status === BattleStatus.DRAW_END
          ) {
            this.isOngoing = false;

            // Log remaining HP for all characters
            console.log(`\n--- Battle End ---`);
            console.log(`Party A survivors:`);
            this.partyA.characters.filter(c => c !== "none").forEach(c => {
              console.log(`  - ${c.name.en}: HP ${c.vitals.hp.current}/${c.vitals.hp.max}${c.vitals.isDead ? ' (DEAD)' : ''}`);
            });
            console.log(`Party B survivors:`);
            this.partyB.characters.filter(c => c !== "none").forEach(c => {
              console.log(`  - ${c.name.en}: HP ${c.vitals.hp.current}/${c.vitals.hp.max}${c.vitals.isDead ? ' (DEAD)' : ''}`);
            });
            console.log(`Winning party: ${battleStatus.winner?.leader.name.en}'s party`);

            this.handleBattleEnd(battleStatus);
            this.battleReport.setOutcome(
              battleStatus.winner ? battleStatus.winner.partyID : "",
              {
                en: battleStatus.status === BattleStatus.DRAW_END ? "A battle ended in a draw" : `${battleStatus.winner?.leader.name.en} 's party win the battle!`,
                th: battleStatus.status === BattleStatus.DRAW_END ? "การต่อสู้จบลงด้วยการเสมอกัน" : `ปาร์ตี้ของ ${battleStatus.winner?.leader.name.th} ชนะในการต่อสู้!`
              },
              // TODO: Rewards calculation placeholder
              {},
            )
            break;
          }
        }
      }

      if (!this.isOngoing) {
        break;
      }
    }
  }

  startActorTurn(actor: Character): TurnResult {
    activateBreathingSkillTurnPassive(actor.id);

    actor.replenishResource();

    // Log current resources
    console.log(`  Resources: HP ${actor.vitals.hp.current}/${actor.vitals.hp.max} | MP ${actor.vitals.mp.current}/${actor.vitals.mp.max} | SP ${actor.vitals.sp.current}/${actor.vitals.sp.max}`);
    const elementResources = Object.entries(actor.resources)
      .filter(([_, value]) => value > 0)
      .map(([key, value]) => `${key}=${value}`)
      .join(' ');
    if (elementResources) console.log(`  Elemental Resources: ${elementResources}`);

    // Determine which party the actor belongs to (needed for conditional deck check)
    const isPartyA = this.partyA.characters.includes(actor);
    const actorParty = isPartyA ? this.partyA : this.partyB;

    // Check: If a character can play any cards
    const {skill, skillLevel} = getPlayableSkill(actor, actorParty);
    console.log(`  Selected Skill: ${skill.name.en} (Level ${skillLevel})`);
    // Consume Resource
    for (const consume of skill.consume.elements) {
      actor.resources[consume.element] -= consume.value;
    }
    skill.consume.hp && (actor.vitals.decHp(skill.consume.hp));
    skill.consume.mp && (actor.vitals.decMp(skill.consume.mp));
    skill.consume.sp && (actor.vitals.decSp(skill.consume.sp));

    // Execute
    const userParty = isPartyA
      ? this.partyA.characters.filter(
          (char): char is Character => char !== "none",
        )
      : this.partyB.characters.filter(
          (char): char is Character => char !== "none",
        );
    const targetParty = isPartyA
      ? this.partyB.characters.filter(
          (char): char is Character => char !== "none",
        )
      : this.partyA.characters.filter(
          (char): char is Character => char !== "none",
        );

    const turnResult = skill.exec(actor, userParty, targetParty, skillLevel, this.location.id);
    // Produce Resource

    for (const produce of skill.produce.elements) {
      const amountProduced =
        Math.floor(Math.random() * (produce.max - produce.min + 1)) + produce.min;
      actor.resources[produce.element] += amountProduced;
    }
    skill.produce.hp && actor.vitals.incHp(skill.produce.hp);
    skill.produce.mp && actor.vitals.incMp(skill.produce.mp);
    skill.produce.sp && actor.vitals.incSp(skill.produce.sp);

    return turnResult;
  }

  checkBattleEnd(): {
    status: BattleStatus;
    winner?: Party;
    defeated?: Party;
  } {
    const allPartyADead = this.partyA.isAllDead();
    const allPartyBDead = this.partyB.isAllDead();

    if (allPartyADead && allPartyBDead) {
      console.log(`Both parties are dead. The battle ends in a draw.`);
      return { status: BattleStatus.DRAW_END };
    }

    if (allPartyADead) {
      console.log(`Party A is dead. Party B wins.`);
      return {
        status: BattleStatus.END,
        winner: this.partyB,
        defeated: this.partyA,
      };
    }

    if (allPartyBDead) {
      console.log(`Party B is dead. Party A wins.`);
      return {
        status: BattleStatus.END,
        winner: this.partyA,
        defeated: this.partyB,
      };
    }

    return { status: BattleStatus.CONTINUE };
  }

  handleBattleEnd(battleStatus: {
    status: BattleStatus;
    winner?: Party;
    defeated?: Party;
  }) {
    for (const actor of this.allParticipants) {
      actor.clearBuffAndDebuff();
      actor.attribute.clearBattle();
      actor.artisans.clearBattle();
      actor.proficiencies.clearBattle();
      actor.battleStats.clearBattle();
      actor.elements.clearBattle();
    }

    const battleType = battleTypeConfig[this.battleType];

    if (battleType.allowXP && battleStatus.winner && battleStatus.defeated) {
      this.battleEndedCalc(
        battleStatus.status,
        battleStatus.winner,
        battleStatus.defeated,
      );
    }

    if (battleType.allowLoot) {
    }

    if (!battleType.allowDeath) {
      for (const actor of this.allParticipants) {
        if (actor.vitals.isDead) {
          actor.vitals.incHp(1);
        }
      }
    }

    if (battleType.resetHealth) {
      for (const actor of this.allParticipants) {
        actor.vitals.incHp(actor.vitals.hp.max);
        actor.vitals.incMp(actor.vitals.mp.max);
        actor.vitals.incSp(actor.vitals.sp.max);
      }
    }
  }

  private battleEndedCalc(
    battleStatus: BattleStatus,
    winnerParty: Party,
    defeatedParty: Party,
  ) {
    const possibleAttributesToBeTrained: AttributeKey[] = [
      "charisma",
      "luck",
      "intelligence",
      "leadership",
      "vitality",
      "willpower",
      "planar",
      "control",
      "dexterity",
      "agility",
      "strength",
      "endurance",
    ];

    const timesOfTraining = 3;
    const { winnerExp, loserExp } = this.experienceCalculation(
      battleStatus,
      winnerParty,
      defeatedParty,
    );

    const trainCharacters = (party: Party, exp: number) => {
      for (const character of party.characters.filter((c) => c !== undefined && c !== "none") as Character[]) {
        for (let i = 0; i < timesOfTraining; i++) {
          let trainedAttribute =
            possibleAttributesToBeTrained[
              Math.floor(Math.random() * possibleAttributesToBeTrained.length)
            ];
            if (trainedAttribute) {
              trainAttribute(character, trainedAttribute, exp);
            }
        }
      }
    };

    trainCharacters(winnerParty, winnerExp);
    trainCharacters(defeatedParty, loserExp);

    // TODO: Implement looting system
  }

  private getPartyStrength(party: Party): number {
    let partyLevel = 0;
    let partyLength = 0;
    for (let i = 0; i < party.characters.length; i++) {
      if (party.characters[i]) {
        break;
      } else {
        if (party.characters[i]) {
          partyLevel += (party.characters[i] as Character).level;
          partyLength++;
        }
      }
    }
    return partyLevel / partyLength;
  }

  private experienceCalculation(
    battleStatus: BattleStatus,
    winner: Party,
    loser: Party,
  ): { winnerExp: number; loserExp: number } {
    let baseExp = 30;

    let winner_ps = this.getPartyStrength(winner);
    let loser_ps = this.getPartyStrength(loser);

    let party_a_base_exp: number;
    let party_b_base_exp: number;
    let diff: number;

    if (winner_ps > loser_ps) {
      diff = winner_ps - loser_ps;
      let scale = diff * 0.05;
      party_a_base_exp = Math.max(baseExp - baseExp * scale, baseExp * 0.1);
      party_b_base_exp = baseExp + baseExp * scale;
    } else if (winner_ps < loser_ps) {
      diff = loser_ps - winner_ps;
      let scale = diff * 0.05;
      party_a_base_exp = baseExp + baseExp * scale;
      party_b_base_exp = Math.max(baseExp - baseExp * scale, baseExp * 0.1);
    } else {
      party_a_base_exp = baseExp;
      party_b_base_exp = baseExp;
    }

    let winnerExp = Math.floor(party_a_base_exp);
    let loserExp = Math.floor(party_b_base_exp);

    if (battleStatus === BattleStatus.DRAW_END) {
      winnerExp = Math.floor(winnerExp / 2);
      loserExp = Math.floor(loserExp / 2);
    } else {
      winnerExp = Math.floor(winnerExp);
      loserExp = Math.floor(loserExp / 2);
    }

    return { winnerExp, loserExp };
  }
}

enum BattleStatus {
  CONTINUE = "CONTINUE",
  END = "END",
  DRAW_END = "DRAW_END",
}

function updateAbGaugeAndDecideTurnTaking(actor: Character): boolean {
  let abGaugeIncrement = Math.max(
    statMod(actor.attribute.getStat("agility").total),
    1,
  );

  actor.abGauge += abGaugeIncrement;

  if (actor.abGauge >= 10) {
    actor.abGauge = 0;
    return true;
  }

  return false;
}

function resolveBuffAndDebuff(actor: Character): {
  ableToTakesTurn: boolean;
  reason: BuffsAndDebuffsEnum | undefined;
} {
  let ableToTakesTurn = true;
  let reason;

  for (const [buffsOrDebuffs, entry] of actor.buffsAndDebuffs.entry) {
    if (entry.value === 0 && entry.permValue === 0) {
      return { ableToTakesTurn, reason };
    }

    if (
      !buffsAndDebuffsRepository[buffsOrDebuffs].resolver(actor) &&
      ableToTakesTurn
    ) {
      ableToTakesTurn = false;
      reason = buffsOrDebuffs;
    }
  }

  return {
    ableToTakesTurn,
    reason,
  };
}

