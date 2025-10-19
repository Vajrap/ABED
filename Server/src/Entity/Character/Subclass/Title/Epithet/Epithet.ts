import type { Character } from "../../../Character";
import type { CharacterEpithetEnum } from "./enum";

export class Epithet {
  id: CharacterEpithetEnum;
  name: {en: string, th: string};
  active: (char: Character) => void;
  deactivate: (char: Character) => void;
  constructor(
    id: CharacterEpithetEnum,
    name: {en: string, th: string},
    active: (char: Character) => void = () => {},
    deactivate: (char: Character) => void = () => {},
  ) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.deactivate = deactivate;
  }
}
