import { Skill } from "src/Entity/Skill/Skill";
import { ClassEnum } from "src/InterFacesEnumsAndTypes/Enums";

export class BarbarianSkill extends Skill {
    class: ClassEnum = ClassEnum.Barbarian;
}