import { TierEnum } from "../../../../../InterFacesEnumsAndTypes/Tiers";
import type { Character } from "../../../../Character/Character";
import {
  createNews,
  type NewsContext,
  type NewsWithScope,
} from "../../../../News/News";
import { applyRestBenefits } from "./applyRestBenefits";

export function normalRest(
  character: Character,
  context: NewsContext,
): NewsWithScope {
  applyRestBenefits(character, 1);
  const news = createNews({
    scope: { kind: "privateScope", characterId: character.id },
    tokens: [
      {
        t: "char",
        v: [character.intoNewsInterface(context.subRegion)],
      },
      { t: "text", v: `has taken a rest` },
    ],
    context,
    secretTier: TierEnum.rare,
  });
  return {
    scope: {
      kind: "privateScope",
      characterId: character.id,
    },
    news: news,
  };
}
