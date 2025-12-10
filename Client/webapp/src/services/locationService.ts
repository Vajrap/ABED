// Location service for fetching location data
import { restHandler } from './RestHandler';

import type { GameTimeInterface } from '@/types/api';

export interface LocationData {
  id: string;
  name: string;
  region: string;
  subRegion: string;
  situation: string; // Image identifier
  hasRailStation: boolean;
  availableActions: string[]; // Legacy: flat array (deprecated)
  availableActionsByPhase?: {
    morning: string[];
    afternoon: string[];
    evening: string[];
    night: string[];
  }; // New: phase-specific actions
  gameTime?: GameTimeInterface; // Current game time
}

export interface LocationResponse {
  success: boolean;
  location?: LocationData;
  messageKey?: string;
}

class LocationService {
  /**
   * Get current location for the logged-in user's character
   */
  async getCurrentLocation(): Promise<LocationResponse> {
    try {
      const response = await restHandler.get<LocationResponse>(
        "/api/location/current",
        true // requireAuth
      );
      return response;
    } catch (error) {
      console.error("Get current location error:", error);
      return {
        success: false,
        messageKey: error instanceof Error ? error.message : "location.fetchFailed",
      };
    }
  }

  /**
   * Get all NPCs at the current location
   */
  async getLocationNPCs(): Promise<{
    success: boolean;
    npcs?: Array<{
      id: string;
      name: string;
      portrait?: any; // PortraitData or string
      level: number;
      race: string;
      gender: "MALE" | "FEMALE" | "NONE";
      background: string | null;
    }>;
    locationId?: string;
    messageKey?: string;
  }> {
    try {
      const response = await restHandler.get<{
        success: boolean;
        npcs?: Array<{
          id: string;
          name: string;
          portrait?: any;
          level: number;
          race: string;
          gender: "MALE" | "FEMALE" | "NONE";
          background: string | null;
        }>;
        locationId?: string;
        messageKey?: string;
      }>(
        "/api/location/npcs",
        true // requireAuth
      );
      return response;
    } catch (error) {
      console.error("Get location NPCs error:", error);
      return {
        success: false,
        messageKey: error instanceof Error ? error.message : "location.npcsFetchFailed",
      };
    }
  }
}

// Export singleton instance
export const locationService = new LocationService();
export default locationService;

