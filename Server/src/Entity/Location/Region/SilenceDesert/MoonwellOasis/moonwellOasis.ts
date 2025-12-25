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
    70: Weather.LightRain,
    85: Weather.Sandstorm,
    100: Weather.Storm,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.DesertCloudy,
    20: Weather.LightRain,
    45: Weather.SteadyRain,
    70: Weather.Storm,
    90: Weather.Sandstorm,
    100: Weather.Storm,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.DesertClear,
    30: Weather.Heatwave,
    55: Weather.DesertCloudy,
    75: Weather.LightRain,
    90: Weather.Sandstorm,
    100: Weather.Heatwave,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.DesertClear,
    35: Weather.Heatwave,
    60: Weather.DesertCloudy,
    80: Weather.LightRain,
    95: Weather.Sandstorm,
    100: Weather.Heatwave,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.DesertClear,
    40: Weather.Heatwave,
    70: Weather.DesertCloudy,
    90: Weather.Sandstorm,
    100: Weather.Heatwave,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.DesertFog,
    30: Weather.DesertOvercast,
    60: Weather.LightRain,
    85: Weather.SteadyRain,
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

export const moonwellOasis = new SubRegion(
  SubRegionEnum.MoonwellOasis,
  RegionEnum.SilentDesert,
  {
    en: "The Deepest part of the desert lies the Moonwell, a crescent of green carved from the wasteland. Its village thrives on figs, dates, and carefully channeled water, though its aqueducts and ruins whisper of older civilizations. To reach it is to survive the desert.",
    th: "",
  },
  [],
  {
    caravan: 0,
    walk: 0,
    horse: 0,
  },
  "CALM",
  weatherInterpreter,
);

