import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.Overcast,
    10: Weather.Fog,
    30: Weather.LightSnow,
    50: Weather.SteadySnow,
    70: Weather.Blizzard,
    85: Weather.ColdSnap,
    100: Weather.Windstorm,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.LightSnow,
    15: Weather.SteadySnow,
    40: Weather.Blizzard,
    65: Weather.ColdSnap,
    85: Weather.Windstorm,
    100: Weather.Blizzard,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.Overcast,
    20: Weather.LightSnow,
    50: Weather.SteadySnow,
    75: Weather.Blizzard,
    90: Weather.ColdSnap,
    100: Weather.Windstorm,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.Overcast,
    25: Weather.LightSnow,
    60: Weather.SteadySnow,
    80: Weather.Blizzard,
    95: Weather.ColdSnap,
    100: Weather.Windstorm,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.Overcast,
    30: Weather.LightSnow,
    65: Weather.SteadySnow,
    85: Weather.Blizzard,
    100: Weather.ColdSnap,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.Fog,
    15: Weather.LightSnow,
    40: Weather.SteadySnow,
    65: Weather.Blizzard,
    85: Weather.ColdSnap,
    95: Weather.Windstorm,
    100: Weather.Blizzard,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.Overcast,
    10: Weather.Fog,
    30: Weather.LightSnow,
    50: Weather.SteadySnow,
    70: Weather.Blizzard,
    85: Weather.ColdSnap,
    100: Weather.Windstorm,
  },
};

export const worldsEdge = new SubRegion(
  SubRegionEnum.WorldsEdge,
  RegionEnum.BorealFrost,
  {
    en: "Beyond maps and reason lies the World's Edge, a frozen abyss where the land itself crumbles into chaos. The Black Glacier creeps like a living wall of ice, while the Edge of All Things plunges into endless void. Sanctum of Silence is said to be the last place mortals can stand before the deep frost swallows all. Here dwell colossal frost-titans and abominations born of planar storms, reminders of a world unraveling.",
    th: "",
  },
  [],
  {
    caravan: -30,
    walk: -30,
    horse: -25,
  },
  "EXTREME",
  weatherInterpreter,
);

