import type { CharacterInterface } from "../../InterFacesEnumsAndTypes/CharacterInterface";
import { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import type { TimeOfDay } from "../../InterFacesEnumsAndTypes/Time";
import type { Character } from "../Character/Character";
import type { Location } from "../Location/Location";
import { locationRepository } from "../Location/Repository/location";
import type { SkillId } from "./enums";
import type { SkillLearningRequirement } from "./types";

/*
Skill Execution Context
- Location
- Weather, is it in Location?
- Time of day
*/
export class Skill {
  id: SkillId;
  name: string;
  tier: TierEnum;
  description: string;
  requirement: SkillLearningRequirement;
  exec: (user: Character, target: Character, location: Location, timeOfDay: TimeOfDay) => TurnResult;
  constructor(data: {
    id: SkillId;
    name: string;
    tier: TierEnum;
    description: string;
    requirement: SkillLearningRequirement;
    exec: (user: Character, target: Character) => TurnResult;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.tier = data.tier;
    this.description = data.description;
    this.requirement = data.requirement;
    this.exec = data.exec;
  }
}

export type TurnResult = {
  // This would be added to battle report
  // it should also tell FE how to render the battle scene UI
  // So, Who, do what (to whom)
  who: CharacterInterface;
  do: string;
  to: CharacterInterface;
  // Maybe we need to add some more context here, like damage, buff, debuff, etc
  context: any;
}

const a: Location = locationRepository.get(LocationsEnum.AncestorBarrows)!
a.weatherScale