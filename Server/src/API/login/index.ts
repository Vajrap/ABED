import express, { type Request, type Response } from "express";
import { isBodyValid } from "../../Utils/isBodyValid";
import Report from "../../Utils/Reporter";
import { UserService, UserLoginSchema } from "../../Entity/User/index";
import { SessionService } from "../../Services/SessionService";
import { CharacterService } from "../../Services/CharacterService";

export const loginRoutes = express.Router();

loginRoutes.post("/", async (req: Request, res: Response) => {
  Report.debug("Login request received", {
    route: "/login",
    ip: req.ip,
  });

  if (!isBodyValid(UserLoginSchema, req.body)) {
    Report.warn("Login payload failed validation", {
      route: "/login",
      bodyShape: Object.keys(req.body ?? {}).sort(),
    });
    return res.json({ success: false, messageKey: "loginPage.loginError" });
  }

  const validatedBody = req.body as { username: string; password: string };

  try {
    const user = await UserService.getUserByUsername(validatedBody.username);
    if (!user) {
      Report.warn("Login attempt for unknown user", {
        username: validatedBody.username,
      });
      return res.json({ success: false, messageKey: "loginPage.userNotFound" });
    }

    // TODO: Add password verification (bcrypt)
    if (user.password !== validatedBody.password) {
      Report.warn("Login attempt with invalid credentials", {
        userId: user.id,
        username: user.username,
      });
      return res.json({
        success: false,
        messageKey: "loginPage.invalidCredentials",
      });
    }

    // Extract client information for session tracking
    const userAgent = req.headers["user-agent"] || "Unknown";
    const ipAddress =
      (req.headers["x-forwarded-for"] as string) ||
      (req.headers["x-real-ip"] as string) ||
      "Unknown";

    // Create new session (this will invalidate other sessions)
    const { session, token } = await SessionService.createSession(
      user.id,
      userAgent,
      ipAddress,
    );

    // Check if user has a character (don't send character data, just a flag)
    const character = await CharacterService.getUserCharacter(user.id);
    const hasCharacter = character !== null;

    Report.info("User logged in successfully", {
      userId: user.id,
      username: user.username,
      sessionId: session.id,
      hasCharacter,
    });

    return res.json({
      success: true,
      hasCharacter, // Boolean flag - FE will fetch character data on game page if needed
      token,
    });
  } catch (error) {
    Report.error("Login error", {
      error,
      username: req.body?.username,
    });
    return res.json({ success: false, messageKey: "loginPage.networkError" });
  }
});
