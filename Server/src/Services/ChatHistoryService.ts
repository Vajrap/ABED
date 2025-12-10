/**
 * Chat History Service
 * 
 * Retrieves chat history for AI context and UI display.
 */

import { db } from "../Database/connection";
import { chatRooms, chatLogs } from "../Database/Schema";
import { eq, and, or, desc } from "drizzle-orm";
import Report from "../Utils/Reporter";

export interface ChatHistoryEntry {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

/**
 * Get chat history for AI context (last N exchanges)
 * Returns formatted history for LLM consumption
 */
export async function getChatHistoryForAI(
  npcId: string,
  characterId: string,
  exchangeCount: number = 10
): Promise<ChatHistoryEntry[]> {
  try {
    // 1. Find chat room
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
      // No previous conversation
      return [];
    }

    // 2. Get last N messages (ordered by timestamp DESC, then take last N)
    // We need 2*exchangeCount messages (N exchanges = 2N messages)
    const messages = await db
      .select()
      .from(chatLogs)
      .where(eq(chatLogs.roomId, room.id))
      .orderBy(desc(chatLogs.timestamp))
      .limit(exchangeCount * 2);

    // 3. Reverse to get chronological order, then format
    const history: ChatHistoryEntry[] = messages
      .reverse()
      .map((msg) => ({
        role: msg.sender === characterId ? "user" : "assistant",
        content: msg.message,
        timestamp: msg.timestamp,
      }));

    Report.debug("Retrieved chat history for AI", {
      npcId,
      characterId,
      messageCount: history.length,
      exchangeCount,
    });

    return history;
  } catch (error) {
    Report.error("Error getting chat history for AI", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
      characterId,
    });
    return [];
  }
}

/**
 * Get chat history for UI display
 * Returns all messages in a room, ordered chronologically
 */
export async function getChatHistoryForUI(
  roomId: string,
  limit: number = 100
): Promise<Array<{
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
}>> {
  try {
    const messages = await db
      .select()
      .from(chatLogs)
      .where(eq(chatLogs.roomId, roomId))
      .orderBy(chatLogs.timestamp)
      .limit(limit);

    return messages.map((msg) => ({
      senderId: msg.sender,
      receiverId: msg.receiver,
      message: msg.message,
      timestamp: msg.timestamp,
    }));
  } catch (error) {
    Report.error("Error getting chat history for UI", {
      error: error instanceof Error ? error.message : String(error),
      roomId,
    });
    return [];
  }
}

