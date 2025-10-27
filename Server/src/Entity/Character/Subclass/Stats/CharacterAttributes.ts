import {
  ATTRIBUTE_KEYS,
  type AttributeKey,
} from "src/InterFacesEnumsAndTypes/Enums.ts";
import { CharacterStatArchetype, StatBlock } from "./CharacterStatArchetype";

export class CharacterAttributes extends CharacterStatArchetype<AttributeKey> {
  constructor(initial?: Partial<Record<AttributeKey, Partial<StatBlock>>>, defaultBase: number = 6) {
    super(ATTRIBUTE_KEYS, initial, defaultBase);
  }
}
