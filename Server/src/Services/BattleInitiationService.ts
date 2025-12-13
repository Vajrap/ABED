/**
 * Battle Initiation Service
 * 
 * Handles MCP-based battle initiation when NPCs are threatened or attacked.
 * Detects threatening/inappropriate messages and triggers battle confirmation.
 */

import { randomUUID } from "crypto";
import { characterManager } from "../Game/CharacterManager";
import { partyManager } from "../Game/PartyManager";
import { Party } from "../Entity/Party/Party";
import { PartyBehavior } from "../Entity/Party/PartyBehavior";
import { Battle } from "../Entity/Battle/Battle";
import { GameTime } from "../Game/GameTime/GameTime";
import Report from "../Utils/Reporter";
import { locationRepository } from "src/Entity/Location/Location/repository";
import { BattleType } from "src/Entity/Battle/types";

export interface BattleInitiationRequest {
  requestId: string;
  type: "BATTLE_INITIATION";
  npcId: string;
  npcName: string;
  playerId: string;
  playerName: string;
  reason: string; // Why the battle is being initiated
  locationId: string;
}

export interface BattleInitiationResponse {
  requestId: string;
  confirmed: boolean;
  battleId?: string;
  error?: string;
}

// In-memory store for pending battle initiations
const pendingBattleRequests = new Map<string, BattleInitiationRequest>();

/**
 * Detect if a message is threatening or inappropriate enough to warrant battle
 * Returns true if the message contains threats, violence, or extreme disrespect
 * 
 * IMPORTANT: This should NOT trigger on:
 * - Asking to fight together ("fight goblins with me")
 * - Normal combat/adventure talk ("let's battle monsters")
 * - Friendly challenges ("want to spar?")
 * 
 * Should trigger on:
 * - Direct threats to the NPC ("I'll kill you", "attack you")
 * - Extreme disrespect with commands ("sit on my lap now!")
 * - Violent threats ("I'll destroy you")
 */
