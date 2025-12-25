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
    25: Weather.LightSnow,
    50: Weather.SteadySnow,
    75: Weather.Blizzard,
    95: Weather.ColdSnap,
    100: Weather.Blizzard,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.Clear,
    30: Weather.Cloudy,
    55: Weather.Overcast,
    75: Weather.LightRain,
    90: Weather.LightSnow,
    100: Weather.SteadySnow,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.Clear,
    35: Weather.Cloudy,
    60: Weather.Overcast,
    80: Weather.LightRain,
    95: Weather.LightSnow,
    100: Weather.SteadySnow,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.Clear,
    40: Weather.Cloudy,
    65: Weather.Overcast,
    85: Weather.LightRain,
    100: Weather.LightSnow,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.Fog,
    25: Weather.Overcast,
    50: Weather.LightSnow,
    70: Weather.SteadySnow,
    85: Weather.Blizzard,
    100: Weather.ColdSnap,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.Overcast,
    20: Weather.Fog,
    40: Weather.LightSnow,
    60: Weather.SteadySnow,
    80: Weather.Blizzard,
    95: Weather.ColdSnap,
    100: Weather.Blizzard,
  },
};

export const ironvaleHills = new SubRegion(
  SubRegionEnum.IronvaleHills,
  RegionEnum.NorthernReaches,
  {
    en: "Snow-lashed hills dotted with mines and quarries, where towns cling to wealth pulled from stone. Smoke rises from forges even in blizzards, and the clang of iron carries across the valleys. Monsters stalk the ridges, drawn to the noise of men, but the iron trade never stops.",
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

