import { IngotId } from "../..";
import { Ingot } from "./Ingot";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { BlueprintId } from "src/Entity/Blueprint/enum";
import { createEquipmentCraftingAttributes } from "src/Entity/Item/Misc/Resource/EquipmentCraftingAttributes";

/**
 * Base Ingots
 */
export const ingotCopper = new Ingot({
  id: IngotId.CopperIngot,
  name: { en: "Copper Ingot", th: "แท่งทองแดง" },
  description: {
    en: "Refined copper, used in basic crafts.",
    th: "โลหะทองแดงที่หลอมแล้ว ใช้ในงานช่างพื้นฐานทั่วไป",
  },
  image: "ingotCopper",
  weight: 10,
  tier: TierEnum.common,
  cost: new ItemCost({ baseCost: 120, bonusCost: 0 }),
  isCraftable: true,
  blueprintId: BlueprintId.Smelting_CopperIngot,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({
    tags: ["conductive", "soft", "common"],
  }),
});

export const ingotTin = new Ingot({
  id: IngotId.TinIngot,
  name: { en: "Tin Ingot", th: "แท่งดีบุก" },
  description: {
    en: "Refined tin, often used in bronze alloying.",
    th: "ดีบุกที่ผ่านการถลุง ใช้ผสมเป็นโลหะสำริด",
  },
  image: "ingotTin",
  weight: 9,
  tier: TierEnum.common,
  cost: new ItemCost({ baseCost: 150, bonusCost: 0 }),
  isCraftable: true,
  blueprintId: BlueprintId.Smelting_TinIngot,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({
    tags: ["soft", "alloy-base"],
  }),
});

export const ingotIron = new Ingot({
  id: IngotId.IronIngot,
  name: { en: "Iron Ingot", th: "แท่งเหล็ก" },
  description: {
    en: "Refined iron, foundation of weapons and armor.",
    th: "เหล็กกล้าที่ผ่านการหลอม เป็นพื้นฐานของอาวุธและเกราะ",
  },
  image: "ingotIron",
  weight: 12,
  tier: TierEnum.common,
  cost: new ItemCost({ baseCost: 180, bonusCost: 0 }),
  isCraftable: true,
  blueprintId: BlueprintId.Smelting_IronIngot,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({
    damage: { pDmg: 0 },
    tags: ["durable", "sharp", "common"],
  }),
});

export const ingotSilver = new Ingot({
  id: IngotId.SilverIngot,
  name: { en: "Silver Ingot", th: "แท่งเงิน" },
  description: {
    en: "Purified silver for jewelry and spell focuses.",
    th: "เงินบริสุทธิ์ ใช้สร้างเครื่องประดับและวัตถุเวท",
  },
  image: "ingotSilver",
  weight: 12,
  tier: TierEnum.uncommon,
  cost: new ItemCost({ baseCost: 320, bonusCost: 0 }),
  isCraftable: true,
  blueprintId: BlueprintId.Smelting_SilverIngot,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({
    damage: { mDmg: 1 },
    tags: ["holy", "conductive", "anti-undead"],
  }),
});

export const ingotGold = new Ingot({
  id: IngotId.GoldIngot,
  name: { en: "Gold Ingot", th: "แท่งทองคำ" },
  description: {
    en: "Refined gold, symbol of wealth and craftsmanship.",
    th: "ทองคำหลอมบริสุทธิ์ สัญลักษณ์แห่งความมั่งคั่งและศิลปะการช่าง",
  },
  image: "ingotGold",
  weight: 12,
  tier: TierEnum.rare,
  cost: new ItemCost({ baseCost: 900, bonusCost: 0 }),
  isCraftable: true,
  blueprintId: BlueprintId.Smelting_GoldIngot,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({
    damage: { mDmg: 2 },
    tags: ["noble", "soft", "high-magic-conductivity"],
  }),
});

/**
 * Alloy Ingots
 */
