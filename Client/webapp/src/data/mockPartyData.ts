/**
 * Mock party data for UI development
 * Comprehensive structure with all fields needed for UI display
 */

import { ClericSkillId, MageSkillId, SkillId, WarriorSkillId } from "@/L10N/skillEnums";

// ============================================
// Type Definitions
// ============================================

export interface MockPartyMember {
  name: string | null;
  level: number | null;
  portrait: string | null;
  isPlayer: boolean;
  
  // Full character data for UI
  id?: string;
  gender?: "MALE" | "FEMALE" | "NONE";
  race?: string;
  type?: string;
  background?: string;
  
  // Stats
  attributes?: Record<string, { base: number; bonus: number }>;
  battleStats?: Record<string, { base: number; bonus: number }>;
  elements?: Record<string, { base: number; bonus: number }>;
  proficiencies?: Record<string, { base: number; bonus: number }>;
  artisans?: Record<string, { base: number; bonus: number }>;
  
  // Alignment
  alignment?: { good: number; evil: number };
  
  // Title system
  epithet?: string;
  role?: string;
  title?: string;
  possibleEpithets?: string[];
  possibleRoles?: string[];
  
  // Vitals & Needs
  vitals?: {
    hp: { current: number; max: number };
    mp: { current: number; max: number };
    sp: { current: number; max: number };
  };
  needs?: {
    mood: number;
    energy: number;
    satiety: number;
  };
  
  // Planar
  planarAptitude?: number;
  
  // Skills - All 3 decks
  activeSkills?: MockSkill[];
  conditionalSkills?: MockSkill[];
  conditionalSkillsCondition?: {
    selectedCondition: string;
    [key: string]: any;
  };
  breathingSkills?: MockSkill[];
  
  // Inventory & Equipment
  inventory?: MockInventoryItem[];
  equipment?: MockEquipment[];
}

export interface MockSkill {
  id: SkillId; // SkillId enum
  level: number; // Skill level/tier
  exp: number; // Skill experience
  // We get name and desc from FE side L10N.
}

export interface MockInventoryItem {
  id: string; // ItemId enum
  // TODO: TO BE REMOVED
  // Actually we'll get name and desc from FE side L10N. but right now we didn't have the L10N for items yet.
  name: string;
  desc: string;
  weight: number;
  cost: number;
  quantity: number;
}

export interface MockEquipment {
  slot: string; // CharacterEquipmentSlot
  id: string; // EquipmentId enum
  // TODO: TO BE REMOVED
  // Actually we'll get name and desc from FE side L10N. but right now we didn't have the L10N for equipment yet.
  name: string;
  desc: string;
  weight: number;
  cost: number;
  
  // Weapon stats (if weapon)
  weaponStats?: {
    pDice?: string; // Physical damage dice (e.g., "1d6")
    mDice?: string; // Magical damage dice (e.g., "1d4")
    pDmg?: number; // Physical damage stat bonus
    mDmg?: number; // Magical damage stat bonus
    pHit?: number; // Physical hit stat bonus
    mHit?: number; // Magical hit stat bonus
    pCrit?: number; // Physical crit stat bonus
    mCrit?: number; // Magical crit stat bonus
    weaponType?: string;
    handle?: number; // 1 or 2 handed
  };
  
  // Armor stats (if armor)
  armorStats?: {
    pDEF?: number; // Physical defense
    mDEF?: number; // Magical defense
    dodgeBonus?: number;
  };
}

// ============================================
// Mock Data
// ============================================

