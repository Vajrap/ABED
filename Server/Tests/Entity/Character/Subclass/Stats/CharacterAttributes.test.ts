import { describe, expect, test, beforeEach } from "@jest/globals";
import { CharacterAttributes } from "../../../../../src/Entity/Character/Subclass/Stats/CharacterAttributes";
import { StatBlock } from "../../../../../src/Entity/Character/Subclass/Stats/CharacterStatArchetype";
import { statMod } from "../../../../../src/Utils/statMod";
import { ATTRIBUTE_KEYS } from "../../../../../src/InterFacesEnumsAndTypes/Enums";

describe("CharacterAttributes", () => {
  describe("Constructor", () => {
    test("should initialize with default values for all attributes", () => {
      const attributes = new CharacterAttributes();

      ATTRIBUTE_KEYS.forEach((key) => {
        const stat = attributes.getStat(key);
        expect(stat.base).toBe(6);
        expect(stat.bonus).toBe(0);
        expect(stat.battle).toBe(0);
        expect(stat.exp).toBe(0);
        expect(stat.total).toBe(6);
      });
    });

    test("should initialize with partial custom values", () => {
      const initial = {
        strength: { base: 15, bonus: 2 },
        agility: { base: 12, battle: 1 },
        intelligence: { exp: 50 },
      };

      const attributes = new CharacterAttributes(initial);

      // Strength should have custom values
      expect(attributes.getStat("strength").base).toBe(15);
      expect(attributes.getStat("strength").bonus).toBe(2);
      expect(attributes.getStat("strength").battle).toBe(0); // default
      expect(attributes.getStat("strength").exp).toBe(0); // default
      expect(attributes.getStat("strength").total).toBe(17); // 15 + 2 + 0

      // Agility should have custom values
      expect(attributes.getStat("agility").base).toBe(12);
      expect(attributes.getStat("agility").bonus).toBe(0); // default
      expect(attributes.getStat("agility").battle).toBe(1);
      expect(attributes.getStat("agility").exp).toBe(0); // default
      expect(attributes.getStat("agility").total).toBe(13); // 12 + 0 + 1

      // Intelligence should have custom exp
      expect(attributes.getStat("intelligence").base).toBe(6); // default
      expect(attributes.getStat("intelligence").bonus).toBe(0); // default
      expect(attributes.getStat("intelligence").battle).toBe(0); // default
      expect(attributes.getStat("intelligence").exp).toBe(50);
      expect(attributes.getStat("intelligence").total).toBe(6); // 0 + 0 + 0

      // Other attributes should have defaults
      expect(attributes.getStat("charisma").total).toBe(6);
    });

    test("should handle all attribute keys", () => {
      const attributes = new CharacterAttributes();

      // Test that all expected attributes exist
      const expectedAttributes = [
        "charisma",
        "luck",
        "intelligence",
        "leadership",
        "vitality",
        "willpower",
        "planar",
        "control",
        "dexterity",
        "agility",
        "strength",
        "endurance",
      ];

      expectedAttributes.forEach((attr) => {
        expect(() => attributes.getStat(attr as any)).not.toThrow();
      });
    });
  });

  describe("StatBlock", () => {
    test("should calculate total correctly", () => {
      const stat = new StatBlock(10, 5, 2, 0);
      expect(stat.total).toBe(17); // 10 + 5 + 2
    });

    test("should handle negative values", () => {
      const stat = new StatBlock(10, -3, -1, 0);
      expect(stat.total).toBe(6); // 10 + (-3) + (-1)
    });

    test("should create from partial data", () => {
      const stat = StatBlock.from({ base: 8, bonus: 3 });
      expect(stat.base).toBe(8);
      expect(stat.bonus).toBe(3);
      expect(stat.battle).toBe(0); // default
      expect(stat.exp).toBe(0); // default
      expect(stat.total).toBe(11);
    });

    test("should create from empty data", () => {
      const stat = StatBlock.from({});
      expect(stat.base).toBe(0);
      expect(stat.bonus).toBe(0);
      expect(stat.battle).toBe(0);
      expect(stat.exp).toBe(0);
      expect(stat.total).toBe(0);
    });
  });

  describe("Stat manipulation methods", () => {
    let attributes: CharacterAttributes;

    beforeEach(() => {
      attributes = new CharacterAttributes();
    });

    describe("setBase", () => {
      test("should set base value", () => {
        attributes.setBase("strength", 15);
        expect(attributes.getStat("strength").base).toBe(15);
        expect(attributes.getTotal("strength")).toBe(15);
      });

      test("should work with all attribute types", () => {
        attributes.setBase("agility", 12);
        attributes.setBase("intelligence", 18);
        attributes.setBase("charisma", 8);

        expect(attributes.getStat("agility").base).toBe(12);
        expect(attributes.getStat("intelligence").base).toBe(18);
        expect(attributes.getStat("charisma").base).toBe(8);
      });
    });

    describe("applyBattleChange", () => {
      test("should add to battle value", () => {
        attributes.setBase("strength", 10);
        attributes.applyBattleChange("strength", 3);

        expect(attributes.getStat("strength").battle).toBe(3);
        expect(attributes.getTotal("strength")).toBe(13); // 10 + 0 + 3
      });

      test("should accumulate battle changes", () => {
        attributes.setBase("strength", 10);
        attributes.applyBattleChange("strength", 2);
        attributes.applyBattleChange("strength", 1);

        expect(attributes.getStat("strength").battle).toBe(3);
        expect(attributes.getTotal("strength")).toBe(13);
      });

      test("should handle negative battle changes", () => {
        attributes.setBase("agility", 15);
        attributes.applyBattleChange("agility", -2);

        expect(attributes.getStat("agility").battle).toBe(-2);
        expect(attributes.getTotal("agility")).toBe(13); // 15 + 0 + (-2)
      });
    });

    describe("applyBonusChange", () => {
      test("should add to bonus value", () => {
        attributes.setBase("dexterity", 10);
        attributes.applyBonusChange("dexterity", 4);

        expect(attributes.getStat("dexterity").bonus).toBe(4);
        expect(attributes.getTotal("dexterity")).toBe(14); // 10 + 4 + 0
      });

      test("should accumulate bonus changes", () => {
        attributes.setBase("intelligence", 12);
        attributes.applyBonusChange("intelligence", 2);
        attributes.applyBonusChange("intelligence", 3);

        expect(attributes.getStat("intelligence").bonus).toBe(5);
        expect(attributes.getTotal("intelligence")).toBe(17);
      });
    });

    describe("mutateBase", () => {
      test("should modify base value", () => {
        attributes.setBase("strength", 10);
        attributes.mutateBase("strength", 3);

        expect(attributes.getStat("strength").base).toBe(13);
        expect(attributes.getTotal("strength")).toBe(13);
      });

      test("should handle negative mutations", () => {
        attributes.setBase("endurance", 15);
        attributes.mutateBase("endurance", -2);

        expect(attributes.getStat("endurance").base).toBe(13);
        expect(attributes.getTotal("endurance")).toBe(13);
      });
    });

    describe("mutateBattle", () => {
      test("should modify battle value", () => {
        attributes.setBase("agility", 10);
        attributes.applyBattleChange("agility", 2);
        attributes.mutateBattle("agility", 1);

        expect(attributes.getStat("agility").battle).toBe(3);
        expect(attributes.getTotal("agility")).toBe(13);
      });
    });

    describe("mutateBonus", () => {
      test("should modify bonus value", () => {
        attributes.setBase("luck", 10);
        attributes.applyBonusChange("luck", 2);
        attributes.mutateBonus("luck", 3);

        expect(attributes.getStat("luck").bonus).toBe(5);
        expect(attributes.getTotal("luck")).toBe(15);
      });
    });

    describe("clearBattle", () => {
      test("should clear all battle values", () => {
        attributes.setBase("strength", 10);
        attributes.setBase("agility", 12);
        attributes.applyBattleChange("strength", 3);
        attributes.applyBattleChange("agility", 2);

        const result = attributes.clearBattle();

        expect(attributes.getStat("strength").battle).toBe(0);
        expect(attributes.getStat("agility").battle).toBe(0);
        expect(attributes.getTotal("strength")).toBe(10); // base only
        expect(attributes.getTotal("agility")).toBe(12); // base only
        expect(result).toBe(attributes); // should return self
      });

      test("should not affect base or bonus values", () => {
        attributes.setBase("intelligence", 15);
        attributes.applyBonusChange("intelligence", 3);
        attributes.applyBattleChange("intelligence", 2);

        attributes.clearBattle();

        expect(attributes.getStat("intelligence").base).toBe(15);
        expect(attributes.getStat("intelligence").bonus).toBe(3);
        expect(attributes.getStat("intelligence").battle).toBe(0);
        expect(attributes.getTotal("intelligence")).toBe(18); // 15 + 3 + 0
      });
    });
  });

  describe("getTotal method", () => {
    test("should return total stat value", () => {
      const attributes = new CharacterAttributes();
      attributes.setBase("strength", 12);
      attributes.applyBonusChange("strength", 3);
      attributes.applyBattleChange("strength", 1);

      expect(attributes.getTotal("strength")).toBe(16);
    });

    test("should handle zero values", () => {
      const attributes = new CharacterAttributes();
      expect(attributes.getTotal("charisma")).toBe(6);
    });
  });

  describe("JSON serialization", () => {
    test("should serialize to JSON", () => {
      const attributes = new CharacterAttributes();
      attributes.setBase("strength", 15);
      attributes.applyBonusChange("strength", 2);
      attributes.applyBattleChange("agility", 1);

      const json = attributes.toJSON();

      expect(json.strength.base).toBe(15);
      expect(json.strength.bonus).toBe(2);
      expect(json.strength.battle).toBe(0);
      expect(json.agility.battle).toBe(1);
    });

    test("should deserialize from JSON", () => {
      const data = {
        strength: { base: 18, bonus: 3, battle: 1, exp: 100 },
        agility: { base: 14, bonus: 1, battle: 0, exp: 50 },
      };

      const attributes = new CharacterAttributes(data);

      expect(attributes.getStat("strength").base).toBe(18);
      expect(attributes.getStat("strength").bonus).toBe(3);
      expect(attributes.getStat("strength").battle).toBe(1);
      expect(attributes.getStat("strength").exp).toBe(100);
      expect(attributes.getTotal("strength")).toBe(22); // 18 + 3 + 1

      expect(attributes.getStat("agility").base).toBe(14);
      expect(attributes.getStat("agility").bonus).toBe(1);
      expect(attributes.getTotal("agility")).toBe(15); // 14 + 1 + 0

      // Unspecified attributes should have defaults
      expect(attributes.getTotal("intelligence")).toBe(6);
    });
  });

  describe("Complex scenarios", () => {
    test("should handle character progression", () => {
      const attributes = new CharacterAttributes();

      // Starting character
      attributes.setBase("strength", 10);
      attributes.setBase("agility", 12);

      // Equipment bonuses
      attributes.applyBonusChange("strength", 3); // +3 str sword
      attributes.applyBonusChange("agility", 1); // +1 agi boots

      expect(attributes.getTotal("strength")).toBe(13);
      expect(attributes.getTotal("agility")).toBe(13);

      // Level up
      attributes.mutateBase("strength", 2);
      attributes.mutateBase("agility", 1);

      expect(attributes.getTotal("strength")).toBe(15); // 12 + 3 + 0
      expect(attributes.getTotal("agility")).toBe(14); // 13 + 1 + 0
    });

    test("should handle battle buffs and debuffs", () => {
      const attributes = new CharacterAttributes();
      attributes.setBase("strength", 15);
      attributes.setBase("agility", 14);

      // Apply battle effects
      attributes.applyBattleChange("strength", 4); // Rage +4 str
      attributes.applyBattleChange("agility", -2); // Slow -2 agi

      expect(attributes.getTotal("strength")).toBe(19);
      expect(attributes.getTotal("agility")).toBe(12);

      // End of battle
      attributes.clearBattle();

      expect(attributes.getTotal("strength")).toBe(15); // back to base
      expect(attributes.getTotal("agility")).toBe(14); // back to base
    });

    test("should handle equipment changes", () => {
      const attributes = new CharacterAttributes();
      attributes.setBase("strength", 12);
      attributes.applyBonusChange("strength", 2); // +2 str item

      expect(attributes.getTotal("strength")).toBe(14);

      // Remove old equipment, add new
      attributes.mutateBonus("strength", -2); // remove old
      attributes.mutateBonus("strength", 5); // add new +5 str item

      expect(attributes.getStat("strength").bonus).toBe(5); // 2 + (-2) + 5
      expect(attributes.getTotal("strength")).toBe(17); // 12 + 5 + 0
    });
  });
});

