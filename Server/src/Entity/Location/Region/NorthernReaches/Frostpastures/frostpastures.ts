import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.Overcast,
    30: Weather.Fog,
    50: Weather.LightSnow,
    70: Weather.SteadySnow,
    90: Weather.Blizzard,
    100: Weather.ColdSnap,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.LightRain,
    25: Weather.LightSnow,
    50: Weather.SteadySnow,
    75: Weather.Blizzard,
    95: Weather.ColdSnap,
    100: Weather.Blizzard,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.Clear,
    30: Weather.Cloudy,
    55: Weather.Overcast,
    75: Weather.LightSnow,
    90: Weather.SteadySnow,
    100: Weather.Blizzard,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.Clear,
    35: Weather.Cloudy,
    60: Weather.Overcast,
    80: Weather.LightSnow,
    95: Weather.SteadySnow,
    100: Weather.Blizzard,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.Clear,
    40: Weather.Cloudy,
    65: Weather.Overcast,
    85: Weather.LightSnow,
    100: Weather.SteadySnow,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.Fog,
    25: Weather.Overcast,
    50: Weather.LightSnow,
    70: Weather.SteadySnow,
    85: Weather.Blizzard,
    100: Weather.ColdSnap,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.Overcast,
    20: Weather.Fog,
    40: Weather.LightSnow,
    60: Weather.SteadySnow,
    80: Weather.Blizzard,
    95: Weather.ColdSnap,
    100: Weather.Blizzard,
  },
};

export const frostpastures = new SubRegion(
  SubRegionEnum.FrostPastures,
  RegionEnum.NorthernReaches,
  {
    en: "A rare stretch of low tundra where herds of oxen and shaggy beasts can survive. Villages here live by cheese, wool, hides, and hard barter. Snow lies heavy, but the people endure, stubborn and proud to scrape out life on land few would claim.",
    th: "",
  },
  [],
  {
    caravan: -5,
    walk: -5,
    horse: 0,
  },
  "STABLE",
  weatherInterpreter,
);

