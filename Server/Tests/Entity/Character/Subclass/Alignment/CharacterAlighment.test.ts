import { describe, expect, test } from "@jest/globals";
import { CharacterAlignment } from "../../../../../src/Entity/Character/Subclass/Alignment/CharacterAlignment";
import { CharacterAlignmentEnum } from "../../../../../src/InterFacesEnumsAndTypes/Enums";

type TestCase = {
  input: { good?: number; evil?: number };
  expected: CharacterAlignmentEnum;
  description: string;
};

describe("CharacterAlignment", () => {
  describe("Constructor", () => {
    test("should initialize with default values", () => {
      const alignment = new CharacterAlignment({});
      expect(alignment.good).toBe(0);
      expect(alignment.evil).toBe(0);
    });

    test("should initialize with provided good value", () => {
      const alignment = new CharacterAlignment({ good: 50 });
      expect(alignment.good).toBe(50);
      expect(alignment.evil).toBe(0);
    });

    test("should initialize with provided evil value", () => {
      const alignment = new CharacterAlignment({ evil: 75 });
      expect(alignment.good).toBe(0);
      expect(alignment.evil).toBe(75);
    });

    test("should initialize with both good and evil values", () => {
      const alignment = new CharacterAlignment({ good: 40, evil: 60 });
      expect(alignment.good).toBe(40);
      expect(alignment.evil).toBe(60);
    });
  });

  describe("alignment()", () => {
    describe("Initiate (default state)", () => {
      const initiateTests: TestCase[] = [
        {
          input: { good: 0, evil: 0 },
          expected: CharacterAlignmentEnum.Initiate,
          description: "both values at 0 should be Initiate",
        },
        {
          input: { good: 15, evil: 10 },
          expected: CharacterAlignmentEnum.Initiate,
          description: "low good value (15) should be Initiate",
        },
        {
          input: { good: 10, evil: 25 },
          expected: CharacterAlignmentEnum.Initiate,
          description: "low evil value (25) should be Initiate",
        },
        {
          input: { good: 29, evil: 0 },
          expected: CharacterAlignmentEnum.Initiate,
          description: "good at threshold (29) should be Initiate",
        },
        {
          input: { good: 0, evil: 29 },
          expected: CharacterAlignmentEnum.Initiate,
          description: "evil at threshold (29) should be Initiate",
        },
        {
          input: { good: 29, evil: 29 },
          expected: CharacterAlignmentEnum.Initiate,
          description: "both at threshold (29) should be Initiate",
        },
      ];

      initiateTests.forEach(({ input, expected, description }) => {
        test(description, () => {
          const alignment = new CharacterAlignment(input);
          expect(alignment.alignment()).toBe(expected);
        });
      });
    });

    describe("Good Ladder", () => {
      const goodTests: TestCase[] = [
        {
          input: { good: 30, evil: 0 },
          expected: CharacterAlignmentEnum.Kind,
          description: "good 30 should be Kind",
        },
        {
          input: { good: 35, evil: 10 },
          expected: CharacterAlignmentEnum.Kind,
          description: "good 35, evil 10 should be Kind",
        },
        {
          input: { good: 49, evil: 0 },
          expected: CharacterAlignmentEnum.Kind,
          description: "good at upper threshold (49) should be Kind",
        },
        {
          input: { good: 50, evil: 0 },
          expected: CharacterAlignmentEnum.Noble,
          description: "good 50 should be Noble",
        },
        {
          input: { good: 60, evil: 15 },
          expected: CharacterAlignmentEnum.Noble,
          description: "good 60, evil 15 should be Noble",
        },
        {
          input: { good: 69, evil: 0 },
          expected: CharacterAlignmentEnum.Noble,
          description: "good at upper threshold (69) should be Noble",
        },
        {
          input: { good: 70, evil: 0 },
          expected: CharacterAlignmentEnum.Saint,
          description: "good 70 should be Saint",
        },
        {
          input: { good: 80, evil: 20 },
          expected: CharacterAlignmentEnum.Saint,
          description: "good 80, evil 20 should be Saint",
        },
        {
          input: { good: 89, evil: 0 },
          expected: CharacterAlignmentEnum.Saint,
          description: "good at upper threshold (89) should be Saint",
        },
        {
          input: { good: 90, evil: 0 },
          expected: CharacterAlignmentEnum.Divine,
          description: "good 90 should be Divine",
        },
        {
          input: { good: 100, evil: 25 },
          expected: CharacterAlignmentEnum.Divine,
          description: "good 100, evil 25 should be Divine",
        },
      ];

      goodTests.forEach(({ input, expected, description }) => {
        test(description, () => {
          const alignment = new CharacterAlignment(input);
          expect(alignment.alignment()).toBe(expected);
        });
      });
    });

    describe("Evil Ladder", () => {
      const evilTests: TestCase[] = [
        {
          input: { good: 0, evil: 30 },
          expected: CharacterAlignmentEnum.Cruel,
          description: "evil 30 should be Cruel",
        },
        {
          input: { good: 10, evil: 35 },
          expected: CharacterAlignmentEnum.Cruel,
          description: "good 10, evil 35 should be Cruel",
        },
        {
          input: { good: 0, evil: 49 },
          expected: CharacterAlignmentEnum.Cruel,
          description: "evil at upper threshold (49) should be Cruel",
        },
        {
          input: { good: 0, evil: 50 },
          expected: CharacterAlignmentEnum.Vile,
          description: "evil 50 should be Vile",
        },
        {
          input: { good: 15, evil: 60 },
          expected: CharacterAlignmentEnum.Vile,
          description: "good 15, evil 60 should be Vile",
        },
        {
          input: { good: 0, evil: 69 },
          expected: CharacterAlignmentEnum.Vile,
          description: "evil at upper threshold (69) should be Vile",
        },
        {
          input: { good: 0, evil: 70 },
          expected: CharacterAlignmentEnum.Tyrant,
          description: "evil 70 should be Tyrant",
        },
        {
          input: { good: 20, evil: 80 },
          expected: CharacterAlignmentEnum.Tyrant,
          description: "good 20, evil 80 should be Tyrant",
        },
        {
          input: { good: 0, evil: 89 },
          expected: CharacterAlignmentEnum.Tyrant,
          description: "evil at upper threshold (89) should be Tyrant",
        },
        {
          input: { good: 0, evil: 90 },
          expected: CharacterAlignmentEnum.Infernal,
          description: "evil 90 should be Infernal",
        },
        {
          input: { good: 25, evil: 100 },
          expected: CharacterAlignmentEnum.Infernal,
          description: "good 25, evil 100 should be Infernal",
        },
      ];

      evilTests.forEach(({ input, expected, description }) => {
        test(description, () => {
          const alignment = new CharacterAlignment(input);
          expect(alignment.alignment()).toBe(expected);
        });
      });
    });

    describe("Chaotic Ladder", () => {
      const chaoticTests: TestCase[] = [
        {
          input: { good: 30, evil: 30 },
          expected: CharacterAlignmentEnum.Mad,
          description: "good 30, evil 30 (avg 30) should be Mad",
        },
        {
          input: { good: 35, evil: 35 },
          expected: CharacterAlignmentEnum.Mad,
          description: "good 35, evil 35 (avg 35) should be Mad",
        },
        {
          input: { good: 45, evil: 35 },
          expected: CharacterAlignmentEnum.Mad,
          description: "good 45, evil 35 (avg 40, diff 10) should be Mad",
        },
        {
          input: { good: 55, evil: 30 },
          expected: CharacterAlignmentEnum.Mad,
          description: "good 55, evil 30 (avg 42.5, diff 25) should be Mad",
        },
        {
          input: { good: 58, evil: 30 },
          expected: CharacterAlignmentEnum.Mad,
          description: "good 58, evil 30 (avg 44, diff 28) should be Mad",
        },
        {
          input: { good: 50, evil: 50 },
          expected: CharacterAlignmentEnum.Lunatic,
          description: "good 50, evil 50 (avg 50) should be Lunatic",
        },
        {
          input: { good: 60, evil: 45 },
          expected: CharacterAlignmentEnum.Lunatic,
          description: "good 60, evil 45 (avg 52.5, diff 15) should be Lunatic",
        },
        {
          input: { good: 70, evil: 70 },
          expected: CharacterAlignmentEnum.Maniac,
          description: "good 70, evil 70 (avg 70) should be Maniac",
        },
        {
          input: { good: 80, evil: 55 },
          expected: CharacterAlignmentEnum.Lunatic,
          description: "good 80, evil 55 (avg 67.5, diff 25) should be Lunatic",
        },
        {
          input: { good: 90, evil: 90 },
          expected: CharacterAlignmentEnum.Anarch,
          description: "good 90, evil 90 (avg 90) should be Anarch",
        },
        {
          input: { good: 100, evil: 85 },
          expected: CharacterAlignmentEnum.Anarch,
          description: "good 100, evil 85 (avg 92.5, diff 15) should be Anarch",
        },
      ];

      chaoticTests.forEach(({ input, expected, description }) => {
        test(description, () => {
          const alignment = new CharacterAlignment(input);
          expect(alignment.alignment()).toBe(expected);
        });
      });
    });

    describe("Edge cases for chaotic condition", () => {
      test("should not be chaotic when difference >= 30", () => {
        const alignment = new CharacterAlignment({ good: 60, evil: 30 }); // diff = 30
        expect(alignment.alignment()).toBe(CharacterAlignmentEnum.Noble); // good path
      });

      test("should not be chaotic when good < 30", () => {
        const alignment = new CharacterAlignment({ good: 29, evil: 30 }); // diff < 30 but good < 30
        expect(alignment.alignment()).toBe(CharacterAlignmentEnum.Cruel); // evil path
      });

      test("should not be chaotic when evil < 30", () => {
        const alignment = new CharacterAlignment({ good: 30, evil: 29 }); // diff < 30 but evil < 30
        expect(alignment.alignment()).toBe(CharacterAlignmentEnum.Kind); // good path
      });

      test("should be chaotic when both >= 30 and diff = 29", () => {
        const alignment = new CharacterAlignment({ good: 59, evil: 30 }); // diff = 29
        expect(alignment.alignment()).toBe(CharacterAlignmentEnum.Mad); // chaotic path
      });
    });

    describe("Boundary testing", () => {
      test("tie-breaking when good equals evil", () => {
        const alignment = new CharacterAlignment({ good: 25, evil: 25 });
        expect(alignment.alignment()).toBe(CharacterAlignmentEnum.Initiate); // evil path (evil >= good)
      });

      test("good wins by 1", () => {
        const alignment = new CharacterAlignment({ good: 31, evil: 30 });
        expect(alignment.alignment()).toBe(CharacterAlignmentEnum.Mad); // chaotic path (both >= 30, diff = 1 < 30)
      });

      test("evil wins by 1", () => {
        const alignment = new CharacterAlignment({ good: 30, evil: 31 });
        expect(alignment.alignment()).toBe(CharacterAlignmentEnum.Mad); // chaotic path (both >= 30, diff = 1 < 30)
      });
    });

    describe("Extreme values", () => {
      test("should handle very high good values", () => {
        const alignment = new CharacterAlignment({ good: 1000, evil: 0 });
        expect(alignment.alignment()).toBe(CharacterAlignmentEnum.Divine);
      });

      test("should handle very high evil values", () => {
        const alignment = new CharacterAlignment({ good: 0, evil: 1000 });
        expect(alignment.alignment()).toBe(CharacterAlignmentEnum.Infernal);
      });

      test("should handle very high chaotic values", () => {
        const alignment = new CharacterAlignment({ good: 1000, evil: 1000 });
        expect(alignment.alignment()).toBe(CharacterAlignmentEnum.Anarch);
      });

      test("should handle negative values gracefully", () => {
        const alignment = new CharacterAlignment({ good: -10, evil: 50 });
        expect(alignment.alignment()).toBe(CharacterAlignmentEnum.Vile);
      });
    });
  });
});
