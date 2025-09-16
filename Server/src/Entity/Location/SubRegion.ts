import type { RegionEnum } from "../../InterFacesEnumsAndTypes/Enums/Region";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";
import { WeatherDeck, type WeatherVolatility } from "./WeatherCard/WeatherCard";

export class SubRegion {
  id: SubRegionEnum;
  region: RegionEnum;
  speedBonus: SubRegionSpeedBonus;
  volatility: WeatherVolatility;
  weatherDeck: WeatherDeck;
  weatherScale: number;
  // possibleEnemies: MobCharacterEnum[];
  // randomEventsDeck: RandomEventCard[];
  // discardedEventCards: RandomEventCard[] = [];
  constructor(
    id: SubRegionEnum,
    region: RegionEnum,
    speedBonus: SubRegionSpeedBonus,
    volatility: WeatherVolatility,
  ) {
    this.id = id;
    this.region = region;
    this.speedBonus = speedBonus;
    this.volatility = volatility;
    this.weatherDeck = new WeatherDeck(volatility);
    this.weatherScale = getStartingScale(volatility);
  }

  get regionName(): string {
    return this.region.toString();
  }

  getSpeedBonusFor(mode: "walk" | "horse" | "caravan"): number {
    return this.speedBonus[mode];
  }

  drawWeatherCard() {
    const card = this.weatherDeck.drawCard();
    this.weatherScale += card.value;
    return card;
  }
}

type SubRegionSpeedBonus = {
  walk: number;
  horse: number;
  caravan: number;
};

function getStartingScale(volatility: WeatherVolatility): number {
  switch (volatility) {
    case "TRANQUIL":
      return 20 + Math.random() * 20; // ~20–40
    case "CALM":
      return 30 + Math.random() * 25; // ~30–55
    case "STABLE":
      return 40 + Math.random() * 20; // ~40–60
    case "BALANCE":
      return 45 + Math.random() * 30; // ~45–75
    case "UNSTABLE":
      return 55 + Math.random() * 25; // ~55–80
    case "VOLATILE":
      return 65 + Math.random() * 25; // ~65–90
    case "EXTREME":
      return 75 + Math.random() * 25; // ~75–100
  }
}
