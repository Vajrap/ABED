import { Cloth } from "./Cloth";
import { ClothId } from "../..";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { createEquipmentCraftingAttributes } from "src/Entity/Item/Misc/Resource/EquipmentCraftingAttributes";

type ClothDefinition = {
  name: string;
  description: string;
  tier: TierEnum;
  weight: number;
  baseCost: number;
  equipmentCraftingAttributes: ReturnType<typeof createEquipmentCraftingAttributes>;
};

const CLOTH_DATA: Record<ClothId, ClothDefinition> = {
  [ClothId.LinenCloth]: {
    name: "Linen Cloth",
    description: "Light woven fabric favored for summer garments.",
    tier: TierEnum.common,
    weight: 4,
    baseCost: 140,
    equipmentCraftingAttributes: createEquipmentCraftingAttributes({
      // Mundane cloth, no bonuses
    }),
  },
  [ClothId.CottonCloth]: {
    name: "Cotton Cloth",
    description: "Soft breathable cloth used across the realm.",
    tier: TierEnum.common,
    weight: 4,
    baseCost: 150,
    equipmentCraftingAttributes: createEquipmentCraftingAttributes({
      // Mundane cloth, no bonuses
    }),
  },
  [ClothId.WoolCloth]: {
    name: "Wool Cloth",
    description: "Warm insulating cloth suited for colder climates.",
    tier: TierEnum.uncommon,
    weight: 5,
    baseCost: 280,
    equipmentCraftingAttributes: createEquipmentCraftingAttributes({
      defense: { water: 1 }, // Slight water defense for cold climates
      needs: { moodBonus: 1 },
    }),
  },
  [ClothId.SilkCloth]: {
    name: "Silk Cloth",
    description: "Luxurious smooth cloth favored by nobility.",
    tier: TierEnum.rare,
    weight: 3,
    baseCost: 600,
    equipmentCraftingAttributes: createEquipmentCraftingAttributes({
      planarAttunement: 2, // Superior conduit compared to raw silk thread
    }),
  },
  [ClothId.SpiderSilkCloth]: {
    name: "Spider Silk Cloth",
    description: "Featherlight fabric woven from giant spider silk strands.",
    tier: TierEnum.rare,
    weight: 2,
    baseCost: 650,
    equipmentCraftingAttributes: createEquipmentCraftingAttributes({
      dodge: 1, // Small dodge bonus for agility
      attributes: { dexterity: 1 },
    }),
  },
  [ClothId.YetiCloth]: {
    name: "Yeti Cloth",
    description: "Thick insulating weave for extreme winter gear.",
    tier: TierEnum.uncommon,
    weight: 6,
    baseCost: 300,
    equipmentCraftingAttributes: createEquipmentCraftingAttributes({
      defense: { water: 1 }, // Small water defense for insulation
      needs: { moodBonus: 1 },
    }),
  },
  [ClothId.PhoenixCloth]: {
    name: "Phoenix Cloth",
    description: "Flame-resistant cloth that radiates gentle warmth.",
    tier: TierEnum.epic,
    weight: 3,
    baseCost: 2000,
    equipmentCraftingAttributes: createEquipmentCraftingAttributes({
      defense: { fire: 2 }, // Fire defense
      vitals: { hp: 20 }, // Bonus HP representing warmth and vitality
    }),
  },
  [ClothId.SpiritCloth]: {
    name: "Spirit Cloth",
    description: "Semi-transparent weave infused with spectral energy.",
    tier: TierEnum.rare,
    weight: 3,
    baseCost: 560,
    equipmentCraftingAttributes: createEquipmentCraftingAttributes({
      planarAttunement: 1, // Planar attunement bonus
      defense: { order: 1 }, // Minor order defense
    }),
  },
  [ClothId.Aetherweave]: {
    name: "Aetherweave",
    description: "Planar-threaded fabric ideal for enchantments.",
    tier: TierEnum.epic,
    weight: 3,
    baseCost: 2100,
    equipmentCraftingAttributes: createEquipmentCraftingAttributes({
      planarAttunement: 3, // Enhanced planar attunement ceiling
    }),
  },
  [ClothId.Fiendcloth]: {
    name: "Fiendcloth",
    description: "Heat-resistant cloth tanned from infernal fibers.",
    tier: TierEnum.epic,
    weight: 4,
    baseCost: 2000,
    equipmentCraftingAttributes: createEquipmentCraftingAttributes({
      defense: { fire: 2 }, // Fire defense
    }),
  },
  [ClothId.FluxweaveCloth]: {
    name: "Fluxweave Cloth",
    description: "Magitech fabric laced with energy conduits.",
    tier: TierEnum.rare,
    weight: 4,
    baseCost: 620,
    equipmentCraftingAttributes: createEquipmentCraftingAttributes({
      defense: { order: 1, chaos: 1 }, // Balanced order and chaos defense
      // traits: [TraitEnum.magitech], // Trait tag for magitech
    }),
  },
  [ClothId.DragonskinWeave]: {
    name: "Dragonskin Weave",
    description: "Armored textile woven from draconic fibers.",
    tier: TierEnum.legendary,
    weight: 6,
    baseCost: 70000,
    equipmentCraftingAttributes: createEquipmentCraftingAttributes({
      defense: { pDef: 2, fire: 1, earth: 1 }, // Physical and elemental defense
    }),
  },
  [ClothId.LeviathanLining]: {
    name: "Leviathan Lining",
    description: "Waterproof lining fashioned from leviathan hide.",
    tier: TierEnum.legendary,
    weight: 7,
    baseCost: 75000,
    equipmentCraftingAttributes: createEquipmentCraftingAttributes({
      defense: { water: 2 }, // Water defense
      // traits: [TraitEnum.waterproof], // Waterproof trait
    }),
  },
  [ClothId.HydraWeave]: {
    name: "Hydra Weave",
    description: "Self-repairing enchanted cloth imbued with hydra essence.",
    tier: TierEnum.legendary,
    weight: 5,
    baseCost: 65000,
    equipmentCraftingAttributes: createEquipmentCraftingAttributes({
      needs: { satietyBonus: 2 },
      defense: { water: 1, earth: 1 }, // Water and earth defense
    }),
  },
};

export const clothItems: Record<ClothId, Cloth> = Object.fromEntries(
  Object.entries(CLOTH_DATA).map(([id, data]) => [
    id,
    new Cloth({
      id: id as ClothId,
      name: { en: data.name, th: "" },
      description: { en: data.description, th: "" },
      tier: data.tier,
      weight: data.weight,
      cost: new ItemCost({ baseCost: data.baseCost }),
      isCraftable: true,
      equipmentCraftingAttributes: data.equipmentCraftingAttributes,
    }),
  ]),
) as Record<ClothId, Cloth>;
