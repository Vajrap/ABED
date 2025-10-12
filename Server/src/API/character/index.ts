import express, { type Request, type Response } from 'express';
import Report from "../../Utils/Reporter";
import { CharacterService, type CharacterCreationData } from "../../Services/CharacterService";
import { SessionService } from "../../Services/SessionService";

function isCharacterCreationValidSimple(body: any): body is CharacterCreationData {
  return (
    typeof body.name === "string" &&
    typeof body.gender === "string" &&
    typeof body.race === "string" &&
    typeof body.portrait === "string" &&
    typeof body.background === "string" &&
    typeof body.startingClass === "string" &&
    body.name.trim().length > 0 &&
    body.name.trim().length <= 50 &&
    ["MALE", "FEMALE", "NONE"].includes(body.gender) &&
    body.portrait.trim().length > 0
  );
}

export const characterRoutes = express.Router();

characterRoutes.post("/create", async (req: Request, res: Response) => {
  console.log("🔥 CHARACTER CREATE ROUTE HIT!");
  try {
    // Extract token from Authorization header or body
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1] || req.body.token;

    if (!token) {
      return res.json({ success: false, messageKey: "auth.noToken" });
    }

    // Validate request body (token is now optional in body)
    if (!isCharacterCreationValidSimple(req.body)) {
      Report.error(`Invalid character creation data: ${JSON.stringify(req.body)}`);
      return res.json({ success: false, messageKey: "character.invalidData" });
    }

    // Validate session token
    const user = await SessionService.validateSession(token);
    if (!user) {
      return res.json({ success: false, messageKey: "auth.invalidSession" });
    }

    // Check if character name is available
    const isNameAvailable = await CharacterService.isCharacterNameAvailable(req.body.name);
    if (!isNameAvailable) {
      return res.json({ success: false, messageKey: "character.nameTaken" });
    }

    // Create character
    const result = await CharacterService.handleCreateCharacter(user.id, {
      name: req.body.name,
      gender: req.body.gender,
      race: req.body.race,
      portrait: req.body.portrait,
      background: req.body.background,
      startingClass: req.body.startingClass,
    });

    if (!result.success) {
      Report.error(`Character creation failed: ${result.error}`);
      return res.status(500).json({ success: false, messageKey: "character.creationError" });
    }

    Report.info(`Character ${req.body.name} created for user ${user.username}`);
    
    // Return success - frontend will fetch character data after landing on game page
    return res.json({ success: true, messageKey: "character.creationSuccess" });
  } catch (error) {
    Report.error(`Character creation error: ${error}`);
    return res.json({ success: false, messageKey: "character.creationFailed" });
  }
});

characterRoutes.post("/checkName", async (req: Request, res: Response) => {
  console.log("🔥 CHARACTER CHECK NAME ROUTE HIT!");
  try {
    const { name } = req.body as { name: string };

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.json({ success: false, messageKey: "character.invalidName" });
    }

    // Check if name is available
    const isAvailable = await CharacterService.isCharacterNameAvailable(name.trim());
    
    return res.json({
      success: true,
      available: isAvailable,
      messageKey: isAvailable ? "character.nameAvailable" : "character.nameTaken"
    });
  } catch (error) {
    Report.error(`Character name check error: ${error}`);
    return res.json({ success: false, messageKey: "character.nameCheckFailed" });
  }
});