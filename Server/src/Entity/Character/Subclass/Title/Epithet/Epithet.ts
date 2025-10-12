import type { Character } from "../../../Character";
import type { CharacterEpithetEnum } from "./enum";

export class Epithet {
  id: CharacterEpithetEnum;
  active: (char: Character) => void;
  deactive: (char: Character) => void;
  constructor(
    id: CharacterEpithetEnum,
    active: (char: Character) => void = () => {},
    deactive: (char: Character) => void = () => {},
  ) {
    this.id = id;
    this.active = active;
    this.deactive = deactive;
  }
}
