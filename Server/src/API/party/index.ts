import { Elysia, t } from "elysia";
import Report from "../../Utils/Reporter";
import { SessionService } from "../../Services/SessionService";
import { characterManager } from "../../Game/CharacterManager";
import { partyManager } from "../../Game/PartyManager";
import { mapPartyToInterface } from "../../Utils/PartyMapper";
import { checkJoinCriteria, requestJoinParty, getPartyJoinMCPTools, getCheckJoinPartyMCPTool, getAcceptPartyMCPTool } from "../../Services/NPCPartyJoinService";
import { PartyService } from "../../Services/PartyService";
import { requestPaymentConfirmation, handleMCPResponse } from "../../Services/MCPConfirmationService";
import { GoldId } from "src/Entity/Item/Misc";

export const partyRoutes = new Elysia({ prefix: "/party" })
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      Report.warn("Party route validation error", {
        error: error.message,
        code,
      });
      set.status = 400;
      return { success: false, messageKey: "party.validationError" };
    }
    throw error;
  })
  /**
   * GET /api/party/user - Get current user's party
   */
  .get("/user", async ({ headers, set }) => {
    Report.debug("User party request received", {
      route: "/party/user",
    });

    try {
      // 1. Validate session
      const authHeader = headers.authorization;
      const token = authHeader?.split(" ")[1];
      
      if (!token) {
        set.status = 401;
        return { success: false, messageKey: "auth.noToken" };
      }

      const user = await SessionService.validateSession(token);
      if (!user) {
        set.status = 401;
        return { success: false, messageKey: "auth.invalidSession" };
      }

      // 2. Get character from in-memory manager
      const character = characterManager.getUserCharacterByUserId(user.id);
      if (!character) {
        Report.warn("Character not found for user", { userId: user.id });
        set.status = 404;
        return { success: false, messageKey: "character.notFound" };
      }

      // 3. Get party from in-memory manager
      if (!character.partyID) {
        Report.warn("Character has no party ID", { characterId: character.id });
        set.status = 404;
        return { success: false, messageKey: "party.notFound" };
      }

      const party = partyManager.getPartyByID(character.partyID);
      if (!party) {
        Report.warn("Party not found for character", {
          characterId: character.id,
          partyId: character.partyID,
        });
        set.status = 404;
        return { success: false, messageKey: "party.notFound" };
      }

      // 4. Map to frontend interface (includes all character data)
      const partyInterface = mapPartyToInterface(party);

      // 5. Return party with all character data
      return {
        success: true,
        party: partyInterface
      };
    } catch (error) {
      Report.error("User party fetch error", {
        error,
      });
      set.status = 500;
      return { success: false, messageKey: "party.fetchFailed" };
    }
  })
  /**
   * POST /api/party/invite-npc
   * Request an NPC to join the player's party
   * 
   * Body: { npcId: string }
   * Returns: { success: boolean; evaluation: JoinEvaluationResult; requestId?: string }
   */
  .post(
    "/invite-npc",
    async ({ body, headers, set }) => {
      Report.debug("Invite NPC request received", {
        route: "/party/invite-npc",
        npcId: body.npcId,
      });

      try {
        // 1. Validate session
        const authHeader = headers.authorization;
        const token = authHeader?.split(" ")[1];

        if (!token) {
          set.status = 401;
          return { success: false, messageKey: "auth.noToken" };
        }

        const user = await SessionService.validateSession(token);
        if (!user) {
          set.status = 401;
          return { success: false, messageKey: "auth.invalidSession" };
        }

        // 2. Get player character
        const player = characterManager.getUserCharacterByUserId(user.id);
        if (!player) {
          set.status = 404;
          return { success: false, messageKey: "character.notFound" };
        }

        if (!player.partyID) {
          set.status = 400;
          return { success: false, messageKey: "party.playerHasNoParty" };
        }

        // 3. Get NPC
        const npc = characterManager.getCharacterByID(body.npcId);
        if (!npc) {
          set.status = 404;
          return { success: false, messageKey: "npc.notFound" };
        }

        // Check if NPC (userId is null)
        if (npc.userId !== null) {
          set.status = 400;
          return { success: false, messageKey: "npc.notAnNPC" };
        }

        // 4. Check join criteria
        const evaluation = await checkJoinCriteria(body.npcId, player.id);

        // 5. If payment required, trigger MCP confirmation
        let requestId: string | undefined;
        if (evaluation.requiresPayment && evaluation.paymentAmount) {
          const npcName = typeof npc.name === 'string' ? npc.name : npc.name?.en || "NPC";
          requestId = await requestPaymentConfirmation(
            user.id,
            body.npcId,
            npcName,
            evaluation.paymentAmount,
            `Hire ${npcName} to join your party`
          );
        }

        // 6. Return evaluation result
        return {
          success: true,
          evaluation: {
            canJoin: evaluation.canJoin,
            missingRequirements: evaluation.missingRequirements,
            requiresPayment: evaluation.requiresPayment,
            paymentAmount: evaluation.paymentAmount,
            reason: evaluation.reason,
          },
          requestId, // Include requestId if payment confirmation was triggered
        };
      } catch (error) {
        Report.error("Invite NPC error", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, messageKey: "party.inviteFailed" };
      }
    },
    {
      body: t.Object({
        npcId: t.String(),
      }),
    }
  )
  /**
   * POST /api/party/confirm-hire
   * Confirm payment/conditions for hiring NPC (called after MCP confirmation)
   * 
   * Body: { requestId: string; confirmed: boolean }
   * Returns: { success: boolean; npcAdded?: boolean }
   */
  .post(
    "/confirm-hire",
    async ({ body, headers, set }) => {
      Report.debug("Confirm hire request received", {
        route: "/party/confirm-hire",
        requestId: body.requestId,
        confirmed: body.confirmed,
      });

      try {
        // 1. Validate session
        const authHeader = headers.authorization;
        const token = authHeader?.split(" ")[1];

        if (!token) {
          set.status = 401;
          return { success: false, messageKey: "auth.noToken" };
        }

        const user = await SessionService.validateSession(token);
        if (!user) {
          set.status = 401;
          return { success: false, messageKey: "auth.invalidSession" };
        }

        // 2. Handle MCP response
        const mcpResponse = await handleMCPResponse(
          body.requestId,
          body.confirmed,
          body.confirmed ? { amount: body.amount || 0, currency: "gold" } : undefined
        );

        if (!mcpResponse) {
          set.status = 404;
          return { success: false, messageKey: "mcp.requestNotFound" };
        }

        if (!mcpResponse.confirmed) {
          return {
            success: true,
            confirmed: false,
            message: "Hire request was declined",
          };
        }

        // 3. Get player character
        const player = characterManager.getUserCharacterByUserId(user.id);
        if (!player || !player.partyID) {
          set.status = 404;
          return { success: false, messageKey: "character.notFound" };
        }

        // 4. Get request details to find NPC ID
        const { getPendingConfirmation } = await import("../../Services/MCPConfirmationService");
        const request = getPendingConfirmation(body.requestId);
        
        if (!request) {
          // Request was already processed, try to get from response metadata
          // For now, we'll need to pass npcId in the body
          if (!body.npcId) {
            set.status = 400;
            return { success: false, messageKey: "mcp.missingNPCId" };
          }
        }

        const npcId = request?.npcId || body.npcId;
        if (!npcId) {
          set.status = 400;
          return { success: false, messageKey: "mcp.missingNPCId" };
        }

        // 5. Re-check criteria (in case something changed)
        const evaluation = await checkJoinCriteria(npcId, player.id);
        if (!evaluation.canJoin) {
          return {
            success: false,
            messageKey: "party.criteriaNotMet",
            missingRequirements: evaluation.missingRequirements,
          };
        }

        // 6. Process payment (if required)
        if (evaluation.requiresPayment && evaluation.paymentAmount) {
          const characterGold = player.inventory.get(GoldId.gold) || 0;
          if (characterGold < evaluation.paymentAmount) {
            set.status = 400;
            return { success: false, messageKey: "party.insufficientGold" };
          }
          player.inventory.set(GoldId.gold, characterGold - evaluation.paymentAmount);
        }
        

        // 7. Add NPC to party
        const added = PartyService.addNPCToParty(player.partyID, npcId);
        if (!added) {
          return {
            success: false,
            messageKey: "party.addFailed",
          };
        }

        return {
          success: true,
          confirmed: true,
          npcAdded: true,
          message: "NPC has joined your party!",
        };
      } catch (error) {
        Report.error("Confirm hire error", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, messageKey: "party.confirmFailed" };
      }
    },
    {
      body: t.Object({
        requestId: t.String(),
        confirmed: t.Boolean(),
        amount: t.Optional(t.Number()),
        npcId: t.Optional(t.String()), // Fallback if request not found
      }),
    }
  )
  /**
   * GET /api/party/npc-join-status/:npcId
   * Check if NPC can join party and what requirements are needed
   */
  .get(
    "/npc-join-status/:npcId",
    async ({ params, headers, set }) => {
      try {
        // 1. Validate session
        const authHeader = headers.authorization;
        const token = authHeader?.split(" ")[1];

        if (!token) {
          set.status = 401;
          return { success: false, messageKey: "auth.noToken" };
        }

        const user = await SessionService.validateSession(token);
        if (!user) {
          set.status = 401;
          return { success: false, messageKey: "auth.invalidSession" };
        }

        // 2. Get player character
        const player = characterManager.getUserCharacterByUserId(user.id);
        if (!player) {
          set.status = 404;
          return { success: false, messageKey: "character.notFound" };
        }

        // 3. Check join criteria
        const evaluation = await checkJoinCriteria(params.npcId, player.id);

        return {
          success: true,
          evaluation,
        };
      } catch (error) {
        Report.error("NPC join status error", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, messageKey: "party.statusCheckFailed" };
      }
    }
  )
  /**
   * GET /api/party/mcp-tools
   * Get available MCP tools for party joining
   * Returns list of MCP tool definitions
   */
  .get("/mcp-tools", async ({ headers, set }) => {
    try {
      // 1. Validate session (optional - tools can be public)
      const authHeader = headers.authorization;
      if (authHeader) {
        const token = authHeader.split(" ")[1];
        if (token) {
          const user = await SessionService.validateSession(token);
          if (!user) {
            set.status = 401;
            return { success: false, messageKey: "auth.invalidSession" };
          }
        }
      }

      // 2. Get available MCP tools
      const tools = getPartyJoinMCPTools();

      return {
        success: true,
        tools,
      };
    } catch (error) {
      Report.error("MCP tools fetch error", {
        error: error instanceof Error ? error.message : String(error),
      });
      set.status = 500;
      return { success: false, messageKey: "party.mcpToolsFailed" };
    }
  })
  /**
   * POST /api/party/mcp/checkJoinParty
   * MCP tool endpoint for checking if NPC can join party
   * 
   * Body: { npcId: string; playerId: string }
   * Returns: { success: boolean; evaluation: JoinEvaluationResult }
   */
  .post(
    "/mcp/checkJoinParty",
    async ({ body, headers, set }) => {
      try {
        // 1. Validate session
        const authHeader = headers.authorization;
        const token = authHeader?.split(" ")[1];

        if (!token) {
          set.status = 401;
          return { success: false, messageKey: "auth.noToken" };
        }

        const user = await SessionService.validateSession(token);
        if (!user) {
          set.status = 401;
          return { success: false, messageKey: "auth.invalidSession" };
        }

        // 2. Validate input
        if (!body.npcId || !body.playerId) {
          set.status = 400;
          return { success: false, messageKey: "party.missingParameters" };
        }

        // 3. Check join criteria
        const evaluation = await checkJoinCriteria(body.npcId, body.playerId);

        return {
          success: true,
          evaluation,
        };
      } catch (error) {
        Report.error("MCP checkJoinParty error", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, messageKey: "party.mcpCheckFailed" };
      }
    },
    {
      body: t.Object({
        npcId: t.String(),
        playerId: t.String(),
      }),
    }
  )
  /**
   * POST /api/party/mcp/acceptParty
   * MCP tool endpoint for accepting party invitation
   * 
   * Body: { npcId: string; playerId: string; confirmationRequestId?: string }
   * Returns: { success: boolean; npcAdded: boolean; message?: string }
   */
  .post(
    "/mcp/acceptParty",
    async ({ body, headers, set }) => {
      try {
        // 1. Validate session
        const authHeader = headers.authorization;
        const token = authHeader?.split(" ")[1];

        if (!token) {
          set.status = 401;
          return { success: false, messageKey: "auth.noToken" };
        }

        const user = await SessionService.validateSession(token);
        if (!user) {
          set.status = 401;
          return { success: false, messageKey: "auth.invalidSession" };
        }

        // 2. Validate input
        if (!body.npcId || !body.playerId) {
          set.status = 400;
          return { success: false, messageKey: "party.missingParameters" };
        }

        // 3. Get player character
        const player = characterManager.getUserCharacterByUserId(user.id);
        if (!player || !player.partyID) {
          set.status = 404;
          return { success: false, messageKey: "character.notFound" };
        }

        // 4. Re-check criteria
        const evaluation = await checkJoinCriteria(body.npcId, player.id);
        if (!evaluation.canJoin) {
          return {
            success: false,
            messageKey: "party.criteriaNotMet",
            missingRequirements: evaluation.missingRequirements,
          };
        }

        // 5. Handle payment confirmation if required
        if (evaluation.requiresPayment && body.confirmationRequestId) {
          const mcpResponse = await handleMCPResponse(
            body.confirmationRequestId,
            true,
            { amount: evaluation.paymentAmount || 0, currency: "gold" }
          );

          if (!mcpResponse || !mcpResponse.confirmed) {
            return {
              success: false,
              messageKey: "party.paymentNotConfirmed",
            };
          }
        }

        // 6. Process payment (if required)
        if (evaluation.requiresPayment && evaluation.paymentAmount) {
          const characterGold = player.inventory.get(GoldId.gold) || 0;
          if (characterGold < evaluation.paymentAmount) {
            set.status = 400;
            return { success: false, messageKey: "party.insufficientGold" };
          }
          player.inventory.set(GoldId.gold, characterGold - evaluation.paymentAmount);
        }

        // 7. Add NPC to party
        const added = PartyService.addNPCToParty(player.partyID, body.npcId);
        if (!added) {
          return {
            success: false,
            messageKey: "party.addFailed",
          };
        }

        return {
          success: true,
          npcAdded: true,
          message: "NPC has joined your party!",
        };
      } catch (error) {
        Report.error("MCP acceptParty error", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, messageKey: "party.mcpAcceptFailed" };
      }
    },
    {
      body: t.Object({
        npcId: t.String(),
        playerId: t.String(),
        confirmationRequestId: t.Optional(t.String()),
      }),
    }
  );

