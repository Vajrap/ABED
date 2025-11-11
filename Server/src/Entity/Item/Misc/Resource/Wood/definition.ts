import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WoodId } from "../..";
import { Wood } from "./Wood";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { createEquipmentCraftingAttributes } from "src/Entity/Item/Misc/Resource/EquipmentCraftingAttributes";

export const woodPine = new Wood({
  id: WoodId.Pine,
  name: { en: "Pine Wood", th: "" },
  description: { en: "Light softwood, easy to process.", th: "" },
  image: "woodPine",
  weight: 8,
  tier: TierEnum.common,
  cost: new ItemCost({ baseCost: 10, bonusCost: 0 }),
  isCraftable: false,
  blueprintId: { resource: new Map(), item: new Map() },
  equipmentCraftingAttributes: createEquipmentCraftingAttributes(),
});

export const woodOak = new Wood({
  id: WoodId.Oak,
  name: { en: "Oak Wood", th: "" },
  description: {
    en: "Durable hardwood used in construction and furniture.",
    th: "",
  },
  image: "woodOak",
  weight: 10,
  tier: TierEnum.common,
  cost: new ItemCost({ baseCost: 15, bonusCost: 0 }),
  isCraftable: false,
  blueprintId: { resource: new Map(), item: new Map() },
  equipmentCraftingAttributes: createEquipmentCraftingAttributes(),
});

export const woodMaple = new Wood({
  id: WoodId.Maple,
  name: { en: "Maple Wood", th: "" },
  description: {
    en: "Fine-grained hardwood, favored for precision craft.",
    th: "",
  },
  image: "woodMaple",
  weight: 12,
  tier: TierEnum.uncommon,
  cost: new ItemCost({ baseCost: 60, bonusCost: 0 }),
  isCraftable: false,
  blueprintId: { resource: new Map(), item: new Map() },
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({ attributes: { dexterity: 1 } }),
});

export const woodIronwood = new Wood({
  id: WoodId.Ironwood,
  name: { en: "Ironwood", th: "" },
  description: {
    en: "Dense, nearly metallic wood. Rare and resilient.",
    th: "",
  },
  image: "woodIronwood",
  weight: 15,
  tier: TierEnum.rare,
  cost: new ItemCost({ baseCost: 100, bonusCost: 0 }), // 1 silver
  isCraftable: false,
  blueprintId: { resource: new Map(), item: new Map() },
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({ defense: { pDef: 1 } }),
});
