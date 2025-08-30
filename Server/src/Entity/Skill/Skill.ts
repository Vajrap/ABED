import { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import type { SkillId } from "./enums";
import type { SkillLearningRequirement } from "./types";

export class Skill {
  id: SkillId;
  name: string;
  tier: TierEnum;
  description: string;
  requirement: SkillLearningRequirement;
  constructor(data: {
    id: SkillId;
    name: string;
    tier: TierEnum;
    description: string;
    requirement: SkillLearningRequirement;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.tier = data.tier;
    this.description = data.description;
    this.requirement = data.requirement;
  }
}
