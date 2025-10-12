/**
 * Character Type Definitions for Frontend
 * 
 * These types match the backend CharacterInterface.
 * The backend sends simplified/mapped character data to the frontend.
 */

// Basic stat structure (used in many character systems)
export interface StatValue {
  base: number;
  bonus: number;
  battle?: number;
  total?: number;
  exp?: number;
}

// Vital structure (HP, MP, SP)
export interface VitalValue {
  current: number;
  max: number;
}

// Skill structure
export interface SkillValue {
  level: number;
  experience: number;
}

// Main Character Interface (matches backend CharacterInterface)
export interface Character {
  // Basic Info
  id: string;
  name: string;
  gender: "MALE" | "FEMALE" | "NONE";
  race: string;
  type: string; // CharacterType enum
  level: number;
  portrait: string;
  background: string;
  alignment: any; // CharacterAlignmentEnum from backend
  
  // Character Systems (stats)
  artisans: Record<string, StatValue>; // Crafting skills
  attributes: Record<string, StatValue>; // STR, INT, etc.
  battleStats: Record<string, StatValue>; // ATK, DEF, etc.
  elements: Record<string, StatValue>; // Fire, Water, etc.
  proficiencies: Record<string, StatValue>; // Weapon proficiencies
  
  // Character State
  needs: any; // { mood, energy, satiety }
  vitals: Record<string, VitalValue>; // { hp, mp, sp }
  fame: any; // Region-based fame
  
  // Behavior & Identity
  behavior: any; // Battle/trade policies
  title: any; // Character title/epithet
  possibleEpithets: string[];
  possibleRoles: string[];
  actionSequence: any; // Daily action schedule
  informations: Record<string, number>;
  
  // Skills & Abilities
  skills: Record<string, SkillValue>; // Learned skills
  activeSkills: any[]; // Currently equipped skills
  conditionalSkills: any[];
  conditionalSkillsCondition: any;
  breathingSkills: any; // Special breathing techniques
  activeBreathingSkill: any;
  planarAptitude: any; // Planar magic aptitude
  
  // Social
  relations: any; // NPC relationships
  traits: string[]; // Character traits
  
  // Inventory
  inventorySize: { base: number; bonus: number };
  inventory: Record<string, number>; // ItemId -> quantity
  equipments: any; // Equipped items
}

// Character creation request (what FE sends to create a character)
export interface CharacterCreationRequest {
  name: string;
  gender: "MALE" | "FEMALE" | "NONE";
  race: string;
  portrait: string;
  background: string;
  startingClass: string;
}

// Character API responses
export interface CharacterResponse {
  success: boolean;
  character?: Character;
  messageKey?: string;
  message?: string;
}

export interface CharacterCreationResponse {
  success: boolean;
  messageKey?: string;
  message?: string;
}

export interface CharacterNameCheckResponse {
  success: boolean;
  available?: boolean;
  messageKey?: string;
  message?: string;
}

