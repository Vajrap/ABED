import { Elysia, t } from "elysia";
import Report from "../../Utils/Reporter";
import { CharacterService, type CharacterCreationData } from "../../Services/CharacterService";
import { SessionService } from "../../Services/SessionService";
import { PlayableRaceEnum } from "./enums";
import { PlayableBackgroundEnum } from "./enums";
import { ClassEnum } from "../../InterFacesEnumsAndTypes/Enums";
import { racesBonus } from "./races";
import { classBonus } from "./classes";
import { backgroundBonus } from "./background";


// Request body schema for validation
const CharacterCreationSchema = t.Object({
  name: t.String({ minLength: 3, maxLength: 20 }),
  gender: t.Union([t.Literal("MALE"), t.Literal("FEMALE"), t.Literal("NONE")]),
  race: t.String(),
  portrait: t.String({ minLength: 1 }),
  background: t.String(),
  startingClass: t.String(),
});


export const characterCreationRoutes = new Elysia({ prefix: "/characterCreation" })
  .post(
    "/create",
    async ({ body, headers, set }) => {
      Report.debug("Character creation request received", {
        route: "/characterCreation/create",
      });

      try {
        // Extract token from Authorization header
        const authHeader = headers.authorization;
        const token = authHeader?.split(" ")[1];

        if (!token) {
          set.status = 401;
          return { success: false, messageKey: "auth.noToken" };
        }

        // Validate session token
        const user = await SessionService.validateSession(token);
        if (!user) {
          set.status = 401;
          return { success: false, messageKey: "auth.invalidSession" };
        }

        // Validate race enum
        if (!Object.values(PlayableRaceEnum).includes(body.race as PlayableRaceEnum)) {
          Report.warn("Invalid race provided", { race: body.race });
          set.status = 400;
          return { success: false, messageKey: "character.invalidRace" };
        }

        // Validate background enum
        if (!Object.values(PlayableBackgroundEnum).includes(body.background as PlayableBackgroundEnum)) {
          Report.warn("Invalid background provided", { background: body.background });
          set.status = 400;
          return { success: false, messageKey: "character.invalidBackground" };
        }

        // Validate class enum
        if (!Object.values(ClassEnum).includes(body.startingClass as ClassEnum)) {
          Report.warn("Invalid class provided", { class: body.startingClass });
          set.status = 400;
          return { success: false, messageKey: "character.invalidClass" };
        }

        // Cast validated body values to enum types for accessing the new data structures
        const raceEnum = body.race as PlayableRaceEnum;
        const classEnum = body.startingClass as ClassEnum;
        const backgroundEnum = body.background as PlayableBackgroundEnum;

        // Verify keys exist in the actual data structures
        if (!racesBonus[raceEnum]) {
          Report.warn("Race key not found in racesBonus", { race: body.race, raceEnum });
          set.status = 400;
          return { success: false, messageKey: "character.invalidRace" };
        }

        if (!classBonus[classEnum]) {
          Report.warn("Class key not found in classBonus", { class: body.startingClass, classEnum });
          set.status = 400;
          return { success: false, messageKey: "character.invalidClass" };
        }

        if (!backgroundBonus[backgroundEnum]) {
          Report.warn("Background key not found in backgroundBonus", { background: body.background, backgroundEnum });
          set.status = 400;
          return { success: false, messageKey: "character.invalidBackground" };
        }

        // Check if character name is available
        const isNameAvailable = await CharacterService.isCharacterNameAvailable(body.name.trim());
        if (!isNameAvailable) {
          set.status = 400;
          return { success: false, messageKey: "character.nameTaken" };
        }

        // Create character data using validated enum values directly
        const characterData: CharacterCreationData = {
          name: body.name.trim(),
          gender: body.gender,
          race: raceEnum as any, // Use enum value directly - CharacterService will need to handle enum values
          portrait: body.portrait,
          background: backgroundEnum as any, // Use enum value directly - CharacterService will need to handle enum values
          startingClass: classEnum as any, // Use enum value directly - CharacterService will need to handle enum values
        };

        // Create character
        const result = await CharacterService.handleCreateCharacter(user.id, characterData);

        if (!result.success) {
          Report.error("Character creation failed", {
            userId: user.id,
            username: user.username,
            error: result.error,
          });
          set.status = 500;
          return { success: false, messageKey: "character.creationError" };
        }

        Report.info("Character created", {
          userId: user.id,
          username: user.username,
          characterName: body.name,
        });

        set.status = 200;
        return { success: true, messageKey: "character.creationSuccess" };
      } catch (err) {
        Report.error("Character creation error", {
          error: err,
          name: body?.name,
        });
        set.status = 500;
        return { success: false, messageKey: "character.creationFailed" };
      }
    },
    {
      body: CharacterCreationSchema,
    }
  );

