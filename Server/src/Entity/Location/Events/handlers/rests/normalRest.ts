import { NewsPropagation, NewsSignificance } from "src/InterFacesEnumsAndTypes/NewsEnums";
import { TierEnum } from "../../../../../InterFacesEnumsAndTypes/Tiers";
import type { Character } from "../../../../Character/Character";
import {
  createNews,
  type NewsContext,
  type News,
} from "../../../../News/News";
import { applyRestBenefits } from "./applyRestBenefits";

export function normalRest(
  character: Character,
  context: NewsContext,
): News {
  applyRestBenefits(character, 1);
  return createNews({
    scope: { kind: "privateScope", characterId: character.id },
    content: {
      en: `[char:${character.id}]${character.name}[/char] has taken a rest`,
      th: `[char:${character.id}]${character.name}[/char] ได้พักผ่อน`
    },
    context,
    significance: NewsSignificance.TRIVIAL,
    propagation: NewsPropagation.LOCAL
  });
}
