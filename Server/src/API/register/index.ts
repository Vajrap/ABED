import { Elysia, t } from "elysia";
import Report from "../../Utils/Reporter";
import { UserService, CreateUserSchema } from "../../Entity/User/index";

// Register request schema for Elysia (matches CreateUserSchema)
const RegisterSchema = t.Object({
  username: t.String({ minLength: 1 }),
  password: t.String({ minLength: 1 }),
  email: t.Optional(t.String()),
  lastNewsReceived: t.Optional(t.String()),
});

export const registerRoutes = new Elysia({ prefix: "/register" })
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      Report.warn("Register validation error", {
        error: error.message,
        code,
      });
      set.status = 400;
      return { success: false, messageKey: "registerPage.registrationError" };
    }
    throw error; // Re-throw other errors to be handled by global handler
  })
  .post(
    "/",
    async ({ body, headers, set }) => {
      Report.debug("Register request received", {
        route: "/register",
        body: body,
      });

      try {
        // Validate body using Zod schema (additional validation)
        const validationResult = CreateUserSchema.safeParse(body);
        if (!validationResult.success) {
          Report.warn("Register payload failed validation", {
            route: "/register",
            errors: validationResult.error.issues,
            body: body,
          });
          set.status = 400;
          return { success: false, messageKey: "registerPage.registrationError" };
        }

        const validatedBody = validationResult.data;

        const existingUser = await UserService.getUserByUsername(
          validatedBody.username,
        );
        if (existingUser) {
          Report.warn("Registration attempted with taken username", {
            username: validatedBody.username,
          });
          set.status = 200; // Return 200 with success: false for business logic error
          return { success: false, messageKey: "registerPage.usernameTaken" };
        }

        // Create new user
        // Extract lastNewsReceived separately as UserService.createUser doesn't accept it
        const { lastNewsReceived, ...userDataForCreation } = validatedBody;
        const newUser = await UserService.createUser(userDataForCreation);
        
        // Update lastNewsReceived if provided (optional field)
        if (lastNewsReceived) {
          await UserService.updateUser(newUser.id, { 
            lastNewsReceived,
            updatedBy: "system"
          });
        }

        Report.info("New user registered", {
          userId: newUser.id,
          username: newUser.username,
        });
        set.status = 200;
        return { success: true, userId: newUser.id, username: newUser.username };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        const errorStack = error instanceof Error ? error.stack : undefined;
        Report.error("Registration error", {
          error: errorMessage,
          stack: errorStack,
          username: body?.username || "unknown",
          body: body,
          fullError: error,
        });
        set.status = 500;
        return {
          success: false,
          messageKey: "registerPage.networkError",
          error: errorMessage, // Include error for debugging (remove in production)
        };
      }
    },
    {
      body: RegisterSchema,
    }
  );
