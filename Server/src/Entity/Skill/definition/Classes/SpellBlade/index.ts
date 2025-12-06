import { Skill } from "src/Entity/Skill/Skill";
import { ClassEnum } from "src/InterFacesEnumsAndTypes/Enums";

type SkillConfig = ConstructorParameters<typeof Skill>[0];

export class SpellbladeSkill extends Skill {
  constructor(data: SkillConfig) {
    super({ ...data, class: ClassEnum.Spellblade });
  }
}
