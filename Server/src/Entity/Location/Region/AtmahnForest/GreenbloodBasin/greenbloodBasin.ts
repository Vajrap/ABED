import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.Fog,
    25: Weather.Overcast,
    50: Weather.LightRain,
    70: Weather.SteadyRain,
    85: Weather.Storm,
    100: Weather.Monsoon,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.LightRain,
    20: Weather.SteadyRain,
    45: Weather.Storm,
    70: Weather.Monsoon,
    90: Weather.Monsoon,
    100: Weather.Monsoon,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.Fog,
    25: Weather.Overcast,
    50: Weather.LightRain,
    70: Weather.SteadyRain,
    85: Weather.Storm,
    100: Weather.Monsoon,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.Fog,
    30: Weather.Overcast,
    55: Weather.LightRain,
    75: Weather.SteadyRain,
    90: Weather.Storm,
    100: Weather.Monsoon,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.Fog,
    35: Weather.Overcast,
    60: Weather.LightRain,
    80: Weather.SteadyRain,
    95: Weather.Storm,
    100: Weather.Monsoon,
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

export const greenbloodBasin = new SubRegion(
  SubRegionEnum.GreenbloodBasin,
  RegionEnum.Atmahn,
  {
    en: "A festering floodplain where rivers slow into marsh, the Greenblood Basin is a land of canals, fever, and decay. The Canal-Town of Mirehaven survives amid disease, while the Reedblood Marshes and Leechwater Crossing teem with rot and parasitic life. Worshippers of the Drowned God claim the Temple at the basin's heart, where whispers say the dead are called back from the mire.",
    th: "",
  },
  [],
  {
    caravan: -20,
    walk: -20,
    horse: -15,
  },
  "VOLATILE",
  weatherInterpreter,
);

