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
  chargeSurge = "chargeSurge",
  rage = "rage",
  aegisShield = "aegisShield",
  aegisPulse = "aegisPulse",
  regen = "regen",
  parry = "parry",
  duelingStance = "duelingStance",
  curseMarkActive = "curseMarkActive",
  exposeWeaknessActive = "exposeWeaknessActive",
  precognition = "precognition",

  arcaneCharge = "arcaneCharge",
  faith = "faith",
  holyWater = "holyWater",
  lucky = "lucky",
  badLuck = "badLuck",
  foreseen = "foreseen",
  planarGrab = "planarGrab",
  arcaneBattery = "arcaneBattery",
  stoneSkin = "stoneSkin",
  tailwind = "tailwind",
  windFury = "windFury",
  wardOfProtection = "wardOfProtection",
  battleHardened = "battleHardened",
  challenger = "challenger",
  battleFormation = "battleFormation",
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
  charmed = "charmed",
  challenged = "challenged",

  // Cooldown
  disruptPattern = "disruptPattern",
  analyze = "analyze",
  healCooldown = "healCooldown",
  massHealCooldown = "massHealCooldown",
  mendSpiritCooldown = "mendSpiritCooldown",
  
  // Stat Debuffs
  critDef = "critDef",
  
  // Engineer
  bearTrap = "bearTrap",
  
  // Nomad
  blind = "blind",
  
  // Mage - Water
  soaked = "soaked",
  
  // Mage - Earth
  stoneBounded = "stoneBounded",
}
