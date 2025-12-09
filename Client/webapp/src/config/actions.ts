/**
 * Action Definitions for Frontend
 * 
 * Backend sends only action IDs (strings matching ActionInput enum)
 * Frontend has the full definition (icon, text, requirements)
 * 
 * IMPORTANT: Action IDs must match backend ActionInput enum values exactly
 */

import {
  Hotel,
  DirectionsWalk,
  FitnessCenter,
  MenuBook,
  Restaurant,
  Store,
  Handyman,
  Groups,
  Explore,
  Work,
  SelfImprovement,
  LocalLibrary,
} from "@mui/icons-material";

export interface ActionDefinition {
  id: string; // Must match ActionInput enum value from backend
  name: string; // Display name (will be L10N key later)
  icon: React.ElementType;
  needsSubSelection?: boolean; // If true, action requires additional parameters
  subSelectionType?: 
    | "attribute" 
    | "proficiency" 
    | "artisan" 
    | "skill" 
    | "book" 
    | "item"
    | "heavensDecree"
    | "churchOfLaoh"
    | "greatTempleOfLaoh"
    | "cultOfNizarith"
    | "shrine"
    | "majorShrine"
    | "knightOrder"
    | "magicSchool"
    | "arcaneAcademia";
}

/**
 * Frontend action definitions mapped to backend ActionInput enum values
 * Only includes basic actions that can be selected directly in the schedule
 */
export const ACTION_DEFINITIONS: Record<string, ActionDefinition> = {
  // Rest actions
  "Rest": {
    id: "Rest",
    name: "Rest",
    icon: Hotel,
  },
  "Inn": {
    id: "Inn",
    name: "Inn",
    icon: Hotel,
  },
  "Camping": {
    id: "Camping",
    name: "Camping",
    icon: Hotel,
  },
  "House Rest": {
    id: "House Rest",
    name: "House Rest",
    icon: Hotel,
  },
  
  // Social/Activity actions
  "Socialize": {
    id: "Socialize",
    name: "Socialize",
    icon: Groups,
  },
  "Stroll": {
    id: "Stroll",
    name: "Strolling",
    icon: DirectionsWalk,
  },
  "Tavern": {
    id: "Tavern",
    name: "Dining",
    icon: Restaurant,
  },
  
  // Training actions (need sub-selection)
  "Train Attribute": {
    id: "Train Attribute",
    name: "Train Attribute",
    icon: FitnessCenter,
    needsSubSelection: true,
    subSelectionType: "attribute",
  },
  "Train Proficiency": {
    id: "Train Proficiency",
    name: "Train Proficiency",
    icon: FitnessCenter,
    needsSubSelection: true,
    subSelectionType: "proficiency",
  },
  "Train Artisan": {
    id: "Train Artisan",
    name: "Train Artisan",
    icon: FitnessCenter,
    needsSubSelection: true,
    subSelectionType: "artisan",
  },
  "Train Skill": {
    id: "Train Skill",
    name: "Train Skill",
    icon: FitnessCenter,
    needsSubSelection: true,
    subSelectionType: "skill",
  },
  "Learn Skill": {
    id: "Learn Skill",
    name: "Learning",
    icon: MenuBook,
    needsSubSelection: true,
    subSelectionType: "skill",
  },
  
  // Reading/Studying
  "Read": {
    id: "Read",
    name: "Studying",
    icon: MenuBook,
    needsSubSelection: true,
    subSelectionType: "book",
  },
  
  // Crafting
  "Craft": {
    id: "Craft",
    name: "Crafting",
    icon: Handyman,
    needsSubSelection: true,
    subSelectionType: "item",
  },
  
  // Gathering actions
  "Mining": {
    id: "Mining",
    name: "Mining",
    icon: Work,
  },
  "Wood Cutting": {
    id: "Wood Cutting",
    name: "Wood Cutting",
    icon: Work,
  },
  "Foraging": {
    id: "Foraging",
    name: "Foraging",
    icon: Explore,
  },
  
  // Refining actions
  "Smelting": {
    id: "Smelting",
    name: "Smelting",
    icon: Work,
  },
  "Tanning": {
    id: "Tanning",
    name: "Tanning",
    icon: Work,
  },
  "Carpentry": {
    id: "Carpentry",
    name: "Carpentry",
    icon: Handyman,
  },
  "Weaving": {
    id: "Weaving",
    name: "Weaving",
    icon: Handyman,
  },
  "Enchanting": {
    id: "Enchanting",
    name: "Enchanting",
    icon: LocalLibrary,
  },
  
  // Organization/Sect actions (need sub-selection)
  "Heavens Decree": {
    id: "Heavens Decree",
    name: "Heavens Decree",
    icon: SelfImprovement,
    needsSubSelection: true,
    subSelectionType: "heavensDecree",
  },
  "Church of Laoh": {
    id: "Church of Laoh",
    name: "Church of Laoh",
    icon: LocalLibrary,
    needsSubSelection: true,
    subSelectionType: "churchOfLaoh",
  },
  "Great Temple of Laoh": {
    id: "Great Temple of Laoh",
    name: "Great Temple of Laoh",
    icon: LocalLibrary,
    needsSubSelection: true,
    subSelectionType: "greatTempleOfLaoh",
  },
  "Cult of Nizarith": {
    id: "Cult of Nizarith",
    name: "Cult of Nizarith",
    icon: LocalLibrary,
    needsSubSelection: true,
    subSelectionType: "cultOfNizarith",
  },
  "Shrine of Gelthoran": {
    id: "Shrine of Gelthoran",
    name: "Shrine of Gelthoran",
    icon: LocalLibrary,
    needsSubSelection: true,
    subSelectionType: "shrine",
  },
  "Major Shrine of Gelthoran": {
    id: "Major Shrine of Gelthoran",
    name: "Major Shrine of Gelthoran",
    icon: LocalLibrary,
    needsSubSelection: true,
    subSelectionType: "majorShrine",
  },
  "Shrine of Aqorath": {
    id: "Shrine of Aqorath",
    name: "Shrine of Aqorath",
    icon: LocalLibrary,
    needsSubSelection: true,
    subSelectionType: "shrine",
  },
  "Major Shrine of Aqorath": {
    id: "Major Shrine of Aqorath",
    name: "Major Shrine of Aqorath",
    icon: LocalLibrary,
    needsSubSelection: true,
    subSelectionType: "majorShrine",
  },
  "Shrine of Valthoria": {
    id: "Shrine of Valthoria",
    name: "Shrine of Valthoria",
    icon: LocalLibrary,
    needsSubSelection: true,
    subSelectionType: "shrine",
  },
  "Major Shrine of Valthoria": {
    id: "Major Shrine of Valthoria",
    name: "Major Shrine of Valthoria",
    icon: LocalLibrary,
    needsSubSelection: true,
    subSelectionType: "majorShrine",
  },
  "Shrine of Pyrnthanas": {
    id: "Shrine of Pyrnthanas",
    name: "Shrine of Pyrnthanas",
    icon: LocalLibrary,
    needsSubSelection: true,
    subSelectionType: "shrine",
  },
  "Major Shrine of Pyrnthanas": {
    id: "Major Shrine of Pyrnthanas",
    name: "Major Shrine of Pyrnthanas",
    icon: LocalLibrary,
    needsSubSelection: true,
    subSelectionType: "majorShrine",
  },
  "Knight Order": {
    id: "Knight Order",
    name: "Knight Order",
    icon: SelfImprovement,
    needsSubSelection: true,
    subSelectionType: "knightOrder",
  },
  "Magic School": {
    id: "Magic School",
    name: "Magic School",
    icon: LocalLibrary,
    needsSubSelection: true,
    subSelectionType: "magicSchool",
  },
  "Arcane Academia": {
    id: "Arcane Academia",
    name: "Arcane Academia",
    icon: LocalLibrary,
    needsSubSelection: true,
    subSelectionType: "arcaneAcademia",
  },
};

