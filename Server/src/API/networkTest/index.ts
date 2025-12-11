import { Elysia } from "elysia";
import Report from "../../Utils/Reporter";

export const networkTestRoutes = new Elysia({ prefix: "/network-test" })
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      Report.warn("Network test validation error", {
        error: error.message,
        code,
      });
      set.status = 400;
      return { success: false, message: "Validation error" };
    }
    throw error;
  })
  /**
   * GET /api/network-test
   * Simple network connectivity test endpoint
   */
  .get("/", async ({ set }) => {
    Report.debug("Network test route hit", {
      route: "/network-test",
    });
    Report.info("Network test successful");
    return { success: true, message: "Network test successful" };
  });
