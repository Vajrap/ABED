/**
 * LM Studio Service
 * 
 * Handles communication with LM Studio API for NPC chat responses.
 * Uses OpenAI-compatible API format.
 */

import Report from "../Utils/Reporter";

export interface LMStudioRequest {
  prompt: string; // Combined prompt: NPC prompt + memory + user message
  npcId: string;
  npcName: string;
}

export interface LMStudioResponse {
  success: boolean;
  response: string; // NPC's response text
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
    const systemMessage = `You are ${request.npcName}, a character in this world. Respond naturally and in character based on the context provided. Keep responses concise and engaging.`;
    
    const response = await fetch(`${LM_STUDIO_BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
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
    const npcResponse = data.choices[0]?.message?.content?.trim() || "";

    if (!npcResponse) {
      Report.warn("LM Studio returned empty response", {
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
    });

    return {
      success: true,
      response: npcResponse,
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

