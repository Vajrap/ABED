// Authentication service for ABED webapp
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email?: string;
  password: string;
  lastNewsReceived?: string;
}

export interface AuthResponse {
  success: boolean;
  hasCharacter?: boolean; // Optional - only present on login
  token?: string;
  message?: string;
  messageKey?: string;
}

export interface ApiError {
  success: false;
  message: string;
  code?: string;
}

import { restHandler } from './RestHandler';

class AuthService {

  /**
   * Login user with email and password
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await restHandler.post<LoginRequest, AuthResponse & { error?: string }>("/api/login", credentials);
      // Log any error details from backend for debugging
      if (!response.success && (response as any).error) {
        console.error("Backend login error:", (response as any).error);
      }
      return response;
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        messageKey: error instanceof Error ? error.message : "Login failed",
        token: "",
      };
    }
  }

  /**
   * Register new user account
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    console.log("Registering user:", userData);
    try {
      const response = await restHandler.post<RegisterRequest, AuthResponse & { error?: string }>("/api/register", userData);
      // Log any error details from backend for debugging
      if (!response.success && (response as any).error) {
        console.error("Backend registration error:", (response as any).error);
      }
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        messageKey: error instanceof Error ? error.message : "Registration failed",
      };
    }
  }

  /**
   * Auto authentication (placeholder for JWT validation)
   */
  async autoAuth(): Promise<AuthResponse> {
    try {
      const response = await restHandler.post<null, AuthResponse>("/api/auth/auto", null);
      return response;
    } catch (error) {
      console.error("Auto auth error:", error);
      return {
        success: false,
        messageKey:
          error instanceof Error ? error.message : "Auto authentication failed",
      };
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<AuthResponse> {
    try {
      const response = await restHandler.post<null, AuthResponse>("/api/auth/logout", null);
      return response;
    } catch (error) {
      console.error("Logout error:", error);
      return {
        success: false,
        messageKey: error instanceof Error ? error.message : "Logout failed",
      };
    }
  }

  /**
   * Check if the API is reachable
   */
  async healthCheck(): Promise<boolean> {
    return await restHandler.healthCheck();
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