export const mockParty: MockPartyMember[] = [
  {
    // Player Character - Mage (Hermit background)
    name: "Viljah",
    level: 1,
    portrait: "m_elven01",
    isPlayer: true,
    id: "mock-character-001",
    gender: "MALE",
    race: "Elven",
    type: "humanoid",
    background: "Hermit",
    
    // Title System
    epithet: "Hermit",
    role: "Mage",
    title: "Hermit Mage",
    possibleEpithets: ["Hermit"],
    possibleRoles: ["Mage"],
    
    // Alignment
    alignment: { good: 7, evil: 0 },
    
    // Stats
    attributes: {
      strength: { base: 7, bonus: 0 },
      dexterity: { base: 8, bonus: 0 },
      agility: { base: 7, bonus: 0 },
      endurance: { base: 7, bonus: 0 },
      vitality: { base: 8, bonus: 0 },
      intelligence: { base: 9, bonus: 0 },
      willpower: { base: 8, bonus: 0 },
      control: { base: 7, bonus: 0 },
      planar: { base: 8, bonus: 0 },
      luck: { base: 7, bonus: 0 },
      charisma: { base: 7, bonus: 0 },
      leadership: { base: 7, bonus: 0 },
    },
    
    battleStats: {
      pATK: { base: 0, bonus: 0 },
      pDEF: { base: 0, bonus: 0 },
      mATK: { base: 0, bonus: 0 },
      mDEF: { base: 0, bonus: 0 },
      pCRT: { base: 0, bonus: 0 },
      mCRT: { base: 0, bonus: 0 },
      ACC: { base: 0, bonus: 0 },
      EVA: { base: 0, bonus: 0 },
      SPD: { base: 0, bonus: 0 },
    },
    
    elements: {
      fire: { base: 0, bonus: 0 },
      water: { base: 0, bonus: 0 },
      wind: { base: 0, bonus: 0 },
      earth: { base: 0, bonus: 0 },
      light: { base: 0, bonus: 0 },
      dark: { base: 0, bonus: 0 },
    },
    
    proficiencies: {
      sword: { base: 7, bonus: 0 },
      axe: { base: 7, bonus: 0 },
      hammer: { base: 7, bonus: 0 },
      spear: { base: 7, bonus: 0 },
      bow: { base: 7, bonus: 0 },
      crossbow: { base: 7, bonus: 0 },
      book: { base: 7, bonus: 0 },
      shield: { base: 7, bonus: 0 },
      unarmed: { base: 7, bonus: 0 },
      wand: { base: 8, bonus: 0 },
      staff: { base: 7, bonus: 0 },
      orb: { base: 7, bonus: 0 },
    },
    
    artisans: {
      mining: { base: 7, bonus: 0 },
      smelting: { base: 7, bonus: 0 },
      smithing: { base: 7, bonus: 0 },
      woodCutting: { base: 7, bonus: 0 },
      carpentry: { base: 7, bonus: 0 },
      tanning: { base: 7, bonus: 0 },
      weaving: { base: 7, bonus: 0 },
      jewelry: { base: 7, bonus: 0 },
      alchemy: { base: 7, bonus: 0 },
      cooking: { base: 7, bonus: 0 },
      brewing: { base: 7, bonus: 0 },
      foraging: { base: 7, bonus: 0 },
      skinning: { base: 7, bonus: 0 },
      agriculture: { base: 7, bonus: 0 },
      masonry: { base: 7, bonus: 0 },
      tinkering: { base: 7, bonus: 0 },
      performance: { base: 7, bonus: 0 },
    },
    
    // Vitals & Needs
    vitals: {
      hp: { current: 25, max: 25 },
      mp: { current: 30, max: 30 },
      sp: { current: 20, max: 20 },
    },
    
    needs: {
      mood: 80,
      energy: 80,
      satiety: 80,
    },
    
    // Planar Attunement
    planarAptitude: 70,
    
    // Skills - Active Deck
    activeSkills: [
      {
        id: MageSkillId.ArcaneBolt, // MageSkillId.ArcaneBolt
        level: 1,
        exp: 0,
      },
      {
        id: MageSkillId.FireBolt, // MageSkillId.FireBolt
        level: 1,
        exp: 0,
      },
    ],
    
    // Skills - Conditional Deck
    conditionalSkills: [
      {
        id: MageSkillId.ArcaneShield, // MageSkillId.ArcaneShield
        level: 1,
        exp: 0,
      },
    ],
    
    conditionalSkillsCondition: {
      selectedCondition: "SELF",
      self: {
        vital: {
          hp: {
            min: 0,
            max: 50,
          },
        },
      },
    },
    
    // Skills - Breathing Deck (empty for now)
    breathingSkills: [],
    
    // Inventory
    inventory: [
      {
        id: "HealingPotion",
        name: "Healing Potion",
        desc: "Restores 2d4+2 HP when consumed.",
        weight: 0.5,
        cost: 50,
        quantity: 2,
      },
      {
        id: "ManaPotion",
        name: "Mana Potion",
        desc: "Restores 1d4+1 MP when consumed.",
        weight: 0.5,
        cost: 75,
        quantity: 1,
      },
    ],
    
    // Equipment
    equipment: [
      {
        slot: "body",
        id: "Body.Robe",
        name: "Robe",
        desc: "A simple cloth robe favored by mages.",
        weight: 2,
        cost: 50,
        armorStats: {
          pDEF: 0,
          mDEF: 1,
        },
      },
      {
        slot: "rightHand",
        id: "Weapon.Wand",
        name: "Wand",
        desc: "A basic magical wand for channeling arcane energy.",
        weight: 1,
        cost: 100,
        weaponStats: {
          pDice: undefined,
          mDice: "1d4",
          mDmg: 1,
          mHit: 2,
          mCrit: 1,
          weaponType: "Wand",
          handle: 1,
        },
      },
    ],
  },
  
  {
    // NPC 1 - Fighter (Soldier background)
    name: "Thorin",
    level: 3,
    portrait: "m_dwarf01",
    isPlayer: false,
    id: "mock-character-002",
    gender: "MALE",
    race: "Dwarven",
    type: "humanoid",
    background: "Soldier",
    
    epithet: "Soldier",
    role: "Fighter",
    title: "Soldier Fighter",
    possibleEpithets: ["Soldier"],
    possibleRoles: ["Fighter"],
    
    alignment: { good: 5, evil: 0 },
    
    attributes: {
      strength: { base: 10, bonus: 0 },
      dexterity: { base: 7, bonus: 0 },
      agility: { base: 7, bonus: 0 },
      endurance: { base: 11, bonus: 0 },
      vitality: { base: 10, bonus: 0 },
      intelligence: { base: 7, bonus: 0 },
      willpower: { base: 8, bonus: 0 },
      control: { base: 7, bonus: 0 },
      planar: { base: 7, bonus: 0 },
      luck: { base: 7, bonus: 0 },
      charisma: { base: 7, bonus: 0 },
      leadership: { base: 8, bonus: 0 },
    },
    
    battleStats: {
      pATK: { base: 0, bonus: 0 },
      pDEF: { base: 0, bonus: 0 },
      mATK: { base: 0, bonus: 0 },
      mDEF: { base: 0, bonus: 0 },
      pCRT: { base: 0, bonus: 0 },
      mCRT: { base: 0, bonus: 0 },
      ACC: { base: 0, bonus: 0 },
      EVA: { base: 0, bonus: 0 },
      SPD: { base: 0, bonus: 0 },
    },
    
    elements: {
      fire: { base: 0, bonus: 0 },
      water: { base: 0, bonus: 0 },
      wind: { base: 0, bonus: 0 },
      earth: { base: 0, bonus: 0 },
      light: { base: 0, bonus: 0 },
      dark: { base: 0, bonus: 0 },
    },
    
    proficiencies: {
      sword: { base: 8, bonus: 0 },
      axe: { base: 8, bonus: 0 },
      hammer: { base: 8, bonus: 0 },
      spear: { base: 7, bonus: 0 },
      bow: { base: 7, bonus: 0 },
      crossbow: { base: 7, bonus: 0 },
      book: { base: 7, bonus: 0 },
      shield: { base: 8, bonus: 0 },
      unarmed: { base: 7, bonus: 0 },
    },
    
    artisans: {
      mining: { base: 8, bonus: 0 },
      smelting: { base: 7, bonus: 0 },
      smithing: { base: 7, bonus: 0 },
      woodCutting: { base: 7, bonus: 0 },
      carpentry: { base: 7, bonus: 0 },
      tanning: { base: 7, bonus: 0 },
      weaving: { base: 7, bonus: 0 },
      jewelry: { base: 7, bonus: 0 },
      alchemy: { base: 7, bonus: 0 },
      cooking: { base: 7, bonus: 0 },
      brewing: { base: 7, bonus: 0 },
      foraging: { base: 7, bonus: 0 },
      skinning: { base: 7, bonus: 0 },
      agriculture: { base: 7, bonus: 0 },
      masonry: { base: 7, bonus: 0 },
      tinkering: { base: 7, bonus: 0 },
      performance: { base: 7, bonus: 0 },
    },
    
    vitals: {
      hp: { current: 35, max: 35 },
      mp: { current: 10, max: 10 },
      sp: { current: 25, max: 25 },
    },
    
    needs: {
      mood: 65,
      energy: 60,
      satiety: 70,
    },
    
    planarAptitude: 50,
    
    activeSkills: [
      {
        id: WarriorSkillId.PowerStrike, // WarriorSkillId.PowerStrike
        level: 1,
        exp: 0,
      },
      {
        id: WarriorSkillId.Cleave, // WarriorSkillId.Cleave
        level: 1,
        exp: 0,
      },
    ],
    
    conditionalSkills: [],
    conditionalSkillsCondition: {
      selectedCondition: "NONE",
    },
    
    breathingSkills: [],
    
    inventory: [
      {
        id: "IronIngot",
        name: "Iron Ingot",
        desc: "A refined piece of iron used in smithing.",
        weight: 2,
        cost: 30,
        quantity: 3,
      },
    ],
    
    equipment: [
      {
        slot: "body",
        id: "Body.ChainShirt",
        name: "Chain Shirt",
        desc: "Medium armor made of interlocking metal rings.",
        weight: 10,
        cost: 150,
        armorStats: {
          pDEF: 4,
          mDEF: 2,
        },
      },
      {
        slot: "rightHand",
        id: "Weapon.Sword.LongSword",
        name: "Long Sword",
        desc: "A versatile one-handed sword.",
        weight: 3,
        cost: 200,
        weaponStats: {
          pDice: "1d8",
          mDice: undefined,
          pDmg: 3,
          pHit: 2,
          pCrit: 1,
          weaponType: "Sword",
          handle: 1,
        },
      },
    ],
  },
  
  {
    // NPC 2 - Cleric (Scholar background)
    name: "Luna",
    level: 2,
    portrait: "f_human01",
    isPlayer: false,
    id: "mock-character-003",
    gender: "FEMALE",
    race: "Human",
    type: "humanoid",
    background: "Scholar",
    
    epithet: "Scholar",
    role: "Cleric",
    title: "Scholar Cleric",
    possibleEpithets: ["Scholar"],
    possibleRoles: ["Cleric"],
    
    alignment: { good: 5, evil: 0 },
    
    attributes: {
      strength: { base: 7, bonus: 0 },
      dexterity: { base: 7, bonus: 0 },
      agility: { base: 7, bonus: 0 },
      endurance: { base: 7, bonus: 0 },
      vitality: { base: 8, bonus: 0 },
      intelligence: { base: 9, bonus: 0 },
      willpower: { base: 10, bonus: 0 },
      control: { base: 8, bonus: 0 },
      planar: { base: 9, bonus: 0 },
      luck: { base: 7, bonus: 0 },
      charisma: { base: 8, bonus: 0 },
      leadership: { base: 7, bonus: 0 },
    },
    
    battleStats: {
      pATK: { base: 0, bonus: 0 },
      pDEF: { base: 0, bonus: 0 },
      mATK: { base: 0, bonus: 0 },
      mDEF: { base: 0, bonus: 0 },
      pCRT: { base: 0, bonus: 0 },
      mCRT: { base: 0, bonus: 0 },
      ACC: { base: 0, bonus: 0 },
      EVA: { base: 0, bonus: 0 },
      SPD: { base: 0, bonus: 0 },
    },
    
    elements: {
      fire: { base: 0, bonus: 0 },
      water: { base: 0, bonus: 0 },
      wind: { base: 0, bonus: 0 },
      earth: { base: 0, bonus: 0 },
      light: { base: 5, bonus: 0 },
      dark: { base: 0, bonus: 0 },
    },
    
    proficiencies: {
      sword: { base: 7, bonus: 0 },
      axe: { base: 7, bonus: 0 },
      hammer: { base: 7, bonus: 0 },
      spear: { base: 7, bonus: 0 },
      bow: { base: 7, bonus: 0 },
      crossbow: { base: 7, bonus: 0 },
      book: { base: 8, bonus: 0 },
      shield: { base: 7, bonus: 0 },
      unarmed: { base: 7, bonus: 0 },
    },
    
    artisans: {
      mining: { base: 7, bonus: 0 },
      smelting: { base: 7, bonus: 0 },
      smithing: { base: 7, bonus: 0 },
      woodCutting: { base: 7, bonus: 0 },
      carpentry: { base: 7, bonus: 0 },
      tanning: { base: 7, bonus: 0 },
      weaving: { base: 7, bonus: 0 },
      jewelry: { base: 7, bonus: 0 },
      alchemy: { base: 8, bonus: 0 },
      cooking: { base: 7, bonus: 0 },
      brewing: { base: 7, bonus: 0 },
      foraging: { base: 7, bonus: 0 },
      skinning: { base: 7, bonus: 0 },
      agriculture: { base: 7, bonus: 0 },
      masonry: { base: 7, bonus: 0 },
      tinkering: { base: 7, bonus: 0 },
      performance: { base: 7, bonus: 0 },
    },
    
    vitals: {
      hp: { current: 25, max: 25 },
      mp: { current: 20, max: 20 },
      sp: { current: 20, max: 20 },
    },
    
    needs: {
      mood: 70,
      energy: 55,
      satiety: 60,
    },
    
    planarAptitude: 75,
    
    activeSkills: [
      {
        id: ClericSkillId.Heal, // ClericSkillId.Heal
        level: 1,
        exp: 0,
      },
      {
        id: ClericSkillId.Radiance, // ClericSkillId.Radiance
        level: 1,
        exp: 0,
      },
    ],
    
    conditionalSkills: [
      {
        id: ClericSkillId.MassHeal, // ClericSkillId.MassHeal
        level: 1,
        exp: 0,
      },
    ],
    
    conditionalSkillsCondition: {
      selectedCondition: "TEAMMATE",
      teammate: {
        position: [0, 1, 2, 3, 4, 5],
        vital: {
          hp: {
            min: 0,
            max: 30,
          },
        },
      },
    },
    
    breathingSkills: [],
    
    inventory: [
      {
        id: "HolyWater",
        name: "Holy Water",
        desc: "Blessed water that deals extra damage to undead.",
        weight: 1,
        cost: 60,
        quantity: 1,
      },
    ],
    
    equipment: [
      {
        slot: "body",
        id: "Body.Robe",
        name: "Robe",
        desc: "A simple cloth robe.",
        weight: 2,
        cost: 50,
        armorStats: {
          pDEF: 0,
          mDEF: 1,
        },
      },
      {
        slot: "rightHand",
        id: "Weapon.Staff.QuarterStaff",
        name: "Quarter Staff",
        desc: "A simple wooden staff.",
        weight: 2,
        cost: 80,
        weaponStats: {
          pDice: "1d6",
          mDice: "1d4",
          pDmg: 1,
          mDmg: 2,
          pHit: 1,
          mHit: 2,
          pCrit: 1,
          mCrit: 1,
          weaponType: "Staff",
          handle: 2,
        },
      },
    ],
  },
  
  // Empty slots
  { name: null, level: null, portrait: null, isPlayer: false },
  { name: null, level: null, portrait: null, isPlayer: false },
  { name: null, level: null, portrait: null, isPlayer: false },
];
