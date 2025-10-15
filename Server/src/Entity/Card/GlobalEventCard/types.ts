import type { NewsEmittedFromLocationStructure } from "../../News/News";

export enum GlobalEventCardEnum {
  // Escalation Events
  KingdomMarch = "KingdomMarch",
  DragonHorde = "DragonHorde",
  GreatFloods = "GreatFloods",
  GreatFire = "GreatFire",
  EclipseOfTheFirstborn = "EclipseOfTheFirstborn",
  
  // Relief Events
  GreatFamine = "GreatFamine",
  ThePlague = "ThePlague",
  LongWinter = "LongWinter",
  BountifulHarvest = "BountifulHarvest",
  YearOfPlenty = "YearOfPlenty",
  
  // Neutral/Mixed Events
  FestivalYear = "FestivalYear",
  TradeWinds = "TradeWinds",
  CometOfTheNorth = "CometOfTheNorth",
  
  // Minor Events
  MildSeason = "MildSeason",
  ThinHarvest = "ThinHarvest",
  BusyLumbercamps = "BusyLumbercamps",
  PoorVein = "PoorVein",
  RichWaters = "RichWaters",

  // Boring Year
  BoringYear = "BoringYear",
}

// Effect handler function - just do whatever you need
export type EffectHandler = () => NewsEmittedFromLocationStructure;

// Escalation threshold - triggers when scale crosses into this range
export interface EscalationThreshold {
  minScale: number;
  maxScale: number;
  onEnter?: EffectHandler | null; // Called once when crossing into this threshold
  onDaily?: EffectHandler | null; // Called once per day
  onWeekly?: EffectHandler | null; // Called once per week
  onMonthly?: EffectHandler | null; // Called once per month
  onSeason?: EffectHandler | null; // Called once per season
  onYearly?: EffectHandler | null; // Called once per year
}

// Climax event at max scale
export interface ClimaxEvent {
  endCondition: () => boolean;
  onEnter: EffectHandler | null; // What happens at climax
  onDaily: EffectHandler | null; // Called once per day
  onWeekly: EffectHandler | null; // Called once per week
  onMonthly: EffectHandler | null; // Called once per month
  onSeason: EffectHandler | null; // Called once per season
  onYearly: EffectHandler | null; // Called once per year
  playerInvolvement: {
    description: string;
    rewards?: string[];
    leaderboardPoints?: number;
  };
  // Optional: different outcomes based on success/failure
  onSuccess: EffectHandler | null;
  onFailure: EffectHandler | null;
}

export function makeClimaxEvent(config: Partial<ClimaxEvent>): ClimaxEvent {
  return {
    endCondition: config.endCondition ?? (() => true),
    onEnter: config.onEnter ?? null,
    onDaily: config.onDaily ?? null,
    onWeekly: config.onWeekly ?? null,
    onMonthly: config.onMonthly ?? null,
    onSeason: config.onSeason ?? null,
    onYearly: config.onYearly ?? null,
    playerInvolvement: config.playerInvolvement ?? {
      description: "",
      rewards: [],
      leaderboardPoints: 0,
    },
    onSuccess: config.onSuccess ?? null,
    onFailure: config.onFailure ?? null,
  };
}


export interface GlobalEventCardConfig {
  id: GlobalEventCardEnum;
  startingScale?: number;
  onDraw?: EffectHandler | undefined;
  escalationTrack?: EscalationThreshold[];
  climaxEvent?: ClimaxEvent;
  completionCondition?: () => boolean;
}

function makeGlobalEventCardConfig(config: Partial<GlobalEventCardConfig>): GlobalEventCardConfig {
    return {
        id: config.id ?? GlobalEventCardEnum.BoringYear,
        startingScale: config.startingScale ?? 250,
        onDraw: config.onDraw ?? undefined,
        escalationTrack: config.escalationTrack ?? [],
        climaxEvent: config.climaxEvent ?? makeClimaxEvent({}),
        completionCondition: config.completionCondition ?? (() => true),
    }
}
