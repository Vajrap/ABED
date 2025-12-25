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
    60: Weather.Sandstorm,
    80: Weather.Heatwave,
    95: Weather.Windstorm,
    100: Weather.Sandstorm,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.DesertCloudy,
    15: Weather.Sandstorm,
    35: Weather.Storm,
    55: Weather.Windstorm,
    75: Weather.Sandstorm,
    95: Weather.Storm,
    100: Weather.Windstorm,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.DesertClear,
    20: Weather.Heatwave,
    45: Weather.DesertCloudy,
    65: Weather.Sandstorm,
    85: Weather.Windstorm,
    100: Weather.Heatwave,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.DesertClear,
    25: Weather.Heatwave,
    55: Weather.DesertCloudy,
    75: Weather.Sandstorm,
    90: Weather.Windstorm,
    100: Weather.Heatwave,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.DesertClear,
    30: Weather.Heatwave,
    60: Weather.DesertCloudy,
    80: Weather.Sandstorm,
    95: Weather.Windstorm,
    100: Weather.Heatwave,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.DesertFog,
    25: Weather.DesertOvercast,
    50: Weather.Sandstorm,
    75: Weather.Storm,
    95: Weather.Windstorm,
    100: Weather.Storm,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.DesertOvercast,
    30: Weather.DesertFog,
    55: Weather.Sandstorm,
    80: Weather.Storm,
    95: Weather.Windstorm,
    100: Weather.Storm,
  },
};

export const theEasternDeeps = new SubRegion(
  SubRegionEnum.TheEasternDeeps,
  RegionEnum.SilentDesert,
  {
    en: "The desert at its harshest — endless dunes, storm-scarred hollows, and ruins buried beneath the sands. Cults and outlaws claim forgotten shrines, and bones of caravans mark the way to nowhere. It is a place where both faith and greed are tested, and most are found wanting.",
    th: "",
  },
  [],
  {
    caravan: -20,
    walk: -20,
    horse: -15,
  },
  "EXTREME",
  weatherInterpreter,
);

