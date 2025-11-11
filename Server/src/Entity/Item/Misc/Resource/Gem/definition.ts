import { GemId } from "../..";
import { ItemMisc } from "../../Misc";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import {
  createEquipmentCraftingAttributes,
  type EquipmentCraftingAttributes,
} from "src/Entity/Item/Misc/Resource/EquipmentCraftingAttributes";
import { type ElementKey } from "src/InterFacesEnumsAndTypes/Enums";

type CraftingOverride = Parameters<typeof createEquipmentCraftingAttributes>[0];

type GemDefinition = {
  name: string;
  description: string;
  tier: TierEnum;
  baseCost: number;
  weight?: number;
  isCraftable?: boolean;
  craftingOverrides?: CraftingOverride;
};

type StageKey = "flawed" | "polished" | "brilliant" | "perfect";

const DEFAULT_GEM_WEIGHT = 3;

const STAGE_INFO: Record<StageKey, { tier: TierEnum; baseCost: number; descriptionHook: string; isCraftable: boolean }> = {
  flawed: {
    tier: TierEnum.common,
    baseCost: 180,
    descriptionHook: "Impure and unstable, suitable for low-tier work.",
    isCraftable: false,
  },
  polished: {
    tier: TierEnum.uncommon,
    baseCost: 420,
    descriptionHook: "Refined for consistent use in standard enchantments.",
    isCraftable: true,
  },
  brilliant: {
    tier: TierEnum.rare,
    baseCost: 900,
    descriptionHook: "Radiant core ideal for advanced rituals and focuses.",
    isCraftable: true,
  },
  perfect: {
    tier: TierEnum.epic,
    baseCost: 1800,
    descriptionHook: "Flawless crystal embodying the element in pure form.",
    isCraftable: true,
  },
};

const STAGE_POTENCY: Record<StageKey, number> = {
  flawed: 1,
  polished: 2,
  brilliant: 3,
  perfect: 4,
};

type GemFamilyConfig = {
  baseName: string;
  theme: string;
  multiplier: number;
  ids: Partial<Record<StageKey, GemId>>;
  element?: ElementKey;
  secondaryElement?: ElementKey;
  tags: string[];
  planarBias?: number;
};

const GEM_FAMILIES: Array<GemFamilyConfig> = [
  {
    baseName: "Quartz",
    theme: "neutral arcane resonance",
    multiplier: 1,
    ids: {
      flawed: GemId.FlawedQuartz,
      polished: GemId.PolishedQuartz,
      brilliant: GemId.BrilliantQuartz,
      perfect: GemId.PerfectQuartz,
    },
    element: "order",
    tags: ["gem", "quartz"],
    planarBias: 0.75,
  },
  {
    baseName: "Diamond",
    theme: "structured and focused energy",
    multiplier: 1.2,
    ids: {
      flawed: GemId.FlawedDiamond,
      polished: GemId.PolishedDiamond,
      brilliant: GemId.BrilliantDiamond,
      perfect: GemId.PerfectDiamond,
    },
    element: "order",
    tags: ["gem", "diamond"],
    planarBias: 1,
  },
  {
    baseName: "Amethyst",
    theme: "chaotic resonance for illusions and song",
    multiplier: 1.15,
    ids: {
      flawed: GemId.FlawedAmethyst,
      polished: GemId.PolishedAmethyst,
      brilliant: GemId.BrilliantAmethyst,
      perfect: GemId.PerfectAmethyst,
    },
    element: "chaos",
    tags: ["gem", "amethyst"],
    planarBias: 1,
  },
  {
    baseName: "Ruby",
    theme: "elemental flame and vigor",
    multiplier: 1.25,
    ids: {
      flawed: GemId.FlawedRuby,
      polished: GemId.PolishedRuby,
      brilliant: GemId.BrilliantRuby,
      perfect: GemId.PerfectRuby,
    },
    element: "fire",
    tags: ["gem", "ruby"],
    planarBias: 1,
  },
  {
    baseName: "Onyx",
    theme: "grounding and protective earth magic",
    multiplier: 1.15,
    ids: {
      flawed: GemId.FlawedOnyx,
      polished: GemId.PolishedOnyx,
      brilliant: GemId.BrilliantOnyx,
      perfect: GemId.PerfectOnyx,
    },
    element: "earth",
    tags: ["gem", "onyx"],
    planarBias: 0.9,
  },
  {
    baseName: "Sapphire",
    theme: "fluid water attunement and clarity",
    multiplier: 1.2,
    ids: {
      flawed: GemId.FlawedSapphire,
      polished: GemId.PolishedSapphire,
      brilliant: GemId.BrilliantSapphire,
      perfect: GemId.PerfectSapphire,
    },
    element: "water",
    tags: ["gem", "sapphire"],
    planarBias: 1,
  },
  {
    baseName: "Topaz",
    theme: "windborne motion and guidance",
    multiplier: 1.1,
    ids: {
      flawed: GemId.FlawedTopaz,
      polished: GemId.PolishedTopaz,
      brilliant: GemId.BrilliantTopaz,
      perfect: GemId.PerfectTopaz,
    },
    element: "wind",
    tags: ["gem", "topaz"],
    planarBias: 0.85,
  },
];

