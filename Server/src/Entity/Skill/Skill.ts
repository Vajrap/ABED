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
import type { ClassEnum, ProficiencyKey } from "src/InterFacesEnumsAndTypes/Enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BuffEnum, DebuffEnum } from "../BuffsAndDebuffs/enum";

export interface SkillDescription {
  text: L10N;
  formula?: L10N;
}

export class Skill {
  id: SkillId;
  name: L10N;
  tier: TierEnum;
  maxLevel: number;
  description: SkillDescription;
  requirement: SkillLearningRequirement;
  equipmentNeeded: ProficiencyKey[];
  consume: SkillConsume;
  produce: SkillProduce;
  existBuff?: BuffEnum[];
  existDebuff?: DebuffEnum[];
  notExistBuff?: BuffEnum[];
  notExistDebuff?: DebuffEnum[];
  class?: ClassEnum;
  cooldown: number;
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
    description: SkillDescription;
    requirement: SkillLearningRequirement;
    equipmentNeeded: ProficiencyKey[];
    consume: SkillConsume;
    produce: SkillProduce;
    existBuff?: BuffEnum[];
    existDebuff?: DebuffEnum[];
    notExistBuff?: BuffEnum[];
    notExistDebuff?: DebuffEnum[];
    class?: ClassEnum;
    cooldown?: number;
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
    this.maxLevel = getTierMaxLevel(data.tier);
    this.description = data.description;
    this.requirement = data.requirement;
    this.equipmentNeeded = data.equipmentNeeded;
    this.consume = data.consume;
    this.produce = data.produce;
    this.class = data.class;
    this.exec = data.exec;
    this.existBuff = data.existBuff;
    this.existDebuff = data.existDebuff;
    this.notExistBuff = data.notExistBuff;
    this.notExistDebuff = data.notExistDebuff;
    this.cooldown = data.cooldown ?? 0;
  }
}

function getTierMaxLevel(tier: TierEnum): number {
  switch (tier) {
    case TierEnum.common:
    case TierEnum.uncommon:
      return 5;
    case TierEnum.rare:
    case TierEnum.epic:
      return 7;
    case TierEnum.legendary:
    case TierEnum.unique:
      return 10;
    case TierEnum.divine:
    case TierEnum.primordial:
      return 15;
    default:
      return 5;
  }
}
