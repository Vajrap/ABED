/**
 * Miscellaneous item IDs
 * All misc items must have an entry here for type safety and repository lookup
 */

// Resource IDs
export enum WoodId {
  Oak = "Oak",
  Pine = "Pine",
  Maple = "Maple",
  Ironwood = "Ironwood",
}

export enum SkinId {
  Hide = "Hide",
  Fur = "Fur",
  Scale = "Scale",
}

export enum BoneId {
  Bone = "Bone",
  Fang = "Fang",
  Horn = "Horn",
}

export enum OreId {
  CopperOre = "CopperOre",
  TinOre = "TinOre",
  IronOre = "IronOre",
  SilverOre = "SilverOre",
  GoldOre = "GoldOre",
  PlanariteOre = "PlanariteOre",
  ErebiteOre = "ErebiteOre",
}

export type RawResourceID = WoodId | SkinId | BoneId | OreId;

/**
 * Refined Resource IDs
 */

export enum IngotId {
  CopperIngot = "CopperIngot",
  TinIngot = "TinIngot",
  IronIngot = "IronIngot",
  SilverIngot = "SilverIngot",
  GoldIngot = "GoldIngot",
  BronzeIngot = "BronzeIngot",
  SteelIngot = "SteelIngot",
  ElectrumIngot = "ElectrumIngot",
  AethersteelIngot = "AetherSteelIngot",
  VoidforgedIngot = "VoidforgedIngot",
}

export enum PlankId {
  OakPlank = "OakPlank",
  PinePlank = "PinePlank",
  MaplePlank = "MaplePlank",
  IronwoodPlank = "IronwoodPlank",
}

export enum LeatherId {
  Leather = "Leather",
  FineLeather = "FineLeather",
  ScaledLeather = "ScaledLeather",
}

export enum ThreadId {
  WoolThread = "WoolThread",
  SilkThread = "SilkThread",
  LinenThread = "LinenThread",
}

export enum ClothId {}

export enum GemId {
  RoughGem = "RoughGem",
  CutGem = "CutGem",
}

export type RefinedResourceID =
  | IngotId
  | PlankId
  | LeatherId
  | ThreadId
  | GemId
  // | ClothId

export type ResourceId = RawResourceID | RefinedResourceID;

// Other Misc IDs
export enum GoldId {
  gold = "gold",
}

export type MiscItemId = ResourceId | GoldId;
