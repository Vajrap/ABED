import { ArmorBlueprint, MaterialType } from "../../Blueprint";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { LegId } from "src/Entity/Item/Equipment/Armor/type";

export const blueprintArmorLegLinenPants = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Cloth], amount: 2 },
    { key: "accent", resource: [MaterialType.Thread], amount: 1 },
  ],
  LegId.LinenPants,
  "tailoring",
  6,
  TierEnum.common,
);

export const blueprintArmorLegPlateGreaves = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Ingot], amount: 3 },
    { key: "secondary", resource: [MaterialType.Leather], amount: 1 },
  ],
  LegId.PlateGreaves,
  "smithing",
  13,
  TierEnum.common,
);

