import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.Overcast,
    30: Weather.Fog,
    50: Weather.LightSnow,
    70: Weather.SteadySnow,
    90: Weather.Blizzard,
    100: Weather.ColdSnap,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.LightSnow,
    25: Weather.SteadySnow,
    50: Weather.Blizzard,
    75: Weather.ColdSnap,
    95: Weather.Blizzard,
    100: Weather.ColdSnap,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.Overcast,
    35: Weather.LightSnow,
    60: Weather.SteadySnow,
    80: Weather.Blizzard,
    95: Weather.ColdSnap,
    100: Weather.Blizzard,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.Overcast,
    40: Weather.LightSnow,
    70: Weather.SteadySnow,
    90: Weather.Blizzard,
    100: Weather.ColdSnap,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.Overcast,
    45: Weather.LightSnow,
    75: Weather.SteadySnow,
    95: Weather.Blizzard,
    100: Weather.ColdSnap,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.Fog,
    20: Weather.LightSnow,
    45: Weather.SteadySnow,
    70: Weather.Blizzard,
    90: Weather.ColdSnap,
    100: Weather.Blizzard,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.Overcast,
    15: Weather.Fog,
    35: Weather.LightSnow,
    55: Weather.SteadySnow,
    75: Weather.Blizzard,
    90: Weather.ColdSnap,
    100: Weather.Blizzard,
  },
};

export const velgarthCapitalDistrict = new SubRegion(
  SubRegionEnum.ValgarthCapitalDistrict,
  RegionEnum.NorthernReaches,
  {
    en: "The beating heart of the north, Velgarth is less a frontier outpost and more a fortress-city carved directly into snow and ice. Its iron walls, rail hub, and barracks stand unyielding against the endless frost, serving as both command seat and lifeline to the rest of Eloria. Life here is harsh but disciplined, defined by steel, trade, and survival in permanent winter.",
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

