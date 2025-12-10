import { Elysia, t } from "elysia";
import Report from "../../Utils/Reporter";
import { SessionService } from "../../Services/SessionService";
import { handleBattleConfirmation } from "../../Services/BattleInitiationService";

export const battleRoutes = new Elysia({ prefix: "/battle" })
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      Report.warn("Battle route validation error", {
        error: error.message,
        code,
      });
      set.status = 400;
      return { success: false, messageKey: "battle.validationError" };
    }
    throw error;
  })
  /**
   * POST /api/battle/confirm
   * Confirm battle initiation after MCP confirmation
   * 
   * Body: { requestId: string; confirmed: boolean }
   * Returns: { success: boolean; battleId?: string; error?: string }
   */
  .post(
    "/confirm",
    async ({ body, headers, set }) => {
      Report.debug("Battle confirmation request received", {
        route: "/battle/confirm",
        requestId: body.requestId,
        confirmed: body.confirmed,
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

        // 2. Handle battle confirmation
        const result = await handleBattleConfirmation(body.requestId, body.confirmed);

        if (!result) {
          set.status = 404;
          return { success: false, messageKey: "battle.requestNotFound" };
        }

        if (!result.confirmed) {
          return {
            success: true,
            confirmed: false,
            message: "Battle was declined",
          };
        }

        return {
          success: true,
          confirmed: true,
          battleId: result.battleId,
          message: "Battle has begun!",
        };
      } catch (error) {
        Report.error("Battle confirmation error", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, messageKey: "battle.confirmFailed" };
      }
    },
    {
      body: t.Object({
        requestId: t.String(),
        confirmed: t.Boolean(),
      }),
    }
  );

