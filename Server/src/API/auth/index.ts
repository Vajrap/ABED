import { Elysia } from "elysia";
import Report from "../../Utils/Reporter";
import { SessionService } from "../../Services/SessionService";
import { CharacterService } from "../../Services/CharacterService";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      Report.warn("Auth validation error", {
        error: error.message,
        code,
      });
      set.status = 400;
      return { success: false, messageKey: "auth.validationError" };
    }
    // Log and handle other errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    Report.error("Auth route error", {
      code,
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });
    set.status = 500;
    return { success: false, messageKey: "auth.routeError" };
  })
  /**
   * POST /api/auth/auto - Auto authentication (uses Authorization header)
   */
  .post("/auto", async ({ headers, set }) => {
  Report.debug("Auth auto route hit", {
    route: "/auth/auto",
  });
  try {
      const authHeader = headers.authorization;
      if (!authHeader) {
        return { success: false, messageKey: "auth.noToken" };
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return { success: false, messageKey: "auth.noToken" };
      }

    // Validate the session token
    const user = await SessionService.validateSession(token);

    if (!user) {
        return { success: false, messageKey: "auth.invalidSession" };
    }

    Report.info(`Auto auth successful for user ${user.username || user.id}`);
    
      return {
      success: true,
      user: {
        id: user.id,
        email: user.email || undefined,
        username: user.username,
        tier: user.tier
      }
      };
  } catch (error) {
    Report.error(`Auto auth error: ${error}`);
      return { success: false, messageKey: "auth.autoAuthFailed" };
  }
  })
  /**
   * POST /api/auth/logout - Logout user
   */
  .post("/logout", async ({ body, headers, set }) => {
  Report.debug("Auth logout route hit", {
    route: "/auth/logout",
  });
  try {
      const { token } = body as { token?: string };

    if (token) {
      // Invalidate the session
      const success = await SessionService.invalidateSession(token);
      
      if (success) {
        Report.info("User session invalidated successfully");
      } else {
        Report.warn("Session invalidate failed - token may not exist");
      }
    }

      return { success: true };
  } catch (error) {
    Report.error(`Logout error: ${error}`);
      return { success: false, messageKey: "auth.logoutFailed" };
    }
  })
  /**
   * POST /api/auth/check-character - Check if the authenticated user has a character
   * Note: Uses POST instead of GET to allow Authorization header (more secure than query params)
   */
  .post("/check-character", async ({ headers, set, request }) => {
    try {
      Report.debug("Check character route hit", {
        route: "/auth/check-character",
        hasAuthHeader: !!headers.authorization,
      });

      const authHeader = headers.authorization;
      if (!authHeader) {
        Report.warn("Check character: No authorization header");
        set.status = 401;
        return { success: false, hasCharacter: false, messageKey: "auth.noToken" };
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        Report.warn("Check character: No token in authorization header");
        set.status = 401;
        return { success: false, hasCharacter: false, messageKey: "auth.noToken" };
      }

      // Validate the session token
      const user = await SessionService.validateSession(token);

      if (!user) {
        Report.warn("Check character: Invalid session token");
        set.status = 401;
        return { success: false, hasCharacter: false, messageKey: "auth.invalidSession" };
      }

      // Check if user has a character
      Report.debug("Check character: Checking for character", { userId: user.id });
      let character;
      try {
        character = await CharacterService.getUserCharacter(user.id);
      } catch (dbError) {
        Report.error("Database error checking character", {
          userId: user.id,
          error: dbError instanceof Error ? dbError.message : String(dbError),
          stack: dbError instanceof Error ? dbError.stack : undefined,
        });
        // If DB query fails, assume no character to be safe
        character = null;
      }
      const hasCharacter = character !== null;

      Report.debug("Check character result", {
        userId: user.id,
        hasCharacter,
      });

      return {
        success: true,
        hasCharacter,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      Report.error("Check character error", {
        error: errorMessage,
        stack: errorStack,
        fullError: error,
      });
      set.status = 500;
      return { success: false, hasCharacter: false, messageKey: "auth.checkCharacterFailed" };
    }
  });