const GEM_ELEMENT_MAP: Record<string, ElementKey> = {
  quartz: "order",
  diamond: "order",
  amethyst: "chaos",
  ruby: "fire",
  onyx: "earth",
  sapphire: "water",
  topaz: "wind",
};

const PLANARITE_LINES = [
  {
    name: "Planarite Quartz",
    essence: "unstable planar resonance",
    baseId: GemId.PlanariteQuartz,
    perfectId: GemId.PerfectPlanariteQuartz,
  },
  {
    name: "Planarite Diamond",
    essence: "planar-honed precision",
    baseId: GemId.PlanariteDiamond,
    perfectId: GemId.PerfectPlanariteDiamond,
  },
  {
    name: "Planarite Amethyst",
    essence: "storming chaotic currents",
    baseId: GemId.PlanariteAmethyst,
    perfectId: GemId.PerfectPlanariteAmethyst,
  },
  {
    name: "Planarite Ruby",
    essence: "searing planar fire",
    baseId: GemId.PlanariteRuby,
    perfectId: GemId.PerfectPlanariteRuby,
  },
  {
    name: "Planarite Onyx",
    essence: "abyssal grounding",
    baseId: GemId.PlanariteOnyx,
    perfectId: GemId.PerfectPlanariteOnyx,
  },
  {
    name: "Planarite Sapphire",
    essence: "tidal planar current",
    baseId: GemId.PlanariteSapphire,
    perfectId: GemId.PerfectPlanariteSapphire,
  },
  {
    name: "Planarite Topaz",
    essence: "planar gust and pulse",
    baseId: GemId.PlanariteTopaz,
    perfectId: GemId.PerfectPlanariteTopaz,
  },
];

const INDUSTRIAL_LINES = [
  {
    refinedId: GemId.RefinedQuartz,
    machinedId: GemId.MachinedQuartz,
    name: "Quartz",
    purpose: "precision instrumentation and timing arrays",
  },
  {
    refinedId: GemId.RefinedDiamond,
    machinedId: GemId.MachinedDiamond,
    name: "Diamond",
    purpose: "structured energy control within machineries",
  },
  {
    refinedId: GemId.RefinedAmethyst,
    machinedId: GemId.MachinedAmethyst,
    name: "Amethyst",
    purpose: "chaos modulation inside regulation systems",
  },
  {
    refinedId: GemId.RefinedRuby,
    machinedId: GemId.MachinedRuby,
    name: "Ruby",
    purpose: "heat transfer and magmatic tooling",
  },
  {
    refinedId: GemId.RefinedOnyx,
    machinedId: GemId.MachinedOnyx,
    name: "Onyx",
    purpose: "energy dampening frames and armor",
  },
  {
    refinedId: GemId.RefinedSapphire,
    machinedId: GemId.MachinedSapphire,
    name: "Sapphire",
    purpose: "temperature regulation and coolant channels",
  },
  {
    refinedId: GemId.RefinedTopaz,
    machinedId: GemId.MachinedTopaz,
    name: "Topaz",
    purpose: "resonance tuning and navigation matrices",
  },
];

