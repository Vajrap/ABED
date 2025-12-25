import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { Weather } from "src/InterFacesEnumsAndTypes/Weather";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { WeatherInterpreter } from "../../../Weather/types";
import { SubRegion } from "../../../SubRegion";

const weatherInterpreter: WeatherInterpreter = {
  [SeasonEnum.Seeding]: {
    0: Weather.Cloudy,
    25: Weather.Overcast,
    50: Weather.LightRain,
    70: Weather.Storm,
    85: Weather.Windstorm,
    100: Weather.ThunderOnly,
  },
  [SeasonEnum.RainFall]: {
    0: Weather.LightRain,
    20: Weather.Storm,
    45: Weather.ThunderOnly,
    70: Weather.Windstorm,
    90: Weather.Storm,
    100: Weather.ThunderOnly,
  },
  [SeasonEnum.GreenTide]: {
    0: Weather.Cloudy,
    30: Weather.Overcast,
    55: Weather.LightRain,
    75: Weather.Storm,
    90: Weather.ThunderOnly,
    100: Weather.Windstorm,
  },
  [SeasonEnum.HarvestMoon]: {
    0: Weather.Clear,
    35: Weather.Cloudy,
    60: Weather.Overcast,
    80: Weather.LightRain,
    95: Weather.Storm,
    100: Weather.ThunderOnly,
  },
  [SeasonEnum.SunDry]: {
    0: Weather.Clear,
    40: Weather.Cloudy,
    65: Weather.Overcast,
    85: Weather.LightRain,
    100: Weather.Storm,
  },
  [SeasonEnum.Frostveil]: {
    0: Weather.Fog,
    30: Weather.Overcast,
    55: Weather.LightRain,
    75: Weather.Storm,
    90: Weather.ThunderOnly,
    100: Weather.Windstorm,
  },
  [SeasonEnum.LongDark]: {
    0: Weather.Overcast,
    30: Weather.Fog,
    55: Weather.LightRain,
    75: Weather.Storm,
    90: Weather.ThunderOnly,
    100: Weather.Windstorm,
  },
};

export const crimsonIsles = new SubRegion(
  SubRegionEnum.CrimsonIsles,
  RegionEnum.Atmahn,
  {
    en: "Scattered like blood drops on the sea, the Crimson Isles are infamous for ritual sacrifice and open cult rites. Bloodchant Isle, the Drowned Altar, and the towering Crimson Spire serve as gathering points for sects that thrive on terror. Chains still bind the haunted Chained Isle, relic of an age when prisoners were sacrificed to the tides. Few venture here willingly, save the cults who rule the isles and the sea-beasts that circle them.",
    th: "",
  },
  [],
  {
    caravan: -10,
    walk: -10,
    horse: -5,
  },
  "EXTREME",
  weatherInterpreter,
);

