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

// Sword types
export enum DaggerId {}
// Add dagger IDs here as needed

export enum SwordId {}
// Add sword IDs here as needed

export enum RapierId {}
// Add rapier IDs here as needed

export enum GreatSwordId {}
// Add greatsword IDs here as needed

// Blade types
export enum MacheteId {}
// Add machete IDs here as needed

export enum BladeId {}
// Add blade IDs here as needed

export enum ScimitarId {}
// Add scimitar IDs here as needed

export enum ZanmadaoId {}
// Add zanmadao IDs here as needed

// Axe types
export enum AxeId {}
// Add axe IDs here as needed

export enum WarAxeId {}
// Add war axe IDs here as needed

export enum HalberdId {}
// Add halberd IDs here as needed

// Spear types
export enum SpearId {}
// Add spear IDs here as needed

export enum JavelinId {}
// Add javelin IDs here as needed

// Mace types
export enum MaceId {}
// Add mace IDs here as needed

export enum FlailId {}
// Add flail IDs here as needed

export enum WarHammerId {}
// Add war hammer IDs here as needed

// Ranged types
export enum BowId {}
// Add bow IDs here as needed

export enum CrossbowId {}
// Add crossbow IDs here as needed

export enum GunId {}
// Add gun IDs here as needed

export enum ThrowingKnifeId {}
// Add throwing knife IDs here as needed

// Magic types
export enum StaffId {}
// Add staff IDs here as needed

export enum MagicWandId {}
// Add magic wand IDs here as needed

/**
 * Master WeaponId type - union of all weapon IDs
 */
export type WeaponId =
  | BareHandId
  | DaggerId
  | SwordId
  | RapierId
  | GreatSwordId
  | MacheteId
  | BladeId
  | ScimitarId
  | ZanmadaoId
  | AxeId
  | WarAxeId
  | HalberdId
  | SpearId
  | JavelinId
  | MaceId
  | FlailId
  | WarHammerId
  | BowId
  | CrossbowId
  | GunId
  | ThrowingKnifeId
  | StaffId
  | MagicWandId;