const CONDUCTIVE_LINE: Array<{
  id: GemId;
  name: string;
  tier: TierEnum;
  baseCost: number;
  description: string;
}> = [
  {
    id: GemId.ArcQuartz,
    name: "Arc Quartz",
    tier: TierEnum.rare,
    baseCost: 680,
    description: "Oscillating quartz crystal that generates steady planar current.",
  },
  {
    id: GemId.ChargedDiamond,
    name: "Charged Diamond",
    tier: TierEnum.epic,
    baseCost: 1200,
    description: "Diamond lattice infused with lightning, conducting energy with minimal loss.",
  },
  {
    id: GemId.WaveAmethyst,
    name: "Wave Amethyst",
    tier: TierEnum.rare,
    baseCost: 780,
    description: "Modulates current frequencies for communication arrays.",
  },
  {
    id: GemId.ChargedRuby,
    name: "Charged Ruby",
    tier: TierEnum.epic,
    baseCost: 1100,
    description: "Converts stored current into intense heat for plasma tools.",
  },
  {
    id: GemId.GroundOnyx,
    name: "Ground Onyx",
    tier: TierEnum.rare,
    baseCost: 720,
    description: "Absorbs excess current, acting as safety sink in circuits.",
  },
  {
    id: GemId.CryoSapphire,
    name: "Cryo Sapphire",
    tier: TierEnum.epic,
    baseCost: 1180,
    description: "Maintains low temperatures as energy flows through, stabilising conduits.",
  },
  {
    id: GemId.PulseTopaz,
    name: "Pulse Topaz",
    tier: TierEnum.rare,
    baseCost: 840,
    description: "Stores and releases planar pulses, powering capacitors and signal beacons.",
  },
];

const gemDefinitions = new Map<GemId, GemDefinition>();

const stageTags = (family: GemFamilyConfig, stage: StageKey) => [
  ...family.tags,
  stage,
];

const buildElementOverrides = (
  element: ElementKey | undefined,
  secondary: ElementKey | undefined,
  potency: number,
): {
  elements?: Partial<Record<ElementKey, number>>;
  damage?: Partial<EquipmentCraftingAttributes["damage"]>;
} => {
  const elements: Partial<Record<ElementKey, number>> = {};
  const damage: Partial<EquipmentCraftingAttributes["damage"]> = {};

  if (element) {
    elements[element] = potency;
    damage[element] = potency;
  }

  if (secondary) {
    elements[secondary] = Math.max(1, potency - 1);
    damage[secondary] = Math.max(0, potency - 1);
  }

  return {
    elements: Object.keys(elements).length ? elements : undefined,
    damage: Object.keys(damage).length ? damage : undefined,
  };
};

GEM_FAMILIES.forEach((family) => {
  (Object.keys(family.ids) as StageKey[]).forEach((stageKey) => {
    const gemId = family.ids[stageKey];
    if (!gemId) return;

    const stage = STAGE_INFO[stageKey];
    const potency = STAGE_POTENCY[stageKey];
    const { elements, damage } = buildElementOverrides(
      family.element,
      family.secondaryElement,
      potency,
    );

    const planarAttunement = Math.round(
      potency * (family.planarBias ?? (family.element ? 1 : 0.75)),
    );

    const overrides: CraftingOverride = {
      tags: stageTags(family, stageKey),
    };

    if (elements) overrides.elements = elements;
    if (damage) overrides.damage = damage;
    if (planarAttunement > 0) overrides.planarAttunement = planarAttunement;

    gemDefinitions.set(gemId, {
      name: `${stageKey.charAt(0).toUpperCase() + stageKey.slice(1)} ${family.baseName}`,
      description: `${family.baseName} attuned to ${family.theme}. ${stage.descriptionHook}`,
      tier: stage.tier,
      baseCost: Math.round(stage.baseCost * family.multiplier),
      weight: DEFAULT_GEM_WEIGHT,
      isCraftable: stage.isCraftable,
      craftingOverrides: overrides,
    });
  });
});

const resolveElement = (base: string): ElementKey | undefined => {
  return GEM_ELEMENT_MAP[base.toLowerCase()];
};

