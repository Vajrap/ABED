import { Elysia, t } from "elysia";
import Report from "../../Utils/Reporter";
import { ChatFlowLogger } from "../../Utils/ChatFlowLogger";
import { SessionService } from "../../Services/SessionService";
import { characterManager } from "../../Game/CharacterManager";
import { buildNPCChatPrompt, getAvailableTools } from "../../Services/ChatPromptBuilder";
import { callLLM, type LLMRequest, type LLMToolCall } from "../../Services/LLMService";
import { connectionManager } from "../../Entity/Connection/connectionManager";
import { getOrCreateChatRoom, logPrivateMessage, logPublicMessage } from "../../Services/ChatLoggingService";
import { getOrCreateNPCRelation, updateNPCRelation, summarizeRelationshipImpression } from "../../Services/NPCCharacterRelationService";
import { shouldSummarizeConversation, summarizeConversationHistory } from "../../Services/ChatSummarizationService";
import { isThreateningMessage, requestBattleInitiation } from "../../Services/BattleInitiationService";
import { executeTool, type ToolContext, type ToolExecutionResult } from "../../Services/ToolExecutionService";
import { checkRateLimit } from "../../Services/ChatRateLimitService";

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
          const npcName = typeof recipient.name === 'string' ? recipient.name : recipient.name?.en || "NPC";
          const playerName = typeof sender.name === 'string' ? sender.name : sender.name?.en || "Player";
          
          // Initialize chat flow logger
          const flowLogger = new ChatFlowLogger({
            npcId: recipient.id,
            npcName,
            playerId: sender.id,
            playerName,
          });

          // Step 0: Check rate limit (per player, not per NPC-player pair)
          const rateLimitResult = await checkRateLimit(sender.id);
          if (!rateLimitResult.allowed) {
          const tierLabel = rateLimitResult.tier === "vip" || rateLimitResult.tier === "premium" ? "VIP" : "Free";
          const rateLimitMessage = `I need a moment to think. Let's continue this conversation later. (${tierLabel} tier: ${rateLimitResult.remaining}/${rateLimitResult.maxExchanges} exchanges remaining this phase, resets next phase)`;
            
            // Log rate limit message
            const roomId = await getOrCreateChatRoom(sender.id, recipient.id, true);
            await logPrivateMessage(roomId, recipient.id, sender.id, rateLimitMessage);
            
            // Send via WebSocket
            const connection = connectionManager.getConnectionByUserId(user.id);
            if (connection) {
              connection.ws.send(JSON.stringify({
                type: "CHAT_MESSAGE",
                data: {
                  id: `chat-${Date.now()}`,
                  scope: "private",
                  senderId: recipient.id,
                  senderName: npcName,
                  senderPortrait: recipient.portrait,
                  content: rateLimitMessage,
                  timestamp: new Date().toISOString(),
                  recipientId: sender.id,
                },
              }));
            }
            
            return {
              success: true,
              message: "Rate limit message sent",
            };
          }

          // Step 1: Log user message
          flowLogger.logUserMessage(content);

          // Step 2: Get or create chat room and log player's message
          const roomId = await getOrCreateChatRoom(sender.id, recipient.id, true);
          await logPrivateMessage(roomId, sender.id, recipient.id, content);

          // Step 3: Get or create NPC-Character relation (for first meeting)
          await getOrCreateNPCRelation(recipient.id, sender.id);

          // // Step 4: Check if message is threatening (before building prompt)
          // const isThreatening = isThreateningMessage(content);
          // let battleRequestId: string | null = null;
          // let battleId: string | null = null;

          // if (isThreatening) {
          //   // Request battle initiation and auto-start it
          //   const locationId = sender.location || recipient.location || "WaywardInn";
          //   const battleResult = await requestBattleInitiation(
          //     recipient.id,
          //     sender.id,
          //     `You have threatened me: "${content}"`,
          //     locationId,
          //     true // autoStart = true - immediately start battle without waiting for confirmation
          //   );
            
          //   if (battleResult) {
          //     battleRequestId = battleResult.requestId;
          //     battleId = battleResult.battleId || null;
          //   }
            
          //   Report.info("Threatening message detected, battle initiation requested", {
          //     npcId: recipient.id,
          //     npcName,
          //     playerId: sender.id,
          //     playerName,
          //     message: content,
          //     battleRequestId,
          //     battleId,
          //     locationId,
          //   });
          // }

          // Step 5: Build comprehensive prompt (includes history, player info, impression)
          const combinedPrompt = await buildNPCChatPrompt(recipient.id, sender, content);

          // Step 6: Get available tools for this NPC
          const availableTools = getAvailableTools(recipient.id);
          const toolNames = availableTools.map(t => t.function.name);

          // Step 7: Log prompt built
          flowLogger.logPromptBuilt(combinedPrompt, toolNames);

          // Step 8: Call LM Studio with tools (async, don't wait)
          const lmRequest: LLMRequest = {
            prompt: combinedPrompt,
            npcId: recipient.id,
            npcName,
            tools: availableTools.length > 0 ? availableTools : undefined,
          };
          
          // Store roomId for use in callback
          const callbackRoomId = roomId;

          // Fire and forget - process NPC response asynchronously
          callLLM(lmRequest)
            .then(async (lmResponse) => {
              if (lmResponse.success) {
                // Step 9: Log initial NPC response (if any)
                if (lmResponse.response && lmResponse.response.trim().length > 0) {
                  flowLogger.logNPCResponse(lmResponse.response);
                }

                // Step 10: Process tool calls if any
                let confirmationRequestId: string | null = null;
                let confirmationData: any = null;

                let finalResponse = lmResponse.response;
                let needsFollowUpCall = false;

                if (lmResponse.toolCalls && lmResponse.toolCalls.length > 0) {
                  // Execute each tool call and collect results
                  const toolResults: Array<{ toolCall: LLMToolCall; result: ToolExecutionResult }> = [];
                  
                  for (const toolCall of lmResponse.toolCalls) {
                    // Log tool call
                    flowLogger.logToolCall(toolCall.name, toolCall.arguments);

                    const toolContext: ToolContext = {
                      npcId: recipient.id,
                      playerId: sender.id,
                      userId: user.id,
                    };

                    const toolResult = await executeTool(toolCall, toolContext);
                    toolResults.push({ toolCall, result: toolResult });

                    // Log tool result
                    flowLogger.logToolResult(
                      toolCall.name,
                      toolResult.success,
                      toolResult.result,
                      toolResult.error
                    );

                    if (toolResult.success && toolResult.shouldSendConfirmation && toolResult.confirmationData) {
                      // Store confirmation request
                      confirmationRequestId = toolResult.confirmationData.requestId;
                      confirmationData = toolResult.confirmationData.data;

                      Report.info("Tool execution requires confirmation", {
                        npcId: recipient.id,
                        requestId: confirmationRequestId,
                        toolName: toolCall.name,
                      });
                    }
                  }

                  // If LLM didn't generate a response (only called tools), make follow-up call with tool results
                  if (!lmResponse.response || lmResponse.response.trim().length === 0) {
                    needsFollowUpCall = true;

                    // Build follow-up prompt with tool results
                    const toolResultsText = toolResults.map(({ toolCall, result }) => {
                      if (result.success && result.result) {
                        const resultData = result.result;
                        if (toolCall.name === "checkJoinParty") {
                          if (resultData.canJoin) {
                            return `Tool ${toolCall.name} result: I can join your party${resultData.requiresPayment ? ` for ${resultData.paymentAmount} gold` : ''}.`;
                          } else {
                            return `Tool ${toolCall.name} result: I cannot join your party right now. ${resultData.reason || 'Requirements not met.'} Missing requirements: ${resultData.missingRequirements?.join(', ') || 'None specified'}.`;
                          }
                        }
                        return `Tool ${toolCall.name} result: ${JSON.stringify(resultData)}`;
                      } else {
                        return `Tool ${toolCall.name} error: ${result.error || 'Unknown error'}`;
                      }
                    }).join('\n');

                    // Make follow-up call with tool results
                    const followUpPrompt = `${combinedPrompt}\n\nTool execution results:\n${toolResultsText}\n\nNow respond naturally to the player based on these tool results. If you cannot join their party, explain why in character (e.g., "I don't know you well enough yet" or "I need more trust before joining").`;
                    
                    // Log follow-up prompt
                    flowLogger.logFollowUpPrompt(
                      followUpPrompt,
                      toolResults.map(tr => ({
                        toolName: tr.toolCall.name,
                        result: tr.result,
                      }))
                    );
                    
                    const followUpRequest: LLMRequest = {
                      prompt: followUpPrompt,
                      npcId: recipient.id,
                      npcName,
                      // Don't include tools in follow-up - we already checked
                    };

                    const followUpResponse = await callLLM(followUpRequest);
                    if (followUpResponse.success && followUpResponse.response) {
                      finalResponse = followUpResponse.response;
                      flowLogger.logFollowUpResponse(finalResponse);
                    } else {
                      flowLogger.logError("Follow-up LLM call", followUpResponse.error || "Unknown error");
                      // Fallback: use tool result message
                      const firstResult = toolResults[0]?.result;
                      if (firstResult?.success && firstResult.result) {
                        finalResponse = firstResult.result.message || "I need to think about that...";
                      }
                    }
                  }
                }

                // Step 11: Log NPC's final response (use finalResponse which may include follow-up)
                if (finalResponse && finalResponse !== lmResponse.response) {
                  // Only log if it's different from initial response (i.e., it's a follow-up)
                  flowLogger.logNPCResponse(finalResponse);
                }
                await logPrivateMessage(callbackRoomId, recipient.id, sender.id, finalResponse);

                // Step 9: Get current relation to check conversation count
                // Note: Impression updates are now handled by AI via updateImpression tool (slow, sparingly)
                const relation = await getOrCreateNPCRelation(recipient.id, sender.id);
                const currentCount = relation.conversationCount;

                // Step 11: Update NPC-Character relation (increment conversation count)
                await updateNPCRelation(recipient.id, sender.id, {
                  // Impression already updated above
                });

                // Step 12: Check if conversation summarization is needed
                const needsSummarization = await shouldSummarizeConversation(recipient.id, sender.id);
                if (needsSummarization) {
                  await summarizeConversationHistory(recipient.id, sender.id);
                }

                // Step 13: Periodically summarize relationship (every 5 conversations)
                // Check after increment (currentCount + 1)
                if ((currentCount + 1) % 5 === 0) {
                  await summarizeRelationshipImpression(recipient.id, sender.id);
                }

                // Step 14: Send WebSocket message to user when LM Studio responds
                const connection = connectionManager.getConnectionByUserId(user.id);
                const npcResponseName = typeof recipient.name === 'string' ? recipient.name : recipient.name?.en || "NPC";
                
                if (connection) {
                  const npcResponseMessage: any = {
                    type: "CHAT_MESSAGE",
                    data: {
                      id: `chat-${Date.now()}`,
                      scope: "private",
                      senderId: recipient.id,
                      senderName: npcName,
                      senderPortrait: recipient.portrait,
                      content: finalResponse,
                      timestamp: new Date().toISOString(),
                      recipientId: sender.id,
                    },
                  };

                  // Add confirmation request if tool execution requires it
                  if (confirmationRequestId && confirmationData) {
                    npcResponseMessage.confirmation = {
                      type: confirmationData.type,
                      requestId: confirmationRequestId,
                      ...confirmationData,
                    };
                  }

                  // Add battle request if applicable
                  // if (battleRequestId) {
                  //   npcResponseMessage.battleRequest = {
                  //     requestId: battleRequestId,
                  //     ...(battleId && { battleId }), // Include battleId if battle was auto-started
                  //   };
                  // }

                  try {
                    Report.info("Sending NPC chat response via WebSocket", {
                      userId: user.id,
                      npcId: recipient.id,
                      npcName: typeof recipient.name === 'string' ? recipient.name : recipient.name?.en,
                      messageLength: finalResponse ? finalResponse.length : 0,
                      hasConfirmation: !!confirmationRequestId,
                      // hasBattleRequest: !!battleRequestId,
                      confirmationType: confirmationData?.type,
                    });
                    connection.ws.send(JSON.stringify(npcResponseMessage));
                    Report.debug("NPC response sent successfully via WebSocket", {
                      userId: user.id,
                      npcId: recipient.id,
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
                flowLogger.logError("LM Studio call", lmResponse.error || "Unknown error");
              }
            })
            .catch((error) => {
              flowLogger.logError("LM Studio processing", error instanceof Error ? error.message : String(error));
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

