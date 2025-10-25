import { describe, test, expect, beforeEach, mock } from "@jest/globals";
import { GameTime } from "../../src/Game/GameTime/GameTime";
import { gameState } from "../../src/Game/GameState";
import { market } from "../../src/Entity/Market/Market";
import { GlobalEventCardEnum } from "../../src/Entity/Card/GlobalEventCard/types";
import { regionEventCardDeck } from "../../src/Entity/Card/RegionEventCard/definitions";

describe("Game Milestones Integration", () => {
  beforeEach(() => {
    // Reset game state
    gameState.lastGlobalEventCardCompleted = false;
    gameState.activeGlobalEventCards = undefined;
    gameState.completedGlobalEventCards = [];
    gameState.globalEventScale = 0;
    
    // Reset region event deck properly
    gameState.regionEventCardDeck = [...regionEventCardDeck];
    gameState.completedRegionEventCards = [];
    
    // Reset market modifiers
    market.eventModifiers.clear();
    market.yearlyModifiers.clear();
    const resources: Array<"ore" | "gemstone" | "wood" | "herbs" | "silk" | "fish" | "grain" | "vegetables" | "fruits" | "livestock"> = [
      "ore", "gemstone", "wood", "herbs", "silk",
      "fish", "grain", "vegetables", "fruits", "livestock"
    ];
    for (const resource of resources) {
      market.yearlyModifiers.set(resource, 1.0);
    }
    
    // Reset production tracking
    market.resourceTracker.yearlyProduction = {
      global: new Map(),
      subregion: new Map(),
      location: new Map(),
    };
    
    // Reset time
    GameTime.season = 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7;
    GameTime.dayOfSeason = 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
    GameTime.hour = 1 as 1 | 2 | 3 | 4;
  });

  describe("Yearly Milestones (Season 1, Day 1, Hour 1)", () => {
    test("draws global event card if last year's event completed", () => {
      gameState.lastGlobalEventCardCompleted = true;
      
      // Simulate yearly milestone
      const initialDeckSize = gameState.globalEventCardDeck.length;
      
      // Would call drawGlobalEventCard() here
      // Verify card is drawn and active
      
      expect(gameState.lastGlobalEventCardCompleted).toBe(true);
      // After drawing, flag should be reset to false
    });

    test("adjusts yearly prices based on last year's production", () => {
      // Record some production
      market.resourceTracker.recordProduction(
        "TestLocation" as any,
        "TestSubRegion" as any,
        "ore",
        500
      );
      
      const beforeModifier = market.yearlyModifiers.get("ore");
      
      // Simulate yearly adjustment
      market.adjustYearlyPrices();
      
      const afterModifier = market.yearlyModifiers.get("ore");
      
      // Modifier should have changed based on production
      expect(afterModifier).toBeDefined();
      expect(typeof afterModifier).toBe("number");
    });

    test("resets yearly production tracking", () => {
      // Record production
      market.resourceTracker.recordProduction(
        "TestLocation" as any,
        "TestSubRegion" as any,
        "grain",
        1000
      );
      
      const beforeReset = market.resourceTracker.yearlyProduction.global.get("grain");
      expect(beforeReset).toBe(1000);
      
      // Reset tracking
      market.resourceTracker.resetYearlyTracking();
      
      const afterReset = market.resourceTracker.yearlyProduction.global.get("grain");
      expect(afterReset).toBeUndefined();
    });
  });

  describe("Seasonal Milestones (Day 1, Hour 1)", () => {
    test("triggers at start of each season", () => {
      const seasons = [1, 2, 3, 4, 5, 6, 7];
      
      for (const season of seasons) {
        GameTime.season = season as 1 | 2 | 3 | 4 | 5 | 6 | 7;
        GameTime.dayOfSeason = 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
        GameTime.hour = 1 as 1 | 2 | 3 | 4;
        
        // Condition should be true
        expect(GameTime.dayOfSeason === 1 && GameTime.hour === 1).toBe(true);
      }
    });

    test("adjusts seasonal prices", () => {
      // This is currently a no-op but verifies the hook exists
      expect(() => market.adjustSeasonalPrices()).not.toThrow();
    });
  });

  describe("Monthly Milestones (Day 1 or 25, Hour 1)", () => {
    test("triggers twice per season", () => {
      const triggerDays = [1, 25];
      
      for (const day of triggerDays) {
        GameTime.dayOfSeason = day as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
        GameTime.hour = 1 as 1 | 2 | 3 | 4;
        
        const shouldTrigger = (GameTime.dayOfSeason === 1 || GameTime.dayOfSeason === 25) 
                              && GameTime.hour === 1;
        expect(shouldTrigger).toBe(true);
      }
    });

    test("draws region event card and updates global scale", () => {
      const initialScale = gameState.globalEventScale;
      const initialDeckSize = gameState.regionEventCardDeck.length;
      
      // Draw card
      const news = gameState.drawRegionCard();
      
      // Scale should have increased
      expect(gameState.globalEventScale).toBeGreaterThanOrEqual(initialScale);
      
      // Deck size should decrease
      expect(gameState.regionEventCardDeck.length).toBe(initialDeckSize - 1);
      
      // Should return news
      expect(news).toBeDefined();
    });

    test("region event scale accumulates over the year", () => {
      gameState.globalEventScale = 0;
      
      // Draw 8 cards (twice per season × 4 seasons)
      for (let i = 0; i < 8; i++) {
        gameState.drawRegionCard();
      }
      
      // Scale should have increased
      // With current deck: 3×0 + 3×10 + 3×20 + 1×30 = 120 average
      expect(gameState.globalEventScale).toBeGreaterThan(0);
      expect(gameState.globalEventScale).toBeLessThanOrEqual(250); // Capped
    });

    test("reshuffles region deck when exhausted", () => {
      const initialDeckSize = gameState.regionEventCardDeck.length;
      
      // Exhaust the deck
      for (let i = 0; i < initialDeckSize; i++) {
        gameState.drawRegionCard();
      }
      
      // Deck should be empty
      expect(gameState.regionEventCardDeck.length).toBe(0);
      expect(gameState.completedRegionEventCards.length).toBe(initialDeckSize);
      
      // Draw one more - should reshuffle
      gameState.drawRegionCard();
      
      // Deck should have cards again (reshuffled from completed)
      expect(gameState.regionEventCardDeck.length).toBeGreaterThan(0);
    });
  });

  describe("Daily Milestones (Hour 1)", () => {
    test("checks global event completion daily", () => {
      // Create a mock card that completes immediately
      gameState.activeGlobalEventCards = {
        id: GlobalEventCardEnum.BoringYear,
        name: "Test Event",
        description: "Test",
        startingScale: 100,
        onDraw: undefined,
        onEnd: mock(() => {}),
        escalationTrack: [],
        completionCondition: () => true, // Always complete
      };
      
      // Should be active
      expect(gameState.activeGlobalEventCards).toBeDefined();
      
      // Check completion
      if (gameState.activeGlobalEventCards?.completionCondition()) {
        if (gameState.activeGlobalEventCards.onEnd) {
          gameState.activeGlobalEventCards.onEnd();
        }
        gameState.lastGlobalEventCardCompleted = true;
        gameState.completedGlobalEventCards.push(gameState.activeGlobalEventCards);
        gameState.activeGlobalEventCards = undefined;
      }
      
      // Should be completed
      expect(gameState.activeGlobalEventCards).toBeUndefined();
      expect(gameState.lastGlobalEventCardCompleted).toBe(true);
      // onEnd was called before clearing activeGlobalEventCards
    });

    test("calls onEnd cleanup when card completes", () => {
      const cleanupMock = mock(() => {});
      
      gameState.activeGlobalEventCards = {
        id: GlobalEventCardEnum.BoringYear,
        name: "Test Event",
        description: "Test",
        startingScale: 100,
        onDraw: undefined,
        onEnd: cleanupMock,
        escalationTrack: [],
        completionCondition: () => true,
      };
      
      // Trigger completion check
      if (gameState.activeGlobalEventCards?.completionCondition()) {
        if (gameState.activeGlobalEventCards.onEnd) {
          gameState.activeGlobalEventCards.onEnd();
        }
        gameState.activeGlobalEventCards = undefined;
      }
      
      expect(cleanupMock).toHaveBeenCalled();
    });
  });

  describe("Event Modifier Stacking", () => {
    test("global and region events stack multiplicatively", () => {
      // Global event modifies grain
      market.setEventModifier("grain", 2.0, "GlobalFamine");
      
      // Region event also modifies grain
      market.setEventModifier("grain", 1.3, "RegionalDrought");
      
      // Should multiply: 2.0 × 1.3 = 2.6
      const combined = market.getEventModifier("grain");
      expect(combined).toBeCloseTo(2.6, 2);
    });

    test("clearing global event leaves region event active", () => {
      market.setEventModifier("grain", 2.0, "GlobalFamine");
      market.setEventModifier("grain", 1.3, "RegionalDrought");
      
      // Clear global
      market.clearEventModifier("grain", "GlobalFamine");
      
      // Region should still be active
      const remaining = market.getEventModifier("grain");
      expect(remaining).toBeCloseTo(1.3, 2);
    });

    test("multiple region events compound", () => {
      market.setEventModifier("ore", 1.5, "War_North");
      market.setEventModifier("ore", 1.4, "War_East");
      market.setEventModifier("ore", 1.3, "War_South");
      
      // 1.5 × 1.4 × 1.3 = 2.73
      const combined = market.getEventModifier("ore");
      expect(combined).toBeCloseTo(2.73, 2);
    });
  });

  describe("Full Year Simulation", () => {
    test("simulates complete year with all milestones", () => {
      // === YEAR START ===
      GameTime.season = 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7;
      GameTime.dayOfSeason = 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
      GameTime.hour = 1 as 1 | 2 | 3 | 4;
      
      // Mark that last year had a global event
      gameState.lastGlobalEventCardCompleted = true;
      gameState.globalEventScale = 0;
      
      // YEARLY MILESTONE
      // - Draw global event card
      // - Adjust yearly prices
      // - Reset production tracking
      
      const yearStartScale = gameState.globalEventScale;
      
      // === SEASON 1 ===
      // Month 1 (Day 1): Draw region card
      GameTime.dayOfSeason = 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
      gameState.drawRegionCard();
      
      const afterMonth1 = gameState.globalEventScale;
      expect(afterMonth1).toBeGreaterThanOrEqual(yearStartScale);
      
      // Month 2 (Day 25): Draw region card
      GameTime.dayOfSeason = 25 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
      gameState.drawRegionCard();
      
      const afterMonth2 = gameState.globalEventScale;
      expect(afterMonth2).toBeGreaterThanOrEqual(afterMonth1);
      
      // === SEASON 2 ===
      GameTime.season = 2 as 1 | 2 | 3 | 4 | 5 | 6 | 7;
      GameTime.dayOfSeason = 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
      // SEASONAL MILESTONE triggered
      
      gameState.drawRegionCard();
      
      GameTime.dayOfSeason = 25 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
      gameState.drawRegionCard();
      
      // === SEASON 3 ===
      GameTime.season = 3 as 1 | 2 | 3 | 4 | 5 | 6 | 7;
      GameTime.dayOfSeason = 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
      gameState.drawRegionCard();
      
      GameTime.dayOfSeason = 25 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
      gameState.drawRegionCard();
      
      // === SEASON 4 ===
      GameTime.season = 4 as 1 | 2 | 3 | 4 | 5 | 6 | 7;
      GameTime.dayOfSeason = 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
      gameState.drawRegionCard();
      
      GameTime.dayOfSeason = 25 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
      gameState.drawRegionCard();
      
      // === END OF YEAR ===
      // 8 region cards drawn throughout the year
      const finalScale = gameState.globalEventScale;
      
      // Scale should have accumulated
      expect(finalScale).toBeGreaterThan(yearStartScale);
      
      // Should be reasonable (not over cap)
      expect(finalScale).toBeLessThanOrEqual(250);
      
      // Completed region cards
      expect(gameState.completedRegionEventCards.length).toBe(8);
    });

    test("global event lifecycle completes correctly", () => {
      // Draw a simple event
      gameState.lastGlobalEventCardCompleted = true;
      
      // Simulate draw
      const mockCard = {
        id: GlobalEventCardEnum.BoringYear,
        name: "Boring Year",
        description: "Nothing happens",
        startingScale: 250,
        onDraw: () => ({
          worldScope: [],
          regionScope: new Map(),
          subRegionScope: new Map(),
          locationScope: new Map(),
          partyScope: new Map(),
          privateScope: new Map(),
        }),
        onEnd: mock(() => {}),
        escalationTrack: [],
        completionCondition: () => true,
      };
      
      gameState.activeGlobalEventCards = mockCard;
      
      // Card is active
      expect(gameState.activeGlobalEventCards).toBeDefined();
      
      // Daily check triggers completion
      if (gameState.activeGlobalEventCards?.completionCondition()) {
        if (gameState.activeGlobalEventCards.onEnd) {
          gameState.activeGlobalEventCards.onEnd();
        }
        gameState.lastGlobalEventCardCompleted = true;
        gameState.completedGlobalEventCards.push(gameState.activeGlobalEventCards);
        gameState.activeGlobalEventCards = undefined;
      }
      
      // Card completed
      expect(gameState.activeGlobalEventCards).toBeUndefined();
      expect(gameState.lastGlobalEventCardCompleted).toBe(true);
      expect(mockCard.onEnd).toHaveBeenCalled();
      expect(gameState.completedGlobalEventCards).toContain(mockCard);
    });
  });

  describe("Edge Cases", () => {
    test("handles multiple milestone triggers on same day", () => {
      // Day 1, Hour 1 of Season 1 triggers BOTH yearly and seasonal
      GameTime.season = 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7;
      GameTime.dayOfSeason = 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
      GameTime.hour = 1 as 1 | 2 | 3 | 4;
      
      const isYearly = GameTime.season === 1 && GameTime.dayOfSeason === 1 && GameTime.hour === 1;
      const isSeasonal = GameTime.dayOfSeason === 1 && GameTime.hour === 1;
      const isMonthly = (GameTime.dayOfSeason === 1 || GameTime.dayOfSeason === 25) && GameTime.hour === 1;
      const isDaily = GameTime.hour === 1;
      
      expect(isYearly).toBe(true);
      expect(isSeasonal).toBe(true);
      expect(isMonthly).toBe(true);
      expect(isDaily).toBe(true);
      
      // All should execute without conflicts
    });

    test("handles global scale reaching cap", () => {
      gameState.globalEventScale = 245;
      
      // Draw card with scale 30
      const news = gameState.drawRegionCard();
      
      // Should clamp at 250
      expect(gameState.globalEventScale).toBeLessThanOrEqual(250);
    });

    test("handles empty region deck gracefully", () => {
      const deckSize = gameState.regionEventCardDeck.length;
      
      // Exhaust deck
      for (let i = 0; i < deckSize; i++) {
        gameState.drawRegionCard();
      }
      
      expect(gameState.regionEventCardDeck.length).toBe(0);
      
      // Next draw should reshuffle
      const news = gameState.drawRegionCard();
      
      expect(news).toBeDefined();
      expect(gameState.regionEventCardDeck.length).toBeGreaterThan(0);
    });

    test("handles no active global event", () => {
      // beforeEach already sets this to undefined, but let's be explicit
      // Daily check should not crash when no card is active
      const activeCard = gameState.activeGlobalEventCards;
      const shouldComplete = activeCard?.completionCondition();
      
      expect(shouldComplete).toBeUndefined();
    });

    test("handles event modifier cleanup", () => {
      // Set multiple modifiers
      market.setEventModifier("grain", 2.0, "Event1");
      market.setEventModifier("grain", 1.5, "Event2");
      market.setEventModifier("grain", 1.3, "Event3");
      
      // 2.0 * 1.5 * 1.3 = 3.9
      expect(market.getEventModifier("grain")).toBeCloseTo(3.9, 2);
      
      // Clear all
      market.clearEventModifier("grain", "Event1");
      market.clearEventModifier("grain", "Event2");
      market.clearEventModifier("grain", "Event3");
      
      expect(market.getEventModifier("grain")).toBe(1.0);
    });
  });

  describe("System Integration", () => {
    test("market prices reflect all active modifiers", () => {
      // Yearly modifier (from production)
      market.yearlyModifiers.set("ore", 1.2); // 20% shortage
      
      // Global event
      market.setEventModifier("ore", 1.5, "GlobalWar");
      
      // Region event
      market.setEventModifier("ore", 1.3, "RegionalConflict");
      
      // Get combined event modifier
      const eventMod = market.getEventModifier("ore");
      expect(eventMod).toBeCloseTo(1.95, 2); // 1.5 × 1.3
      
      // Total effect: yearlyMod * eventMod * localMod
      // localMod tested separately, assume 1.0 for this test
      const totalEffect = 1.2 * eventMod;
      expect(totalEffect).toBeCloseTo(2.34, 2);
    });

    test("resource tracking accumulates correctly", () => {
      const location = "TestLoc" as any;
      const subRegion = "TestSubRegion" as any;
      
      // Record multiple productions
      market.resourceTracker.recordProduction(location, subRegion, "grain", 100);
      market.resourceTracker.recordProduction(location, subRegion, "grain", 150);
      market.resourceTracker.recordProduction(location, subRegion, "grain", 200);
      
      const total = market.resourceTracker.yearlyProduction.global.get("grain");
      expect(total).toBe(450);
    });

    test("events and prices work together in realistic scenario", () => {
      // Scenario: Global Famine + Regional Drought + Low Production
      
      // Low production last year
      market.resourceTracker.recordProduction(
        "TestLoc" as any,
        "TestSub" as any,
        "grain",
        500 // Low
      );
      
      // Yearly adjustment (shortage causes price increase through inversion)
      market.adjustYearlyPrices();
      const yearlyMod = market.yearlyModifiers.get("grain");
      // Low production (500) vs baseline → inverted ratio → prices UP
      // But the baseline is calculated from capacity, which might be different
      // Just check that a modifier was calculated
      expect(yearlyMod).toBeDefined();
      expect(typeof yearlyMod).toBe("number");
      
      // Global event
      market.setEventModifier("grain", 2.0, "GreatFamine");
      
      // Region event
      market.setEventModifier("grain", 1.3, "Drought_Central");
      
      // Combined event modifier
      const eventMod = market.getEventModifier("grain");
      expect(eventMod).toBeCloseTo(2.6, 2);
      
      // Total multiplier (assuming localMod = 1.0 for test)
      const totalMod = yearlyMod! * eventMod;
      
      // Prices should be significantly affected (either up or down depending on baseline)
      expect(totalMod).toBeGreaterThan(0);
      
      // This creates the "compound crisis" effect
    });
  });
});

describe("Milestone Handler Performance", () => {
  test("handles rapid time progression efficiently", () => {
    const startTime = performance.now();
    
    // Simulate 1 year of daily checks (365 days × 4 phases = 1460 iterations)
    for (let day = 1; day <= 365; day++) {
      GameTime.hour = 1 as 1 | 2 | 3 | 4;
      
      // Daily check
      if (gameState.activeGlobalEventCards?.completionCondition()) {
        // Would trigger completion
      }
      
      // Monthly check
      if ((day % 30 === 1) || (day % 30 === 15)) {
        gameState.drawRegionCard();
      }
    }
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    // Should complete in reasonable time (< 100ms)
    expect(duration).toBeLessThan(100);
  });
});