describe("statMod function", () => {
  describe("Basic functionality", () => {
    const testCases = [
      { input: 1, expected: -5, description: "minimum value" },
      { input: 2, expected: -4, description: "boundary at 2-3" },
      { input: 3, expected: -4, description: "boundary at 2-3" },
      { input: 4, expected: -3, description: "boundary at 4-5" },
      { input: 5, expected: -3, description: "boundary at 4-5" },
      { input: 6, expected: -2, description: "boundary at 6-7" },
      { input: 7, expected: -2, description: "boundary at 6-7" },
      { input: 8, expected: -1, description: "boundary at 8-9" },
      { input: 9, expected: -1, description: "boundary at 8-9" },
      { input: 10, expected: 0, description: "neutral at 10-11" },
      { input: 11, expected: 0, description: "neutral at 10-11" },
      { input: 12, expected: 1, description: "positive at 12-13" },
      { input: 13, expected: 1, description: "positive at 12-13" },
      { input: 14, expected: 2, description: "boundary at 14-15" },
      { input: 15, expected: 2, description: "boundary at 14-15" },
      { input: 16, expected: 3, description: "boundary at 16-17" },
      { input: 17, expected: 3, description: "boundary at 16-17" },
      { input: 18, expected: 4, description: "boundary at 18-19" },
      { input: 19, expected: 4, description: "boundary at 18-19" },
      { input: 20, expected: 5, description: "boundary at 20-21" },
      { input: 21, expected: 5, description: "boundary at 20-21" },
      { input: 22, expected: 6, description: "boundary at 22-23" },
      { input: 23, expected: 6, description: "boundary at 22-23" },
      { input: 24, expected: 7, description: "boundary at 24-25" },
      { input: 25, expected: 7, description: "boundary at 24-25" },
      { input: 26, expected: 8, description: "boundary at 26-27" },
      { input: 27, expected: 8, description: "boundary at 26-27" },
      { input: 28, expected: 9, description: "boundary at 28-29" },
      { input: 29, expected: 9, description: "boundary at 28-29" },
      { input: 30, expected: 10, description: "maximum normal value" },
    ];

    testCases.forEach(({ input, expected, description }) => {
      test(`should return ${expected} for input ${input} (${description})`, () => {
        expect(statMod(input)).toBe(expected);
      });
    });
  });

  describe("Edge cases", () => {
    test("should handle values above 30", () => {
      expect(statMod(31)).toBe(0); // Falls through to default
      expect(statMod(50)).toBe(0);
      expect(statMod(100)).toBe(0);
    });

    test("should handle zero and negative values", () => {
      expect(statMod(0)).toBe(-5); // Treated same as 1
      expect(statMod(-5)).toBe(-5);
      expect(statMod(-10)).toBe(-5);
    });

    test("should handle floating point values", () => {
      expect(statMod(10.5)).toBe(0);
      expect(statMod(12.9)).toBe(1);
      expect(statMod(13.1)).toBe(2); // 13.1 <= 15, so modifier is 2
    });
  });

  describe("Common game scenarios", () => {
    test("average human stats (10-11) should have 0 modifier", () => {
      expect(statMod(10)).toBe(0);
      expect(statMod(11)).toBe(0);
    });

    test("heroic stats (16-18) should have good modifiers", () => {
      expect(statMod(16)).toBe(3);
      expect(statMod(17)).toBe(3);
      expect(statMod(18)).toBe(4);
    });

    test("legendary stats (20+) should have excellent modifiers", () => {
      expect(statMod(20)).toBe(5);
      expect(statMod(25)).toBe(7);
      expect(statMod(30)).toBe(10);
    });

    test("weak stats (6-8) should have negative modifiers", () => {
      expect(statMod(6)).toBe(-2);
      expect(statMod(7)).toBe(-2);
      expect(statMod(8)).toBe(-1);
    });
  });
});

