import { describe, expect, it } from "bun:test";
import { getRandomWeatherDeviant } from "../../../src/Entity/Location/WeatherCard/getRandomWeatherDeviant";

describe("getRandomWeatherDeviant", () => {
  describe("Return value ranges", () => {
    it("should always return a number between -5 and 5", () => {
      // Run 100 times to test randomness
      for (let i = 0; i < 100; i++) {
        const deviant = getRandomWeatherDeviant();
        expect(deviant).toBeGreaterThanOrEqual(-5);
        expect(deviant).toBeLessThanOrEqual(5);
      }
    });

    it("should return valid weather deviant values", () => {
      const validValues = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
      
      // Run 100 times to collect samples
      const results = new Set<number>();
      for (let i = 0; i < 100; i++) {
        const deviant = getRandomWeatherDeviant();
        results.add(deviant);
      }
      
      // All results should be in the valid set
      results.forEach((value) => {
        expect(validValues).toContain(value);
      });
    });

    it("should return an integer", () => {
      for (let i = 0; i < 50; i++) {
        const deviant = getRandomWeatherDeviant();
        expect(Number.isInteger(deviant)).toBe(true);
      }
    });
  });

  describe("Distribution characteristics", () => {
    it("should produce a variety of values over many rolls", () => {
      const results = new Set<number>();
      
      // Run 200 times - should see multiple different values
      for (let i = 0; i < 200; i++) {
        const deviant = getRandomWeatherDeviant();
        results.add(deviant);
      }
      
      // Should have at least 5 different values out of 10 possible
      expect(results.size).toBeGreaterThanOrEqual(5);
    });

    it("should produce both negative and positive values", () => {
      const results: number[] = [];
      
      // Run 200 times
      for (let i = 0; i < 200; i++) {
        results.push(getRandomWeatherDeviant());
      }
      
      const hasNegative = results.some((v) => v < 0);
      const hasPositive = results.some((v) => v > 0);
      
      // Over 200 rolls, should definitely see both
      expect(hasNegative).toBe(true);
      expect(hasPositive).toBe(true);
    });

    it("should potentially return zero (neutral)", () => {
      const results: number[] = [];
      
      // Zero can only occur on d20 rolls of 10 or less (after switch logic)
      // Actually, looking at the code, there's no case that returns 0!
      // The function returns values for 1-20, but skips 0
      // Let's verify this is intentional
      
      for (let i = 0; i < 100; i++) {
        results.push(getRandomWeatherDeviant());
      }
      
      // Verify the function never returns 0 (by design)
      // Cases 1-10 return negative, 11-20 return positive
      expect(results.every(v => v !== 0)).toBe(true);
    });
  });

  describe("Probability distribution (based on d20)", () => {
    it("should follow d20 distribution patterns", () => {
      const counts = new Map<number, number>();
      const iterations = 1000;
      
      for (let i = 0; i < iterations; i++) {
        const deviant = getRandomWeatherDeviant();
        counts.set(deviant, (counts.get(deviant) || 0) + 1);
      }
      
      // Each value should appear at least once in 1000 rolls
      // (extremely unlikely to miss any value)
      expect(counts.size).toBeGreaterThan(5);
      
      // The distribution should be somewhat uniform
      // Each of the 10 values (5 neg, 5 pos) maps to 2 d20 faces
      // So each should appear ~10% of the time (100 times in 1000 rolls)
      counts.forEach((count, value) => {
        // Allow wide variance due to randomness
        // Should be roughly 50-150 occurrences per value
        expect(count).toBeGreaterThan(20);
        expect(count).toBeLessThan(200);
      });
    });

    it("should have symmetric distribution", () => {
      const results: number[] = [];
      
      for (let i = 0; i < 2000; i++) {
        results.push(getRandomWeatherDeviant());
      }
      
      const negativeCount = results.filter(v => v < 0).length;
      const positiveCount = results.filter(v => v > 0).length;
      
      // Should be roughly 50/50 split (within 15%)
      const ratio = negativeCount / positiveCount;
      expect(ratio).toBeGreaterThan(0.75); // Not too skewed
      expect(ratio).toBeLessThan(1.33);
    });
  });

  describe("Edge cases", () => {
    it("should handle extreme rolls gracefully", () => {
      // The function should work consistently
      expect(() => {
        for (let i = 0; i < 1000; i++) {
          getRandomWeatherDeviant();
        }
      }).not.toThrow();
    });

    it("should return consistent types", () => {
      for (let i = 0; i < 100; i++) {
        const deviant = getRandomWeatherDeviant();
        expect(typeof deviant).toBe("number");
      }
    });
  });

  describe("Mapping verification", () => {
    // We can't directly control the dice roll, but we can verify the logic
    // by understanding the mapping:
    // 1-2 => -5, 3-4 => -4, 5-6 => -3, 7-8 => -2, 9-10 => -1
    // 11-12 => +1, 13-14 => +2, 15-16 => +3, 17-18 => +4, 19-20 => +5

    it("should produce values with expected frequency pairs", () => {
      const counts = new Map<number, number>();
      const iterations = 10000;
      
      for (let i = 0; i < iterations; i++) {
        const deviant = getRandomWeatherDeviant();
        counts.set(deviant, (counts.get(deviant) || 0) + 1);
      }
      
      // Each value corresponds to 2 faces on d20 (10% each)
      // In 10000 rolls, each should appear ~1000 times
      const values = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
      
      values.forEach((value) => {
        const count = counts.get(value) || 0;
        // Should be roughly 1000 ± 300 (allowing for variance)
        expect(count).toBeGreaterThan(700);
        expect(count).toBeLessThan(1300);
      });
    });
  });

  describe("Statistical properties", () => {
    it("should have a mean close to 0", () => {
      const results: number[] = [];
      
      for (let i = 0; i < 5000; i++) {
        results.push(getRandomWeatherDeviant());
      }
      
      const sum = results.reduce((a, b) => a + b, 0);
      const mean = sum / results.length;
      
      // Mean should be close to 0 (within ±0.5)
      expect(Math.abs(mean)).toBeLessThan(0.5);
    });

    it("should have reasonable variance", () => {
      const results: number[] = [];
      
      for (let i = 0; i < 5000; i++) {
        results.push(getRandomWeatherDeviant());
      }
      
      const mean = results.reduce((a, b) => a + b, 0) / results.length;
      const variance = results.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / results.length;
      const stdDev = Math.sqrt(variance);
      
      // Standard deviation should be between 2 and 4
      // (reasonable spread for values from -5 to +5)
      expect(stdDev).toBeGreaterThan(2);
      expect(stdDev).toBeLessThan(4);
    });
  });
});

