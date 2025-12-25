import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.Fog,
    25: Weather.Overcast,
    45: Weather.LightRain,
    65: Weather.SteadyRain,
    80: Weather.Storm,
    100: Weather.Monsoon,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.LightRain,
    20: Weather.SteadyRain,
    40: Weather.Storm,
    60: Weather.Monsoon,
    80: Weather.Monsoon,
    100: Weather.Monsoon,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.Fog,
    25: Weather.Overcast,
    50: Weather.LightRain,
    70: Weather.SteadyRain,
    85: Weather.Storm,
    100: Weather.Monsoon,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.Cloudy,
    30: Weather.Overcast,
    55: Weather.LightRain,
    75: Weather.SteadyRain,
    90: Weather.Storm,
    100: Weather.Monsoon,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.Cloudy,
    35: Weather.Overcast,
    60: Weather.LightRain,
    80: Weather.SteadyRain,
    95: Weather.Storm,
    100: Weather.Monsoon,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.Fog,
    30: Weather.Overcast,
    55: Weather.LightRain,
    75: Weather.SteadyRain,
    90: Weather.Storm,
    100: Weather.Monsoon,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.Fog,
    35: Weather.Overcast,
    60: Weather.LightRain,
    80: Weather.SteadyRain,
    95: Weather.Storm,
    100: Weather.Monsoon,
  },
};

export const coastalLowlands = new SubRegion(
  SubRegionEnum.CoastalLowlands,
  RegionEnum.WesternForest,
  {
    en: "Saltfen docks and marsh parishes sprawl along brackish water where the river meets the sea. Life is precarious between salt pans and reed-swamps, with storms, floods, and beasts forever threatening to wash settlements away.",
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

