/**
 * Armor item IDs
 * All armor items must have an entry here for type safety and repository lookup
 */

export enum BodyId {
  // Cloth
  Tunic = "Tunic",
  Robe = "Robe",
  MageRobe = "MageRobe",
  // Light
  PaddedArmor = "PaddedArmor",
  LeatherArmor = "LeatherArmor",
  StuddedLeatherArmor = "StuddedLeatherArmor",
  // Medium
  HideArmor = "HideArmor",
  ChainShirt = "ChainShirt",
  ScaleMail = "ScaleMail",
  // Heavy
  ChainMail = "ChainMail",
  SplintMail = "SplintMail",
  PlateArmor = "PlateArmor",
}

export enum HeadWearId {
  // Cloth
  SimpleHood = "SimpleHood",
  ScholarCap = "ScholarCap",
  // Light
  LeatherCap = "LeatherCap",
  ScoutHood = "ScoutHood",
  // Medium
  ChainCoif = "ChainCoif",
  // Heavy
  SteelHelm = "SteelHelm",
}

export enum HandId {
  // Cloth
  ClothGloves = "ClothGloves",
  // Light
  LeatherGloves = "LeatherGloves",
  // Medium
  ReinforcedGloves = "ReinforcedGloves",
  // Heavy
  SteelGauntlets = "SteelGauntlets",
}

export enum LegId {
  // Cloth
  LinenPants = "LinenPants",
  // Light
  LeatherPants = "LeatherPants",
  // Medium
  ChainLeggings = "ChainLeggings",
  // Heavy
  PlateGreaves = "PlateGreaves",
}

export enum FootId {
  // Cloth
  ClothShoes = "ClothShoes",
  // Light
  TravelerBoots = "TravelerBoots",
  LeatherBoots = "LeatherBoots",
  // Medium
  ChainBoots = "ChainBoots",
  // Heavy
  PlateSabatons = "PlateSabatons",
}

export enum EarId {
  CopperEarring = "CopperEarring",
  IronEarring = "IronEarring",
  SilverEarring = "SilverEarring",
  GoldEarring = "GoldEarring",
}

export enum NeckId {
  CopperNecklace = "CopperNecklace",
  SilverNecklace = "SilverNecklace",
  GoldNecklace = "GoldNecklace",
}

export enum RingId {
  CopperRing = "CopperRing",
  IronRing = "IronRing",
  SilverRing = "SilverRing",
  GoldRing = "GoldRing",
}

export enum UtilId {
  Idol = "Idol",
  Relic = "Relic",
  Totem = "Totem",
  Mechanic = "Mechanic",
}

export type ArmorId =
  | BodyId
  | EarId
  | FootId
  | HandId
  | HeadWearId
  | LegId
  | NeckId
  | RingId
  | UtilId;
