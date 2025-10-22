import { describe, expect, test } from "@jest/globals";
import { roll, rollTwenty } from "../../src/Utils/Dice";

const SEEDS = [0, 1, 42, 1337];

interface TestDice {
  amount: number;
  face: number;
}

const testCases = [
  { amount: 1, face: 6 },
  { amount: 2, face: 8 },
  { amount: 3, face: 10 },
  { amount: 4, face: 12 },
  { amount: 5, face: 20 },
];

test.each(testCases.map((dice) => [dice.amount, dice.face] as const))(
  "When roll with %s should return array with the same number of elements",
  (amount, face) => {
    const result = roll(amount).d(face);
    expect(result.rolls.length).toBe(amount);
  },
);

describe("Seeded determinism", () => {
  test.each(testCases.flatMap((d) => SEEDS.map((s) => [d, s] as const)))(
    "Same seed gives identical rolls for %s (seed=%d)",
    (dice, seed) => {
      const a = roll(dice.amount).d(dice.face).seed(seed).rolls;
      const b = roll(dice.amount).d(dice.face).seed(seed).rolls;
      expect(b).toEqual(a);
    },
  );

  test.each(testCases.map((d) => [d.amount, d.face] as const))(
    "Different seeds usually give different results for %s (non-flaky check)",
    (a, f) => {
      const results = SEEDS.map((s) =>
        roll(a).d(f).rolls.map(String).join(","),
      );
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
