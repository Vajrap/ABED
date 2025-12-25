import { Elysia, t } from "elysia";
import Report from "../../Utils/Reporter";
import { SessionService } from "../../Services/SessionService";
import { skillRepository } from "../../Entity/Skill/repository";
import type { SkillId } from "../../Entity/Skill/enums";

/**
 * Skill API Routes
 * Provides skill information including consume/produce data
 */
export const skillRoutes = new Elysia({ prefix: "/skill" })
  .onError(({ code, error, set }) => {
    Report.error("Skill API error", {
      code,
      error: error instanceof Error ? error.message : String(error),
    });
    set.status = 500;
    return { success: false, error: "Internal server error" };
  })
  .get(
    "/:skillId",
    async ({ params, headers, set }) => {
      try {
        // Validate session
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

        // Get skill from repository
        const skillId = params.skillId as SkillId;
        const skill = skillRepository[skillId];

        if (!skill) {
          set.status = 404;
          return { success: false, error: "Skill not found" };
        }

        // Return skill data (excluding exec function)
        return {
          success: true,
          skill: {
            id: skill.id,
            name: skill.name,
            tier: skill.tier,
            maxLevel: skill.maxLevel,
            description: skill.description,
            consume: {
              hp: skill.consume.hp,
              mp: skill.consume.mp,
              sp: skill.consume.sp,
              elements: skill.consume.elements.map(e => ({
                element: String(e.element),
                value: e.value,
              })),
            },
            produce: {
              hp: skill.produce.hp,
              mp: skill.produce.mp,
              sp: skill.produce.sp,
              elements: skill.produce.elements.map(e => ({
                element: String(e.element),
                min: e.min,
                max: e.max,
              })),
            },
            cooldown: skill.cooldown,
            class: skill.class,
          },
        };
      } catch (error) {
        Report.error("Error getting skill details", {
          error: error instanceof Error ? error.message : String(error),
        });
        set.status = 500;
        return { success: false, error: "Internal server error" };
      }
    },
    {
      params: t.Object({
        skillId: t.String(),
      }),
    }
  );

