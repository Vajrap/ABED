import {
  DayOfWeek,
  type GameTimeInterface,
  SeasonEnum,
  TimeOfDay,
} from "../../InterFacesEnumsAndTypes/Time";
import Report from "../../Utils/Reporter";
import { getGameEpoch, getMsPerPhase } from "../../config/gameLoop";

export class GameTime {
  static inGameHoursPerDay: number = 4; // 4 phases in a game day: morning, afternoon, evening, night => 15 min per phase, 1 hour per day
  static inGameDaysPerWeek: number = 6; // 6 days in a game week
  static inGameDaysPerSeason: number = 48; // 48 days in a game season => One season equal to 2 real days
  static inGameSeasonsPerYear: number = 7; // 7 seasons in a game year

  static inGameWeeksPerSeason: number = 8; // 8 weeks in a game season

  static dayPassed: number = 0;
  static hour: 1 | 2 | 3 | 4 = 1;
  static dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6 = 1;
  static dayOfSeason:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 32
    | 33
    | 34
    | 35
    | 36
    | 37
    | 38
    | 39
    | 40
    | 41
    | 42
    | 43
    | 44
    | 45
    | 46
    | 47
    | 48 = 1;
  static season: 1 | 2 | 3 | 4 | 5 | 6 | 7 = 1;
  static year: number = 0;

  static timerInterval: NodeJS.Timeout | null = null;
  private static currentPhaseIndex: number = 0;
  private static lastProcessedPhaseIndex: number | null = null;

  static synchronize(now: Date = new Date()) {
    const epoch = getGameEpoch().getTime();
    const msPerPhase = getMsPerPhase();

    const elapsedMs = Math.max(0, now.getTime() - epoch);
    const phaseIndex = Math.floor(elapsedMs / msPerPhase);

    if (phaseIndex < 0) {
      this.currentPhaseIndex = 0;
    } else {
      this.currentPhaseIndex = phaseIndex;
    }

    const phasesPerDay = this.inGameHoursPerDay;
    const totalDays = Math.floor(this.currentPhaseIndex / phasesPerDay);
    const totalPhasesToday = this.currentPhaseIndex % phasesPerDay;

    this.dayPassed = totalDays;
    this.hour = ((totalPhasesToday % phasesPerDay) + 1) as 1 | 2 | 3 | 4;

    const dayOfWeekIndex = totalDays % this.inGameDaysPerWeek;
    this.dayOfWeek = (dayOfWeekIndex + 1) as (typeof GameTime)["dayOfWeek"];

    const dayOfSeasonIndex = totalDays % this.inGameDaysPerSeason;
    this.dayOfSeason = (dayOfSeasonIndex + 1) as (typeof GameTime)["dayOfSeason"];

    const totalSeasons = Math.floor(totalDays / this.inGameDaysPerSeason);
    const seasonIndex = totalSeasons % this.inGameSeasonsPerYear;
    this.season = (seasonIndex + 1) as (typeof GameTime)["season"];

    this.year = Math.floor(
      totalSeasons / GameTime.inGameSeasonsPerYear,
    );
  }

  static markCurrentPhaseProcessed(force: boolean = false): boolean {
    if (force) {
      this.lastProcessedPhaseIndex = this.currentPhaseIndex;
      return true;
    }

    if (this.lastProcessedPhaseIndex === this.currentPhaseIndex) {
      Report.debug("Skipping game loop; current phase already processed", {
        phaseIndex: this.currentPhaseIndex,
      });
      return false;
    }

    this.lastProcessedPhaseIndex = this.currentPhaseIndex;
    return true;
  }

  static getCurrentPhaseIndex(): number {
    return this.currentPhaseIndex;
  }

  static getLastProcessedPhaseIndex(): number | null {
    return this.lastProcessedPhaseIndex;
  }

  static setLastProcessedPhaseIndex(index: number | null) {
    this.lastProcessedPhaseIndex =
      index !== null && index >= 0 ? index : null;
  }

  static computePhaseTimestamp(phaseIndex: number): Date {
    const epoch = getGameEpoch().getTime();
    const msPerPhase = getMsPerPhase();
    return new Date(epoch + phaseIndex * msPerPhase);
  }

  static timeUntilNextPhase(now: Date = new Date()): number {
    const msPerPhase = getMsPerPhase();
    const epoch = getGameEpoch().getTime();
    const elapsed = Math.max(0, now.getTime() - epoch);
    const remainder = elapsed % msPerPhase;
    const timeUntilNext = remainder === 0 ? msPerPhase : msPerPhase - remainder;
    return timeUntilNext;
  }

  static setGameTime(
    dayPassed: number,
    hour: 1 | 2 | 3 | 4,
    dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6,
    dayOfSeason:
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 7
      | 8
      | 9
      | 10
      | 11
      | 12
      | 13
      | 14
      | 15
      | 16
      | 17
      | 18
      | 19
      | 20
      | 21
      | 22
      | 23
      | 24
      | 25
      | 26
      | 27
      | 28
      | 29
      | 30
      | 31
      | 32
      | 33
      | 34
      | 35
      | 36
      | 37
      | 38
      | 39
      | 40
      | 41
      | 42
      | 43
      | 44
      | 45
      | 46
      | 47
      | 48,
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

  static getCurrentGameDateTime(): GameTimeInterface {
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
    return phases[GameTime.hour - 1] as TimeOfDay;
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
    Report.debug("Computed game day of week", {
      dayOfWeek: GameTime.dayOfWeek,
      label: days[GameTime.dayOfWeek - 1],
    });
    return days[GameTime.dayOfWeek - 1] as DayOfWeek;
  }

  static getCurrentGameSeason(): SeasonEnum {
    switch (GameTime.season) {
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
    const daysPerYear =
      GameTime.inGameDaysPerSeason * GameTime.inGameSeasonsPerYear; // 336
    return (
      GameTime.year * daysPerYear +
      (GameTime.season - 1) * GameTime.inGameDaysPerSeason +
      GameTime.dayOfSeason
    );
    // Is this equal to the dayPassed?
    // return GameTime.dayPassed
  }
}
