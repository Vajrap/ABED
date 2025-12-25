/**
 * Chat History Service
 * 
 * Retrieves chat history for AI context and UI display.
 */

import { db } from "../Database/connection";
import { chatRooms, chatLogs, publicChatLogs } from "../Database/Schema";
import { characters } from "../Database/Schema/character";
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
 * Returns messages in a room, ordered chronologically, with sender information
 */
export async function getChatHistoryForUI(
  roomId: string,
  limit: number = 20
): Promise<Array<{
  id: string;
  senderId: string;
  senderName: string;
  senderPortrait?: any;
  receiverId: string;
  message: string;
  timestamp: Date;
}>> {
  try {
    // Get last N messages (ordered by timestamp DESC, then reverse for chronological)
    const messages = await db
      .select({
        sender: chatLogs.sender,
        receiver: chatLogs.receiver,
        message: chatLogs.message,
        timestamp: chatLogs.timestamp,
        senderName: characters.name,
        senderPortrait: characters.portrait,
      })
      .from(chatLogs)
      .innerJoin(characters, eq(chatLogs.sender, characters.id))
      .where(eq(chatLogs.roomId, roomId))
      .orderBy(desc(chatLogs.timestamp))
      .limit(limit);

    // Reverse to get chronological order (oldest first)
    return messages.reverse().map((msg) => ({
      id: `chat-${msg.timestamp.getTime()}-${msg.sender}`,
      senderId: msg.sender,
      senderName: typeof msg.senderName === 'string' ? msg.senderName : msg.senderName?.en || "Unknown",
      senderPortrait: msg.senderPortrait,
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

/**
 * Get location chat history for UI display
 * Returns last N messages for a specific location, ordered chronologically
 */
export async function getLocationChatHistory(
  locationId: string,
  limit: number = 20
): Promise<Array<{
  id: string;
  scope: "location";
  senderId: string;
  senderName: string;
  senderPortrait?: any;
  content: string;
  timestamp: Date;
  scopeId: string;
}>> {
  try {
    // Get last N messages (ordered by timestamp DESC, then reverse for chronological)
    const messages = await db
      .select({
        id: publicChatLogs.id,
        sender: publicChatLogs.sender,
        message: publicChatLogs.message,
        timestamp: publicChatLogs.timestamp,
        scopeId: publicChatLogs.scopeId,
        senderName: characters.name,
        senderPortrait: characters.portrait,
      })
      .from(publicChatLogs)
      .innerJoin(characters, eq(publicChatLogs.sender, characters.id))
      .where(
        and(
          eq(publicChatLogs.scope, "location"),
          eq(publicChatLogs.scopeId, locationId)
        )
      )
      .orderBy(desc(publicChatLogs.timestamp))
      .limit(limit);

    // Reverse to get chronological order (oldest first)
    return messages.reverse().map((msg) => ({
      id: msg.id,
      scope: "location" as const,
      senderId: msg.sender,
      senderName: typeof msg.senderName === 'string' ? msg.senderName : msg.senderName?.en || "Unknown",
      senderPortrait: msg.senderPortrait,
      content: msg.message,
      timestamp: msg.timestamp,
      scopeId: msg.scopeId || locationId,
    }));
  } catch (error) {
    Report.error("Error getting location chat history", {
      error: error instanceof Error ? error.message : String(error),
      locationId,
    });
    return [];
  }
}

/**
 * Get party chat history for UI display
 * Returns last N messages for a specific party, ordered chronologically
 */
export async function getPartyChatHistory(
  partyId: string,
  limit: number = 20
): Promise<Array<{
  id: string;
  scope: "party";
  senderId: string;
  senderName: string;
  senderPortrait?: any;
  content: string;
  timestamp: Date;
  scopeId: string;
}>> {
  try {
    // Get last N messages (ordered by timestamp DESC, then reverse for chronological)
    const messages = await db
      .select({
        id: publicChatLogs.id,
        sender: publicChatLogs.sender,
        message: publicChatLogs.message,
        timestamp: publicChatLogs.timestamp,
        scopeId: publicChatLogs.scopeId,
        senderName: characters.name,
        senderPortrait: characters.portrait,
      })
      .from(publicChatLogs)
      .innerJoin(characters, eq(publicChatLogs.sender, characters.id))
      .where(
        and(
          eq(publicChatLogs.scope, "party"),
          eq(publicChatLogs.scopeId, partyId)
        )
      )
      .orderBy(desc(publicChatLogs.timestamp))
      .limit(limit);

    // Reverse to get chronological order (oldest first)
    return messages.reverse().map((msg) => ({
      id: msg.id,
      scope: "party" as const,
      senderId: msg.sender,
      senderName: typeof msg.senderName === 'string' ? msg.senderName : msg.senderName?.en || "Unknown",
      senderPortrait: msg.senderPortrait,
      content: msg.message,
      timestamp: msg.timestamp,
      scopeId: msg.scopeId || partyId,
    }));
  } catch (error) {
    Report.error("Error getting party chat history", {
      error: error instanceof Error ? error.message : String(error),
      partyId,
    });
    return [];
  }
}

