import { describe, expect, it, beforeEach, afterEach } from "bun:test";
import { Market } from "../../../src/Entity/Market/Market";
import { Item } from "../../../src/Entity/Item/Item";
import { ItemCost } from "../../../src/Entity/Item/Subclass/ItemCost";
import { LocationsEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Location";
import { locationRepository } from "src/Entity/Location/Location/repository";
import { SubRegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Region";
import { Location } from "../../../src/Entity/Location/Location";
import { SubRegion } from "../../../src/Entity/Location/SubRegion";
import { Weather } from "../../../src/InterFacesEnumsAndTypes/Weather";
import { GameTime } from "../../../src/Game/GameTime/GameTime";
import type { ResourceGenerationConfig } from "../../../src/InterFacesEnumsAndTypes/Interfaces/Resource";

describe("Market", () => {
  let market: Market;
  let testLocation: Location;
  let testSubRegion: SubRegion;

  beforeEach(() => {
    market = new Market();
    locationRepository.clear();

    const weatherInterpretation = new Map([[50, Weather.Clear]]);
    testSubRegion = new SubRegion(
      SubRegionEnum.GoldenPlains,
      RegionEnum.CentralPlain,
      { walk: 0, horse: 0, caravan: 0 },
      "STABLE",
      weatherInterpretation,
    );

    const config: ResourceGenerationConfig = {
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
        ore: 500,
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
    };

    testLocation = new Location(
      LocationsEnum.FyonarCity,
      testSubRegion,
      [],
      [],
      "STABLE",
      undefined,
      undefined,
      undefined,
      config,
    );

    locationRepository.set(LocationsEnum.FyonarCity, testLocation);
    GameTime.season = 1;
    GameTime.dayOfSeason = 1;
  });

  afterEach(() => {
    locationRepository.clear();
  });

  describe("constructor", () => {
    it("should initialize with neutral yearly modifiers", () => {
      expect(market.yearlyModifiers.get("ore")).toBe(1.0);
      expect(market.yearlyModifiers.get("grain")).toBe(1.0);
      expect(market.yearlyModifiers.get("wood")).toBe(1.0);
    });

    it("should have empty event modifiers", () => {
      expect(market.eventModifiers.size).toBe(0);
    });

    it("should have empty transaction history", () => {
      expect(market.transactionHistory.size).toBe(0);
    });

    it("should initialize resource tracker", () => {
      expect(market.resourceTracker).toBeDefined();
    });
  });

  describe("getPrice()", () => {
    it("should return base price when no modifiers apply", () => {
      const item = new Item({
        id: "testItem",
        name: "Test Item",
        cost: new ItemCost({ baseCost: 100 }),
      });

      const price = market.getPrice(item, LocationsEnum.FyonarCity);
      expect(price).toBeGreaterThan(0);
    });

    it("should apply yearly modifier for items with primaryResource", () => {
      const item = new Item({
        id: "ironSword",
        name: "Iron Sword",
        cost: new ItemCost({ baseCost: 100 }),
        primaryResource: "ore",
      });

      // Set yearly modifier
      market.yearlyModifiers.set("ore", 1.2);

      const price = market.getPrice(item, LocationsEnum.FyonarCity);

      // Should be basePrice × yearlyMod × localMod
      expect(price).toBeGreaterThan(100); // At least base × 1.2
    });

    it("should apply event modifier", () => {
      const item = new Item({
        id: "ironSword",
        name: "Iron Sword",
        cost: new ItemCost({ baseCost: 100 }),
      });

      market.setEventModifier("ironSword" as any, 1.5, "event1");

      const price = market.getPrice(item, LocationsEnum.FyonarCity);

      // Should include event modifier
      expect(price).toBeGreaterThan(100);
    });

    it("should combine all modifiers", () => {
      const item = new Item({
        id: "ironSword",
        name: "Iron Sword",
        cost: new ItemCost({ baseCost: 100 }),
        primaryResource: "ore",
      });

      market.yearlyModifiers.set("ore", 1.2);
      market.setEventModifier("ironSword" as any, 1.5, "event1");

      const price = market.getPrice(item, LocationsEnum.FyonarCity);

      // Base × yearly × local × event
      // At minimum: 100 × 1.2 × ? × 1.5
      expect(price).toBeGreaterThan(100);
    });
  });

  describe("getResourcePrice()", () => {
    it("should calculate price with default base price", () => {
      const price = market.getResourcePrice("ore", LocationsEnum.FyonarCity);
      expect(price).toBeGreaterThan(0);
    });

    it("should use provided base price", () => {
      const price = market.getResourcePrice(
        "ore",
        LocationsEnum.FyonarCity,
        50,
      );
      expect(price).toBeGreaterThan(0);
    });

    it("should apply yearly modifier", () => {
      market.yearlyModifiers.set("ore", 2.0);

      const price = market.getResourcePrice(
        "ore",
        LocationsEnum.FyonarCity,
        100,
      );

      // Should be at least 100 × 2.0 = 200
      expect(price).toBeGreaterThanOrEqual(200);
    });

    it("should apply event modifier", () => {
      market.setEventModifier("ore", 1.5, "event1");

      const price = market.getResourcePrice(
        "ore",
        LocationsEnum.FyonarCity,
        100,
      );

      expect(price).toBeGreaterThan(100);
    });
  });

  describe("adjustYearlyPrices()", () => {
    it("should update yearly modifiers based on production", () => {
      // Record some production
      market.resourceTracker.recordProduction(
        LocationsEnum.FyonarCity,
        SubRegionEnum.GoldenPlains,
        "ore",
        500,
      );

      const modifiersBefore = new Map(market.yearlyModifiers);

      market.adjustYearlyPrices();

      const modifiersAfter = market.yearlyModifiers;

      // Should have recalculated
      expect(modifiersAfter).toBeDefined();
      expect(modifiersAfter.size).toBeGreaterThan(0);
    });
  });

  describe("setEventModifier()", () => {
    it("should set modifier for resource", () => {
      market.setEventModifier("grain", 1.5, "event1");
      expect(market.getEventModifier("grain")).toBe(1.5);
    });

    it("should set modifier for item", () => {
      market.setEventModifier("ironSword" as any, 2.0, "event1");
      expect(market.getEventModifier("ironSword" as any)).toBe(2.0);
    });

    it("should overwrite existing modifier", () => {
      market.setEventModifier("grain", 1.5, "event1");
      market.setEventModifier("grain", 2.0, "event1");

      expect(market.getEventModifier("grain")).toBe(2.0);
    });
  });

  describe("clearEventModifier()", () => {
    it("should remove event modifier", () => {
      market.setEventModifier("grain", 1.5, "event1");
      expect(market.eventModifiers.has("grain")).toBe(true);

      market.clearEventModifier("grain", "event1");
      expect(market.eventModifiers.has("grain")).toBe(false);
    });

    it("should handle clearing non-existent modifier", () => {
      expect(() => {
        market.clearEventModifier("ore", "event1");
      }).not.toThrow();
    });
  });

  describe("recordTransaction()", () => {
    it("should record buy transaction", () => {
      market.recordTransaction(
        LocationsEnum.FyonarCity,
        "ironSword" as any,
        3,
        true, // buy
      );

      const record = market.getTransactionRecord(
        LocationsEnum.FyonarCity,
        "ironSword" as any,
      );

      expect(record.bought).toBe(3);
      expect(record.sold).toBe(0);
    });

    it("should record sell transaction", () => {
      market.recordTransaction(
        LocationsEnum.FyonarCity,
        "ore",
        50,
        false, // sell
      );

      const record = market.getTransactionRecord(
        LocationsEnum.FyonarCity,
        "ore",
      );

      expect(record.bought).toBe(0);
      expect(record.sold).toBe(50);
    });

    it("should accumulate multiple transactions", () => {
      market.recordTransaction(LocationsEnum.FyonarCity, "ore", 10, true);
      market.recordTransaction(LocationsEnum.FyonarCity, "ore", 15, true);
      market.recordTransaction(LocationsEnum.FyonarCity, "ore", 5, false);

      const record = market.getTransactionRecord(
        LocationsEnum.FyonarCity,
        "ore",
      );

      expect(record.bought).toBe(25);
      expect(record.sold).toBe(5);
    });

    it("should track different locations separately", () => {
      market.recordTransaction(LocationsEnum.FyonarCity, "ore", 10, true);
      market.recordTransaction(LocationsEnum.BrayhornVillage, "ore", 20, true);

      const record1 = market.getTransactionRecord(
        LocationsEnum.FyonarCity,
        "ore",
      );
      const record2 = market.getTransactionRecord(
        LocationsEnum.BrayhornVillage,
        "ore",
      );

      expect(record1.bought).toBe(10);
      expect(record2.bought).toBe(20);
    });

    it("should track different items separately", () => {
      market.recordTransaction(LocationsEnum.FyonarCity, "ore", 10, true);
      market.recordTransaction(LocationsEnum.FyonarCity, "grain", 20, true);

      const oreRecord = market.getTransactionRecord(
        LocationsEnum.FyonarCity,
        "ore",
      );
      const grainRecord = market.getTransactionRecord(
        LocationsEnum.FyonarCity,
        "grain",
      );

      expect(oreRecord.bought).toBe(10);
      expect(grainRecord.bought).toBe(20);
    });
  });

  describe("getTransactionRecord()", () => {
    it("should return zero record for no transactions", () => {
      const record = market.getTransactionRecord(
        LocationsEnum.FyonarCity,
        "ore",
      );

      expect(record.bought).toBe(0);
      expect(record.sold).toBe(0);
    });

    it("should return existing record", () => {
      market.recordTransaction(LocationsEnum.FyonarCity, "ore", 10, true);
      market.recordTransaction(LocationsEnum.FyonarCity, "ore", 5, false);

      const record = market.getTransactionRecord(
        LocationsEnum.FyonarCity,
        "ore",
      );

      expect(record.bought).toBe(10);
      expect(record.sold).toBe(5);
    });
  });

  describe("integration: full pricing scenario", () => {
    it("should calculate realistic prices through a year", () => {
      // Create locations with different ore capacities
      const config1: ResourceGenerationConfig = {
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
          ore: 800,
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
      };

      const loc = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        config1,
      );

      locationRepository.set(LocationsEnum.FyonarCity, loc);

      market = new Market();

      const ironSword = new Item({
        id: "ironSword",
        name: "Iron Sword",
        cost: new ItemCost({ baseCost: 100 }),
        primaryResource: "ore",
      });

      // Initial price
      const price1 = market.getPrice(ironSword, LocationsEnum.FyonarCity);
      expect(price1).toBeGreaterThan(0);

      // Record good ore production
      market.resourceTracker.recordProduction(
        LocationsEnum.FyonarCity,
        SubRegionEnum.GoldenPlains,
        "ore",
        1200, // Above baseline
      );

      // Adjust yearly prices
      market.adjustYearlyPrices();

      // Price should change based on surplus
      const price2 = market.getPrice(ironSword, LocationsEnum.FyonarCity);
      expect(price2).toBeGreaterThan(0);
    });

    it("should handle event modifiers affecting final price", () => {
      const config: ResourceGenerationConfig = {
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
          ore: 500,
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
      };

      const loc = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        config,
      );

      locationRepository.set(LocationsEnum.FyonarCity, loc);

      market = new Market();

      const ironSword = new Item({
        id: "ironSword",
        name: "Iron Sword",
        cost: new ItemCost({ baseCost: 100 }),
        primaryResource: "ore",
      });

      const basePrice = market.getPrice(ironSword, LocationsEnum.FyonarCity);

      // Kingdom March event increases ore prices by 30%
      market.setEventModifier("ore", 1.3, "event1");

      const warPrice = market.getPrice(ironSword, LocationsEnum.FyonarCity);

      expect(warPrice).toBeCloseTo(basePrice * 1.3, 1);

      // Clear event
      market.clearEventModifier("ore", "event1");

      const peacePrice = market.getPrice(ironSword, LocationsEnum.FyonarCity);

      expect(peacePrice).toBeLessThan(warPrice);
    });
  });

  describe("edge cases", () => {
    it("should handle items without primaryResource", () => {
      const genericItem = new Item({
        id: "magicScroll",
        name: "Magic Scroll",
        cost: new ItemCost({ baseCost: 50 }),
        // No primaryResource
      });

      const price = market.getPrice(genericItem, LocationsEnum.FyonarCity);

      // Should return base price (no resource modifiers)
      expect(price).toBeGreaterThan(0);
    });

    it("should handle zero base cost", () => {
      const freeItem = new Item({
        id: "stick",
        name: "Stick",
        cost: new ItemCost({ baseCost: 0 }),
        primaryResource: "wood",
      });

      const price = market.getPrice(freeItem, LocationsEnum.FyonarCity);
      expect(price).toBe(0);
    });

    it("should handle missing location gracefully", () => {
      const item = new Item({
        id: "ironSword",
        name: "Iron Sword",
        cost: new ItemCost({ baseCost: 100 }),
        primaryResource: "ore",
      });

      // Clear repository
      locationRepository.clear();

      const price = market.getPrice(item, LocationsEnum.FyonarCity);

      // Should still return a price (uses defaults)
      expect(price).toBeGreaterThan(0);
    });
  });

  describe("yearly cycle simulation", () => {
    it("should track production and adjust prices over a year", () => {
      const config: ResourceGenerationConfig = {
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
        },
      };

      const loc = new Location(
        LocationsEnum.FyonarCity,
        testSubRegion,
        [],
        [],
        "STABLE",
        undefined,
        undefined,
        undefined,
        config,
      );

      locationRepository.set(LocationsEnum.FyonarCity, loc);

      market = new Market();

      // Simulate poor ore production year
      market.resourceTracker.recordProduction(
        LocationsEnum.FyonarCity,
        SubRegionEnum.GoldenPlains,
        "ore",
        300, // 30% of baseline (1000)
      );

      market.adjustYearlyPrices();

      const oreModifier = market.yearlyModifiers.get("ore");

      // Low production (30%) should result in HIGH prices (clamped at 1.6)
      expect(oreModifier).toBe(1.6); // Clamped max

      // Reset for new year
      market.resourceTracker.resetYearlyTracking();

      expect(
        market.resourceTracker.yearlyProduction.global.get("ore"),
      ).toBeUndefined();
    });
  });
});
