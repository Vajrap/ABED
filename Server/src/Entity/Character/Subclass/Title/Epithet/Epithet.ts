import type { Character } from "../../../Character";
import type { CharacterEpithetEnum } from "./enum";

export class Epithet {
  id: CharacterEpithetEnum;
  name: string;
  active: (char: Character) => void;
  deactive: (char: Character) => void;
  constructor(
    id: CharacterEpithetEnum,
    name: string,
    active: (char: Character) => void,
    deactive: (char: Character) => void,
  ) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.deactive = deactive;
  }
}
