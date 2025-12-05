// Character stats data - duplicated from backend for client-side calculation
// This matches the new backend structure from Server/src/API/characterCreation/
// Tier system: three=11, two=10, one=9, others=8

// Stat modifier function (matching backend logic)
function statMod(value: number): number {
  const boundaries = [
    { upperBound: 1, modifier: -5 },
    { upperBound: 3, modifier: -4 },
    { upperBound: 5, modifier: -3 },
    { upperBound: 7, modifier: -2 },
    { upperBound: 9, modifier: -1 },
    { upperBound: 11, modifier: 0 },
    { upperBound: 13, modifier: 1 },
    { upperBound: 15, modifier: 2 },
    { upperBound: 17, modifier: 3 },
    { upperBound: 19, modifier: 4 },
    { upperBound: 21, modifier: 5 },
    { upperBound: 23, modifier: 6 },
    { upperBound: 25, modifier: 7 },
    { upperBound: 27, modifier: 8 },
    { upperBound: 29, modifier: 9 },
    { upperBound: 30, modifier: 10 },
  ];

  for (const bound of boundaries) {
    if (value <= bound.upperBound) {
      return bound.modifier;
    }
  }
  return 0;
}

// Convert tier-based proficiencies to numeric values
function proficienciesFromTiers(tiers: { three?: string; two?: string; one?: string }): Record<string, number> {
  const proficiencies: Record<string, number> = {
    sword: 8,
    axe: 8,
    hammer: 8,
    spear: 8,
    shield: 8,
    bareHand: 8,
    bow: 8,
    dagger: 8,
    blade: 8,
    wand: 8,
    staff: 8,
    book: 8,
    orb: 8,
  };

  if (tiers.three) proficiencies[tiers.three] = 11;
  if (tiers.two) proficiencies[tiers.two] = 10;
  if (tiers.one) proficiencies[tiers.one] = 9;

  return proficiencies;
}

// Convert tier-based attributes to numeric values
function attributesFromTiers(baseAttributes: Record<string, number>, tiers: { three?: string; two?: string; one?: string }): Record<string, number> {
  const attributes = { ...baseAttributes };

  if (tiers.three) attributes[tiers.three] = (attributes[tiers.three] || 8) + 3;
  if (tiers.two) attributes[tiers.two] = (attributes[tiers.two] || 8) + 2;
  if (tiers.one) attributes[tiers.one] = (attributes[tiers.one] || 8) + 1;

  return attributes;
}

// Convert tier-based artisans to numeric values
function artisansFromTiers(tiers: { three?: string; two?: string; one?: string }): Record<string, number> {
  const artisans: Record<string, number> = {
    agriculture: 8,
    mining: 8,
    smithing: 8,
    woodCutting: 8,
    carpentry: 8,
    foraging: 8,
    weaving: 8,
    skinning: 8,
    tanning: 8,
    jewelry: 8,
    cooking: 8,
    alchemy: 8,
    enchanting: 8,
    fishing: 8,
    masonry: 8,
    brewing: 8,
    tinkering: 8,
    electrics: 8,
    performance: 8,
    tailoring: 8,
  };

  if (tiers.three) artisans[tiers.three] = 11;
  if (tiers.two) artisans[tiers.two] = 10;
  if (tiers.one) artisans[tiers.one] = 9;

  return artisans;
}

// Simple types - just the stat values we need
export interface RaceStatData {
  planarAptitude: number;
  baseHP: number;
  baseSP: number;
  baseMP: number;
  attributes: Record<string, number>;
}

export interface ClassStatData {
  proficiencies: Record<string, number>;
  startingSkills: string[];
  startingEquipments: Record<string, string | null>;
}

export interface BackgroundStatData {
  artisanBonuses: Record<string, number>;
  startingItems: Array<{ id: string; quantity: number }>;
}

