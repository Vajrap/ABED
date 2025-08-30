import {
  ELEMENT_KEYS,
  type ElementKey,
} from "../../../../InterFacesEnumsAndTypes/Enums";
import { CharacterStatArchetype, StatBlock } from "./CharacterStatArchetype";

export class CharacterElements extends CharacterStatArchetype<ElementKey> {
  constructor(initial?: Partial<Record<ElementKey, Partial<StatBlock>>>) {
    super(ELEMENT_KEYS, initial);
  }

  static fromJSON(data: any): CharacterElements {
    return new CharacterElements(data);
  }

  // TODO: Element still needs more implications
}
