import type { CharacterEpithetEnum } from "./Epithet/enum";
import type { CharacterRoleEnum } from "./Role/enum";
import type {L10N} from "src/InterFacesEnumsAndTypes/L10N.ts";
import {epithetRepository} from "src/Entity/Character/Subclass/Title/Epithet/repository.ts";
import {roleRepository} from "src/Entity/Character/Subclass/Title/Role/repository.ts";

export class CharacterTitle {
  epithet?: CharacterEpithetEnum;
  role?: CharacterRoleEnum;
  constructor(epithet?: CharacterEpithetEnum, role?: CharacterRoleEnum) {
    this.epithet = epithet;
    this.role = role;
  }

  string(): L10N {
      let epithetObj = this.epithet ? epithetRepository.get(this.epithet) : undefined;
      let epithetName
      let roleObj = this.role ? roleRepository.get(this.role) : undefined;
      let roleName

      if (epithetObj) {
          epithetName = epithetObj.name
      } else {
          epithetName = {en: "", th: ""}
      }

      if (roleObj) {
          roleName = roleObj.name
      } else {
          roleName = {en: "", th: ""}
      }

      return {
          en: `${epithetName.en} ${roleName.en}`,
          th: `${epithetName.th} ${roleName.th}`,
      }
  }
}
