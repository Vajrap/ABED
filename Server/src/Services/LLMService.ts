/**
 * LM Studio Service
 * 
 * Handles communication with LM Studio API for NPC chat responses.
 * Uses OpenAI-compatible API format.
 */

import Report from "../Utils/Reporter";

export interface LLMTool {
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

export interface LLMRequest {
  prompt: string; // Combined prompt: NPC prompt + memory + user message
  npcId: string;
  npcName: string;
  tools?: LLMTool[]; // Optional tools for tool calling
}

export interface LLMToolCall {
  id: string;
  name: string;
  arguments: Record<string, any>;
}

export interface LLMResponse {
  success: boolean;
  response: string; // NPC's response text
  toolCalls?: LLMToolCall[]; // Tool calls if LLM decided to use tools
  error?: string;
}

// LLM API configuration
// For OpenAI API, use OPENAI_API_BASE_URL (e.g., https://api.openai.com), OPENAI_API_KEY, and OPENAI_API_MODEL (e.g., gpt-4, gpt-3.5-turbo)
// For LM Studio, use LM_STUDIO_URL (e.g., http://localhost:1234), LM_STUDIO_MODEL (e.g., local-model), and no API key needed
// Normalize base URL - remove any /v1/models or /v1/chat/completions suffixes
let rawBaseUrl = process.env.OPENAI_API_BASE_URL || process.env.LM_STUDIO_URL || "http://localhost:1234";
rawBaseUrl = rawBaseUrl.replace(/\/+$/, ""); // Remove trailing slashes
rawBaseUrl = rawBaseUrl.replace(/\/v1\/chat\/completions\/?$/, ""); // Remove /v1/chat/completions if present
rawBaseUrl = rawBaseUrl.replace(/\/v1\/models\/?$/, ""); // Remove /v1/models if present (common mistake)
rawBaseUrl = rawBaseUrl.replace(/\/v1\/?$/, ""); // Remove /v1 if present (we'll add it back in the URL construction)
const LLM_BASE_URL = rawBaseUrl;
const LLM_API_KEY = process.env.OPENAI_API_KEY || "";

// Determine if we're using OpenAI API or LM Studio based on the base URL
const isOpenAI = LLM_BASE_URL.includes("api.openai.com") || !!LLM_API_KEY;
// Set default model based on which service we're using
const LLM_MODEL = process.env.OPENAI_API_MODEL || process.env.LM_STUDIO_MODEL || (isOpenAI ? "gpt-3.5-turbo" : "local-model");
const LLM_TIMEOUT = 30000; // 30 seconds timeout

interface LLMAPIResponse {
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
 * Call LLM API (OpenAI or LM Studio) using OpenAI-compatible format
 * 
 * @param request - The LLM request with prompt and NPC info
 * @returns LLM response with NPC's reply
 */
export async function callLLM(
  request: LLMRequest
): Promise<LLMResponse> {
  const apiUrl = `${LLM_BASE_URL}/v1/chat/completions`;
  
  // Determine service name for logging
  const serviceName = (LLM_BASE_URL.includes("api.openai.com") || !!LLM_API_KEY) ? "OpenAI" : "LM Studio";
  
  Report.info(`${serviceName} API call starting`, {
    npcId: request.npcId,
    npcName: request.npcName,
    promptLength: request.prompt.length,
    url: apiUrl,
    baseUrl: LLM_BASE_URL,
    model: LLM_MODEL,
    service: serviceName,
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
      systemMessage += `\n\nIMPORTANT: You have access to tools/actions. Use them appropriately when needed.`;
    }
    
    const requestBody: any = {
      model: LLM_MODEL,
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
      
      Report.debug("Tools included in LLM request", {
        npcId: request.npcId,
        toolCount: request.tools.length,
        toolNames: request.tools.map(t => t.function.name),
      });
    }

    Report.debug(`Sending fetch request to ${serviceName}`, {
      url: apiUrl,
      method: "POST",
      bodySize: JSON.stringify(requestBody).length,
      hasTools: !!(request.tools && request.tools.length > 0),
    });
    
    // Build headers with API key if provided
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    
    if (LLM_API_KEY) {
      headers["Authorization"] = `Bearer ${LLM_API_KEY}`;
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(LLM_TIMEOUT),
    });
    
    Report.debug(`${serviceName} fetch response received`, {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    });

    if (!response.ok) {
      const errorText = await response.text();
      Report.error(`${serviceName} API error response`, {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      return {
        success: false,
        response: "",
        error: `${serviceName} API error: ${response.status} ${response.statusText}`,
      };
    }

    const data = (await response.json()) as LLMAPIResponse;

    // Check for API-level errors
    if (data.error) {
      Report.error(`${serviceName} API returned error`, {
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
    let parsedToolCalls: LLMToolCall[] | undefined;
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
        Report.info(`${serviceName} returned tool calls`, {
          npcId: request.npcId,
          toolCallCount: parsedToolCalls.length,
          toolNames: parsedToolCalls.map((tc) => tc.name),
        });
      }
    }

    // If no content and no tool calls, that's an error
    if (!npcResponse && (!parsedToolCalls || parsedToolCalls.length === 0)) {
      Report.warn(`${serviceName} returned empty response and no tool calls`, {
        npcId: request.npcId,
        data,
      });
      return {
        success: false,
        response: "",
        error: `Empty response from ${serviceName}`,
      };
    }

    Report.info(`${serviceName} API call successful`, {
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
    const errorMessage = error instanceof Error ? error.message : String(error);
    const isNetworkError = errorMessage.includes("fetch") || 
                          errorMessage.includes("network") ||
                          errorMessage.includes("ECONNREFUSED") ||
                          errorMessage.includes("ENOTFOUND") ||
                          errorMessage.includes("timeout");
    
    Report.error(`${serviceName} call failed`, {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      npcId: request.npcId,
      npcName: request.npcName,
      url: apiUrl,
      baseUrl: LLM_BASE_URL,
      isNetworkError,
      errorType: error?.constructor?.name,
      hint: isNetworkError 
        ? (serviceName === "OpenAI"
          ? "Check your OpenAI API key and network connectivity." 
          : "Check if LM Studio is running and accessible. If running in Docker, you may need to use 'host.docker.internal' instead of local IP.")
        : undefined,
    });
    return {
      success: false,
      response: "",
      error: errorMessage,
    };
  }
}