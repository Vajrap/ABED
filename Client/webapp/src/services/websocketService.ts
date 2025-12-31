/**
 * WebSocket Service
 * 
 * Manages WebSocket connection for real-time communication with the backend.
 * Handles connection lifecycle, reconnection, and message routing.
 */

export type WebSocketMessage = {
  type: string;
  data: any;
};

export type MessageHandler = (message: WebSocketMessage) => void;

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 1000; // Start with 1 second
  private maxReconnectDelay = 30000; // Max 30 seconds
  private reconnectTimeoutId: NodeJS.Timeout | null = null;
  private messageHandlers: Map<string, MessageHandler[]> = new Map();
  private connectionState: "disconnected" | "connecting" | "connected" = "disconnected";
  private apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7890";

  /**
   * Get current connection state
   */
  getState(): "disconnected" | "connecting" | "connected" {
    return this.connectionState;
  }

  /**
   * Check if WebSocket is connected
   */
  isConnected(): boolean {
    return this.connectionState === "connected" && this.ws?.readyState === WebSocket.OPEN;
  }

  /**
   * Connect to WebSocket server
   */
  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN || this.connectionState === "connecting") {
      console.log("WebSocket already connected or connecting");
      return;
    }

    const token = localStorage.getItem("sessionToken");
    if (!token) {
      console.warn("No session token found, cannot connect WebSocket");
      return;
    }

    this.connectionState = "connecting";
    // Convert http:// to ws:// for WebSocket URL
    const wsBaseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:7890").replace(/^http/, "ws");
    const wsUrl = `${wsBaseUrl}/ws?token=${encodeURIComponent(token)}`;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log("WebSocket connected");
        this.connectionState = "connected";
        this.reconnectAttempts = 0;
        this.reconnectDelay = 1000; // Reset delay on successful connection
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error, event.data);
        }
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      this.ws.onclose = (event) => {
        console.log("WebSocket closed", { code: event.code, reason: event.reason });
        this.connectionState = "disconnected";
        this.ws = null;

        // Attempt to reconnect if not a normal closure
        if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.scheduleReconnect();
        }
      };
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
      this.connectionState = "disconnected";
      this.scheduleReconnect();
    }
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect(): void {
    if (this.reconnectTimeoutId) {
      clearTimeout(this.reconnectTimeoutId);
      this.reconnectTimeoutId = null;
    }

    if (this.ws) {
      this.ws.close(1000, "Client disconnect");
      this.ws = null;
    }

    this.connectionState = "disconnected";
    this.reconnectAttempts = 0;
  }

  /**
   * Send a message through WebSocket
   */
  send(message: any): void {
    if (!this.isConnected()) {
      console.warn("Cannot send message: WebSocket not connected");
      return;
    }

    try {
      this.ws!.send(JSON.stringify(message));
    } catch (error) {
      console.error("Failed to send WebSocket message:", error);
    }
  }

  /**
   * Register a message handler for a specific message type
   */
  onMessage(type: string, handler: MessageHandler): () => void {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, []);
    }
    this.messageHandlers.get(type)!.push(handler);

    // Return unsubscribe function
    return () => {
      const handlers = this.messageHandlers.get(type);
      if (handlers) {
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      }
    };
  }

  /**
   * Handle incoming message and route to appropriate handlers
   */
  private handleMessage(message: WebSocketMessage): void {
    const handlers = this.messageHandlers.get(message.type);
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(message);
        } catch (error) {
          console.error("Error in message handler for type %s:", message.type, error);
        }
      });
    } else {
      console.debug(`No handlers registered for message type: ${message.type}`);
    }
  }

  /**
   * Schedule reconnection with exponential backoff
   */
  private scheduleReconnect(): void {
    if (this.reconnectTimeoutId) {
      return; // Already scheduled
    }

    this.reconnectAttempts++;
    const delay = Math.min(
      this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1),
      this.maxReconnectDelay
    );

    console.log(`Scheduling WebSocket reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);

    this.reconnectTimeoutId = setTimeout(() => {
      this.reconnectTimeoutId = null;
      this.connect();
    }, delay);
  }
}

// Export singleton instance
export const websocketService = new WebSocketService();
export default websocketService;

