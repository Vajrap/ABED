/**
 * Action Definitions for Frontend
 * 
 * Backend sends only action IDs (strings)
 * Frontend has the full definition (icon, text, requirements)
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
  id: string;
  name: string; // Will be L10N key later
  icon: React.ElementType;
  needsSubSelection?: boolean;
}

// All possible actions in the game
export const ACTION_DEFINITIONS: Record<string, ActionDefinition> = {
  rest: {
    id: "rest",
    name: "Rest",
    icon: Hotel,
  },
  strolling: {
    id: "strolling",
    name: "Strolling",
    icon: DirectionsWalk,
  },
  training: {
    id: "training",
    name: "Training",
    icon: FitnessCenter,
    needsSubSelection: true, // Needs to select what to train
  },
  studying: {
    id: "studying",
    name: "Studying",
    icon: MenuBook,
    needsSubSelection: true, // Needs to select what to study
  },
  dining: {
    id: "dining",
    name: "Dining",
    icon: Restaurant,
  },
  shopping: {
    id: "shopping",
    name: "Shopping",
    icon: Store,
  },
  crafting: {
    id: "crafting",
    name: "Crafting",
    icon: Handyman,
    needsSubSelection: true, // Needs to select what to craft
  },
  socializing: {
    id: "socializing",
    name: "Socializing",
    icon: Groups,
  },
  exploring: {
    id: "exploring",
    name: "Exploring",
    icon: Explore,
  },
  working: {
    id: "working",
    name: "Working",
    icon: Work,
  },
  meditation: {
    id: "meditation",
    name: "Meditation",
    icon: SelfImprovement,
  },
  research: {
    id: "research",
    name: "Research",
    icon: LocalLibrary,
    needsSubSelection: true,
  },
};

// Mock: Different phases have different available actions
// In reality, this will come from backend based on location, character, etc.
export const PHASE_AVAILABLE_ACTIONS: Record<number, string[]> = {
  0: ["rest", "training", "studying", "meditation"], // Morning - productive activities
  1: ["strolling", "shopping", "crafting", "working", "exploring"], // Afternoon - active tasks
  2: ["dining", "socializing", "training", "research"], // Evening - social/light activities
  3: ["rest", "studying", "meditation", "research"], // Night - quiet activities
};

/**
 * Get action definition by ID
 */
export function getActionById(id: string): ActionDefinition | null {
  return ACTION_DEFINITIONS[id] || null;
}

/**
 * Get available actions for a phase
 * Returns array of ActionDefinition objects
 */
export function getActionsForPhase(phase: number): ActionDefinition[] {
  const actionIds = PHASE_AVAILABLE_ACTIONS[phase] || [];
  return actionIds
    .map(id => ACTION_DEFINITIONS[id])
    .filter(Boolean) as ActionDefinition[];
}

