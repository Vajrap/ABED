/**
 * NPC Party Join Service
 * 
 * Handles NPC party joining logic, criteria evaluation, and join requests.
 * Criteria are stored in NPC templates (code), while relationship state comes from database.
 */

import type { Character } from "../Entity/Character/Character";
import { getNPCTemplateById, getNPCTemplateByUUID } from "../Entity/Character/NPCs/definitions";
import { getNPCImpression, type NPCImpression } from "./NPCCharacterRelationService";
import { characterManager } from "../Game/CharacterManager";
import type { LMStudioTool } from "./LMStudioService";
import Report from "../Utils/Reporter";

export interface JoinCriteria {
  canJoin: boolean;
  hiring?: number;
  closeness?: number;
  affection?: number;
  haveQuest?: string;
  customConditions?: Array<{
    type: 'level' | 'item' | 'location' | 'custom';
    value: any;
    description: string;
  }>;
}

export interface JoinEvaluationResult {
  canJoin: boolean;
  missingRequirements: string[];
  requiresPayment: boolean;
  paymentAmount?: number;
  reason?: string;
}

/**
 * Get join criteria for an NPC from template
 * Accepts either template ID (string) or database UUID
 */
export function getJoinCriteria(npcId: string): JoinCriteria | null {
  // Try as template ID first
  let template = getNPCTemplateById(npcId);
  
  // If not found, try as database UUID
  if (!template) {
    template = getNPCTemplateByUUID(npcId);
  }
  
  if (!template || !template.joinPartyCriteria) {
    return null;
  }
  return template.joinPartyCriteria;
}

/**
 * MCP Tool Definition Interface
 * Used for exposing tools via MCP protocol
 */
export interface MCPToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
  };
}

/**
 * Get LLM tool definition for checkJoinParty
 * Returns OpenAI-compatible tool schema for LLM function calling
 */
export function getJoinPartyToolDefinition(): LMStudioTool {
  return {
    type: "function",
    function: {
      name: "checkJoinParty",
      description: "MANDATORY: Call this tool when the player asks you to join their party, go on an adventure together, or requests you to be part of their group. Examples: 'join my party', 'come with me', 'let's go together', 'come on join my party'. This tool checks all requirements (relationship, payment, quests) and determines if you can join. You MUST call this tool before responding to party join requests.",
      parameters: {
        type: "object",
        properties: {
          npcId: {
            type: "string",
            description: "Your character ID (the NPC's ID)",
          },
          playerId: {
            type: "string",
            description: "The player's character ID (the person asking you to join)",
          },
        },
        required: ["npcId", "playerId"],
      },
    },
  };
}

/**
 * Get MCP tool definition for checkJoinParty
 * Returns MCP-compatible tool schema
 */
export function getCheckJoinPartyMCPTool(): MCPToolDefinition {
  return {
    name: "checkJoinParty",
    description: "Check if an NPC can join a player's party. Evaluates all requirements including relationship, payment, and quest completion.",
    inputSchema: {
      type: "object",
      properties: {
        npcId: {
          type: "string",
          description: "The NPC's character ID",
        },
        playerId: {
          type: "string",
          description: "The player's character ID",
        },
      },
      required: ["npcId", "playerId"],
    },
  };
}

/**
 * Get MCP tool definition for acceptParty
 * Returns MCP-compatible tool schema for accepting party invitation
 */
export function getAcceptPartyMCPTool(): MCPToolDefinition {
  return {
    name: "acceptParty",
    description: "Accept a party invitation and add the NPC to the player's party. Requires that all join criteria are met and payment is confirmed (if required).",
    inputSchema: {
      type: "object",
      properties: {
        npcId: {
          type: "string",
          description: "The NPC's character ID",
        },
        playerId: {
          type: "string",
          description: "The player's character ID",
        },
        confirmationRequestId: {
          type: "string",
          description: "The confirmation request ID from payment confirmation (if payment was required)",
        },
      },
      required: ["npcId", "playerId"],
    },
  };
}

/**
 * Get all available MCP tools for party joining
 */
export function getPartyJoinMCPTools(): MCPToolDefinition[] {
  return [
    getCheckJoinPartyMCPTool(),
    getAcceptPartyMCPTool(),
  ];
}

/**
 * Check if NPC can join party for a specific character
 * Evaluates all criteria against current relationship and player state
 */
