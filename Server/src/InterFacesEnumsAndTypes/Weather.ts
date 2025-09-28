// Arranged in Volatility
export enum Weather {
  // Low Volatility
  Clear = "Clear", // sunny, bright
  Cloudy = "Cloudy", // light cloud cover
  Overcast = "Overcast", // fully clouded
  Fog = "Fog", // mist, haze

  // Rain Variants
  LightRain = "LightRain",
  SteadyRain = "SteadyRain",
  HeavyRain = "HeavyRain",
  Storm = "Storm", // thunderstorm, coastal storm
  Monsoon = "Monsoon", // region-specific extreme

  // Snow Variants
  LightSnow = "LightSnow",
  SteadySnow = "SteadySnow",
  HeavySnow = "HeavySnow",
  Blizzard = "Blizzard", // extreme snowstorm
  ColdSnap = "ColdSnap", // sudden deep freeze

  // Extremes & Specials
  Windstorm = "Windstorm", // high winds without rain/snow
  Hail = "Hail", // mixed precipitation
  ThunderOnly = "ThunderOnly", // dramatic but little rain

  // Desert Parts
  DesertClear = "DesertClear",
  DesertCloudy = "DesertCloudy",
  DesertOvercast = "DesertOvercast",
  DesertFog = "DesertFog",
  Sandstorm = "Sandstorm", // desert
  Heatwave = "Heatwave", // extreme summer clear
}
