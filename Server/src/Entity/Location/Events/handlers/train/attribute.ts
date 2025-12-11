import type { AttributeKey } from "src/InterFacesEnumsAndTypes/Enums.ts";
import { rollTwenty } from "src/Utils/Dice.ts";
import { statMod } from "src/Utils/statMod.ts";
import type { Character } from "../../../../Character/Character";
import { createNews, type NewsContext, type News } from "../../../../News/News";
import { getExpNeededForStatus } from "./getExpNeeded";
import { gainStatTracker } from "./statTracker";

export function handleTrainAttribute(
  characters: Character[],
  target: AttributeKey,
  context: NewsContext,
): News[] {
  let results: News[] = [];
  for (const character of characters) {
    let stat = character.attribute.getStat(target);

    if (character.level >= 20) continue;
    const targetStatBase = stat.base;
    if (targetStatBase >= 39) continue;

    const expNeeded = getExpNeededForStatus(targetStatBase);
    const expGained =
      rollTwenty().total +
      statMod(character.attribute.getStat("intelligence").total);

    // Apply needs changes: Energy -6, Mood -2 (strenuous activity)
    character.needs.decEnergy(6);
    character.needs.decMood(2);

    stat.exp += expGained;
    if (stat.exp >= expNeeded) {
      stat.exp -= expNeeded;
      stat.base += 1;

      const statTrackGain = Math.max(statMod(stat.base), 0) + 1;

      gainStatTracker(character, statTrackGain);
    }
    const news = createNews({
      scope: {
        kind: "partyScope",
        partyId: context.partyId,
      },
      content: {
        en: "",
        th: "",
      },
      context,
    });
    results.push(news);
  }
  return results;
}
