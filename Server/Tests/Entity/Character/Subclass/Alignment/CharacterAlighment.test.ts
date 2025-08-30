import { describe, expect, test } from "bun:test";
import { CharacterAlignment } from "../../../../../src/Entity/Character/Subclass/Alignment/CharacterAlignment";
import { CharacterAlignmentEnum } from "../../../../../src/InterFacesEnumsAndTypes/Enums";


type TestCase = {
  input: { law?: number; chaos?: number; good?: number; evil?: number };
  expected: CharacterAlignmentEnum;
  description: string;
};

const testCases: TestCase[] = [
  {
    input: { law: 10, good: 10 },
    expected: CharacterAlignmentEnum.NEUTRAL_NEUTRAL, // diff not > 10
    description: "law=10, good=10 should be neutral-neutral",
  },
  {
    input: { law: 11, good: 11 },
    expected: CharacterAlignmentEnum.LAWFUL_GOOD,
    description: "law and good >10 difference should be lawful good",
  },
  {
    input: { chaos: 20, good: 5 },
    expected: CharacterAlignmentEnum.CHAOTIC_NEUTRAL,
    description: "chaos dominates with small good",
  },
  {
    input: { law: 30, chaos: 30 },
    expected: CharacterAlignmentEnum.NEUTRAL_NEUTRAL,
    description: "law and chaos cancel out equally",
  },
  {
    input: { evil: 50, good: 30 },
    expected: CharacterAlignmentEnum.NEUTRAL_EVIL,
    description: "evil - good > 10 should result in evil alignment",
  },
  {
    input: { law: 25, chaos: 5, good: 0, evil: 0 },
    expected: CharacterAlignmentEnum.LAWFUL_NEUTRAL,
    description: "strong lawful leaning only",
  },
  {
    input: { law: 0, chaos: 0, good: 100, evil: 89 },
    expected: CharacterAlignmentEnum.NEUTRAL_GOOD,
    description: "good - evil = 11, just over threshold",
  },
  {
    input: { law: 0, chaos: 0, good: 10, evil: 0 },
    expected: CharacterAlignmentEnum.NEUTRAL_NEUTRAL,
    description: "good - evil = 10, should not cross threshold",
  },
  {
    input: { law: 1000, chaos: 0, good: 0, evil: 1000 },
    expected: CharacterAlignmentEnum.LAWFUL_EVIL,
    description: "maximal extreme split",
  },
];

describe("CharacterAlignment.alignment()", () => {
  for (const { input, expected, description } of testCases) {
    test(description, () => {
      const alignment = new CharacterAlignment({
        law: input.law ?? 0,
        chaos: input.chaos ?? 0,
        good: input.good ?? 0,
        evil: input.evil ?? 0,
      });
      expect(alignment.alignment()).toBe(expected);
    });
  }
});
