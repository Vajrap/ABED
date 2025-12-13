/**
 * Tool Execution Service
 * 
 * Handles execution of LLM tool calls.
 * Routes tool calls to appropriate handlers and returns results.
 */

import type { LLMToolCall } from "./LLMService";
import { checkJoinCriteria, type JoinEvaluationResult } from "./NPCPartyJoinService";
import { characterManager } from "../Game/CharacterManager";
import { requestPaymentConfirmation } from "./MCPConfirmationService";
import { requestBattleInitiation } from "./BattleInitiationService";
import { executeUpdateImpression } from "./ImpressionUpdateTool";
import Report from "../Utils/Reporter";

export interface ToolContext {
  npcId: string;
  playerId: string;
  userId: string;
}

export interface ToolExecutionResult {
  success: boolean;
  result?: any;
  error?: string;
  shouldSendConfirmation?: boolean; // If true, send WebSocket confirmation to client
  confirmationData?: {
    requestId: string;
    type: string;
    data: Record<string, any>;
  };
}

/**
 * Execute a tool call from LLM
 */
export async function executeTool(
  toolCall: LLMToolCall,
  context: ToolContext
): Promise<ToolExecutionResult> {
  try {
    Report.info("Executing tool call", {
      toolName: toolCall.name,
      npcId: context.npcId,
      playerId: context.playerId,
      arguments: toolCall.arguments,
    });

    switch (toolCall.name) {
      case "checkJoinParty":
        return await executeCheckJoinParty(toolCall, context);
      
      case "initiateBattle":
        return await executeInitiateBattle(toolCall, context);
      
      case "updateImpression":
        return await executeUpdateImpression(toolCall, context);
      
      default:
        Report.warn("Unknown tool call", {
          toolName: toolCall.name,
        });
        return {
          success: false,
          error: `Unknown tool: ${toolCall.name}`,
        };
    }
  } catch (error) {
    Report.error("Error executing tool", {
      error: error instanceof Error ? error.message : String(error),
      toolName: toolCall.name,
      context,
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Execute checkJoinParty tool
 */
async function executeCheckJoinParty(
  toolCall: LLMToolCall,
  context: ToolContext
): Promise<ToolExecutionResult> {
  try {
    const { npcId, playerId } = toolCall.arguments;
    
    // Validate arguments
    if (!npcId || !playerId) {
      return {
        success: false,
        error: "Missing required arguments: npcId and playerId",
      };
    }

    // Verify NPC and player exist
    const npc = characterManager.getCharacterByID(npcId);
    const player = characterManager.getCharacterByID(playerId);
    
    if (!npc || !player) {
      return {
        success: false,
        error: "Character not found",
      };
    }

    // Check join criteria
    const evaluation = await checkJoinCriteria(npcId, playerId);

    // Format result for LLM
    const result = {
      canJoin: evaluation.canJoin,
      requiresPayment: evaluation.requiresPayment,
      paymentAmount: evaluation.paymentAmount,
      missingRequirements: evaluation.missingRequirements,
      reason: evaluation.reason,
    };

    // If can join, we need to send confirmation to client
    if (evaluation.canJoin) {
      // Create confirmation request
      const requestId = await requestPaymentConfirmation(
        context.userId,
        npcId,
        typeof npc.name === 'string' ? npc.name : npc.name?.en || "NPC",
        evaluation.paymentAmount || 0,
        `Join ${typeof npc.name === 'string' ? npc.name : npc.name?.en || "NPC"}'s party${evaluation.requiresPayment ? ` for ${evaluation.paymentAmount} gold` : ''}`,
        {
          type: "party_invitation",
          npcId,
          playerId,
        }
      );

      const npcName = typeof npc.name === 'string' ? npc.name : npc.name?.en || "NPC";

      return {
        success: true,
        result: {
          ...result,
          message: `I can join your party${evaluation.requiresPayment ? ` for ${evaluation.paymentAmount} gold` : ''}. Waiting for your confirmation...`,
        },
        shouldSendConfirmation: true,
        confirmationData: {
          requestId,
          type: "PARTY_INVITATION_CONFIRMATION",
          data: {
            npcId,
            npcName,
            requiresPayment: evaluation.requiresPayment,
            paymentAmount: evaluation.paymentAmount,
            currency: "gold",
          },
        },
      };
    }

    // If can't join, return result to LLM so it can craft a natural response
    return {
      success: true,
      result: {
        ...result,
        message: `I cannot join your party right now. ${evaluation.reason || 'Requirements not met.'}`,
      },
      shouldSendConfirmation: false,
    };
  } catch (error) {
    Report.error("Error executing checkJoinParty tool", {
      error: error instanceof Error ? error.message : String(error),
      toolCall,
      context,
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Execute initiateBattle tool
 */
async function executeInitiateBattle(
  toolCall: LLMToolCall,
  context: ToolContext
): Promise<ToolExecutionResult> {
  try {
    const { npcId, playerId, reason } = toolCall.arguments;
    
    // Validate arguments
    if (!npcId || !playerId || !reason) {
      return {
        success: false,
        error: "Missing required arguments: npcId, playerId, and reason",
      };
    }

    // Verify NPC and player exist
    const npc = characterManager.getCharacterByID(npcId);
    const player = characterManager.getCharacterByID(playerId);
    
    if (!npc || !player) {
      return {
        success: false,
        error: "Character not found",
      };
    }

    // Get location
    const locationId = player.location || npc.location || "WaywardInn";

    // Initiate battle (auto-start by default)
    const battleResult = await requestBattleInitiation(
      npcId,
      playerId,
      reason,
      locationId,
      true // autoStart = true
    );

    if (!battleResult) {
      return {
        success: false,
        error: "Failed to initiate battle",
      };
    }

    const npcName = typeof npc.name === 'string' ? npc.name : npc.name?.en || "NPC";

    return {
      success: true,
      result: {
        battleInitiated: true,
        battleId: battleResult.battleId,
        requestId: battleResult.requestId,
        message: `Battle initiated! ${npcName} is defending themselves.`,
      },
      shouldSendConfirmation: false, // Battle is auto-started, no confirmation needed
    };
  } catch (error) {
    Report.error("Error executing initiateBattle tool", {
      error: error instanceof Error ? error.message : String(error),
      toolCall,
      context,
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

