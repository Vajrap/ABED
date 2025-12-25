import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.Clear,
    25: Weather.Cloudy,
    40: Weather.Overcast,
    55: Weather.Fog,
    70: Weather.LightRain,
    85: Weather.SteadyRain,
    100: Weather.Storm,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.LightRain,
    15: Weather.LightRain,
    30: Weather.SteadyRain,
    50: Weather.SteadyRain,
    70: Weather.Storm,
    85: Weather.Storm,
    100: Weather.Storm,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.Clear,
    15: Weather.Clear,
    35: Weather.Cloudy,
    55: Weather.Overcast,
    75: Weather.LightRain,
    90: Weather.SteadyRain,
    100: Weather.Storm,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.Clear,
    20: Weather.Clear,
    45: Weather.Cloudy,
    70: Weather.Overcast,
    85: Weather.LightRain,
    100: Weather.SteadyRain,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.Clear,
    25: Weather.Clear,
    50: Weather.Cloudy,
    75: Weather.Overcast,
    90: Weather.LightRain,
    100: Weather.SteadyRain,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.Fog,
    20: Weather.Overcast,
    40: Weather.LightRain,
    60: Weather.SteadyRain,
    80: Weather.LightSnow,
    100: Weather.SteadySnow,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.Overcast,
    25: Weather.Fog,
    45: Weather.LightRain,
    65: Weather.LightSnow,
    85: Weather.SteadySnow,
    100: Weather.Blizzard,
  },
};

export const meadowlineHinterlands = new SubRegion(
  SubRegionEnum.MeadowlineHinterlands,
  RegionEnum.SouthernShore,
  {
    en: "Fertile farmland stretches inland, dotted with orchards, ranches, and festival fields. Market towns like Meadowport thrive on harvest fairs, while the rail station connects this breadbasket to the capital. Yet beasts in the forests and thieves along the roads remain a constant threat.",
    th: "",
  },
  [],
  {
    caravan: 0,
    walk: 0,
    horse: 0,
  },
  "BALANCE",
  weatherInterpreter,
);

