import { OreId } from "../..";
import { Ore } from "./Ore";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { createEquipmentCraftingAttributes } from "src/Entity/Item/Misc/Resource/EquipmentCraftingAttributes";

/**
 * Base Ores
 */
export const oreCopper = new Ore({
  id: OreId.CopperOre,
  name: { en: "Copper Ore", th: "แร่ทองแดง" },
  description: {
    en: "Common ore used for basic metalwork.",
    th: "แร่ที่พบได้ทั่วไป ใช้หลอมสร้างโลหะพื้นฐานในงานช่างทั่วไป",
  },
  image: "oreCopper",
  weight: 12,
  tier: TierEnum.common,
  cost: new ItemCost({ baseCost: 25, bonusCost: 0 }), // Cheap, abundant
  isCraftable: false,
  blueprintId: undefined,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes(),
});

export const oreTin = new Ore({
  id: OreId.TinOre,
  name: { en: "Tin Ore", th: "แร่ดีบุก" },
  description: {
    en: "Soft, dull metal used to make bronze alloys.",
    th: "โลหะเนื้อนุ่มสีหม่น มักใช้ผสมกับทองแดงเพื่อสร้างสำริด",
  },
  image: "oreTin",
  weight: 10,
  tier: TierEnum.common,
  cost: new ItemCost({ baseCost: 35, bonusCost: 0 }), // Slightly rarer than copper
  isCraftable: false,
  blueprintId: undefined,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes(),
});

export const oreIron = new Ore({
  id: OreId.IronOre,
  name: { en: "Iron Ore", th: "แร่เหล็ก" },
  description: {
    en: "Abundant yet vital metal resource.",
    th: "แร่โลหะที่มีอยู่ทั่วไป แต่เป็นหัวใจของอาวุธและเครื่องป้องกันทุกชนิด",
  },
  image: "oreIron",
  weight: 14,
  tier: TierEnum.common,
  cost: new ItemCost({ baseCost: 60, bonusCost: 0 }), // Common, but heavier and more valuable
  isCraftable: false,
  blueprintId: undefined,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({
    damage: { pDmg: 1 },
    defense: { pDef: 1 },
  }),
});

export const oreSilver = new Ore({
  id: OreId.SilverOre,
  name: { en: "Silver Ore", th: "แร่เงิน" },
  description: {
    en: "Precious ore often used in jewelry and holy crafts.",
    th: "แร่ล้ำค่าที่นิยมใช้ในเครื่องประดับและของศักดิ์สิทธิ์",
  },
  image: "oreSilver",
  weight: 14,
  tier: TierEnum.uncommon,
  cost: new ItemCost({ baseCost: 200, bonusCost: 0 }), // 2 silver
  isCraftable: false,
  blueprintId: undefined,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({
    damage: { pDmg: 1, mDmg: 1 },
    defense: { pDef: 1, mDef: 1 },
  }),
});

export const oreGold = new Ore({
  id: OreId.GoldOre,
  name: { en: "Gold Ore", th: "แร่ทองคำ" },
  description: {
    en: "Rare ore valued for both wealth and enchantment.",
    th: "แร่หายากที่เป็นสัญลักษณ์แห่งความมั่งคั่ง และใช้ในการร่ายเวทระดับสูง",
  },
  image: "oreGold",
  weight: 14,
  tier: TierEnum.rare,
  cost: new ItemCost({ baseCost: 500, bonusCost: 0 }), // 5 silver
  isCraftable: false,
  blueprintId: undefined,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({
    damage: { pDmg: 1, mDmg: 1 },
    defense: { pDef: 1, mDef: 1 },
  }),
});

/**
 * Special Ores
 */
export const orePlanarite = new Ore({
  id: OreId.PlanariteOre,
  name: { en: "Planarite Ore", th: "แร่เพลนาไรต์" },
  description: {
    en: "Crystalline ore that channels planar energy. Dangerous to refine.",
    th: "แร่ผลึกที่เก็บกักพลังแห่งระนาบ มีพลังเวทมหาศาลแต่หลอมได้ยากและอันตราย",
  },
  image: "orePlanarite",
  weight: 8,
  tier: TierEnum.epic,
  cost: new ItemCost({ baseCost: 5000, bonusCost: 0 }), // 50 silver, very rare
  isCraftable: false,
  blueprintId: undefined,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({
    elements: { order: 1, chaos: 1 },
    planarAttunement: 4,
    tags: ["planar-resonant"],
  }),
});

export const oreErebite = new Ore({
  id: OreId.ErebiteOre,
  name: { en: "Erebite Ore", th: "แร่อีเรไบต์" },
  description: {
    en: "A black, light-absorbing ore from the deepest veins — said to drink the warmth of life itself.",
    th: "แร่ดำมืดจากรอยแยกใต้โลก ดูดกลืนทั้งแสงและความร้อน ดั่งจะกลืนชีวิตผู้แตะต้อง",
  },
  image: "oreErebite",
  weight: 16,
  tier: TierEnum.legendary,
  cost: new ItemCost({ baseCost: 15000, bonusCost: 0 }), // 150 silver (≈15 gold)
  isCraftable: false,
  blueprintId: undefined,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({
    damage: { chaos: 2 },
    elements: { chaos: 2 },
    planarAttunement: 3,
    tags: ["void-tainted", "life-drain"],
  }),
});
