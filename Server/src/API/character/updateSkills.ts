import { Elysia, t } from "elysia";
import { characterManager } from "../../Game/CharacterManager";
import { mapCharacterToInterface } from "../../Utils/CharacterMapper";
import { SessionService } from "../../Services/SessionService";
import { CharacterService } from "../../Services/CharacterService";
import Report from "../../Utils/Reporter";
import type { CharacterSkillInterface } from "../../InterFacesEnumsAndTypes/CharacterSkillInterface";
import { SkillId } from "src/Entity/Skill/enums";

export const updateSkillsRoutes = new Elysia({ prefix: "/character" })
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      Report.warn("Update skills route validation error", {
        error: error.message,
        code,
      });
      set.status = 400;
      return { success: false, error: "Validation error" };
    }
    throw error;
  })
  .post(
    "/update-skills",
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

        const { characterId, activeSkills, conditionalSkills } = body;

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

        // Validate that all skills in decks exist in character.skills
        const characterSkillIds = new Set(character.skills.keys());
        
        if (activeSkills) {
          // Limit to 7 skills max
          const limitedActiveSkills = activeSkills.slice(0, 7);
          
          // Validate all skills exist in character.skills Map
          for (const skillId of limitedActiveSkills) {
            if (!character.skills.has(skillId as SkillId)) {
              set.status = 400;
              return {
                success: false,
                error: `Skill ${skillId} is not learned by this character`,
              };
            }
          }
          
          // Update active skills (store only IDs)
          character.activeSkills = limitedActiveSkills.map(skillId => skillId as SkillId);
        }

        if (conditionalSkills) {
          // Limit to 7 skills max
          const limitedConditionalSkills = conditionalSkills.slice(0, 7);
          
          // Validate all skills exist in character.skills Map
          for (const skillId of limitedConditionalSkills) {
            if (!character.skills.has(skillId as SkillId)) {
              set.status = 400;
              return {
                success: false,
                error: `Skill ${skillId} is not learned by this character`,
              };
            }
          }
          
          // Update conditional skills (store only IDs)
          character.conditionalSkills = limitedConditionalSkills.map(skillId => skillId as SkillId);
        }

        // Persist to database
        await CharacterService.updateCharacterInDatabase(character);

        // Map and return updated character
        const updatedCharacter = mapCharacterToInterface(character);

        return {
          success: true,
          character: updatedCharacter,
        };
      } catch (error) {
        Report.error("Error updating character skills", { error });
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
        activeSkills: t.Optional(t.Array(t.String())), // SkillId[]
        conditionalSkills: t.Optional(t.Array(t.String())), // SkillId[]
      }),
    }
  );

