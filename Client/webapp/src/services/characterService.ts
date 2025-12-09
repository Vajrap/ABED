import { restHandler } from "./RestHandler";
import type { CharacterInterface } from "@/types/api";
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
}

export const characterService = new CharacterService();
