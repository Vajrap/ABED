import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { SubRegion } from "../../../SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { WeatherInterpreter } from "../../../Weather/types";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.Clear,
    20: Weather.Cloudy,
    30: Weather.Overcast,
    50: Weather.Fog,
    60: Weather.LightRain,
    85: Weather.SteadyRain,
    100: Weather.Storm,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.LightRain,
    25: Weather.SteadyRain,
    55: Weather.Storm,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.Clear,
    40: Weather.Cloudy,
    70: Weather.Overcast,
    85: Weather.LightRain,
    100: Weather.SteadyRain,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.Clear,
    55: Weather.Cloudy,
    85: Weather.Overcast,
    100: Weather.LightRain,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.Clear,
    70: Weather.Cloudy,
    85: Weather.Overcast,
    100: Weather.LightRain,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.Fog,
    25: Weather.Overcast,
    55: Weather.LightRain,
    85: Weather.SteadySnow,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.Overcast,
    25: Weather.Fog,
    40: Weather.LightSnow,
    70: Weather.SteadySnow,
    100: Weather.Blizzard,
  },
};

export const southFarm = new SubRegion(
  SubRegionEnum.SouthFarms,
  RegionEnum.CentralPlain,
  {
    en: "The Central Plains are Eloria’s fertile core, a golden expanse fed by the Great White River and crossed by iron rails. They are the continent’s breadbasket and safest land, though still threatened by wolves, dragonlings, bandits, and storms. Villages and markets cluster around stations and river crossings, the Temple of Laoh dominates faith, and the Azure Wind Caravan still roams, keeping old ways alive in a land that is both the heart of kingdoms and the first proving ground for adventurers.",
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
