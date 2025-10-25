import {BreathingSkillId} from "src/Entity/BreathingSkill/enum.ts";
import {BreathingSkill} from "src/Entity/BreathingSkill/BreathinglSkill.ts";
import { basicBreathingTechnique } from "./definition/basicBreathingTechnique";

export const breathingSkillRepository: Record<BreathingSkillId, BreathingSkill> = {
    [BreathingSkillId.basicBreathingTechnique]: basicBreathingTechnique
}
