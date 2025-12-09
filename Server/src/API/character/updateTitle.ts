import { Elysia, t } from "elysia";
import { characterManager } from "../../Game/CharacterManager";
import { activeRole, activeEpithet, deactiveRole, deactiveEpithet } from "../../Entity/Character/Subclass/Title/logics/active";
import { CharacterRoleEnum } from "../../Entity/Character/Subclass/Title/Role/enum";
import { CharacterEpithetEnum } from "../../Entity/Character/Subclass/Title/Epithet/enum";
import { mapCharacterToInterface } from "../../Utils/CharacterMapper";
import { SessionService } from "../../Services/SessionService";
import Report from "../../Utils/Reporter";

export const updateTitleRoutes = new Elysia({ prefix: "/character" })
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      Report.warn("Update title route validation error", {
        error: error.message,
        code,
      });
      set.status = 400;
      return { success: false, error: "Validation error" };
    }
    throw error;
  })
  .post(
    "/update-title",
    async ({ body, headers, set }) => {
      try {
        // 1. Validate session
        const authHeader = headers.authorization;
        const token = authHeader?.split(" ")[1];
        
        if (!token) {
          set.status = 401;
          return { success: false, error: "No authentication token provided" };
        }

        const user = await SessionService.validateSession(token);
        if (!user) {
          set.status = 401;
          return { success: false, error: "Invalid session" };
        }

        const { characterId, epithet, role } = body;

        // Get character
        const character = characterManager.getCharacterByID(characterId);
        if (!character) {
          set.status = 404;
          return {
            success: false,
            error: "Character not found",
          };
        }

        // Verify ownership
        if (character.userId !== user.id) {
          set.status = 403;
          return {
            success: false,
            error: "Unauthorized",
          };
        }

        // Update epithet if provided
        if (epithet !== undefined) {
          if (epithet === null || epithet === "") {
            // Remove epithet using deactive function
            if (character.title.epithet) {
              deactiveEpithet(character);
            }
          } else {
            // Validate epithet is in available list
            if (!character.possibleEpithets.includes(epithet as CharacterEpithetEnum)) {
              set.status = 400;
              return {
                success: false,
                error: `Epithet ${epithet} is not available for this character`,
              };
            }
            // Use the active function to properly handle activation/deactivation
            activeEpithet(character, epithet as CharacterEpithetEnum);
          }
        }

        // Update role if provided
        if (role !== undefined) {
          if (role === null || role === "") {
            // Remove role using deactive function
            if (character.title.role) {
              deactiveRole(character);
            }
          } else {
            // Validate role is in available list
            if (!character.possibleRoles.includes(role as CharacterRoleEnum)) {
              set.status = 400;
              return {
                success: false,
                error: `Role ${role} is not available for this character`,
              };
            }
            // Use the active function to properly handle activation/deactivation
            activeRole(character, role as CharacterRoleEnum);
          }
        }

        // Map and return updated character
        const updatedCharacter = mapCharacterToInterface(character);

        return {
          success: true,
          character: updatedCharacter,
        };
      } catch (error) {
        Report.error("Error updating character title", { error });
        set.status = 500;
        return {
          success: false,
          error: error instanceof Error ? error.message : "Internal server error",
        };
      }
    },
    {
      body: t.Object({
        characterId: t.String(),
        epithet: t.Union([t.String(), t.Null(), t.Optional(t.String())]),
        role: t.Union([t.String(), t.Null(), t.Optional(t.String())]),
      }),
    }
  );

