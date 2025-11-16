import { Skill } from "src/Entity/Skill/Skill";
import { ClassEnum } from "src/InterFacesEnumsAndTypes/Enums";

export class WarriorSkill extends Skill {
    class?: ClassEnum = ClassEnum.Warrior
}