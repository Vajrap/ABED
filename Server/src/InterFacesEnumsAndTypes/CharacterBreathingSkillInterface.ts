import type { BreathingSkillId } from "../Entity/BreathingSkill/enum";
import type { TierEnum } from "./Tiers";

export interface CharacterBreathingSkillInterface {
    id: BreathingSkillId;
    level: TierEnum;
    exp: number;
}