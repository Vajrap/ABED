import { ChatMessage, Friend, UserStatus, ChatScope, Relation } from "@/types/chat";

/**
 * Mock chat messages for different scopes
 */
export const mockChatMessages: ChatMessage[] = [
  // Global Chat
  {
    id: "chat-001",
    scope: "global",
    senderId: "mock-character-001", // Viljah
    senderName: "Viljah",
    senderPortrait: "m_elven01",
    content: "Hey everyone! Just started playing, any tips?",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: "chat-002",
    scope: "global",
    senderId: "player-456",
    senderName: "Dragonslayer",
    content: "Welcome! Check out the crafting system, it's really deep.",
    timestamp: new Date(Date.now() - 3300000), // 55 minutes ago
  },
  {
    id: "chat-003",
    scope: "global",
    senderId: "player-789",
    senderName: "MysticMage",
    content: "Anyone want to form a party? Looking for a healer.",
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
  },

  // Location Chat (Wayward Inn)
  {
    id: "chat-004",
    scope: "location",
    senderId: "npc-001",
    senderName: "Innkeeper",
    content: "Welcome to the Wayward Inn! We have fresh ale and warm beds.",
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
  },
  {
    id: "chat-005",
    scope: "location",
    senderId: "player-456",
    senderName: "Dragonslayer",
    content: "The weather here is really weird today, isn't it?",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: "chat-006",
    scope: "location",
    senderId: "mock-character-001", // Viljah
    senderName: "Viljah",
    senderPortrait: "m_elven01",
    content: "Yeah, heavy rain out of nowhere!",
    timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
  },

  // Party Chat
  {
    id: "chat-007",
    scope: "party",
    senderId: "mock-character-001",
    senderName: "Viljah",
    senderPortrait: "m_elven01",
    content: "Let's head to the forest after we rest here.",
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
  },
  {
    id: "chat-008",
    scope: "party",
    senderId: "mock-character-002",
    senderName: "Thorin",
    senderPortrait: "m_dwarf01",
    content: "Good idea. We should stock up on potions first.",
    timestamp: new Date(Date.now() - 1700000), // 28 minutes ago
  },
  {
    id: "chat-009",
    scope: "party",
    senderId: "mock-character-003",
    senderName: "Luna",
    senderPortrait: "f_human01",
    content: "I can craft some if we have the materials.",
    timestamp: new Date(Date.now() - 1600000), // 27 minutes ago
  },

  // Region Chat (Central)
  {
    id: "chat-010",
    scope: "region",
    senderId: "player-999",
    senderName: "Explorer",
    content: "Anyone know where to find iron ore in Central region?",
    timestamp: new Date(Date.now() - 2400000), // 40 minutes ago
  },
  {
    id: "chat-011",
    scope: "region",
    senderId: "player-456",
    senderName: "Dragonslayer",
    content: "Check the mountains north of the capital. There's a mine there.",
    timestamp: new Date(Date.now() - 2100000), // 35 minutes ago
  },

  // Private messages (for individual chats) - Steamy romantic messages
  {
    id: "chat-012",
    scope: "private",
    senderId: "mock-character-003",
    senderName: "Luna",
    senderPortrait: "f_human01",
    content: "Hey Viljah... I can't stop thinking about last night. Your touch... it lingers on my skin.",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    recipientId: "mock-character-001",
  },
  {
    id: "chat-013",
    scope: "private",
    senderId: "mock-character-001",
    senderName: "Viljah",
    senderPortrait: "m_elven01",
    content: "Luna... neither can I. The way you looked at me under the moonlight... I've never felt this way before.",
    timestamp: new Date(Date.now() - 3550000), // 59 minutes ago
    recipientId: "mock-character-003",
  },
  {
    id: "chat-014",
    scope: "private",
    senderId: "mock-character-003",
    senderName: "Luna",
    senderPortrait: "f_human01",
    content: "Meet me in our spot tonight? I have something I want to show you... and tell you.",
    timestamp: new Date(Date.now() - 3500000), // 58 minutes ago
    recipientId: "mock-character-001",
  },
  {
    id: "chat-015",
    scope: "private",
    senderId: "mock-character-001",
    senderName: "Viljah",
    senderPortrait: "m_elven01",
    content: "I'll be there. Nothing could keep me away from you. My heart races just thinking about you.",
    timestamp: new Date(Date.now() - 3450000), // 57 minutes ago
    recipientId: "mock-character-003",
  },
  {
    id: "chat-016",
    scope: "private",
    senderId: "mock-character-003",
    senderName: "Luna",
    senderPortrait: "f_human01",
    content: "Good... I've been waiting all day for this moment. The anticipation is driving me wild.",
    timestamp: new Date(Date.now() - 3400000), // 57 minutes ago
    recipientId: "mock-character-001",
  },
];

