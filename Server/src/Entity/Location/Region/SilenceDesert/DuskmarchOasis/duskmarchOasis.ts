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
    50: Weather.DesertOvercast,
    70: Weather.Sandstorm,
    90: Weather.Heatwave,
    100: Weather.Sandstorm,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.DesertCloudy,
    20: Weather.LightRain,
    45: Weather.Sandstorm,
    70: Weather.Storm,
    90: Weather.Sandstorm,
    100: Weather.Storm,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.DesertClear,
    25: Weather.Heatwave,
    55: Weather.DesertCloudy,
    75: Weather.Sandstorm,
    95: Weather.Heatwave,
    100: Weather.Sandstorm,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.DesertClear,
    30: Weather.Heatwave,
    65: Weather.DesertCloudy,
    85: Weather.Sandstorm,
    100: Weather.Heatwave,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.DesertClear,
    35: Weather.Heatwave,
    70: Weather.DesertCloudy,
    90: Weather.Sandstorm,
    100: Weather.Heatwave,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.DesertFog,
    30: Weather.DesertOvercast,
    60: Weather.LightRain,
    85: Weather.Sandstorm,
    100: Weather.Storm,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.DesertOvercast,
    35: Weather.DesertFog,
    65: Weather.LightRain,
    90: Weather.Sandstorm,
    100: Weather.Storm,
  },
};

export const duskmarchOasis = new SubRegion(
  SubRegionEnum.DuskmarchOasis,
  RegionEnum.SilentDesert,
  {
    en: "A scattering of fragile oases that should be sanctuaries but are instead contested, raided, and bloodied. Bandits and desperate townsfolk clash over every well, and even the safest ground feels temporary, one sandstorm away from ruin.",
    th: "",
  },
  [],
  {
    caravan: -5,
    walk: -5,
    horse: 0,
  },
  "VOLATILE",
  weatherInterpreter,
);

