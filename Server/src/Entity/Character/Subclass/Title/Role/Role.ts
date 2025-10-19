import type { Character } from "../../../Character";
import type { CharacterRoleEnum } from "./enum";

export class Role {
  id: CharacterRoleEnum;
  name: {en: string; th: string};
  active: (char: Character) => void;
  deactivate: (char: Character) => void;
  constructor(
    id: CharacterRoleEnum,
    name: {en: string; th: string},
    active: (char: Character) => void = () => {},
    deactive: (char: Character) => void = () => {},
  ) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.deactivate = deactive;
  }
}