// Base attributes (all races start with base 8)
const BASE_ATTRIBUTES: Record<string, number> = {
  charisma: 8,
  luck: 8,
  intelligence: 8,
  leadership: 8,
  vitality: 8,
  willpower: 8,
  planar: 8,
  control: 8,
  dexterity: 8,
  agility: 8,
  strength: 8,
  endurance: 8,
};

// Race definitions with stat data (from Server/src/API/characterCreation/races.ts)
export const RACE_STATS: Record<string, RaceStatData> = {
  Human: {
    planarAptitude: 50,
    baseHP: 15,
    baseSP: 15,
    baseMP: 15,
    attributes: attributesFromTiers(BASE_ATTRIBUTES, { three: "leadership", two: "willpower", one: "control" }),
  },
  human: {
    planarAptitude: 50,
    baseHP: 15,
    baseSP: 15,
    baseMP: 15,
    attributes: attributesFromTiers(BASE_ATTRIBUTES, { three: "leadership", two: "willpower", one: "control" }),
  },
  Elven: {
    planarAptitude: 70,
    baseHP: 15,
    baseSP: 10,
    baseMP: 20,
    attributes: attributesFromTiers(BASE_ATTRIBUTES, { three: "planar", two: "intelligence", one: "charisma" }),
  },
  elven: {
    planarAptitude: 70,
    baseHP: 15,
    baseSP: 10,
    baseMP: 20,
    attributes: attributesFromTiers(BASE_ATTRIBUTES, { three: "planar", two: "intelligence", one: "charisma" }),
  },
  Orc: {
    planarAptitude: 35,
    baseHP: 20,
    baseSP: 20,
    baseMP: 5,
    attributes: attributesFromTiers(BASE_ATTRIBUTES, { three: "strength", two: "vitality", one: "endurance" }),
  },
  orc: {
    planarAptitude: 35,
    baseHP: 20,
    baseSP: 20,
    baseMP: 5,
    attributes: attributesFromTiers(BASE_ATTRIBUTES, { three: "strength", two: "vitality", one: "endurance" }),
  },
  Dwarf: {
    planarAptitude: 35,
    baseHP: 15,
    baseSP: 20,
    baseMP: 10,
    attributes: attributesFromTiers(BASE_ATTRIBUTES, { three: "endurance", two: "intelligence", one: "willpower" }),
  },
  dwarf: {
    planarAptitude: 35,
    baseHP: 15,
    baseSP: 20,
    baseMP: 10,
    attributes: attributesFromTiers(BASE_ATTRIBUTES, { three: "endurance", two: "intelligence", one: "willpower" }),
  },
  Halfling: {
    planarAptitude: 50,
    baseHP: 15,
    baseSP: 15,
    baseMP: 15,
    attributes: attributesFromTiers(BASE_ATTRIBUTES, { three: "dexterity", two: "agility", one: "luck" }),
  },
  halfling: {
    planarAptitude: 50,
    baseHP: 15,
    baseSP: 15,
    baseMP: 15,
    attributes: attributesFromTiers(BASE_ATTRIBUTES, { three: "dexterity", two: "agility", one: "luck" }),
  },
  Vulpine: {
    planarAptitude: 70,
    baseHP: 13,
    baseSP: 13,
    baseMP: 18,
    attributes: attributesFromTiers(BASE_ATTRIBUTES, { three: "intelligence", two: "agility", one: "planar" }),
  },
  vulpine: {
    planarAptitude: 70,
    baseHP: 13,
    baseSP: 13,
    baseMP: 18,
    attributes: attributesFromTiers(BASE_ATTRIBUTES, { three: "intelligence", two: "agility", one: "planar" }),
  },
};

