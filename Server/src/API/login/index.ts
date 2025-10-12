import express, { type Request, type Response } from 'express';
import { isBodyValid } from "../../Utils/isBodyValid";
import Report from "../../Utils/Reporter";
import { UserService, UserLoginSchema } from "../../Entity/User/index";
import { SessionService } from "../../Services/SessionService";
import { CharacterService } from "../../Services/CharacterService";

export const loginRoutes = express.Router();

loginRoutes.post("/", async (req: Request, res: Response) => {
  console.log("🔥 LOGIN ROUTE HIT!");
  Report.info("Login request received");
  Report.info(`Body received: ${JSON.stringify(req.body)}`);
  
  if (!isBodyValid(UserLoginSchema, req.body)) {
    Report.error(
      `Wrong message type in Login Schema with body ${JSON.stringify(req.body)}`,
    );
    return res.json({ success: false, messageKey: "loginPage.loginError" });
  }

  const validatedBody = req.body as { username: string; password: string };

  try {
    const user = await UserService.getUserByUsername(validatedBody.username);
    if (!user) {
      return res.json({ success: false, messageKey: "loginPage.userNotFound" });
    }

    // TODO: Add password verification (bcrypt)
    if (user.password !== validatedBody.password) {
      return res.json({ success: false, messageKey: "loginPage.invalidCredentials" });
    }

    // Extract client information for session tracking
    const userAgent = req.headers["user-agent"] || "Unknown";
    const ipAddress = req.headers["x-forwarded-for"] as string || req.headers["x-real-ip"] as string || "Unknown";

    // Create new session (this will invalidate other sessions)
    const { session, token } = await SessionService.createSession(
      user.id,
      userAgent,
      ipAddress
    );

    Report.info(`User ${user.username} logged in successfully with session ${session.id}`);

    // Check if user has a character (don't send character data, just a flag)
    const character = await CharacterService.getUserCharacter(user.id);
    const hasCharacter = character !== null;
    
    Report.info(`User ${user.username} has character: ${hasCharacter}`);
    
    return res.json({ 
      success: true, 
      hasCharacter, // Boolean flag - FE will fetch character data on game page if needed
      token,
    });
  } catch (error) {
    Report.error(`Login error: ${error}`);
    return res.json({ success: false, messageKey: "loginPage.networkError" });
  }
});