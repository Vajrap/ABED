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
    80: Weather.Sandstorm,
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

export const greybarrowFlats = new SubRegion(
  SubRegionEnum.GreybarrowFlats,
  RegionEnum.EasternFrontier,
  {
    en: "Flatlands dotted with burial mounds and battle-scarred fields, where frontier villages struggle to survive. The Greybarrow Post keeps a wary watch, but old barrows and haunted sites draw more danger than protection.",
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

