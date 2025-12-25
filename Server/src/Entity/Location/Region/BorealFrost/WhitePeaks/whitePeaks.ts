import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.Overcast,
    15: Weather.Fog,
    35: Weather.LightSnow,
    55: Weather.SteadySnow,
    75: Weather.Blizzard,
    90: Weather.ColdSnap,
    100: Weather.Windstorm,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.LightSnow,
    20: Weather.SteadySnow,
    45: Weather.Blizzard,
    70: Weather.ColdSnap,
    85: Weather.Windstorm,
    100: Weather.Blizzard,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.Overcast,
    25: Weather.LightSnow,
    55: Weather.SteadySnow,
    80: Weather.Blizzard,
    95: Weather.ColdSnap,
    100: Weather.Windstorm,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.Overcast,
    30: Weather.LightSnow,
    65: Weather.SteadySnow,
    85: Weather.Blizzard,
    100: Weather.ColdSnap,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.Overcast,
    35: Weather.LightSnow,
    70: Weather.SteadySnow,
    90: Weather.Blizzard,
    100: Weather.ColdSnap,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.Fog,
    20: Weather.LightSnow,
    45: Weather.SteadySnow,
    70: Weather.Blizzard,
    85: Weather.ColdSnap,
    95: Weather.Windstorm,
    100: Weather.Blizzard,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.Overcast,
    15: Weather.Fog,
    35: Weather.LightSnow,
    55: Weather.SteadySnow,
    75: Weather.Blizzard,
    90: Weather.ColdSnap,
    100: Weather.Windstorm,
  },
};

export const whitePeaks = new SubRegion(
  SubRegionEnum.WhitePeaks,
  RegionEnum.BorealFrost,
  {
    en: "The White Peaks are knife-sharp mountains, split with storm-wracked caves where planar currents tear reality thin. Stormspire Crag and the Frozen Labyrinth are known to swallow entire expeditions, while the Howling Caves lure wanderers with voices that aren't their own. Ice-wraiths and storm-born horrors thrive in this chaos, making the region feared even by hardened northerners.",
    th: "",
  },
  [],
  {
    caravan: -25,
    walk: -25,
    horse: -20,
  },
  "EXTREME",
  weatherInterpreter,
);

