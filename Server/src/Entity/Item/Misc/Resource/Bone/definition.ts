import { BoneId } from "../..";
import { Bone } from "./Bone";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { createEquipmentCraftingAttributes, EquipmentCraftingAttributes } from "src/Entity/Item/Misc/Resource/EquipmentCraftingAttributes";

type BoneDefinition = {
  name: string;
  description: string;
  tier: TierEnum;
  weight: number;
  baseCost: number;
  craftingAttributes?: EquipmentCraftingAttributes;
};

// Optional per-bone crafting attribute overrides.
// Keep most bones mundane. Apply small, thematic bonuses to rare+.
// Elemental bonuses are limited to at most two elements per bone,
// with legendary+ focusing on resource/ecosystem tags rather than raw stats.
const BONE_ATTR_OVERRIDES: Partial<Record<BoneId, object>> = {
  // Common / Uncommon — mostly mundane
  [BoneId.Fang]: { damage: { pierce: 1 } },
  [BoneId.Horn]: { damage: { blunt: 1 } },
  [BoneId.Ivory]: { defense: { blunt: 1 } },
  [BoneId.Talon]: { damage: { pCrit: 1 } },
  [BoneId.DeerAntler]: { defense: { pierce: 1 } },
  [BoneId.GoatHorn]: { damage: { blunt: 1 } },
  [BoneId.BisonBone]: { defense: { pDef: 1 } },
  [BoneId.CrocodileBone]: { defense: { slash: 1, pierce: 1 } },
  [BoneId.LizardBone]: { dodge: 1 },
  [BoneId.TurtleShell]: { defense: { blunt: 1 } },
  [BoneId.SharkTooth]: { damage: { slash: 1, pCrit: 1 } },
  [BoneId.WhaleRib]: { defense: { blunt: 1 } },
  [BoneId.ElephantTusk]: { defense: { blunt: 1 } },

  // Rare — slight elemental flavor, single-element focus
  [BoneId.SpiritBone]: { planarAttunement: 1, elements: { order: 1 } },
  [BoneId.YetiBone]: { defense: { water: 1 }, elements: { water: 1 } },
  [BoneId.SalamanderBone]: { defense: { fire: 1 }, elements: { fire: 1 } },
  [BoneId.GriffonTalon]: { damage: { wind: 1 } },
  [BoneId.TigerFang]: { damage: { pCrit: 1 } },
  [BoneId.LionFang]: { damage: { pDmg: 1 } },
  [BoneId.BasiliskBone]: { defense: { earth: 1 }, tags: ["resist:petrify"] },

  // Epic — at most two elements touched, thematic bonuses
  [BoneId.Drakespine]: { elements: { fire: 1 }, defense: { earth: 1 } },
  [BoneId.ErebiteBone]: { planarAttunement: 1, elements: { chaos: 2 }, tags: ["corruption:minor"] },
  [BoneId.ChimeraSpine]: { elements: { fire: 1, wind: 1 } },
  [BoneId.ManticoreSpike]: { damage: { pierce: 1 }, tags: ["venom-ready"] },

  // Legendary — focus on ecosystem/resource identity; keep raw stats modest
  [BoneId.HydraSkull]: { elements: { water: 2 }, vitals: { hp: 10 }, needs:{satietyBonus: 2} },
  [BoneId.PhoenixFeatherBone]: { elements: { fire: 2 }, vitals: { hp: 10, mp: 10 }, needs:{energyBonus: 2} },
  [BoneId.LeviathanBone]: { elements: { water: 2 }, vitals: { hp: 15 } },
};

