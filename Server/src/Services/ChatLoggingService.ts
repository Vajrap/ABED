/**
 * Chat Logging Service
 * 
 * Handles saving chat messages to database for history and AI context.
 */

import { db } from "../Database/connection";
import { chatRooms, chatLogs, publicChatLogs } from "../Database/Schema";
import { eq, and, or, desc } from "drizzle-orm";
import Report from "../Utils/Reporter";

/**
 * Get or create a chat room between two characters
 */
export async function getOrCreateChatRoom(
  char1Id: string,
  char2Id: string,
  isNPCChat: boolean
): Promise<string> {
  try {
    // Try to find existing room (check both orders)
    const [existingRoom] = await db
      .select()
      .from(chatRooms)
      .where(
        or(
          and(eq(chatRooms.char1, char1Id), eq(chatRooms.char2, char2Id)),
          and(eq(chatRooms.char1, char2Id), eq(chatRooms.char2, char1Id))
        )
      )
      .limit(1);

    if (existingRoom) {
      return existingRoom.id;
    }

    // Create new room (always put smaller ID first for consistency)
    const [char1, char2] = char1Id < char2Id ? [char1Id, char2Id] : [char2Id, char1Id];
    
    const [newRoom] = await db
      .insert(chatRooms)
      .values({
        char1,
        char2,
        isNPCChat,
      })
      .returning();

    Report.debug("Created new chat room", {
      roomId: newRoom.id,
      char1,
      char2,
      isNPCChat,
    });

    return newRoom.id;
  } catch (error) {
    Report.error("Error getting or creating chat room", {
      error: error instanceof Error ? error.message : String(error),
      char1Id,
      char2Id,
    });
    throw error;
  }
}

/**
 * Log a private chat message
 */
export async function logPrivateMessage(
  roomId: string,
  senderId: string,
  receiverId: string,
  message: string
): Promise<void> {
  try {
    await db.insert(chatLogs).values({
      roomId,
      sender: senderId,
      receiver: receiverId,
      message,
      timestamp: new Date(),
    });

    Report.debug("Logged private chat message", {
      roomId,
      senderId,
      receiverId,
      messageLength: message.length,
    });
  } catch (error) {
    Report.error("Error logging private chat message", {
      error: error instanceof Error ? error.message : String(error),
      roomId,
      senderId,
    });
    throw error;
  }
}

/**
 * Log a public chat message
 */
export async function logPublicMessage(
  scope: "global" | "region" | "location" | "party",
  scopeId: string | null,
  senderId: string,
  message: string
): Promise<void> {
  try {
    await db.insert(publicChatLogs).values({
      scope,
      scopeId,
      sender: senderId,
      message,
      timestamp: new Date(),
    });

    Report.debug("Logged public chat message", {
      scope,
      scopeId,
      senderId,
      messageLength: message.length,
    });
  } catch (error) {
    Report.error("Error logging public chat message", {
      error: error instanceof Error ? error.message : String(error),
      scope,
      senderId,
    });
    throw error;
  }
}

