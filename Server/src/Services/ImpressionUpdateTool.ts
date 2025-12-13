/**
 * Impression Update Tool
 * 
 * Tool that AI can call to update NPC impressions based on interactions.
 * Changes are slow (+1 max) and AI decides when to use it.
 */

import { getNPCImpression, updateNPCRelation } from "./NPCCharacterRelationService";
import type { LLMTool, LLMToolCall } from "./LLMService";
import Report from "../Utils/Reporter";
import { ToolContext } from "./ToolExecutionService";

export interface ImpressionUpdateArgs {
  npcId: string;
  playerId: string;
  affectionChange: number; // -1 to +1 (capped)
  closenessChange: number; // 0 to +1 (capped)
  reason: string; // Why the change occurred
}

/**
 * Get tool definition for updateImpression
 */
export function getImpressionUpdateToolDefinition(): LLMTool {
  return {
    type: "function",
    function: {
      name: "updateImpression",
      description: "Update your impression of the player based on their actions or words. Use this SPARINGLY - only for meaningful interactions. Maximum change is +1 affection and +1 closeness per call. Be stingy - don't use this for every compliment or small gesture. Reserve it for genuinely meaningful moments. Remember: there are other ways players can gain affection (quests, random events, etc.), so don't give it away easily.",
      parameters: {
        type: "object",
        properties: {
          npcId: {
            type: "string",
            description: "Your character ID (the NPC's ID)",
          },
          playerId: {
            type: "string",
            description: "The player's character ID",
          },
          affectionChange: {
            type: "number",
            description: "Change to affection (-3 to +1). Use +1 for genuinely positive interactions, Negative actions can cause -3 to -1. Default to 0 for neutral.",
            minimum: -3,
            maximum: 1,
          },
          closenessChange: {
            type: "number",
            description: "Change to closeness (0 to +1). Use +1 only for meaningful bonding moments. Default to 0.",
            minimum: 0,
            maximum: 1,
          },
          reason: {
            type: "string",
            description: "Brief reason for the impression change (e.g., 'Player helped me in a meaningful way', 'Player showed genuine care')",
          },
        },
        required: ["npcId", "playerId", "affectionChange", "closenessChange", "reason"],
      },
    },
  };
}

/**
 * Execute impression update tool call
 */
export async function executeUpdateImpression(
  toolCall: LLMToolCall,
  context: ToolContext
): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    // Cap changes to -1 to +1 range
    const affectionChange = Math.max(-3, Math.min(1, toolCall.arguments.affectionChange));
    const closenessChange = Math.max(0, Math.min(1, toolCall.arguments.closenessChange));

    // Get current relation
    const currentRelation = await getNPCImpression(context.npcId, context.playerId);
    if (!currentRelation) {
      return {
        success: false,
        message: "NPC-Character relation not found",
        error: "Relation does not exist",
      };
    }

    // Calculate new values with bounds
    const newAffection = Math.max(
      -100,
      Math.min(100, currentRelation.affection + affectionChange)
    );
    const newCloseness = Math.max(
      0,
      Math.min(100, currentRelation.closeness + closenessChange)
    );

    // Update relation
    await updateNPCRelation(context.npcId, context.playerId, {
      affection: newAffection,
      closeness: newCloseness,
    });

    Report.debug("AI updated NPC impression via tool", {
      npcId: context.npcId,
      playerId: context.playerId,
      oldAffection: currentRelation.affection,
      newAffection,
      oldCloseness: currentRelation.closeness,
      newCloseness,
      reason: toolCall.arguments.reason,
    });

    return {
      success: true,
      message: `Impression updated: Affection ${affectionChange > 0 ? '+' : ''}${affectionChange.toFixed(1)}, Closeness ${closenessChange > 0 ? '+' : ''}${closenessChange.toFixed(1)}. Reason: ${toolCall.arguments.reason}`,
    };
  } catch (error) {
    Report.error("Error executing impression update tool", {
      error: error instanceof Error ? error.message : String(error),
      toolCall,
    });
    return {
      success: false,
      message: "Failed to update impression",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