// Class definitions with proficiency data (from Server/src/API/characterCreation/classes.ts)
export const CLASS_STATS: Record<string, ClassStatData> = {
  Cleric: {
    proficiencies: proficienciesFromTiers({ three: "book", two: "hammer", one: "shield" }),
    startingSkills: ["Radiance", "Heal"],
    startingEquipments: {
      body: "Robe",
      rightHand: "QuarterStaff",
      leftHand: null,
    },
  },
  cleric: {
    proficiencies: proficienciesFromTiers({ three: "book", two: "hammer", one: "shield" }),
    startingSkills: ["Radiance", "Heal"],
    startingEquipments: {
      body: "Robe",
      rightHand: "QuarterStaff",
      leftHand: null,
    },
  },
  Seer: {
    proficiencies: proficienciesFromTiers({ three: "orb", two: "dagger", one: "book" }),
    startingSkills: ["ThreadSnip", "PlanarEcho"],
    startingEquipments: {
      body: "MageRobe",
      rightHand: "Orb",
      leftHand: null,
    },
  },
  seer: {
    proficiencies: proficienciesFromTiers({ three: "orb", two: "dagger", one: "book" }),
    startingSkills: ["ThreadSnip", "PlanarEcho"],
    startingEquipments: {
      body: "MageRobe",
      rightHand: "Orb",
      leftHand: null,
    },
  },
  Mage: {
    proficiencies: proficienciesFromTiers({ three: "wand", two: "staff", one: "book" }),
    startingSkills: ["ArcaneShield", "ArcaneBolt"],
    startingEquipments: {
      body: "MageRobe",
      rightHand: "Wand",
      leftHand: null,
    },
  },
  mage: {
    proficiencies: proficienciesFromTiers({ three: "wand", two: "staff", one: "book" }),
    startingSkills: ["ArcaneShield", "ArcaneBolt"],
    startingEquipments: {
      body: "MageRobe",
      rightHand: "Wand",
      leftHand: null,
    },
  },
  Mystic: {
    proficiencies: proficienciesFromTiers({ three: "orb", two: "bareHand", one: "wand" }),
    startingSkills: ["InnerVeil", "MistStep"],
    startingEquipments: {
      body: "MageRobe",
      rightHand: "Orb",
      leftHand: null,
    },
  },
  mystic: {
    proficiencies: proficienciesFromTiers({ three: "orb", two: "bareHand", one: "wand" }),
    startingSkills: ["InnerVeil", "MistStep"],
    startingEquipments: {
      body: "MageRobe",
      rightHand: "Orb",
      leftHand: null,
    },
  },
  Rogue: {
    proficiencies: proficienciesFromTiers({ three: "dagger", two: "bow", one: "blade" }),
    startingSkills: ["BleedingCut", "ThrowingKnives"],
    startingEquipments: {
      body: "LeatherArmor",
      rightHand: "Knife",
      leftHand: null,
    },
  },
  rogue: {
    proficiencies: proficienciesFromTiers({ three: "dagger", two: "bow", one: "blade" }),
    startingSkills: ["BleedingCut", "ThrowingKnives"],
    startingEquipments: {
      body: "LeatherArmor",
      rightHand: "Knife",
      leftHand: null,
    },
  },
  SpellBlade: {
    proficiencies: proficienciesFromTiers({ three: "sword", two: "blade", one: "wand" }),
    startingSkills: ["WindSlash", "PlanarEdge"],
    startingEquipments: {
      body: "LeatherArmor",
      rightHand: "ShortSword",
      leftHand: null,
    },
  },
  spellBlade: {
    proficiencies: proficienciesFromTiers({ three: "sword", two: "blade", one: "wand" }),
    startingSkills: ["WindSlash", "PlanarEdge"],
    startingEquipments: {
      body: "LeatherArmor",
      rightHand: "ShortSword",
      leftHand: null,
    },
  },
  Shaman: {
    proficiencies: proficienciesFromTiers({ three: "staff", two: "spear", one: "axe" }),
    startingSkills: ["HexOfRot", "MendSpirit"],
    startingEquipments: {
      body: "Robe",
      rightHand: "QuarterStaff",
      leftHand: null,
    },
  },
  shaman: {
    proficiencies: proficienciesFromTiers({ three: "staff", two: "spear", one: "axe" }),
    startingSkills: ["HexOfRot", "MendSpirit"],
    startingEquipments: {
      body: "Robe",
      rightHand: "QuarterStaff",
      leftHand: null,
    },
  },
  Barbarian: {
    proficiencies: proficienciesFromTiers({ three: "axe", two: "hammer", one: "bareHand" }),
    startingSkills: ["RecklessSwing", "Rage"],
    startingEquipments: {
      body: "LeatherArmor",
      rightHand: "Axe",
      leftHand: null,
    },
  },
  barbarian: {
    proficiencies: proficienciesFromTiers({ three: "axe", two: "hammer", one: "bareHand" }),
    startingSkills: ["RecklessSwing", "Rage"],
    startingEquipments: {
      body: "LeatherArmor",
      rightHand: "Axe",
      leftHand: null,
    },
  },
  Warrior: {
    proficiencies: proficienciesFromTiers({ three: "blade", two: "sword", one: "spear" }),
    startingSkills: ["WarCry", "PowerStrike"],
    startingEquipments: {
      body: "PaddedArmor",
      rightHand: "Scimitar",
      leftHand: null,
    },
  },
  warrior: {
    proficiencies: proficienciesFromTiers({ three: "blade", two: "sword", one: "spear" }),
    startingSkills: ["WarCry", "PowerStrike"],
    startingEquipments: {
      body: "PaddedArmor",
      rightHand: "Scimitar",
      leftHand: null,
    },
  },
  Knight: {
    proficiencies: proficienciesFromTiers({ three: "spear", two: "shield", one: "sword" }),
    startingSkills: ["PrecisionThrust"],
    startingEquipments: {
      body: "ChainShirt",
      rightHand: "Dory",
      leftHand: "Buckler",
    },
  },
  knight: {
    proficiencies: proficienciesFromTiers({ three: "spear", two: "shield", one: "sword" }),
    startingSkills: ["PrecisionThrust"],
    startingEquipments: {
      body: "ChainShirt",
      rightHand: "Dory",
      leftHand: "Buckler",
    },
  },
  Guardian: {
    proficiencies: proficienciesFromTiers({ three: "shield", two: "hammer", one: "axe" }),
    startingSkills: ["ShieldUp", "Taunt"],
    startingEquipments: {
      body: "ChainShirt",
      rightHand: "Hammer",
      leftHand: "Buckler",
    },
  },
  guardian: {
    proficiencies: proficienciesFromTiers({ three: "shield", two: "hammer", one: "axe" }),
    startingSkills: ["ShieldUp", "Taunt"],
    startingEquipments: {
      body: "ChainShirt",
      rightHand: "Hammer",
      leftHand: "Buckler",
    },
  },
  Paladin: {
    proficiencies: proficienciesFromTiers({ three: "hammer", two: "shield", one: "sword" }),
    startingSkills: ["DivineStrike"],
    startingEquipments: {
      body: "StuddedLeatherArmor",
      rightHand: "Hammer",
      leftHand: "Buckler",
    },
  },
  paladin: {
    proficiencies: proficienciesFromTiers({ three: "hammer", two: "shield", one: "sword" }),
    startingSkills: ["DivineStrike"],
    startingEquipments: {
      body: "StuddedLeatherArmor",
      rightHand: "Hammer",
      leftHand: "Buckler",
    },
  },
  Druid: {
    proficiencies: proficienciesFromTiers({ three: "staff", two: "spear", one: "bow" }),
    startingSkills: ["ThrowSpear", "VineWhip"],
    startingEquipments: {
      body: "HideArmor",
      rightHand: "Javelin",
      leftHand: null,
    },
  },
  druid: {
    proficiencies: proficienciesFromTiers({ three: "staff", two: "spear", one: "bow" }),
    startingSkills: ["ThrowSpear", "VineWhip"],
    startingEquipments: {
      body: "HideArmor",
      rightHand: "Javelin",
      leftHand: null,
    },
  },
  Monk: {
    proficiencies: proficienciesFromTiers({ three: "bareHand", two: "staff", one: "blade" }),
    startingSkills: ["FlurryOfBlows", "PalmStrike", "Meditation"],
    startingEquipments: {
      body: "Tunic",
      rightHand: null,
      leftHand: null,
    },
  },
  monk: {
    proficiencies: proficienciesFromTiers({ three: "bareHand", two: "staff", one: "blade" }),
    startingSkills: ["FlurryOfBlows", "PalmStrike", "Meditation"],
    startingEquipments: {
      body: "Tunic",
      rightHand: null,
      leftHand: null,
    },
  },
  Warlock: {
    proficiencies: proficienciesFromTiers({ three: "orb", two: "axe", one: "bow" }),
    startingSkills: ["Corruption", "ChaosBolt"],
    startingEquipments: {
      body: "MageRobe",
      rightHand: "Orb",
      leftHand: null,
    },
  },
  warlock: {
    proficiencies: proficienciesFromTiers({ three: "orb", two: "axe", one: "bow" }),
    startingSkills: ["Corruption", "ChaosBolt"],
    startingEquipments: {
      body: "MageRobe",
      rightHand: "Orb",
      leftHand: null,
    },
  },
  Duelist: {
    proficiencies: proficienciesFromTiers({ three: "sword", two: "shield", one: "bow" }),
    startingSkills: ["DuelingStance"],
    startingEquipments: {
      body: "LeatherArmor",
      rightHand: "ShortSword",
      leftHand: "Buckler",
    },
  },
  duelist: {
    proficiencies: proficienciesFromTiers({ three: "sword", two: "shield", one: "bow" }),
    startingSkills: ["DuelingStance"],
    startingEquipments: {
      body: "LeatherArmor",
      rightHand: "ShortSword",
      leftHand: "Buckler",
    },
  },
  Witch: {
    proficiencies: proficienciesFromTiers({ three: "wand", two: "book", one: "dagger" }),
    startingSkills: ["PoisonDart", "ChaosBinding"],
    startingEquipments: {
      body: "MageRobe",
      rightHand: "Wand",
      leftHand: null,
    },
  },
  witch: {
    proficiencies: proficienciesFromTiers({ three: "wand", two: "book", one: "dagger" }),
    startingSkills: ["PoisonDart", "ChaosBinding"],
    startingEquipments: {
      body: "MageRobe",
      rightHand: "Wand",
      leftHand: null,
    },
  },
  Inquisitor: {
    proficiencies: proficienciesFromTiers({ three: "book", two: "bow", one: "wand" }),
    startingSkills: ["ExposeWeakness", "RadiantSmite"],
    startingEquipments: {
      body: "MageRobe",
      rightHand: "Bible",
      leftHand: null,
    },
  },
  inquisitor: {
    proficiencies: proficienciesFromTiers({ three: "book", two: "bow", one: "wand" }),
    startingSkills: ["ExposeWeakness", "RadiantSmite"],
    startingEquipments: {
      body: "MageRobe",
      rightHand: "Bible",
      leftHand: null,
    },
  },
  Scholar: {
    proficiencies: proficienciesFromTiers({ three: "book", two: "sword", one: "dagger" }),
    startingSkills: ["CognitiveOverload", "DisruptPattern"],
    startingEquipments: {
      body: "MageRobe",
      rightHand: "Codex",
      leftHand: null,
    },
  },
  scholar: {
    proficiencies: proficienciesFromTiers({ three: "book", two: "sword", one: "dagger" }),
    startingSkills: ["CognitiveOverload", "DisruptPattern"],
    startingEquipments: {
      body: "MageRobe",
      rightHand: "Codex",
      leftHand: null,
    },
  },
  Engineer: {
    proficiencies: proficienciesFromTiers({ three: "bow", two: "hammer", one: "bareHand" }),
    startingSkills: ["ExplosiveBolt", "BearTrap"],
    startingEquipments: {
      body: "LeatherArmor",
      rightHand: "ShortBow",
      leftHand: null,
    },
  },
  engineer: {
    proficiencies: proficienciesFromTiers({ three: "bow", two: "hammer", one: "bareHand" }),
    startingSkills: ["ExplosiveBolt", "BearTrap"],
    startingEquipments: {
      body: "LeatherArmor",
      rightHand: "ShortBow",
      leftHand: null,
    },
  },
  Nomad: {
    proficiencies: proficienciesFromTiers({ three: "blade", two: "bow", one: "dagger" }),
    startingSkills: ["TacticalSlash", "AdaptiveStrike"],
    startingEquipments: {
      body: "LeatherArmor",
      rightHand: "Scimitar",
      leftHand: null,
    },
  },
  nomad: {
    proficiencies: proficienciesFromTiers({ three: "blade", two: "bow", one: "dagger" }),
    startingSkills: ["TacticalSlash", "AdaptiveStrike"],
    startingEquipments: {
      body: "LeatherArmor",
      rightHand: "Scimitar",
      leftHand: null,
    },
  },
};