PLANARITE_LINES.forEach((line) => {
  const baseName = line.name.split(" ")[1] ?? "";
  const element = resolveElement(baseName);
  const baseOverrides: CraftingOverride = {
    tags: ["gem", "planarite", line.name.toLowerCase().replace(/\s+/g, "-")],
    planarAttunement: element ? 4 : 5
  };
  const baseDamage: Partial<EquipmentCraftingAttributes["damage"]> = {};
  if (element) {
    baseOverrides.elements = { [element]: 3 };
    baseDamage[element] = 2;
    baseOverrides.damage = baseDamage;
  }

  gemDefinitions.set(line.baseId, {
    name: line.name,
    description: `Gem fused with planar ore, radiating ${line.essence}.`,
    tier: TierEnum.epic,
    baseCost: 2100,
    weight: DEFAULT_GEM_WEIGHT,
    isCraftable: false,
    craftingOverrides: baseOverrides,
  });

  const perfectOverrides: CraftingOverride = {
    tags: [
      "gem",
      "planarite",
      "perfect",
      line.name.toLowerCase().replace(/\s+/g, "-"),
    ],
    planarAttunement: element ? 4 : 5
  };
  const perfectDamage: Partial<EquipmentCraftingAttributes["damage"]> = {};
  if (element) {
    perfectOverrides.elements = { [element]: 5 };
    perfectDamage[element] = 4;
    perfectOverrides.damage = perfectDamage;
  }

  gemDefinitions.set(line.perfectId, {
    name: `Perfect ${line.name}`,
    description: `Flawless ${line.name.toLowerCase()} embodying ${line.essence} in pure focus.`,
    tier: TierEnum.legendary,
    baseCost: 280000,
    weight: DEFAULT_GEM_WEIGHT,
    isCraftable: true,
    craftingOverrides: perfectOverrides,
  });
});

INDUSTRIAL_LINES.forEach((line) => {
  const element = resolveElement(line.name);

  gemDefinitions.set(line.refinedId, {
    name: `Refined ${line.name}`,
    description: `${line.name} polished through industrial means for ${line.purpose}.`,
    tier: TierEnum.uncommon,
    baseCost: 320,
    weight: DEFAULT_GEM_WEIGHT,
    isCraftable: true,
    craftingOverrides: {
      tags: ["gem", "industrial", "refined", line.name.toLowerCase()],
      planarAttunement: element ? 2 : 1,
      elements: element ? { [element]: 1 } : undefined,
    },
  });

  gemDefinitions.set(line.machinedId, {
    name: `Machined ${line.name}`,
    description: `${line.name} cut with precision machinery, optimized for ${line.purpose}.`,
    tier: TierEnum.rare,
    baseCost: 640,
    weight: DEFAULT_GEM_WEIGHT,
    isCraftable: true,
    craftingOverrides: {
      tags: ["gem", "industrial", "machined", line.name.toLowerCase()],
      planarAttunement: element ? 2 : 3,
      elements: element ? { [element]: 2 } : undefined,
      damage: element ? { [element]: 1 } : undefined,
    },
  });
});

CONDUCTIVE_LINE.forEach((entry) => {
  const baseName = entry.name.split(" ")[1] ?? entry.name;
  const element = resolveElement(baseName);

  const overrides: CraftingOverride = {
    tags: ["gem", "conductive", entry.name.toLowerCase().replace(/\s+/g, "-")],
    planarAttunement: element ? 3 : 2,
  };
  if (element) {
    overrides.elements = { [element]: 3 };
    overrides.damage = { [element]: 2 };
  }

  gemDefinitions.set(entry.id, {
    name: entry.name,
    description: entry.description,
    tier: entry.tier,
    baseCost: entry.baseCost,
    weight: DEFAULT_GEM_WEIGHT,
    isCraftable: true,
    craftingOverrides: overrides,
  });
});

export const gemItems: Record<GemId, ItemMisc> = Object.fromEntries(
  Array.from(gemDefinitions.entries()).map(([id, data]) => [
    id,
    new ItemMisc({
      id,
      name: { en: data.name, th: "" },
      description: { en: data.description, th: "" },
      tier: data.tier,
      weight: data.weight ?? DEFAULT_GEM_WEIGHT,
      cost: new ItemCost({ baseCost: data.baseCost }),
      isCraftable: data.isCraftable ?? false,
      equipmentCraftingAttributes: createEquipmentCraftingAttributes(
        data.craftingOverrides,
      ),
    }),
  ]),
) as Record<GemId, ItemMisc>;
