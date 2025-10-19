import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import type { Character } from "../Character/Character";
import type { Location } from "../Location/Location";
import type { SkillId } from "./enums";
import type {
  SkillConsume,
  SkillLearningRequirement,
  SkillProduce,
  TurnResult,
} from "./types";
import type { ProficiencyKey } from "src/InterFacesEnumsAndTypes/Enums";

export class Skill {
  id: SkillId;
  name: L10N;
  tier: TierEnum;
  description: L10N;
  requirement: SkillLearningRequirement;
  equipmentNeeded: ProficiencyKey[];
  consume: SkillConsume;
  produce: SkillProduce;
  exec: (
    user: Character,
    target: Character,
    skillLevel: number,
    location: Location,
  ) => TurnResult;
  constructor(data: {
    id: SkillId;
    name: L10N;
    tier: TierEnum;
    description: L10N;
    requirement: SkillLearningRequirement;
    equipmentNeeded: ProficiencyKey[];
    consume: SkillConsume;
    produce: SkillProduce;
    exec: (
      user: Character,
      target: Character,
      skillLevel: number,
      location: Location,
    ) => TurnResult;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.tier = data.tier;
    this.description = data.description;
    this.requirement = data.requirement;
    this.equipmentNeeded = data.equipmentNeeded;
    this.consume = data.consume;
    this.produce = data.produce;
    this.exec = data.exec;
  }
}
