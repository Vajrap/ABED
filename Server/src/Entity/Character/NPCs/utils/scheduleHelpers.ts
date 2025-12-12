/**
 * Schedule Helper Utilities
 * 
 * Makes it easier to create NPC schedules with:
 * - Pattern-based definitions (workdays, weekends, etc.)
 * - Weekly variations (week 1-8 of season)
 * - Less repetitive code
 * - Backward compatible with full schedules
 */

import { DayOfWeek, TimeOfDay } from "src/InterFacesEnumsAndTypes/Time";
import { ActionInput } from "src/Entity/Character/Subclass/Action/CharacterAction";
import type { CharacterActionSequence } from "src/Entity/Character/Subclass/Action/CharacterAction";
import type { PartyActionSequence } from "src/Entity/Party/ActionlSequence/PartyActionSequence";

/**
 * Random action option - can be a single action or weighted choices
 */
export type RandomActionOption = 
  | ActionInput 
  | any // Single action
  | { 
      // Weighted random selection
      choices: Array<{ action: ActionInput | any; weight: number }>;
      // Optional: seed for deterministic randomness (e.g., based on day/week)
      seed?: string;
    }
  | Array<ActionInput | any>; // Equal-weight random selection from array

/**
 * Pattern-based schedule definition
 * Allows defining schedules more declaratively with random variations
 */
export type SchedulePattern = {
  // Pattern name for reference
  name?: string;
  
  // Base pattern: applies to all days unless overridden
  // Supports random actions via RandomActionOption
  base?: {
    [TimeOfDay.morning]?: RandomActionOption;
    [TimeOfDay.afternoon]?: RandomActionOption;
    [TimeOfDay.evening]?: RandomActionOption;
    [TimeOfDay.night]?: RandomActionOption;
  };
  
  // Day-specific overrides
  days?: {
    [DayOfWeek.laoh]?: Partial<Record<TimeOfDay, RandomActionOption>>;
    [DayOfWeek.rowana]?: Partial<Record<TimeOfDay, RandomActionOption>>;
    [DayOfWeek.aftree]?: Partial<Record<TimeOfDay, RandomActionOption>>;
    [DayOfWeek.udur]?: Partial<Record<TimeOfDay, RandomActionOption>>;
    [DayOfWeek.matris]?: Partial<Record<TimeOfDay, RandomActionOption>>;
    [DayOfWeek.seethar]?: Partial<Record<TimeOfDay, RandomActionOption>>;
  };
  
  // Weekly variations (week 1-8 of season)
  // Each week can override the base pattern
  weeklyVariations?: {
    [week: number]: { // week 1-8
      base?: Partial<Record<TimeOfDay, RandomActionOption>>;
      days?: {
        [DayOfWeek.laoh]?: Partial<Record<TimeOfDay, RandomActionOption>>;
        [DayOfWeek.rowana]?: Partial<Record<TimeOfDay, RandomActionOption>>;
        [DayOfWeek.aftree]?: Partial<Record<TimeOfDay, RandomActionOption>>;
        [DayOfWeek.udur]?: Partial<Record<TimeOfDay, RandomActionOption>>;
        [DayOfWeek.matris]?: Partial<Record<TimeOfDay, RandomActionOption>>;
        [DayOfWeek.seethar]?: Partial<Record<TimeOfDay, RandomActionOption>>;
      };
    };
  };
  
  // Default action if nothing specified
  default?: ActionInput | any;
};

/**
 * Resolve a random action option to a concrete action
 * Handles single actions, arrays, and weighted choices
 */
function resolveRandomAction(
  option: RandomActionOption | undefined,
  seed?: string
): any {
  if (!option) {
    return { type: ActionInput.None };
  }
  
  // Single action (not random)
  if (typeof option === 'string' || (typeof option === 'object' && 'type' in option && !('choices' in option))) {
    return option;
  }
  
  // Array of actions (equal weight)
  if (Array.isArray(option)) {
    if (option.length === 0) {
      return { type: ActionInput.None };
    }
    // Use seed for deterministic randomness if provided
    const random = seed ? seededRandom(seed) : Math.random();
    const index = Math.floor(random * option.length);
    return option[index]!;
  }
  
  // Weighted choices
  if (typeof option === 'object' && 'choices' in option) {
    const choices = option.choices;
    if (choices.length === 0) {
      return { type: ActionInput.None };
    }
    
    // Calculate total weight
    const totalWeight = choices.reduce((sum: number, choice: { action: ActionInput | any; weight: number }) => sum + choice.weight, 0);
    if (totalWeight === 0) {
      return choices[0]!.action;
    }
    
    // Use seed for deterministic randomness if provided
    const random = seed ? seededRandom(seed) : Math.random();
    let randomValue = random * totalWeight;
    
    // Select based on weight
    for (const choice of choices) {
      randomValue -= choice.weight;
      if (randomValue <= 0) {
        return choice.action;
      }
    }
    
    // Fallback to last choice
    return choices[choices.length - 1]!.action;
  }
  
  return { type: ActionInput.None };
}