// Background definitions with artisan bonuses (from Server/src/API/characterCreation/background.ts)
export const BACKGROUND_STATS: Record<string, BackgroundStatData> = {
  Retainer: {
    artisanBonuses: artisansFromTiers({ three: "carpentry", two: "smithing", one: "cooking" }),
    startingItems: [],
  },
  retainor: {
    artisanBonuses: artisansFromTiers({ three: "carpentry", two: "smithing", one: "cooking" }),
    startingItems: [],
  },
  Peasant: {
    artisanBonuses: artisansFromTiers({ three: "agriculture", two: "foraging", one: "woodCutting" }),
    startingItems: [],
  },
  peasant: {
    artisanBonuses: artisansFromTiers({ three: "agriculture", two: "foraging", one: "woodCutting" }),
    startingItems: [],
  },
  Noble: {
    artisanBonuses: artisansFromTiers({ three: "performance", two: "jewelry", one: "weaving" }),
    startingItems: [],
  },
  noble: {
    artisanBonuses: artisansFromTiers({ three: "performance", two: "jewelry", one: "weaving" }),
    startingItems: [],
  },
  Merchant: {
    artisanBonuses: artisansFromTiers({ three: "tinkering", two: "jewelry", one: "alchemy" }),
    startingItems: [],
  },
  merchant: {
    artisanBonuses: artisansFromTiers({ three: "tinkering", two: "jewelry", one: "alchemy" }),
    startingItems: [],
  },
  Adventurer: {
    artisanBonuses: artisansFromTiers({ three: "foraging", two: "smithing", one: "skinning" }),
    startingItems: [],
  },
  adventurer: {
    artisanBonuses: artisansFromTiers({ three: "foraging", two: "smithing", one: "skinning" }),
    startingItems: [],
  },
  Criminal: {
    artisanBonuses: artisansFromTiers({ three: "tinkering", two: "alchemy", one: "skinning" }),
    startingItems: [],
  },
  criminal: {
    artisanBonuses: artisansFromTiers({ three: "tinkering", two: "alchemy", one: "skinning" }),
    startingItems: [],
  },
  Hermit: {
    artisanBonuses: artisansFromTiers({ three: "foraging", two: "brewing", one: "skinning" }),
    startingItems: [],
  },
  hermit: {
    artisanBonuses: artisansFromTiers({ three: "foraging", two: "brewing", one: "skinning" }),
    startingItems: [],
  },
  FolkHero: {
    artisanBonuses: artisansFromTiers({ three: "woodCutting", two: "masonry", one: "smithing" }),
    startingItems: [],
  },
  folkHero: {
    artisanBonuses: artisansFromTiers({ three: "woodCutting", two: "masonry", one: "smithing" }),
    startingItems: [],
  },
  CityGuard: {
    artisanBonuses: artisansFromTiers({ three: "smithing", two: "tanning", one: "alchemy" }),
    startingItems: [],
  },
  cityGuard: {
    artisanBonuses: artisansFromTiers({ three: "smithing", two: "tanning", one: "alchemy" }),
    startingItems: [],
  },
};

