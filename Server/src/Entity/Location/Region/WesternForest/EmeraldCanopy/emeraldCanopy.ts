import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.Overcast,
    20: Weather.Fog,
    40: Weather.LightRain,
    60: Weather.SteadyRain,
    80: Weather.Storm,
    100: Weather.Monsoon,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.LightRain,
    15: Weather.SteadyRain,
    35: Weather.Storm,
    55: Weather.Monsoon,
    75: Weather.Monsoon,
    100: Weather.Monsoon,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.Overcast,
    20: Weather.Fog,
    40: Weather.LightRain,
    60: Weather.SteadyRain,
    80: Weather.Storm,
    100: Weather.Monsoon,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.Cloudy,
    25: Weather.Overcast,
    50: Weather.LightRain,
    75: Weather.SteadyRain,
    90: Weather.Storm,
    100: Weather.Monsoon,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.Cloudy,
    30: Weather.Overcast,
    55: Weather.LightRain,
    80: Weather.SteadyRain,
    95: Weather.Storm,
    100: Weather.Monsoon,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.Fog,
    25: Weather.Overcast,
    50: Weather.LightRain,
    75: Weather.SteadyRain,
    90: Weather.Storm,
    100: Weather.Monsoon,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.Fog,
    30: Weather.Overcast,
    55: Weather.LightRain,
    75: Weather.SteadyRain,
    90: Weather.Storm,
    100: Weather.Monsoon,
  },
};

export const emeraldCanopy = new SubRegion(
  SubRegionEnum.EmeraldCanopy,
  RegionEnum.WesternForest,
  {
    en: "A dense jungle interior where tribes and hidden villages cling to survival. Ancient ruins and totems lie deep under towering trees, and travelers risk both monsters and the spears of those who guard their lands.",
    th: "",
  },
  [],
  {
    caravan: -15,
    walk: -15,
    horse: -10,
  },
  "UNSTABLE",
  weatherInterpreter,
);

