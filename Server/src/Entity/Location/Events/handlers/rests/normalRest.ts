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
}
