import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.Overcast,
    20: Weather.Fog,
    40: Weather.LightSnow,
    60: Weather.SteadySnow,
    80: Weather.Blizzard,
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
    30: Weather.LightSnow,
    60: Weather.SteadySnow,
    85: Weather.Blizzard,
    100: Weather.ColdSnap,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.Overcast,
    35: Weather.LightSnow,
    70: Weather.SteadySnow,
    90: Weather.Blizzard,
    100: Weather.ColdSnap,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.Overcast,
    40: Weather.LightSnow,
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

export const icehornPlains = new SubRegion(
  SubRegionEnum.IcehornPlains,
  RegionEnum.BorealFrost,
  {
    en: "Stretching out beneath endless northern skies, the Icehorn Plains are tundra fields where nomadic camps hunt mammoths and oxen. Shallow camps like Frostthorn and Winterwatch stand against storms, while the Mammoth Graveyard marks the bones of titans long fallen. Frost-beasts and wolf packs stalk the plains, keeping the hunters forever on edge.",
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

