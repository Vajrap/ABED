import type { Character } from "../../../Character";

export class TitleCombination {
  role: string;
  epithet: string;
  active: (char: Character) => void;
  deactivate: (char: Character) => void;
  constructor(
    role: string,
    epithet: string,
    active: (char: Character) => void,
    deactivate: (char: Character) => void,
  ) {
    this.role = role;
    this.epithet = epithet;
    this.active = active;
    this.deactivate = deactivate;
  }
}
