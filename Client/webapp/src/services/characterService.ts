import { restHandler } from "./RestHandler";
import type { CharacterInterface, CharacterSkillInterface } from "@/types/api";
import type { CharacterCreationRequest, CharacterCreationResponse } from "@/types/character";

export interface UpdateTitleRequest {
  characterId: string;
  epithet: string | null;
  role: string | null;
}

export interface UpdateTitleResponse {
  success: boolean;
  character?: CharacterInterface;
  error?: string;
}

export interface UpdateSkillsRequest {
  characterId: string;
  activeSkills?: string[]; // SkillId[]
  conditionalSkills?: string[]; // SkillId[]
}

export interface UpdateSkillsResponse {
  success: boolean;
  character?: CharacterInterface;
  error?: string;
}

class CharacterService {
  async createCharacter(request: CharacterCreationRequest): Promise<CharacterCreationResponse> {
    try {
      const response = await restHandler.post<CharacterCreationRequest, CharacterCreationResponse>(
        "/api/characterCreation/create",
        request,
        true // requireAuth
      );
      return response;
    } catch (error: any) {
      console.error("Error creating character:", error);
      return {
        success: false,
        message: error.message || "Failed to create character",
      };
    }
  }

  async updateTitle(request: UpdateTitleRequest): Promise<UpdateTitleResponse> {
    try {
      const response = await restHandler.post<UpdateTitleRequest, UpdateTitleResponse>(
        "/api/character/update-title",
        request,
        true // requireAuth
      );
      return response;
    } catch (error: any) {
      console.error("Error updating character title:", error);
      return {
        success: false,
        error: error.message || "Failed to update character title",
      };
    }
  }

  async updateSkills(request: UpdateSkillsRequest): Promise<UpdateSkillsResponse> {
    try {
      const response = await restHandler.post<UpdateSkillsRequest, UpdateSkillsResponse>(
        "/api/character/update-skills",
        request,
        true // requireAuth
      );
      return response;
    } catch (error: any) {
      console.error("Error updating character skills:", error);
      return {
        success: false,
        error: error.message || "Failed to update character skills",
      };
    }
  }

  /**
   * Check if the current user has a character
   */
  async checkHasCharacter(): Promise<{ success: boolean; hasCharacter: boolean }> {
    try {
      // Use autoAuth to validate session and get user info, then check character
      const authResponse = await restHandler.post<null, { success: boolean; hasCharacter?: boolean }>(
        "/api/auth/check-character",
        null,
        true // requireAuth
      );
      return {
        success: authResponse.success,
        hasCharacter: authResponse.hasCharacter ?? false,
      };
    } catch (error: any) {
      console.error("Error checking character:", error);
      return {
        success: false,
        hasCharacter: false,
      };
    }
  }
}

export const characterService = new CharacterService();
