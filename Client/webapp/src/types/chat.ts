/**
 * Chat message types
 */
export type ChatScope = "location" | "party" | "private";

/**
 * User status for friends list
 */
export type UserStatus = "online" | "away" | "busy" | "offline";

/**
 * Relationship title/type between characters
 * - "lover": Romantic/romantic relationship (can have multiple)
 * - "closeFriend": Very close friends (best friends)
 * - "friend": Regular friends
 * - Other relation types can be added later (e.g., "enemy", "rival", "mentor", "student", "ally", "family")
 */
export type RelationTitle = "lover" | "closeFriend" | "friend" | "enemy" | "rival" | "mentor" | "student" | "ally" | "family";

/**
 * Relationship data structure (inspired by The Sims relationship system)
 * - title: Type of relationship (enum/string)
 * - affection: How much they like/love each other (can be negative for enemies, -100 to 100)
 * - closeness: How intimate/close the relationship is (0 to 100)
 */
export interface Relation {
  title: RelationTitle;
  affection: number; // -100 to 100 (negative = dislike/hate, positive = like/love)
  closeness: number; // 0 to 100 (how intimate/close the relationship is)
}

/**
 * Chat message interface
 */
export interface ChatMessage {
  id: string;
  scope: ChatScope;
  senderId: string;
  senderName: string;
  senderPortrait?: string; // Optional portrait ID
  content: string;
  timestamp: Date;
  // For private messages
  recipientId?: string;
}

/**
 * Friend interface (for Social tab)
 */
export interface Friend {
  id: string;
  name: string;
  portrait?: string;
  isPlayer: boolean; // true for players, false for NPCs
  status?: UserStatus; // Only applicable for players
  relation?: Relation; // Relationship data (title, affection, closeness)
  lastSeen?: Date; // For offline players or NPCs
  lastMessage?: string; // Preview of last message
  lastMessageTime?: Date;
}

