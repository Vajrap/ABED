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
