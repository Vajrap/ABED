/**
 * Weapon item IDs
 * All weapon items must have an entry here for type safety and repository lookup
 * Each enum corresponds to a ProficiencyKey weapon type
 */

// Bare Hand
export enum BareHandId {
  // Add bare hand IDs here as needed
  BareHand = "BareHand",
}

export enum DaggerId {
  IronStiletto = "IronStiletto",
  IronKnife = "IronKnife",
}

export enum SwordId {
  IronShortSword = "IronShortSword",
  IronLongSword = "IronLongSword",
  IronRapier = "IronRapier",
  IronGreatSword = "IronGreatSword",
}

// Blade types
export enum BladeId {
    IronKatana = "IronKatana",
    IronScimitar = "IronScimitar",
    IronCutlass = "IronCutlass",
    IronFalchion = "IronFalchion",
}

export enum AxeId {
  IronAxe = "IronAxe",
    IronBroadAxe = "IronBroadAxe",
    IronWarAxe = "IronWarAxe",
}

export enum SpearId {
    IronDory = "IronDory",
    IronJavelin  = "IronJavelin",
    IronHalberd = "IronHalberd",
}

export enum HammerId {
  IronMorningStar = "IronMorningStar",
    IronHammer = "IronHammer",
    IronWarHammer = "IronWarHammer",
    IronScepter = "IronScepter",
}

export enum BowId {
    OakLongBow = "OakLongBow",
    OakShortBow = "OakShortBow",
    OakCrossbow = "OakCrossbow",
}

export enum OrbId {
    CrystalOrb = "CrystalOrb",
}

export enum ShieldId {
  WoodenBuckler = "WoodenBuckler",
    WoodenKiteShield = "WoodenKiteShield",
    WoodenTowerShield = "WoodenTowerShield",
    IronBucker = "IronBucker",
    IronKiteShield = "IronKiteShield",
    IronTowerShield = "IronTowerShield",
}

export enum StaffId {
    OakQuaterStaff = "OakQuaterStaff",
    OakLongestStaff = "OakLongestStaff",
    OakStaff = "OakStaff",
}

export enum BookWId {
    LeatherBible = "LeatherBible",
    LeatherGrimoire = "LeatherGrimoire",
    LeatherCodex = "LeatherCodex",
}

export enum WandId {
    OakWand = "OakWand",
}

/**
 * Master WeaponId type - union of all weapon IDs
 */
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
| OrbId
