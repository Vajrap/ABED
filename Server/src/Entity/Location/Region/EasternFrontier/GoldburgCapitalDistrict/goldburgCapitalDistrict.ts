import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.DesertClear,
    25: Weather.DesertCloudy,
    45: Weather.DesertOvercast,
    65: Weather.DesertFog,
    80: Weather.LightRain,
    95: Weather.Sandstorm,
    100: Weather.Storm,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.DesertCloudy,
    20: Weather.LightRain,
    40: Weather.SteadyRain,
    60: Weather.Storm,
    80: Weather.Storm,
    100: Weather.Sandstorm,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.DesertClear,
    20: Weather.Heatwave,
    40: Weather.DesertCloudy,
    60: Weather.DesertOvercast,
    80: Weather.LightRain,
    100: Weather.Sandstorm,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.DesertClear,
    30: Weather.Heatwave,
    50: Weather.DesertCloudy,
    70: Weather.DesertOvercast,
    90: Weather.LightRain,
    100: Weather.Sandstorm,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.DesertClear,
    35: Weather.Heatwave,
    55: Weather.DesertCloudy,
    75: Weather.DesertOvercast,
    95: Weather.Sandstorm,
    100: Weather.Sandstorm,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.DesertFog,
    25: Weather.DesertOvercast,
    50: Weather.LightRain,
    75: Weather.SteadyRain,
    100: Weather.LightSnow,
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

export const goldburgCapitalDistrict = new SubRegion(
  SubRegionEnum.GoldburgCapitalDistrict,
  RegionEnum.EasternFrontier,
  {
    en: "Goldburg is a fortress-city built to anchor the eastern frontier, its rail terminus and barracks feeding both trade and war. High walls and the castle dominate the skyline, while the merchant's quarter thrives beneath their shadow, bustling with caravans and soldiers alike.",
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

