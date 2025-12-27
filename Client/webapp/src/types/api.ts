/**
 * API Contract Types
 * 
 * These types match the backend API interfaces exactly.
 * They serve as the contract between frontend and backend.
 * 
 * When backend changes, these should be updated to match.
 */

// ============================================
// Enums (matching backend)
// ============================================

export enum CharacterType {
  abberration = "abberration",
  beast = "beast",
  celestial = "celestial",
  construct = "construct",
  dragon = "dragon",
  elemental = "elemental",
  fey = "fey",
  fiend = "fiend",
  demon = "demon",
  devil = "devil",
  shapechanger = "shapechanger",
  giant = "giant",
  humanoid = "humanoid",
  monstrosity = "monstrosity",
  ooze = "ooze",
  plant = "plant",
  undead = "undead",
  summoned = "summoned",
  magical = "magical",
  vermin = "vermin",
  none = "none",
  insect = "insect",
}

export enum CharacterAlignmentEnum {
  Initiate = "Initiate",
  Kind = "Kind",
  Noble = "Noble",
  Saint = "Saint",
  Divine = "Divine",
  Cruel = "Cruel",
  Vile = "Vile",
  Tyrant = "Tyrant",
  Infernal = "Infernal",
  Mad = "Mad",
  Lunatic = "Lunatic",
  Maniac = "Maniac",
  Anarch = "Anarch",
}

export enum CharacterEquipmentSlot {
  headWear = "headWear",
  body = "body",
  leg = "leg",
  hand = "hand",
  foot = "foot",
  util = "util",
  ringL = "ringL",
  ringR = "ringR",
  earL = "earL",
  earR = "earR",
  neck = "neck",
  rightHand = "rightHand",
  leftHand = "leftHand",
}

// ============================================
// Supporting Types
// ============================================

export type ItemId = string;
export type CharacterEpithetEnum = string;
export type CharacterRoleEnum = string;
export type TraitEnum = string;
export type RelationStatusEnum = string;
export type ArtisanKey = string;
export type AttributeKey = string;
export type BattleStatKey = string;
export type ElementKey = string;
export type ProficiencyKey = string;
export type SubRegionEnum = string;
export type SkillId = string;
export type BreathingSkillId = string;
export type TierEnum = number;
export type InnLevel = string;
export type CharacterCraftingPreference = any; // TODO: Define properly
export type CharacterActionSequence = Record<string, any>; // TODO: Define properly
export type DeckCondition = Record<string, any>; // TODO: Define properly

// ============================================
// Skill Interfaces (matching backend)
// ============================================

export interface SkillConsume {
  hp: number;
  mp: number;
  sp: number;
  elements: Array<{ element: string; value: number }>;
}

export interface SkillProduce {
  hp: number;
  mp: number;
  sp: number;
  elements: Array<{ element: string; min: number; max: number }>;
}

export interface CharacterSkillInterface {
  id: SkillId;
  level: TierEnum;
  exp: number;
  consume?: SkillConsume;
  produce?: SkillProduce;
}

export interface CharacterBreathingSkillInterface {
  id: BreathingSkillId;
  level: TierEnum;
  exp: number;
}

// ============================================
// Main API Interfaces (matching backend exactly)
// ============================================

/**
 * CharacterInterface - Exact match of backend CharacterInterface
 * This is what the backend sends via API
 */
export interface CharacterInterface {
  id: string;
  name: string;
  gender: "MALE" | "FEMALE" | "NONE";
  race: string;
  type: CharacterType;
  level: number;
  portrait: string;
  background: string;
  alignment: CharacterAlignmentEnum;
  
  artisans: {
    [key in ArtisanKey]: {
      base: number;
      bonus: number;
    };
  };
  
  attributes: {
    [key in AttributeKey]: {
      base: number;
      bonus: number;
    };
  };
  
  battleStats: {
    [key in BattleStatKey]: {
      base: number;
      bonus: number;
    };
  };
  
  elements: {
    [key in ElementKey]: {
      base: number;
      bonus: number;
    };
  };
  
  proficiencies: {
    [key in ProficiencyKey]: {
      base: number;
      bonus: number;
    };
  };
  
