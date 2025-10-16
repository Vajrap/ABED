import { describe, expect, it, beforeEach, afterEach } from "bun:test";
import { ResourceProductionTracker } from "../../../src/Entity/Market/ResourceProductionTracker";
import { LocationsEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Location";
import { SubRegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Region";
import { locationRepository } from "../../../src/Entity/Repository/location";
import { Location } from "../../../src/Entity/Location/Location";
import { SubRegion } from "../../../src/Entity/Location/SubRegion";
import { Weather } from "../../../src/InterFacesEnumsAndTypes/Weather";
import type { ResourceGenerationConfig } from "../../../src/InterFacesEnumsAndTypes/Interfaces/Resource";

describe("ResourceProductionTracker", () => {
  let tracker: ResourceProductionTracker;

  beforeEach(() => {
    tracker = new ResourceProductionTracker();
    locationRepository.clear();
  });

  afterEach(() => {
    locationRepository.clear();
  });

  describe("recordProduction()", () => {
    it("should record production at all three levels", () => {
      tracker.recordProduction(
        LocationsEnum.FyonarCity,
        SubRegionEnum.GoldenPlains,
        "ore",
        100
      );

      expect(tracker.yearlyProduction.global.get("ore")).toBe(100);
      expect(tracker.yearlyProduction.subregion.get(SubRegionEnum.GoldenPlains)?.get("ore")).toBe(100);
      expect(tracker.yearlyProduction.location.get(LocationsEnum.FyonarCity)?.get("ore")).toBe(100);
    });

    it("should accumulate production from multiple recordings", () => {
      tracker.recordProduction(
        LocationsEnum.FyonarCity,
        SubRegionEnum.GoldenPlains,
        "ore",
        100
      );

      tracker.recordProduction(
        LocationsEnum.FyonarCity,
        SubRegionEnum.GoldenPlains,
        "ore",
        50
      );

      expect(tracker.yearlyProduction.global.get("ore")).toBe(150);
      expect(tracker.yearlyProduction.location.get(LocationsEnum.FyonarCity)?.get("ore")).toBe(150);
    });

    it("should track multiple resources separately", () => {
      tracker.recordProduction(
        LocationsEnum.FyonarCity,
        SubRegionEnum.GoldenPlains,
        "ore",
        100
      );

      tracker.recordProduction(
        LocationsEnum.FyonarCity,
        SubRegionEnum.GoldenPlains,
        "grain",
        200
      );

      expect(tracker.yearlyProduction.global.get("ore")).toBe(100);
      expect(tracker.yearlyProduction.global.get("grain")).toBe(200);
    });

    it("should track multiple locations separately", () => {
      tracker.recordProduction(
        LocationsEnum.FyonarCity,
        SubRegionEnum.GoldenPlains,
        "ore",
        100
      );

      tracker.recordProduction(
        LocationsEnum.BrayhornVillage,
        SubRegionEnum.GoldenPlains,
        "ore",
        50
      );

      expect(tracker.yearlyProduction.location.get(LocationsEnum.FyonarCity)?.get("ore")).toBe(100);
      expect(tracker.yearlyProduction.location.get(LocationsEnum.BrayhornVillage)?.get("ore")).toBe(50);
      expect(tracker.yearlyProduction.global.get("ore")).toBe(150); // Sum
    });

    it("should track multiple subregions separately", () => {
      tracker.recordProduction(
        LocationsEnum.FyonarCity,
        SubRegionEnum.GoldenPlains,
        "ore",
        100
      );

      tracker.recordProduction(
        LocationsEnum.MeadowbrookVillage,
        SubRegionEnum.WhitePeaks,
        "ore",
        75
      );

      expect(tracker.yearlyProduction.subregion.get(SubRegionEnum.GoldenPlains)?.get("ore")).toBe(100);
      expect(tracker.yearlyProduction.subregion.get(SubRegionEnum.WhitePeaks)?.get("ore")).toBe(75);
      expect(tracker.yearlyProduction.global.get("ore")).toBe(175); // Sum
    });
  });

  describe("calculateYearlyModifiers()", () => {
    it("should return clamped modifier for resources with no production", () => {
      const modifiers = tracker.calculateYearlyModifiers();

      // No production (0) with baseline > 0 means ratio = 0
      // factor(0) = sqrt(0) = 0, clamped to MAX 1.6 (prices go UP when scarce!)
      expect(modifiers.get("ore")).toBe(1.6);
      expect(modifiers.get("grain")).toBe(1.6);
    });

    it("should calculate modifiers based on production vs baseline", () => {
      // Set up location with baseline
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
        stockpile: { ore: 0, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 }
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

      // Recreate tracker to pick up baselines
      tracker = new ResourceProductionTracker();

      // Record production
      tracker.recordProduction(
        LocationsEnum.FyonarCity,
        SubRegionEnum.GoldenPlains,
        "ore",
        500
      );

      const modifiers = tracker.calculateYearlyModifiers();
      const oreModifier = modifiers.get("ore");

      expect(oreModifier).toBeGreaterThan(0);
      expect(oreModifier).toBeLessThanOrEqual(1.6);
    });

    it("should return modifiers for all resources", () => {
      const modifiers = tracker.calculateYearlyModifiers();

      const resources = ["ore", "gemstone", "wood", "herbs", "silk", "fish", "grain", "vegetables", "fruits", "livestock"];
      
      resources.forEach(resource => {
        expect(modifiers.has(resource as any)).toBe(true);
      });
    });
  });

  describe("resetYearlyTracking()", () => {
    it("should clear all production data", () => {
      tracker.recordProduction(
        LocationsEnum.FyonarCity,
        SubRegionEnum.GoldenPlains,
        "ore",
        1000
      );

      tracker.recordProduction(
        LocationsEnum.BrayhornVillage,
        SubRegionEnum.GoldenPlains,
        "grain",
        2000
      );

      expect(tracker.yearlyProduction.global.get("ore")).toBe(1000);
      expect(tracker.yearlyProduction.global.get("grain")).toBe(2000);

      tracker.resetYearlyTracking();

      expect(tracker.yearlyProduction.global.get("ore")).toBeUndefined();
      expect(tracker.yearlyProduction.global.get("grain")).toBeUndefined();
    });

    it("should not affect baselines", () => {
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
        stockpile: { ore: 0, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 }
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

      tracker = new ResourceProductionTracker();

      const baselineBefore = tracker.getLocationBaseline(LocationsEnum.FyonarCity, "ore");
      
      tracker.resetYearlyTracking();
      
      const baselineAfter = tracker.getLocationBaseline(LocationsEnum.FyonarCity, "ore");

      expect(baselineBefore).toBe(baselineAfter);
    });
  });

  describe("getLocationBaseline()", () => {
    it("should return baseline from location capacity", () => {
      const weatherInterpretation = new Map([[50, Weather.Clear]]);
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );

      const config: ResourceGenerationConfig = {
        capacity: { ore: 1500, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        rate: { ore: 100, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        stockpile: { ore: 0, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 }
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

      tracker = new ResourceProductionTracker();

      const baseline = tracker.getLocationBaseline(LocationsEnum.FyonarCity, "ore");
      expect(baseline).toBe(1500); // Matches capacity
    });

    it("should return 0 for non-existent location", () => {
      const baseline = tracker.getLocationBaseline(LocationsEnum.FyonarCity, "ore");
      expect(baseline).toBe(0);
    });
  });

  describe("getSubRegionBaseline()", () => {
    it("should return sum of location baselines in subregion", () => {
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
        stockpile: { ore: 0, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 }
      };

      const config2: ResourceGenerationConfig = {
        capacity: { ore: 500, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        rate: { ore: 50, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        stockpile: { ore: 0, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 }
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

      tracker = new ResourceProductionTracker();

      const baseline = tracker.getSubRegionBaseline(SubRegionEnum.GoldenPlains, "ore");
      expect(baseline).toBe(1500); // 1000 + 500
    });

    it("should return 0 for non-existent subregion", () => {
      const baseline = tracker.getSubRegionBaseline(SubRegionEnum.WhitePeaks, "ore");
      expect(baseline).toBe(0);
    });
  });

  describe("calculateYearlyModifiers()", () => {
    it("should calculate modifiers based on production vs baseline", () => {
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
        stockpile: { ore: 0, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 }
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

      tracker = new ResourceProductionTracker();

      // Record production matching baseline (capacity)
      tracker.recordProduction(
        LocationsEnum.FyonarCity,
        SubRegionEnum.GoldenPlains,
        "ore",
        1000
      );

      const modifiers = tracker.calculateYearlyModifiers();
      
      // Production = baseline, ratio = 1.0, should be in comfort band
      expect(modifiers.get("ore")).toBe(1.0);
    });

    it("should return modifiers for all resources", () => {
      const modifiers = tracker.calculateYearlyModifiers();

      expect(modifiers.size).toBe(10); // All resource types
      expect(modifiers.has("ore")).toBe(true);
      expect(modifiers.has("grain")).toBe(true);
      expect(modifiers.has("wood")).toBe(true);
    });

    it("should handle low production correctly", () => {
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
        stockpile: { ore: 0, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 }
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

      tracker = new ResourceProductionTracker();

      // Record much less production than baseline
      tracker.recordProduction(
        LocationsEnum.FyonarCity,
        SubRegionEnum.GoldenPlains,
        "ore",
        100 // Only 10% of 1000 baseline
      );

      const modifiers = tracker.calculateYearlyModifiers();
      const oreModifier = modifiers.get("ore");

      // ratio = 0.1, factor(0.1) = sqrt(0.1) ≈ 0.316, clamped to MAX 1.6 (low prod = high price!)
      expect(oreModifier).toBe(1.6);
    });

    it("should handle high production correctly", () => {
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
        stockpile: { ore: 0, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 }
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

      tracker = new ResourceProductionTracker();

      // Record much more production than baseline
      tracker.recordProduction(
        LocationsEnum.FyonarCity,
        SubRegionEnum.GoldenPlains,
        "ore",
        3000 // 300% of baseline
      );

      const modifiers = tracker.calculateYearlyModifiers();
      const oreModifier = modifiers.get("ore");

      // ratio = 3.0, factor(3.0) = sqrt(3.0) ≈ 1.732, clamped to MIN 0.6 (high prod = low price!)
      expect(oreModifier).toBe(0.6);
    });
  });

  describe("baseline auto-calculation", () => {
    it("should calculate global baseline from all location capacities", () => {
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
        stockpile: { ore: 0, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 }
      };

      const config2: ResourceGenerationConfig = {
        capacity: { ore: 500, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        rate: { ore: 50, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 },
        stockpile: { ore: 0, gemstone: 0, wood: 0, herbs: 0, silk: 0, fish: 0, grain: 0, vegetables: 0, fruits: 0, livestock: 0 }
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

      tracker = new ResourceProductionTracker();

      const globalBaseline = tracker.baselines.global.get("ore");
      expect(globalBaseline).toBe(1500); // 1000 + 500
    });
  });
});

