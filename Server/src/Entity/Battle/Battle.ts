import {
  ATTRIBUTE_KEYS,
  type AttributeKey,
  type LocationId,
} from "../../InterFacesEnumsAndTypes/Enums";
import type { TimeOfDay } from "../../InterFacesEnumsAndTypes/Time";
import { statMod } from "../../Utils/statMod";
import { BuffsAndDebuffsEnum } from "../BuffsAndDebuffs/enum";
import type { Character } from "../Character/Character";
import type { Party } from "../Party/Party";


export class Battle {
  id: string;
  isOngoing: boolean;
  partyA: Party;
  partyB: Party;
  battleReport: BattleReport;
  location: GameLocation;
  gameTime: GameTimeInterface;
  battleType: BattleType;
  allParticipants: Character[];
  constructor(
    partyA: Party,
    partyB: Party,
    location: GameLocation,
    gameTime: GameTimeInterface,
    battleType: BattleType,
  ) {
    this.id = Bun.randomUUIDv7();
    this.isOngoing = true;
    this.partyA = partyA;
    this.partyB = partyB;
    this.battleReport = new BattleReport(partyA, partyB, location.id, gameTime);
    this.location = location;
    this.gameTime = gameTime;
    this.battleType = battleType;
    this.allParticipants = [
      ...partyA.characters.filter((char) => !char.vitals.isDead),
      ...partyB.characters.filter((char) => !char.vitals.isDead),
    ];
  }

  private async battleLoop() {
    if (this.allParticipants.length === 0)
      throw new Error("No participants found in the battle.");

    this.isOngoing = true;
    let turnCount = 0;

    while (this.isOngoing) {
      if (turnCount >= 100) {
        this.isOngoing = false;
        break;
      }

      for (const actor of this.allParticipants) {
        if (!actor || actor.vitals.isDead) {
          continue;
        }

        if (updateAbGuage(actor)) {
          turnCount++;
          // resolveBuffAndDebuff
          const buffResolveResult = resolveBuffAndDebuff(actor);
          if (buffResolveResult.ableToTakesTurn) {
            // TODO: Start Actor Turn
            const actorTurnResult = startActorTurn(actor);
            // Update battle report
            // Maybe like this.battleReport.results.push(actorTurnResult) that simple;
            this.allParticipants.push(
              this.allParticipants.shift() as Character,
            );
          } else if (buffResolveResult.ableToTakesTurn === false) {
            // let reason = buffResolveResult.reason;
            // Update battle report, maybe just
            // result = {character, can't take turn, because of} and this.battleReport.results.push(result)
          }

          // Check for battle end after the actor's turn
          const battleStatus = this.checkBattleEnd();
          if (
            battleStatus.status === BattleStatus.END ||
            battleStatus.status === BattleStatus.DRAW_END
          ) {
            this.isOngoing = false;
            // Handle Battle end
            //
            break;
          }
        }
      }

      if (!this.isOngoing) {
        break;
      }
    }
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
    const possibleAttributesToBeTrained = [
      "strength",
      "agility",
      "endurance",
      "breath",
      "planar",
      "dexterity",
    ];

    const timesOfTraining = 3;
    const { winnerExp, loserExp } = this.experienceCalculation(
      battleStatus,
      winnerParty,
      defeatedParty,
    );

    const trainCharacters = (party: Party, exp: number) => {
      for (const character of party.characters.filter((c) => c !== undefined)) {
        for (let i = 0; i < timesOfTraining; i++) {
          let trainedAttribute =
            possibleAttributesToBeTrained[
              Math.floor(Math.random() * possibleAttributesToBeTrained.length)
            ];
          // character.train(trainedAttribute);
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

function updateAbGuage(actor: Character): boolean {
  let abGaugeIncrement = Math.max(
    statMod(actor.attribute.getStat("agility").total),
    1,
  );
  // let abGaugeIncrement = Math.max(actor.attribute.agility(), 10);
  const hasteBuff = actor.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.haste);
  const slowBuff = actor.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.slow);
  const timeWarpBuff = actor.buffsAndDebuffs.entry.get(
    BuffsAndDebuffsEnum.timeWarp,
  );
  if (hasteBuff && (hasteBuff.value || hasteBuff.permValue)) {
    abGaugeIncrement *= Math.pow(2, hasteBuff.value + hasteBuff.permValue);
  }
  if (slowBuff && (slowBuff.value || slowBuff.permValue)) {
    abGaugeIncrement /= Math.pow(2, slowBuff.value + slowBuff.permValue);
  }
  if (timeWarpBuff && (timeWarpBuff.value || timeWarpBuff.permValue)) {
    abGaugeIncrement += 25 * (timeWarpBuff.value + timeWarpBuff.permValue);
  }
  actor.abGuage += abGaugeIncrement;

  if (actor.abGuage >= 20) {
    actor.abGuage = 0;
    return true;
  }
  return false;
}

const resolved = {
  ableToTakesTurn: true,
};

const unresolved = {
  ableToTakesTurn: false,
  reason: BuffsAndDebuffsEnum,
};

function resolveBuffAndDebuff(actor: Character): {
  ableToTakesTurn: boolean;
  reason?: BuffsAndDebuffsEnum;
} {
  return {
    ableToTakesTurn: true,
  };
}

function startActorTurn(actor: Character): void {
  // TODO
}

export class BattleReport {
  constructor(
    partyA: Party,
    partyB: Party,
    location: LocationId,
    gameTime: GameTimeInterface,
  ) {}
}

export interface GameTimeInterface {
  dayPassed: number;
  gameDateDay: number;
  gameDateHour: number;
  gameDateMonth: number;
  gameDateYear: number;
  phase: TimeOfDay;
}

export class GameLocation {
  id: LocationId;
  constructor(id: LocationId) {
    this.id = id;
  }
}

export enum BattleType {
  Normal = "Normal",
  Training = "Training",
  Arena = "Arena",
  Scripted = "Scripted",
  NoReward = "NoReward",
}

export const battleTypeConfig: Record<
  BattleType,
  {
    allowXP: boolean;
    allowLoot: boolean;
    resetHealth: boolean;
    allowDeath: boolean;
  }
> = {
  [BattleType.Normal]: {
    allowXP: true,
    allowLoot: true,
    resetHealth: false,
    allowDeath: true,
  },
  [BattleType.Training]: {
    allowXP: true,
    allowLoot: false,
    resetHealth: true,
    allowDeath: false,
  },
  [BattleType.Arena]: {
    allowXP: true,
    allowLoot: true,
    resetHealth: false,
    allowDeath: false,
  },
  [BattleType.Scripted]: {
    allowXP: true,
    allowLoot: true,
    resetHealth: false,
    allowDeath: true,
  },
  [BattleType.NoReward]: {
    allowXP: false,
    allowLoot: false,
    resetHealth: false,
    allowDeath: false,
  },
};
