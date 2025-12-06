"use client";

import { useState, useEffect } from "react";
import type { LocalizedText } from "@/types/localization";
import { characterService } from "@/services/characterService";
import { L10N, getLocalizedText, getCurrentLanguage } from "@/localization";
import { calculateCharacterStats, type CalculatedStats, RACE_STATS, CLASS_STATS, BACKGROUND_STATS } from "./characterStatsData";

// Helper function to get unique race IDs (handle case variations)
export function getAvailableRaces(): Array<{ id: string; name: string }> {
  const raceSet = new Set<string>();
  const races: Array<{ id: string; name: string }> = [];
  
  Object.keys(RACE_STATS).forEach(key => {
    // Use capitalized version as canonical ID
    const canonicalId = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
    if (!raceSet.has(canonicalId)) {
      raceSet.add(canonicalId);
      races.push({ id: canonicalId, name: canonicalId });
    }
  });
  
  return races.sort((a, b) => a.name.localeCompare(b.name));
}

// Mapping from frontend display names to backend enum values
// Backend enum uses "Spellblade" (non-capital B) for consistency
const CLASS_ENUM_MAP: Record<string, string> = {
  Cleric: "Cleric",
  Seer: "Seer",
  Mage: "Mage",
  Mystic: "Mystic",
  Rogue: "Rogue",
  SpellBlade: "Spellblade", // Standardized to non-capital B
  spellBlade: "Spellblade",
  Spellblade: "Spellblade",
  spellblade: "Spellblade",
  Shaman: "Shaman",
  Barbarian: "Barbarian",
  Warrior: "Warrior",
  Knight: "Knight",
  Guardian: "Guardian",
  Paladin: "Paladin",
  Druid: "Druid",
  Monk: "Monk",
  Warlock: "Warlock",
  Duelist: "Duelist",
  Witch: "Witch",
  Inquisitor: "Inquisitor",
  Scholar: "Scholar",
  Engineer: "Engineer",
  Nomad: "Nomad",
};

// Helper function to normalize class name to backend enum format
function normalizeToEnumValue(key: string): string {
  // Check if we have a direct mapping
  if (CLASS_ENUM_MAP[key]) {
    return CLASS_ENUM_MAP[key];
  }
  
  // Handle special case: Spellblade (non-capital B) for consistency
  if (key.toLowerCase() === "spellblade") {
    return "Spellblade";
  }
  
  // For other classes, use standard capitalization
  return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
}

// Helper function to get unique class IDs and map to backend enum values
export function getAvailableClasses(): Array<{ id: string; name: string }> {
  const classSet = new Set<string>();
  const classes: Array<{ id: string; name: string }> = [];
  
  Object.keys(CLASS_STATS).forEach(key => {
    // Normalize to backend enum value
    const enumValue = normalizeToEnumValue(key);
    
    if (!classSet.has(enumValue)) {
      classSet.add(enumValue);
      // Use enum value as both id and display name (they match)
      classes.push({ id: enumValue, name: enumValue });
    }
  });
  
  return classes.sort((a, b) => a.name.localeCompare(b.name));
}

// Helper function to get unique background IDs
export function getAvailableBackgrounds(): Array<{ id: string; name: string }> {
  const backgroundSet = new Set<string>();
  const backgrounds: Array<{ id: string; name: string }> = [];
  
  Object.keys(BACKGROUND_STATS).forEach(key => {
    const canonicalId = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
    if (!backgroundSet.has(canonicalId)) {
      backgroundSet.add(canonicalId);
      backgrounds.push({ id: canonicalId, name: canonicalId });
    }
  });
  
  return backgrounds.sort((a, b) => a.name.localeCompare(b.name));
}

export interface CharacterCreationFormData {
  name: string;
  gender: "MALE" | "FEMALE";
  race: string;
  portrait: string;
  class: string;
  background: string;
}

export interface CharacterCreationState {
  isLoading: boolean;
  error: string | null;
  nameCheckMessage: string | null;
  stats: CalculatedStats | null;
  formData: CharacterCreationFormData;
  portraitIndex: number;
}

// Re-export for convenience
export type { CalculatedStats as CharacterCreationStats };

// Available portraits based on race and gender
const getPortraits = (race: string, gender: "MALE" | "FEMALE"): string[] => {
  const prefix = gender === "MALE" ? "m" : "f";
  const raceKey = race.toLowerCase();
  
  // Generate portrait IDs based on race and gender
  return [`${prefix}_${raceKey}01`, `${prefix}_${raceKey}02`, `${prefix}_${raceKey}03`];
};

// Default values
const DEFAULT_RACE = "Human";
const DEFAULT_CLASS = "Cleric";
const DEFAULT_BACKGROUND = "Noble";
const DEFAULT_GENDER: "MALE" | "FEMALE" = "MALE";

