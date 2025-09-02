import type { Character } from "../../../Character";
import type { CharacterRoleEnum } from "./enum";

export class Role {
  id: CharacterRoleEnum;
  name: string;
  active: (char: Character) => void;
  deactive: (char: Character) => void;
  constructor(
    id: CharacterRoleEnum,
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
