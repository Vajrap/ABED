import type { ArtisanKey } from "src/InterFacesEnumsAndTypes/Enums.ts";
import { rollTwenty } from "src/Utils/Dice.ts";
import { statMod } from "src/Utils/statMod.ts";
import type { Character } from "../../../../Character/Character";
import {
  createNews,
  type NewsContext,
  type News,
} from "../../../../News/News";
import { getExpNeededForStatus } from "./getExpNeeded";
import { gainStatTracker } from "./statTracker";

export function handleTrainArtisans(
  characters: Character[],
  target: ArtisanKey,
  context: NewsContext,
): News[] {
  let results: News[] = [];
  for (const character of characters) {
    let stat = character.artisans.getStat(target);

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

      // {
      //     en: `[char:${character.id}]${character.name}[/char] has taken a rest`,
      //         th: `[char:${character.id}]${character.name}[/char] พักผ่อน`
      // },
      // {
      //     characters: [character]  // ← Auto-generates tooltip!
      // }
    const news = createNews({
        content: {
            en: `[char:${character.id}]${character.name.en} has trained in ${target}`,
            th: `[char:${character.id}]${character.name.th} ได้ฝึกฝน ${target}`,
        },
        scope: {
            kind: "privateScope",
            characterId: character.id,
        },
      context
    });
    results.push(news);
  }
  return results;
}