/**
 * Simple seeded random number generator for deterministic randomness
 * Uses a simple hash-based approach
 */
function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Convert to 0-1 range
  return Math.abs(hash) / 2147483647;
}

/**
 * Convert a SchedulePattern to a full CharacterActionSequence
 * 
 * @param pattern - The pattern definition
 * @param weekOfSeason - Current week of season (1-8), defaults to 1
 * @param dayOfWeek - Current day of week (1-6), for deterministic randomness
 * @param dayOfSeason - Current day of season (1-48), for deterministic randomness
 * @returns Full CharacterActionSequence
 */
export function patternToCharacterSchedule(
  pattern: SchedulePattern,
  weekOfSeason: number = 1,
  dayOfWeek?: number,
  dayOfSeason?: number
): CharacterActionSequence {
  const defaultAction = pattern.default || { type: ActionInput.None };
  
  // Helper to get action for a specific day/time
  const getAction = (day: DayOfWeek, time: TimeOfDay): any => {
    // Create seed for deterministic randomness (same day = same action)
    const seed = dayOfSeason !== undefined 
      ? `day${dayOfSeason}_week${weekOfSeason}_${day}_${time}`
      : undefined;
    
    // Check weekly variation first
    const weekVar = pattern.weeklyVariations?.[weekOfSeason];
    if (weekVar?.days?.[day]?.[time] !== undefined) {
      return resolveRandomAction(weekVar.days[day]![time], seed);
    }
    if (weekVar?.base?.[time] !== undefined) {
      return resolveRandomAction(weekVar.base[time], seed);
    }
    
    // Check day-specific override
    if (pattern.days?.[day]?.[time] !== undefined) {
      return resolveRandomAction(pattern.days[day]![time], seed);
    }
    
    // Check base pattern
    if (pattern.base?.[time] !== undefined) {
      return resolveRandomAction(pattern.base[time], seed);
    }
    
    // Default
    return defaultAction;
  };
  
  // Build full schedule
  return {
    [DayOfWeek.laoh]: {
      [TimeOfDay.morning]: getAction(DayOfWeek.laoh, TimeOfDay.morning),
      [TimeOfDay.afternoon]: getAction(DayOfWeek.laoh, TimeOfDay.afternoon),
      [TimeOfDay.evening]: getAction(DayOfWeek.laoh, TimeOfDay.evening),
      [TimeOfDay.night]: getAction(DayOfWeek.laoh, TimeOfDay.night),
    },
    [DayOfWeek.rowana]: {
      [TimeOfDay.morning]: getAction(DayOfWeek.rowana, TimeOfDay.morning),
      [TimeOfDay.afternoon]: getAction(DayOfWeek.rowana, TimeOfDay.afternoon),
      [TimeOfDay.evening]: getAction(DayOfWeek.rowana, TimeOfDay.evening),
      [TimeOfDay.night]: getAction(DayOfWeek.rowana, TimeOfDay.night),
    },
    [DayOfWeek.aftree]: {
      [TimeOfDay.morning]: getAction(DayOfWeek.aftree, TimeOfDay.morning),
      [TimeOfDay.afternoon]: getAction(DayOfWeek.aftree, TimeOfDay.afternoon),
      [TimeOfDay.evening]: getAction(DayOfWeek.aftree, TimeOfDay.evening),
      [TimeOfDay.night]: getAction(DayOfWeek.aftree, TimeOfDay.night),
    },
    [DayOfWeek.udur]: {
      [TimeOfDay.morning]: getAction(DayOfWeek.udur, TimeOfDay.morning),
      [TimeOfDay.afternoon]: getAction(DayOfWeek.udur, TimeOfDay.afternoon),
      [TimeOfDay.evening]: getAction(DayOfWeek.udur, TimeOfDay.evening),
      [TimeOfDay.night]: getAction(DayOfWeek.udur, TimeOfDay.night),
    },
    [DayOfWeek.matris]: {
      [TimeOfDay.morning]: getAction(DayOfWeek.matris, TimeOfDay.morning),
      [TimeOfDay.afternoon]: getAction(DayOfWeek.matris, TimeOfDay.afternoon),
      [TimeOfDay.evening]: getAction(DayOfWeek.matris, TimeOfDay.evening),
      [TimeOfDay.night]: getAction(DayOfWeek.matris, TimeOfDay.night),
    },
    [DayOfWeek.seethar]: {
      [TimeOfDay.morning]: getAction(DayOfWeek.seethar, TimeOfDay.morning),
      [TimeOfDay.afternoon]: getAction(DayOfWeek.seethar, TimeOfDay.afternoon),
      [TimeOfDay.evening]: getAction(DayOfWeek.seethar, TimeOfDay.evening),
      [TimeOfDay.night]: getAction(DayOfWeek.seethar, TimeOfDay.night),
    },
  };
}

