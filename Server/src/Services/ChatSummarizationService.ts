/**
 * Chat Summarization Service
 * 
 * Handles summarization of conversation history for NPC-Character chats.
 * Uses LLM to summarize older messages while keeping recent ones detailed.
 */

import { db } from "../Database/connection";
import { chatRooms, chatLogs, npcCharacterRelations } from "../Database/Schema";
import { eq, and, or, asc } from "drizzle-orm";
import { getChatHistoryForAI, type ChatHistoryEntry } from "./ChatHistoryService";
import { summarizeConversation } from "./LLMSummarizationService";
import { updateNPCRelation, getNPCImpression } from "./NPCCharacterRelationService";
import Report from "../Utils/Reporter";

// Configuration
const DETAILED_EXCHANGES = 10; // Keep last 10 exchanges detailed
const SUMMARIZATION_INTERVAL = 10; // Summarize every 10 exchanges (on 10, 20, 30, etc.)

/**
 * Check if conversation summarization is needed
 * Returns true if we're at a multiple of 10 exchanges and haven't summarized this exchange yet
 */
export async function shouldSummarizeConversation(
  npcId: string,
  characterId: string
): Promise<boolean> {
  try {
    // Get relation to check conversation count and last summarized exchange
    const relation = await getNPCImpression(npcId, characterId);
    
    if (!relation) {
      return false;
    }

    const currentExchangeCount = Math.floor(relation.conversationCount / 2); // Each exchange = 2 messages
    const lastSummarized = relation.lastSummarizedExchange || 0;

    // Only summarize if:
    // 1. We have at least 10 exchanges
    // 2. Current exchange is a multiple of 10
    // 3. We haven't summarized this exchange yet
    const shouldSummarize = 
      currentExchangeCount >= SUMMARIZATION_INTERVAL &&
      currentExchangeCount % SUMMARIZATION_INTERVAL === 0 &&
      currentExchangeCount > lastSummarized;

    Report.debug("Checking if summarization needed", {
      npcId,
      characterId,
      currentExchangeCount,
      lastSummarized,
      shouldSummarize,
    });

    return shouldSummarize;
  } catch (error) {
    Report.error("Error checking if conversation summarization needed", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
      characterId,
    });
    return false;
  }
}

/**
 * Summarize conversation history
 * Summarizes the oldest exchanges that exceed the detailed window
 * 
 * @param npcId - The NPC's character ID
 * @param characterId - The player character's ID
 * @returns The generated summary, or null if summarization not needed
 */
export async function summarizeConversationHistory(
  npcId: string,
  characterId: string
): Promise<string | null> {
  try {
    // Find chat room
    const [room] = await db
      .select()
      .from(chatRooms)
      .where(
        or(
          and(eq(chatRooms.char1, characterId), eq(chatRooms.char2, npcId)),
          and(eq(chatRooms.char1, npcId), eq(chatRooms.char2, characterId))
        )
      )
      .limit(1);

    if (!room) {
      return null;
    }

    // Get all messages ordered by timestamp
    const allMessages = await db
      .select()
      .from(chatLogs)
      .where(eq(chatLogs.roomId, room.id))
      .orderBy(asc(chatLogs.timestamp));

    // If we don't have enough messages, no summarization needed
    if (allMessages.length <= DETAILED_EXCHANGES * 2) {
      return null;
    }

    // Get messages to summarize (oldest ones, excluding recent DETAILED_EXCHANGES)
    const messagesToSummarize = allMessages.slice(0, allMessages.length - (DETAILED_EXCHANGES * 2));
    
    // Format as ChatHistoryEntry
    const entriesToSummarize: ChatHistoryEntry[] = messagesToSummarize.map((msg) => ({
      role: msg.sender === characterId ? "user" : "assistant",
      content: msg.message,
      timestamp: msg.timestamp,
    }));

    if (entriesToSummarize.length === 0) {
      return null;
    }

    // Get relation to get previous summary and current exchange count
    const relation = await getNPCImpression(npcId, characterId);
    const previousSummary = relation?.lastConversationSummary || null;
    const currentExchangeCount = relation ? Math.floor(relation.conversationCount / 2) : 0;

    // Summarize using LLM
    const summary = await summarizeConversation(
      npcId,
      characterId,
      entriesToSummarize,
      previousSummary
    );

    if (!summary) {
      Report.warn("LLM conversation summarization returned empty result", { npcId, characterId });
      return previousSummary;
    }

    // Get current conversation summaries array from database
    const [dbRelation] = await db
      .select({ conversationSummaries: npcCharacterRelations.conversationSummaries })
      .from(npcCharacterRelations)
      .where(
        and(
          eq(npcCharacterRelations.npcId, npcId),
          eq(npcCharacterRelations.characterId, characterId)
        )
      )
      .limit(1);
    
    const currentSummaries = (dbRelation?.conversationSummaries as any[]) || [];
    
    // Add new summary to array
    const newSummaryEntry = {
      timestamp: new Date().toISOString(),
      summary,
      messageCount: entriesToSummarize.length,
      exchangeCount: currentExchangeCount,
    };
    
    const updatedSummaries = [...currentSummaries, newSummaryEntry];
    
    // Update conversation summary in relation and track exchange count
    await updateNPCRelation(npcId, characterId, {
      lastConversationSummary: summary,
      conversationSummaries: updatedSummaries,
      lastSummarizedExchange: currentExchangeCount,
    });

    Report.info("Summarized conversation history", {
      npcId,
      characterId,
      messagesSummarized: entriesToSummarize.length,
      summaryLength: summary.length,
      exchangeCount: currentExchangeCount,
    });

    return summary;
  } catch (error) {
    Report.error("Error summarizing conversation history", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
      characterId,
    });
    return null;
  }
}

/**
 * Get chat history with summary included
 * Returns summary + recent detailed messages
 */
export async function getChatHistoryWithSummary(
  npcId: string,
  characterId: string,
  exchangeCount: number = DETAILED_EXCHANGES
): Promise<{
  summary: string | null;
  recentMessages: ChatHistoryEntry[];
}> {
  try {
    // Get recent messages first
    const recentMessages = await getChatHistoryForAI(npcId, characterId, exchangeCount);

    // Get summary from relation (don't trigger summarization here - it's done separately)
    const relation = await getNPCImpression(npcId, characterId);
    const summary = relation?.lastConversationSummary || null;

    return {
      summary,
      recentMessages,
    };
  } catch (error) {
    Report.error("Error getting chat history with summary", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
      characterId,
    });
    return {
      summary: null,
      recentMessages: [],
    };
  }
}

