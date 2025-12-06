// CharacterService.ts - Service for character-related API calls

import { restHandler } from './RestHandler';
import type {
  CharacterCreationRequest,
  CharacterResponse,
  CharacterCreationResponse,
  CharacterNameCheckResponse,
} from '@/types/character';

// Re-export types for backward compatibility
export type { Character } from '@/types/character';

class CharacterService {

  async createCharacter(characterData: CharacterCreationRequest): Promise<CharacterCreationResponse> {
    try {
      const response = await restHandler.post<CharacterCreationRequest, CharacterResponse>("/api/characterCreation/create", characterData, true);

      return response;
    } catch (error) {
      console.error("Character creation error:", error);
      return {
        success: false,
        messageKey: "character.creationFailed",
      };
    }
  }

  async getUserCharacter(): Promise<CharacterResponse> {
    const response = await restHandler.post<null, CharacterResponse>("/api/character/getUserCharacter", null, true);
    return response;
  }

  async checkCharacterName(name: string): Promise<CharacterNameCheckResponse> {
    try {
      const response = await restHandler.post<{name: string}, CharacterNameCheckResponse>("/api/character/checkName", { name });
      return response;
    } catch (error) {
      console.error("Character name check error:", error);
      return {
        success: false,
        messageKey: "character.nameCheckFailed",
        message: error instanceof Error ? error.message : "Failed to check character name",
      };
    }
  }

  async setActiveCharacter(characterId: string): Promise<CharacterResponse> {
    try {
      const response = await restHandler.post<{characterId: string}, CharacterResponse>("/api/character/setActive", { characterId }, true);

      return response;
    } catch (error) {
      console.error("Set active character error:", error);
      return {
        success: false,
        messageKey: "character.setActiveFailed",
        message: error instanceof Error ? error.message : "Failed to set active character",
      };
    }
  }

  async getMetadata(): Promise<{
    success: boolean;
    races?: Array<{ id: string; name: string }>;
    classes?: Array<{ id: string; name: string }>;
    backgrounds?: Array<{ id: string; name: string }>;
    messageKey?: string;
  }> {
    try {
      const response = await restHandler.get<{
        success: boolean;
        races: Array<{ id: string; name: string }>;
        classes: Array<{ id: string; name: string }>;
        backgrounds: Array<{ id: string; name: string }>;
      }>("/api/character/metadata", false);
      return response;
    } catch (error) {
      console.error("Character metadata error:", error);
      return {
        success: false,
        messageKey: "character.metadataFailed",
      };
    }
  }

  async previewStats(race: string, classValue: string, background: string): Promise<{
    success: boolean;
    stats?: {
      attributes: Record<string, { base: number; bonus: number }>;
      proficiencies: Record<string, { base: number; bonus: number }>;
      artisans: Record<string, { base: number; bonus: number }>;
      vitals: { maxHP: number; maxSP: number; maxMP: number; planarAptitude: number };
    };
    messageKey?: string;
  }> {
    try {
      const response = await restHandler.get<{
        success: boolean;
        stats?: {
          attributes: Record<string, { base: number; bonus: number }>;
          proficiencies: Record<string, { base: number; bonus: number }>;
          artisans: Record<string, { base: number; bonus: number }>;
          vitals: { maxHP: number; maxSP: number; maxMP: number; planarAptitude: number };
        };
        messageKey?: string;
      }>(`/api/character/preview?race=${encodeURIComponent(race)}&class=${encodeURIComponent(classValue)}&background=${encodeURIComponent(background)}`, false);
      return response;
    } catch (error) {
      console.error("Failed to fetch character stats preview:", error);
      return {
        success: false,
        messageKey: "character.previewFailed",
      };
    }
  }
}

// Export singleton instance
export const characterService = new CharacterService();
