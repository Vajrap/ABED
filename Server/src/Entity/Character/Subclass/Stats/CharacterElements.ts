import {
  ELEMENT_KEYS,
  type ElementKey,
} from "src/InterFacesEnumsAndTypes/Enums.ts";
import { CharacterStatArchetype, StatBlock } from "./CharacterStatArchetype";

export class CharacterElements extends CharacterStatArchetype<ElementKey> {
  constructor(initial?: Partial<Record<ElementKey, Partial<StatBlock>>>) {
    super(ELEMENT_KEYS, initial);
  }

  // TODO: Element still needs more implications
}
