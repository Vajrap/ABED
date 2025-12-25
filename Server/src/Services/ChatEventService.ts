import { connectionManager } from "../Entity/Connection/connectionManager";
import { characterManager } from "../Game/CharacterManager";
import { partyManager } from "../Game/PartyManager";
import { locationManager } from "../Entity/Location/Manager/LocationManager";
import Report from "../Utils/Reporter";
import type { LocationsEnum } from "../InterFacesEnumsAndTypes/Enums/Location";
// ChatScope type definition (matches frontend)
type ChatScope = "location" | "party" | "private";

export interface ChatMessagePayload {
  id: string;
  scope: ChatScope;
  senderId: string;
  senderName: string;
  senderPortrait?: any;
  content: string;
  timestamp: Date;
  recipientId?: string;
  scopeId?: string | null; // Used for location, party scopes
}

/**
 * Chat Event Service
 * 
 * Broadcasts chat messages via WebSocket to relevant players based on scope.
 */
class ChatEventService {
  /**
   * Broadcast a chat message to all relevant players based on scope
   */
  broadcastChatMessage(message: ChatMessagePayload, senderUserId: string): void {
    try {
      const eventPayload = {
        type: "CHAT_MESSAGE",
        data: {
          ...message,
          timestamp: message.timestamp.toISOString(),
        },
      };

      const connections = connectionManager.getConnections();
      let sentCount = 0;

      for (const connection of connections) {
        // Skip sender (they already see their own message in the response)
        if (connection.context.userId === senderUserId) {
          continue;
        }

        // Determine if this connection should receive the message based on scope
        const shouldReceive = this.shouldReceiveMessage(connection.context, message);

        if (shouldReceive) {
          try {
            connection.ws.send(JSON.stringify(eventPayload));
            sentCount++;
          } catch (error) {
            Report.warn("Failed to send chat message via WebSocket", {
              userId: connection.context.userId,
              scope: message.scope,
              error: error instanceof Error ? error.message : String(error),
            });
          }
        }
      }

      Report.debug(`Broadcast chat message to ${sentCount} players`, {
        scope: message.scope,
        senderId: message.senderId,
        messageId: message.id,
      });
    } catch (error) {
      Report.error("Error broadcasting chat message", {
        messageId: message.id,
        scope: message.scope,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Send a private message to a specific recipient (if online)
   */
  sendPrivateMessage(message: ChatMessagePayload, recipientUserId: string): boolean {
    try {
      const connection = connectionManager.getConnectionByUserId(recipientUserId);
      if (!connection) {
        // Recipient is offline
        return false;
      }

      const eventPayload = {
        type: "CHAT_MESSAGE",
        data: {
          ...message,
          timestamp: message.timestamp.toISOString(),
        },
      };

      try {
        connection.ws.send(JSON.stringify(eventPayload));
        Report.debug("Sent private message via WebSocket", {
          recipientId: recipientUserId,
          senderId: message.senderId,
        });
        return true;
      } catch (error) {
        Report.warn("Failed to send private message via WebSocket", {
          recipientId: recipientUserId,
          error: error instanceof Error ? error.message : String(error),
        });
        return false;
      }
    } catch (error) {
      Report.error("Error sending private message", {
        recipientId: recipientUserId,
        error: error instanceof Error ? error.message : String(error),
      });
      return false;
    }
  }

  /**
   * Determine if a connection should receive a message based on scope
   */
  private shouldReceiveMessage(
    context: {
      userId: string;
      regionId: string;
      subRegionId: string;
      locationId: LocationsEnum;
      partyId: string;
      characterId: string;
    },
    message: ChatMessagePayload
  ): boolean {
    switch (message.scope) {
      case "location":
        // Compare with scopeId (location name) if provided, otherwise fall back to sender's current location
        if (message.scopeId) {
          return message.scopeId === context.locationId;
        }
        // Fallback: get sender's current location (for backwards compatibility)
        try {
          const sender = characterManager.getCharacterByID(message.senderId);
          if (!sender || !sender.partyID) {
            return false;
          }
          const party = partyManager.getPartyByID(sender.partyID);
          return party.location === context.locationId;
        } catch (error) {
          Report.warn("Error determining location for chat broadcast", { error });
          return false;
        }

      case "party":
        // Compare with scopeId (party ID) if provided, otherwise fall back to sender's current party
        if (message.scopeId) {
          return message.scopeId === context.partyId;
        }
        // Fallback: get sender's current party (for backwards compatibility)
        try {
          const sender = characterManager.getCharacterByID(message.senderId);
          if (!sender || !sender.partyID) {
            return false;
          }
          return sender.partyID === context.partyId;
        } catch (error) {
          Report.warn("Error determining party for chat broadcast", { error });
          return false;
        }

      case "private":
        // Private messages are handled separately via sendPrivateMessage
        // This shouldn't be called for private messages
        return false;

      default:
        return false;
    }
  }
}

export const chatEventService = new ChatEventService();

