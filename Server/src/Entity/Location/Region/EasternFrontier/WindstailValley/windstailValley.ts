import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.DesertClear,
    20: Weather.DesertCloudy,
    40: Weather.DesertOvercast,
    60: Weather.DesertFog,
    75: Weather.LightRain,
    90: Weather.Sandstorm,
    100: Weather.Windstorm,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.DesertCloudy,
    15: Weather.LightRain,
    35: Weather.SteadyRain,
    55: Weather.Storm,
    75: Weather.Sandstorm,
    90: Weather.Windstorm,
    100: Weather.Storm,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.DesertClear,
    20: Weather.Heatwave,
    45: Weather.DesertCloudy,
    65: Weather.DesertOvercast,
    80: Weather.Sandstorm,
    95: Weather.Windstorm,
    100: Weather.Sandstorm,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.DesertClear,
    30: Weather.Heatwave,
    55: Weather.DesertCloudy,
    75: Weather.DesertOvercast,
    90: Weather.Sandstorm,
    100: Weather.Windstorm,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.DesertClear,
    35: Weather.Heatwave,
    60: Weather.DesertCloudy,
    80: Weather.Sandstorm,
    95: Weather.Windstorm,
    100: Weather.Sandstorm,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.DesertFog,
    25: Weather.DesertOvercast,
    50: Weather.LightRain,
    75: Weather.SteadyRain,
    95: Weather.LightSnow,
    100: Weather.Windstorm,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.DesertOvercast,
    30: Weather.DesertFog,
    55: Weather.LightRain,
    75: Weather.LightSnow,
    90: Weather.SteadySnow,
    100: Weather.Blizzard,
  },
};

export const windstailValley = new SubRegion(
  SubRegionEnum.WindstailValley,
  RegionEnum.EasternFrontier,
  {
    en: "A harsh frontier pass leading into the Silence Desert, where Windstail Town and the Desert Gate Fortress guard the last trace of greenery. Pilgrims and merchants stop at the inn, but beasts and raiders are never far from the road.",
    th: "",
  },
  [],
  {
    caravan: -5,
    walk: -5,
    horse: 0,
  },
  "UNSTABLE",
  weatherInterpreter,
);