const BONE_DATA: Record<BoneId, BoneDefinition> = {
  [BoneId.Bone]: {
    name: "Bone",
    description: "Common animal bone useful for alchemy and carving.",
    tier: TierEnum.common,
    weight: 5,
    baseCost: 50,
  },
  [BoneId.Fang]: {
    name: "Predator Fang",
    description: "Sharp fang harvested from predators; popular for talismans.",
    tier: TierEnum.uncommon,
    weight: 3,
    baseCost: 160,
  },
  [BoneId.Horn]: {
    name: "Beast Horn",
    description: "Curved horn or antler segment; strong structural material.",
    tier: TierEnum.uncommon,
    weight: 7,
    baseCost: 170,
  },
  [BoneId.Ivory]: {
    name: "Ivory",
    description: "Fine ivory from large beasts; prized by artisans.",
    tier: TierEnum.rare,
    weight: 12,
    baseCost: 450,
  },
  [BoneId.Talon]: {
    name: "Talon",
    description: "Sharp talon from hunting birds or raptors.",
    tier: TierEnum.uncommon,
    weight: 2,
    baseCost: 150,
  },
  [BoneId.Drakespine]: {
    name: "Drake Spine",
    description: "Segment from a drake's spine; channels elemental energy.",
    tier: TierEnum.epic,
    weight: 9,
    baseCost: 1800,
  },
  [BoneId.SpiritBone]: {
    name: "Spirit Bone",
    description: "Semi-transparent bone infused with spectral energy.",
    tier: TierEnum.rare,
    weight: 4,
    baseCost: 500,
  },
  [BoneId.ErebiteBone]: {
    name: "Erebite Bone",
    description: "Corrupted fossilized remains touched by planar darkness.",
    tier: TierEnum.epic,
    weight: 8,
    baseCost: 2000,
  },
  [BoneId.ElephantTusk]: {
    name: "Elephant Tusk",
    description: "Massive tusk harvested from elephants; ornate and heavy.",
    tier: TierEnum.rare,
    weight: 20,
    baseCost: 480,
  },
  [BoneId.CrocodileBone]: {
    name: "Crocodile Bone",
    description: "Dense bone from crocodilian beasts; resists decay.",
    tier: TierEnum.uncommon,
    weight: 10,
    baseCost: 180,
  },
  [BoneId.TigerFang]: {
    name: "Tiger Fang",
    description: "Curved fang from a tiger; used for talismans and knives.",
    tier: TierEnum.rare,
    weight: 3,
    baseCost: 420,
  },
  [BoneId.LionFang]: {
    name: "Lion Fang",
    description: "Large predator fang representing strength.",
    tier: TierEnum.rare,
    weight: 4,
    baseCost: 420,
  },
  [BoneId.DeerAntler]: {
    name: "Deer Antler",
    description: "Branching antler used for carving and ornamentation.",
    tier: TierEnum.common,
    weight: 6,
    baseCost: 90,
  },
  [BoneId.GoatHorn]: {
    name: "Goat Horn",
    description: "Curved horn useful in tools and rustic crafts.",
    tier: TierEnum.common,
    weight: 5,
    baseCost: 85,
  },
  [BoneId.BisonBone]: {
    name: "Bison Bone",
    description: "Hefty bone from bison; excellent for sturdy implements.",
    tier: TierEnum.uncommon,
    weight: 12,
    baseCost: 200,
  },
  [BoneId.LizardBone]: {
    name: "Lizard Bone",
    description: "Flexible bone from large reptiles; adaptable to constructs.",
    tier: TierEnum.common,
    weight: 3,
    baseCost: 80,
  },
  [BoneId.TurtleShell]: {
    name: "Turtle Shell Segment",
    description: "Hard shell segment, ideal for shield reinforcements.",
    tier: TierEnum.uncommon,
    weight: 14,
    baseCost: 190,
  },
  [BoneId.SharkTooth]: {
    name: "Shark Tooth",
    description: "Razor-sharp tooth from a shark; good for jagged blades.",
    tier: TierEnum.uncommon,
    weight: 2,
    baseCost: 160,
  },
  [BoneId.WhaleRib]: {
    name: "Whale Rib",
    description: "Massive rib bone used in large-scale structures.",
    tier: TierEnum.rare,
    weight: 25,
    baseCost: 450,
  },
  [BoneId.GriffonTalon]: {
    name: "Griffon Talon",
    description: "Large, curved talon of a griffon; coveted by warriors.",
    tier: TierEnum.rare,
    weight: 4,
    baseCost: 450,
  },
  [BoneId.BasiliskBone]: {
    name: "Basilisk Bone",
    description: "Bone fragment that carries petrifying residue.",
    tier: TierEnum.epic,
    weight: 7,
    baseCost: 2000,
  },
  [BoneId.ChimeraSpine]: {
    name: "Chimera Spine",
    description: "Chaotic multi-segmented spine from a chimera.",
    tier: TierEnum.epic,
    weight: 11,
    baseCost: 1900,
  },
  [BoneId.HydraSkull]: {
    name: "Hydra Skull Fragment",
    description: "Segment of a hydra's skull imbued with regenerative aura.",
    tier: TierEnum.legendary,
    weight: 16,
    baseCost: 60000,
  },
  [BoneId.YetiBone]: {
    name: "Yeti Bone",
    description: "Cold-infused bone harvested from mountain yeti.",
    tier: TierEnum.rare,
    weight: 9,
    baseCost: 450,
  },
  [BoneId.SalamanderBone]: {
    name: "Salamander Bone",
    description: "Heat-resistant bone that stays cool to the touch.",
    tier: TierEnum.rare,
    weight: 6,
    baseCost: 450,
  },
  [BoneId.PhoenixFeatherBone]: {
    name: "Phoenix Feather Bone",
    description: "Lightweight bone threaded with fiery plumage.",
    tier: TierEnum.legendary,
    weight: 5,
    baseCost: 65000,
  },
  [BoneId.ManticoreSpike]: {
    name: "Manticore Spike",
    description: "Venomous spike from a manticore tail.",
    tier: TierEnum.epic,
    weight: 6,
    baseCost: 2000,
  },
  [BoneId.LeviathanBone]: {
    name: "Leviathan Bone",
    description: "Ancient oceanic bone, colossal and resilient.",
    tier: TierEnum.legendary,
    weight: 30,
    baseCost: 70000,
  },
};

export const boneItems: Record<BoneId, Bone> = Object.fromEntries(
  Object.entries(BONE_DATA).map(([id, data]) => [
    id,
    new Bone({
      id: id as BoneId,
      name: { en: data.name, th: "" },
      description: { en: data.description, th: "" },
      tier: data.tier,
      weight: data.weight,
      cost: new ItemCost({ baseCost: data.baseCost }),
      isCraftable: false,
      equipmentCraftingAttributes: createEquipmentCraftingAttributes(
        (BONE_ATTR_OVERRIDES as any)[id as BoneId] ?? {}
      ),
    }),
  ]),
) as Record<BoneId, Bone>;
