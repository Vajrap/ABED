import {
  ARTISAN_KEYS,
  type ArtisanKey,
} from "src/InterFacesEnumsAndTypes/Enums.ts";
import { CharacterStatArchetype, StatBlock } from "./CharacterStatArchetype";

export class CharacterArtisans extends CharacterStatArchetype<ArtisanKey> {
  constructor(initial?: Partial<Record<ArtisanKey, Partial<StatBlock>>>, defaultBase: number = 6) {
    super(ARTISAN_KEYS, initial, defaultBase);
  }

}
