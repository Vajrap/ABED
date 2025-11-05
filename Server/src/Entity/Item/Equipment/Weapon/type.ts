export enum BareHandId {
  BareHand = "BareHand",
}

export enum DaggerId {
  Stiletto = "Stiletto",
  Knife = "Knife",
}

export enum SwordId {
  ShortSword = "ShortSword",
  LongSword = "LongSword",
  Rapier = "Rapier",
  GreatSword = "GreatSword",
}

export enum BladeId {
  Katana = "Katana",
  Scimitar = "Scimitar",
  Cutlass = "Cutlass",
  Falchion = "Falchion",
}

export enum AxeId {
  Axe = "Axe",
  BroadAxe = "BroadAxe",
  WarAxe = "WarAxe",
}

export enum SpearId {
  Dory = "Dory",
  Javelin = "Javelin",
  Halberd = "Halberd",
}

export enum HammerId {
  MorningStar = "MorningStar",
  Hammer = "Hammer",
  WarHammer = "WarHammer",
  Scepter = "Scepter",
}

export enum BowId {
  LongBow = "LongBow",
  ShortBow = "ShortBow",
  Crossbow = "Crossbow",
}

export enum OrbId {
  Orb = "Orb",
}

export enum ShieldId {
  Buckler = "Buckler",
  KiteShield = "KiteShield",
  TowerShield = "TowerShield",
}

export enum StaffId {
  QuarterStaff = "QuarterStaff",
  LongestStaff = "LongestStaff",
  Staff = "Staff",
}

export enum BookWId {
  Bible = "Bible",
  Grimoire = "Grimoire",
  Codex = "Codex",
}

export enum WandId {
  Wand = "Wand",
}

export type WeaponId =
  | BareHandId
  | DaggerId
  | SwordId
  | BladeId
  | AxeId
  | SpearId
  | BowId
  | StaffId
  | ShieldId
  | HammerId
  | BookWId
  | WandId
  | OrbId;
