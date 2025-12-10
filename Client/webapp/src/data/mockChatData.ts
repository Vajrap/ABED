import { ChatMessage, Friend, ChatScope } from "@/types/chat";

/**
 * API Endpoint Specifications for Chat System
 * 
 * Frontend defines these API contracts - backend should implement accordingly.
 * All endpoints require authentication (Bearer token in Authorization header).
 */

/**
 * Chat Message API Endpoints
 * 
 * GET /api/chat/global
 *   Returns: { success: boolean; messages: ChatMessage[] }
 *   Description: Get all global chat messages
 * 
 * GET /api/chat/region
 *   Returns: { success: boolean; messages: ChatMessage[] }
 *   Description: Get all region chat messages (for current character's region)
 * 
 * GET /api/chat/location
 *   Returns: { success: boolean; messages: ChatMessage[] }
 *   Description: Get all location chat messages (for current character's location)
 * 
 * GET /api/chat/party
 *   Returns: { success: boolean; messages: ChatMessage[] }
 *   Description: Get all party chat messages (for current character's party)
 * 
 * GET /api/chat/private/:friendId
 *   Params: friendId (string) - The friend/NPC ID to chat with
 *   Returns: { success: boolean; messages: ChatMessage[] }
 *   Description: Get all private messages between current user and specified friend/NPC
 * 
 * POST /api/chat/send
 *   Body: { scope: ChatScope; recipientId?: string; content: string }
 *   Returns: { success: boolean; message?: ChatMessage; messageKey?: string }
 *   Description: Send a chat message (global/region/location/party/private)
 */

/**
 * Social/Friends API Endpoints
 * 
 * GET /api/social/friends
 *   Query params: ?filter=all|lovers|closeFriends|friends|npcs
 *   Returns: { success: boolean; friends: Friend[] }
 *   Description: Get friends list with optional filtering
 *   Note: Location NPCs are fetched separately via GET /api/location/npcs
 * 
 * GET /api/social/lovers
 *   Returns: { success: boolean; friends: Friend[] }
 *   Description: Get all lovers (players and NPCs with lover relation)
 * 
 * GET /api/social/close-friends
 *   Returns: { success: boolean; friends: Friend[] }
 *   Description: Get all close friends (players with closeFriend relation)
 * 
 * GET /api/social/friends
 *   Returns: { success: boolean; friends: Friend[] }
 *   Description: Get all regular friends (players with friend relation)
 * 
 * GET /api/social/npcs
 *   Returns: { success: boolean; friends: Friend[] }
 *   Description: Get all known NPCs (non-lover NPCs the player has interacted with)
 */

/**
 * Placeholder functions - to be replaced with API service calls
 * These maintain the interface while backend APIs are being implemented
 */

export const mockChatMessages: ChatMessage[] = [];
export const mockFriends: Friend[] = [];

export function getChatMessagesByScope(
  scope: ChatScope,
  privateChatUserId?: string,
  currentUserId: string = "player-001"
): ChatMessage[] {
  // TODO: Replace with API service calls
  // Example: chatService.getMessages(scope, privateChatUserId)
  return [];
}

