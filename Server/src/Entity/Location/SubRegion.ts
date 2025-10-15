import type { RegionEnum } from "../../InterFacesEnumsAndTypes/Enums/Region";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";
import { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import type { Weather } from "../../InterFacesEnumsAndTypes/Weather";
import { createNews, type News } from "../News/News";
import { getLocationBySubRegion } from "../Repository/location";
import { getRandomWeatherDeviant } from "../Card/WeatherCard/getRandomWeatherDeviant";
import { WeatherDeck, type WeatherVolatility } from "../Card/WeatherCard/WeatherCard";

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

  getSpeedBonusFor(mode: "walk" | "horse" | "caravan"): number {
    return this.speedBonus[mode];
  }

  handleDailyWeatherUpdate(): News[] {
    const card = this.drawWeatherCard();

    let allNews = [];

    for (const location of getLocationBySubRegion(this.id)){
      const updateVal = card.value + getRandomWeatherDeviant();
      location.weatherScale += updateVal;

      const news = createNews({
        scope: {
          kind: "locationScope",
          location: location.id
        },
        tokens: [{
          t: "text",
          v: `${location.id} weather in ${this.id} is now ${location.getWeather()}`
        }],
        context: {
          region: this.region,
          subRegion: this.id,
          location: location.id,
          partyId: "",
          characterIds: []
        },
        secretTier: TierEnum.common
      })

      allNews.push(news);
    }

    return allNews;
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
