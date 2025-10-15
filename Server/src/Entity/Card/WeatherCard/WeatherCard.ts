export type WeatherVolatility =
  | "TRANQUIL" // almost always diminish (-10, -5)
  | "CALM" // mostly diminish, some steady
  | "STABLE" // diminish + steady, very few surges
  | "BALANCE" // equal diminish / surge
  | "UNSTABLE" // more surging than diminishing
  | "VOLATILE" // frequent surges, rare diminish
  | "EXTREME"; // almost all surges, violent swings

export type WeatherCardType =
  | "TRANQUIL" // -10
  | "GENTLE" // -5
  | "STEADY" // 0
  | "TENSION" // +5
  | "SURGE" // +10
  | "STILLNESS" // -15 (rare deep calm)
  | "BREAK"; // +15 (rare violent shift)

export class WeatherCard {
  name: WeatherCardType;
  value: number;
  constructor(name: WeatherCardType, value: number) {
    this.name = name;
    this.value = value;
  }
}

function createCardDeck(volatility: WeatherVolatility): WeatherCard[] {
  switch (volatility) {
    case "TRANQUIL":
      return [
        ...Array(8).fill(new WeatherCard("TRANQUIL", -10)),
        ...Array(6).fill(new WeatherCard("GENTLE", -5)),
        ...Array(4).fill(new WeatherCard("STEADY", 0)),
        ...Array(1).fill(new WeatherCard("STILLNESS", -15)),
        ...Array(1).fill(new WeatherCard("BREAK", +15)),
      ]; // 20 total, overwhelmingly calm

    case "CALM":
      return [
        ...Array(6).fill(new WeatherCard("TRANQUIL", -10)),
        ...Array(6).fill(new WeatherCard("GENTLE", -5)),
        ...Array(6).fill(new WeatherCard("STEADY", 0)),
        ...Array(1).fill(new WeatherCard("STILLNESS", -15)),
        ...Array(1).fill(new WeatherCard("BREAK", +15)),
      ]; // 20 total, 90% safe but rare spikes

    case "STABLE":
      return [
        ...Array(4).fill(new WeatherCard("TRANQUIL", -10)),
        ...Array(5).fill(new WeatherCard("GENTLE", -5)),
        ...Array(6).fill(new WeatherCard("STEADY", 0)),
        ...Array(3).fill(new WeatherCard("TENSION", +5)),
        ...Array(2).fill(new WeatherCard("SURGE", +10)),
      ]; // 20 total, mostly neutral with mild bumps

    case "BALANCE":
      return [
        ...Array(4).fill(new WeatherCard("TRANQUIL", -10)),
        ...Array(4).fill(new WeatherCard("GENTLE", -5)),
        ...Array(4).fill(new WeatherCard("STEADY", 0)),
        ...Array(4).fill(new WeatherCard("TENSION", +5)),
        ...Array(3).fill(new WeatherCard("SURGE", +10)),
        ...Array(1).fill(new WeatherCard("BREAK", +15)),
      ]; // 20 total, true middle

    case "UNSTABLE":
      return [
        ...Array(2).fill(new WeatherCard("TRANQUIL", -10)),
        ...Array(3).fill(new WeatherCard("GENTLE", -5)),
        ...Array(4).fill(new WeatherCard("STEADY", 0)),
        ...Array(5).fill(new WeatherCard("TENSION", +5)),
        ...Array(4).fill(new WeatherCard("SURGE", +10)),
        ...Array(2).fill(new WeatherCard("BREAK", +15)),
      ]; // 20 total, leaning stormy

    case "VOLATILE":
      return [
        ...Array(2).fill(new WeatherCard("TRANQUIL", -10)),
        ...Array(3).fill(new WeatherCard("STEADY", 0)),
        ...Array(5).fill(new WeatherCard("TENSION", +5)),
        ...Array(6).fill(new WeatherCard("SURGE", +10)),
        ...Array(3).fill(new WeatherCard("BREAK", +15)),
        ...Array(1).fill(new WeatherCard("STILLNESS", -15)),
      ]; // 20 total, lots of swings

    case "EXTREME":
      return [
        ...Array(1).fill(new WeatherCard("STEADY", 0)),
        ...Array(4).fill(new WeatherCard("TENSION", +5)),
        ...Array(6).fill(new WeatherCard("SURGE", +10)),
        ...Array(6).fill(new WeatherCard("BREAK", +15)),
        ...Array(3).fill(new WeatherCard("STILLNESS", -15)),
      ]; // 20 total, chaos everywhere
  }
}

export class WeatherDeck {
  cards: WeatherCard[];
  drawn: WeatherCard[] = [];
  constructor(
    volaticity: WeatherVolatility,
    deck?: { cards: WeatherCard[]; draws: WeatherCard[] },
  ) {
    if (deck) {
      this.cards = deck.cards;
      this.drawn = deck.draws;
    } else {
      this.cards = createCardDeck(volaticity);
      this.drawn = [];
    }
  }

  drawCard(): WeatherCard {
    if (this.cards.length === 0) {
      this.reshuffle();
    }
    const card = this.cards.pop()!;
    this.drawn.push(card);
    return card;
  }

  reshuffle(): void {
    // Fisher-Yates shuffle algorithm for random order
    const shuffled = [...this.drawn];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j]!;
      shuffled[j] = temp!;
    }
    this.cards = shuffled;
    this.drawn = [];
  }
}
