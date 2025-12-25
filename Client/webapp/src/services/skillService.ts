// Skill service for fetching skill data
import { restHandler } from './RestHandler';
import type { SkillId } from '@/L10N/skillEnums';

export interface SkillConsume {
  hp: number;
  mp: number;
  sp: number;
  elements: Array<{ element: string; value: number }>;
}

export interface SkillProduce {
  hp: number;
  mp: number;
  sp: number;
  elements: Array<{ element: string; min: number; max: number }>;
}

export interface SkillDetails {
  id: SkillId;
  name: { en: string; th: string };
  tier: number;
  maxLevel: number;
  description: {
    text: { en: string; th: string };
    formula?: { en: string; th: string };
  };
  consume: SkillConsume;
  produce: SkillProduce;
  cooldown: number;
  class?: string;
}

export interface SkillDetailsResponse {
  success: boolean;
  skill?: SkillDetails;
  error?: string;
}

class SkillService {
  /**
   * Get skill details including consume and produce data
   */
  async getSkillDetails(skillId: SkillId): Promise<SkillDetailsResponse> {
    try {
      const response = await restHandler.get<SkillDetailsResponse>(
        `/api/skill/${skillId}`,
        true // requireAuth
      );
      return response;
    } catch (error) {
      console.error("Get skill details error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "skill.fetchFailed",
      };
    }
  }
}

// Export singleton instance
export const skillService = new SkillService();

