import express, { type Request, type Response } from 'express';
import { isBodyValid } from "../../Utils/isBodyValid";
import Report from "../../Utils/Reporter";
import { UserService, CreateUserSchema } from "../../Entity/User/index";

export const registerRoutes = express.Router();

registerRoutes.post("/", async (req: Request, res: Response) => {
  Report.debug("Register request received", {
    route: "/register",
    ip: req.ip,
  });

  if (!isBodyValid(CreateUserSchema, req.body)) {
    Report.warn("Register payload failed validation", {
      route: "/register",
      bodyShape: Object.keys(req.body ?? {}).sort(),
    });
    return res.json({ success: false, messageKey: "registerPage.registrationError" });
  }

  const validatedBody = req.body as {
    username: string;
    password: string;
    email?: string;
    lastNewsReceived?: string;
  };

  try {
    const existingUser = await UserService.getUserByUsername(
      validatedBody.username,
    );
    if (existingUser) {
      Report.warn("Registration attempted with taken username", {
        username: validatedBody.username,
      });
      return res.json({ success: false, messageKey: "registerPage.usernameTaken" });
    }

    // Create new user
    const newUser = await UserService.createUser({
      ...validatedBody,
    });

    Report.info("New user registered", {
      userId: newUser.id,
      username: newUser.username,
    });
    return res.json({ success: true, userId: newUser.id, username: newUser.username });
  } catch (error) {
    Report.error("Registration error", {
      error,
      username: req.body?.username,
    });
    return res.json({ success: false, messageKey: "registerPage.networkError" });
  }
});