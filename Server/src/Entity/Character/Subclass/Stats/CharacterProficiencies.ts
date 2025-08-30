import {
  PROFICIENCY_KEYS,
  type ProficiencyKey,
} from "../../../../InterFacesEnumsAndTypes/Enums";
import { CharacterStatArchetype, StatBlock } from "./CharacterStatArchetype";

export class CharacterProficiencies extends CharacterStatArchetype<ProficiencyKey> {
  constructor(initial?: Partial<Record<ProficiencyKey, Partial<StatBlock>>>) {
    super(PROFICIENCY_KEYS, initial);
  }

  static fromJSON(data: any): CharacterProficiencies {
    return new CharacterProficiencies(data);
  }
}
