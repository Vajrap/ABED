import { basicAttack } from "./definition/basicAttack";
import { SkillId } from "./enums";
import type { Skill } from "./Skill";

export const skillRepository: Record<SkillId, Skill> = {
  [SkillId.Basic]: basicAttack,
};