/**
 * Get last private message between current user and a friend
 * This ensures friends list only shows messages from private conversations
 */
function getLastPrivateMessage(
  friendId: string,
  currentUserId: string = "mock-character-001"
): { content: string; timestamp: Date } | null {
  const privateMessages = mockChatMessages
    .filter(
      (msg) =>
        msg.scope === "private" &&
        (msg.senderId === friendId || msg.recipientId === friendId) &&
        (msg.senderId === currentUserId || msg.recipientId === currentUserId)
    )
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  if (privateMessages.length > 0) {
    const lastMsg = privateMessages[0];
    return {
      content: lastMsg.content,
      timestamp: lastMsg.timestamp,
    };
  }

  return null;
}

/**
 * Mock friends list (players and NPCs)
 * lastMessage should only come from private conversations, not public chats
 */
export const mockFriends: Friend[] = [
  // Lovers (can be players or NPCs, can have multiple)
  {
    id: "mock-character-003",
    name: "Luna",
    portrait: "f_human01",
    isPlayer: false, // NPC lover
    relation: {
      title: "lover",
      affection: 85, // Very high affection (romantic love)
      closeness: 90, // Very close and intimate relationship
    },
    // Get last private message from actual private chat
    lastMessage: "Good... I've been waiting all day for this moment. The anticipation is driving me wild.",
    lastMessageTime: new Date(Date.now() - 3400000),
  },

  // Close Friends (Players)
  {
    id: "player-456",
    name: "Dragonslayer",
    portrait: undefined, // No portrait for now
    isPlayer: true,
    status: "online",
    relation: {
      title: "closeFriend",
      affection: 70, // High affection (very good friends)
      closeness: 75, // Close friendship
    },
    // No private messages with Dragonslayer, so no lastMessage
  },

  // Regular Friends (Players)
  {
    id: "player-789",
    name: "MysticMage",
    portrait: undefined,
    isPlayer: true,
    status: "away",
    relation: {
      title: "friend",
      affection: 50, // Moderate affection
      closeness: 45, // Moderate closeness
    },
    // No private messages with MysticMage, so no lastMessage
  },
  {
    id: "player-999",
    name: "Explorer",
    portrait: undefined,
    isPlayer: true,
    status: "offline",
    lastSeen: new Date(Date.now() - 2400000),
    relation: {
      title: "friend",
      affection: 40, // Moderate affection
      closeness: 35, // Somewhat close
    },
    // No private messages with Explorer, so no lastMessage
  },

  // NPCs (non-lover NPCs)
  {
    id: "mock-character-002",
    name: "Thorin",
    portrait: "m_dwarf01",
    isPlayer: false,
    // No relation specified for NPCs (will show in NPCs tab)
    // No private messages with Thorin, so no lastMessage
  },
  {
    id: "npc-001",
    name: "Innkeeper",
    portrait: undefined,
    isPlayer: false,
    // No relation specified for NPCs (will show in NPCs tab)
    // No private messages with Innkeeper, so no lastMessage
  },
];

/**
 * Get chat messages filtered by scope
 * @param scope - The chat scope to filter by
 * @param privateChatUserId - For private chats, the friend's user ID to chat with
 * @param currentUserId - The current user's ID (defaults to mock-character-001 for Viljah)
 */
export function getChatMessagesByScope(
  scope: ChatScope,
  privateChatUserId?: string,
  currentUserId: string = "mock-character-001"
): ChatMessage[] {
  if (scope === "private" && privateChatUserId) {
    // For private chat, get messages between current user and selected friend ONLY
    // Must be private scope AND involve both the current user and the selected friend
    return mockChatMessages.filter(
      (msg) =>
        msg.scope === "private" &&
        // Message must involve the selected friend (as sender or recipient)
        (msg.senderId === privateChatUserId || msg.recipientId === privateChatUserId) &&
        // Message must involve the current user (as sender or recipient)
        (msg.senderId === currentUserId || msg.recipientId === currentUserId)
    );
  }

  // For non-private chats, only return messages matching the scope
  return mockChatMessages.filter((msg) => msg.scope === scope);
}