export async function checkJoinCriteria(
  npcId: string,
  characterId: string
): Promise<JoinEvaluationResult> {
  try {
    Report.debug("Checking join party criteria", {
      npcId,
      characterId,
    });

    // Get criteria from template
    const criteria = getJoinCriteria(npcId);
    if (!criteria) {
      Report.debug("NPC has no join criteria", { npcId });
      return {
        canJoin: false,
        missingRequirements: [],
        requiresPayment: false,
        reason: "This NPC cannot join parties",
      };
    }

    // Master switch check
    if (!criteria.canJoin) {
      Report.debug("NPC join criteria disabled", { npcId });
      return {
        canJoin: false,
        missingRequirements: [],
        requiresPayment: false,
        reason: "This NPC is not available to join parties",
      };
    }

    // Get NPC and player characters
    const npc = characterManager.getCharacterByID(npcId);
    const player = characterManager.getCharacterByID(characterId);
    
    if (!npc || !player) {
      return {
        canJoin: false,
        missingRequirements: [],
        requiresPayment: false,
        reason: "Character not found",
      };
    }

    // Get relationship state from database
    const relation = await getNPCImpression(npcId, characterId);
    if (!relation) {
      // First meeting - check if criteria allows it
      if (criteria.closeness && criteria.closeness > 0) {
        return {
          canJoin: false,
          missingRequirements: [`Need at least ${criteria.closeness} closeness (currently: 0)`],
          requiresPayment: !!criteria.hiring,
          paymentAmount: criteria.hiring,
          reason: "Not enough relationship yet",
        };
      }
      if (criteria.affection && criteria.affection > 0) {
        return {
          canJoin: false,
          missingRequirements: [`Need at least ${criteria.affection} affection (currently: 0)`],
          requiresPayment: !!criteria.hiring,
          paymentAmount: criteria.hiring,
          reason: "Not enough relationship yet",
        };
      }
    }

    // Evaluate all conditions
    const result = evaluateJoinConditions(criteria, relation, player);
    
    Report.info("Join party criteria evaluation complete", {
      npcId,
      characterId,
      canJoin: result.canJoin,
      requiresPayment: result.requiresPayment,
      paymentAmount: result.paymentAmount,
      missingRequirements: result.missingRequirements,
      reason: result.reason,
      relationCloseness: relation?.closeness,
      relationAffection: relation?.affection,
    });
    
    return result;
  } catch (error) {
    Report.error("Error checking join criteria", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
      characterId,
    });
    return {
      canJoin: false,
      missingRequirements: [],
      requiresPayment: false,
      reason: "Error evaluating criteria",
    };
  }
}

/**
 * Evaluate join conditions against current state
 */
function evaluateJoinConditions(
  criteria: JoinCriteria,
  relation: NPCImpression | null,
  player: Character
): JoinEvaluationResult {
  const missingRequirements: string[] = [];
  let requiresPayment = false;
  let paymentAmount: number | undefined;

  // Check payment requirement
  if (criteria.hiring && criteria.hiring > 0) {
    requiresPayment = true;
    paymentAmount = criteria.hiring;
    // TODO: Check if player has enough gold
    // For now, we'll just note the requirement
  }

  // Check relationship requirements
  if (relation) {
    // Check closeness
    if (criteria.closeness !== undefined && relation.closeness < criteria.closeness) {
      missingRequirements.push(
        `Need at least ${criteria.closeness} closeness (currently: ${relation.closeness})`
      );
    }

    // Check affection
    if (criteria.affection !== undefined && relation.affection < criteria.affection) {
      missingRequirements.push(
        `Need at least ${criteria.affection} affection (currently: ${relation.affection})`
      );
    }
  } else {
    // No relation yet - check if criteria requires relationship
    if (criteria.closeness && criteria.closeness > 0) {
      missingRequirements.push(`Need at least ${criteria.closeness} closeness (currently: 0)`);
    }
    if (criteria.affection && criteria.affection > 0) {
      missingRequirements.push(`Need at least ${criteria.affection} affection (currently: 0)`);
    }
  }

  // Check quest requirement
  if (criteria.haveQuest) {
    // TODO: Check quest completion status
    // For now, we'll note it as a requirement
    missingRequirements.push(`Must complete quest: ${criteria.haveQuest}`);
  }

  // Check custom conditions
  if (criteria.customConditions && criteria.customConditions.length > 0) {
    for (const condition of criteria.customConditions) {
      let met = false;
      
      switch (condition.type) {
        case 'level':
          met = player.level >= (condition.value as number);
          break;
        case 'item':
          // TODO: Check if player has item
          met = false; // Placeholder
          break;
        case 'location':
          // TODO: Check if player is at location
          met = false; // Placeholder
          break;
        case 'custom':
          // Custom logic would go here
          met = false; // Placeholder
          break;
      }

      if (!met) {
        missingRequirements.push(condition.description);
      }
    }
  }

  const canJoin = missingRequirements.length === 0;

  return {
    canJoin,
    missingRequirements,
    requiresPayment,
    paymentAmount,
    reason: canJoin 
      ? undefined 
      : missingRequirements.length > 0 
        ? missingRequirements.join("; ")
        : "Unknown reason",
  };
}

/**
 * Request NPC to join party
 * Returns evaluation result - caller should handle payment/MCP if needed
 */
export async function requestJoinParty(
  npcId: string,
  characterId: string
): Promise<JoinEvaluationResult> {
  return await checkJoinCriteria(npcId, characterId);
}

