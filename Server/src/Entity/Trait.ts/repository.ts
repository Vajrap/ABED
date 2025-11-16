import {TraitEnum} from "src/Entity/Trait.ts/enum.ts";
import {Trait} from "src/Entity/Trait.ts/index.ts";
import {traitGoblinCunning} from "src/Entity/Trait.ts/definition/traitGoblinCunning.ts";
import {traitPackInstinct} from "src/Entity/Trait.ts/definition/traitPackInstinct.ts";
import {traitScrapSurvivalist} from "src/Entity/Trait.ts/definition/traitScrapSurvivalist.ts";

export const traitRepository: Record<TraitEnum, Trait> = {
    [TraitEnum.GoblinCunning]: traitGoblinCunning,
    [TraitEnum.PackInstinct]: traitPackInstinct,
    [TraitEnum.ScrapSurvivalist]: traitScrapSurvivalist
}