describe("CharacterAttributes integration with statMod", () => {
  let attributes: CharacterAttributes;

  beforeEach(() => {
    attributes = new CharacterAttributes();
  });

  test("should calculate stat modifiers for character attributes", () => {
    attributes.setBase("strength", 16);
    attributes.setBase("agility", 12);
    attributes.setBase("intelligence", 8);

    expect(statMod(attributes.getTotal("strength"))).toBe(3);
    expect(statMod(attributes.getTotal("agility"))).toBe(1);
    expect(statMod(attributes.getTotal("intelligence"))).toBe(-1);
  });

  test("should handle equipment bonuses in stat mod calculations", () => {
    attributes.setBase("strength", 14);
    attributes.applyBonusChange("strength", 4); // +4 from equipment

    const totalStr = attributes.getTotal("strength"); // 18
    expect(totalStr).toBe(18);
    expect(statMod(totalStr)).toBe(4);
  });

  test("should handle battle effects in stat mod calculations", () => {
    attributes.setBase("agility", 15);
    attributes.applyBattleChange("agility", 3); // Bull's Grace spell

    const totalAgi = attributes.getTotal("agility"); // 18
    expect(totalAgi).toBe(18);
    expect(statMod(totalAgi)).toBe(4);

    // After battle, spell effect ends
    attributes.clearBattle();
    const baseAgi = attributes.getTotal("agility"); // 15
    expect(baseAgi).toBe(15);
    expect(statMod(baseAgi)).toBe(2);
  });

  test("should handle complex stat calculations", () => {
    // Character with high base stats
    attributes.setBase("strength", 18);
    attributes.setBase("dexterity", 14);

    // Equipment bonuses
    attributes.applyBonusChange("strength", 2); // Gauntlets of Str
    attributes.applyBonusChange("dexterity", 4); // Cloak of Dex

    // Battle effects
    attributes.applyBattleChange("strength", 4); // Rage
    attributes.applyBattleChange("dexterity", -2); // Fatigue

    expect(attributes.getTotal("strength")).toBe(24); // 18 + 2 + 4
    expect(statMod(attributes.getTotal("strength"))).toBe(7);

    expect(attributes.getTotal("dexterity")).toBe(16); // 14 + 4 + (-2)
    expect(statMod(attributes.getTotal("dexterity"))).toBe(3);
  });

  test("should provide realistic character progression example", () => {
    // Level 1 character
    attributes.setBase("strength", 10);
    attributes.setBase("endurance", 12);
    expect(statMod(attributes.getTotal("strength"))).toBe(0);
    expect(statMod(attributes.getTotal("endurance"))).toBe(1);

    // Level 10 character (some stat increases)
    attributes.mutateBase("strength", 4); // 14 total
    attributes.mutateBase("endurance", 2); // 14 total
    expect(statMod(attributes.getTotal("strength"))).toBe(2);
    expect(statMod(attributes.getTotal("endurance"))).toBe(2);

    // With good equipment
    attributes.applyBonusChange("strength", 6); // Magic items
    attributes.applyBonusChange("endurance", 4);
    expect(statMod(attributes.getTotal("strength"))).toBe(5); // str 20
    expect(statMod(attributes.getTotal("endurance"))).toBe(4); // end 18
  });
});