/**
 * Convert a SchedulePattern to a full PartyActionSequence
 */
export function patternToPartySchedule(
  pattern: SchedulePattern,
  weekOfSeason: number = 1,
  dayOfWeek?: number,
  dayOfSeason?: number
): PartyActionSequence {
  const defaultAction = pattern.default || ActionInput.None;
  
  // Party actions are limited to specific options
  type PartyActionOption = 
    | ActionInput.None
    | ActionInput.Travel
    | ActionInput.RailTravel
    | ActionInput.Inn
    | ActionInput.Camping
    | ActionInput.HouseRest;
  
  const getAction = (day: DayOfWeek, time: TimeOfDay): PartyActionOption => {
    const seed = dayOfSeason !== undefined 
      ? `day${dayOfSeason}_week${weekOfSeason}_${day}_${time}`
      : undefined;
    
    const resolved = resolveRandomAction(
      pattern.weeklyVariations?.[weekOfSeason]?.days?.[day]?.[time] ||
      pattern.weeklyVariations?.[weekOfSeason]?.base?.[time] ||
      pattern.days?.[day]?.[time] ||
      pattern.base?.[time],
      seed
    );
    
    // Extract action if it's an object with 'type'
    const action = typeof resolved === 'object' && 'type' in resolved 
      ? resolved.type 
      : resolved;
    
    return (action || defaultAction) as PartyActionOption;
  };
  
  return {
    [DayOfWeek.laoh]: {
      [TimeOfDay.morning]: getAction(DayOfWeek.laoh, TimeOfDay.morning),
      [TimeOfDay.afternoon]: getAction(DayOfWeek.laoh, TimeOfDay.afternoon),
      [TimeOfDay.evening]: getAction(DayOfWeek.laoh, TimeOfDay.evening),
      [TimeOfDay.night]: getAction(DayOfWeek.laoh, TimeOfDay.night),
    },
    [DayOfWeek.rowana]: {
      [TimeOfDay.morning]: getAction(DayOfWeek.rowana, TimeOfDay.morning),
      [TimeOfDay.afternoon]: getAction(DayOfWeek.rowana, TimeOfDay.afternoon),
      [TimeOfDay.evening]: getAction(DayOfWeek.rowana, TimeOfDay.evening),
      [TimeOfDay.night]: getAction(DayOfWeek.rowana, TimeOfDay.night),
    },
    [DayOfWeek.aftree]: {
      [TimeOfDay.morning]: getAction(DayOfWeek.aftree, TimeOfDay.morning),
      [TimeOfDay.afternoon]: getAction(DayOfWeek.aftree, TimeOfDay.afternoon),
      [TimeOfDay.evening]: getAction(DayOfWeek.aftree, TimeOfDay.evening),
      [TimeOfDay.night]: getAction(DayOfWeek.aftree, TimeOfDay.night),
    },
    [DayOfWeek.udur]: {
      [TimeOfDay.morning]: getAction(DayOfWeek.udur, TimeOfDay.morning),
      [TimeOfDay.afternoon]: getAction(DayOfWeek.udur, TimeOfDay.afternoon),
      [TimeOfDay.evening]: getAction(DayOfWeek.udur, TimeOfDay.evening),
      [TimeOfDay.night]: getAction(DayOfWeek.udur, TimeOfDay.night),
    },
    [DayOfWeek.matris]: {
      [TimeOfDay.morning]: getAction(DayOfWeek.matris, TimeOfDay.morning),
      [TimeOfDay.afternoon]: getAction(DayOfWeek.matris, TimeOfDay.afternoon),
      [TimeOfDay.evening]: getAction(DayOfWeek.matris, TimeOfDay.evening),
      [TimeOfDay.night]: getAction(DayOfWeek.matris, TimeOfDay.night),
    },
    [DayOfWeek.seethar]: {
      [TimeOfDay.morning]: getAction(DayOfWeek.seethar, TimeOfDay.morning),
      [TimeOfDay.afternoon]: getAction(DayOfWeek.seethar, TimeOfDay.afternoon),
      [TimeOfDay.evening]: getAction(DayOfWeek.seethar, TimeOfDay.evening),
      [TimeOfDay.night]: getAction(DayOfWeek.seethar, TimeOfDay.night),
    },
  };
}

