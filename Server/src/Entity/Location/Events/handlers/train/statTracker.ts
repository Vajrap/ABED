import {
  ARTISAN_KEYS,
  ATTRIBUTE_KEYS,
  PROFICIENCY_KEYS,
  type ArtisanKey,
  type AttributeKey,
  type ProficiencyKey,
} from "../../../../../InterFacesEnumsAndTypes/Enums";
import { Character } from "../../../../Character/Character";

export function gainStatTracker(character: Character, statValue: number): void {
  let levelUpStatNeeded = getLevelUpStatNeeded(character);

  if (character.level >= 30) {
    character.statTracker = levelUpStatNeeded; // Level capped at 30
    return;
  }

  character.statTracker += statValue;

  while (character.statTracker >= levelUpStatNeeded && character.level < 30) {
    character.statTracker -= levelUpStatNeeded; // Keep excess points
    characterLevelUp(character);
    levelUpStatNeeded = getLevelUpStatNeeded(character); // Update required stats for new level
  }

  if (character.level === 30) {
    character.statTracker = levelUpStatNeeded; // Ensure exp is maxed at level 20
  }
}

function getLevelUpStatNeeded(character: Character): number {
  return 5 + character.level * 2;
}

function randomPick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function grantStat(character: Character) {
  const pools = {
    attributes: ATTRIBUTE_KEYS,
    artisans: ARTISAN_KEYS,
    proficiencies: PROFICIENCY_KEYS,
  } as const;

  while (true) {
    const category = randomPick(Object.keys(pools) as (keyof typeof pools)[]);
    const key = randomPick(pools[category]);
    const stat =
      category === "attributes"
        ? character.attribute.getStat(key as AttributeKey)
        : category === "artisans"
          ? character.artisans.getStat(key as ArtisanKey)
          : character.proficiencies.getStat(key as ProficiencyKey);

    if (stat.base < 20) {
      stat.base += 1;
      return; // done
    }
    // else reroll
  }
}

function characterLevelUp(character: Character) {
  grantStat(character);
  character.level += 1;
}
