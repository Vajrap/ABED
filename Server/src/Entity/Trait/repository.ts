import {TraitEnum} from "src/Entity/Trait/enum";
import {Trait} from "src/Entity/Trait/index";
import {traitGoblinCunning} from "src/Entity/Trait/definition/traitGoblinCunning";
import {traitPackInstinct} from "src/Entity/Trait/definition/traitPackInstinct";
import {traitScrapSurvivalist} from "src/Entity/Trait/definition/traitScrapSurvivalist";

export const traitRepository: Record<TraitEnum, Trait> = {
    [TraitEnum.GoblinCunning]: traitGoblinCunning,
    [TraitEnum.PackInstinct]: traitPackInstinct,
    [TraitEnum.ScrapSurvivalist]: traitScrapSurvivalist
}