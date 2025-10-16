import type { Character } from "../../../../Character/Character";
import type { NewsContext, News } from "../../../../News/News";
import { normalRest } from "./normalRest";

export function houseRest(
  characters: Character[],
  context: NewsContext,
): News[] {
  // TODO: real house rest later
  return characters.map(character => normalRest(character, context));
}
