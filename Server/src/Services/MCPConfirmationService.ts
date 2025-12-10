/**
 * MCP Confirmation Service
 * 
 * Handles MCP (Model Context Protocol) integration for user confirmations,
 * particularly for payment confirmations when hiring NPCs.
 */

import { randomUUID } from "crypto";
import Report from "../Utils/Reporter";

export interface MCPConfirmationRequest {
  requestId: string;
  type: "PAYMENT_CONFIRMATION";
  userId: string;
  npcId: string;
  npcName: string;
  amount: number;
  currency: string;
  description: string;
  callbackUrl?: string;
  metadata?: Record<string, any>;
}

export interface MCPConfirmationResponse {
  requestId: string;
  confirmed: boolean;
  paymentData?: {
    amount: number;
    currency: string;
    transactionId?: string;
  };
  userResponse?: string;
  error?: string;
}

// In-memory store for pending confirmations
// In production, this could be Redis or a database
const pendingConfirmations = new Map<string, MCPConfirmationRequest>();

/**
 * Request payment confirmation via MCP
 * This will trigger an MCP call that shows a popup to the user
 */
export async function requestPaymentConfirmation(
  userId: string,
  npcId: string,
  npcName: string,
  amount: number,
  description: string,
  metadata?: Record<string, any>
): Promise<string> {
  const requestId = randomUUID();

  const request: MCPConfirmationRequest = {
    requestId,
    type: "PAYMENT_CONFIRMATION",
    userId,
    npcId,
    npcName,
    amount,
    currency: "gold",
    description,
    metadata,
  };

  // Store pending confirmation
  pendingConfirmations.set(requestId, request);

  // NOTE: This service does NOT make actual MCP calls - it just stores the request.
  // The frontend receives the requestId via WebSocket and can:
  // 1. Show a regular UI confirmation dialog, OR
  // 2. Use MCP client-side to show a dialog (if you have MCP set up on frontend)
  // Then the frontend calls POST /api/party/confirm-hire with the requestId and confirmed status

  Report.info("Payment confirmation request created (frontend will handle dialog)", {
    requestId,
    userId,
    npcId,
    npcName,
    amount,
  });

  return requestId;
}

/**
 * Handle MCP response
 * Called when user confirms or rejects the payment
 */
export async function handleMCPResponse(
  requestId: string,
  confirmed: boolean,
  paymentData?: {
    amount: number;
    currency: string;
    transactionId?: string;
  },
  userResponse?: string
): Promise<MCPConfirmationResponse | null> {
  const request = pendingConfirmations.get(requestId);
  if (!request) {
    Report.warn("MCP confirmation request not found", { requestId });
    return null;
  }

  // Remove from pending
  pendingConfirmations.delete(requestId);

  const response: MCPConfirmationResponse = {
    requestId,
    confirmed,
    paymentData,
    userResponse,
  };

  Report.info("MCP confirmation response received", {
    requestId,
    confirmed,
    amount: paymentData?.amount,
  });

  return response;
}

/**
 * Get pending confirmation by request ID
 */
export function getPendingConfirmation(requestId: string): MCPConfirmationRequest | null {
  return pendingConfirmations.get(requestId) || null;
}

/**
 * Clean up old pending confirmations (older than 1 hour)
 * Should be called periodically
 */
export function cleanupOldConfirmations(): void {
  // For now, we'll keep all confirmations
  // In production, add timestamp to requests and remove old ones
  const now = Date.now();
  // TODO: Implement cleanup logic when we add timestamps
}

