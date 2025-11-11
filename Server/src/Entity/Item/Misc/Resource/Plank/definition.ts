import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { PlankId, WoodId } from "../..";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { ItemMisc } from "../../Misc";
import { createEquipmentCraftingAttributes } from "src/Entity/Item/Misc/Resource/EquipmentCraftingAttributes";

export const plankPine = new ItemMisc({
  id: PlankId.PinePlank,
  name: { en: "Pine Plank", th: "" },
  description: {
    en: "Softwood plank, easy to shape but not very durable.",
    th: "",
  },
  image: "plankPine",
  weight: 8,
  tier: TierEnum.common,
  cost: new ItemCost({ baseCost: 100, bonusCost: 0 }), // 1 silver = 100 copper
  isCraftable: true,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes(), // no bonus, soft and easy to shape
});

export const plankOak = new ItemMisc({
  id: PlankId.OakPlank,
  name: { en: "Oak Plank", th: "" },
  description: { en: "Strong, heavy plank favored for construction.", th: "" },
  image: "plankOak",
  weight: 10,
  tier: TierEnum.common,
  cost: new ItemCost({ baseCost: 150, bonusCost: 0 }),
  isCraftable: true,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({ defense: { blunt: 1 } }), // small physical defense bonus
});

export const plankMaple = new ItemMisc({
  id: PlankId.MaplePlank,
  name: { en: "Maple Plank", th: "" },
  description: { en: "Fine-grained hardwood plank used by artisans.", th: "" },
  image: "plankMaple",
  weight: 12,
  tier: TierEnum.uncommon,
  cost: new ItemCost({ baseCost: 300, bonusCost: 0 }),
  isCraftable: true,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({ attributes: { dexterity: 1 } }), // refined craftsmanship bonus
});

export const plankIronwood = new ItemMisc({
  id: PlankId.IronwoodPlank,
  name: { en: "Ironwood Plank", th: "" },
  description: {
    en: "Extremely dense plank, prized for elite craftsmanship.",
    th: "",
  },
  image: "plankIronwood",
  weight: 15,
  tier: TierEnum.rare,
  cost: new ItemCost({ baseCost: 600, bonusCost: 0 }),
  isCraftable: true,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({ defense: { pDef: 1, blunt: 1 } }), // strong physical and blunt defense
});
