import { ArmorBlueprint, MaterialType } from "../../Blueprint";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HeadWearId } from "src/Entity/Item/Equipment/Armor/type";

export const blueprintArmorHeadSimpleHood = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Cloth], amount: 1 },
    { key: "accent", resource: [MaterialType.Thread], amount: 1 },
  ],
  HeadWearId.SimpleHood,
  "tailoring",
  6,
  TierEnum.common,
);

export const blueprintArmorHeadScholarCap = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Cloth], amount: 2 },
    { key: "accent", resource: [MaterialType.Thread], amount: 1 },
  ],
  HeadWearId.ScholarCap,
  "tailoring",
  8,
  TierEnum.common,
);

export const blueprintArmorHeadLeatherCap = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Leather], amount: 2 },
    { key: "secondary", resource: [MaterialType.Cloth], amount: 1 },
    { key: "accent", resource: [MaterialType.Thread], amount: 1 },
  ],
  HeadWearId.LeatherCap,
  "tanning",
  8,
  TierEnum.common,
);

export const blueprintArmorHeadScoutHood = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Leather], amount: 1 },
    { key: "secondary", resource: [MaterialType.Cloth], amount: 1 },
    { key: "accent", resource: [MaterialType.Thread], amount: 1 },
  ],
  HeadWearId.ScoutHood,
  "tailoring",
  9,
  TierEnum.common,
);

export const blueprintArmorHeadChainCoif = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Ingot], amount: 2 },
    { key: "secondary", resource: [MaterialType.Cloth], amount: 1 },
  ],
  HeadWearId.ChainCoif,
  "smithing",
  11,
  TierEnum.common,
);

export const blueprintArmorHeadSteelHelm = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Ingot], amount: 3 },
    { key: "secondary", resource: [MaterialType.Leather], amount: 1 },
  ],
  HeadWearId.SteelHelm,
  "smithing",
  12,
  TierEnum.common,
);

