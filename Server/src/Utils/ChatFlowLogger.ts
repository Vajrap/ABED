/**
 * Chat Flow Logger
 * 
 * Provides structured, easy-to-read logging for NPC chat interactions.
 * Makes it easy to follow the conversation flow:
 * 1. User message
 * 2. Prompt built
 * 3. NPC response
 * 4. Tools called
 * 5. Tool results
 * 6. Follow-up prompts (if any)
 */

import Report from "./Reporter";

interface ChatFlowContext {
  npcId: string;
  npcName: string;
  playerId: string;
  playerName: string;
}

export class ChatFlowLogger {
  private context: ChatFlowContext;
  private conversationId: string;

  constructor(context: ChatFlowContext) {
    this.context = context;
    this.conversationId = `${context.npcId.slice(0, 8)}-${context.playerId.slice(0, 8)}`;
  }

  /**
   * Log user message
   */
  logUserMessage(message: string): void {
    Report.info("💬 [CHAT FLOW] User Message", {
      conversationId: this.conversationId,
      npc: this.context.npcName,
      player: this.context.playerName,
      message,
      separator: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    });
  }

  /**
   * Log the prompt that will be sent to NPC
   */
  logPromptBuilt(prompt: string, toolNames: string[] = []): void {
    const toolsInfo = toolNames.length > 0 
      ? `\n  📦 Available Tools: ${toolNames.join(", ")}`
      : "\n  📦 No tools available";
    
    Report.info("📝 [CHAT FLOW] Prompt Built", {
      conversationId: this.conversationId,
      npc: this.context.npcName,
      promptLength: prompt.length,
      toolsInfo,
      promptPreview: prompt.substring(0, 200) + (prompt.length > 200 ? "..." : ""),
      fullPrompt: prompt, // Include full prompt for debugging
      separator: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    });
  }

  /**
   * Log NPC response
   */
  logNPCResponse(response: string): void {
    Report.info("🤖 [CHAT FLOW] NPC Response", {
      conversationId: this.conversationId,
      npc: this.context.npcName,
      response,
      separator: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    });
  }

  /**
   * Log tool call
   */
  logToolCall(toolName: string, toolArguments: any): void {
    Report.info("🔧 [CHAT FLOW] Tool Called", {
      conversationId: this.conversationId,
      npc: this.context.npcName,
      toolName,
      arguments: JSON.stringify(toolArguments, null, 2),
      separator: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    });
  }

  /**
   * Log tool result
   */
  logToolResult(toolName: string, success: boolean, result: any, error?: string): void {
    Report.info("✅ [CHAT FLOW] Tool Result", {
      conversationId: this.conversationId,
      npc: this.context.npcName,
      toolName,
      success,
      result: success ? JSON.stringify(result, null, 2) : undefined,
      error: !success ? error : undefined,
      separator: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    });
  }

  /**
   * Log follow-up prompt (when tools were called and we need a new response)
   */
  logFollowUpPrompt(prompt: string, toolResults: Array<{ toolName: string; result: any }>): void {
    const resultsSummary = toolResults.map(tr => 
      `  • ${tr.toolName}: ${tr.result.success ? "✅" : "❌"} ${tr.result.error || "Success"}`
    ).join("\n");

    Report.info("🔄 [CHAT FLOW] Follow-Up Prompt", {
      conversationId: this.conversationId,
      npc: this.context.npcName,
      promptLength: prompt.length,
      toolResultsSummary: resultsSummary,
      promptPreview: prompt.substring(0, 200) + (prompt.length > 200 ? "..." : ""),
      fullPrompt: prompt, // Include full prompt for debugging
      separator: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    });
  }

  /**
   * Log follow-up response
   */
  logFollowUpResponse(response: string): void {
    Report.info("🤖 [CHAT FLOW] Follow-Up Response", {
      conversationId: this.conversationId,
      npc: this.context.npcName,
      response,
      separator: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    });
  }

  /**
   * Log error in chat flow
   */
  logError(stage: string, error: string): void {
    Report.error("❌ [CHAT FLOW] Error", {
      conversationId: this.conversationId,
      npc: this.context.npcName,
      stage,
      error,
      separator: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    });
  }
}

