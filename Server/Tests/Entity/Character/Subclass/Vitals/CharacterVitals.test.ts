import { describe, expect, test, beforeEach } from "bun:test";
import { CharacterVitals } from "../../../../../src/Entity/Character/Subclass/Vitals/CharacterVitals";

// Since Vital is not exported, we'll test it through CharacterVitals
describe("CharacterVitals", () => {
  describe("Constructor", () => {
    test("should initialize with default vitals", () => {
      const vitals = new CharacterVitals({});

      // All vitals should default to base: 10, bonus: 0, current: 10
      expect(vitals.hp.base).toBe(10);
      expect(vitals.hp.bonus).toBe(0);
      expect(vitals.hp.current).toBe(10);
      expect(vitals.hp.max).toBe(10);

      expect(vitals.mp.base).toBe(10);
      expect(vitals.mp.bonus).toBe(0);
      expect(vitals.mp.current).toBe(10);
      expect(vitals.mp.max).toBe(10);

      expect(vitals.sp.base).toBe(10);
      expect(vitals.sp.bonus).toBe(0);
      expect(vitals.sp.current).toBe(10);
      expect(vitals.sp.max).toBe(10);
    });

    test("should initialize with custom HP vital", () => {
      const vitals = new CharacterVitals({});
      vitals.hp.setBase(20);
      vitals.hp.setBonus(5);
      vitals.hp.setCurrent(15);

      expect(vitals.hp.base).toBe(20);
      expect(vitals.hp.bonus).toBe(5);
      expect(vitals.hp.current).toBe(15);
      expect(vitals.hp.max).toBe(25); // base + bonus
    });

    test("should initialize with custom MP and SP vitals", () => {
      const vitals = new CharacterVitals({});
      vitals.mp.setBase(30);
      vitals.mp.setBonus(10);
      vitals.mp.setCurrent(25);
      vitals.sp.setBase(15);
      vitals.sp.setBonus(-2);
      vitals.sp.setCurrent(10);

      expect(vitals.mp.base).toBe(30);
      expect(vitals.mp.bonus).toBe(10);
      expect(vitals.mp.current).toBe(25);
      expect(vitals.mp.max).toBe(40);

      expect(vitals.sp.base).toBe(15);
      expect(vitals.sp.bonus).toBe(-2);
      expect(vitals.sp.current).toBe(10);
      expect(vitals.sp.max).toBe(13);
    });
  });

  describe("Vital class behavior (through CharacterVitals)", () => {
    let vitals: CharacterVitals;

    beforeEach(() => {
      vitals = new CharacterVitals({});
    });

    describe("max calculation", () => {
      test("should calculate max as base + bonus", () => {
        vitals.hp.setBase(20);
        vitals.hp.setBonus(5);
        expect(vitals.hp.max).toBe(25);
      });

      test("should ensure max is at least 1 even with negative values", () => {
        vitals.hp.setBase(2);
        vitals.hp.setBonus(-5);
        expect(vitals.hp.max).toBe(1); // Math.max(1, 2 + (-5))
      });

      test("should handle zero base with negative bonus", () => {
        vitals.hp.setBase(0);
        vitals.hp.setBonus(-10);
        expect(vitals.hp.max).toBe(1);
      });
    });

    describe("setBase", () => {
      test("should set base value and adjust current if needed", () => {
        vitals.hp.setCurrent(10);
        vitals.hp.setBase(5); // max becomes 5, current should be clamped

        expect(vitals.hp.base).toBe(5);
        expect(vitals.hp.current).toBe(5); // clamped to max
      });

      test("should not allow negative base values", () => {
        vitals.hp.setBase(-5);
        expect(vitals.hp.base).toBe(0);
      });

      test("should return self for chaining", () => {
        const result = vitals.hp.setBase(15);
        expect(result).toBe(vitals.hp);
      });
    });

    describe("setBonus", () => {
      test("should set bonus value and adjust current if needed", () => {
        vitals.hp.setBase(10);
        vitals.hp.setCurrent(10);
        vitals.hp.setBonus(-5); // max becomes 5, current should be clamped

        expect(vitals.hp.bonus).toBe(-5);
        expect(vitals.hp.current).toBe(5); // clamped to max
      });

      test("should allow negative bonus values", () => {
        vitals.hp.setBonus(-3);
        expect(vitals.hp.bonus).toBe(-3);
      });

      test("should return self for chaining", () => {
        const result = vitals.hp.setBonus(5);
        expect(result).toBe(vitals.hp);
      });
    });

    describe("setCurrent", () => {
      test("should set current value within bounds", () => {
        vitals.hp.setBase(20);
        vitals.hp.setCurrent(15);

        expect(vitals.hp.current).toBe(15);
      });

      test("should clamp current to max", () => {
        vitals.hp.setBase(10);
        vitals.hp.setCurrent(25); // above max

        expect(vitals.hp.current).toBe(10); // clamped to max
      });

      test("should clamp current to 0 minimum", () => {
        vitals.hp.setCurrent(-5);
        expect(vitals.hp.current).toBe(0);
      });

      test("should return self for chaining", () => {
        const result = vitals.hp.setCurrent(8);
        expect(result).toBe(vitals.hp);
      });
    });

    describe("addBase", () => {
      test("should add to base value", () => {
        vitals.hp.setBase(10);
        vitals.hp.addBase(5);

        expect(vitals.hp.base).toBe(15);
      });

      test("should ensure base stays at least 1", () => {
        vitals.hp.setBase(5);
        vitals.hp.addBase(-10);

        expect(vitals.hp.base).toBe(1); // Math.max(1, 5 + (-10))
      });

      test("should adjust current if max changes", () => {
        vitals.hp.setBase(20);
        vitals.hp.setCurrent(20);
        vitals.hp.addBase(-10); // max becomes 10

        expect(vitals.hp.current).toBe(10); // clamped to new max
      });

      test("should return self for chaining", () => {
        const result = vitals.hp.addBase(3);
        expect(result).toBe(vitals.hp);
      });
    });

    describe("addBonus", () => {
      test("should add to bonus value", () => {
        vitals.hp.setBonus(5);
        vitals.hp.addBonus(3);

        expect(vitals.hp.bonus).toBe(8);
      });

      test("should allow negative additions", () => {
        vitals.hp.setBonus(5);
        vitals.hp.addBonus(-8);

        expect(vitals.hp.bonus).toBe(-3);
      });

      test("should adjust current if max changes", () => {
        vitals.hp.setBase(10);
        vitals.hp.setBonus(10);
        vitals.hp.setCurrent(20);
        vitals.hp.addBonus(-15); // max becomes 5

        expect(vitals.hp.current).toBe(5); // clamped to new max
      });

      test("should return self for chaining", () => {
        const result = vitals.hp.addBonus(2);
        expect(result).toBe(vitals.hp);
      });
    });

    describe("inc (increment)", () => {
      test("should increment current value by default amount (1)", () => {
        vitals.hp.setCurrent(5);
        vitals.hp.inc();

        expect(vitals.hp.current).toBe(6);
      });

      test("should increment current value by specified amount", () => {
        vitals.hp.setCurrent(5);
        vitals.hp.inc(3);

        expect(vitals.hp.current).toBe(8);
      });

      test("should not exceed max value", () => {
        vitals.hp.setBase(10);
        vitals.hp.setCurrent(8);
        vitals.hp.inc(5); // would be 13, but max is 10

        expect(vitals.hp.current).toBe(10);
      });

      test("should handle negative increments", () => {
        vitals.hp.setCurrent(5);
        vitals.hp.inc(-2);

        expect(vitals.hp.current).toBe(3);
      });

      test("should not go below 0 with negative increments", () => {
        vitals.hp.setCurrent(2);
        vitals.hp.inc(-5);

        expect(vitals.hp.current).toBe(0);
      });

      test("should return self for chaining", () => {
        const result = vitals.hp.inc(1);
        expect(result).toBe(vitals.hp);
      });
    });

    describe("dec (decrement)", () => {
      test("should decrement current value by default amount (1)", () => {
        vitals.hp.setCurrent(5);
        vitals.hp.dec();

        expect(vitals.hp.current).toBe(4);
      });

      test("should decrement current value by specified amount", () => {
        vitals.hp.setCurrent(8);
        vitals.hp.dec(3);

        expect(vitals.hp.current).toBe(5);
      });

      test("should not go below 0", () => {
        vitals.hp.setCurrent(3);
        vitals.hp.dec(5);

        expect(vitals.hp.current).toBe(0);
      });

      test("should handle negative decrements (acts like increment)", () => {
        vitals.hp.setCurrent(5);
        vitals.hp.dec(-2);

        expect(vitals.hp.current).toBe(7);
      });

      test("should return self for chaining", () => {
        const result = vitals.hp.dec(1);
        expect(result).toBe(vitals.hp);
      });
    });
  });

  describe("isDead property", () => {
    let vitals: CharacterVitals;

    beforeEach(() => {
      vitals = new CharacterVitals({});
    });

    test("should return false when HP > 0", () => {
      vitals.hp.setCurrent(1);
      expect(vitals.isDead).toBe(false);
    });

    test("should return true when HP = 0", () => {
      vitals.hp.setCurrent(0);
      expect(vitals.isDead).toBe(true);
    });

    test("should return true when HP < 0 (though shouldn't happen due to clamping)", () => {
      // Directly set current to test edge case
      vitals.hp.current = -1;
      expect(vitals.isDead).toBe(true);
    });

    test("should update when HP changes", () => {
      vitals.hp.setCurrent(5);
      expect(vitals.isDead).toBe(false);

      vitals.hp.setCurrent(0);
      expect(vitals.isDead).toBe(true);

      vitals.hp.setCurrent(1);
      expect(vitals.isDead).toBe(false);
    });
  });

  describe("Vital management methods", () => {
    let vitals: CharacterVitals;

    beforeEach(() => {
      vitals = new CharacterVitals({});
      // Set all vitals to known state
      vitals.hp.setCurrent(10);
      vitals.mp.setCurrent(10);
      vitals.sp.setCurrent(10);
    });

    describe("HP methods", () => {
      test("incHp should increase HP", () => {
        vitals.incHp(3);
        expect(vitals.hp.current).toBe(10); // at max already

        vitals.hp.setCurrent(7);
        vitals.incHp(2);
        expect(vitals.hp.current).toBe(9);
      });

      test("decHp should decrease HP", () => {
        vitals.decHp(3);
        expect(vitals.hp.current).toBe(7);
      });

      test("decHp should not go below 0", () => {
        vitals.decHp(15);
        expect(vitals.hp.current).toBe(0);
        expect(vitals.isDead).toBe(true);
      });

      test("should return self for chaining", () => {
        const result1 = vitals.incHp(1);
        const result2 = vitals.decHp(1);

        expect(result1).toBe(vitals);
        expect(result2).toBe(vitals);
      });
    });

    describe("MP methods", () => {
      test("incMp should increase MP", () => {
        vitals.mp.setCurrent(7);
        vitals.incMp(2);
        expect(vitals.mp.current).toBe(9);
      });

      test("decMp should decrease MP", () => {
        vitals.decMp(4);
        expect(vitals.mp.current).toBe(6);
      });

      test("decMp should not go below 0", () => {
        vitals.decMp(15);
        expect(vitals.mp.current).toBe(0);
      });

      test("should return self for chaining", () => {
        const result1 = vitals.incMp(1);
        const result2 = vitals.decMp(1);

        expect(result1).toBe(vitals);
        expect(result2).toBe(vitals);
      });
    });

    describe("SP methods", () => {
      test("incSp should increase SP", () => {
        vitals.sp.setCurrent(5);
        vitals.incSp(3);
        expect(vitals.sp.current).toBe(8);
      });

      test("decSp should decrease SP", () => {
        vitals.decSp(2);
        expect(vitals.sp.current).toBe(8);
      });

      test("decSp should not go below 0", () => {
        vitals.decSp(20);
        expect(vitals.sp.current).toBe(0);
      });

      test("should return self for chaining", () => {
        const result1 = vitals.incSp(1);
        const result2 = vitals.decSp(1);

        expect(result1).toBe(vitals);
        expect(result2).toBe(vitals);
      });
    });
  });

  describe("Method chaining", () => {
    test("should allow chaining vital operations", () => {
      const vitals = new CharacterVitals({});

      vitals.incHp(2).decMp(1).incSp(3);

      expect(vitals.hp.current).toBe(10); // was at max
      expect(vitals.mp.current).toBe(9);
      expect(vitals.sp.current).toBe(10); // was at max
    });

    test("should allow chaining vital property operations", () => {
      const vitals = new CharacterVitals({});

      vitals.hp.setBase(20).setBonus(5).setCurrent(15);

      expect(vitals.hp.base).toBe(20);
      expect(vitals.hp.bonus).toBe(5);
      expect(vitals.hp.current).toBe(15);
      expect(vitals.hp.max).toBe(25);
    });
  });

  describe("JSON serialization", () => {
    test("should serialize vitals to JSON", () => {
      const vitals = new CharacterVitals({});
      vitals.hp.setBase(20).setBonus(5).setCurrent(15);
      vitals.mp.setBase(30).setBonus(10).setCurrent(25);
      vitals.sp.setBase(15).setBonus(-2).setCurrent(10);

      const json = vitals.toJSON();

      expect(json).toEqual({
        hp: { base: 20, bonus: 5, current: 15 },
        mp: { base: 30, bonus: 10, current: 25 },
        sp: { base: 15, bonus: -2, current: 10 },
      });
    });

    test("should deserialize vitals from JSON", () => {
      const jsonData = {
        hp: { base: 25, bonus: 3, current: 20 },
        mp: { base: 40, bonus: 5, current: 30 },
        sp: { base: 18, bonus: 2, current: 15 },
      };

      const vitals = CharacterVitals.fromJSON(jsonData);

      expect(vitals.hp.base).toBe(25);
      expect(vitals.hp.bonus).toBe(3);
      expect(vitals.hp.current).toBe(20);
      expect(vitals.hp.max).toBe(28);

      expect(vitals.mp.base).toBe(40);
      expect(vitals.mp.bonus).toBe(5);
      expect(vitals.mp.current).toBe(30);
      expect(vitals.mp.max).toBe(45);

      expect(vitals.sp.base).toBe(18);
      expect(vitals.sp.bonus).toBe(2);
      expect(vitals.sp.current).toBe(15);
      expect(vitals.sp.max).toBe(20);
    });

    test("should handle partial JSON data", () => {
      const jsonData = { hp: { base: 15, current: 10 } };

      const vitals = CharacterVitals.fromJSON(jsonData);

      expect(vitals.hp.base).toBe(15);
      expect(vitals.hp.bonus).toBe(0); // default
      expect(vitals.hp.current).toBe(10);

      // MP and SP should use defaults
      expect(vitals.mp.base).toBe(10);
      expect(vitals.sp.base).toBe(10);
    });

    test("should handle empty JSON data", () => {
      const vitals = CharacterVitals.fromJSON({});

      expect(vitals.hp.base).toBe(10);
      expect(vitals.mp.base).toBe(10);
      expect(vitals.sp.base).toBe(10);
    });

    test("should handle no JSON data", () => {
      const vitals = CharacterVitals.fromJSON();

      expect(vitals.hp.base).toBe(10);
      expect(vitals.mp.base).toBe(10);
      expect(vitals.sp.base).toBe(10);
    });
  });

  describe("Edge cases and stress testing", () => {
    test("should handle very large values", () => {
      const vitals = new CharacterVitals({});
      vitals.hp.setBase(1000000);
      vitals.hp.setCurrent(999999);

      expect(vitals.hp.current).toBe(999999);
      vitals.hp.inc(1);
      expect(vitals.hp.current).toBe(1000000);
    });

    test("should handle floating point values by using Math operations correctly", () => {
      const vitals = new CharacterVitals({});
      vitals.hp.setBase(10);
      vitals.hp.setCurrent(5);
      vitals.hp.inc(0.5);

      // The clamp function should handle this correctly
      expect(vitals.hp.current).toBe(5.5);
    });

    test("should maintain consistency when max changes multiple times", () => {
      const vitals = new CharacterVitals({});
      vitals.hp.setBase(10);
      vitals.hp.setCurrent(10);

      // Reduce max
      vitals.hp.setBonus(-5); // max becomes 5
      expect(vitals.hp.current).toBe(5);

      // Increase max again
      vitals.hp.setBonus(10); // max becomes 20
      expect(vitals.hp.current).toBe(5); // should stay the same

      // Fill to new max
      vitals.hp.setCurrent(20);
      expect(vitals.hp.current).toBe(20);
    });

    test("should handle death and resurrection scenarios", () => {
      const vitals = new CharacterVitals({});

      // Character is alive
      expect(vitals.isDead).toBe(false);

      // Take fatal damage
      vitals.decHp(20);
      expect(vitals.hp.current).toBe(0);
      expect(vitals.isDead).toBe(true);

      // Resurrection
      vitals.incHp(1);
      expect(vitals.hp.current).toBe(1);
      expect(vitals.isDead).toBe(false);
    });

    test("should handle complex stat modifications", () => {
      const vitals = new CharacterVitals({});

      // Start with base stats
      vitals.hp.setBase(100);
      vitals.hp.setBonus(50); // max = 150
      vitals.hp.setCurrent(150);

      // Take damage
      vitals.decHp(75); // current = 75
      expect(vitals.hp.current).toBe(75);

      // Lose equipment (reduce bonus)
      vitals.hp.setBonus(20); // max = 120, current should stay 75
      expect(vitals.hp.current).toBe(75);
      expect(vitals.hp.max).toBe(120);

      // Level up (increase base)
      vitals.hp.addBase(20); // base = 120, max = 140
      expect(vitals.hp.max).toBe(140);
      expect(vitals.hp.current).toBe(75);

      // Heal to full
      vitals.hp.setCurrent(140);
      expect(vitals.hp.current).toBe(140);
    });
  });

  describe("Integration scenarios", () => {
    test("should handle battle damage scenario", () => {
      const vitals = new CharacterVitals({});

      // Warrior with high HP
      vitals.hp.setBase(50).setBonus(20).setCurrent(70); // max = 70

      // Take battle damage
      vitals.decHp(25); // 45 remaining
      expect(vitals.hp.current).toBe(45);
      expect(vitals.isDead).toBe(false);

      // Cast spell (use MP)
      vitals.decMp(5);
      expect(vitals.mp.current).toBe(5);

      // Sprint (use SP)
      vitals.decSp(8);
      expect(vitals.sp.current).toBe(2);

      // Take more damage
      vitals.decHp(50); // should go to 0
      expect(vitals.hp.current).toBe(0);
      expect(vitals.isDead).toBe(true);
    });

    test("should handle rest recovery scenario", () => {
      const vitals = new CharacterVitals({});

      // Character after battle
      vitals.hp.setCurrent(3);
      vitals.mp.setCurrent(1);
      vitals.sp.setCurrent(0);

      // Rest recovery (restore some vitals)
      vitals.incHp(5).incMp(7).incSp(10);

      expect(vitals.hp.current).toBe(8);
      expect(vitals.mp.current).toBe(8);
      expect(vitals.sp.current).toBe(10); // at max
      expect(vitals.isDead).toBe(false);
    });

    test("should handle character progression scenario", () => {
      const vitals = new CharacterVitals({});

      // Level 1 character
      vitals.hp.setBase(20);
      vitals.mp.setBase(15);
      vitals.sp.setBase(25);

      // Add equipment bonuses
      vitals.hp.setBonus(5);
      vitals.mp.setBonus(10);
      vitals.sp.setBonus(-3); // heavy armor penalty

      expect(vitals.hp.max).toBe(25);
      expect(vitals.mp.max).toBe(25);
      expect(vitals.sp.max).toBe(22);

      // Level up
      vitals.hp.addBase(5);
      vitals.mp.addBase(3);
      vitals.sp.addBase(2);

      expect(vitals.hp.max).toBe(30);
      expect(vitals.mp.max).toBe(28);
      expect(vitals.sp.max).toBe(24);
    });
  });
});
