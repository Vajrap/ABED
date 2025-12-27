// Travel service for handling travel operations
import { restHandler } from './RestHandler';
import type { PartyInterface } from '@/types/api';

export interface StartTravelRequest {
  destination: string;
}

export interface StartTravelResponse {
  success: boolean;
  party?: PartyInterface;
  messageKey?: string;
}

class TravelService {
  /**
   * Start travel to a destination location
   */
  async startTravel(destination: string): Promise<StartTravelResponse> {
    try {
      const response = await restHandler.post<StartTravelRequest, StartTravelResponse>(
        "/api/travel/start",
        { destination },
        true // requireAuth
      );
      return response;
    } catch (error) {
      console.error("Start travel error:", error);
      return {
        success: false,
        messageKey: error instanceof Error ? error.message : "travel.startFailed",
      };
    }
  }
}

// Export singleton instance
export const travelService = new TravelService();
export default travelService;

