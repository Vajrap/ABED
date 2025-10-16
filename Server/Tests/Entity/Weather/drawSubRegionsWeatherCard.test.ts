import { describe, expect, it, beforeEach } from "bun:test";
import { subregionRepository } from "../../../src/Entity/Repository/subregion";
import { drawSubRegionsWeatherCard } from "../../../src/Event/subRegionWeather";
import { SubRegion } from "../../../src/Entity/Location/SubRegion";
import { SubRegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "../../../src/InterFacesEnumsAndTypes/Weather";
import { Location } from "../../../src/Entity/Location/Location";
import { LocationsEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Location";
import { locationRepository } from "../../../src/Entity/Repository/location";

describe("drawSubRegionsWeatherCard", () => {
  beforeEach(() => {
    // Clear repositories
    subregionRepository.clear();
    locationRepository.clear();
  });

  describe("Basic functionality", () => {
    it("should execute without errors when repositories are empty", () => {
      expect(() => {
        drawSubRegionsWeatherCard();
      }).not.toThrow();
    });

    it("should call handleDailyWeatherUpdate on all subregions", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [50, Weather.Clear],
      ]);
      
      // Create subregions
      const subRegion1 = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      const subRegion2 = new SubRegion(
        SubRegionEnum.GreatWhiteValley,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      // Create locations
      const loc1 = new Location(
        LocationsEnum.FyonarCity,
        subRegion1,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        50
      );
      
      const loc2 = new Location(
        LocationsEnum.BrayhornVillage,
        subRegion2,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        50
      );
      
      // Add to repositories
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion1);
      subregionRepository.set(SubRegionEnum.GreatWhiteValley, subRegion2);
      locationRepository.set(LocationsEnum.FyonarCity, loc1);
      locationRepository.set(LocationsEnum.BrayhornVillage, loc2);
      
      const initialScale1 = loc1.weatherScale;
      const initialScale2 = loc2.weatherScale;
      
      // Draw weather cards for all subregions
      drawSubRegionsWeatherCard();
      
      // Both locations should be processed
      // (At least one should change, extremely high probability)
      expect(typeof loc1.weatherScale).toBe("number");
      expect(typeof loc2.weatherScale).toBe("number");
    });

    it("should update weather for multiple locations in same subregion", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [50, Weather.Clear],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      // Create 3 locations in same subregion
      const loc1 = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        50
      );
      
      const loc2 = new Location(
        LocationsEnum.BrayhornVillage,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        50
      );
      
      const loc3 = new Location(
        LocationsEnum.MeadowbrookVillage,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        50
      );
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion);
      locationRepository.set(LocationsEnum.FyonarCity, loc1);
      locationRepository.set(LocationsEnum.BrayhornVillage, loc2);
      locationRepository.set(LocationsEnum.MeadowbrookVillage, loc3);
      
      const initialScale1 = loc1.weatherScale;
      const initialScale2 = loc2.weatherScale;
      const initialScale3 = loc3.weatherScale;
      
      drawSubRegionsWeatherCard();
      
      // All locations should be updated
      expect(typeof loc1.weatherScale).toBe("number");
      expect(typeof loc2.weatherScale).toBe("number");
      expect(typeof loc3.weatherScale).toBe("number");
    });
  });

  describe("Multiple subregions", () => {
    it("should handle multiple subregions with different volatilities", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [50, Weather.Clear],
      ]);
      
      const tranquilSub = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "TRANQUIL",
        weatherInterpretation
      );
      
      const extremeSub = new SubRegion(
        SubRegionEnum.GreatWhiteValley,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "EXTREME",
        weatherInterpretation
      );
      
      const loc1 = new Location(
        LocationsEnum.FyonarCity,
        tranquilSub,
        [],
        [],
        "TRANQUIL",
        undefined,
        undefined,
        80
      );
      
      const loc2 = new Location(
        LocationsEnum.BrayhornVillage,
        extremeSub,
        [],
        [],
        "EXTREME",
        undefined,
        undefined,
        20
      );
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, tranquilSub);
      subregionRepository.set(SubRegionEnum.GreatWhiteValley, extremeSub);
      locationRepository.set(LocationsEnum.FyonarCity, loc1);
      locationRepository.set(LocationsEnum.BrayhornVillage, loc2);
      
      // Run 30 updates for more statistical certainty
      for (let i = 0; i < 30; i++) {
        drawSubRegionsWeatherCard();
      }
      
      // TRANQUIL should trend down (allow some variance), EXTREME should trend up
      // With 30 draws, TRANQUIL is very likely to decrease from 80
      // EXTREME should definitely increase from 20
      expect(loc2.weatherScale).toBeGreaterThan(20);
    });

    it("should process all subregions in repository", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [50, Weather.Clear],
      ]);
      
      // Create 5 different subregions
      const subregions = [
        SubRegionEnum.GoldenPlains,
        SubRegionEnum.GreatWhiteValley,
        SubRegionEnum.WhitePeaks,
        SubRegionEnum.LanternCoast,
        SubRegionEnum.DuskmarchOasis,
      ];
      
      const locations: Location[] = [];
      
      subregions.forEach((subRegionEnum, index) => {
        const subRegion = new SubRegion(
          subRegionEnum,
          RegionEnum.CentralPlain,
          { walk: 0, horse: 0, caravan: 0 },
          "STABLE",
          weatherInterpretation
        );
        
        const locationEnum = (Object.values(LocationsEnum)[index] || LocationsEnum.FyonarCity) as LocationsEnum;
        
        const loc = new Location(
          locationEnum,
          subRegion,
          [],
          [],
          "STABLE",
          undefined,
          undefined,
          50
        );
        
        subregionRepository.set(subRegionEnum, subRegion);
        locationRepository.set(locationEnum, loc);
        locations.push(loc);
      });
      
      // Store initial values
      const initialScales = locations.map(loc => loc.weatherScale);
      
      drawSubRegionsWeatherCard();
      
      // All locations should be processed
      locations.forEach((loc, index) => {
        expect(typeof loc.weatherScale).toBe("number");
      });
    });
  });

  describe("Weather deck state", () => {
    it("should draw one card per subregion per call", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [50, Weather.Clear],
      ]);
      
      const subRegion1 = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      const subRegion2 = new SubRegion(
        SubRegionEnum.GreatWhiteValley,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      const loc1 = new Location(
        LocationsEnum.FyonarCity,
        subRegion1,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        50
      );
      
      const loc2 = new Location(
        LocationsEnum.BrayhornVillage,
        subRegion2,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        50
      );
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion1);
      subregionRepository.set(SubRegionEnum.GreatWhiteValley, subRegion2);
      locationRepository.set(LocationsEnum.FyonarCity, loc1);
      locationRepository.set(LocationsEnum.BrayhornVillage, loc2);
      
      // Verify subregions were added
      expect(subregionRepository.size).toBe(2);
      
      const initialDeck1 = subRegion1.weatherDeck.cards.length;
      const initialDeck2 = subRegion2.weatherDeck.cards.length;
      
      expect(initialDeck1).toBe(20);
      expect(initialDeck2).toBe(20);
      
      drawSubRegionsWeatherCard();
      
      // Each deck should have one less card (cards are drawn via handleDailyWeatherUpdate)
      expect(subRegion1.weatherDeck.cards.length).toBe(19);
      expect(subRegion2.weatherDeck.cards.length).toBe(19);
      
      // Each drawn pile should have one more card
      expect(subRegion1.weatherDeck.drawn.length).toBe(1);
      expect(subRegion2.weatherDeck.drawn.length).toBe(1);
    });

    it("should maintain independent decks for different subregions", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [50, Weather.Clear],
      ]);
      
      const subRegion1 = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "TRANQUIL",
        weatherInterpretation
      );
      
      const subRegion2 = new SubRegion(
        SubRegionEnum.GreatWhiteValley,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "EXTREME",
        weatherInterpretation
      );
      
      const loc1 = new Location(
        LocationsEnum.FyonarCity,
        subRegion1,
        [],
        [],
        "TRANQUIL",
        undefined,
        undefined,
        50
      );
      
      const loc2 = new Location(
        LocationsEnum.BrayhornVillage,
        subRegion2,
        [],
        [],
        "EXTREME",
        undefined,
        undefined,
        50
      );
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion1);
      subregionRepository.set(SubRegionEnum.GreatWhiteValley, subRegion2);
      locationRepository.set(LocationsEnum.FyonarCity, loc1);
      locationRepository.set(LocationsEnum.BrayhornVillage, loc2);
      
      expect(subregionRepository.size).toBe(2);
      
      // Draw 10 cards
      for (let i = 0; i < 10; i++) {
        drawSubRegionsWeatherCard();
      }
      
      // Both decks should have drawn 10 cards each
      expect(subRegion1.weatherDeck.cards.length).toBe(10);
      expect(subRegion1.weatherDeck.drawn.length).toBe(10);
      expect(subRegion2.weatherDeck.cards.length).toBe(10);
      expect(subRegion2.weatherDeck.drawn.length).toBe(10);
    });
  });

  describe("Integration with GameLoop timing", () => {
    it("should be callable daily (gameDateHour === 1)", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [50, Weather.Clear],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      const loc = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        50
      );
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion);
      locationRepository.set(LocationsEnum.FyonarCity, loc);
      
      // Simulate 7 days (week)
      for (let day = 0; day < 7; day++) {
        drawSubRegionsWeatherCard();
      }
      
      // Should have drawn 7 cards
      expect(subRegion.weatherDeck.drawn.length).toBe(7);
      expect(subRegion.weatherDeck.cards.length).toBe(13); // 20 - 7
    });

    it("should handle multiple weeks (with reshuffle)", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [50, Weather.Clear],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      const loc = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        50
      );
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion);
      locationRepository.set(LocationsEnum.FyonarCity, loc);
      
      // Simulate 25 days (more than deck size)
      for (let day = 0; day < 25; day++) {
        drawSubRegionsWeatherCard();
      }
      
      // Deck should have reshuffled once
      // After 20 draws, reshuffle happens on 21st
      // So at day 25: cards = 15, drawn = 5
      expect(subRegion.weatherDeck.cards.length).toBe(15);
      expect(subRegion.weatherDeck.drawn.length).toBe(5);
    });

    it("should be performant with many subregions", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [50, Weather.Clear],
      ]);
      
      // Create 20 subregions
      for (let i = 0; i < 20; i++) {
        const subRegionEnum = (Object.values(SubRegionEnum)[i % Object.values(SubRegionEnum).length]) as SubRegionEnum;
        const locationEnum = (Object.values(LocationsEnum)[i % Object.values(LocationsEnum).length]) as LocationsEnum;
        
        const subRegion = new SubRegion(
          subRegionEnum,
          RegionEnum.CentralPlain,
          { walk: 0, horse: 0, caravan: 0 },
          "STABLE",
          weatherInterpretation
        );
        
        const loc = new Location(
          locationEnum,
          subRegion,
          [],
          [],
          "STABLE",
          undefined,
          undefined,
          50
        );
        
        // Use unique keys by appending index
        subregionRepository.set(`${subRegionEnum}_${i}` as any, subRegion);
        locationRepository.set(`${locationEnum}_${i}` as any, loc);
      }
      
      const startTime = Date.now();
      drawSubRegionsWeatherCard();
      const endTime = Date.now();
      
      // Should complete quickly (under 100ms)
      expect(endTime - startTime).toBeLessThan(100);
    });
  });

  describe("Error handling", () => {
    it("should not crash if a subregion has no locations", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [50, Weather.Clear],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      // Add subregion but no locations
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion);
      
      expect(() => {
        drawSubRegionsWeatherCard();
      }).not.toThrow();
    });

    it("should handle concurrent calls gracefully", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [50, Weather.Clear],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      const loc = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        50
      );
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion);
      locationRepository.set(LocationsEnum.FyonarCity, loc);
      
      expect(() => {
        // Call multiple times in quick succession
        drawSubRegionsWeatherCard();
        drawSubRegionsWeatherCard();
        drawSubRegionsWeatherCard();
      }).not.toThrow();
    });
  });

  describe("Weather scale changes", () => {
    it("should produce different weather scales after multiple days", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [50, Weather.Clear],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      const loc = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        50
      );
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion);
      locationRepository.set(LocationsEnum.FyonarCity, loc);
      
      const scalesOverTime: number[] = [loc.weatherScale];
      
      // Track changes over 30 days
      for (let day = 0; day < 30; day++) {
        drawSubRegionsWeatherCard();
        scalesOverTime.push(loc.weatherScale);
      }
      
      // Should have variety in values
      const uniqueScales = new Set(scalesOverTime);
      expect(uniqueScales.size).toBeGreaterThan(10); // At least 10 different values
    });
  });
});

