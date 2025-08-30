import type { DiceEnum } from "../InterFacesEnumsAndTypes/Enums";

export function rollDice(
  diceEnum: DiceEnum | string,
  seed?: number
): DiceRollResult {
  const dice: string = diceEnum; // The Enums is just like { "1d4", "1d8"...}
  let [diceCount, diceSides] = dice.split("d").map(Number);
  if (!diceCount || !diceSides) {
    throw new Error("Invalid dice format");
  }

  const rng = seed !== undefined ? seededRNG(seed) : Math.random;

  let rolls = Array.from(
    { length: diceCount },
    () => Math.floor(rng() * diceSides) + 1,
  );

  return new DiceRollResult(rolls);
}

export function rollTwenty(seed?: number): DiceRollResult {
  return rollDice("1d20", seed);
}

class DiceRollResult {
  rolls: number[];
  constructor(rolls: number[]) {
    this.rolls = rolls;
  }

  get total(): number {
    return this.rolls.reduce((acc, curr) => acc + curr, 0);
  }
}

function seededRNG(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 0x100000000;
  }
}