export const ingotBronze = new Ingot({
  id: IngotId.BronzeIngot,
  name: { en: "Bronze Ingot", th: "แท่งสำริด" },
  description: {
    en: "Alloy of copper and tin, sturdy and reliable.",
    th: "โลหะผสมระหว่างทองแดงและดีบุก แข็งแรงและทนทาน",
  },
  image: "ingotBronze",
  weight: 11,
  tier: TierEnum.common,
  cost: new ItemCost({ baseCost: 200, bonusCost: 0 }),
  isCraftable: true,
  blueprintId: BlueprintId.Alloy_BronzeIngot,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({
    damage: { pDmg: 0 },
    tags: ["balanced", "alloy", "durable"],
  }),
});

export const ingotSteel = new Ingot({
  id: IngotId.SteelIngot,
  name: { en: "Steel Ingot", th: "แท่งเหล็กกล้า" },
  description: {
    en: "Refined iron alloyed with carbon, strong and balanced.",
    th: "เหล็กผสมคาร์บอน ให้ความแข็งแรงและสมดุล",
  },
  image: "ingotSteel",
  weight: 12,
  tier: TierEnum.uncommon,
  cost: new ItemCost({ baseCost: 360, bonusCost: 0 }),
  isCraftable: true,
  blueprintId: BlueprintId.Alloy_SteelIngot,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({
    damage: { pDmg: 1 },
    tags: ["strong", "tempered", "martial"],
  }),
});

export const ingotElectrum = new Ingot({
  id: IngotId.ElectrumIngot,
  name: { en: "Electrum Ingot", th: "แท่งอิเล็กทรัม" },
  description: {
    en: "A blend of gold and silver with excellent magic conduction.",
    th: "โลหะผสมระหว่างทองและเงิน นำพลังเวทได้ดีเยี่ยม",
  },
  image: "ingotElectrum",
  weight: 11,
  tier: TierEnum.rare,
  cost: new ItemCost({ baseCost: 1200, bonusCost: 0 }),
  isCraftable: true,
  blueprintId: BlueprintId.Alloy_ElectrumIngot,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({
    damage: { pDmg: 1, mDmg: 2 },
    tags: ["hybrid", "arcane-conductor", "rare"],
  }),
});

/**
 * Infused Ingots
 */
export const ingotAethersteel = new Ingot({
  id: IngotId.AethersteelIngot,
  name: { en: "Aethersteel Ingot", th: "แท่งเหล็กอีเทอร์" },
  description: {
    en: "A steel ingot infused with Planarite, humming with stable magical energy.",
    th: "เหล็กกล้าที่ผสานกับแร่เพลนาไรต์ แผ่พลังเวทที่มั่นคงและบริสุทธิ์",
  },
  image: "ingotAethersteel",
  weight: 13,
  tier: TierEnum.epic,
  cost: new ItemCost({ baseCost: 3600, bonusCost: 0 }),
  isCraftable: true,
  blueprintId: BlueprintId.Infusion_AethersteelIngot,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({
    damage: { pDmg: 2, mDmg: 2 },
    tags: ["planar-infused", "balanced", "epic"],
  }),
});

export const ingotVoidforged = new Ingot({
  id: IngotId.VoidforgedIngot,
  name: { en: "Voidforged Ingot", th: "แท่งเหล็กสูญ" },
  description: {
    en: "A blackened alloy forged from steel and Erebite, absorbing all light and warmth.",
    th: "โลหะผสมที่หลอมจากเหล็กและอีเรไบต์ สีดำดุจเงามืด ดูดซับทั้งแสงและความร้อน",
  },
  image: "ingotVoidforged",
  weight: 14,
  tier: TierEnum.legendary,
  cost: new ItemCost({ baseCost: 90000, bonusCost: 0 }),
  isCraftable: true,
  blueprintId: BlueprintId.Infusion_VoidforgedIngot,
  equipmentCraftingAttributes: createEquipmentCraftingAttributes({
    damage: { pDmg: 3, mDmg: 3 },
    tags: ["void", "lifedrain", "legendary"],
  }),
});
