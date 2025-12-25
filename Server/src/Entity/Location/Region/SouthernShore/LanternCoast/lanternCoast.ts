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
    0: Weather.Cloudy,
    20: Weather.LightRain,
    40: Weather.SteadyRain,
    60: Weather.Storm,
    80: Weather.Storm,
    100: Weather.Storm,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.Clear,
    25: Weather.Clear,
    45: Weather.Cloudy,
    65: Weather.Overcast,
    80: Weather.LightRain,
    95: Weather.SteadyRain,
    100: Weather.Storm,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.Clear,
    30: Weather.Clear,
    55: Weather.Cloudy,
    75: Weather.Overcast,
    90: Weather.LightRain,
    100: Weather.SteadyRain,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.Clear,
    35: Weather.Clear,
    60: Weather.Cloudy,
    80: Weather.Overcast,
    95: Weather.LightRain,
    100: Weather.SteadyRain,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.Fog,
    25: Weather.Overcast,
    45: Weather.LightRain,
    65: Weather.SteadyRain,
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

export const lanternCoast = new SubRegion(
  SubRegionEnum.LanternCoast,
  RegionEnum.SouthernShore,
  {
    en: "A rugged coastline marked by lighthouses, shrines, and pilgrim routes. Lanternshore Town thrives on fishing and trade, while the Grand Lighthouse and pilgrim shrine draw travelers seeking light and blessing before braving the stormy seas.",
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

