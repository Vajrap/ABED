import { describe, expect, it } from "@jest/globals";
import { WeatherCard, WeatherDeck, type WeatherVolatility } from "../../../src/Entity/Card/WeatherCard/WeatherCard";

describe("WeatherCard", () => {
  it("should create a weather card with name and value", () => {
    const card = new WeatherCard("TRANQUIL", -10);
    expect(card.name).toBe("TRANQUIL");
    expect(card.value).toBe(-10);
  });

  it("should create cards with positive values", () => {
    const card = new WeatherCard("SURGE", 10);
    expect(card.name).toBe("SURGE");
    expect(card.value).toBe(10);
  });

  it("should create cards with zero value", () => {
    const card = new WeatherCard("STEADY", 0);
    expect(card.name).toBe("STEADY");
    expect(card.value).toBe(0);
  });

  it("should create extreme cards", () => {
    const stillness = new WeatherCard("STILLNESS", -15);
    const break_ = new WeatherCard("BREAK", 15);
    expect(stillness.value).toBe(-15);
    expect(break_.value).toBe(15);
  });
});

describe("WeatherDeck", () => {
  describe("TRANQUIL volatility", () => {
    it("should create a deck with 20 cards", () => {
      const deck = new WeatherDeck("TRANQUIL");
      expect(deck.cards.length).toBe(20);
    });

    it("should have mostly negative value cards", () => {
      const deck = new WeatherDeck("TRANQUIL");
      const allCards = [...deck.cards];
      const negativeCards = allCards.filter((c) => c.value < 0);
      expect(negativeCards.length).toBeGreaterThan(10); // Should have more than half negative
    });

    it("should have 8 TRANQUIL cards", () => {
      const deck = new WeatherDeck("TRANQUIL");
      const tranquilCards = deck.cards.filter((c) => c.name === "TRANQUIL");
      expect(tranquilCards.length).toBe(8);
    });

    it("should have 1 STILLNESS and 1 BREAK card", () => {
      const deck = new WeatherDeck("TRANQUIL");
      const stillness = deck.cards.filter((c) => c.name === "STILLNESS");
      const break_ = deck.cards.filter((c) => c.name === "BREAK");
      expect(stillness.length).toBe(1);
      expect(break_.length).toBe(1);
    });
  });

  describe("CALM volatility", () => {
    it("should create a deck with 20 cards", () => {
      const deck = new WeatherDeck("CALM");
      expect(deck.cards.length).toBe(20);
    });

    it("should have balanced negative and neutral cards", () => {
      const deck = new WeatherDeck("CALM");
      const nonPositiveCards = deck.cards.filter((c) => c.value <= 0);
      expect(nonPositiveCards.length).toBeGreaterThanOrEqual(15); // 90% safe
    });
  });

  describe("STABLE volatility", () => {
    it("should create a deck with 20 cards", () => {
      const deck = new WeatherDeck("STABLE");
      expect(deck.cards.length).toBe(20);
    });

    it("should have mix of negative, neutral, and positive cards", () => {
      const deck = new WeatherDeck("STABLE");
      const negative = deck.cards.filter((c) => c.value < 0);
      const neutral = deck.cards.filter((c) => c.value === 0);
      const positive = deck.cards.filter((c) => c.value > 0);
      
      expect(negative.length).toBeGreaterThan(0);
      expect(neutral.length).toBeGreaterThan(0);
      expect(positive.length).toBeGreaterThan(0);
    });
  });

  describe("BALANCE volatility", () => {
    it("should create a deck with 20 cards", () => {
      const deck = new WeatherDeck("BALANCE");
      expect(deck.cards.length).toBe(20);
    });

    it("should have roughly equal diminish and surge cards", () => {
      const deck = new WeatherDeck("BALANCE");
      const diminish = deck.cards.filter((c) => c.value < 0);
      const surge = deck.cards.filter((c) => c.value > 0);
      
      // Should be relatively balanced (within 5 cards)
      expect(Math.abs(diminish.length - surge.length)).toBeLessThanOrEqual(5);
    });
  });

  describe("UNSTABLE volatility", () => {
    it("should create a deck with 20 cards", () => {
      const deck = new WeatherDeck("UNSTABLE");
      expect(deck.cards.length).toBe(20);
    });

    it("should have more surging than diminishing cards", () => {
      const deck = new WeatherDeck("UNSTABLE");
      const diminish = deck.cards.filter((c) => c.value < 0);
      const surge = deck.cards.filter((c) => c.value > 0);
      
      expect(surge.length).toBeGreaterThan(diminish.length);
    });
  });

  describe("VOLATILE volatility", () => {
    it("should create a deck with 20 cards", () => {
      const deck = new WeatherDeck("VOLATILE");
      expect(deck.cards.length).toBe(20);
    });

    it("should have frequent surges", () => {
      const deck = new WeatherDeck("VOLATILE");
      const surge = deck.cards.filter((c) => c.value >= 10);
      expect(surge.length).toBeGreaterThanOrEqual(9); // 6 SURGE + 3 BREAK
    });
  });

  describe("EXTREME volatility", () => {
    it("should create a deck with 20 cards", () => {
      const deck = new WeatherDeck("EXTREME");
      expect(deck.cards.length).toBe(20);
    });

    it("should have almost all surges", () => {
      const deck = new WeatherDeck("EXTREME");
      const positive = deck.cards.filter((c) => c.value > 0);
      expect(positive.length).toBeGreaterThanOrEqual(16); // Most should be positive
    });

    it("should have violent swings", () => {
      const deck = new WeatherDeck("EXTREME");
      const breaks = deck.cards.filter((c) => c.name === "BREAK");
      expect(breaks.length).toBe(6); // 6 BREAK cards
    });
  });

  describe("drawCard()", () => {
    it("should draw a card and move it to drawn pile", () => {
      const deck = new WeatherDeck("STABLE");
      const initialLength = deck.cards.length;
      
      const card = deck.drawCard();
      
      expect(deck.cards.length).toBe(initialLength - 1);
      expect(deck.drawn.length).toBe(1);
      expect(deck.drawn[0]).toBe(card);
    });

    it("should draw multiple cards sequentially", () => {
      const deck = new WeatherDeck("STABLE");
      
      const card1 = deck.drawCard();
      const card2 = deck.drawCard();
      const card3 = deck.drawCard();
      
      expect(deck.cards.length).toBe(17); // 20 - 3
      expect(deck.drawn.length).toBe(3);
      expect(deck.drawn).toContain(card1);
      expect(deck.drawn).toContain(card2);
      expect(deck.drawn).toContain(card3);
    });

    it("should reshuffle when deck is empty", () => {
      const deck = new WeatherDeck("STABLE");
      
      // Draw all 20 cards
      for (let i = 0; i < 20; i++) {
        deck.drawCard();
      }
      
      expect(deck.cards.length).toBe(0);
      expect(deck.drawn.length).toBe(20);
      
      // Draw one more - should trigger reshuffle
      const card = deck.drawCard();
      
      expect(deck.cards.length).toBe(19); // 20 cards reshuffled, 1 drawn
      expect(deck.drawn.length).toBe(1);
      expect(card).toBeDefined();
    });
  });

  describe("reshuffle()", () => {
    it("should move drawn cards back to deck in random order", () => {
      const deck = new WeatherDeck("STABLE");
      
      const card1 = deck.drawCard();
      const card2 = deck.drawCard();
      const card3 = deck.drawCard();
      
      deck.reshuffle();
      
      expect(deck.cards.length).toBe(20); // All cards back in deck
      expect(deck.drawn.length).toBe(0); // Drawn pile empty
      
      // All cards should be back in the deck
      expect(deck.cards).toContain(card1);
      expect(deck.cards).toContain(card2);
      expect(deck.cards).toContain(card3);
    });

    it("should result in same deck size if drawn pile is empty", () => {
      const deck = new WeatherDeck("STABLE");
      
      deck.reshuffle();
      
      expect(deck.cards.length).toBe(20); // Deck unchanged if nothing drawn
      expect(deck.drawn.length).toBe(0);
    });

    it("should shuffle cards in different order (statistical test)", () => {
      const deck = new WeatherDeck("STABLE");
      
      // Draw all 20 cards and track their order
      const firstDrawOrder: string[] = [];
      for (let i = 0; i < 20; i++) {
        firstDrawOrder.push(deck.drawCard().name);
      }
      
      // Reshuffle and draw again
      deck.reshuffle();
      const secondDrawOrder: string[] = [];
      for (let i = 0; i < 20; i++) {
        secondDrawOrder.push(deck.drawCard().name);
      }
      
      // Orders should be different (extremely unlikely to be the same with random shuffle)
      // We'll check if at least 5 positions are different
      let differentPositions = 0;
      for (let i = 0; i < 20; i++) {
        if (firstDrawOrder[i] !== secondDrawOrder[i]) {
          differentPositions++;
        }
      }
      
      expect(differentPositions).toBeGreaterThan(5);
    });
  });

  describe("Custom deck initialization", () => {
    it("should allow custom deck configuration", () => {
      const customCards = [
        new WeatherCard("SURGE", 10),
        new WeatherCard("SURGE", 10),
      ];
      const customDrawn = [
        new WeatherCard("TRANQUIL", -10),
      ];
      
      const deck = new WeatherDeck("STABLE", {
        cards: customCards,
        draws: customDrawn,
      });
      
      expect(deck.cards.length).toBe(2);
      expect(deck.drawn.length).toBe(1);
      expect(deck.cards[0]?.name).toBe("SURGE");
      expect(deck.drawn[0]?.name).toBe("TRANQUIL");
    });
  });

  describe("Volatility distribution correctness", () => {
    const testVolatility = (volatility: WeatherVolatility, expectedCount: number) => {
      const deck = new WeatherDeck(volatility);
      expect(deck.cards.length).toBe(expectedCount);
    };

    it("should create correct count for all volatilities", () => {
      testVolatility("TRANQUIL", 20);
      testVolatility("CALM", 20);
      testVolatility("STABLE", 20);
      testVolatility("BALANCE", 20);
      testVolatility("UNSTABLE", 20);
      testVolatility("VOLATILE", 20);
      testVolatility("EXTREME", 20);
    });
  });

  describe("Card value distribution", () => {
    it("should have correct value for TRANQUIL cards", () => {
      const deck = new WeatherDeck("TRANQUIL");
      const tranquilCards = deck.cards.filter((c) => c.name === "TRANQUIL");
      tranquilCards.forEach((card) => {
        expect(card.value).toBe(-10);
      });
    });

    it("should have correct value for GENTLE cards", () => {
      const deck = new WeatherDeck("CALM");
      const gentleCards = deck.cards.filter((c) => c.name === "GENTLE");
      gentleCards.forEach((card) => {
        expect(card.value).toBe(-5);
      });
    });

    it("should have correct value for STEADY cards", () => {
      const deck = new WeatherDeck("STABLE");
      const steadyCards = deck.cards.filter((c) => c.name === "STEADY");
      steadyCards.forEach((card) => {
        expect(card.value).toBe(0);
      });
    });

    it("should have correct value for TENSION cards", () => {
      const deck = new WeatherDeck("UNSTABLE");
      const tensionCards = deck.cards.filter((c) => c.name === "TENSION");
      tensionCards.forEach((card) => {
        expect(card.value).toBe(5);
      });
    });

    it("should have correct value for SURGE cards", () => {
      const deck = new WeatherDeck("VOLATILE");
      const surgeCards = deck.cards.filter((c) => c.name === "SURGE");
      surgeCards.forEach((card) => {
        expect(card.value).toBe(10);
      });
    });

    it("should have correct value for STILLNESS cards", () => {
      const deck = new WeatherDeck("TRANQUIL");
      const stillnessCards = deck.cards.filter((c) => c.name === "STILLNESS");
      stillnessCards.forEach((card) => {
        expect(card.value).toBe(-15);
      });
    });

    it("should have correct value for BREAK cards", () => {
      const deck = new WeatherDeck("EXTREME");
      const breakCards = deck.cards.filter((c) => c.name === "BREAK");
      breakCards.forEach((card) => {
        expect(card.value).toBe(15);
      });
    });
  });
});