/**
 * Common schedule patterns
 */
export const SchedulePatterns = {
  /**
   * Work schedule: Work during day, rest at night
   */
  workday: (workAction: ActionInput | any, restAction: ActionInput | any = { type: ActionInput.Rest }): SchedulePattern => ({
    base: {
      [TimeOfDay.morning]: workAction,
      [TimeOfDay.afternoon]: workAction,
      [TimeOfDay.evening]: workAction,
      [TimeOfDay.night]: restAction,
    },
  }),
  
  /**
   * Service schedule: Work all day (like inn staff)
   */
  service: (serviceAction: ActionInput | any, restAction: ActionInput | any = { type: ActionInput.Rest }): SchedulePattern => ({
    base: {
      [TimeOfDay.morning]: serviceAction,
      [TimeOfDay.afternoon]: serviceAction,
      [TimeOfDay.evening]: serviceAction,
      [TimeOfDay.night]: restAction,
    },
  }),
  
  /**
   * Merchant schedule: Open during day, closed at night
   */
  merchant: (merchantAction: ActionInput | any, restAction: ActionInput | any = { type: ActionInput.Rest }): SchedulePattern => ({
    base: {
      [TimeOfDay.morning]: merchantAction,
      [TimeOfDay.afternoon]: merchantAction,
      [TimeOfDay.evening]: merchantAction,
      [TimeOfDay.night]: restAction,
    },
  }),
  
  /**
   * Night shift: Rest during day, work at night
   */
  nightShift: (workAction: ActionInput | any, restAction: ActionInput | any = { type: ActionInput.Rest }): SchedulePattern => ({
    base: {
      [TimeOfDay.morning]: restAction,
      [TimeOfDay.afternoon]: restAction,
      [TimeOfDay.evening]: workAction,
      [TimeOfDay.night]: workAction,
    },
  }),
  
  /**
   * Weekend pattern: Different schedule on specific days
   */
  withWeekend: (
    weekdayPattern: SchedulePattern,
    weekendDays: DayOfWeek[],
    weekendPattern: SchedulePattern
  ): SchedulePattern => {
    const result: SchedulePattern = { ...weekdayPattern };
    result.days = { ...weekdayPattern.days };
    
    for (const day of weekendDays) {
      result.days![day] = {
        ...weekendPattern.base,
        ...weekendPattern.days?.[day],
      };
    }
    
    return result;
  },
  
  /**
   * Random pattern: Randomly select from multiple actions
   */
  random: (actions: Array<ActionInput | any>): RandomActionOption => {
    return actions;
  },
  
  /**
   * Weighted random pattern: Select action based on weights
   */
  weighted: (choices: Array<{ action: ActionInput | any; weight: number }>, seed?: string): RandomActionOption => {
    return { choices, seed };
  },
  
  /**
   * Probability pattern: Select action based on probability (0-1)
   */
  probability: (
    primaryAction: ActionInput | any,
    probability: number, // 0-1, probability of primary action
    fallbackAction: ActionInput | any = { type: ActionInput.None }
  ): RandomActionOption => {
    return {
      choices: [
        { action: primaryAction, weight: probability },
        { action: fallbackAction, weight: 1 - probability },
      ],
    };
  },
};