export interface CalculatedStats {
  attributes: Record<string, { base: number; bonus: number }>;
  proficiencies: Record<string, { base: number; bonus: number }>;
  artisans: Record<string, { base: number; bonus: number }>;
  vitals: { maxHP: number; maxSP: number; maxMP: number; planarAptitude: number };
  startingSkills: string[];
  startingEquipments: Array<{ slot: string; item: string }>;
}

export function calculateCharacterStats(
  race: string,
  classValue: string,
  background: string
): CalculatedStats | null {
  // Try both original case and lowercase
  const raceData = RACE_STATS[race] || RACE_STATS[race.toLowerCase()];
  const classData = CLASS_STATS[classValue] || CLASS_STATS[classValue.toLowerCase()] || CLASS_STATS[classValue.charAt(0).toUpperCase() + classValue.slice(1).toLowerCase()];
  const backgroundKey = background.charAt(0).toUpperCase() + background.slice(1).toLowerCase();
  const backgroundData = BACKGROUND_STATS[background] || BACKGROUND_STATS[background.toLowerCase()] || BACKGROUND_STATS[backgroundKey];

  if (!raceData) {
    console.warn(`Race data not found for: ${race}`);
    return null;
  }
  
  if (!classData) {
    console.warn(`Class data not found for: ${classValue}, using defaults`);
    const defaultClass: ClassStatData = {
      proficiencies: proficienciesFromTiers({}),
      startingSkills: [],
      startingEquipments: {},
    };
    return calculateStatsWithData(raceData, defaultClass, backgroundData || { artisanBonuses: artisansFromTiers({}), startingItems: [] });
  }

  if (!backgroundData) {
    console.warn(`Background data not found for: ${background}, using defaults`);
    const defaultBackground: BackgroundStatData = { artisanBonuses: artisansFromTiers({}), startingItems: [] };
    return calculateStatsWithData(raceData, classData, defaultBackground);
  }

  return calculateStatsWithData(raceData, classData, backgroundData);
}

