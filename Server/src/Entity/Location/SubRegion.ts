import type { RegionEnum } from "../../InterFacesEnumsAndTypes/Enums/Region";
import { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";
import { Weather } from "../../InterFacesEnumsAndTypes/Weather";
import { createNews, type News } from "../News/News";
import { getRandomWeatherDeviant } from "../Card/WeatherCard/getRandomWeatherDeviant";
import {
  WeatherDeck,
  type WeatherVolatility,
} from "../Card/WeatherCard/WeatherCard";
import type { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { GameTime } from "../../Game/GameTime/GameTime";
import type { WeatherInterpreter } from "./Weather/types";
import Report from "../../Utils/Reporter";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export class SubRegion {
  id: SubRegionEnum;
  region: RegionEnum;
  description: L10N;
  locations: LocationsEnum[];
  speedBonus: SubRegionSpeedBonus;
  volatility: WeatherVolatility;
  weatherDeck: WeatherDeck;
  weatherInterpretation: WeatherInterpreter;
  // possibleEnemies: MobCharacterEnum[];
  // randomEventsDeck: RandomEventCard[];
  // discardedEventCards: RandomEventCard[] = [];
  constructor(
    id: SubRegionEnum,
    region: RegionEnum,
    description: L10N,
    locations: LocationsEnum[],
    speedBonus: SubRegionSpeedBonus,
    volatility: WeatherVolatility,
    weatherInterpretation: WeatherInterpreter,
  ) {
    this.id = id;
    this.region = region;
    this.description = description;
    this.locations = locations;
    this.speedBonus = speedBonus;
    this.volatility = volatility;
    this.weatherDeck = new WeatherDeck(volatility);
    this.weatherInterpretation = weatherInterpretation;
  }

  getWeather(weatherScale: number): Weather {
    const season = GameTime.getCurrentGameSeason();
    const seasonalWeather = this.weatherInterpretation[season];

    const sortedKeys = Object.keys(seasonalWeather)
      .map(Number)
      .sort((a, b) => b - a); // DESC

    for (const key of sortedKeys) {
      if (key <= weatherScale) {
        const weather = seasonalWeather[key];
        if (weather !== undefined) {
          return weather;
        }
      }
    }
    return Weather.Clear;
  }

  getSpeedBonusFor(mode: "walk" | "horse" | "caravan"): number {
    return this.speedBonus[mode];
  }

  handleDailyWeatherUpdate(): News[] {
    Report.debug(`  Drawing weather card for ${this.id}`);
    const card = this.drawWeatherCard();
    Report.debug(`  Weather card drawn: value=${card.value}`);

    let allNews = [];

    Report.debug(`  Processing ${this.locations.length} locations`, {
      locations: this.locations,
    });

    for (const locaEnum of this.locations) {
      // Lazy import to avoid circular dependency
      const { locationRepository } = require("./Location/repository");
      const location = locationRepository[locaEnum];
      if (!location) {
        Report.warn(`  Location ${locaEnum} not found in repository`);
        continue;
      }

      const updateVal = card.value + getRandomWeatherDeviant();
      const oldWeatherScale = location.weatherScale;
      location.weatherScale += updateVal;

      Report.debug(
        `  Location ${locaEnum}: weather scale ${oldWeatherScale} -> ${location.weatherScale} (change: +${updateVal})`,
      );

      const news = createNews({
        scope: {
          kind: "locationScope",
          location: location.id,
        },
        content: {
          en: `${location.id} weather in ${this.id} is now ${location.getWeather()}`,
          th: `อากาศบริเวณ ${location.id} ${this.id} ขณะนี้ ${location.getWeather()}`,
        },
        context: {
          region: this.region,
          subRegion: this.id,
          location: location.id,
          partyId: "",
          characterIds: [],
        },
      });

      allNews.push(news);
    }

    Report.debug(
      `  Generated ${allNews.length} weather news items for ${this.id}`,
    );
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

type WeatherInterpretatorUnit = {
  maxVolatile: number;
  weather: Weather;
};
