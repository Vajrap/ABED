export type SkillId = BasicSkillId 
| RogueSkillId 
| WarriorSkillId 
| GuardianSkillId 
| WitchSkillId 
| ShamanSkillId 
| MageSkillId 
| MobSkillId;


export enum BasicSkillId {
  Basic = "Basic",
}

export enum RogueSkillId {
  RetreatDash = "RetreatDash",
  Backstab = "Backstab", 
}

export enum MobSkillId {
  WorksYouMaggots = "WorksYouMaggots",
  CommanderScream = "CommanderScream",
  Whip = "Whip",
  ThrowPebble = "ThrowPebble",
  PanicSlash = "PanicSlash",
  Shriek = "Shriek",
}

export enum MageSkillId {
  ArcaneBolt = "ArcaneBolt",
  ArcaneShield = "ArcaneShield",
  Backdraft = "Backdraft",
  FireBolt = "FireBolt",
  FireBall = "FireBall",
  BurningHand = "BurningHand",
}

export enum ShamanSkillId {
  MendSpirit = "MendSpirit",
  HexOfRot = "HexOfRot",
  SpiritRattle = "SpiritRattle",
  ChaoticBlessing = "ChaoticBlessing",
}

export enum WitchSkillId {
  SpiritRattle = "SpiritRattle",
  ChaoticBlessing = "ChaoticBlessing",
}

export enum WarriorSkillId {
  Bash = "Bash",
  Cleave = "Cleave",
}

export enum GuardianSkillId {
  Taunt = "Taunt",
  HerosPose = "HerosPose",
  ShieldUp = "ShieldUp",
}