function calculateStatsWithData(
  raceData: RaceStatData,
  classData: ClassStatData,
  backgroundData: BackgroundStatData
): CalculatedStats {

  // Calculate attributes (from race only)
  const attributes: Record<string, { base: number; bonus: number }> = {};
  for (const [key, value] of Object.entries(raceData.attributes)) {
    attributes[key] = {
      base: value,
      bonus: 0,
    };
  }

  // Calculate vitals: base from race + modifier from attributes
  const vitality = raceData.attributes.vitality || 8;
  const planar = raceData.attributes.planar || 8;
  const endurance = raceData.attributes.endurance || 8;

  const hpMod = statMod(vitality);
  const mpMod = statMod(planar);
  const spMod = statMod(endurance);

  const maxHP = Math.max(1, raceData.baseHP + Math.max(1, hpMod));
  const maxMP = Math.max(1, raceData.baseMP + Math.max(1, mpMod));
  const maxSP = Math.max(1, raceData.baseSP + Math.max(1, spMod));

  // Calculate proficiencies (from class only)
  const proficiencies: Record<string, { base: number; bonus: number }> = {};
  for (const [key, value] of Object.entries(classData.proficiencies)) {
    proficiencies[key] = {
      base: value,
      bonus: 0,
    };
  }

  // Calculate artisan skills (from background only)
  const artisans: Record<string, { base: number; bonus: number }> = {};
  for (const [key, value] of Object.entries(backgroundData.artisanBonuses)) {
    artisans[key] = {
      base: value,
      bonus: 0,
    };
  }

  // Convert startingEquipments object to array
  const startingEquipments = Object.entries(classData.startingEquipments)
    .filter(([_, item]) => item !== null)
    .map(([slot, item]) => ({ slot, item: item! }));

  return {
    attributes,
    proficiencies,
    artisans,
    vitals: {
      maxHP,
      maxSP,
      maxMP,
      planarAptitude: raceData.planarAptitude,
    },
    startingSkills: [...classData.startingSkills],
    startingEquipments,
  };
}
