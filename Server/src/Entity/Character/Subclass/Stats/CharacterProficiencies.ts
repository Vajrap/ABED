import {
  PROFICIENCY_KEYS,
  type ProficiencyKey,
} from "src/InterFacesEnumsAndTypes/Enums.ts";
import { CharacterStatArchetype, StatBlock } from "./CharacterStatArchetype";

export class CharacterProficiencies extends CharacterStatArchetype<ProficiencyKey> {
  constructor(initial?: Partial<Record<ProficiencyKey, Partial<StatBlock>>>, defaultBase: number = 6) {
    super(PROFICIENCY_KEYS, initial, defaultBase);
  }
}