  needs: {
    mood: number;
    energy: number;
    satiety: number;
  };
  
  vitals: {
    hp: { current: number; max: number };
    mp: { current: number; max: number };
    sp: { current: number; max: number };
  };
  
  fame: {
    [key in SubRegionEnum]: number;
  };
  
  behavior: {
    battlePolicy: "bold" | "measured" | "careful";
    tradePolicy: "trade" | "noTrade";
    craftingPreference: CharacterCraftingPreference;
    riskTaking: "bold" | "measured" | "careful";
    travelPace: "bold" | "measured" | "careful";
    eventResponse: "bold" | "measured" | "careful";
    preferredInnType: InnLevel;
    useCampSupplies: boolean;
  };
  
  title: string;
  possibleEpithets: CharacterEpithetEnum[];
  possibleRoles: CharacterRoleEnum[];
  actionSequence: CharacterActionSequence;
  informations: Record<string, number>;
  
  skills: CharacterSkillInterface;
  activeSkills: CharacterSkillInterface[];
  conditionalSkills: CharacterSkillInterface[];
  conditionalSkillsCondition: DeckCondition;
  breathingSkills: CharacterBreathingSkillInterface[];
  activeBreathingSkill: CharacterBreathingSkillInterface;
  
  planarAptitude: number;
  relations: Record<string, { value: number; status: RelationStatusEnum }>;
  traits: TraitEnum[];
  inventorySize: { base: number; bonus: number };
  inventory: Record<ItemId, number>;
  equipments: Record<CharacterEquipmentSlot, ItemId>;
}

/**
 * PartyInterface - Exact match of backend PartyInterface
 * This is what the backend sends via API
 */
export interface PartyInterface {
  id: string;
  partyID: string;
  location: string;
  isTraveling: boolean;
  travelDestination?: string; // Location ID of travel destination (if traveling)
  characters: (CharacterInterface | null)[]; // Full character data for all 6 slots
  playerCharacterId: string;
}

// ============================================
// API Response Types
// ============================================

export interface PartyResponse {
  success: boolean;
  party?: PartyInterface;
  messageKey?: string;
  message?: string;
}

// ============================================
// News Types (matching backend)
// ============================================

export enum NewsSignificance {
  TRIVIAL = "trivial",
  MINOR = "minor",
  NOTABLE = "notable",
  MAJOR = "major",
  MOMENTOUS = "momentous",
}

export enum NewsPropagation {
  SECRET = "secret",
  PRIVATE = "private",
  LOCAL = "local",
  REGIONAL = "regional",
  CONTINENTAL = "continental",
  GLOBAL = "global",
}

export type NewsScope =
  | { kind: "worldScope" }
  | { kind: "regionScope"; region: string }
  | { kind: "subRegionScope"; subRegion: string }
  | { kind: "locationScope"; location: string }
  | { kind: "partyScope"; partyId: string }
  | { kind: "privateScope"; characterId: string }
  | { kind: "none" };

export interface NewsContext {
  region: string;
  subRegion: string;
  location: string;
  partyId: string;
  characterIds: string[];
}

export interface L10NContent {
  en: string;
  th?: string;
  entities?: {
    chars?: Record<string, any>;
    items?: Record<string, any>;
    skills?: Record<string, any>;
    locs?: Record<string, any>;
    parties?: Record<string, any>;
  };
}

export interface GameTimeInterface {
  hour: number; // 1-4
  dayOfWeek: number; // 1-6
  dayOfSeason: number; // 1-48
  season: number; // 1-7
  dayPassed: number;
  year: number;
}

export interface NewsSpreadConfig {
  // Optional custom spread configuration
  [key: string]: any;
}

export interface News {
  id: string;
  ts: GameTimeInterface;
  scope: NewsScope;
  tags?: string[];
  content: L10NContent; // L10N content with markup
  tokens?: any[]; // DEPRECATED: Old token system
  context: NewsContext;
  significance: NewsSignificance;
  propagation: NewsPropagation;
  spreadConfig?: NewsSpreadConfig;
  secretTier?: TierEnum; // DEPRECATED
}

