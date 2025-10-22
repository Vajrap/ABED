import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { SubRegion } from "../../SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../Weather/types";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    // 🌱 Seeding (early spring, mild but unsettled)
    0: Weather.Clear,
    10: Weather.Clear,
    25: Weather.Cloudy,
    40: Weather.Overcast,
    55: Weather.Fog,
    70: Weather.LightRain,
    85: Weather.SteadyRain,
    100: Weather.Storm,
  },
  
  [SeasonEnum.RainFall]: {
    // 🌧️ RainFall (wet season, lots of showers)
    0: Weather.Clear,
    5: Weather.Clear,
    20: Weather.Cloudy,
    35: Weather.Overcast,
    50: Weather.LightRain,
    65: Weather.SteadyRain,
    85: Weather.HeavyRain,
    100: Weather.Storm,
  },
  
  [SeasonEnum.GreenTide]: {
    // 🌿 GreenTide (lush midsummer, fertile, warm rains)
    0: Weather.Clear,
    15: Weather.Clear,
    30: Weather.Cloudy,
    45: Weather.Overcast,
    60: Weather.LightRain,
    75: Weather.SteadyRain,
    90: Weather.HeavyRain,
    100: Weather.Storm,
  },
  
  [SeasonEnum.HarvestMoon]: {
    // 🌕 HarvestMoon (late summer/early autumn, shifting toward dryness but storms still possible)
    0: Weather.Clear,
    20: Weather.Clear,
    35: Weather.Cloudy,
    50: Weather.Overcast,
    65: Weather.LightRain,
    80: Weather.SteadyRain,
    90: Weather.HeavyRain,
    100: Weather.Storm,
  },
  
  [SeasonEnum.SunDry]: {
    // ☀️ SunDry (late autumn, dryer, risk of heatwave in plains)
    0: Weather.Clear,
    25: Weather.Clear,
    40: Weather.Cloudy,
    55: Weather.Overcast,
    65: Weather.Fog,
    75: Weather.LightRain,
    85: Weather.SteadyRain,
    100: Weather.Heatwave,
  },
  
  [SeasonEnum.Frostveil]: {
    // ❄️ Frostveil (early winter, frost and snow emerge)
    0: Weather.Clear,
    15: Weather.Clear,
    30: Weather.Cloudy,
    45: Weather.Overcast,
    55: Weather.Fog,
    70: Weather.LightSnow,
    85: Weather.SteadySnow,
    100: Weather.Blizzard,
  },
  
  [SeasonEnum.LongDark]: {
    // 🌑 LongDark (deep winter, bitter and extreme)
    0: Weather.Clear,
    10: Weather.Clear,
    20: Weather.Cloudy,
    35: Weather.Overcast,
    50: Weather.Fog,
    65: Weather.LightSnow,
    85: Weather.SteadySnow,
    100: Weather.Blizzard,
  },
};


export const goldenPlains = new SubRegion(
  SubRegionEnum.GoldenPlains,
  RegionEnum.CentralPlain,
  [LocationsEnum.WaywardInn],
  {
    caravan: 0,
    walk: 0,
    horse: 0,
  },
  "BALANCE",
  weatherInterpreter
);
