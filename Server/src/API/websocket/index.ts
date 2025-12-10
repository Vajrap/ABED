import { Elysia } from "elysia";
import Report from "../../Utils/Reporter";
import { SessionService } from "../../Services/SessionService";
import { characterManager } from "../../Game/CharacterManager";
import { partyManager } from "../../Game/PartyManager";
import { locationManager } from "../../Entity/Location/Manager/LocationManager";
import { connectionManager } from "../../Entity/Connection/connectionManager";
import type { ClientContext } from "../../Entity/Connection/connectionManager";

/**
 * WebSocket API Routes
 * 
 * Handles WebSocket connections for real-time communication:
 * - Chat messages (NPC responses)
 * - News updates
 * - Other real-time events
 */

export const websocketRoutes = new Elysia({ prefix: "/ws" })
  .ws("/", {
    /**
     * WebSocket connection handler
     * Authenticates user and registers connection
     */
    async open(ws) {
      try {
        // Extract token from query params
        const url = new URL(ws.data.request.url);
        const token = url.searchParams.get("token");

        if (!token) {
          Report.warn("WebSocket connection attempt without token");
          ws.close(1008, "No authentication token provided");
          return;
        }

        // Validate session token
        const user = await SessionService.validateSession(token);
        if (!user) {
          Report.warn("WebSocket connection attempt with invalid token");
          ws.close(1008, "Invalid session token");
          return;
        }

        // Get character from in-memory manager
        const character = characterManager.getUserCharacterByUserId(user.id);
        if (!character) {
          Report.warn("Character not found for WebSocket connection", { userId: user.id });
          ws.close(1008, "Character not found");
          return;
        }

        // Get party to find location and region info
        if (!character.partyID) {
          Report.warn("Character has no party ID for WebSocket connection", {
            characterId: character.id,
          });
          ws.close(1008, "Character not in a party");
          return;
        }

        let party;
        try {
          party = partyManager.getPartyByID(character.partyID);
        } catch (error) {
          Report.warn("Party not found for WebSocket connection", {
            partyId: character.partyID,
          });
          ws.close(1008, "Party not found");
          return;
        }

        // Get location to extract region and subRegion
        const location = locationManager.locations[party.location];
        if (!location) {
          Report.warn("Location not found for WebSocket connection", {
            location: party.location,
          });
          ws.close(1008, "Location not found");
          return;
        }

        // Build client context
        const context: ClientContext = {
          userId: user.id,
          characterId: character.id,
          partyId: party.partyID,
          locationId: party.location,
          regionId: location.region,
          subRegionId: location.subRegion,
        };

        // Register connection
        connectionManager.register(user.id, ws as any, context);

        Report.info("WebSocket connection established", {
          userId: user.id,
          characterId: character.id,
          locationId: party.location,
          regionId: location.region,
        });
      } catch (error) {
        Report.error("WebSocket connection error", {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        });
        ws.close(1011, "Internal server error");
      }
    },

    /**
     * Handle incoming WebSocket messages
     * For now, just log them (future: bidirectional communication)
     */
    message(ws, message) {
      try {
        // Parse message if it's a string
        const data = typeof message === "string" ? JSON.parse(message) : message;
        Report.debug("WebSocket message received", { data });
        
        // TODO: Handle different message types (ping, chat, etc.)
      } catch (error) {
        Report.warn("Failed to parse WebSocket message", {
          error: error instanceof Error ? error.message : String(error),
        });
      }
    },

    /**
     * Handle WebSocket connection close
     * Unregister connection from connectionManager
     */
    close(ws) {
      try {
        const userId = connectionManager.getUserIdByWebSocket(ws as any);
        if (userId) {
          connectionManager.unregister(userId);
          Report.info("WebSocket connection closed and unregistered", { userId });
        } else {
          Report.debug("WebSocket connection closed (not found in connectionManager)");
        }
      } catch (error) {
        Report.error("Error handling WebSocket close", {
          error: error instanceof Error ? error.message : String(error),
        });
      }
    },
  });

