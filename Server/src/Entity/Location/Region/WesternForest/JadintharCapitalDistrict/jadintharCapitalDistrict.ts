import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.Cloudy,
    25: Weather.Overcast,
    45: Weather.Fog,
    65: Weather.LightRain,
    80: Weather.SteadyRain,
    100: Weather.Storm,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.LightRain,
    20: Weather.SteadyRain,
    45: Weather.Storm,
    70: Weather.Storm,
    90: Weather.Monsoon,
    100: Weather.Monsoon,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.Cloudy,
    25: Weather.Overcast,
    50: Weather.LightRain,
    70: Weather.SteadyRain,
    85: Weather.Storm,
    100: Weather.Monsoon,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.Clear,
    30: Weather.Cloudy,
    55: Weather.Overcast,
    75: Weather.LightRain,
    90: Weather.SteadyRain,
    100: Weather.Storm,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.Clear,
    35: Weather.Cloudy,
    60: Weather.Overcast,
    80: Weather.LightRain,
    95: Weather.SteadyRain,
    100: Weather.Storm,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.Fog,
    30: Weather.Overcast,
    55: Weather.LightRain,
    75: Weather.SteadyRain,
    90: Weather.Storm,
    100: Weather.Monsoon,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.Fog,
    35: Weather.Overcast,
    60: Weather.LightRain,
    80: Weather.SteadyRain,
    95: Weather.Storm,
    100: Weather.Monsoon,
  },
};

export const jadintharCapitalDistrict = new SubRegion(
  SubRegionEnum.JadintharCapitalDistrict,
  RegionEnum.WesternForest,
  {
    en: "The royal port of Jadinthar thrives at the mouth of the western rivers, its palace and barracks guarding the Greenveil railhead. Beneath the docks, a sprawling bazaar pulses with trade, where wealth and intrigue mingle as easily as spices and smuggled goods.",
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

