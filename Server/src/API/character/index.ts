import express, { type Request, type Response } from 'express';
import Report from "../../Utils/Reporter";
import { CharacterService, type CharacterCreationData } from "../../Services/CharacterService";
import { SessionService } from "../../Services/SessionService";
import { RaceEnum, ClassEnum, ATTRIBUTE_KEYS, PROFICIENCY_KEYS, ARTISAN_KEYS } from "../../InterFacesEnumsAndTypes/Enums";
import { RACES } from "../../Game/CharacterCreation/Races";
import { BACKGROUNDS } from "../../Game/CharacterCreation/Backgrounds";

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
  Report.debug("Character create request received", {
    route: "/character/create",
    ip: req.ip,
  });
  try {
    // Extract token from Authorization header or body
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1] || req.body.token;

    if (!token) {
      return res.json({ success: false, messageKey: "auth.noToken" });
    }

    // Validate request body (token is now optional in body)
    if (!isCharacterCreationValidSimple(req.body)) {
      Report.warn("Invalid character creation payload", {
        keys: Object.keys(req.body ?? {}).sort(),
      });
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
      Report.error("Character creation failed", {
        userId: user.id,
        username: user.username,
        error: result.error,
      });
      return res.status(500).json({ success: false, messageKey: "character.creationError" });
    }

    Report.info("Character created", {
      userId: user.id,
      username: user.username,
      characterName: req.body.name,
    });

    // Return success - frontend will fetch character data after landing on game page
    return res.json({ success: true, messageKey: "character.creationSuccess" });
  } catch (error) {
    Report.error("Character creation error", {
      error,
      username: req.body?.name,
    });
    return res.json({ success: false, messageKey: "character.creationFailed" });
  }
});

characterRoutes.post("/checkName", async (req: Request, res: Response) => {
  Report.debug("Character name availability check", {
    route: "/character/checkName",
    ip: req.ip,
  });
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
    Report.error("Character name check error", {
      error,
      name: req.body?.name,
    });
    return res.json({ success: false, messageKey: "character.nameCheckFailed" });
  }
});

// GET /api/character/preview - Preview character stats based on race, class, and background
characterRoutes.get("/preview", async (req: Request, res: Response) => {
  Report.debug("Character preview request received", {
    route: "/character/preview",
    ip: req.ip,
    query: req.query,
  });
  try {
    const { race, class: classValue, background } = req.query as {
      race?: string;
      class?: string;
      background?: string;
    };

    if (!race || !classValue || !background) {
      return res.json({
        success: false,
        messageKey: "character.invalidPreviewData",
      });
    }

    // Use CharacterService to create a temporary character for preview
    // This ensures we use the same logic as actual character creation
    try {
      const tempCharacter = CharacterService.createCharacter(
        "preview-user-id", // Temporary user ID for preview
        {
          name: "Preview",
          gender: "MALE",
          race: race as any,
          portrait: "preview",
          background: background as any,
          startingClass: classValue as any,
        }
      );

      // Extract stats for preview
      const attributes: Record<string, { base: number; bonus: number }> = {};
      for (const key of ATTRIBUTE_KEYS) {
        attributes[key] = {
          base: tempCharacter.attribute.getStat(key).base,
          bonus: tempCharacter.attribute.getStat(key).bonus,
        };
      }

      const proficiencies: Record<string, { base: number; bonus: number }> = {};
      for (const key of PROFICIENCY_KEYS) {
        proficiencies[key] = {
          base: tempCharacter.proficiencies.getStat(key).base,
          bonus: tempCharacter.proficiencies.getStat(key).bonus,
        };
      }

      const artisans: Record<string, { base: number; bonus: number }> = {};
      for (const key of ARTISAN_KEYS) {
        artisans[key] = {
          base: tempCharacter.artisans.getStat(key).base,
          bonus: tempCharacter.artisans.getStat(key).bonus,
        };
      }

      return res.json({
        success: true,
        stats: {
          attributes,
          proficiencies,
          artisans,
          vitals: {
            maxHP: tempCharacter.vitals.hp.max,
            maxSP: tempCharacter.vitals.sp.max,
            maxMP: tempCharacter.vitals.mp.max,
            planarAptitude: tempCharacter.planarAptitude.aptitude,
          },
        },
      });
    } catch (error) {
      Report.error("Character preview calculation error", {
        error,
        race,
        class: classValue,
        background,
      });
      return res.json({
        success: false,
        messageKey: "character.previewFailed",
      });
    }
  } catch (error) {
    Report.error("Character preview error", {
      error,
    });
    return res.json({ success: false, messageKey: "character.previewFailed" });
  }
});

// GET /api/character/metadata - Returns available races, classes, and backgrounds for character creation
characterRoutes.get("/metadata", async (req: Request, res: Response) => {
  Report.debug("Character metadata request", {
    route: "/character/metadata",
    ip: req.ip,
  });
  try {
    // Get available races - use RaceEnum for the list, but check RACES for actual definitions
    // For now, include all RaceEnum values and add Vulpine if it exists
    const raceKeys = Object.values(RaceEnum).filter((race) => {
      // Map enum values to RACES keys (lowercase)
      const raceKey = race.toLowerCase();
      return RACES[raceKey] || race === RaceEnum.Vulpine; // Include Vulpine even if not in old RACES
    });

    const races = raceKeys.map((race) => ({
      id: race, // Use enum value (e.g., "Human", "Vulpine")
      name: race,
    }));

    // Get available classes - use ClassEnum for the full list
    const classes = Object.values(ClassEnum).map((cls) => ({
      id: cls, // Use enum value (e.g., "Cleric", "Seer", etc.)
      name: cls,
    }));

    // Get available backgrounds
    const backgrounds = Object.keys(BACKGROUNDS).map((bgKey) => ({
      id: bgKey, // Use key (e.g., "retainor", "peasant")
      name: bgKey.charAt(0).toUpperCase() + bgKey.slice(1), // Capitalize for display
    }));

    return res.json({
      success: true,
      races,
      classes,
      backgrounds,
    });
  } catch (error) {
    Report.error("Character metadata error", {
      error,
    });
    return res.json({ success: false, messageKey: "character.metadataFailed" });
  }
});