// Simplified mapping for UI convenience (maps simple IDs to backend ActionInput values)
// These are used when user selects from the schedule modal
export const UI_ACTION_MAP: Record<string, string> = {
  "rest": "Rest",
  "inn": "Inn",
  "camping": "Camping",
  "houseRest": "House Rest",
  "socializing": "Socialize",
  "strolling": "Stroll",
  "dining": "Tavern",
  "training": "Train Attribute", // Default to attribute training, can be changed
  "studying": "Read",
  "crafting": "Craft",
  "mining": "Mining",
  "woodCutting": "Wood Cutting",
  "foraging": "Foraging",
  "smelting": "Smelting",
  "tanning": "Tanning",
  "carpentry": "Carpentry",
  "weaving": "Weaving",
  "enchanting": "Enchanting",
};

// Mock: Different phases have different available actions
// Uses backend ActionInput enum values
// In reality, this will come from backend based on location, character, etc.
export const PHASE_AVAILABLE_ACTIONS: Record<number, string[]> = {
  0: ["Rest", "Train Attribute", "Read", "Socialize"], // Morning - productive activities
  1: ["Stroll", "Craft", "Mining", "Wood Cutting", "Foraging"], // Afternoon - active tasks
  2: ["Tavern", "Socialize", "Train Attribute", "Read"], // Evening - social/light activities
  3: ["Rest", "Read", "Socialize", "Enchanting"], // Night - quiet activities
};

/**
 * Get action definition by ID (backend ActionInput enum value)
 */
export function getActionById(id: string): ActionDefinition | null {
  return ACTION_DEFINITIONS[id] || null;
}

/**
 * Get action definition by UI action ID (convenience mapping)
 */
export function getActionByUIId(uiId: string): ActionDefinition | null {
  const backendId = UI_ACTION_MAP[uiId];
  if (!backendId) return null;
  return getActionById(backendId);
}

/**
 * Get available actions for a phase
 * Returns array of ActionDefinition objects
 * Action IDs are backend ActionInput enum values
 */
export function getActionsForPhase(phase: number): ActionDefinition[] {
  const actionIds = PHASE_AVAILABLE_ACTIONS[phase] || [];
  return actionIds
    .map(id => {
      // All IDs should be backend ActionInput enum values
      return getActionById(id);
    })
    .filter(Boolean) as ActionDefinition[];
}
