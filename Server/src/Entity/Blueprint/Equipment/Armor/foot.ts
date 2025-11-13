import { ArmorBlueprint, MaterialType } from "../../Blueprint";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { FootId } from "src/Entity/Item/Equipment/Armor/type";

export const blueprintArmorFootClothShoes = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Cloth], amount: 1 },
    { key: "secondary", resource: [MaterialType.Cloth], amount: 1 },
    { key: "accent", resource: [MaterialType.Thread], amount: 1 },
  ],
  FootId.ClothShoes,
  "tailoring",
  6,
  TierEnum.common,
);

export const blueprintArmorFootPlateSabatons = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Ingot], amount: 3 },
    { key: "secondary", resource: [MaterialType.Leather], amount: 1 },
  ],
  FootId.PlateSabatons,
  "smithing",
  13,
  TierEnum.common,
);

