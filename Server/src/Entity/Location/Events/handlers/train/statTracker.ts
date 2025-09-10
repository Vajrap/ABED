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
    character.levelUp();
    levelUpStatNeeded = getLevelUpStatNeeded(character); // Update required stats for new level
  }

  if (character.level === 30) {
    character.statTracker = levelUpStatNeeded; // Ensure exp is maxed at level 20
  }
}

// Method to get the experience needed for the next level
function getLevelUpStatNeeded(character: Character): number {
  return 5 + character.level * 2;
}
