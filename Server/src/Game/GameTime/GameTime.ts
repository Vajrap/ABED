import {
  DayOfWeek,
  type GameTimeInterface,
  SeasonEnum,
  TimeOfDay,
} from "../../InterFacesEnumsAndTypes/Time";

export class GameTime {
  static inGameHoursPerDay: number = 4; // 4 phases in a game day: morning, afternoon, evening, night => 15 min per phase, 1 hour per day
  static inGameDaysPerWeek: number = 6; // 6 days in a game week
  static inGameDaysPerSeason: number = 48; // 48 days in a game season => One season equal to 2 real days
  static inGameSeasonsPerYear: number = 7; // 7 seasons in a game year
  
  static inGameWeeksPerSeason: number = 8; // 8 weeks in a game season

  static dayPassed: number = 0;
  static hour: 1 | 2 | 3 | 4 = 1;
  static dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6 = 1;
  static dayOfSeason: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 = 1;
  static season: 1 | 2 | 3 | 4 | 5 | 6 | 7 = 1;
  static year: number = 0;

  static timerInterval: NodeJS.Timeout | null = null;

  static advanceOnePhrase() {
    this.hour++;
    if (this.hour > GameTime.inGameHoursPerDay) {
      this.hour = 1;
      this.dayOfWeek++;
      this.dayOfSeason++;
      if (this.dayOfSeason > GameTime.inGameDaysPerSeason) {
        this.dayOfSeason = 1;
        this.season++;
        if (this.season > GameTime.inGameSeasonsPerYear) {
          this.season = 1;
          this.year++;
        }
      }
    }
  }

  static setGameTime(
    dayPassed: number,
    hour: 1 | 2 | 3 | 4,
    dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6,
    dayOfSeason: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48,
    season: 1 | 2 | 3 | 4 | 5 | 6 | 7,
    year: number,
  ) {
    GameTime.dayPassed = dayPassed;
    GameTime.hour = hour;
    GameTime.dayOfWeek = dayOfWeek;
    GameTime.dayOfSeason = dayOfSeason;
    GameTime.season = season;
    GameTime.year = year;
  }

  static getCurrentGameDateTime(): GameTimeInterface  {
    return {
      hour: GameTime.hour,
      dayOfWeek: GameTime.dayOfWeek,
      dayOfSeason: GameTime.dayOfSeason,
      season: GameTime.season,
      dayPassed: GameTime.dayPassed,
      year: GameTime.year,
    };
  }

  static getCurrentGamePhase(): TimeOfDay {
    const phases = [
      TimeOfDay.night,
      TimeOfDay.morning,
      TimeOfDay.afternoon,
      TimeOfDay.evening,
    ];
    return phases[(GameTime.hour - 1)] as TimeOfDay;
  }

  static getCurrentGameDayOfWeek(): DayOfWeek {
    const days = [
      DayOfWeek.laoh,
      DayOfWeek.rowana,
      DayOfWeek.aftree,
      DayOfWeek.udur,
      DayOfWeek.matris,
      DayOfWeek.seethar,
    ];
    return days[GameTime.dayOfWeek - 1] as DayOfWeek;
  }

  static getCurrentGameSeason(): SeasonEnum {
    if (
      GameTime.dayOfSeason < 1 ||
      GameTime.dayOfSeason > GameTime.inGameSeasonsPerYear
    ) {
      console.warn(
        `Unexpected dayOfSeason: ${GameTime.dayOfSeason}, defaulting to LongDark.`,
      );
      return SeasonEnum.LongDark;
    }

    switch (GameTime.dayOfSeason) {
      case 1:
        return SeasonEnum.Seeding;
      case 2:
        return SeasonEnum.RainFall;
      case 3:
        return SeasonEnum.GreenTide;
      case 4:
        return SeasonEnum.HarvestMoon;
      case 5:
        return SeasonEnum.SunDry;
      case 6:
        return SeasonEnum.Frostveil;
      case 7:
        return SeasonEnum.LongDark;
      default:
        return SeasonEnum.LongDark;
    }
  }

  static getWeekNumber(): number {
    return Math.floor(GameTime.dayOfWeek / GameTime.inGameDaysPerWeek);
  }
  
  /**
   * Get total days since game epoch (year 0, season 1, day 1)
   * Used for news archiving and propagation timing
   */
  static getDaysSinceEpoch(): number {
    const daysPerYear = GameTime.inGameDaysPerSeason * GameTime.inGameSeasonsPerYear; // 336
    return (
      GameTime.year * daysPerYear +
      (GameTime.season - 1) * GameTime.inGameDaysPerSeason +
      GameTime.dayOfSeason
    );
    // Is this equal to the dayPassed?
    // return GameTime.dayPassed
  }
}
