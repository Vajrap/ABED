import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
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
    // 🌧️ RainFall (late spring, wet and stormy)
    0: Weather.LightRain,
    10: Weather.LightRain,
    25: Weather.SteadyRain,
    40: Weather.SteadyRain,
    55: Weather.Storm,
    70: Weather.Storm,
    85: Weather.Storm,
    100: Weather.Storm,
  },
  [SeasonEnum.GreenTide]: {
    // 🌿 GreenTide (early summer, warm and humid)
    0: Weather.Clear,
    10: Weather.Clear,
    25: Weather.Clear,
    40: Weather.Cloudy,
    55: Weather.Cloudy,
    70: Weather.Overcast,
    85: Weather.LightRain,
    100: Weather.SteadyRain,
  },
  [SeasonEnum.HarvestMoon]: {
    // 🌕 HarvestMoon (late summer, clear and warm)
    0: Weather.Clear,
    10: Weather.Clear,
    25: Weather.Clear,
    40: Weather.Clear,
    55: Weather.Cloudy,
    70: Weather.Cloudy,
    85: Weather.Overcast,
    100: Weather.LightRain,
  },
  [SeasonEnum.SunDry]: {
    // ☀️ SunDry (early autumn, dry and clear)
    0: Weather.Clear,
    10: Weather.Clear,
    25: Weather.Clear,
    40: Weather.Clear,
    55: Weather.Clear,
    70: Weather.Cloudy,
    85: Weather.Overcast,
    100: Weather.LightRain,
  },
  [SeasonEnum.Frostveil]: {
    // ❄️ Frostveil (late autumn, cold and foggy)
    0: Weather.Fog,
    10: Weather.Fog,
    25: Weather.Overcast,
    40: Weather.Overcast,
    55: Weather.LightRain,
    70: Weather.LightRain,
    85: Weather.SteadySnow,
    100: Weather.SteadySnow,
  },
  [SeasonEnum.LongDark]: {
    // 🌑 LongDark (winter, cold and dark)
    0: Weather.Overcast,
    10: Weather.Overcast,
    25: Weather.Fog,
    40: Weather.LightSnow,
    55: Weather.LightSnow,
    70: Weather.SteadySnow,
    85: Weather.SteadySnow,
    100: Weather.Blizzard,
  },
};

// Define goldenPlains data without importing SubRegion class to avoid circular dependency
export const goldenPlainsData = {
  id: SubRegionEnum.GoldenPlains,
  region: RegionEnum.CentralPlain,
  locations: [], // Empty locations array to avoid circular dependency
  speedBonus: {
    caravan: 0,
    walk: 0,
    horse: 0,
  },
  volatility: "BALANCE" as const,
  weatherInterpretation: weatherInterpreter,
};