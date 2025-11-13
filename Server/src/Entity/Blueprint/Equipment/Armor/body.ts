import { ArmorBlueprint, MaterialType } from "../../Blueprint";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BodyId } from "src/Entity/Item/Equipment/Armor/type";

export const blueprintArmorBodyLeatherArmor = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Leather], amount: 3 },
    { key: "secondary", resource: [MaterialType.Cloth], amount: 2 },
    { key: "accent", resource: [MaterialType.Thread], amount: 2 },
  ],
  BodyId.LeatherArmor,
  "tanning",
  9,
  TierEnum.common,
);

export const blueprintArmorBodyHideArmor = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Leather], amount: 4 },
    { key: "secondary", resource: [MaterialType.Cloth], amount: 1 },
    { key: "accent", resource: [MaterialType.Thread], amount: 2 },
  ],
  BodyId.HideArmor,
  "tanning",
  10,
  TierEnum.common,
);

export const blueprintArmorBodyStuddedLeatherArmor = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Leather], amount: 3 },
    { key: "secondary", resource: [MaterialType.Ingot], amount: 2 },
    { key: "accent", resource: [MaterialType.Thread], amount: 2 },
  ],
  BodyId.StuddedLeatherArmor,
  "tanning",
  11,
  TierEnum.common,
);

export const blueprintArmorBodyChainShirt = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Ingot], amount: 4 },
    { key: "secondary", resource: [MaterialType.Cloth], amount: 2 },
    { key: "accent", resource: [MaterialType.Leather], amount: 1 },
  ],
  BodyId.ChainShirt,
  "smithing",
  12,
  TierEnum.common,
);

export const blueprintArmorBodyScaleMail = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Ingot], amount: 5 },
    { key: "secondary", resource: [MaterialType.Cloth], amount: 2 },
    { key: "accent", resource: [MaterialType.Leather], amount: 2 },
  ],
  BodyId.ScaleMail,
  "smithing",
  13,
  TierEnum.common,
);

export const blueprintArmorBodyChainMail = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Ingot], amount: 6 },
    { key: "secondary", resource: [MaterialType.Cloth], amount: 2 },
    { key: "tertiary", resource: [MaterialType.Leather], amount: 2 },
  ],
  BodyId.ChainMail,
  "smithing",
  13,
  TierEnum.common,
);

export const blueprintArmorBodySplintMail = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Ingot], amount: 6 },
    { key: "secondary", resource: [MaterialType.Plank], amount: 2 },
    { key: "tertiary", resource: [MaterialType.Cloth], amount: 2 },
    { key: "accent", resource: [MaterialType.Leather], amount: 2 },
  ],
  BodyId.SplintMail,
  "smithing",
  14,
  TierEnum.common,
);

export const blueprintArmorBodyPlateArmor = new ArmorBlueprint(
  [
    { key: "primary", resource: [MaterialType.Ingot], amount: 8 },
    { key: "secondary", resource: [MaterialType.Cloth], amount: 3 },
    { key: "tertiary", resource: [MaterialType.Leather], amount: 3 },
    { key: "accent", resource: [MaterialType.Thread], amount: 2 },
  ],
  BodyId.PlateArmor,
  "smithing",
  16,
  TierEnum.common,
);

