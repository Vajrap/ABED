import { Elysia } from "elysia";

export const guestRoutes = new Elysia({ prefix: "/guest" })
  .post("/", async ({ body }) => {
    // TODO: Implement guest login logic
    return { success: false, messageKey: "guest.notImplemented" };
  });
