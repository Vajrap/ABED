// Action service for managing character action sequences and travel planning
import { restHandler } from './RestHandler';

/**
 * Request type for updating actions
 * Matches backend API schema exactly
 */
export interface UpdateActionsRequest {
  characterID?: string;
  actionSequence: Record<string, Record<string, any>>; // CharacterActionSequence: Record<DayOfWeek, Record<TimeOfDay, CharacterAction>>
  haltTravel?: boolean;
  travelPath?: string[]; // Array of LocationsEnum
  travelMethod?: "walk" | "horse" | "caravan";
  railTravelTo?: string; // RailStationEnum
}

/**
 * Converted action information (when backend converts invalid actions to Rest)
 */
export interface ConvertedAction {
  day: string; // DayOfWeek enum value
  time: string; // TimeOfDay enum value
  originalAction: string; // ActionInput enum value
  convertedTo: string; // ActionInput enum value (usually "Rest")
  reason: string;
}

/**
 * Travel state information
 */
export interface TravelState {
  isTraveling: boolean;
  isOnRail: boolean;
  destination?: string; // LocationsEnum | RailStationEnum
  currentLocation: string; // LocationsEnum
}

/**
 * Response from update actions API
 */
export interface UpdateActionsResponse {
  status: "SUCCESS" | "FAIL";
  reason?: string;
  CAS: Record<string, Record<string, any>>; // CharacterActionSequence
  convertedActions: ConvertedAction[];
  PAS: Record<string, Record<string, any>>; // PartyActionSequence
  travelState: TravelState;
}

class ActionService {
  /**
   * Update character action sequence
   * This is a placeholder function that will call the backend API
   * 
   * @param request - Action update request with schedule data
   * @returns Promise with the response from backend
   */
  /**
   * Update character action sequence
   * Sends the schedule to backend API endpoint
   * 
   * @param request - Action update request with schedule data
   * @returns Promise with the response from backend
   */
  async updateActions(request: UpdateActionsRequest): Promise<UpdateActionsResponse> {
    try {
      console.log("[ActionService] Updating actions:", request);
      
      // Send API request to backend
      const response = await restHandler.post<UpdateActionsRequest, UpdateActionsResponse>(
        "/api/actions/update",
        request,
        true // requireAuth: true - actions require authentication
      );
      
      console.log("[ActionService] Actions updated successfully:", response);
      return response;
    } catch (error) {
      console.error("[ActionService] Error updating actions:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const actionService = new ActionService();
export default actionService;

