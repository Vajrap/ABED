import { describe, expect, it, beforeEach, afterEach, spyOn } from "@jest/globals";
import { Location } from "../../../src/Entity/Location/Location";
import { SubRegion } from "../../../src/Entity/Location/SubRegion";
import { Weather } from "../../../src/InterFacesEnumsAndTypes/Weather";
import { LocationsEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Location";
import { SubRegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Region";
import { GameTime } from "../../../src/Game/GameTime/GameTime";
import * as Dice from "../../../src/Utils/Dice";
import type { ResourceGenerationConfig } from "../../../src/InterFacesEnumsAndTypes/Interfaces/Resource";

describe("Location - refillResources()", () => {
  let testSubRegion: SubRegion;
  let originalSeason: typeof GameTime.season;

  beforeEach(() => {
    // Save original season
    originalSeason = GameTime.season;
    
    // Create test subregion
    const weatherInterpretation = new Map<number, Weather>([
      [50, Weather.Clear],
    ]);
    
    testSubRegion = new SubRegion(
      SubRegionEnum.GoldenPlains,
      RegionEnum.CentralPlain,
      { walk: 0, horse: 0, caravan: 0 },
      "STABLE",
      weatherInterpretation
    );
  });

  afterEach(() => {
    // Restore original season
    GameTime.season = originalSeason;
  });

  describe("Season 1 - Seeding", () => {
    beforeEach(() => {
      GameTime.season = 1;
    });

    it("should generate fish resources", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 1000,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 100,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      // Mock rollTwenty to return 10 (no fluctuation)
      const spy = spyOn(Dice, "rollTwenty").mockReturnValue({ total: 10, rolls: [10] } as any);

      const beforeFish = location.resourceGeneration.stockpile.fish;
      location.refillResources();
      const afterFish = location.resourceGeneration.stockpile.fish;

      // Restore original
      spy.mockRestore();

      expect(afterFish).toBeGreaterThan(beforeFish);
      expect(afterFish).toBe(100); // rate * (1 + (10 - 10) / 100) = 100
    });

    it("should generate livestock resources", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 1000,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 50,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      // Mock rollTwenty to return 10 (no fluctuation)
      const spy = spyOn(Dice, "rollTwenty").mockReturnValue({ total: 10, rolls: [10] } as any);

      const beforeLivestock = location.resourceGeneration.stockpile.livestock;
      location.refillResources();
      const afterLivestock = location.resourceGeneration.stockpile.livestock;

      // Restore original
      spy.mockRestore();

      expect(afterLivestock).toBeGreaterThan(beforeLivestock);
      expect(afterLivestock).toBe(50);
    });

    it("should not generate other resources in Season 1", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 1000,
          gemstone: 1000,
          wood: 1000,
          herbs: 1000,
          silk: 1000,
          fish: 1000,
          grain: 1000,
          vegetables: 1000,
          fruits: 1000,
          livestock: 1000,
        },
        rate: {
          ore: 100,
          gemstone: 100,
          wood: 100,
          herbs: 100,
          silk: 100,
          fish: 100,
          grain: 100,
          vegetables: 100,
          fruits: 100,
          livestock: 100,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      location.refillResources();

      // Only fish and livestock should change
      expect(location.resourceGeneration.stockpile.fish).toBeGreaterThan(0);
      expect(location.resourceGeneration.stockpile.livestock).toBeGreaterThan(0);
      expect(location.resourceGeneration.stockpile.ore).toBe(0);
      expect(location.resourceGeneration.stockpile.gemstone).toBe(0);
      expect(location.resourceGeneration.stockpile.wood).toBe(0);
      expect(location.resourceGeneration.stockpile.herbs).toBe(0);
      expect(location.resourceGeneration.stockpile.silk).toBe(0);
      expect(location.resourceGeneration.stockpile.grain).toBe(0);
      expect(location.resourceGeneration.stockpile.vegetables).toBe(0);
      expect(location.resourceGeneration.stockpile.fruits).toBe(0);
    });
  });

  describe("Season 2 - RainFall", () => {
    beforeEach(() => {
      GameTime.season = 2;
    });

    it("should generate wood resources", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 1000,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 150,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      const beforeWood = location.resourceGeneration.stockpile.wood;
      location.refillResources();
      const afterWood = location.resourceGeneration.stockpile.wood;

      expect(afterWood).toBeGreaterThan(beforeWood);
    });

    it("should generate herbs resources", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 1000,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 75,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      const beforeHerbs = location.resourceGeneration.stockpile.herbs;
      location.refillResources();
      const afterHerbs = location.resourceGeneration.stockpile.herbs;

      expect(afterHerbs).toBeGreaterThan(beforeHerbs);
    });
  });

  describe("Season 3 - GreenTide", () => {
    beforeEach(() => {
      GameTime.season = 3;
    });

    it("should generate fruits resources", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 1000,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 120,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      const beforeFruits = location.resourceGeneration.stockpile.fruits;
      location.refillResources();
      const afterFruits = location.resourceGeneration.stockpile.fruits;

      expect(afterFruits).toBeGreaterThan(beforeFruits);
    });
  });

  describe("Season 4 - HarvestMoon", () => {
    beforeEach(() => {
      GameTime.season = 4;
    });

    it("should generate grain resources", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 1000,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 200,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      const beforeGrain = location.resourceGeneration.stockpile.grain;
      location.refillResources();
      const afterGrain = location.resourceGeneration.stockpile.grain;

      expect(afterGrain).toBeGreaterThan(beforeGrain);
    });

    it("should generate vegetables resources", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 1000,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 150,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      const beforeVegetables = location.resourceGeneration.stockpile.vegetables;
      location.refillResources();
      const afterVegetables = location.resourceGeneration.stockpile.vegetables;

      expect(afterVegetables).toBeGreaterThan(beforeVegetables);
    });
  });

  describe("Season 5 - SunDry", () => {
    beforeEach(() => {
      GameTime.season = 5;
    });

    it("should generate silk resources", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 1000,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 80,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      const beforeSilk = location.resourceGeneration.stockpile.silk;
      location.refillResources();
      const afterSilk = location.resourceGeneration.stockpile.silk;

      expect(afterSilk).toBeGreaterThan(beforeSilk);
    });
  });

  describe("Season 6 - Frostveil", () => {
    beforeEach(() => {
      GameTime.season = 6;
    });

    it("should generate gemstone resources", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 1000,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 50,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      const beforeGemstone = location.resourceGeneration.stockpile.gemstone;
      location.refillResources();
      const afterGemstone = location.resourceGeneration.stockpile.gemstone;

      expect(afterGemstone).toBeGreaterThan(beforeGemstone);
    });
  });

  describe("Season 7 - LongDark", () => {
    beforeEach(() => {
      GameTime.season = 7;
    });

    it("should generate ore resources", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 1000,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 100,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      const beforeOre = location.resourceGeneration.stockpile.ore;
      location.refillResources();
      const afterOre = location.resourceGeneration.stockpile.ore;

      expect(afterOre).toBeGreaterThan(beforeOre);
    });
  });

  describe("Resource capacity limits", () => {
    beforeEach(() => {
      GameTime.season = 1; // Fish season
    });

    it("should not exceed maximum capacity", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 100, // Low capacity
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 50, // High generation rate
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 90, // Already near capacity
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      location.refillResources();

      expect(location.resourceGeneration.stockpile.fish).toBeLessThanOrEqual(100);
      expect(location.resourceGeneration.stockpile.fish).toBe(100); // Should cap at capacity
    });

    it("should cap at capacity when generation would exceed it", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 50,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 100, // Rate higher than capacity
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      location.refillResources();

      expect(location.resourceGeneration.stockpile.fish).toBe(50); // Capped at capacity
    });
  });

  describe("Resource minimum bounds", () => {
    beforeEach(() => {
      GameTime.season = 1;
    });

    it("should not go below zero", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 1000,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: -100, // Negative rate (resource depletion)
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 10, // Small amount
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      location.refillResources();

      expect(location.resourceGeneration.stockpile.fish).toBeGreaterThanOrEqual(0);
      expect(location.resourceGeneration.stockpile.fish).toBe(0); // Clamped to 0
    });
  });

  describe("Zero capacity and rate", () => {
    beforeEach(() => {
      GameTime.season = 1;
    });

    it("should not generate resources with zero rate", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 1000,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0, // Zero rate
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      location.refillResources();

      expect(location.resourceGeneration.stockpile.fish).toBe(0);
    });

    it("should not generate resources with zero capacity", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0, // Zero capacity
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 100, // Has rate but no capacity
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      location.refillResources();

      expect(location.resourceGeneration.stockpile.fish).toBe(0);
    });
  });

  describe("Fluctuation mechanics", () => {
    beforeEach(() => {
      GameTime.season = 1;
    });

    it("should apply positive fluctuation on high roll", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 1000,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 100,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      // Mock rollTwenty to return 20 (maximum positive fluctuation)
      const spy = spyOn(Dice, "rollTwenty").mockReturnValue({ total: 20, rolls: [20] } as any);

      location.refillResources();

      // Restore original
      spy.mockRestore();

      // With roll = 20: fluctuation = (20 - 10) / 100 = 0.1
      // Generated = 100 * (1 + 0.1) = 110
      expect(location.resourceGeneration.stockpile.fish).toBeCloseTo(110, 1);
    });

    it("should apply negative fluctuation on low roll", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 1000,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 100,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      // Mock rollTwenty to return 1 (maximum negative fluctuation)
      const spy = spyOn(Dice, "rollTwenty").mockReturnValue({ total: 1, rolls: [1] } as any);

      location.refillResources();

      // Restore original
      spy.mockRestore();

      // With roll = 1: fluctuation = (1 - 10) / 100 = -0.09
      // Generated = 100 * (1 - 0.09) = 91
      expect(location.resourceGeneration.stockpile.fish).toBe(91);
    });

    it("should have no fluctuation with roll of 10", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 1000,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 100,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      // Mock rollTwenty to return 10 (no fluctuation)
      const spy = spyOn(Dice, "rollTwenty").mockReturnValue({ total: 10, rolls: [10] } as any);

      location.refillResources();

      // Restore original
      spy.mockRestore();

      // With roll = 10: fluctuation = (10 - 10) / 100 = 0
      // Generated = 100 * (1 + 0) = 100
      expect(location.resourceGeneration.stockpile.fish).toBe(100);
    });
  });

  describe("Multiple refill cycles", () => {
    beforeEach(() => {
      GameTime.season = 1;
    });

    it("should accumulate resources over multiple refills", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 1000,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 50,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      // Mock rollTwenty to return 10 (no fluctuation)
      const spy = spyOn(Dice, "rollTwenty").mockReturnValue({ total: 10, rolls: [10] } as any);

      location.refillResources();
      expect(location.resourceGeneration.stockpile.fish).toBe(50);

      location.refillResources();
      expect(location.resourceGeneration.stockpile.fish).toBe(100);

      location.refillResources();
      expect(location.resourceGeneration.stockpile.fish).toBe(150);

      // Restore original
      spy.mockRestore();
    });

    it("should stop accumulating at capacity over multiple refills", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 120,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 50,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      // Mock rollTwenty to return 10 (no fluctuation)
      const spy = spyOn(Dice, "rollTwenty").mockReturnValue({ total: 10, rolls: [10] } as any);

      location.refillResources();
      expect(location.resourceGeneration.stockpile.fish).toBe(50);

      location.refillResources();
      expect(location.resourceGeneration.stockpile.fish).toBe(100);

      location.refillResources();
      expect(location.resourceGeneration.stockpile.fish).toBe(120); // Capped at capacity

      location.refillResources();
      expect(location.resourceGeneration.stockpile.fish).toBe(120); // Still capped

      // Restore original
      spy.mockRestore();
    });
  });

  describe("Edge cases", () => {
    it("should handle fractional generation rates", () => {
      GameTime.season = 1;
      
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 1000,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        rate: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0.5, // Fractional rate
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      // Mock rollTwenty to return 10 (no fluctuation)
      const spy = spyOn(Dice, "rollTwenty").mockReturnValue({ total: 10, rolls: [10] } as any);

      location.refillResources();

      // Restore original
      spy.mockRestore();

      expect(location.resourceGeneration.stockpile.fish).toBe(0.5);
    });

    it("should work with all seasons generating different resources", () => {
      const resourceConfig: ResourceGenerationConfig = {
        capacity: {
          ore: 1000,
          gemstone: 1000,
          wood: 1000,
          herbs: 1000,
          silk: 1000,
          fish: 1000,
          grain: 1000,
          vegetables: 1000,
          fruits: 1000,
          livestock: 1000,
        },
        rate: {
          ore: 100,
          gemstone: 100,
          wood: 100,
          herbs: 100,
          silk: 100,
          fish: 100,
          grain: 100,
          vegetables: 100,
          fruits: 100,
          livestock: 100,
        },
        stockpile: {
          ore: 0,
          gemstone: 0,
          wood: 0,
          herbs: 0,
          silk: 0,
          fish: 0,
          grain: 0,
          vegetables: 0,
          fruits: 0,
          livestock: 0,
        }
      };

      const location = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        resourceConfig
      );

      // Test each season
      for (let season = 1; season <= 7; season++) {
        GameTime.season = season as 1 | 2 | 3 | 4 | 5 | 6 | 7;
        location.refillResources();
      }

      // All resources should have been generated at least once
      expect(location.resourceGeneration.stockpile.fish).toBeGreaterThan(0); // Season 1
      expect(location.resourceGeneration.stockpile.livestock).toBeGreaterThan(0); // Season 1
      expect(location.resourceGeneration.stockpile.wood).toBeGreaterThan(0); // Season 2
      expect(location.resourceGeneration.stockpile.herbs).toBeGreaterThan(0); // Season 2
      expect(location.resourceGeneration.stockpile.fruits).toBeGreaterThan(0); // Season 3
      expect(location.resourceGeneration.stockpile.grain).toBeGreaterThan(0); // Season 4
      expect(location.resourceGeneration.stockpile.vegetables).toBeGreaterThan(0); // Season 4
      expect(location.resourceGeneration.stockpile.silk).toBeGreaterThan(0); // Season 5
      expect(location.resourceGeneration.stockpile.gemstone).toBeGreaterThan(0); // Season 6
      expect(location.resourceGeneration.stockpile.ore).toBeGreaterThan(0); // Season 7
    });
  });
});

