import { Elysia } from "elysia";
import Report from "../../Utils/Reporter";
import { SessionService } from "../../Services/SessionService";
import { characterManager } from "../../Game/CharacterManager";
import { partyManager } from "../../Game/PartyManager";
import { locationManager } from "../../Entity/Location/Manager/LocationManager";
import { connectionManager } from "../../Entity/Connection/connectionManager";
import type { ClientContext } from "../../Entity/Connection/connectionManager";
import { PartyService } from "../../Services/PartyService";
import { getPendingConfirmation, handleMCPResponse } from "../../Services/MCPConfirmationService";
import { handleBattleConfirmation } from "../../Services/BattleInitiationService";

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

        // Send initial quest state
        const { questStatePostman } = await import("../../Entity/Quest/QuestStatePostman");
        questStatePostman.sendInitialQuestState(user.id, character);

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
     * Handles confirmation responses for party invitations and battles
     */
    async message(ws, message) {
      try {
        // Parse message if it's a string
        const data = typeof message === "string" ? JSON.parse(message) : message;
        Report.debug("WebSocket message received", { data });

        // Get user context from connection
        const context = connectionManager.getContextByWebSocket(ws as any);
        if (!context) {
          Report.warn("WebSocket message received but no context found");
          return;
        }

        // Handle different message types
        switch (data.type) {
          case "PARTY_INVITATION_RESPONSE":
            await handlePartyInvitationResponse(data, context);
            break;
          
          case "BATTLE_INITIATION_RESPONSE":
            await handleBattleInitiationResponse(data, context);
            break;
          
          default:
            Report.debug("Unknown WebSocket message type", { type: data.type });
        }
      } catch (error) {
        Report.error("Failed to handle WebSocket message", {
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

/**
 * Handle party invitation response from client
 */
async function handlePartyInvitationResponse(
  data: { requestId: string; confirmed: boolean },
  context: ClientContext
) {
  try {
    Report.info("Party invitation response received", {
      userId: context.userId,
      requestId: data.requestId,
      confirmed: data.confirmed,
    });

    // Get the confirmation request
    const request = getPendingConfirmation(data.requestId);
    if (!request) {
      Report.warn("Party invitation request not found", { requestId: data.requestId });
      return;
    }

    if (!data.confirmed) {
      Report.info("Party invitation declined", {
        userId: context.userId,
        npcId: request.npcId,
      });
      return;
    }

    // Get player character
    const player = characterManager.getUserCharacterByUserId(context.userId);
    if (!player || !player.partyID) {
      Report.warn("Player character or party not found", {
        userId: context.userId,
      });
      return;
    }

    // Process payment if required
    if (request.amount && request.amount > 0) {
      // TODO: Deduct gold from player inventory
      // For now, we'll just log it
      Report.info("Processing payment for party invitation", {
        userId: context.userId,
        amount: request.amount,
        currency: request.currency,
      });
    }

    // Add NPC to party
    const added = PartyService.addNPCToParty(player.partyID, request.npcId);
    
    if (added) {
      Report.info("NPC added to party via invitation", {
        userId: context.userId,
        npcId: request.npcId,
        partyId: player.partyID,
      });

      // Send confirmation to client
      const connection = connectionManager.getConnectionByUserId(context.userId);
      if (connection) {
        connection.ws.send(JSON.stringify({
          type: "PARTY_INVITATION_CONFIRMED",
          npcId: request.npcId,
          npcName: request.npcName,
          message: `${request.npcName} has joined your party!`,
        }));
      }
    } else {
      Report.warn("Failed to add NPC to party", {
        userId: context.userId,
        npcId: request.npcId,
      });
    }
  } catch (error) {
    Report.error("Error handling party invitation response", {
      error: error instanceof Error ? error.message : String(error),
      context,
    });
  }
}

/**
 * Handle battle initiation response from client
 */
async function handleBattleInitiationResponse(
  data: { requestId: string; confirmed: boolean },
  context: ClientContext
) {
  try {
    Report.info("Battle initiation response received", {
      userId: context.userId,
      requestId: data.requestId,
      confirmed: data.confirmed,
    });

    const result = await handleBattleConfirmation(data.requestId, data.confirmed);
    
    if (result && result.confirmed && result.battleId) {
      // Send battle started notification to client
      const connection = connectionManager.getConnectionByUserId(context.userId);
      if (connection) {
        connection.ws.send(JSON.stringify({
          type: "BATTLE_STARTED",
          battleId: result.battleId,
          message: "Battle has begun!",
        }));
      }
    }
  } catch (error) {
    Report.error("Error handling battle initiation response", {
      error: error instanceof Error ? error.message : String(error),
      context,
    });
  }
}

