import { restHandler } from "./RestHandler";
import { ChatMessage, ChatScope } from "@/types/chat";

export interface SendMessageRequest {
  scope: ChatScope;
  recipientId?: string; // Required for private chats
  content: string;
}

export interface SendMessageResponse {
  success: boolean;
  message?: ChatMessage;
  messageKey?: string;
  isNPC?: boolean; // Indicates if this was an NPC chat (response might come via WS)
}

export interface GetMessagesResponse {
  success: boolean;
  messages: ChatMessage[];
  messageKey?: string;
}

class ChatService {
  /**
   * Send a chat message
   * Note: Response may be immediate (REST) or come later via WebSocket
   * For NPC chats, the response will typically come via WebSocket
   */
  async sendMessage(request: SendMessageRequest): Promise<SendMessageResponse> {
    try {
      const response = await restHandler.post<SendMessageRequest, SendMessageResponse>(
        "/api/chat/send",
        request,
        true // requireAuth
      );
      return response;
    } catch (error) {
      console.error("Send message error:", error);
      return {
        success: false,
        messageKey: error instanceof Error ? error.message : "chat.sendFailed",
      };
    }
  }

  /**
   * Get chat messages by scope
   */
  async getMessages(scope: ChatScope, friendId?: string): Promise<GetMessagesResponse> {
    try {
      let endpoint = `/api/chat/${scope}`;
      if (scope === "private" && friendId) {
        endpoint = `/api/chat/private/${friendId}`;
      }

      const response = await restHandler.get<GetMessagesResponse>(
        endpoint,
        true // requireAuth
      );
      return response;
    } catch (error) {
      console.error("Get messages error:", error);
      return {
        success: false,
        messages: [],
        messageKey: error instanceof Error ? error.message : "chat.fetchFailed",
      };
    }
  }
}

export const chatService = new ChatService();

