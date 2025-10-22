import { expect, test } from "@jest/globals";
import { statMod } from "../../src/Utils/statMod";

const testCases = [
  { input: 1, expected: -5 },
  { input: 2, expected: -4 },
  { input: 3, expected: -4 },
  { input: 4, expected: -3 },
  { input: 5, expected: -3 },
  { input: 6, expected: -2 },
  { input: 7, expected: -2 },
  { input: 8, expected: -1 },
  { input: 9, expected: -1 },
  { input: 10, expected: 0 },
  { input: 11, expected: 0 },
  { input: 12, expected: 1 },
  { input: 13, expected: 1 },
  { input: 14, expected: 2 },
  { input: 15, expected: 2 },
  { input: 16, expected: 3 },
  { input: 17, expected: 3 },
  { input: 18, expected: 4 },
  { input: 19, expected: 4 },
  { input: 20, expected: 5 },
  { input: 21, expected: 5 },
  { input: 22, expected: 6 },
  { input: 23, expected: 6 },
  { input: 24, expected: 7 },
  { input: 25, expected: 7 },
  { input: 26, expected: 8 },
  { input: 27, expected: 8 },
  { input: 28, expected: 9 },
  { input: 29, expected: 9 },
  { input: 30, expected: 10 },
];

test.each(testCases)(
  "statMod should return expected value",
  (testCase) => {
    const result = statMod(testCase.input);
    expect(result).toBe(testCase.expected);
  },
);