export function isThreateningMessage(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  
  // Context clues that indicate it's NOT a threat (fighting together, adventure talk)
  const friendlyContexts = [
    /\b(fight|battle|attack)\s+(with|together|alongside)\s+(me|us|you)\b/i,
    /\b(let'?s|let us|we should|we can|want to|wanna)\s+(fight|battle|attack|go)\s+/i,
    /\b(join|come|help)\s+(me|us)\s+(fight|battle|attack|kill)\b/i,
    /\b(fight|battle|attack|kill)\s+(goblin|monster|enemy|bandit|dragon|orc)\b/i,
    /\b(adventure|quest|mission|hunt|hunt down)\b/i,
  ];

  // If it's clearly about fighting together or adventure, not a threat
  if (friendlyContexts.some(pattern => pattern.test(message))) {
    return false;
  }

  // Direct threats to the NPC (using "you" in threatening context)
  const directThreatPatterns = [
    /\b(I'?ll|I will|I'm going to|gonna)\s+(kill|murder|attack|hurt|harm|destroy|strike|hit)\s+(you|your)\b/i,
    /\b(you'?ll|you will)\s+(die|perish)\b/i,
    /\b(threaten|threat)\s+(you|your)\b/i,
    /\b(attack|strike|hit|hurt)\s+(you|your)\b/i,
    // Direct commands to die/harm
    /\b(die|perish|drop dead)\s+(now|!|you)\b/i,
    /\b(die|kill|attack)\s+(you|your|woman|man|bitch|bastard)\b/i,
  ];

  // Extreme disrespect with commands
  const disrespectPatterns = [
    /\b(now!|command|demand|obey|slave|servant)\b/i,
    /\b(f*ck|damn|bastard|bitch|idiot|stupid)\s+(you|your)\b/i,
  ];

  // Check for direct threats
  const hasDirectThreat = directThreatPatterns.some(pattern => pattern.test(message));
  
  // Check for extreme disrespect combined with commands
  const hasDisrespect = disrespectPatterns.some(pattern => pattern.test(lowerMessage)) &&
    (lowerMessage.includes('now') || lowerMessage.includes('command') || lowerMessage.includes('demand'));

  // Check for aggressive commands (die now, kill you, etc.)
  // This catches patterns like "Die now!", "Die now, woman!", "Kill you!", etc.
  const hasAggressiveCommand = /\b(die|kill|attack|destroy|hurt)\s+(now|you|woman|man|bitch|bastard|!|,)/i.test(message) ||
    /\b(die|kill|attack)\s*[,!]\s*(now|woman|man|bitch|bastard|you)/i.test(message);

  const result = hasDirectThreat || hasDisrespect || hasAggressiveCommand;
  
  if (result) {
    Report.debug("Threatening message detected", {
      message,
      hasDirectThreat,
      hasDisrespect,
      hasAggressiveCommand,
    });
  }

  return result;
}

/**
 * Request battle initiation via MCP
 * Called when NPC detects a threatening message
 * 
 * @param autoStart - If true, immediately start the battle without waiting for confirmation
 * @returns Object with requestId and battleId (if auto-started), or null if failed
 */
export async function requestBattleInitiation(
  npcId: string,
  playerId: string,
  reason: string,
  locationId: string,
  autoStart: boolean = true
): Promise<{ requestId: string; battleId?: string } | null> {
  try {
    const npc = characterManager.getCharacterByID(npcId);
    const player = characterManager.getCharacterByID(playerId);

    if (!npc || !player) {
      Report.warn("Character not found for battle initiation", { npcId, playerId });
      return null;
    }

    const npcName = typeof npc.name === 'string' ? npc.name : npc.name?.en || "NPC";
    const playerName = typeof player.name === 'string' ? player.name : player.name?.en || "Player";

    const requestId = randomUUID();

    const request: BattleInitiationRequest = {
      requestId,
      type: "BATTLE_INITIATION",
      npcId,
      npcName,
      playerId,
      playerName,
      reason,
      locationId,
    };

    // Store pending request
    pendingBattleRequests.set(requestId, request);

    // If autoStart is true, immediately start the battle
    if (autoStart) {
      const result = await handleBattleConfirmation(requestId, true);
      if (result && result.confirmed && result.battleId) {
        Report.info("Battle automatically started", {
          requestId,
          battleId: result.battleId,
          npcId,
          playerId,
        });
        return { requestId, battleId: result.battleId };
      } else {
        Report.error("Failed to auto-start battle", {
          requestId,
          error: result?.error,
        });
        return null;
      }
    }

    // NOTE: If autoStart is false, the frontend receives the requestId via WebSocket
    // and can show a confirmation dialog, then call POST /api/battle/confirm

    Report.info("Battle initiation request created (frontend will handle dialog)", {
      requestId,
      npcId,
      npcName,
      playerId,
      playerName,
      reason,
    });

    return { requestId };
  } catch (error) {
    Report.error("Error requesting battle initiation", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
      playerId,
    });
    return null;
  }
}

/**
 * Handle MCP battle confirmation response
 * Called when user confirms or rejects the battle
 */
export async function handleBattleConfirmation(
  requestId: string,
  confirmed: boolean
): Promise<BattleInitiationResponse | null> {
  const request = pendingBattleRequests.get(requestId);
  if (!request) {
    Report.warn("Battle initiation request not found", { requestId });
    return null;
  }

  // Remove from pending
  pendingBattleRequests.delete(requestId);

  if (!confirmed) {
    return {
      requestId,
      confirmed: false,
    };
  }

  try {
    // Get characters
    const npc = characterManager.getCharacterByID(request.npcId);
    const player = characterManager.getCharacterByID(request.playerId);

    if (!npc || !player) {
      return {
        requestId,
        confirmed: false,
        error: "Character not found",
      };
    }

    // Get or create parties
    let npcParty: Party;
    if (npc.partyID) {
      const existingParty = partyManager.getPartyByID(npc.partyID);
      if (existingParty) {
        npcParty = existingParty;
      } else {
        // Create new party for NPC
        npcParty = new Party({
          leader: npc,
          leaderId: npc.id,
          behavior: new PartyBehavior(),
          characters: [npc],
          location: request.locationId as any,
        });
        partyManager.addParty(npcParty);
      }
    } else {
      // Create new party for NPC
      npcParty = new Party({
        leader: npc,
        leaderId: npc.id,
        behavior: new PartyBehavior(),
        characters: [npc],
        location: request.locationId as any,
      });
      partyManager.addParty(npcParty);
    }

    let playerParty: Party;
    if (player.partyID) {
      const existingParty = partyManager.getPartyByID(player.partyID);
      if (existingParty) {
        playerParty = existingParty;
      } else {
        // Create new party for player
        playerParty = new Party({
          leader: player,
          leaderId: player.id,
          behavior: new PartyBehavior(),
          characters: [player],
          location: request.locationId as any,
        });
        partyManager.addParty(playerParty);
      }
    } else {
      // Create new party for player
      playerParty = new Party({
        leader: player,
        leaderId: player.id,
        behavior: new PartyBehavior(),
        characters: [player],
        location: request.locationId as any,
      });
      partyManager.addParty(playerParty);
    }

    // Get location
    const location = locationRepository[request.locationId as keyof typeof locationRepository];
    if (!location) {
      return {
        requestId,
        confirmed: false,
        error: `Unknown location: ${request.locationId}`,
      };
    }

    // Create battle
    const battle = new Battle(
      playerParty,
      npcParty,
      location,
      GameTime,
      BattleType.Normal
    );

    // Start battle
    await battle.startBattle();

    Report.info("Battle initiated via MCP", {
      requestId,
      battleId: battle.id,
      npcId: request.npcId,
      playerId: request.playerId,
    });

    return {
      requestId,
      confirmed: true,
      battleId: battle.id,
    };
  } catch (error) {
    Report.error("Error handling battle confirmation", {
      error: error instanceof Error ? error.message : String(error),
      requestId,
    });
    return {
      requestId,
      confirmed: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Get pending battle request by ID
 */
export function getPendingBattleRequest(requestId: string): BattleInitiationRequest | null {
  return pendingBattleRequests.get(requestId) || null;
}

/**
 * Get LLM tool definition for initiateBattle
 * Returns OpenAI-compatible tool schema for LLM function calling
 */
export function getBattleInitiationToolDefinition(): import("./LLMService").LLMTool {
  return {
    type: "function",
    function: {
      name: "initiateBattle",
      description: "Call this tool when the player threatens you, attacks you, or makes violent/aggressive statements. Examples: 'I'll kill you', 'Die now', 'Attack you', threats with commands. This tool will initiate a battle between you and the threatening player. Use this when you need to defend yourself or respond to threats.",
      parameters: {
        type: "object",
        properties: {
          npcId: {
            type: "string",
            description: "Your character ID (the NPC's ID)",
          },
          playerId: {
            type: "string",
            description: "The player's character ID (the person threatening you)",
          },
          reason: {
            type: "string",
            description: "Why you are initiating battle (e.g., 'Player threatened me: [message]')",
          },
        },
        required: ["npcId", "playerId", "reason"],
      },
    },
  };
}

