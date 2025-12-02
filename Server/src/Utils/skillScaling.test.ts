/**
 * Skill Level Multiplier Tests
 * 
 * Tests for the skillLevelMultiplier function to ensure correct calculation:
 * Formula: base + (perLevel * level)
 * Default: base = 1, perLevel = 0.1
 */

import { expect, describe, it } from "@jest/globals";
import { skillLevelMultiplier } from "./skillScaling";

describe("skillLevelMultiplier", () => {
  describe("Default parameters (base=1, perLevel=0.1)", () => {
    it("should return 1.0 for level 0", () => {
      expect(skillLevelMultiplier(0)).toBe(1.0);
    });

    it("should return 1.1 for level 1", () => {
      expect(skillLevelMultiplier(1)).toBe(1.1);
    });

    it("should return 1.5 for level 5", () => {
      expect(skillLevelMultiplier(5)).toBe(1.5);
    });

    it("should return 2.0 for level 10", () => {
      expect(skillLevelMultiplier(10)).toBe(2.0);
    });

    it("should return 1.0 for negative level (clamped to 0)", () => {
      expect(skillLevelMultiplier(-5)).toBe(1.0);
    });
  });

  describe("Custom parameters", () => {
    it("should work with custom base and perLevel", () => {
      // base=2, perLevel=0.2, level=5
      // Expected: 2 + (0.2 * 5) = 2 + 1 = 3
      expect(skillLevelMultiplier(5, 0.2, 2)).toBe(3);
    });

    it("should work with zero base", () => {
      // base=0, perLevel=0.1, level=5
      // Expected: 0 + (0.1 * 5) = 0.5
      expect(skillLevelMultiplier(5, 0.1, 0)).toBe(0.5);
    });

    it("should work with different perLevel values", () => {
      // base=1, perLevel=0.15, level=5
      // Expected: 1 + (0.15 * 5) = 1 + 0.75 = 1.75
      expect(skillLevelMultiplier(5, 0.15, 1)).toBe(1.75);
    });
  });

  describe("Edge cases", () => {
    it("should handle very high levels", () => {
      // base=1, perLevel=0.1, level=100
      // Expected: 1 + (0.1 * 100) = 11
      expect(skillLevelMultiplier(100)).toBe(11);
    });

    it("should handle fractional perLevel", () => {
      // base=1, perLevel=0.05, level=10
      // Expected: 1 + (0.05 * 10) = 1.5
      expect(skillLevelMultiplier(10, 0.05, 1)).toBe(1.5);
    });
  });
});

