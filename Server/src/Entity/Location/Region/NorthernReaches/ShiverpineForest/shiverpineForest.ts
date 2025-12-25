import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.Overcast,
    25: Weather.Fog,
    45: Weather.LightRain,
    65: Weather.LightSnow,
    85: Weather.SteadySnow,
    100: Weather.Blizzard,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.LightRain,
    20: Weather.SteadyRain,
    40: Weather.LightSnow,
    60: Weather.SteadySnow,
    80: Weather.Blizzard,
    100: Weather.Blizzard,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.Clear,
    25: Weather.Cloudy,
    50: Weather.Overcast,
    70: Weather.LightRain,
    85: Weather.LightSnow,
    100: Weather.SteadySnow,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.Clear,
    30: Weather.Cloudy,
    55: Weather.Overcast,
    75: Weather.LightRain,
    90: Weather.LightSnow,
    100: Weather.SteadySnow,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.Clear,
    35: Weather.Cloudy,
    60: Weather.Overcast,
    80: Weather.LightRain,
    95: Weather.LightSnow,
    100: Weather.SteadySnow,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.Fog,
    20: Weather.Overcast,
    40: Weather.LightSnow,
    60: Weather.SteadySnow,
    80: Weather.Blizzard,
    100: Weather.ColdSnap,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.Overcast,
    15: Weather.Fog,
    35: Weather.LightSnow,
    55: Weather.SteadySnow,
    75: Weather.Blizzard,
    95: Weather.ColdSnap,
    100: Weather.Blizzard,
  },
};

export const shiverpineForest = new SubRegion(
  SubRegionEnum.ShiverpineForest,
  RegionEnum.NorthernReaches,
  {
    en: "Dense pines heavy with frost stretch across the land, their silence broken only by axes and the whisper of ancestral shrines. Logging camps feed Velgarth's forges, while hidden clearings and ancient stones remind travelers that the dead are honored — and sometimes feared — here.",
    th: "",
  },
  [],
  {
    caravan: -10,
    walk: -10,
    horse: -5,
  },
  "STABLE",
  weatherInterpreter,
);

