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
  static gameDateHour: 1 | 2 | 3 | 4 = 1;
  static gameDateDay: 1 | 2 | 3 | 4 | 5 | 6 = 1;
  static gameDateSeason: 1 | 2 | 3 | 4 | 5 | 6 | 7 = 1;
  static gameDateYear: number = 0;
  static timerInterval: NodeJS.Timeout | null = null;

  static advanceOnePhrase() {
    this.gameDateHour++;
    if (this.gameDateHour > GameTime.inGameHoursPerDay) {
      this.gameDateHour = 1;
      this.gameDateDay++;
      if (this.gameDateDay > GameTime.inGameDaysPerSeason) {
        this.gameDateDay = 1;
        this.gameDateSeason++;
        if (this.gameDateSeason > GameTime.inGameSeasonsPerYear) {
          this.gameDateSeason = 1;
          this.gameDateYear++;
        }
      }
    }
  }

  static setGameTime(
    dayPassed: number,
    gameDateDay: 1 | 2 | 3 | 4 | 5 | 6,
    gameDateHour: 1 | 2 | 3 | 4,
    gameDateSeason: 1 | 2 | 3 | 4 | 5 | 6 | 7,
    gameDateYear: number,
  ) {
    GameTime.dayPassed = dayPassed;
    GameTime.gameDateDay = gameDateDay;
    GameTime.gameDateHour = gameDateHour;
    GameTime.gameDateSeason = gameDateSeason;
    GameTime.gameDateYear = gameDateYear;
  }

  static getCurrentGameDateTime(): GameTimeInterface  {
    return {
      dayPassed: GameTime.dayPassed,
      gameDateDay: GameTime.gameDateDay,
      gameDateHour: GameTime.gameDateHour,
      gameDateSeason: GameTime.gameDateSeason,
      gameDateYear: GameTime.gameDateYear,
      phase: GameTime.getCurrentGamePhase(),
      day: GameTime.getCurrentGameDayOfWeek(),
      season: GameTime.getCurrentGameSeason(),
    };
  }

  static getCurrentGameDate(): GameTimeInterface {
    return {
      dayPassed: GameTime.dayPassed,
      gameDateDay: GameTime.gameDateDay,
      gameDateHour: GameTime.gameDateHour,
      gameDateSeason: GameTime.gameDateSeason,
      gameDateYear: GameTime.gameDateYear,
      phase: GameTime.getCurrentGamePhase(),
      day: GameTime.getCurrentGameDayOfWeek(),
      season: GameTime.getCurrentGameSeason(),
    };
  }

  static getCurrentGamePhase(): TimeOfDay {
    const phases = [
      TimeOfDay.night,
      TimeOfDay.morning,
      TimeOfDay.afternoon,
      TimeOfDay.evening,
    ];
    return phases[(GameTime.gameDateHour - 1)] as TimeOfDay;
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
    return days[GameTime.gameDateDay - 1] as DayOfWeek;
  }

  static getCurrentGameSeason(): SeasonEnum {
    if (
      GameTime.gameDateSeason < 1 ||
      GameTime.gameDateSeason > GameTime.inGameSeasonsPerYear
    ) {
      console.warn(
        `Unexpected gameDateSeason: ${GameTime.gameDateSeason}, defaulting to LongDark.`,
      );
      return SeasonEnum.LongDark;
    }

    switch (GameTime.gameDateSeason) {
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
    return Math.floor(GameTime.gameDateDay / GameTime.inGameDaysPerWeek);
  }
}
