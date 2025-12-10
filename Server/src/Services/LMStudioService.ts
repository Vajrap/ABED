/**
 * LM Studio Service
 * 
 * Handles communication with LM Studio API for NPC chat responses.
 * Uses OpenAI-compatible API format.
 */

import Report from "../Utils/Reporter";

export interface LMStudioTool {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: {
      type: "object";
      properties: Record<string, any>;
      required?: string[];
    };
  };
}

export interface LMStudioRequest {
  prompt: string; // Combined prompt: NPC prompt + memory + user message
  npcId: string;
  npcName: string;
  tools?: LMStudioTool[]; // Optional tools for tool calling
}

export interface LMStudioToolCall {
  id: string;
  name: string;
  arguments: Record<string, any>;
}

export interface LMStudioResponse {
  success: boolean;
  response: string; // NPC's response text
  toolCalls?: LMStudioToolCall[]; // Tool calls if LLM decided to use tools
  error?: string;
}

// LM Studio API configuration
const LM_STUDIO_BASE_URL = process.env.LM_STUDIO_URL || "http://192.168.1.122:1234";
const LM_STUDIO_MODEL = process.env.LM_STUDIO_MODEL || "local-model"; // Model name, can be configured
const LM_STUDIO_TIMEOUT = 30000; // 30 seconds timeout

interface LMStudioAPIResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
  error?: {
    message: string;
  };
}

/**
 * Call LM Studio API using OpenAI-compatible format
 * 
 * @param request - The LM Studio request with prompt and NPC info
 * @returns LM Studio response with NPC's reply
 */
export async function callLMStudio(
  request: LMStudioRequest
): Promise<LMStudioResponse> {
  Report.debug("LM Studio API call", {
    npcId: request.npcId,
    npcName: request.npcName,
    promptLength: request.prompt.length,
    url: `${LM_STUDIO_BASE_URL}/v1/chat/completions`,
  });

  try {
    // Split prompt into system and user messages
    // The prompt format is: "NPC Character: ...\n\nRecent news...\n\nPlayer says: ...\n\nRespond naturally..."
    // We'll use the entire prompt as the user message, and add a system message for context
    let systemMessage = `You are ${request.npcName}, a character in this world. 

CRITICAL: Stay in character at all times. Your character has boundaries, values, and the right to refuse inappropriate requests. If someone makes threats, sexual advances, or disrespects you, respond assertively and in character. Do NOT be overly accommodating to inappropriate behavior - maintain your character's dignity and boundaries.

Respond naturally and in character based on the context provided. Keep responses concise and engaging (2-4 sentences).`;

    // Add tool calling instructions if tools are available
    if (request.tools && request.tools.length > 0) {
      systemMessage += `\n\nIMPORTANT: You have access to tools/actions. When the player asks you to join their party, go on an adventure together, or requests you to be part of their group, you MUST call the checkJoinParty tool BEFORE responding. Do not just agree or decline - use the tool to check the requirements first.`;
    }
    
    const requestBody: any = {
      model: LM_STUDIO_MODEL,
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content: request.prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
      stream: false,
    };

    // Add tools if provided
    if (request.tools && request.tools.length > 0) {
      requestBody.tools = request.tools;
      requestBody.tool_choice = "auto"; // Let LLM decide when to use tools
      
      Report.debug("Tools included in LM Studio request", {
        npcId: request.npcId,
        toolCount: request.tools.length,
        toolNames: request.tools.map(t => t.function.name),
      });
    }

    const response = await fetch(`${LM_STUDIO_BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(LM_STUDIO_TIMEOUT),
    });

    if (!response.ok) {
      const errorText = await response.text();
      Report.error("LM Studio API error response", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      return {
        success: false,
        response: "",
        error: `LM Studio API error: ${response.status} ${response.statusText}`,
      };
    }

    const data = (await response.json()) as LMStudioAPIResponse;

    // Check for API-level errors
    if (data.error) {
      Report.error("LM Studio API returned error", {
        error: data.error.message,
      });
      return {
        success: false,
        response: "",
        error: data.error.message,
      };
    }

    // Extract response content
    const message = data.choices[0]?.message;
    const npcResponse = (message?.content || "").trim();
    const toolCalls = (message as any)?.tool_calls;

    // Parse tool calls if present
    let parsedToolCalls: LMStudioToolCall[] | undefined;
    if (toolCalls && toolCalls.length > 0) {
      parsedToolCalls = toolCalls.map((tc: {
        id: string;
        type: string;
        function: {
          name: string;
          arguments: string;
        };
      }) => ({
        id: tc.id,
        name: tc.function.name,
        arguments: JSON.parse(tc.function.arguments),
      }));

      if (parsedToolCalls) {
        Report.info("LM Studio returned tool calls", {
          npcId: request.npcId,
          toolCallCount: parsedToolCalls.length,
          toolNames: parsedToolCalls.map((tc) => tc.name),
        });
      }
    }

    // If no content and no tool calls, that's an error
    if (!npcResponse && (!parsedToolCalls || parsedToolCalls.length === 0)) {
      Report.warn("LM Studio returned empty response and no tool calls", {
        npcId: request.npcId,
        data,
      });
      return {
        success: false,
        response: "",
        error: "Empty response from LM Studio",
      };
    }

    Report.info("LM Studio API call successful", {
      npcId: request.npcId,
      responseLength: npcResponse.length,
      hasToolCalls: !!parsedToolCalls && parsedToolCalls.length > 0,
      toolCallCount: parsedToolCalls?.length || 0,
      toolsProvided: request.tools?.length || 0,
      toolNames: request.tools?.map(t => t.function.name) || [],
    });
    
    // Warn if tools were provided but not used
    if (request.tools && request.tools.length > 0 && (!parsedToolCalls || parsedToolCalls.length === 0)) {
      Report.warn("Tools were provided but LLM did not call any", {
        npcId: request.npcId,
        toolsProvided: request.tools.length,
        toolNames: request.tools.map(t => t.function.name),
        responsePreview: npcResponse.substring(0, 100),
      });
    }

    return {
      success: true,
      response: npcResponse,
      toolCalls: parsedToolCalls,
    };
  } catch (error) {
    Report.error("LM Studio call failed", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      npcId: request.npcId,
    });
    return {
      success: false,
      response: "",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

