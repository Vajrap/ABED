import type { RegionEnum } from "../../InterFacesEnumsAndTypes/Enums/Region";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";
import type { Weather } from "../../InterFacesEnumsAndTypes/Weather";
import { getLocationBySubRegion, locationRepository } from "./Repository/location";
import { getRandomWeatherDeviant } from "./WeatherCard/getRandomWeatherDeviant";
import { WeatherDeck, type WeatherVolatility } from "./WeatherCard/WeatherCard";

export class SubRegion {
  id: SubRegionEnum;
  region: RegionEnum;
  speedBonus: SubRegionSpeedBonus;
  volatility: WeatherVolatility;
  weatherDeck: WeatherDeck;
  weatherInterpretation: Map<number, Weather>;
  // possibleEnemies: MobCharacterEnum[];
  // randomEventsDeck: RandomEventCard[];
  // discardedEventCards: RandomEventCard[] = [];
  constructor(
    id: SubRegionEnum,
    region: RegionEnum,
    speedBonus: SubRegionSpeedBonus,
    volatility: WeatherVolatility,
    weatherInterpretation: Map<number, Weather>,
  ) {
    this.id = id;
    this.region = region;
    this.speedBonus = speedBonus;
    this.volatility = volatility;
    this.weatherDeck = new WeatherDeck(volatility);
    this.weatherInterpretation = weatherInterpretation;
  }

  get regionName(): string {
    return this.region.toString();
  }

  getSpeedBonusFor(mode: "walk" | "horse" | "caravan"): number {
    return this.speedBonus[mode];
  }

  handleDailyWeatherUpdate() {
    const card = this.drawWeatherCard();
    for (const location of getLocationBySubRegion(this.id)){
      const updateVal = card.value + getRandomWeatherDeviant();
      location.weatherScale += updateVal;
    }
  }

  private drawWeatherCard() {
    return this.weatherDeck.drawCard();
  }
}

type SubRegionSpeedBonus = {
  walk: number;
  horse: number;
  caravan: number;
};
