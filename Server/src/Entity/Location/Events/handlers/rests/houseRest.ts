import type { Character } from "../../../../Character/Character";
import type { NewsContext, NewsWithScope } from "../../../../News/News";
import { normalRest } from "./normalRest";

export function houseRest(
  characters: Character[],
  context: NewsContext,
): NewsWithScope {
  // TODO: real house rest later
  return normalRest(characters, context);
}
