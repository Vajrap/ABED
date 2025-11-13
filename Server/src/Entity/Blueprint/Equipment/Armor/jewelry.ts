import { ArmorBlueprint, MaterialType } from "../../Blueprint";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { RingId, EarId } from "src/Entity/Item/Equipment/Armor/type";

export const blueprintJewelryRingCopper = new ArmorBlueprint(
  [{ key: "primary", resource: [MaterialType.Ingot], amount: 1 }],
  RingId.CopperRing,
  "jewelry",
  6,
  TierEnum.common,
);

export const blueprintJewelryRingIron = new ArmorBlueprint(
  [{ key: "primary", resource: [MaterialType.Ingot], amount: 1 }],
  RingId.IronRing,
  "jewelry",
  7,
  TierEnum.common,
);

export const blueprintJewelryRingSilver = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Ingot], amount: 1 },
    { key: "accent", resource: [MaterialType.Thread, MaterialType.Gem], amount: 1 },
  ],
  RingId.SilverRing,
  "jewelry",
  8,
  TierEnum.common,
);

export const blueprintJewelryRingGold = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Ingot], amount: 1 },
    { key: "accent", resource: [MaterialType.Gem], amount: 1 },
  ],
  RingId.GoldRing,
  "jewelry",
  9,
  TierEnum.common,
);

export const blueprintJewelryEarringCopper = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Ingot], amount: 1 },
    { key: "accent", resource: [MaterialType.Thread], amount: 1 },
  ],
  EarId.CopperEarring,
  "jewelry",
  6,
  TierEnum.common,
);

export const blueprintJewelryEarringGold = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Ingot], amount: 1 },
    { key: "accent", resource: [MaterialType.Gem], amount: 1 },
  ],
  EarId.GoldEarring,
  "jewelry",
  9,
  TierEnum.common,
);

