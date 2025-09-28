/*
Calendar concept
- one day consist of 4 phrases, 6 hours each,
  6:00 - 12:00 = morning;
  12:00 - 18:00 = afternoon;
  18:00 - 24:00 = evening;
  00:00 - 6:00 = night
the phrase equal to 15 minute realtime, so it's an hour/day

- one week consist of 6 days, start with laoh end on seethar
so, we have 6 real hour for a week

- one month consist of 4 weeks, that means, when an hour = 6 real hour then it'd take 4 weeks = one real day = 1 in game month

- But we can't have 7 month a year, would be too short? so we should span in out into 2 weeks = 1 in game year, so it's 2 real week = 1 in game year.

- we need month names and how should the game in character see the celestial body in order for them to know the month
*/

export enum TimeOfDay {
  night = "night",
  morning = "morning",
  afternoon = "afternoon",
  evening = "evening",
}

export enum DayOfWeek {
  laoh = "laoh",
  rowana = "rowana",
  aftree = "aftree",
  udur = "udur",
  matris = "matris",
  seethar = "seethar",
}

export enum Season {
  seeding = "seeding",
  rainFall = "rainFall",
  greenTide = "greenTide",
  harvestMoon = "harvestMoon",
  sunDry = "sunDry",
  frostVeil = "frostVeil",
  longDark = "longDark",
}

export interface GameTimeInterface {
  dayPassed: number;
  gameDateDay: number;
  gameDateHour: number;
  gameDateMonth: number;
  gameDateYear: number;
  phase: TimeOfDay;
}

export enum SeasonEnum {
  Seeding = "Seeding",
  RainFall = "RainFall",
  GreenTide = "GreenTide",
  HarvestMoon = "HarvestMoon",
  SunDry = "SunDry",
  Frostveil = "Frostveil",
  LongDark = "LongDark",
}
