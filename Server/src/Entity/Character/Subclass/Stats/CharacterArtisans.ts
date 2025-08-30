import {
  ARTISAN_KEYS,
  type ArtisanKey,
} from "../../../../InterFacesEnumsAndTypes/Enums";
import { CharacterStatArchetype, StatBlock } from "./CharacterStatArchetype";

export class CharacterArtisans extends CharacterStatArchetype<ArtisanKey> {
  constructor(initial?: Partial<Record<ArtisanKey, Partial<StatBlock>>>) {
    super(ARTISAN_KEYS, initial);
  }

  static fromJSON(data: any): CharacterArtisans {
    return new CharacterArtisans(data);
  }
}
