import {
  PROFICIENCY_KEYS,
  type ProficiencyKey,
} from "src/InterFacesEnumsAndTypes/Enums.ts";
import { CharacterStatArchetype, StatBlock } from "./CharacterStatArchetype";

export class CharacterProficiencies extends CharacterStatArchetype<ProficiencyKey> {
  constructor(initial?: Partial<Record<ProficiencyKey, Partial<StatBlock>>>) {
    super(PROFICIENCY_KEYS, initial);
  }
}
