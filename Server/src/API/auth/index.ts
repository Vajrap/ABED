import express, { type Request, type Response } from 'express';
import Report from "../../Utils/Reporter";
import { SessionService } from "../../Services/SessionService";

export const authRoutes = express.Router();

authRoutes.post("/auto", async (req: Request, res: Response) => {
  console.log("🔥 AUTH AUTO ROUTE HIT!");
  try {
    const { token } = req.body as { token: string };

    if (!token) {
      return res.json({ success: false, messageKey: "auth.noToken" });
    }

    // Validate the session token
    const user = await SessionService.validateSession(token);

    if (!user) {
      return res.json({ success: false, messageKey: "auth.invalidSession" });
    }

    Report.info(`Auto auth successful for user ${user.email}`);
    
    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    Report.error(`Auto auth error: ${error}`);
    return res.json({ success: false, messageKey: "auth.autoAuthFailed" });
  }
});

authRoutes.post("/logout", async (req: Request, res: Response) => {
  console.log("🔥 AUTH LOGOUT ROUTE HIT!");
  try {
    const { token } = req.body as { token: string };

    if (token) {
      // Invalidate the session
      const success = await SessionService.invalidateSession(token);
      
      if (success) {
        Report.info("User session invalidated successfully");
      } else {
        Report.warn("Session invalidate failed - token may not exist");
      }
    }

    return res.json({ success: true });
  } catch (error) {
    Report.error(`Logout error: ${error}`);
    return res.json({ success: false, messageKey: "auth.logoutFailed" });
  }
});