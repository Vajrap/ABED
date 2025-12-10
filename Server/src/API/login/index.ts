import { Elysia, t } from "elysia";
import Report from "../../Utils/Reporter";
import { UserService, UserLoginSchema } from "../../Entity/User/index";
import { SessionService } from "../../Services/SessionService";
import { CharacterService } from "../../Services/CharacterService";

// Login request schema for Elysia (matches UserLoginSchema)
const LoginSchema = t.Object({
  username: t.String({ minLength: 1 }),
  password: t.String({ minLength: 1 }),
});

export const loginRoutes = new Elysia({ prefix: "/login" })
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      Report.warn("Login validation error", {
        error: error.message,
        code,
      });
      set.status = 400;
      return { success: false, messageKey: "loginPage.loginError" };
    }
    throw error; // Re-throw other errors to be handled by global handler
  })
  .post(
    "/",
    async ({ body, headers, set }) => {
      Report.debug("Login request received", {
        route: "/login",
        body: body,
      });

      try {
        // Body is already validated by Elysia schema, but we can still validate with Zod for additional checks
        const validationResult = UserLoginSchema.safeParse(body);
        if (!validationResult.success) {
          Report.warn("Login payload failed validation", {
            route: "/login",
            errors: validationResult.error.issues,
            body: body,
          });
          set.status = 400;
          return { success: false, messageKey: "loginPage.loginError" };
        }

        const { username, password } = validationResult.data;

        const user = await UserService.getUserByUsername(username);
        if (!user) {
          Report.warn("Login attempt for unknown user", {
            username,
          });
          set.status = 200; // Return 200 with success: false (matches original Express behavior)
          return { success: false, messageKey: "loginPage.userNotFound" };
        }

        // TODO: Add password verification (bcrypt)
        if (user.password !== password) {
          Report.warn("Login attempt with invalid credentials", {
            userId: user.id,
            username: user.username,
          });
          set.status = 200; // Return 200 with success: false (matches original Express behavior)
          return {
            success: false,
            messageKey: "loginPage.invalidCredentials",
          };
        }

        // Extract client information for session tracking
        const userAgent = headers["user-agent"] || "Unknown";
        const ipAddress =
          headers["x-forwarded-for"] ||
          headers["x-real-ip"] ||
          "Unknown";

        // Create new session (this will invalidate other sessions)
        const { session, token } = await SessionService.createSession(
          user.id,
          userAgent as string,
          ipAddress as string,
        );

        // Check if user has a character (don't send character data, just a flag)
        const character = await CharacterService.getUserCharacter(user.id);
        const hasCharacter = character !== null;

        set.status = 200;
        return {
          success: true,
          hasCharacter, // Boolean flag - FE will fetch character data on game page if needed
          token,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        const errorStack = error instanceof Error ? error.stack : undefined;
        Report.error("Login error", {
          error: errorMessage,
          stack: errorStack,
          username: body?.username || "unknown",
          body: body,
          fullError: error,
        });
        set.status = 500;
        return {
          success: false,
          messageKey: "loginPage.networkError",
          error: errorMessage, // Include error for debugging (remove in production)
        };
      }
    },
    {
      body: LoginSchema,
    }
  );
