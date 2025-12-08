// Party service for fetching party data
import { restHandler } from './RestHandler';
import type { PartyResponse } from '@/types/api';

class PartyService {
  /**
   * Get current user's party (includes all character data)
   */
  async getUserParty(): Promise<PartyResponse> {
    try {
      const response = await restHandler.get<PartyResponse>(
        "/api/party/user",
        true // requireAuth
      );
      return response;
    } catch (error) {
      console.error("Get user party error:", error);
      return {
        success: false,
        messageKey: error instanceof Error ? error.message : "party.fetchFailed",
      };
    }
  }
}

// Export singleton instance
export const partyService = new PartyService();
export default partyService;

