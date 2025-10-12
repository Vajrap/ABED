import type { Character } from "../../../Character";
import type { CharacterRoleEnum } from "./enum";

export class Role {
  id: CharacterRoleEnum;
  active: (char: Character) => void;
  deactive: (char: Character) => void;
  constructor(
    id: CharacterRoleEnum,
    active: (char: Character) => void = () => {},
    deactive: (char: Character) => void = () => {},
  ) {
    this.id = id;
    this.active = active;
    this.deactive = deactive;
  }
}
