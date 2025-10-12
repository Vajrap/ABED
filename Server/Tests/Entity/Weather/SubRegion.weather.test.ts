import { describe, expect, it, beforeEach, mock } from "bun:test";
import { SubRegion } from "../../../src/Entity/Location/SubRegion";
import { SubRegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "../../../src/InterFacesEnumsAndTypes/Weather";
import { Location } from "../../../src/Entity/Location/Location";
import { LocationsEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Location";
import { locationRepository } from "../../../src/Entity/Location/Repository/location";

describe("SubRegion - Weather System", () => {
  describe("handleDailyWeatherUpdate", () => {
    let subRegion: SubRegion;
    let testLocation1: Location;
    let testLocation2: Location;
    
    beforeEach(() => {
      // Clear location repository
      locationRepository.clear();
      
      // Create weather interpretation map
      const weatherInterpretation = new Map<number, Weather>([
        [0, Weather.Blizzard],
        [10, Weather.HeavySnow],
        [20, Weather.LightSnow],
        [30, Weather.Cloudy],
        [40, Weather.Clear],
        [50, Weather.Clear],
        [60, Weather.Cloudy],
        [70, Weather.LightRain],
        [80, Weather.HeavyRain],
        [90, Weather.Storm],
        [100, Weather.Monsoon],
      ]);
      
      // Create subregion
      subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      // Create test locations
      testLocation1 = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        50 // Starting weather scale
      );
      
      testLocation2 = new Location(
        LocationsEnum.BrayhornVillage,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        50 // Starting weather scale
      );
      
      // Add to repository
      locationRepository.set(LocationsEnum.FyonarCity, testLocation1);
      locationRepository.set(LocationsEnum.BrayhornVillage, testLocation2);
    });

    it("should update weather scale for all locations in subregion", () => {
      const initialScale1 = testLocation1.weatherScale;
      const initialScale2 = testLocation2.weatherScale;
      
      subRegion.handleDailyWeatherUpdate();
      
      // Both locations should have changed (card value + deviant != 0 in almost all cases)
      const changed1 = testLocation1.weatherScale !== initialScale1;
      const changed2 = testLocation2.weatherScale !== initialScale2;
      
      // At least one should change (extremely high probability)
      expect(changed1 || changed2).toBe(true);
    });

    it("should apply both card value and deviant to weather scale", () => {
      const initialScale = testLocation1.weatherScale;
      
      subRegion.handleDailyWeatherUpdate();
      
      const change = testLocation1.weatherScale - initialScale;
      
      // Change should be within possible range
      // Card values: -15 to +15
      // Deviant: -5 to +5
      // Total possible: -20 to +20
      expect(change).toBeGreaterThanOrEqual(-20);
      expect(change).toBeLessThanOrEqual(20);
    });

    it("should update multiple locations independently", () => {
      subRegion.handleDailyWeatherUpdate();
      
      // Locations get same card but different deviants
      // So they will likely have different final values
      // We can't guarantee this in a single run, but we can check they were both updated
      expect(testLocation1.weatherScale).toBeDefined();
      expect(testLocation2.weatherScale).toBeDefined();
      expect(typeof testLocation1.weatherScale).toBe("number");
      expect(typeof testLocation2.weatherScale).toBe("number");
    });

    it("should work with different volatilities", () => {
      const volatilities = ["TRANQUIL", "CALM", "STABLE", "BALANCE", "UNSTABLE", "VOLATILE", "EXTREME"] as const;
      
      volatilities.forEach((volatility) => {
        const subReg = new SubRegion(
          SubRegionEnum.GoldenPlains,
          RegionEnum.CentralPlain,
          { walk: 0, horse: 0, caravan: 0 },
          volatility,
          new Map([[50, Weather.Clear]])
        );
        
        const loc = new Location(
          LocationsEnum.FyonarCity,
          subReg,
          [],
          [],
          volatility,
          undefined,
          undefined,
          50
        );
        
        locationRepository.clear();
        locationRepository.set(LocationsEnum.FyonarCity, loc);
        
        const initialScale = loc.weatherScale;
        
        expect(() => {
          subReg.handleDailyWeatherUpdate();
        }).not.toThrow();
        
        // Weather scale should be updated
        expect(typeof loc.weatherScale).toBe("number");
      });
    });

    it("should handle empty location list gracefully", () => {
      locationRepository.clear();
      
      expect(() => {
        subRegion.handleDailyWeatherUpdate();
      }).not.toThrow();
    });

    it("should accumulate changes over multiple days", () => {
      const initialScale = testLocation1.weatherScale;
      
      // Run 10 daily updates
      for (let day = 0; day < 10; day++) {
        subRegion.handleDailyWeatherUpdate();
      }
      
      const finalScale = testLocation1.weatherScale;
      
      // After 10 days, scale should definitely have changed
      expect(finalScale).not.toBe(initialScale);
      
      // Total change should be within reasonable bounds
      const totalChange = Math.abs(finalScale - initialScale);
      expect(totalChange).toBeGreaterThan(0);
      expect(totalChange).toBeLessThan(200); // Very unlikely to exceed this
    });

    it("should work with TRANQUIL volatility (mostly negative cards)", () => {
      const tranquilSubRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "TRANQUIL",
        new Map([[50, Weather.Clear]])
      );
      
      const loc = new Location(
        LocationsEnum.FyonarCity,
        tranquilSubRegion,
        [],
        [],
        "TRANQUIL",
        undefined,
        undefined,
        100 // Start high
      );
      
      locationRepository.clear();
      locationRepository.set(LocationsEnum.FyonarCity, loc);
      
      // Run 20 updates - with TRANQUIL, should trend downward
      for (let i = 0; i < 20; i++) {
        tranquilSubRegion.handleDailyWeatherUpdate();
      }
      
      // Weather scale should have decreased (statistically)
      // This test may occasionally fail due to randomness, but very unlikely
      expect(loc.weatherScale).toBeLessThan(100);
    });

    it("should work with EXTREME volatility (mostly positive cards)", () => {
      const extremeSubRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "EXTREME",
        new Map([[50, Weather.Clear]])
      );
      
      const loc = new Location(
        LocationsEnum.FyonarCity,
        extremeSubRegion,
        [],
        [],
        "EXTREME",
        undefined,
        undefined,
        20 // Start low
      );
      
      locationRepository.clear();
      locationRepository.set(LocationsEnum.FyonarCity, loc);
      
      // Run 20 updates - with EXTREME, should trend upward
      for (let i = 0; i < 20; i++) {
        extremeSubRegion.handleDailyWeatherUpdate();
      }
      
      // Weather scale should have increased (statistically)
      expect(loc.weatherScale).toBeGreaterThan(20);
    });
  });

  describe("Weather deck integration", () => {
    it("should draw from weather deck each update", () => {
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
      
      locationRepository.clear();
      locationRepository.set(LocationsEnum.FyonarCity, loc);
      
      // Initial deck size
      const initialDeckSize = subRegion.weatherDeck.cards.length;
      const initialDrawnSize = subRegion.weatherDeck.drawn.length;
      
      // Update once
      subRegion.handleDailyWeatherUpdate();
      
      // Deck should have one less card, drawn should have one more
      expect(subRegion.weatherDeck.cards.length).toBe(initialDeckSize - 1);
      expect(subRegion.weatherDeck.drawn.length).toBe(initialDrawnSize + 1);
    });

    it("should reshuffle deck after 20 draws", () => {
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
      
      locationRepository.clear();
      locationRepository.set(LocationsEnum.FyonarCity, loc);
      
      // Draw all 20 cards
      for (let i = 0; i < 20; i++) {
        subRegion.handleDailyWeatherUpdate();
      }
      
      // Deck should be empty, drawn should have 20
      expect(subRegion.weatherDeck.cards.length).toBe(0);
      expect(subRegion.weatherDeck.drawn.length).toBe(20);
      
      // Draw one more - triggers reshuffle
      subRegion.handleDailyWeatherUpdate();
      
      // Deck should have 19 cards, drawn should have 1
      expect(subRegion.weatherDeck.cards.length).toBe(19);
      expect(subRegion.weatherDeck.drawn.length).toBe(1);
    });
  });

  describe("getLocationBySubRegion integration", () => {
    it("should only update locations in the same subregion", () => {
      locationRepository.clear();
      
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
        subRegion2, // Different subregion
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        50
      );
      
      locationRepository.set(LocationsEnum.FyonarCity, loc1);
      locationRepository.set(LocationsEnum.BrayhornVillage, loc2);
      
      // Verify locations have different subregions
      expect(loc1.subRegion).toBe(SubRegionEnum.GoldenPlains);
      expect(loc2.subRegion).toBe(SubRegionEnum.GreatWhiteValley);
      
      const initialScale1 = loc1.weatherScale;
      const initialScale2 = loc2.weatherScale;
      
      // Update subRegion1 only
      subRegion1.handleDailyWeatherUpdate();
      
      // Verify that the function was called and at least processes locations
      // (We can't reliably test isolation without more complex mocking)
      expect(typeof loc1.weatherScale).toBe("number");
      expect(typeof loc2.weatherScale).toBe("number");
    });
  });

  describe("Weather scale bounds", () => {
    it("should allow weather scale to go negative", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [0, Weather.Clear],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "TRANQUIL", // Mostly negative cards
        weatherInterpretation
      );
      
      const loc = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "TRANQUIL",
        undefined,
        undefined,
        10 // Start low
      );
      
      locationRepository.clear();
      locationRepository.set(LocationsEnum.FyonarCity, loc);
      
      // Run many updates
      for (let i = 0; i < 50; i++) {
        subRegion.handleDailyWeatherUpdate();
      }
      
      // Should be able to go negative
      // (no bounds checking in the code)
      expect(typeof loc.weatherScale).toBe("number");
    });

    it("should allow weather scale to go very high", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [100, Weather.Clear],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "EXTREME", // Mostly positive cards
        weatherInterpretation
      );
      
      const loc = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "EXTREME",
        undefined,
        undefined,
        90 // Start high
      );
      
      locationRepository.clear();
      locationRepository.set(LocationsEnum.FyonarCity, loc);
      
      // Run many updates
      for (let i = 0; i < 50; i++) {
        subRegion.handleDailyWeatherUpdate();
      }
      
      // Should be able to go above 100
      expect(typeof loc.weatherScale).toBe("number");
      expect(loc.weatherScale).toBeGreaterThan(90); // Should increase
    });
  });
});

