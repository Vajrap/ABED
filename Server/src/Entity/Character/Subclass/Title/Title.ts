import type { CharacterEpithetEnum } from "./Epithet/enum";
import type { CharacterRoleEnum } from "./Role/enum";

export class CharacterTitle {
  epithet?: CharacterEpithetEnum;
  role?: CharacterRoleEnum;
  constructor(epithet?: CharacterEpithetEnum, role?: CharacterRoleEnum) {
    this.epithet = epithet;
    this.role = role;
  }
  
  string(): string {
    return `${this.epithet} ${this.role}`;
  }
}
