import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.DesertClear,
    30: Weather.DesertCloudy,
    55: Weather.DesertOvercast,
    75: Weather.Sandstorm,
    90: Weather.Heatwave,
    100: Weather.Sandstorm,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.DesertCloudy,
    25: Weather.DesertOvercast,
    50: Weather.LightRain,
    75: Weather.Sandstorm,
    95: Weather.Storm,
    100: Weather.Sandstorm,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.DesertClear,
    20: Weather.Heatwave,
    45: Weather.DesertCloudy,
    70: Weather.Sandstorm,
    90: Weather.Heatwave,
    100: Weather.Sandstorm,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.DesertClear,
    25: Weather.Heatwave,
    55: Weather.DesertCloudy,
    80: Weather.Sandstorm,
    100: Weather.Heatwave,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.DesertClear,
    30: Weather.Heatwave,
    65: Weather.DesertCloudy,
    90: Weather.Sandstorm,
    100: Weather.Heatwave,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.DesertFog,
    35: Weather.DesertOvercast,
    65: Weather.LightRain,
    85: Weather.Sandstorm,
    100: Weather.Storm,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.DesertOvercast,
    40: Weather.DesertFog,
    70: Weather.LightRain,
    90: Weather.Sandstorm,
    100: Weather.Storm,
  },
};

export const saltglassFlats = new SubRegion(
  SubRegionEnum.SaltglassFlats,
  RegionEnum.SilentDesert,
  {
    en: "Blinding white flats where mirages dance and the ground itself glitters like broken glass. Quarries and mines claw at the salt crust, while camps and outcrops bake under an unforgiving sun. Few linger here long without shade, water, or luck.",
    th: "",
  },
  [],
  {
    caravan: -10,
    walk: -15,
    horse: -10,
  },
  "UNSTABLE",
  weatherInterpreter,
);

