import type { SkillId } from "../Entity/Skill/enums";
import type { TierEnum } from "./Tiers";

export interface SkillConsume {
  hp: number;
  mp: number;
  sp: number;
  elements: Array<{ element: string; value: number }>;
}

export interface SkillProduce {
  hp: number;
  mp: number;
  sp: number;
  elements: Array<{ element: string; min: number; max: number }>;
}

export interface CharacterSkillInterface {
    id: SkillId;
    level: TierEnum;
    exp: number;
    consume?: SkillConsume;
    produce?: SkillProduce;
}