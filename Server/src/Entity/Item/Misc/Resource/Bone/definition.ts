import { BoneId } from "../..";
import { Bone } from "./Bone";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";

export const boneCommon = new Bone({
  id: BoneId.Bone,
  name: { en: "Bone", th: "" },
  description: { en: "Common animal bone used in crafts and alchemy.", th: "" },
  image: "boneCommon",
  weight: 6,
  tier: TierEnum.common,
  cost: new ItemCost({ baseCost: 10, bonusCost: 0 }),
  isCraftable: false,
  blueprintId: { resource: new Map(), item: new Map() },
});

export const boneFang = new Bone({
  id: BoneId.Fang,
  name: { en: "Fang", th: "" },
  description: { en: "Sharp fang from predators, often decorative.", th: "" },
  image: "boneFang",
  weight: 4,
  tier: TierEnum.uncommon,
  cost: new ItemCost({ baseCost: 40, bonusCost: 0 }),
  isCraftable: false,
  blueprintId: { resource: new Map(), item: new Map() },
});

export const boneHorn = new Bone({
  id: BoneId.Horn,
  name: { en: "Horn", th: "" },
  description: { en: "Tough and valuable crafting material.", th: "" },
  image: "boneHorn",
  weight: 8,
  tier: TierEnum.uncommon,
  cost: new ItemCost({ baseCost: 60, bonusCost: 0 }),
  isCraftable: false,
  blueprintId: { resource: new Map(), item: new Map() },
});