export function useCharacterCreationLogic() {
  const [state, setState] = useState<CharacterCreationState>({
    isLoading: false,
    error: null,
    nameCheckMessage: null,
    stats: null,
    formData: {
      name: "",
      gender: DEFAULT_GENDER,
      race: DEFAULT_RACE,
      portrait: getPortraits(DEFAULT_RACE, DEFAULT_GENDER)[0] || "",
      class: DEFAULT_CLASS,
      background: DEFAULT_BACKGROUND,
    },
    portraitIndex: 0,
  });

  // Calculate stats when race, class, or background changes
  useEffect(() => {
    if (state.formData.race && state.formData.class && state.formData.background) {
      const calculatedStats = calculateCharacterStats(
        state.formData.race,
        state.formData.class,
        state.formData.background
      );
      setState((prev) => ({
        ...prev,
        stats: calculatedStats,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        stats: null,
      }));
    }
  }, [state.formData.race, state.formData.class, state.formData.background]);

  // Update portrait when race or gender changes
  useEffect(() => {
    if (state.formData.race) {
      const portraits = getPortraits(state.formData.race, state.formData.gender);
      if (portraits.length > 0) {
        setState((prev) => ({
          ...prev,
          formData: { ...prev.formData, portrait: portraits[prev.portraitIndex % portraits.length] },
        }));
      }
    }
  }, [state.formData.race, state.formData.gender, state.portraitIndex]);

  // Update form field
  const updateField = <K extends keyof CharacterCreationFormData>(
    field: K,
    value: CharacterCreationFormData[K]
  ) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [field]: value },
      // Clear errors when user modifies form
      error: null,
      nameCheckMessage: null,
    }));
  };

  // Update portrait index
  const updatePortraitIndex = (direction: "prev" | "next") => {
    setState((prev) => {
      if (!prev.formData.race) return prev;
      
      const portraits = getPortraits(prev.formData.race, prev.formData.gender);
      if (portraits.length === 0) return prev;

      let newIndex;
      if (direction === "prev") {
        newIndex = prev.portraitIndex > 0 ? prev.portraitIndex - 1 : portraits.length - 1;
      } else {
        newIndex = prev.portraitIndex < portraits.length - 1 ? prev.portraitIndex + 1 : 0;
      }

      return {
        ...prev,
        portraitIndex: newIndex,
        formData: { ...prev.formData, portrait: portraits[newIndex] },
      };
    });
  };

  // Create character
  const createCharacter = async (): Promise<boolean> => {
    // Validate name is provided
    if (!state.formData.name.trim()) {
      setState((prev) => ({
        ...prev,
        error: getLocalizedText(L10N.characterCreation.nameRequired, getCurrentLanguage()),
      }));
      return false;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null, nameCheckMessage: null }));

    try {
      // Map frontend class name to backend enum value
      // Map frontend class name to backend enum value
      const normalizedClass = normalizeToEnumValue(state.formData.class);
      
      const requestData = {
        name: state.formData.name.trim(),
        gender: state.formData.gender,
        race: state.formData.race,
        portrait: state.formData.portrait,
        background: state.formData.background,
        startingClass: normalizedClass, // Use enum value for backend (e.g., "Spellblade")
      };

      const response = await characterService.createCharacter(requestData);

      if (response.success) {
        return true;
      } else {
        // Check if it's a name-related error
        if (
          response.messageKey === "character.nameTaken" ||
          response.message?.toLowerCase().includes("name") ||
          response.message?.toLowerCase().includes("taken")
        ) {
          setState((prev) => ({
            ...prev,
            nameCheckMessage: getLocalizedText(L10N.characterCreation.nameTaken, getCurrentLanguage()),
            isLoading: false,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            error: getLocalizedText(L10N.characterCreation.creationFailed, getCurrentLanguage()),
            isLoading: false,
          }));
        }
        return false;
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: getLocalizedText(L10N.characterCreation.creationFailed, getCurrentLanguage()),
        isLoading: false,
      }));
      return false;
    }
  };

  // Check if form is valid (only name is required)
  const isFormValid = (): boolean => {
    return state.formData.name.trim().length >= 3 &&
           state.formData.name.trim().length <= 20 &&
           /^[a-zA-Z\u0E00-\u0E7F\s]+$/.test(state.formData.name);
  };

  // Get available portraits for current race/gender
  const getAvailablePortraits = (): string[] => {
    if (!state.formData.race) return [];
    return getPortraits(state.formData.race, state.formData.gender);
  };

  return {
    ...state,
    updateField,
    updatePortraitIndex,
    createCharacter,
    isFormValid,
    getAvailablePortraits,
    // Available options from local data
    availableRaces: getAvailableRaces(),
    availableClasses: getAvailableClasses(),
    availableBackgrounds: getAvailableBackgrounds(),
  };
}
