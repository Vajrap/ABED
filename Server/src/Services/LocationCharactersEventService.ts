import { connectionManager } from "../Entity/Connection/connectionManager";
import { characterManager } from "../Game/CharacterManager";
import Report from "../Utils/Reporter";
import type { LocationsEnum } from "../InterFacesEnumsAndTypes/Enums/Location";

/**
 * Location Characters Event Service
 * 
 * Emits WebSocket events when characters arrive at, leave, or change online status at locations.
 * Used to keep the location characters list updated in real-time.
 */
class LocationCharactersEventService {
  /**
   * Notify all players at a location that a character has connected (became online)
   */
  notifyCharacterConnected(characterId: string, locationId: LocationsEnum, userId: string): void {
    try {
      const character = characterManager.getCharacterByID(characterId);
      if (!character) {
        Report.warn("Character not found for connection notification", { characterId });
        return;
      }

      const name = typeof character.name === 'string' ? character.name : character.name?.en || character.id;
      
      const eventPayload = {
        type: "LOCATION_CHARACTER_CONNECTED",
        data: {
          characterId: character.id,
          userId: userId,
          name,
          portrait: character.portrait,
          level: character.level,
          race: character.race,
          gender: character.gender,
          locationId,
          isPlayer: true,
          isOnline: true,
        },
      };

      this.broadcastToLocation(locationId, eventPayload, userId);
    } catch (error) {
      Report.error("Error notifying character connected", {
        characterId,
        locationId,
        userId,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Notify all players at a location that a character has disconnected (became offline)
   */
  notifyCharacterDisconnected(characterId: string, locationId: LocationsEnum, userId: string): void {
    try {
      const eventPayload = {
        type: "LOCATION_CHARACTER_DISCONNECTED",
        data: {
          characterId,
          userId,
          locationId,
        },
      };

      this.broadcastToLocation(locationId, eventPayload, userId);
    } catch (error) {
      Report.error("Error notifying character disconnected", {
        characterId,
        locationId,
        userId,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Notify all players at a location that a character has arrived
   */
  notifyCharacterArrived(characterId: string, locationId: LocationsEnum, oldLocationId?: LocationsEnum): void {
    try {
      const character = characterManager.getCharacterByID(characterId);
      if (!character) {
        Report.warn("Character not found for arrival notification", { characterId });
        return;
      }

      const name = typeof character.name === 'string' ? character.name : character.name?.en || character.id;
      const isPlayer = character.userId !== null;
      
      // Check online status for player characters
      let isOnline: boolean | undefined = undefined;
      if (isPlayer && character.userId) {
        const connection = connectionManager.getConnectionByUserId(character.userId);
        isOnline = connection !== null;
      }

      const eventPayload = {
        type: "LOCATION_CHARACTER_ARRIVED",
        data: {
          characterId: character.id,
          name,
          portrait: character.portrait,
          level: character.level,
          race: character.race,
          gender: character.gender,
          background: character.background || null,
          locationId,
          isPlayer,
          isOnline,
          userId: character.userId || undefined,
        },
      };

      // Notify players at the new location
      this.broadcastToLocation(locationId, eventPayload);

      // Also notify players at the old location that character left (if applicable)
      if (oldLocationId && oldLocationId !== locationId) {
        this.notifyCharacterLeft(characterId, oldLocationId);
      }
    } catch (error) {
      Report.error("Error notifying character arrived", {
        characterId,
        locationId,
        oldLocationId,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Notify all players at a location that a character has left
   */
  notifyCharacterLeft(characterId: string, locationId: LocationsEnum): void {
    try {
      const eventPayload = {
        type: "LOCATION_CHARACTER_LEFT",
        data: {
          characterId,
          locationId,
        },
      };

      this.broadcastToLocation(locationId, eventPayload);
    } catch (error) {
      Report.error("Error notifying character left", {
        characterId,
        locationId,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Broadcast a message to all connected players at a specific location
   * @param locationId The location to broadcast to
   * @param payload The event payload to send
   * @param excludeUserId Optional userId to exclude from receiving the event (e.g., the character themselves)
   */
  private broadcastToLocation(
    locationId: LocationsEnum,
    payload: { type: string; data: any },
    excludeUserId?: string
  ): void {
    try {
      const connections = connectionManager.getConnections();
      let sentCount = 0;

      for (const connection of connections) {
        // Only send to players at this location
        if (connection.context.locationId !== locationId) {
          continue;
        }

        // Exclude the character that triggered the event (if specified)
        if (excludeUserId && connection.context.userId === excludeUserId) {
          continue;
        }

        try {
          connection.ws.send(JSON.stringify(payload));
          sentCount++;
        } catch (error) {
          Report.warn("Failed to send location character event via WebSocket", {
            userId: connection.context.userId,
            locationId,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }

      Report.debug(`Broadcast location character event to ${sentCount} players`, {
        type: payload.type,
        locationId,
        excludeUserId,
      });
    } catch (error) {
      Report.error("Error broadcasting to location", {
        locationId,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}

export const locationCharactersEventService = new LocationCharactersEventService();

