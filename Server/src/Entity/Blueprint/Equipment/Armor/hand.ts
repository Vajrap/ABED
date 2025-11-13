import { ArmorBlueprint, MaterialType } from "../../Blueprint";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HandId } from "src/Entity/Item/Equipment/Armor/type";

export const blueprintArmorHandClothGloves = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Cloth], amount: 1 },
    { key: "accent", resource: [MaterialType.Thread], amount: 1 },
  ],
  HandId.ClothGloves,
  "tailoring",
  6,
  TierEnum.common,
);

export const blueprintArmorHandSteelGauntlets = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Ingot], amount: 2 },
    { key: "secondary", resource: [MaterialType.Leather], amount: 1 },
  ],
  HandId.SteelGauntlets,
  "smithing",
  12,
  TierEnum.common,
);

