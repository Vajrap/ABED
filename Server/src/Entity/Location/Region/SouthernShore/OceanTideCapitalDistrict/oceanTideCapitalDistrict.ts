import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.Clear,
    20: Weather.Cloudy,
    35: Weather.Overcast,
    50: Weather.Fog,
    65: Weather.LightRain,
    80: Weather.SteadyRain,
    100: Weather.Storm,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.Cloudy,
    15: Weather.LightRain,
    30: Weather.SteadyRain,
    50: Weather.SteadyRain,
    70: Weather.Storm,
    85: Weather.Storm,
    100: Weather.Storm,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.Clear,
    20: Weather.Clear,
    40: Weather.Cloudy,
    60: Weather.Overcast,
    75: Weather.LightRain,
    90: Weather.SteadyRain,
    100: Weather.Storm,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.Clear,
    25: Weather.Clear,
    50: Weather.Cloudy,
    70: Weather.Overcast,
    85: Weather.LightRain,
    100: Weather.SteadyRain,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.Clear,
    30: Weather.Clear,
    55: Weather.Cloudy,
    75: Weather.Overcast,
    90: Weather.LightRain,
    100: Weather.SteadyRain,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.Fog,
    20: Weather.Overcast,
    40: Weather.LightRain,
    60: Weather.SteadyRain,
    80: Weather.LightSnow,
    100: Weather.SteadySnow,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.Overcast,
    20: Weather.Fog,
    40: Weather.LightRain,
    60: Weather.LightSnow,
    80: Weather.SteadySnow,
    100: Weather.Blizzard,
  },
};

export const oceanTideCapitalDistrict = new SubRegion(
  SubRegionEnum.OceanTideCapitalDistrict,
  RegionEnum.SouthernShore,
  {
    en: "The beating heart of the south, Ocean Tide is a grand port city where noble manors, the Academia, and the castle overlook the vast harbor. Its barracks and rail hub make it a center of power and commerce, crowded with merchants, scholars, and guards, yet still shadowed by smugglers and the occasional beast slipping in from sea or land.",
    th: "",
  },
  [],
  {
    caravan: 0,
    walk: 0,
    horse: 0,
  },
  "BALANCE",
  weatherInterpreter,
);

