import { LeatherId } from "../..";
import { ItemMisc } from "../../Misc";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { createEquipmentCraftingAttributes } from "src/Entity/Item/Misc/Resource/EquipmentCraftingAttributes";

type LeatherDefinition = {
  name: string;
  description: string;
  tier: TierEnum;
  weight: number;
  baseCost: number;
  craftingAttributes?: ReturnType<typeof createEquipmentCraftingAttributes>;
};

const LEATHER_DATA: Record<LeatherId, LeatherDefinition> = {
  [LeatherId.Leather]: {
    name: "Tanned Leather",
    description: "Standard treated hide, durable and flexible.",
    tier: TierEnum.common,
    weight: 8,
    baseCost: 140,
    craftingAttributes: createEquipmentCraftingAttributes(),
  },
  [LeatherId.FineLeather]: {
    name: "Fine Leather",
    description: "Smooth, supple leather favored for quality garments.",
    tier: TierEnum.uncommon,
    weight: 7,
    baseCost: 300,
    craftingAttributes: createEquipmentCraftingAttributes({ tags: ["comfort"] }),
  },
  [LeatherId.ThickLeather]: {
    name: "Thick Leather",
    description: "Heavy-duty leather suited for rugged armor.",
    tier: TierEnum.uncommon,
    weight: 12,
    baseCost: 300,
    craftingAttributes: createEquipmentCraftingAttributes({ defense: { pDef: 1 } }),
  },
  [LeatherId.RuggedLeather]: {
    name: "Rugged Leather",
    description: "Dense leather from massive beasts like elephants or boars.",
    tier: TierEnum.rare,
    weight: 14,
    baseCost: 450,
    craftingAttributes: createEquipmentCraftingAttributes({ defense: { blunt: 1 } }),
  },
  [LeatherId.ScaledLeather]: {
    name: "Scaled Leather",
    description: "Leather reinforced with reptilian scales for added defense.",
    tier: TierEnum.rare,
    weight: 11,
    baseCost: 520,
    craftingAttributes: createEquipmentCraftingAttributes({ defense: { pierce: 1 } }),
  },
  [LeatherId.WyvernLeather]: {
    name: "Wyvern Leather",
    description: "Light yet potent leather that retains a magical charge.",
    tier: TierEnum.rare,
    weight: 9,
    baseCost: 650,
    craftingAttributes: createEquipmentCraftingAttributes({ elements: { wind: 1 } }),
  },
  [LeatherId.DrakeLeather]: {
    name: "Drake Leather",
    description: "Heavy draconic leather used in elite armors.",
    tier: TierEnum.epic,
    weight: 12,
    baseCost: 1800,
    craftingAttributes: createEquipmentCraftingAttributes({ defense: { fire: 1, earth: 1 } }),
  },
  [LeatherId.HydraLeather]: {
    name: "Hydra Leather",
    description: "Self-mending leather with residual regenerative power.",
    tier: TierEnum.legendary,
    weight: 13,
    baseCost: 65000,
    craftingAttributes: createEquipmentCraftingAttributes({ defense: {water: 2}, vitals: {hp: 20}, tags: ["regen"] }),
  },
  [LeatherId.LeviathanLeather]: {
    name: "Leviathan Leather",
    description: "Waterproof leather crafted from leviathan hide.",
    tier: TierEnum.legendary,
    weight: 16,
    baseCost: 70000,
    craftingAttributes: createEquipmentCraftingAttributes({ defense: { water: 3 }, tags: ["waterproof"] }),
  },
  [LeatherId.FiendLeather]: {
    name: "Fiend Leather",
    description: "Fire-resistant leather tanned from planar fiends.",
    tier: TierEnum.epic,
    weight: 10,
    baseCost: 1900,
    craftingAttributes: createEquipmentCraftingAttributes({ defense: { fire: 1 } }),
  },
  [LeatherId.AetherLeather]: {
    name: "Aether Leather",
    description: "Shimmering leather from magical beasts; conducts mana.",
    tier: TierEnum.epic,
    weight: 8,
    baseCost: 1850,
    craftingAttributes: createEquipmentCraftingAttributes({ planarAttunement: 1 }),
  },
  [LeatherId.SpiritLeather]: {
    name: "Spirit Leather",
    description: "Ethereal leather favored in arcane garments.",
    tier: TierEnum.rare,
    weight: 6,
    baseCost: 520,
    craftingAttributes: createEquipmentCraftingAttributes({ planarAttunement: 1, 
      // traits: [TraitEnum.magitech] 
    }),
  },
  [LeatherId.YetiLeather]: {
    name: "Yeti Leather",
    description: "Insulating leather suited for extreme cold.",
    tier: TierEnum.rare,
    weight: 11,
    baseCost: 480,
    craftingAttributes: createEquipmentCraftingAttributes({ defense: { water: 1 } }),
  },
  [LeatherId.SalamanderLeather]: {
    name: "Salamander Leather",
    description: "Heat-proof leather comfortable even near flames.",
    tier: TierEnum.rare,
    weight: 8,
    baseCost: 500,
    craftingAttributes: createEquipmentCraftingAttributes({ defense: { fire: 1 } }),
  },
  [LeatherId.ManticoreLeather]: {
    name: "Manticore Leather",
    description: "Spiked and toxin-resistant hide prized by rogues.",
    tier: TierEnum.epic,
    weight: 10,
    baseCost: 1950,
    craftingAttributes: createEquipmentCraftingAttributes({ defense: { pierce: 1 }, tags: ["venom"] }),
  },
};

export const leatherItems: Record<LeatherId, ItemMisc> = Object.fromEntries(
  Object.entries(LEATHER_DATA).map(([id, data]) => [
    id,
    new ItemMisc({
      id: id as LeatherId,
      name: { en: data.name, th: "" },
      description: { en: data.description, th: "" },
      tier: data.tier,
      weight: data.weight,
      cost: new ItemCost({ baseCost: data.baseCost }),
      isCraftable: true,
      equipmentCraftingAttributes: data.craftingAttributes || createEquipmentCraftingAttributes(),
    }),
  ]),
) as Record<LeatherId, ItemMisc>;
