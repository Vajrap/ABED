import { Weather } from "../../../InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "../../../InterFacesEnumsAndTypes/Time";

/**
 * Weather interpretation for a specific season
 * Maps weather scale ranges to actual weather types
 */
export type SeasonWeatherRanges = {
  [scale: number]: Weather;
};

/**
 * Weather interpreter for a subregion
 * Maps each season to its weather scale ranges
 */
export type WeatherInterpreter = {
  [season in SeasonEnum]: SeasonWeatherRanges;
};
