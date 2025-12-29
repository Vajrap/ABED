import { connectionManager } from "../Entity/Connection/connectionManager";
import { characterManager } from "../Game/CharacterManager";
import { partyManager } from "../Game/PartyManager";
import { locationManager } from "../Entity/Location/Manager/LocationManager";
import { GameTime } from "../Game/GameTime/GameTime";
import { mapPartyToInterface } from "../Utils/PartyMapper";
import type { PartyInterface } from "../InterFacesEnumsAndTypes/PartyInterface";
import type { GameTimeInterface } from "../InterFacesEnumsAndTypes/Time";
import type { LocationsEnum } from "../InterFacesEnumsAndTypes/Enums/Location";
import { TimeOfDay } from "../InterFacesEnumsAndTypes/Time";
import Report from "../Utils/Reporter";

/**
 * Game State Event Service
 * 
 * Broadcasts game state updates (party, location, game time) to all connected players
 * Called after each phase update in the game loop
 */
class GameStateEventService {
  /**
   * Broadcast game state update to all connected users
   * Sends party data, location data, and current game time
   */
  broadcastGameStateUpdate(): void {
    try {
      const connections = connectionManager.getConnections();
      const gameTime = GameTime.getCurrentGameDateTime();
      
      Report.info(`[GameStateEventService] Starting broadcast to ${connections.length} connections`);

      for (const connection of connections) {
        try {
          const character = characterManager.getUserCharacterByUserId(connection.context.userId);
          if (!character) {
            continue;
          }

          // Get party
          if (!character.partyID) {
            continue;
          }

          const party = partyManager.getPartyByID(character.partyID);
          if (!party) {
            continue;
          }

          // Map party to interface
          const partyInterface = mapPartyToInterface(party);

          // Get location data
          const location = locationManager.locations[party.location as LocationsEnum];
          if (!location) {
            continue;
          }

          const locationName = typeof location.name === 'string' 
            ? location.name 
            : location.name?.en || location.id;

          // Get phase-specific actions
          const availableActionsByPhase = {
            [TimeOfDay.morning]: location.getAvailableActions(TimeOfDay.morning),
            [TimeOfDay.afternoon]: location.getAvailableActions(TimeOfDay.afternoon),
            [TimeOfDay.evening]: location.getAvailableActions(TimeOfDay.evening),
            [TimeOfDay.night]: location.getAvailableActions(TimeOfDay.night),
          };

          const locationData = {
            id: location.id,
            name: locationName,
            region: location.region,
            subRegion: location.subRegion,
            situation: location.id.toLowerCase().replace(/_/g, '-'),
            hasRailStation: !!location.trainStationId,
            availableActions: location.actions,
            availableActionsByPhase,
            gameTime,
          };

          // Send game state update message
          const message = {
            type: "GAME_STATE_UPDATE",
            data: {
              party: partyInterface,
              location: locationData,
              gameTime,
            },
          };

          connection.ws.send(JSON.stringify(message));
          Report.info(`[GameStateEventService] Sent update to user ${connection.context.userId}`);
        } catch (error) {
          Report.warn("Error sending game state update to user", {
            userId: connection.context.userId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }

      Report.info(`[GameStateEventService] Completed broadcast to ${connections.length} connected users`);
    } catch (error) {
      Report.error("Error broadcasting game state update", {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}

export const gameStateEventService = new GameStateEventService();

