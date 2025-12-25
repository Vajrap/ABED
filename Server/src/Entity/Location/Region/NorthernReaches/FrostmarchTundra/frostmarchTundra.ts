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
    45: Weather.LightSnow,
    65: Weather.SteadySnow,
    85: Weather.Blizzard,
    100: Weather.ColdSnap,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.LightSnow,
    30: Weather.SteadySnow,
    60: Weather.Blizzard,
    85: Weather.ColdSnap,
    100: Weather.Blizzard,
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

export const frostmarchTundra = new SubRegion(
  SubRegionEnum.FrostmarchTundra,
  RegionEnum.NorthernReaches,
  {
    en: "Barren, wind-scoured land at the very edge of the Boreal Frost. Here, hunters, trappers, and wanderers survive in lonely camps, and caravans cross only when well-armed. Bones of men and beasts alike litter ravines, stark reminders of how thin the margin of life is in this place.",
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

