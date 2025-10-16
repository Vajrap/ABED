import { describe, expect, it, beforeEach } from "bun:test";
import { Location } from "../../../src/Entity/Location/Location";
import { SubRegion } from "../../../src/Entity/Location/SubRegion";
import { Weather } from "../../../src/InterFacesEnumsAndTypes/Weather";
import { LocationsEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Location";
import { SubRegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Region";
import { subregionRepository } from "../../../src/Entity/Repository/subregion";
import { locationRepository } from "../../../src/Entity/Repository/location";

describe("Location - getWeather()", () => {
  beforeEach(() => {
    subregionRepository.clear();
  });

  describe("Weather interpretation mapping", () => {
    it("should return correct weather based on weather scale", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [0, Weather.Blizzard],
        [20, Weather.HeavySnow],
        [40, Weather.Clear],
        [60, Weather.LightRain],
        [80, Weather.Storm],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion);
      
      const location = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        40 // Matches Clear in interpretation
      );
      
      expect(location.getWeather()).toBe(Weather.Clear);
    });

    it("should return weather for different scale values", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [0, Weather.Blizzard],
        [25, Weather.Cloudy],
        [50, Weather.Clear],
        [75, Weather.LightRain],
        [100, Weather.Storm],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion);
      
      // Test at scale 0
      const loc0 = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        0
      );
      expect(loc0.getWeather()).toBe(Weather.Blizzard);
      
      // Test at scale 25
      const loc25 = new Location(
        LocationsEnum.BrayhornVillage,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        25
      );
      expect(loc25.getWeather()).toBe(Weather.Cloudy);
      
      // Test at scale 100
      const loc100 = new Location(
        LocationsEnum.MeadowbrookVillage,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        100
      );
      expect(loc100.getWeather()).toBe(Weather.Storm);
    });

    it("should handle complex weather progressions", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [0, Weather.Blizzard],
        [10, Weather.HeavySnow],
        [20, Weather.SteadySnow],
        [30, Weather.LightSnow],
        [40, Weather.Cloudy],
        [50, Weather.Clear],
        [60, Weather.Cloudy],
        [70, Weather.LightRain],
        [80, Weather.SteadyRain],
        [90, Weather.HeavyRain],
        [100, Weather.Storm],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion);
      
      // Test progression from cold to hot
      const scales = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
      const expectedWeathers = [
        Weather.Blizzard,
        Weather.HeavySnow,
        Weather.SteadySnow,
        Weather.LightSnow,
        Weather.Cloudy,
        Weather.Clear,
        Weather.Cloudy,
        Weather.LightRain,
        Weather.SteadyRain,
        Weather.HeavyRain,
        Weather.Storm,
      ];
      
      scales.forEach((scale, index) => {
        const loc = new Location(
          LocationsEnum.FyonarCity,
          subRegion,
          [],
          [],
          "STABLE",
          undefined,
          undefined,
          scale
        );
        const expected = expectedWeathers[index];
        if (expected !== undefined) {
          expect(loc.getWeather()).toBe(expected);
        }
      });
    });
  });

  describe("Desert weather variants", () => {
    it("should support desert-specific weather", () => {
      const desertWeatherInterpretation = new Map<number, Weather>([
        [0, Weather.DesertClear],
        [30, Weather.DesertCloudy],
        [60, Weather.DesertOvercast],
        [80, Weather.Heatwave],
        [100, Weather.Sandstorm],
      ]);
      
      const desertSubRegion = new SubRegion(
        SubRegionEnum.DuskmarchOasis,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "EXTREME",
        desertWeatherInterpretation
      );
      
      subregionRepository.set(SubRegionEnum.DuskmarchOasis, desertSubRegion);
      
      const desertLocation = new Location(
        LocationsEnum.FyonarCity,
        desertSubRegion,
        [],
        [],
        "EXTREME",
        undefined,
        undefined,
        100
      );
      
      expect(desertLocation.getWeather()).toBe(Weather.Sandstorm);
    });

    it("should handle all desert weather types", () => {
      const desertWeatherInterpretation = new Map<number, Weather>([
        [10, Weather.DesertClear],
        [30, Weather.DesertCloudy],
        [50, Weather.DesertOvercast],
        [70, Weather.DesertFog],
        [90, Weather.Sandstorm],
        [100, Weather.Heatwave],
      ]);
      
      const desertSubRegion = new SubRegion(
        SubRegionEnum.DuskmarchOasis,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "VOLATILE",
        desertWeatherInterpretation
      );
      
      subregionRepository.set(SubRegionEnum.DuskmarchOasis, desertSubRegion);
      
      const desertWeathers = [
        Weather.DesertClear,
        Weather.DesertCloudy,
        Weather.DesertOvercast,
        Weather.DesertFog,
        Weather.Sandstorm,
        Weather.Heatwave,
      ];
      
      desertWeathers.forEach((weather) => {
        const scale = Array.from(desertWeatherInterpretation.entries())
          .find(([_, w]) => w === weather)?.[0] || 50;
        
        const loc = new Location(
          LocationsEnum.FyonarCity,
          desertSubRegion,
          [],
          [],
          "VOLATILE",
          undefined,
          undefined,
          scale
        );
        
        expect(loc.getWeather()).toBe(weather);
      });
    });
  });

  describe("Extreme weather types", () => {
    it("should support all extreme weather variants", () => {
      const extremeWeatherInterpretation = new Map<number, Weather>([
        [10, Weather.ColdSnap],
        [20, Weather.Blizzard],
        [40, Weather.Windstorm],
        [60, Weather.ThunderOnly],
        [80, Weather.Hail],
        [90, Weather.Monsoon],
        [100, Weather.Storm],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.WhitePeaks,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "EXTREME",
        extremeWeatherInterpretation
      );
      
      subregionRepository.set(SubRegionEnum.WhitePeaks, subRegion);
      
      const extremeWeathers = [
        { scale: 10, weather: Weather.ColdSnap },
        { scale: 20, weather: Weather.Blizzard },
        { scale: 40, weather: Weather.Windstorm },
        { scale: 60, weather: Weather.ThunderOnly },
        { scale: 80, weather: Weather.Hail },
        { scale: 90, weather: Weather.Monsoon },
        { scale: 100, weather: Weather.Storm },
      ];
      
      extremeWeathers.forEach(({ scale, weather }) => {
        const loc = new Location(
          LocationsEnum.FyonarCity,
          subRegion,
          [],
          [],
          "EXTREME",
          undefined,
          undefined,
          scale
        );
        expect(loc.getWeather()).toBe(weather);
      });
    });
  });

  describe("Error handling and fallbacks", () => {
    it("should return Clear if subregion not found", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [50, Weather.Storm],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      // Don't add to repository
      
      const location = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        50
      );
      
      // Should return Clear as fallback
      expect(location.getWeather()).toBe(Weather.Clear);
    });

    it("should return Clear if weather scale not in interpretation", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [0, Weather.Blizzard],
        [50, Weather.Clear],
        [100, Weather.Storm],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion);
      
      const location = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        75 // Not in interpretation map
      );
      
      // Should return Clear as fallback
      expect(location.getWeather()).toBe(Weather.Clear);
    });

    it("should handle negative weather scales", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [-20, Weather.ColdSnap],
        [-10, Weather.Blizzard],
        [0, Weather.HeavySnow],
        [50, Weather.Clear],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "TRANQUIL",
        weatherInterpretation
      );
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion);
      
      const location = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "TRANQUIL",
        undefined,
        undefined,
        -20
      );
      
      expect(location.getWeather()).toBe(Weather.ColdSnap);
    });

    it("should handle very high weather scales", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [50, Weather.Clear],
        [100, Weather.Storm],
        [150, Weather.Monsoon],
        [200, Weather.Heatwave],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "EXTREME",
        weatherInterpretation
      );
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion);
      
      const location = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "EXTREME",
        undefined,
        undefined,
        200
      );
      
      expect(location.getWeather()).toBe(Weather.Heatwave);
    });
  });

  describe("Integration with weather updates", () => {
    it("should return updated weather after scale changes", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [30, Weather.LightSnow],
        [50, Weather.Clear],
        [70, Weather.LightRain],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion);
      
      const location = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        50
      );
      
      expect(location.getWeather()).toBe(Weather.Clear);
      
      // Manually change weather scale
      location.weatherScale = 30;
      expect(location.getWeather()).toBe(Weather.LightSnow);
      
      location.weatherScale = 70;
      expect(location.getWeather()).toBe(Weather.LightRain);
    });

    it("should reflect weather changes after daily update", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [30, Weather.Cloudy],
        [50, Weather.Clear],
        [70, Weather.LightRain],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "EXTREME", // Will mostly increase
        weatherInterpretation
      );
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion);
      
      const location = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "EXTREME",
        undefined,
        undefined,
        30
      );
      
      locationRepository.set(LocationsEnum.FyonarCity, location);
      
      const initialWeather = location.getWeather();
      
      // Simulate multiple daily updates
      for (let i = 0; i < 20; i++) {
        subRegion.handleDailyWeatherUpdate();
      }
      
      const finalWeather = location.getWeather();
      
      // With EXTREME volatility and 20 updates, scale should increase significantly
      // This is statistically almost certain
      expect(location.weatherScale).toBeGreaterThan(30);
    });
  });

  describe("Weather consistency", () => {
    it("should return same weather for same scale", () => {
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
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion);
      
      const location = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        50
      );
      
      // Call multiple times
      const weather1 = location.getWeather();
      const weather2 = location.getWeather();
      const weather3 = location.getWeather();
      
      expect(weather1).toBe(weather2);
      expect(weather2).toBe(weather3);
    });

    it("should be deterministic for given scale", () => {
      const weatherInterpretation = new Map<number, Weather>([
        [25, Weather.Cloudy],
        [50, Weather.Clear],
        [75, Weather.LightRain],
      ]);
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion);
      
      const location = new Location(
        LocationsEnum.FyonarCity,
        subRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        50
      );
      
      // Call 100 times - should always be Clear
      for (let i = 0; i < 100; i++) {
        expect(location.getWeather()).toBe(Weather.Clear);
      }
    });
  });

  describe("All weather enum values", () => {
    it("should support all weather types defined in Weather enum", () => {
      const allWeatherTypes = Object.values(Weather);
      
      // Create interpretation with all weather types
      const weatherInterpretation = new Map<number, Weather>();
      allWeatherTypes.forEach((weather, index) => {
        weatherInterpretation.set(index * 5, weather);
      });
      
      const subRegion = new SubRegion(
        SubRegionEnum.GoldenPlains,
        RegionEnum.CentralPlain,
        { walk: 0, horse: 0, caravan: 0 },
        "STABLE",
        weatherInterpretation
      );
      
      subregionRepository.set(SubRegionEnum.GoldenPlains, subRegion);
      
      // Test each weather type
      allWeatherTypes.forEach((weather, index) => {
        const location = new Location(
          LocationsEnum.FyonarCity,
          subRegion,
          [],
          [],
          "STABLE",
          undefined,
          undefined,
          index * 5
        );
        
        expect(location.getWeather()).toBe(weather);
      });
    });
  });
});

