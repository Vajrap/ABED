import express, { type Request, type Response } from 'express';
import { isBodyValid } from "../../Utils/isBodyValid";
import Report from "../../Utils/Reporter";
import { UserService, CreateUserSchema } from "../../Entity/User/index";

export const registerRoutes = express.Router();

registerRoutes.post("/", async (req: Request, res: Response) => {
  console.log("🔥 REGISTER ROUTE HIT!");
  Report.info("Register request received");
  Report.info(`Body received: ${JSON.stringify(req.body)}`);
  
  const validation = CreateUserSchema.safeParse(req.body);
  Report.info(`Validation result: ${JSON.stringify(validation)}`);
  
  if (!isBodyValid(CreateUserSchema, req.body)) {
    Report.error(
      `Wrong message type in Registration Schema with body ${JSON.stringify(req.body)}`,
    );
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
      return res.json({ success: false, messageKey: "registerPage.usernameTaken" });
    }

    // Create new user
    const newUser = await UserService.createUser({
      ...validatedBody,
    });

    Report.info(`New user registered: ${newUser.username}`);
    return res.json({ success: true, userId: newUser.id, username: newUser.username });
  } catch (error) {
    Report.error(`Registration error: ${error}`);
    return res.json({ success: false, messageKey: "registerPage.networkError" });
  }
});