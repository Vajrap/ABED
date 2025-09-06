import type { Character } from "../../../../Character/Character";
import {
  createNews,
  type NewsContext,
  type NewsWithScope,
} from "../../../../News/News";
import { applyRestBenefits } from "./applyRestBenefits";

export function normalRest(
  characters: Character[],
  context: NewsContext,
): NewsWithScope {
  applyRestBenefits(characters, 1);
  const news = createNews({
    scope: { kind: "private", characterIds: characters.map((c) => c.id) },
    tokens: [
      {
        t: "char",
        v: characters.map((c) => c.intoNewsInterface(context.subRegion)),
      },
      { t: "text", v: `has taken a rest` },
    ],
    context,
  });
  return {
    scope: {
      kind: "private",
      characterIds: context.characterIds,
    },
    news: news,
  };
}
