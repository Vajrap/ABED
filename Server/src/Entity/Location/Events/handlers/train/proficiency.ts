import type { ProficiencyKey } from "../../../../../InterFacesEnumsAndTypes/Enums";
import { TierEnum } from "../../../../../InterFacesEnumsAndTypes/Tiers";
import { rollTwenty } from "../../../../../Utils/Dice";
import { statMod } from "../../../../../Utils/statMod";
import type { Character } from "../../../../Character/Character";
import {
  createNews,
  type NewsContext,
  type News,
} from "../../../../News/News";
import { getExpNeededForStatus } from "./getExpNeeded";
import { gainStatTracker } from "./statTracker";

export function handleTrainProficiency(
  characters: Character[],
  target: ProficiencyKey,
  context: NewsContext,
): News[] {
  let results: News[] = [];
  for (const character of characters) {
    let stat = character.proficiencies.getStat(target);

    if (character.level >= 20) continue;
    const targetStatBase = stat.base;
    if (targetStatBase >= 39) continue;

    const expNeeded = getExpNeededForStatus(targetStatBase);
    const expGained =
      rollTwenty().total +
      statMod(character.attribute.getStat("intelligence").total);

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
      tokens: [
        {
          t: "char",
          v: [
            {
              name: character.name,
              title: character.title.string(),
              fame: character.fame.getString(context.subRegion),
              portrait: character.portrait ? character.portrait : "",
              level: character.level,
            },
          ],
        },
      ],
      context,
      secretTier: TierEnum.common
    });
    results.push(news);
  }
  return results;
}
