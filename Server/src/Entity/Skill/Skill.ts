import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import type { Character } from "../Character/Character";
import type { SkillId } from "./enums";
import type {
  SkillConsume,
  SkillLearningRequirement,
  SkillProduce,
  TurnResult,
} from "./types";
import type { ProficiencyKey } from "src/InterFacesEnumsAndTypes/Enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BuffsAndDebuffsEnum } from "../BuffsAndDebuffs/enum";

export class Skill {
  id: SkillId;
  name: L10N;
  tier: TierEnum;
  description: L10N;
  requirement: SkillLearningRequirement;
  equipmentNeeded: ProficiencyKey[];
  consume: SkillConsume;
  produce: SkillProduce;
  existBuffDebuffs?: BuffsAndDebuffsEnum[];
  notExistBuffDebuffs?: BuffsAndDebuffsEnum[];
  exec: (
    user: Character,
    userParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
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
    existBuffDebuffs?: BuffsAndDebuffsEnum[];
    notExistBuffDebuffs?: BuffsAndDebuffsEnum[];
    exec: (
      user: Character,
      userParty: Character[],
      targetParty: Character[],
      skillLevel: number,
      location: LocationsEnum,
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
    this.existBuffDebuffs = data.existBuffDebuffs;
    this.notExistBuffDebuffs = data.notExistBuffDebuffs;
  }
}
