import type { ProficiencyKey } from "../../../../../InterFacesEnumsAndTypes/Enums";
import {
  NewsSignificance,
  NewsPropagation,
} from "../../../../../InterFacesEnumsAndTypes/NewsEnums";
import { rollTwenty } from "../../../../../Utils/Dice";
import { statMod } from "../../../../../Utils/statMod";
import type { Character } from "../../../../Character/Character";
import { createNews, type NewsContext, type News } from "../../../../News/News";
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
        en: `[char:${character.id}]${character.name.en}[/char] trained proficiency [proficiency:${target}]${target}[/proficiency]`,
        th: `[char:${character.id}]${character.name.th}[/char] ฝึกฝนความชำนาญ [proficiency:${target}]${target}[/proficiency]`,
      },
      context,
      significance: NewsSignificance.MINOR,
      propagation: NewsPropagation.PRIVATE,
    });
    results.push(news);
  }
  return results;
}
