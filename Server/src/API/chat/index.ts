import { Elysia, t } from "elysia";
import Report from "../../Utils/Reporter";
import { SessionService } from "../../Services/SessionService";
import { characterManager } from "../../Game/CharacterManager";
import { buildNPCChatPrompt } from "../../Services/ChatPromptBuilder";
import { callLMStudio, type LMStudioRequest } from "../../Services/LMStudioService";
import { connectionManager } from "../../Entity/Connection/connectionManager";
import { getOrCreateChatRoom, logPrivateMessage, logPublicMessage } from "../../Services/ChatLoggingService";
import { getOrCreateNPCRelation, updateNPCRelation } from "../../Services/NPCCharacterRelationService";

/**
 * Chat API Routes
 * 
 * Handles all chat-related endpoints:
 * - Sending messages (public and private)
 * - Retrieving messages by scope
 * - NPC chat handling (LLM integration)
 */

const SendMessageSchema = t.Object({
  scope: t.Union([
    t.Literal("global"),
    t.Literal("region"),
    t.Literal("location"),
    t.Literal("party"),
    t.Literal("private"),
  ]),
  recipientId: t.Optional(t.String()), // Required for private chats
  content: t.String({ minLength: 1, maxLength: 1000 }),
});

export const chatRoutes = new Elysia({ prefix: "/chat" })
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      Report.warn("Chat validation error", {
        error: error.message,
        code,
      });
      set.status = 400;
      return { success: false, messageKey: "chat.validationError" };
    }
    throw error;
  })
  /**
   * POST /api/chat/send
   * Send a chat message
   * 
   * Body: {
   *   scope: "global" | "region" | "location" | "party" | "private",
   *   recipientId?: string, // Required for private chats
   *   content: string
   * }
   * 
   * Returns: { success: boolean; message?: ChatMessage; messageKey?: string }
   */
  .post(
    "/send",
    async ({ body, headers, set }) => {
      // Body is already validated by Elysia via SendMessageSchema in the route definition
      Report.debug("Send chat message request received", {
        route: "/chat/send",
        scope: body.scope,
        hasRecipient: !!body.recipientId,
      });

      try {
        // 1. Validate session
        const authHeader = headers.authorization;
        const token = authHeader?.split(" ")[1];

        if (!token) {
          set.status = 401;
          return { success: false, messageKey: "auth.noToken" };
        }

        const user = await SessionService.validateSession(token);
        if (!user) {
          set.status = 401;
          return { success: false, messageKey: "auth.invalidSession" };
        }

        // 2. Get sender character
        const sender = characterManager.getUserCharacterByUserId(user.id);
        if (!sender) {
          Report.warn("Character not found for user", { userId: user.id });
          set.status = 404;
          return { success: false, messageKey: "character.notFound" };
        }

        // 3. Body is already validated by Elysia schema, access directly
        const { scope, recipientId, content } = body;

        // 4. Validate scope-specific requirements
        if (scope === "private" && !recipientId) {
          set.status = 400;
          return { success: false, messageKey: "chat.recipientRequired" };
        }

        // 5. Check if recipient is NPC (for private chats)
        let isNPCChat = false;
        let recipient: any = null;

        if (scope === "private" && recipientId) {
          try {
            recipient = characterManager.getCharacterByID(recipientId);
            
            // Check if recipient is NPC: userId === null means it's an NPC
            isNPCChat = recipient.userId === null;

            Report.debug("Chat recipient check", {
              recipientId,
              recipientName: typeof recipient.name === 'string' ? recipient.name : recipient.name?.en,
              isNPC: isNPCChat,
              recipientUserId: recipient.userId,
            });
          } catch (error) {
            Report.warn("Recipient character not found", { 
              recipientId,
              error: error instanceof Error ? error.message : String(error),
            });
            set.status = 404;
            return { success: false, messageKey: "chat.recipientNotFound" };
          }
        }

        // 6. Handle NPC chat (LLM integration)
        if (isNPCChat && recipient) {
          Report.info("NPC chat detected - routing to LLM handler", {
            senderId: sender.id,
            recipientId: recipient.id,
            recipientName: typeof recipient.name === 'string' ? recipient.name : recipient.name?.en,
          });

          // Step 1: Get or create chat room and log player's message
          const roomId = await getOrCreateChatRoom(sender.id, recipient.id, true);
          await logPrivateMessage(roomId, sender.id, recipient.id, content);

          // Step 2: Get or create NPC-Character relation (for first meeting)
          await getOrCreateNPCRelation(recipient.id, sender.id);

          // Step 3: Build comprehensive prompt (includes history, player info, impression)
          const combinedPrompt = await buildNPCChatPrompt(recipient.id, sender, content);

          Report.debug("NPC chat prompt built", {
            npcId: recipient.id,
            promptLength: combinedPrompt.length,
          });

          // Step 4: Call LM Studio (async, don't wait)
          const npcName = typeof recipient.name === 'string' ? recipient.name : recipient.name?.en || "NPC";
          const lmRequest: LMStudioRequest = {
            prompt: combinedPrompt,
            npcId: recipient.id,
            npcName,
          };
          
          // Store roomId for use in callback
          const callbackRoomId = roomId;

          // Fire and forget - process NPC response asynchronously
          callLMStudio(lmRequest)
            .then(async (lmResponse) => {
              if (lmResponse.success) {
                // Step 5: Log NPC's response
                await logPrivateMessage(callbackRoomId, recipient.id, sender.id, lmResponse.response);

                // Step 6: Update NPC-Character relation (increment conversation count)
                await updateNPCRelation(recipient.id, sender.id, {
                  // Could update affection/closeness based on conversation tone, etc.
                  // For now, just track that conversation happened
                });

                // Step 7: Send WebSocket message to user when LM Studio responds
                const connection = connectionManager.getConnectionByUserId(user.id);
                
                if (connection) {
                  const npcResponseMessage = {
                    type: "CHAT_MESSAGE",
                    data: {
                      id: `chat-${Date.now()}`,
                      scope: "private",
                      senderId: recipient.id,
                      senderName: npcName,
                      senderPortrait: recipient.portrait,
                      content: lmResponse.response,
                      timestamp: new Date().toISOString(),
                      recipientId: sender.id,
                    },
                  };

                  try {
                    connection.ws.send(JSON.stringify(npcResponseMessage));
                    Report.info("NPC response sent via WebSocket", {
                      userId: user.id,
                      npcId: recipient.id,
                      responseLength: lmResponse.response.length,
                    });
                  } catch (error) {
                    Report.error("Failed to send NPC response via WebSocket", {
                      userId: user.id,
                      npcId: recipient.id,
                      error: error instanceof Error ? error.message : String(error),
                    });
                  }
                } else {
                  Report.warn("User not connected via WebSocket, cannot send NPC response", {
                    userId: user.id,
                    npcId: recipient.id,
                  });
                }
              } else {
                Report.error("LM Studio returned error", {
                  npcId: recipient.id,
                  error: lmResponse.error,
                });
              }
            })
            .catch((error) => {
              Report.error("LM Studio call failed", {
                npcId: recipient.id,
                error: error instanceof Error ? error.message : String(error),
              });
            });

          // Step 5: Return immediately (don't wait for LM Studio)
          return {
            success: true,
            message: {
              id: `chat-${Date.now()}`,
              scope: "private",
              senderId: sender.id,
              senderName: typeof sender.name === 'string' ? sender.name : sender.name?.en || "Player",
              senderPortrait: sender.portrait,
              content,
              timestamp: new Date(),
              recipientId: recipient.id,
            },
            isNPC: true,
            note: "NPC response will arrive via WebSocket",
          };
        }

        // 7. Handle player-to-player chat
        if (scope === "private" && recipient && !isNPCChat) {
          Report.info("Player-to-player chat", {
            senderId: sender.id,
            recipientId: recipient.id,
          });

          // TODO: Implement player-to-player messaging
          // - Store message in database
          // - Send via WebSocket if recipient is online
          // - Return message object

          return {
            success: true,
            message: {
              id: `chat-${Date.now()}`,
              scope: "private",
              senderId: sender.id,
              senderName: typeof sender.name === 'string' ? sender.name : sender.name?.en || "Player",
              senderPortrait: sender.portrait,
              content,
              timestamp: new Date(),
              recipientId: recipient.id,
            },
            isNPC: false,
          };
        }

        // 8. Handle public chats (global, region, location, party)
        Report.info("Public chat message", {
          senderId: sender.id,
          scope,
        });

        // Determine scopeId based on scope
        let scopeId: string | null = null;
        if (scope === "region" || scope === "location") {
          // Get from character's party location
          if (sender.partyID) {
            const { partyManager } = await import("../../Game/PartyManager");
            try {
              const party = partyManager.getPartyByID(sender.partyID);
              if (scope === "location") {
                scopeId = party.location;
              } else if (scope === "region") {
                // Get region from location
                const { locationManager } = await import("../../Entity/Location/Manager/LocationManager");
                const location = locationManager.locations[party.location];
                if (location) {
                  scopeId = location.region;
                }
              }
            } catch (error) {
              Report.warn("Could not determine scopeId for public chat", { error });
            }
          }
        } else if (scope === "party" && sender.partyID) {
          scopeId = sender.partyID;
        }
        // global scope has scopeId = null

        // Log public message (only for public scopes)
        if (scope !== "private") {
          await logPublicMessage(scope, scopeId, sender.id, content);
        }

        // TODO: Broadcast to all relevant players via WebSocket
        // For now, just return message object

        return {
          success: true,
          message: {
            id: `chat-${Date.now()}`,
            scope,
            senderId: sender.id,
            senderName: typeof sender.name === 'string' ? sender.name : sender.name?.en || "Player",
            senderPortrait: sender.portrait,
            content,
            timestamp: new Date(),
          },
          isNPC: false,
        };
      } catch (error) {
        Report.error("Send chat message error", {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        });
        set.status = 500;
        return { success: false, messageKey: "chat.sendFailed" };
      }
    },
    {
      body: SendMessageSchema,
    }
  );

