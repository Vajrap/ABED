"use client";

import { useState, useEffect } from "react";
import type { LocalizedText } from "@/types/localization";
import { characterService } from "@/services/characterService";
import { L10N, getLocalizedText, getCurrentLanguage } from "@/localization";
import { calculateCharacterStats, type CalculatedStats, RACE_STATS, CLASS_STATS, BACKGROUND_STATS } from "./characterStatsData";
import type { PortraitData } from "@/types/character";
import { portraitAssetService, type PortraitPartOptions } from "@/services/portraitAssetService";

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
  Spellblade: "Spellblade",
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
  portrait: PortraitData;
  class: string;
  background: string;
}

export interface CharacterCreationState {
  isLoading: boolean;
  error: string | null;
  nameCheckMessage: string | null;
  stats: CalculatedStats | null;
  formData: CharacterCreationFormData;
  portraitOptions: PortraitPartOptions | null;
  assetCatalogLoaded: boolean;
}

// Re-export for convenience
export type { CalculatedStats as CharacterCreationStats };

// Default values
const DEFAULT_RACE = "Human";
const DEFAULT_CLASS = "Cleric";
const DEFAULT_BACKGROUND = "Noble";
const DEFAULT_GENDER: "MALE" | "FEMALE" = "MALE";

// Default portrait data (will be replaced when asset catalog loads)
const DEFAULT_PORTRAIT: PortraitData = {
  base: 1,
  jaw: 1,
  eyes: 1,
  eyes_color: 1,
  face: 1,
  beard: null,

  hair: 1, // Default hair style number
  hair_color: 1,
};

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
      portrait: DEFAULT_PORTRAIT,
      class: DEFAULT_CLASS,
      background: DEFAULT_BACKGROUND,
    },
    portraitOptions: null,
    assetCatalogLoaded: false,
  });

  // Load asset catalog on mount
  useEffect(() => {
    const loadAssetCatalog = async () => {
      try {
        await portraitAssetService.loadCatalogs();
        const options = await portraitAssetService.getPortraitPartOptions(DEFAULT_RACE);
        const defaultPortrait = await portraitAssetService.generateDefaultPortrait(
          DEFAULT_GENDER,
          DEFAULT_RACE
        );
        setState((prev) => ({
          ...prev,
          portraitOptions: options,
          assetCatalogLoaded: true,
          formData: { ...prev.formData, portrait: defaultPortrait },
        }));
      } catch (error) {
        console.error("Failed to load asset catalog:", error);
        // Continue with default portrait even if catalog fails to load
        setState((prev) => ({
          ...prev,
          assetCatalogLoaded: true,
        }));
      }
    };

    loadAssetCatalog();
  }, []);

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

  // Update portrait options and regenerate default portrait when race or gender changes
  useEffect(() => {
    if (!state.assetCatalogLoaded || !state.formData.race) return;

    let cancelled = false;

    const updatePortraitForRaceAndGender = async () => {
      try {
        const options = await portraitAssetService.getPortraitPartOptions(state.formData.race);
        
        if (cancelled) return;
        
        if (cancelled) return;
        
        const defaultPortrait = await portraitAssetService.generateDefaultPortrait(
          state.formData.gender,
          state.formData.race
        );
        
        // Use all available hair numbers (gender handling is done in renderer)
        setState((prev) => ({
          ...prev,
          portraitOptions: options,
          formData: { ...prev.formData, portrait: defaultPortrait },
        }));
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to update portrait for race/gender:", error);
        }
      }
    };

    updatePortraitForRaceAndGender();
    
    return () => {
      cancelled = true;
    };
  }, [state.formData.race, state.formData.gender, state.assetCatalogLoaded]);

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

  // Update a specific portrait part
  const updatePortraitPart = (part: keyof PortraitData, value: string | number | null) => {
    setState((prev) => {
      const newPortrait = { ...prev.formData.portrait };
      if (part === "beard") {
        // Beard is now a number (1-6) or null
        if (value === null || value === "" || value === undefined) {
          newPortrait.beard = null;
      } else {
          const numValue = typeof value === "number" ? value : parseInt(String(value), 10);
          newPortrait.beard = isNaN(numValue) ? null : numValue;
        }
      } else if (part in newPortrait) {
        (newPortrait as any)[part] = value;
      }
      return {
        ...prev,
        formData: { ...prev.formData, portrait: newPortrait },
      };
    });
  };

  // Cycle through options for a portrait part
  const cyclePortraitPart = (part: keyof PortraitData, direction: "prev" | "next") => {
    if (!state.portraitOptions) return;

    // Get options for the part
    let options: (string | number)[];
    if (part === "beard") {
      // Beard options are numbers 1-6
      options = state.portraitOptions?.beard || [1, 2, 3, 4, 5, 6];
    } else if (part === "eyes_color" || part === "hair_color") {
      // Color options are handled separately, not cycled
      return;
    } else {
      const partOptions = state.portraitOptions?.[part as keyof typeof state.portraitOptions];
      if (!partOptions || !Array.isArray(partOptions) || partOptions.length === 0) {
        return;
      }
      options = partOptions;
    }

    const currentValue = state.formData.portrait[part];
    const currentIndex = options.indexOf(currentValue as any);
    let newIndex: number;

    // If current value not found, start at 0
    if (currentIndex === -1) {
      newIndex = 0;
    } else if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
    } else {
      newIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
    }

    const newValue = options[newIndex];
    updatePortraitPart(part, newValue as any);

    // Note: Beard is independent of jaw, so no special handling needed when jaw changes
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

  return {
    ...state,
    updateField,
    updatePortraitPart,
    cyclePortraitPart,
    createCharacter,
    isFormValid,
    // Available options from local data
    availableRaces: getAvailableRaces(),
    availableClasses: getAvailableClasses(),
    availableBackgrounds: getAvailableBackgrounds(),
  };
}
