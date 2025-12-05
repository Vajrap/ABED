"use client";

import { useState, useEffect } from "react";
import type { LocalizedText } from "@/types/localization";
import { characterService } from "@/services/characterService";
import { L10N } from "@/localization";
import { calculateCharacterStats, type CalculatedStats } from "./characterStatsData";

// Metadata types
export interface RaceMetadata {
  id: string;
  name: string;
}

export interface ClassMetadata {
  id: string;
  name: string;
}

export interface BackgroundMetadata {
  id: string;
  name: string;
}

export interface CharacterCreationMetadata {
  races: RaceMetadata[];
  classes: ClassMetadata[];
  backgrounds: BackgroundMetadata[];
}

export interface CharacterCreationFormData {
  name: string;
  gender: "MALE" | "FEMALE";
  race: string;
  portrait: string;
  class: string;
  background: string;
}

export interface CharacterStats {
  attributes: Record<string, { base: number; bonus: number }>;
  proficiencies: Record<string, { base: number; bonus: number }>;
  artisans: Record<string, { base: number; bonus: number }>;
  vitals: { maxHP: number; maxSP: number; maxMP: number; planarAptitude: number };
}

export interface CharacterCreationState {
  isLoading: boolean;
  isFetchingMetadata: boolean;
  error: string | LocalizedText | null;
  nameCheckMessage: string | null;
  metadata: CharacterCreationMetadata | null;
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
  // This is a simplified version - you may want to fetch actual portraits from backend
  return [`${prefix}_${raceKey}01`, `${prefix}_${raceKey}02`, `${prefix}_${raceKey}03`];
};

export function useCharacterCreationLogic() {
  const [state, setState] = useState<CharacterCreationState>({
    isLoading: false,
    isFetchingMetadata: true,
    error: null,
    nameCheckMessage: null,
    metadata: null,
    stats: null,
    formData: {
      name: "",
      gender: "MALE",
      race: "",
      portrait: "",
      class: "",
      background: "",
    },
    portraitIndex: 0,
  });

  // Fetch metadata on mount
  useEffect(() => {
    fetchMetadata();
  }, []);

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

  // Calculate stats locally when race, class, or background changes
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

  // Fetch available races, classes, and backgrounds
  const fetchMetadata = async () => {
    setState((prev) => ({ ...prev, isFetchingMetadata: true }));

    try {
      // Fetch metadata from backend API using characterService
      const data = await characterService.getMetadata();

      if (!data.success || !data.races || !data.classes || !data.backgrounds) {
        throw new Error("Invalid metadata response");
      }

      const metadata: CharacterCreationMetadata = {
        races: data.races,
        classes: data.classes,
        backgrounds: data.backgrounds,
      };

      setState((prev) => ({
        ...prev,
        metadata,
        isFetchingMetadata: false,
        // Set defaults once metadata is loaded
        formData: prev.formData.race
          ? prev.formData
          : {
              ...prev.formData,
              race: metadata.races[0]?.id || "",
              class: metadata.classes[0]?.id || "",
              background: metadata.backgrounds[0]?.id || "",
              portrait: getPortraits(metadata.races[0]?.id || "", prev.formData.gender)[0] || "",
            },
      }));
    } catch (error) {
      console.error("Failed to fetch character metadata:", error);
      setState((prev) => ({
        ...prev,
        isFetchingMetadata: false,
        error: "Failed to load character creation options",
      }));
    }
  };

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

  // Validate form
  const validateForm = (): boolean => {
    const { name, race, class: classValue, background } = state.formData;

    if (!name.trim()) {
      setState((prev) => ({
        ...prev,
        error: L10N.characterCreation.nameRequired,
      }));
      return false;
    }

    if (!/^[a-zA-Z\u0E00-\u0E7F\s]+$/.test(name)) {
      setState((prev) => ({
        ...prev,
        error: L10N.characterCreation.nameInvalidFormat,
      }));
      return false;
    }

    if (name.length > 20) {
      setState((prev) => ({
        ...prev,
        error: L10N.characterCreation.nameMaxLength,
      }));
      return false;
    }

    if (name.trim().length < 3) {
      setState((prev) => ({
        ...prev,
        error: L10N.characterCreation.nameMinLength,
      }));
      return false;
    }

    if (!race || !classValue || !background) {
      setState((prev) => ({
        ...prev,
        error: "Please select race, class, and background",
      }));
      return false;
    }

    return true;
  };

  // Create character
  const createCharacter = async (): Promise<boolean> => {
    if (!validateForm()) {
      return false;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null, nameCheckMessage: null }));

    try {
      const requestData = {
        name: state.formData.name.trim(),
        gender: state.formData.gender,
        race: state.formData.race,
        portrait: state.formData.portrait,
        background: state.formData.background,
        startingClass: state.formData.class, // Backend expects "startingClass"
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
            nameCheckMessage: L10N.characterCreation.nameTaken,
            isLoading: false,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            error: response.message || L10N.characterCreation.creationFailed,
            isLoading: false,
          }));
        }
        return false;
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: L10N.characterCreation.creationFailed,
        isLoading: false,
      }));
      return false;
    }
  };

  // Check if form is valid
  const isFormValid = (): boolean => {
    const { name, race, class: classValue, background } = state.formData;
    return (
      name.trim().length >= 3 &&
      name.trim().length <= 20 &&
      /^[a-zA-Z\u0E00-\u0E7F\s]+$/.test(name) &&
      !!race &&
      !!classValue &&
      !!background
    );
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
  };
}

