/**
 * Game-related types for the frontend
 * These types are based on backend CharacterInterface but adapted for frontend UI needs
 */

// Character equipment slot type (matches backend CharacterEquipmentSlot)
export type CharacterEquipmentSlot =
  | "headWear"
  | "body"
  | "leg"
  | "hand"
  | "foot"
  | "util"
  | "ringL"
  | "ringR"
  | "earL"
  | "earR"
  | "neck"
  | "rightHand"
  | "leftHand";

// Equipment display type (what UI needs to display equipment)
// This represents equipment with full details for display purposes
// In production, equipment details (name, desc, stats) should be resolved from ItemId via L10N/item definitions
export interface EquipmentDisplay {
  slot: CharacterEquipmentSlot | string;
  itemId?: string; // EquipmentId - will be used to look up details from L10N
  id?: string; // Alternative field name for compatibility
  // For mock data: these fields are populated directly
  // For production: these should be resolved from ItemId via L10N
  name?: string;
  description?: string;
  desc?: string; // Alternative field name for compatibility
  weight?: number;
  cost?: number;
  weaponStats?: {
    pDice?: string;
    mDice?: string;
    pDmg?: number;
    mDmg?: number;
    pHit?: number;
    mHit?: number;
    pCrit?: number;
    mCrit?: number;
    weaponType?: string;
    handle?: number;
  };
  armorStats?: {
    pDEF?: number;
    mDEF?: number;
    dodgeBonus?: number;
  };
  weaponType?: string;
  handle?: number;
}

// Character stats view type - what the CharacterStatsModal needs
// Based on CharacterInterface but simplified for stats display
// This type represents the character data structure that the stats modal expects
export interface CharacterStatsView {
  id?: string;
  name: string | null;
  gender?: "MALE" | "FEMALE" | "NONE";
  race?: string;
  type?: string;
  level?: number | null;
  portrait?: string | null;
  background?: string;
  
  // Alignment - CharacterAlignmentEnum is { good: number; evil: number }
  alignment?: {
    good: number;
    evil: number;
  };
  
  // Title system
  title?: string;
  epithet?: string;
  role?: string;
  possibleEpithets?: string[];
  possibleRoles?: string[];
  
  // Stats - all optional since we check for existence
  attributes?: Record<string, { base: number; bonus: number }>;
  battleStats?: Record<string, { base: number; bonus: number }>;
  elements?: Record<string, { base: number; bonus: number }>;
  proficiencies?: Record<string, { base: number; bonus: number }>;
  artisans?: Record<string, { base: number; bonus: number }>;
  
  // Vitals & Needs
  vitals?: {
    hp: { current: number; base: number; bonus: number };
    mp: { current: number; base: number; bonus: number };
    sp: { current: number; base: number; bonus: number };
  };
  needs?: {
    mood: number;
    energy: number;
    satiety: number;
  };
  
  // Planar
  planarAptitude?: number;
  
  // Equipment - flexible to accept either:
  // 1. EquipmentDisplay[] (for display with resolved details - mock or processed data)
  // 2. Record<CharacterEquipmentSlot, string> (from backend - ItemId mapping)
  equipment?: EquipmentDisplay[] | Record<string, string>;
}

