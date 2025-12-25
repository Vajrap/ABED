import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.DesertClear,
    30: Weather.DesertCloudy,
    50: Weather.DesertOvercast,
    70: Weather.LightRain,
    85: Weather.Sandstorm,
    100: Weather.Storm,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.DesertCloudy,
    25: Weather.LightRain,
    50: Weather.SteadyRain,
    75: Weather.Storm,
    90: Weather.Sandstorm,
    100: Weather.Storm,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.DesertClear,
    25: Weather.Heatwave,
    50: Weather.DesertCloudy,
    70: Weather.DesertOvercast,
    85: Weather.Sandstorm,
    100: Weather.Sandstorm,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.DesertClear,
    35: Weather.Heatwave,
    60: Weather.DesertCloudy,
    80: Weather.DesertOvercast,
    95: Weather.Sandstorm,
    100: Weather.Sandstorm,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.DesertClear,
    40: Weather.Heatwave,
    65: Weather.DesertCloudy,
    85: Weather.Sandstorm,
    100: Weather.Sandstorm,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.DesertFog,
    30: Weather.DesertOvercast,
    55: Weather.LightRain,
    80: Weather.SteadyRain,
    100: Weather.LightSnow,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.DesertOvercast,
    35: Weather.DesertFog,
    60: Weather.LightRain,
    80: Weather.LightSnow,
    95: Weather.SteadySnow,
    100: Weather.Blizzard,
  },
};

export const drymarchFarms = new SubRegion(
  SubRegionEnum.DrymarchFarms,
  RegionEnum.EasternFrontier,
  {
    en: "Dry, windswept farmland where villages cling to the grain harvest. Windmills and shrines break the horizon, but life here is hard and often uneventful — a land of toil, not glory.",
    th: "",
  },
  [],
  {
    caravan: 0,
    walk: 0,
    horse: 0,
  },
  "STABLE",
  weatherInterpreter,
);

