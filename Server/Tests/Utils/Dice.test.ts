import { describe, expect, test } from "bun:test";
import { rollDice, rollTwenty } from "../../src/Utils/Dice";
import { DiceEnum } from "../../src/InterFacesEnumsAndTypes/Enums";

const SEEDS = [0, 1, 42, 1337] as const;

test.each(DiceEnum.map((d) => [d] as const))(
  "When roll with %s should return array with the same number of elements",
  (dice: (typeof DiceEnum)[number]) => {
    const [count] = dice.split("d").map(Number) as [number, number];
    const result = rollDice(dice);
    expect(result.rolls.length).toBe(count);
  },
);

describe("Seeded determinism", () => {
  test.each(
    DiceEnum.flatMap((d) => SEEDS.map((s) => [d, s] as const))
  )("Same seed gives identical rolls for %s (seed=%d)", (dice, seed) => {
    const a = rollDice(dice, seed).rolls;
    const b = rollDice(dice, seed).rolls;
    expect(b).toEqual(a);
  });

  test.each(DiceEnum.map((d) => [d] as const))(
    "Different seeds usually give different results for %s (non-flaky check)",
    (dice) => {
      const results = SEEDS.map((s) => rollDice(dice, s).rolls.map(String).join(","));
      const unique = new Set(results);
      expect(unique.size).toBeGreaterThan(1);
    },
  );
});

describe("rollTwenty", () => {
  test("returns a single d20 result within [1,20]", () => {
    const r = rollTwenty(123);
    expect(r.rolls.length).toBe(1);
    expect(r.rolls[0]).toBeGreaterThanOrEqual(1);
    expect(r.rolls[0]).toBeLessThanOrEqual(20);
  });
});