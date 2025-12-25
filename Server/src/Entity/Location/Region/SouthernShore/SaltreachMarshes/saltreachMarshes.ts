import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.Fog,
    20: Weather.Overcast,
    40: Weather.LightRain,
    60: Weather.SteadyRain,
    80: Weather.Storm,
    100: Weather.Storm,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.LightRain,
    20: Weather.SteadyRain,
    45: Weather.Storm,
    70: Weather.Storm,
    90: Weather.Storm,
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
    50: Weather.LightRain,
    70: Weather.SteadyRain,
    85: Weather.LightSnow,
    100: Weather.SteadySnow,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.Fog,
    25: Weather.Overcast,
    50: Weather.LightRain,
    70: Weather.LightSnow,
    85: Weather.SteadySnow,
    100: Weather.Blizzard,
  },
};

export const saltreachMarshes = new SubRegion(
  SubRegionEnum.SaltreachMarshes,
  RegionEnum.SouthernShore,
  {
    en: "Low, salt-crusted villages cling to life amid oyster reefs and smuggler coves. Salt pans feed trade, but shifting tides and the creatures that stalk the marshes keep the people wary. Saltreach Station links these lonely wetlands to the wider shore.",
    th: "",
  },
  [],
  {
    caravan: -10,
    walk: -10,
    horse: -5,
  },
  "UNSTABLE",
  weatherInterpreter,
);

