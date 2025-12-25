import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.Cloudy,
    25: Weather.Overcast,
    45: Weather.Fog,
    65: Weather.LightRain,
    80: Weather.Storm,
    100: Weather.Windstorm,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.LightRain,
    20: Weather.SteadyRain,
    45: Weather.Storm,
    70: Weather.Windstorm,
    90: Weather.Storm,
    100: Weather.Windstorm,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.Cloudy,
    25: Weather.Overcast,
    50: Weather.LightRain,
    70: Weather.Storm,
    85: Weather.Windstorm,
    100: Weather.Storm,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.Clear,
    30: Weather.Cloudy,
    55: Weather.Overcast,
    75: Weather.LightRain,
    90: Weather.Storm,
    100: Weather.Windstorm,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.Clear,
    35: Weather.Cloudy,
    60: Weather.Overcast,
    80: Weather.LightRain,
    95: Weather.Storm,
    100: Weather.Windstorm,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.Fog,
    30: Weather.Overcast,
    55: Weather.LightRain,
    75: Weather.Storm,
    90: Weather.Windstorm,
    100: Weather.Storm,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.Overcast,
    30: Weather.Fog,
    55: Weather.LightRain,
    75: Weather.Storm,
    90: Weather.Windstorm,
    100: Weather.Storm,
  },
};

export const blackCoast = new SubRegion(
  SubRegionEnum.BlackCoast,
  RegionEnum.Atmahn,
  {
    en: "The Black Coast is a lawless stretch of ports and coves where smugglers, pirates, and merchants mingle in the shadows. Obsidian Port and Nightreef Docks are infamous for contraband markets, while the Blackmarket of Ashport thrives on stolen goods and forbidden relics. The Cintertide Lighthouse still guides ships, though its keepers are said to turn a blind eye to blood-soaked trade.",
    th: "",
  },
  [],
  {
    caravan: -5,
    walk: 0,
    horse: 0,
  },
  "UNSTABLE",
  weatherInterpreter,
);

