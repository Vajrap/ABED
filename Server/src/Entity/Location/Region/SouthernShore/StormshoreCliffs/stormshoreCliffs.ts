import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.Cloudy,
    20: Weather.Overcast,
    40: Weather.Fog,
    55: Weather.LightRain,
    70: Weather.SteadyRain,
    85: Weather.Storm,
    100: Weather.Windstorm,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.LightRain,
    15: Weather.SteadyRain,
    35: Weather.Storm,
    55: Weather.Storm,
    75: Weather.Windstorm,
    90: Weather.Storm,
    100: Weather.Windstorm,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.Cloudy,
    25: Weather.Overcast,
    45: Weather.LightRain,
    65: Weather.SteadyRain,
    80: Weather.Storm,
    95: Weather.Windstorm,
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
    25: Weather.Overcast,
    45: Weather.LightRain,
    65: Weather.SteadyRain,
    80: Weather.LightSnow,
    95: Weather.SteadySnow,
    100: Weather.Blizzard,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.Overcast,
    20: Weather.Fog,
    40: Weather.LightRain,
    60: Weather.LightSnow,
    80: Weather.SteadySnow,
    95: Weather.Blizzard,
    100: Weather.Windstorm,
  },
};

export const stormshoreCliffs = new SubRegion(
  SubRegionEnum.StormshoreCliffs,
  RegionEnum.SouthernShore,
  {
    en: "A dangerous, storm-battered coast where waves crash against jagged stone. Villages cling to survival beneath looming cliffs, while fortresses and caves guard the frontier. Singing winds and hidden beasts make this stretch both haunting and perilous.",
    th: "",
  },
  [],
  {
    caravan: -5,
    walk: -5,
    horse: -5,
  },
  "UNSTABLE",
  weatherInterpreter,
);

