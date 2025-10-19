import type { SkillId } from "./enums";
import type { Skill } from "./Skill";

export const skillRepository: Record<SkillId, Skill> = {
  [SkillId.Test]: undefined,
  [SkillId.Test2]: undefined,
};
