import {
  ARTISAN_KEYS,
  ATTRIBUTE_KEYS,
  PROFICIENCY_KEYS,
  type ArtisanKey,
  type AttributeKey,
  type ProficiencyKey,
} from "../../../../InterFacesEnumsAndTypes/Enums";
import { rollTwenty } from "../../../../Utils/Dice";
import { statMod } from "../../../../Utils/statMod";
import type { Character } from "../../Character";
import type { StatBlock } from "./CharacterStatArchetype";

export function trainAttribute(character: Character, key: AttributeKey): Character {
  if (character.level >= 30 || character.attribute.getStat(key).base >= 30) return character;
  return trainInvoker.trainStat(character, character.attribute.getStat(key))
}

export function trainProficiency(character: Character, key: ProficiencyKey): Character {
  if (character.level >= 30 || character.proficiencies.getStat(key).base >= 30) return character;
  return trainInvoker.trainStat(character, character.proficiencies.getStat(key))
}

export function trainArtisan(character: Character, key: ArtisanKey): Character {
  if (character.level >= 30 || character.artisans.getStat(key).base >= 30) return character;
  return trainInvoker.trainStat(character, character.artisans.getStat(key))
}


export function trainStat(character: Character, status: StatBlock): Character {
  const expNeeded = getExpNeededForStat(status.base);

  const rawGain =
    rollTwenty().total +
    statMod(character.attribute.getStat("intelligence").total);
  const expGained = Math.max(rawGain, 0);

  status.exp += expGained;

  if (status.exp >= expNeeded) {
    whenStatup(character, status, expNeeded);
  }

  return character;
}

function whenStatup(
  character: Character,
  status: StatBlock,
  expNeeded: number,
) {
  status.exp -= expNeeded;
  status.base++;
  // update statTracker
  let gain = statMod(status.base);
  if (gain < 1) gain = 1;
  character.statTracker += gain;

  processLevelUps(character);
}

// -- CONSUME STAT TRACKER AND LEVEL UP AS NEEDED
function processLevelUps(character: Character) {
  while (character.level < 30) {
    const needed = character.levelUpStatNeeded;
    if (character.statTracker < needed) break;

    character.statTracker -= needed;
    levelUp(character);
  }

  // if capped, clamp tracker to "full"
  if (character.level >= 30) {
    const needed = character.levelUpStatNeeded;
    character.statTracker = needed;
  }
}

function getExpNeededForStat(base: number): number {
  return getExpNeeded(statMod(base));
}

function getExpNeeded(tier: number): number {
  return 50 + (Math.max(tier, 0) + 1) ** 2 * 20;
}

const crit20 = () => rollTwenty().total === 20;

function levelUp(character: Character): Character {
  character.level++;

  for (const attr of ATTRIBUTE_KEYS) {
    if (crit20()) character.attribute.mutateBase(attr, 1);
  }

  for (const prof of PROFICIENCY_KEYS) {
    if (crit20()) character.proficiencies.mutateBase(prof, 1);
  }

  for (const art of ARTISAN_KEYS) {
    if (crit20()) character.artisans.mutateBase(art, 1);
  }

  return character;
}

export const trainInvoker = {
  trainStat,
};