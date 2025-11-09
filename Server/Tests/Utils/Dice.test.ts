import { describe, expect, test, afterEach } from "@jest/globals";
import { roll, rollTwenty } from "../../src/Utils/Dice";

const mockMathRandomSequence = (values: number[]) => {
  let index = 0;
  return jest.spyOn(Math, "random").mockImplementation(() => {
    const value =
      index < values.length ? values[index] : values[values.length - 1] ?? 0;
    index = Math.min(index + 1, values.length);
    if (value === undefined) {
      throw new Error("Math.random returned undefined");
    }
    return value;
  });
};

afterEach(() => {
  jest.restoreAllMocks();
});

describe("roll()", () => {
  test("uses Math.random to generate expected rolls and aggregates correctly", () => {
    const spy = mockMathRandomSequence([0, 0.5, 0.999]);

    const dice = roll(3);

    expect(spy).toHaveBeenCalledTimes(3);
    expect(dice.rolls).toEqual([1, 4, 6]);
    expect(dice.total).toBe(11);
    expect(dice.highest()).toBe(6);
    expect(dice.lowest()).toBe(1);
    expect(dice.highest(2)).toEqual([6, 4]);
    expect(dice.lowest(2)).toEqual([1, 4]);
  });

  test("re-rolling with different faces respects range limits", () => {
    const spy = mockMathRandomSequence([0.2, 0.7, 0.1, 0.9]);

    const dice = roll(2).d(10);

    expect(spy).toHaveBeenCalledTimes(4);
    expect(dice.rolls.length).toBe(2);
    expect(dice.rolls[0]).toBeGreaterThanOrEqual(1);
    expect(dice.rolls[0]).toBeLessThanOrEqual(10);
    expect(dice.rolls[1]).toBeGreaterThanOrEqual(1);
    expect(dice.rolls[1]).toBeLessThanOrEqual(10);
  });
});

describe("rollTwenty()", () => {
  test("returns one d20 result in Inclusive range", () => {
    const spy = mockMathRandomSequence([0.4]);

    const dice = rollTwenty();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(dice.rolls.length).toBe(1);
    expect(dice.rolls[0]).toBeGreaterThanOrEqual(1);
    expect(dice.rolls[0]).toBeLessThanOrEqual(20);
  });
});
