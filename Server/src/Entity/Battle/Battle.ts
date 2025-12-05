import type { AttributeKey } from "src/InterFacesEnumsAndTypes/Enums";
import type { GameTimeInterface } from "../../InterFacesEnumsAndTypes/Time";
import { statMod } from "../../Utils/statMod";
import { roll } from "../../Utils/Dice";
import {
  BuffAndDebuffEnum,
  BuffEnum,
  DebuffEnum,
} from "../BuffsAndDebuffs/enum";
import {
  buffsAndDebuffsRepository,
  buffsRepository,
  debuffsRepository,
} from "../BuffsAndDebuffs/repository";
import type { Character } from "../Character/Character";
import {
  trainAttribute,
  trainProficiency,
} from "../Character/Subclass/Stats/train";
import { skillRepository } from "../Skill/repository";
import { getExpNeededForSkill } from "../Location/Events/handlers/train/getExpNeeded";
import { gainStatTracker } from "../Location/Events/handlers/train/statTracker";
import { rollTwenty } from "../../Utils/Dice";
import type { SkillId } from "../Skill/enums";
import type { Location } from "../Location/Location";
import type { Party } from "../Party/Party";
import type { TurnResult } from "../Skill/types";
import { BattleReport, type BattleRewards } from "./BattleReport";
import { getPlayableSkill } from "./getPlayableSkill";
import { battleTypeConfig, type BattleType } from "./types";
import { activateBreathingSkillTurnPassive } from "../BreathingSkill/activeBreathingSkill";
import Report from "../../Utils/Reporter";
import { BattleStatistics } from "./BattleStatistics";
import {
  setBattleStatistics,
  setBattle,
  setCurrentBattleId,
} from "./BattleContext";
import { traitRepository } from "src/Entity/Trait/repository";
import { BasicSkillId } from "../Skill/enums";
import { resolveDamage } from "./damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { handleTrainSkill } from "../Location/Events/handlers/train/skill";
import { dropProcess } from "./dropProcess";

