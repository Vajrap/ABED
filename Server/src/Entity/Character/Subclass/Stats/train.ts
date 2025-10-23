import {
  ARTISAN_KEYS,
  ATTRIBUTE_KEYS,
  PROFICIENCY_KEYS,
  type ArtisanKey,
  type AttributeKey,
  type ProficiencyKey,
} from "src/InterFacesEnumsAndTypes/Enums.ts";
import { rollTwenty } from "src/Utils/Dice.ts";
import { statMod } from "src/Utils/statMod.ts";
import type { Character } from "../../Character";
import { addBaseVitals } from "../Vitals/addBaseVitals";
import type { StatBlock } from "./CharacterStatArchetype";

export function trainAttribute(
  character: Character,
  key: AttributeKey,
  additionalExp: number
): Character {
  if (character.level >= 30 || character.attribute.getStat(key).base >= 30)
    return character;
  return trainInvoker.trainStat(character, character.attribute.getStat(key), additionalExp);
}

export function trainProficiency(
  character: Character,
  key: ProficiencyKey,
  additionalExp: number
): Character {
  if (character.level >= 30 || character.proficiencies.getStat(key).base >= 30)
    return character;
  return trainInvoker.trainStat(
    character,
    character.proficiencies.getStat(key),
    additionalExp
  );
}

export function trainArtisan(character: Character, key: ArtisanKey, additionalExp: number): Character {
  if (character.level >= 30 || character.artisans.getStat(key).base >= 30)
    return character;
  return trainInvoker.trainStat(character, character.artisans.getStat(key), additionalExp);
}

export function trainStat(character: Character, status: StatBlock, additionalExp: number): Character {
  const expNeeded = getExpNeededForStat(status.base);

  const rawGain =
    rollTwenty().total +
    statMod(character.attribute.getStat("intelligence").total);
  const expGained = Math.max(rawGain, 0) + additionalExp;

  status.exp += expGained;

  if (status.exp >= expNeeded) {
    whenStatUp(character, status, expNeeded);
  }

  return character;
}

function whenStatUp(
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
  while (true) {
    const needed = 5 + character.level * 2;
    if (character.statTracker < needed) break;

    character.statTracker -= needed;
    levelUp(character);
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

  addBaseVitals(character);

  return character;
}

export const trainInvoker = {
  trainStat,
};
