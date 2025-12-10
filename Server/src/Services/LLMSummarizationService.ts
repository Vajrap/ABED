/**
 * LLM Summarization Service
 * 
 * Handles all LLM-based summarization tasks:
 * - NPC Life Summaries (what NPC has been through)
 * - Conversation Summaries (chat history)
 * - Relationship Summaries (character-NPC impressions)
 */

import { callLMStudio, type LMStudioRequest } from "./LMStudioService";
import type { ChatHistoryEntry } from "./ChatHistoryService";
import type { NPCImpression } from "./NPCCharacterRelationService";
import { characterManager } from "../Game/CharacterManager";
import { getNPCTemplateById } from "../Entity/Character/NPCs/definitions";
import Report from "../Utils/Reporter";

export interface NPCEvent {
  type: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

/**
 * Summarize NPC's life experiences, quests, and events
 * 
 * @param npcId - The NPC's character ID
 * @param events - Array of events to summarize
 * @param previousSummary - Previous summary (for incremental updates) or null
 * @returns LLM-generated summary
 */
export async function summarizeNPCLife(
  npcId: string,
  events: NPCEvent[],
  previousSummary: string | null = null
): Promise<string> {
  try {
    const npc = characterManager.getCharacterByID(npcId);
    const template = getNPCTemplateById(npcId);
    
    if (!npc) {
      Report.warn("NPC not found for life summarization", { npcId });
      return "";
    }

    const npcName = typeof npc.name === 'string' ? npc.name : npc.name?.en || "NPC";
    const npcRace = npc.race;
    const npcRole = template?.title?.role || "character";
    const personality = template?.characterPrompt || "A character in this world.";

    // Build events text
    const eventsText = events
      .map((event) => `- ${event.type}: ${event.description}`)
      .join("\n");

    const prompt = `You are summarizing the life experiences of ${npcName}, a ${npcRace} ${npcRole} in this world.

${npcName}'s personality and background:
${personality}

${previousSummary 
  ? `Previous summary:\n${previousSummary}\n\nRecent events since last summary:` 
  : `This is a new summary. Recent events:`}

${eventsText || "No specific events recorded yet."}

Create a concise summary (2-3 paragraphs) of what ${npcName} has been through, focusing on:
- Significant quests or missions
- Important relationships formed
- Major events or changes
- Current state and circumstances

Maintain consistency with their personality. Write in third person about ${npcName}.`;

    const lmRequest: LMStudioRequest = {
      prompt,
      npcId,
      npcName,
    };

    const response = await callLMStudio(lmRequest);
    
    if (!response.success || !response.response) {
      Report.error("Failed to summarize NPC life", {
        npcId,
        error: response.error,
      });
      return previousSummary || "";
    }

    return response.response.trim();
  } catch (error) {
    Report.error("Error summarizing NPC life", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
    });
    return previousSummary || "";
  }
}

/**
 * Summarize conversation history between NPC and character
 * 
 * @param npcId - The NPC's character ID
 * @param characterId - The player character's ID
 * @param messages - Array of chat messages to summarize
 * @param previousSummary - Previous conversation summary or null
 * @returns LLM-generated conversation summary
 */
export async function summarizeConversation(
  npcId: string,
  characterId: string,
  messages: ChatHistoryEntry[],
  previousSummary: string | null = null
): Promise<string> {
  try {
    const npc = characterManager.getCharacterByID(npcId);
    const player = characterManager.getCharacterByID(characterId);
    
    if (!npc || !player) {
      Report.warn("Character not found for conversation summarization", { npcId, characterId });
      return "";
    }

    const npcName = typeof npc.name === 'string' ? npc.name : npc.name?.en || "NPC";
    const playerName = typeof player.name === 'string' ? player.name : player.name?.en || "Player";

    // Format conversation
    const conversationText = messages
      .map((msg) => {
        const speaker = msg.role === "user" ? playerName : npcName;
        return `${speaker}: ${msg.content}`;
      })
      .join("\n");

    const prompt = `Summarize this conversation between ${npcName} and ${playerName}.

${previousSummary 
  ? `Previous conversation summary:\n${previousSummary}\n\nConversation to summarize:` 
  : `This is a new conversation. Conversation to summarize:`}

${conversationText}

Create a concise summary (1-2 sentences) covering:
- Main topics discussed
- Important decisions or agreements
- Relationship changes or notable moments
- Any commitments, quests, or tasks mentioned

Keep it brief and focused on what matters for future conversations.`;

    const lmRequest: LMStudioRequest = {
      prompt,
      npcId,
      npcName,
    };

    const response = await callLMStudio(lmRequest);
    
    if (!response.success || !response.response) {
      Report.error("Failed to summarize conversation", {
        npcId,
        characterId,
        error: response.error,
      });
      return previousSummary || "";
    }

    return response.response.trim();
  } catch (error) {
    Report.error("Error summarizing conversation", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
      characterId,
    });
    return previousSummary || "";
  }
}

/**
 * Summarize character-NPC relationship/impression
 * 
 * @param npcId - The NPC's character ID
 * @param characterId - The player character's ID
 * @param relation - Current relationship data
 * @param conversationSummary - Recent conversation summary
 * @param importantEvents - Important events in the relationship
 * @returns LLM-generated relationship summary
 */
export async function summarizeRelationship(
  npcId: string,
  characterId: string,
  relation: NPCImpression,
  conversationSummary: string | null = null,
  importantEvents: any[] = []
): Promise<string> {
  try {
    const npc = characterManager.getCharacterByID(npcId);
    const player = characterManager.getCharacterByID(characterId);
    const template = getNPCTemplateById(npcId);
    
    if (!npc || !player) {
      Report.warn("Character not found for relationship summarization", { npcId, characterId });
      return "";
    }

    const npcName = typeof npc.name === 'string' ? npc.name : npc.name?.en || "NPC";
    const playerName = typeof player.name === 'string' ? player.name : player.name?.en || "Player";
    const personality = template?.characterPrompt || "A character in this world.";

    // Format important events
    const eventsText = importantEvents
      .map((event: any) => {
        if (typeof event === 'string') return `- ${event}`;
        if (event.description) return `- ${event.description}`;
        return `- ${JSON.stringify(event)}`;
      })
      .join("\n");

    const prompt = `Summarize ${npcName}'s relationship with ${playerName}.

${npcName}'s personality:
${personality}

Current relationship:
- Affection: ${relation.affection}/100
- Closeness: ${relation.closeness}/100
- Status: ${relation.relationTitle || "stranger"}
- Total conversations: ${relation.conversationCount}

${conversationSummary ? `Recent interactions:\n${conversationSummary}\n` : ""}

${importantEvents.length > 0 ? `Important events:\n${eventsText}\n` : ""}

Create a 2-3 sentence summary of how ${npcName} views ${playerName}, including:
- Their feelings and impressions
- How the relationship has evolved
- Notable moments or interactions
- Current standing

Write from ${npcName}'s perspective, in first person.`;

    const lmRequest: LMStudioRequest = {
      prompt,
      npcId,
      npcName,
    };

    const response = await callLMStudio(lmRequest);
    
    if (!response.success || !response.response) {
      Report.error("Failed to summarize relationship", {
        npcId,
        characterId,
        error: response.error,
      });
      return "";
    }

    return response.response.trim();
  } catch (error) {
    Report.error("Error summarizing relationship", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
      characterId,
    });
    return "";
  }
}

