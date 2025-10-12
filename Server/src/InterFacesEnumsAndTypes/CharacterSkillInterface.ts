import type { SkillId } from "../Entity/Skill/enums";
import type { TierEnum } from "./Tiers";

export interface CharacterSkillInterface {
    id: SkillId;
    level: TierEnum;
    exp: number;
}