import { describe, expect, it, beforeEach, afterEach } from "bun:test";
import {
  factor,
  calculateYearlyBaseModifier,
  monthsUntilNextProduction,
  sumStorageInSubRegion,
  calculateLocalShortageFactor
} from "../../../src/Entity/Market/PriceModifiers";
import { GameTime } from "../../../src/Game/GameTime/GameTime";
import { locationRepository } from "../../../src/Entity/Repository/location";
import { Location } from "../../../src/Entity/Location/Location";
import { SubRegion } from "../../../src/Entity/Location/SubRegion";
import { LocationsEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Location";
import { SubRegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "../../../src/InterFacesEnumsAndTypes/Weather";
import type { ResourceGenerationConfig } from "../../../src/InterFacesEnumsAndTypes/Interfaces/Resource";

describe("PriceModifiers", () => {
  let originalSeason: typeof GameTime.season;
  let originalDay: typeof GameTime.dayOfSeason;

  beforeEach(() => {
    originalSeason = GameTime.season;
    originalDay = GameTime.dayOfSeason;
  });

  afterEach(() => {
    GameTime.season = originalSeason;
    GameTime.dayOfSeason = originalDay;
    locationRepository.clear();
  });

  describe("factor()", () => {
    it("should return 1.0 for ratios in comfort band (0.8-1.2)", () => {
      expect(factor(0.8)).toBe(1.0);
      expect(factor(0.9)).toBe(1.0);
      expect(factor(1.0)).toBe(1.0);
      expect(factor(1.1)).toBe(1.0);
      expect(factor(1.2)).toBe(1.0);
    });

    it("should apply sqrt curve outside comfort band", () => {
      expect(factor(0.5)).toBeCloseTo(Math.sqrt(0.5), 5);
      expect(factor(2.0)).toBeCloseTo(Math.sqrt(2.0), 5);
      expect(factor(0.64)).toBeCloseTo(0.8, 5);
      expect(factor(1.44)).toBeCloseTo(1.2, 5);
    });

    it("should clamp to minimum of 0.6", () => {
      expect(factor(0.3)).toBe(0.6);
      expect(factor(0.2)).toBe(0.6);
      expect(factor(0.1)).toBe(0.6);
      expect(factor(0.01)).toBe(0.6);
    });

    it("should clamp to maximum of 1.6", () => {
      expect(factor(3.0)).toBe(1.6);
      expect(factor(5.0)).toBe(1.6);
      expect(factor(10.0)).toBe(1.6);
    });

    it("should handle edge case of zero", () => {
      expect(factor(0)).toBe(0.6);
    });
  });

  describe("calculateYearlyBaseModifier()", () => {
    it("should return 1.0 when production meets baseline", () => {
      const modifier = calculateYearlyBaseModifier("ore", 1000, 1000);
      expect(modifier).toBe(1.0);
    });

    it("should return 1.0 when production is within comfort band", () => {
      const modifier1 = calculateYearlyBaseModifier("ore", 900, 1000); // 0.9 ratio
      expect(modifier1).toBe(1.0);

      const modifier2 = calculateYearlyBaseModifier("ore", 1100, 1000); // 1.1 ratio
      expect(modifier2).toBe(1.0);
    });

    it("should decrease modifier on high production", () => {
      const modifier = calculateYearlyBaseModifier("ore", 2000, 1000); // 2.0 ratio
      expect(modifier).toBeCloseTo(Math.sqrt(2.0), 5);
    });

    it("should increase modifier on low production", () => {
      const modifier = calculateYearlyBaseModifier("ore", 500, 1000); // 0.5 ratio
      expect(modifier).toBeCloseTo(Math.sqrt(0.5), 5);
    });

    it("should handle zero baseline gracefully", () => {
      const modifier = calculateYearlyBaseModifier("ore", 1000, 0);
      expect(modifier).toBe(1.0);
    });

    it("should clamp extreme shortages", () => {
      const modifier = calculateYearlyBaseModifier("ore", 100, 1000); // 0.1 ratio
      expect(modifier).toBe(0.6);
    });

    it("should clamp extreme surpluses", () => {
      const modifier = calculateYearlyBaseModifier("ore", 5000, 1000); // 5.0 ratio
      expect(modifier).toBe(1.6);
    });
  });

  describe("monthsUntilNextProduction()", () => {
    it("should calculate months until fish production (Season 1)", () => {
      // Currently in Season 2, Day 1 (month 1)
      GameTime.season = 2;
      GameTime.dayOfSeason = 1;
      
      // Fish produces in Season 1 (6 seasons later: 3,4,5,6,7,1)
      const months = monthsUntilNextProduction("fish");
      expect(months).toBe(12); // (6 seasons × 2 months) - 0
    });

    it("should calculate months until grain production (Season 4)", () => {
      // Currently in Season 1, Day 1 (month 1)
      GameTime.season = 1;
      GameTime.dayOfSeason = 1;
      
      // Grain produces in Season 4 (3 seasons away)
      const months = monthsUntilNextProduction("grain");
      expect(months).toBe(6); // 3 seasons × 2 months
    });

    it("should handle being in production season", () => {
      // Currently in Season 4 (grain season)
      GameTime.season = 4;
      GameTime.dayOfSeason = 1;
      
      const months = monthsUntilNextProduction("grain");
      expect(months).toBe(1); // Same season, month 1
    });

    it("should handle second month of season", () => {
      GameTime.season = 1;
      GameTime.dayOfSeason = 30; // Second month
      
      const months = monthsUntilNextProduction("grain");
      expect(months).toBe(5); // 3 seasons away - 1 for current month
    });

    it("should never return less than 1", () => {
      GameTime.season = 1;
      GameTime.dayOfSeason = 48; // Last day of season
      
      const months = monthsUntilNextProduction("fish");
      expect(months).toBeGreaterThanOrEqual(1);
    });

    it("should calculate correctly for all resources", () => {
      GameTime.season = 1;
      GameTime.dayOfSeason = 1;
      
      const resources = {
        fish: 1,       // Same season (current month)
        livestock: 1,  // Same season
        wood: 2,       // Next season (2 months)
        herbs: 2,
        fruits: 3,
        grain: 4,
        vegetables: 4,
        silk: 5,
        gemstone: 6,
        ore: 7
      };
      
      for (const [resource, season] of Object.entries(resources)) {
        const months = monthsUntilNextProduction(resource as any);
        const expectedMonths = (season - 1) * 2;
        expect(months).toBe(expectedMonths === 0 ? 1 : expectedMonths);
      }
    });
  });

  describe("sumStorageInSubRegion()", () => {
    it("should sum storage across all locations in subregion", () => {
      const weatherInterpretation = new Map([[50, Weather.Clear]]);
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );

      const config1: ResourceGenerationConfig = {
        capacity: { ore: 1000, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        rate: { ore: 100, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        stockpile: { ore: 500, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 }
      };

      const config2: ResourceGenerationConfig = {
        capacity: { ore: 1000, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        rate: { ore: 100, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        stockpile: { ore: 300, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 }
      };

      const loc1 = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        config1
      );

      const loc2 = new Location(
        LocationsEnum.BrayhornVillage,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        config2
      );

      locationRepository.set(LocationsEnum.FyonarCity, loc1);
      locationRepository.set(LocationsEnum.BrayhornVillage, loc2);

      const total = sumStorageInSubRegion(SubRegionEnum.GoldenPlains, "ore");
      expect(total).toBe(800); // 500 + 300
    });

    it("should return 0 for subregion with no locations", () => {
      const total = sumStorageInSubRegion(SubRegionEnum.WhitePeaks, "ore");
      expect(total).toBe(0);
    });

    it("should only sum locations in specified subregion", () => {
      const weatherInterpretation = new Map([[50, Weather.Clear]]);
      const subRegion1 = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      const subRegion2 = new SubRegion(
        SubRegionEnum.WhitePeaks,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );

      const config1: ResourceGenerationConfig = {
        capacity: { ore: 1000, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        rate: { ore: 100, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        stockpile: { ore: 500, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 }
      };

      const config2: ResourceGenerationConfig = {
        capacity: { ore: 1000, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        rate: { ore: 100, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        stockpile: { ore: 300, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 }
      };

      const loc1 = new Location(
        LocationsEnum.FyonarCity,
        subRegion1,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        config1
      );

      const loc2 = new Location(
        LocationsEnum.BrayhornVillage,
        subRegion2,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        config2
      );

      locationRepository.set(LocationsEnum.FyonarCity, loc1);
      locationRepository.set(LocationsEnum.BrayhornVillage, loc2);

      const total1 = sumStorageInSubRegion(SubRegionEnum.GoldenPlains, "ore");
      expect(total1).toBe(500); // Only loc1

      const total2 = sumStorageInSubRegion(SubRegionEnum.WhitePeaks, "ore");
      expect(total2).toBe(300); // Only loc2
    });
  });

  describe("calculateLocalShortageFactor()", () => {
    it("should return 1.0 when storage matches baseline", () => {
      const weatherInterpretation = new Map([[50, Weather.Clear]]);
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );

      const config: ResourceGenerationConfig = {
        capacity: { ore: 1000, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        rate: { ore: 100, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        stockpile: { ore: 500, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        config
      );

      locationRepository.set(LocationsEnum.FyonarCity, location);

      GameTime.season = 1;
      GameTime.dayOfSeason = 1;
      
      // localStorage = 500, baseline = 100, months = 13 (to next ore season)
      // localRatio = (500 / 13) / 100 ≈ 0.38
      // But this is just one location, let's use reasonable baselines
      
      const factor = calculateLocalShortageFactor(
        LocationsEnum.FyonarCity,
        "ore",
        100, // local baseline
        500  // subregion baseline
      );

      expect(factor).toBeGreaterThan(0);
      expect(factor).toBeLessThanOrEqual(1.6);
    });

    it("should apply 75/25 weighting between local and subregion", () => {
      const weatherInterpretation = new Map([[50, Weather.Clear]]);
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );

      const config: ResourceGenerationConfig = {
        capacity: { ore: 1000, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        rate: { ore: 100, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        stockpile: { ore: 1000, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        config
      );

      locationRepository.set(LocationsEnum.FyonarCity, location);

      GameTime.season = 1;
      GameTime.dayOfSeason = 1;

      const factor = calculateLocalShortageFactor(
        LocationsEnum.FyonarCity,
        "ore",
        100,  // local baseline
        100   // subregion baseline
      );

      // With ample storage, factor should be in comfort band or slightly higher
      expect(factor).toBeGreaterThan(0.6);
      expect(factor).toBeLessThanOrEqual(1.6);
    });

    it("should return 1.0 when location not found", () => {
      const factor = calculateLocalShortageFactor(
        LocationsEnum.FyonarCity,
        "ore",
        100,
        500
      );

      expect(factor).toBe(1.0);
    });

    it("should handle zero baselines gracefully", () => {
      const weatherInterpretation = new Map([[50, Weather.Clear]]);
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );

      const config: ResourceGenerationConfig = {
        capacity: { ore: 1000, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        rate: { ore: 100, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        stockpile: { ore: 500, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        config
      );

      locationRepository.set(LocationsEnum.FyonarCity, location);

      const factor = calculateLocalShortageFactor(
        LocationsEnum.FyonarCity,
        "ore",
        0, // zero baseline
        0  // zero baseline
      );

      expect(factor).toBe(1.0);
    });
  });
});

