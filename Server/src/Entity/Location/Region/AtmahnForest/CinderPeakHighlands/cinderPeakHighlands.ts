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
    50: Weather.LightRain,
    70: Weather.Storm,
    85: Weather.Windstorm,
    100: Weather.ThunderOnly,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.LightRain,
    20: Weather.Storm,
    45: Weather.ThunderOnly,
    70: Weather.Windstorm,
    90: Weather.Storm,
    100: Weather.ThunderOnly,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.Cloudy,
    30: Weather.Overcast,
    55: Weather.LightRain,
    75: Weather.Storm,
    90: Weather.ThunderOnly,
    100: Weather.Windstorm,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.Clear,
    35: Weather.Cloudy,
    60: Weather.Overcast,
    80: Weather.LightRain,
    95: Weather.Storm,
    100: Weather.ThunderOnly,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.Clear,
    40: Weather.Cloudy,
    65: Weather.Overcast,
    85: Weather.LightRain,
    100: Weather.Storm,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.Fog,
    30: Weather.Overcast,
    55: Weather.LightRain,
    75: Weather.Storm,
    90: Weather.ThunderOnly,
    100: Weather.Windstorm,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.Overcast,
    30: Weather.Fog,
    55: Weather.LightRain,
    75: Weather.Storm,
    90: Weather.ThunderOnly,
    100: Weather.Windstorm,
  },
};

export const cinderPeakHighlands = new SubRegion(
  SubRegionEnum.CinderpeakHighlands,
  RegionEnum.Atmahn,
  {
    en: "Jagged volcanic ridges dominate the Ashen Highlands, their slopes riddled with obsidian mines and shrines to forgotten cults. Fireglass Mines feed the obsidian trade, while the Red Ridge Shrine and the molten scars nearby draw zealots who worship flame-born gods. The land is unstable, wracked by tremors and prowled by beasts hardened in fire and ash.",
    th: "",
  },
  [],
  {
    caravan: -15,
    walk: -15,
    horse: -10,
  },
  "VOLATILE",
  weatherInterpreter,
);

