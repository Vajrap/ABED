export type BuffAndDebuffEnum = BuffEnum | DebuffEnum;

export enum BuffEnum {
  haste = "haste",
  hiding = "hiding",
  taunt = "taunt",
  defenseUp = "defenseUp",
  arcaneShield = "arcaneShield",
  retreat = "retreat",
  spiritRattle = "spiritRattle",
  slaveDriver = "slaveDriver",
  cowardlyCharge = "cowardlyCharge",
  bless = "bless",
  planarAbsorption = "planarAbsorption",
  reversalPalm = "reversalPalm",
  innerVeil = "innerVeil",
  advancingPace = "advancingPace",
  warCry = "warCry",
  edgeCharge = "edgeCharge",
  spellParry = "spellParry",
  rage = "rage",
  aegisShield = "aegisShield",
  aegisPulse = "aegisPulse",
  regen = "regen",
  parry = "parry",
  duelingStance = "duelingStance",
  curseMarkActive = "curseMarkActive",
  charm = "charm",
  exposeWeaknessActive = "exposeWeaknessActive",
}

export enum DebuffEnum {
  slow = "slow",
  dazed = "dazed",
  fear = "fear",
  burn = "burn",
  hexed = "hexed",
  cursed = "cursed",
  exposed = "exposed",
  bleed = "bleed",
  stun = "stun",
  entangled = "entangled",
  hexMark = "hexMark",

  // Cooldown
  disruptPattern = "disruptPattern",
  analyze = "analyze",
  healCooldown = "healCooldown",
  massHealCooldown = "massHealCooldown",
  mendSpiritCooldown = "mendSpiritCooldown",
  
  // Stat Debuffs
  critDef = "critDef",
}
