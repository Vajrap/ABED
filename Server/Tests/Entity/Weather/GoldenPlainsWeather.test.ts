import { describe, expect, it, beforeEach } from "@jest/globals";
import { SubRegion } from "../../../src/Entity/Location/SubRegion";
import { SubRegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "../../../src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "../../../src/InterFacesEnumsAndTypes/Time";
import { GameTime } from "../../../src/Game/GameTime/GameTime";
import { goldenPlainsWeatherInterpreter } from "../../../src/Entity/Location/SubRegion/goldenPlains";

describe("SubRegion - GoldenPlains Weather System", () => {
  let goldenPlains: SubRegion;
  
  beforeEach(() => {
    // Create GoldenPlains subregion with seasonal weather interpreter
    goldenPlains = new SubRegion(
      SubRegionEnum.GoldenPlains,
      RegionEnum.CentralPlain,
      [], // No locations for this test
      { walk: 0, horse: 0, caravan: 0 },
      "STABLE",
      [], // Empty weather interpretation since we're using seasonal logic
      goldenPlainsWeatherInterpreter // Pass the weather interpreter
    );
  });

  describe("Basic Weather Functionality", () => {
    it("should return Clear weather for low scales in Seeding season", () => {
      GameTime.setGameTime(0, 1, 1, 1, 1, 0); // Set to Seeding season
      expect(goldenPlains.getWeather(5)).toBe(Weather.Clear);
      expect(goldenPlains.getWeather(10)).toBe(Weather.Clear);
    });

    it("should return Storm weather for high scales in Seeding season", () => {
      GameTime.setGameTime(0, 1, 1, 1, 1, 0); // Set to Seeding season
      expect(goldenPlains.getWeather(90)).toBe(Weather.Storm);
      expect(goldenPlains.getWeather(100)).toBe(Weather.Storm);
    });

    it("should return Heatwave for high scales in SunDry season", () => {
      GameTime.setGameTime(0, 1, 1, 1, 5, 0); // Set to SunDry season
      expect(goldenPlains.getWeather(90)).toBe(Weather.Heatwave);
      expect(goldenPlains.getWeather(100)).toBe(Weather.Heatwave);
    });

    it("should return Blizzard for high scales in winter seasons", () => {
      // Frostveil season
      GameTime.setGameTime(0, 1, 1, 1, 6, 0);
      expect(goldenPlains.getWeather(90)).toBe(Weather.Blizzard);
      
      // LongDark season
      GameTime.setGameTime(0, 1, 1, 1, 7, 0);
      expect(goldenPlains.getWeather(90)).toBe(Weather.Blizzard);
    });
  });

  describe("Season Transitions", () => {
    it("should return different weather for same scale in different seasons", () => {
      const testScale = 50;
      
      // Seeding season - should be Fog
      GameTime.setGameTime(0, 1, 1, 1, 1, 0);
      expect(goldenPlains.getWeather(testScale)).toBe(Weather.Fog);
      
      // RainFall season - should be LightRain
      GameTime.setGameTime(0, 1, 1, 1, 2, 0);
      expect(goldenPlains.getWeather(testScale)).toBe(Weather.LightRain);
      
      // SunDry season - should be Overcast
      GameTime.setGameTime(0, 1, 1, 1, 5, 0);
      expect(goldenPlains.getWeather(testScale)).toBe(Weather.Overcast);
    });
  });

  describe("Edge Cases", () => {
    beforeEach(() => {
      GameTime.setGameTime(0, 1, 1, 1, 1, 0); // Set to Seeding season
    });

    it("should handle scale values outside 0-100 range", () => {
      expect(goldenPlains.getWeather(-10)).toBe(Weather.Clear);
      expect(goldenPlains.getWeather(150)).toBe(Weather.Storm);
    });
  });
});
