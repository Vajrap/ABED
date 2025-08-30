import {
  ATTRIBUTE_KEYS,
  type AttributeKey,
} from "../../../../InterFacesEnumsAndTypes/Enums";
import { CharacterStatArchetype, StatBlock } from "./CharacterStatArchetype";

export class CharacterAttributes extends CharacterStatArchetype<AttributeKey> {
  constructor(initial?: Partial<Record<AttributeKey, Partial<StatBlock>>>) {
    super(ATTRIBUTE_KEYS, initial);
  }

  static fromJSON(data: any): CharacterAttributes {
    return new CharacterAttributes(data);
  }
}
