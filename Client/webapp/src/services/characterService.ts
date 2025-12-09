import { restHandler } from "./RestHandler";
import type { CharacterInterface } from "@/types/api";

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
