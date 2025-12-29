// Admin service for admin-only operations
import { restHandler } from './RestHandler';

export interface NextPhaseResponse {
  success: boolean;
  message?: string;
  error?: string;
}

class AdminService {
  /**
   * Force the game loop to process the next phase immediately
   * Requires user to have ADMIN tier (checked on backend)
   */
  async triggerNextPhase(): Promise<NextPhaseResponse> {
    try {
      const response = await restHandler.post<null, NextPhaseResponse>(
        "/api/admin/next-phase",
        null,
        true // requireAuth - uses session token
      );
      return response;
    } catch (error) {
      console.error("Trigger next phase error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "admin.triggerNextPhaseFailed",
      };
    }
  }
}

// Export singleton instance
export const adminService = new AdminService();
export default adminService;