interface ActiveTrap {
  damage: number;
  setterId: string; // Who set the trap
  setterPartyId: string; // Which party set it ("partyA" or "partyB")
}

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
  battleStatistics: BattleStatistics;
  activeTraps: ActiveTrap[] = []; // Battle-level traps (like Bear Trap)
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
    // Initialize battle statistics
    this.battleStatistics = new BattleStatistics();
    for (const character of this.allParticipants) {
      this.battleStatistics.initializeCharacter(character);
    }
  }

  async startBattle() {
    // Battle Loop should return Result of the Battle along with TurnReport[]
    Report.debug("\n========== BATTLE STARTED ==========");
    Report.debug(
      `Party A: ${this.partyA.characters
        .filter((c) => c !== "none")
        .map((c) => c.name.en)
        .join(", ")}`,
    );
    Report.debug(
      `Party B: ${this.partyB.characters
        .filter((c) => c !== "none")
        .map((c) => c.name.en)
        .join(", ")}`,
    );
    Report.debug("=====================================\n");

    // Set battle statistics and battle instance in context for skills to access
    setBattleStatistics(this.battleStatistics, this.id);
    setBattle(this, this.id);

    try {
      await this.battleLoop();
    } finally {
      // Clear battle statistics and battle instance from context when battle ends
      setBattleStatistics(null, this.id);
      setBattle(null, this.id);
    }
  }

  private async battleLoop() {
    if (this.allParticipants.length === 0)
      throw new Error("No participants found in the battle.");

    this.isOngoing = true;
    let turnCount = 0;

    while (this.isOngoing) {
      if (turnCount >= 200) {
        this.isOngoing = false;
        Report.debug(`\n--- Battle ended due to turn limit (200 turns) ---`);
        Report.debug(`Party A survivors:`);
        this.partyA.characters
          .filter((c) => c !== "none")
          .forEach((c) => {
            Report.debug(
              `  - ${c.name.en}: HP ${c.vitals.hp.current}/${c.vitals.hp.max}${c.vitals.isDead ? " (DEAD)" : ""}`,
            );
          });
        Report.debug(`Party B survivors:`);
        this.partyB.characters
          .filter((c) => c !== "none")
          .forEach((c) => {
            Report.debug(
              `  - ${c.name.en}: HP ${c.vitals.hp.current}/${c.vitals.hp.max}${c.vitals.isDead ? " (DEAD)" : ""}`,
            );
          });
        break;
      }

      for (const actor of this.allParticipants) {
        if (!actor || actor.vitals.isDead) {
          continue;
        }

        if (updateAbGaugeAndDecideTurnTaking(actor)) {
          turnCount++;
          Report.debug(`\n--- Turn ${turnCount} ---`);
          Report.debug(
            `${actor.name.en} (HP: ${actor.vitals.hp.current}/${actor.vitals.hp.max}) takes turn`,
          );

          const alliesParty = this.partyA.characters.includes(actor)
            ? this.partyA
            : this.partyB;
          const enemiesParty =
            alliesParty === this.partyA ? this.partyB : this.partyA;
          const allies = alliesParty.characters.map((c) => {
            return c;
          });
          const enemies = enemiesParty.characters.map((e) => {
            return e;
          });

          for (const [trait, amount] of actor.traits) {
            traitRepository[trait].config.beforeTurn?.(
              actor,
              amount,
              allies,
              enemies,
            );
          }

          const canTakeTurn = resolveBuffAndDebuff(actor);
          if (canTakeTurn.ableToTakesTurn) {
            const traitContext = new Map();
            for (const [trait, value] of actor.traits) {
              traitRepository[trait].config.onTurn?.(
                actor,
                value,
                allies,
                enemies,
                traitContext,
              );
            }
            // Record HP before turn for all characters (to track healing to others)
            const hpBeforeTurn = new Map<string, number>();
            for (const char of this.allParticipants) {
              if (!char.vitals.isDead) {
                hpBeforeTurn.set(char.id, char.vitals.hp.current);
                this.battleStatistics.recordHpBeforeTurn(char);
              }
            }

            const actorTurnResult = this.startActorTurn(actor);

            for (const [trait, value] of actor.traits) {
              traitRepository[trait].config.onEndTurn?.(
                actor,
                value,
                allies,
                enemies,
                traitContext,
              );
            }

            // Record HP after turn and calculate healing for all characters
            for (const char of this.allParticipants) {
              if (!char.vitals.isDead) {
                const beforeHp =
                  hpBeforeTurn.get(char.id) ?? char.vitals.hp.current;
                const afterHp = char.vitals.hp.current;
                const hpChange = afterHp - beforeHp;

                if (hpChange > 0) {
                  // Healing received
                  this.battleStatistics.recordHpAfterTurn(char);

                  // If this character is the actor and healed themselves, record as healing done
                  if (char.id === actor.id) {
                    const stats = this.battleStatistics.getCharacterStats(
                      actor.id,
                    );
                    if (stats) {
                      stats.healingDone += hpChange;
                    }
                  } else {
                    // Healing done to others by the actor
                    this.battleStatistics.recordHealingDone(
                      actor.id,
                      char.id,
                      hpChange,
                    );
                  }
                }
              }
            }

            Report.debug(`→ ${actorTurnResult.content.en}`);
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
                effect: [],
              },
              targets: [],
            };
            Report.debug(`→ ${turnResult.content.en}`);
            this.battleReport.addTurnResult(turnResult);
          }

          const battleStatus = this.checkBattleEnd();
          if (
            battleStatus.status === BattleStatus.END ||
            battleStatus.status === BattleStatus.DRAW_END
          ) {
            this.isOngoing = false;

            // Log remaining HP for all characters
            Report.debug(`\n--- Battle End ---`);
            Report.debug(`Party A survivors:`);
            this.partyA.characters
              .filter((c) => c !== "none")
              .forEach((c) => {
                Report.debug(
                  `  - ${c.name.en}: HP ${c.vitals.hp.current}/${c.vitals.hp.max}${c.vitals.isDead ? " (DEAD)" : ""}`,
                );
              });
            Report.debug(`Party B survivors:`);
            this.partyB.characters
              .filter((c) => c !== "none")
              .forEach((c) => {
                Report.debug(
                  `  - ${c.name.en}: HP ${c.vitals.hp.current}/${c.vitals.hp.max}${c.vitals.isDead ? " (DEAD)" : ""}`,
                );
              });
            Report.debug(
              `Winning party: ${battleStatus.winner?.leader.name.en}'s party`,
            );

            const dropResults = this.handleBattleEnd(battleStatus);

            // Build rewards from drop results and exp
            const rewards = this.buildRewards(
              battleStatus.winner,
              battleStatus.defeated,
              dropResults,
            );

            this.battleReport.setOutcome(
              battleStatus.winner ? battleStatus.winner.partyID : "",
              {
                en:
                  battleStatus.status === BattleStatus.DRAW_END
                    ? "A battle ended in a draw"
                    : `${battleStatus.winner?.leader.name.en} 's party win the battle!`,
                th:
                  battleStatus.status === BattleStatus.DRAW_END
                    ? "การต่อสู้จบลงด้วยการเสมอกัน"
                    : `ปาร์ตี้ของ ${battleStatus.winner?.leader.name.th} ชนะในการต่อสู้!`,
              },
              rewards,
            );
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
    reduceCooldowns(actor);

    actor.replenishResource();

    // Log current resources
    Report.debug(
      `  Resources: HP ${actor.vitals.hp.current}/${actor.vitals.hp.max} | MP ${actor.vitals.mp.current}/${actor.vitals.mp.max} | SP ${actor.vitals.sp.current}/${actor.vitals.sp.max}`,
    );
    const elementResources = Object.entries(actor.resources)
      .filter(([_, value]) => value > 0)
      .map(([key, value]) => `${key}=${value}`)
      .join(" ");
    if (elementResources)
      Report.debug(`  Elemental Resources: ${elementResources}`);

    // Determine which party the actor belongs to (needed for conditional deck check)
    const isPartyA = this.partyA.characters.includes(actor);
    const actorParty = isPartyA ? this.partyA : this.partyB;

    // Get a skill to use
    const { skill, skillLevel } = getPlayableSkill(actor, actorParty);
    Report.debug(`  Selected Skill: ${skill.name.en} (Level ${skillLevel})`);

    // Check for active traps - trigger if enemy uses physical attack
    // Only check if actor is in the party that didn't set the trap
    const actorPartyId = isPartyA ? "partyA" : "partyB";

    // Check if this is a physical attack (basicAttack is always physical)
    // For now, we only check basicAttack. Can be enhanced later to check other physical skills.
    const isPhysicalAttack = skill.id === BasicSkillId.Basic;

    if (isPhysicalAttack && this.activeTraps.length > 0) {
      // Find a trap set by the opposing party
      const trapIndex = this.activeTraps.findIndex(
        (trap) => trap.setterPartyId !== actorPartyId,
      );
      if (trapIndex !== -1) {
        const trap = this.activeTraps[trapIndex]!;

        // Deal trap damage
        const trapDamageOutput = {
          damage: trap.damage,
          hit: 999, // Auto-hit
          crit: 0,
          type: DamageType.pierce,
          isMagic: false,
          trueDamage: false, // Can be mitigated
        };

        // Get the trap setter for damage attribution
        const trapSetter = this.allParticipants.find(
          (c) => c.id === trap.setterId,
        );
        const attackerId = trapSetter?.id || actor.id; // Use trap setter if found, else fallback

        const trapResult = resolveDamage(
          attackerId,
          actor.id,
          trapDamageOutput,
          this.location.id,
        );

        Report.debug(
          `  Bear Trap triggered! ${actor.name.en} takes ${trapResult.actualDamage} pierce damage!`,
        );

        // Remove the trap (only one trap triggers per attack)
        this.activeTraps.splice(trapIndex, 1);
      }
    }

    // Apply cooldown if skill has one
    if (skill.cooldown > 0) {
      actor.cooldowns.set(skill.id, skill.cooldown);
    }

    // Record turn and skill used
    this.battleStatistics.recordTurn(actor.id, skill.id as string);
    // Consume Resource
    for (const consume of skill.consume.elements) {
      actor.resources[consume.element] -= consume.value;
    }
    skill.consume.hp && actor.vitals.decHp(skill.consume.hp);
    skill.consume.mp && actor.vitals.decMp(skill.consume.mp);
    skill.consume.sp && actor.vitals.decSp(skill.consume.sp);

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

    // Set current battle ID for skill execution context
    setCurrentBattleId(this.id);
    let turnResult: TurnResult;
    try {
      turnResult = skill.exec(
        actor,
        userParty,
        targetParty,
        skillLevel,
        this.location.id,
      );
    } finally {
      // Clear current battle ID after skill execution
      setCurrentBattleId(null);
    }

    // Produce Resource

    for (const produce of skill.produce.elements) {
      const amountProduced =
        Math.floor(Math.random() * (produce.max - produce.min + 1)) +
        produce.min;
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
      Report.debug(`Both parties are dead. The battle ends in a draw.`);
      return { status: BattleStatus.DRAW_END };
    }

    if (allPartyADead) {
      Report.debug(`Party A is dead. Party B wins.`);
      return {
        status: BattleStatus.END,
        winner: this.partyB,
        defeated: this.partyA,
      };
    }

    if (allPartyBDead) {
      Report.debug(`Party B is dead. Party A wins.`);
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
  }): ReturnType<typeof dropProcess> | null {
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

    // Process loot and drops, return results for reporting
    let dropResults: ReturnType<typeof dropProcess> | null = null;
    if (battleType.allowLoot && battleStatus.winner && battleStatus.defeated) {
      dropResults = dropProcess(
        battleStatus.winner,
        battleStatus.defeated,
        this.battleType,
      );
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

    return dropResults;
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

    const trainCharacter = (character: Character, exp: number) => {
      // 1. Train attributes (existing system)
      for (let i = 0; i < timesOfTraining; i++) {
        let trainedAttribute =
          possibleAttributesToBeTrained[
            Math.floor(Math.random() * possibleAttributesToBeTrained.length)
          ];
        if (trainedAttribute) {
          trainAttribute(character, trainedAttribute, exp);
        }
      }

      // 2. Train skills that were used in battle
      for (const skill of character.activeSkills) {
        const skillDef = skillRepository[skill.id];
        const expNeeded = getExpNeededForSkill(skill.level, skillDef.tier);
        const expGained =
          rollTwenty().total +
          statMod(character.attribute.getStat("intelligence").total);

        skill.exp += expGained;
        if (skill.exp >= expNeeded) {
          skill.exp -= expNeeded;
          skill.level += 1;
          const statTrackGain = Math.max(statMod(skill.level), 0) + 1;
          gainStatTracker(character, statTrackGain);
        }
      }

      for (const skill of character.conditionalSkills) {
        const skillDef = skillRepository[skill.id];
        const expNeeded = getExpNeededForSkill(skill.level, skillDef.tier);
        const expGained =
          rollTwenty().total +
          statMod(character.attribute.getStat("intelligence").total);

        skill.exp += expGained;
        if (skill.exp >= expNeeded) {
          skill.exp -= expNeeded;
          skill.level += 1;
          const statTrackGain = Math.max(statMod(skill.level), 0) + 1;
          gainStatTracker(character, statTrackGain);
        }
      }

      // 3. Train proficiency of the weapon they're wielding
      const weapon = character.getWeapon();
      if (weapon) {
        trainProficiency(character, weapon.weaponType, exp);
      }
    };

    const trainCharacters = (party: Party, exp: number) => {
      for (const character of party.characters.filter(
        (c) => c !== undefined && c !== "none",
      ) as Character[]) {
        trainCharacter(character, exp);
      }
    };

    trainCharacters(winnerParty, winnerExp);
    trainCharacters(defeatedParty, loserExp);

    // Note: dropProcess is now called in handleBattleEnd to capture results for reporting
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

  /**
   * Build rewards object from drop results and experience
   * Maps drop process results to BattleRewards format
   */
  private buildRewards(
    winnerParty?: Party,
    defeatedParty?: Party,
    dropResults: ReturnType<typeof dropProcess> | null = null,
  ): Record<string, BattleRewards> {
    const rewards: Record<string, BattleRewards> = {};

    // Calculate experience for rewards
    let winnerExp = 0;
    let loserExp = 0;
    if (winnerParty && defeatedParty) {
      const expCalc = this.experienceCalculation(
        BattleStatus.END,
        winnerParty,
        defeatedParty,
      );
      winnerExp = expCalc.winnerExp;
      loserExp = expCalc.loserExp;
    }

    // Build rewards for winning party
    if (winnerParty && dropResults) {
      const winningCharacters = winnerParty.getCharacters();

      for (const character of winningCharacters) {
        // Find drop result for this character
        const dropResult = dropResults.winner.find(
          (r) => r.characterId === character.id,
        );

        rewards[character.id] = {
          characterId: character.id,
          characterName: character.name,
          expGained: winnerExp,
          itemsLooted: (dropResult?.itemsGained || []).map((item) => ({
            itemId: String(item.itemId),
            quantity: item.quantity,
          })),
        };
      }
    }

    // Build rewards for losing party (they get less exp, no items)
    if (defeatedParty) {
      const losingCharacters = defeatedParty.getCharacters();

      for (const character of losingCharacters) {
        rewards[character.id] = {
          characterId: character.id,
          characterName: character.name,
          expGained: loserExp,
          itemsLooted: [], // Losers don't get items
        };
      }
    }

    return rewards;
  }
}

enum BattleStatus {
  CONTINUE = "CONTINUE",
  END = "END",
  DRAW_END = "DRAW_END",
}

function updateAbGaugeAndDecideTurnTaking(actor: Character): boolean {
  let abGaugeIncrement = Math.max(
    10 + statMod(actor.attribute.getStat("agility").total),
    1,
  );

  const hasteEntry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.haste);
  const slowEntry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.slow);
  const advancingPaceEntry = actor.buffsAndDebuffs.buffs.entry.get(
    BuffEnum.advancingPace,
  );

  let speedMultiplier = 1;
  if (hasteEntry) {
    speedMultiplier += 0.5;
  }

  if (slowEntry) {
    speedMultiplier -= 0.5;
  }

  abGaugeIncrement *= speedMultiplier;

  if (advancingPaceEntry) {
    abGaugeIncrement += roll(1).d(4).total;
  }

  actor.abGauge += abGaugeIncrement;

  if (actor.abGauge >= 100) {
    actor.abGauge = 0;
    return true;
  }

  return false;
}

function reduceCooldowns(actor: Character) {
  for (const [skillId, turnsRemaining] of actor.cooldowns.entries()) {
    const newValue = turnsRemaining - 1;
    if (newValue <= 0) {
      actor.cooldowns.delete(skillId);
    } else {
      actor.cooldowns.set(skillId, newValue);
    }
  }
}

function resolveBuffAndDebuff(actor: Character): {
  ableToTakesTurn: boolean;
  reason: BuffAndDebuffEnum | undefined;
} {
  let ableToTakesTurn = true;
  let reason;

  // Loop twice, separate buffs and debuffs, shouldn't be a problem since two maps and one map might not be so differ in this aspoect
  for (const [buffsOrDebuffs, entry] of actor.buffsAndDebuffs.buffs.entry) {
    if (entry.value === 0) {
      return { ableToTakesTurn, reason };
    }

    if (!buffsRepository[buffsOrDebuffs].resolver(actor) && ableToTakesTurn) {
      ableToTakesTurn = false;
      reason = buffsOrDebuffs;
    }
  }

  for (const [debuffs, entry] of actor.buffsAndDebuffs.debuffs.entry) {
    if (entry.value === 0) {
      return { ableToTakesTurn, reason };
    }

    if (!debuffsRepository[debuffs].resolver(actor) && ableToTakesTurn) {
      ableToTakesTurn = false;
      reason = debuffs;
    }
  }

  return {
    ableToTakesTurn,
    reason,
  };
}
