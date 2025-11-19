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
  warCry = "warCry",
  edgeCharge = "edgeCharge",
  spellParry = "spellParry",
  rage = "rage",
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
}