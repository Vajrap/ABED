/**
 * Examples of using SchedulePattern helpers
 * 
 * This file demonstrates how to create schedules more easily
 * with patterns, weekly variations, randomness, and less repetition.
 */

import { DayOfWeek, TimeOfDay } from "src/InterFacesEnumsAndTypes/Time";
import { ActionInput } from "src/Entity/Character/Subclass/Action/CharacterAction";
import { SchedulePatterns, patternToCharacterSchedule, patternToPartySchedule, type SchedulePattern } from "./scheduleHelpers";

/**
 * Example 1: Simple service schedule (like inn staff)
 * Before: 24 lines of repetitive code
 * After: 2 lines
 */
export const simpleInnStaffSchedule = SchedulePatterns.service(
  { type: ActionInput.Tavern },
  { type: ActionInput.Rest }
);

export const simpleInnStaffPartySchedule = SchedulePatterns.service(
  ActionInput.Inn,
  ActionInput.Inn
);

/**
 * Example 2: Schedule with weekly variation
 * Week 1-4: Normal work schedule
 * Week 5-8: Busy season - work longer hours
 */
export const merchantWithBusySeason: SchedulePattern = {
  base: {
    [TimeOfDay.morning]: { type: ActionInput.Tavern },
    [TimeOfDay.afternoon]: { type: ActionInput.Tavern },
    [TimeOfDay.evening]: { type: ActionInput.Rest },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  weeklyVariations: {
    // Weeks 5-8: Busy season - work evenings too
    5: {
      base: {
        [TimeOfDay.morning]: { type: ActionInput.Tavern },
        [TimeOfDay.afternoon]: { type: ActionInput.Tavern },
        [TimeOfDay.evening]: { type: ActionInput.Tavern },
        [TimeOfDay.night]: { type: ActionInput.Rest },
      },
    },
    6: {
      base: {
        [TimeOfDay.morning]: { type: ActionInput.Tavern },
        [TimeOfDay.afternoon]: { type: ActionInput.Tavern },
        [TimeOfDay.evening]: { type: ActionInput.Tavern },
        [TimeOfDay.night]: { type: ActionInput.Rest },
      },
    },
    7: {
      base: {
        [TimeOfDay.morning]: { type: ActionInput.Tavern },
        [TimeOfDay.afternoon]: { type: ActionInput.Tavern },
        [TimeOfDay.evening]: { type: ActionInput.Tavern },
        [TimeOfDay.night]: { type: ActionInput.Rest },
      },
    },
    8: {
      base: {
        [TimeOfDay.morning]: { type: ActionInput.Tavern },
        [TimeOfDay.afternoon]: { type: ActionInput.Tavern },
        [TimeOfDay.evening]: { type: ActionInput.Tavern },
        [TimeOfDay.night]: { type: ActionInput.Rest },
      },
    },
  },
};

/**
 * Example 3: Schedule with day-specific overrides
 * Work most days, but rest on Seethar (last day of week)
 */
export const workWithRestDay: SchedulePattern = {
  base: {
    [TimeOfDay.morning]: { type: ActionInput.Tavern },
    [TimeOfDay.afternoon]: { type: ActionInput.Tavern },
    [TimeOfDay.evening]: { type: ActionInput.Tavern },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  days: {
    [DayOfWeek.seethar]: {
      [TimeOfDay.morning]: { type: ActionInput.Rest },
      [TimeOfDay.afternoon]: { type: ActionInput.Rest },
      [TimeOfDay.evening]: { type: ActionInput.Rest },
      [TimeOfDay.night]: { type: ActionInput.Rest },
    },
  },
};

/**
 * Example 4: Complex schedule with weekly and daily variations
 * - Normal weeks: Work Mon-Fri, rest weekends
 * - Week 4: Market week - work all days
 * - Week 8: Festival week - different activities
 */
export const complexMerchantSchedule: SchedulePattern = {
  base: {
    [TimeOfDay.morning]: { type: ActionInput.Tavern },
    [TimeOfDay.afternoon]: { type: ActionInput.Tavern },
    [TimeOfDay.evening]: { type: ActionInput.Rest },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  days: {
    // Rest on weekends (last 2 days)
    [DayOfWeek.matris]: {
      [TimeOfDay.morning]: { type: ActionInput.Rest },
      [TimeOfDay.afternoon]: { type: ActionInput.Rest },
      [TimeOfDay.evening]: { type: ActionInput.Rest },
      [TimeOfDay.night]: { type: ActionInput.Rest },
    },
    [DayOfWeek.seethar]: {
      [TimeOfDay.morning]: { type: ActionInput.Rest },
      [TimeOfDay.afternoon]: { type: ActionInput.Rest },
      [TimeOfDay.evening]: { type: ActionInput.Rest },
      [TimeOfDay.night]: { type: ActionInput.Rest },
    },
  },
  weeklyVariations: {
    // Week 4: Market week - work all days
    4: {
      days: {
        [DayOfWeek.matris]: {
          [TimeOfDay.morning]: { type: ActionInput.Tavern },
          [TimeOfDay.afternoon]: { type: ActionInput.Tavern },
          [TimeOfDay.evening]: { type: ActionInput.Tavern },
          [TimeOfDay.night]: { type: ActionInput.Rest },
        },
        [DayOfWeek.seethar]: {
          [TimeOfDay.morning]: { type: ActionInput.Tavern },
          [TimeOfDay.afternoon]: { type: ActionInput.Tavern },
          [TimeOfDay.evening]: { type: ActionInput.Tavern },
          [TimeOfDay.night]: { type: ActionInput.Rest },
        },
      },
    },
    // Week 8: Festival week - socialize instead
    8: {
      base: {
        [TimeOfDay.morning]: { type: ActionInput.Socialize },
        [TimeOfDay.afternoon]: { type: ActionInput.Socialize },
        [TimeOfDay.evening]: { type: ActionInput.Socialize },
        [TimeOfDay.night]: { type: ActionInput.Rest },
      },
    },
  },
};

/**
 * Example 5: Schedule with random actions
 * Sometimes work, sometimes socialize, sometimes rest
 */
export const randomMerchantSchedule: SchedulePattern = {
  base: {
    [TimeOfDay.morning]: SchedulePatterns.random([
      { type: ActionInput.Tavern },
      { type: ActionInput.Socialize },
      { type: ActionInput.Rest },
    ]),
    [TimeOfDay.afternoon]: SchedulePatterns.probability(
      { type: ActionInput.Tavern },
      0.7, // 70% chance to work
      { type: ActionInput.Socialize } // 30% chance to socialize
    ),
    [TimeOfDay.evening]: { type: ActionInput.Rest },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
};

/**
 * Example 6: Weighted random schedule
 * More likely to work, but occasionally does other things
 */
export const weightedWorkSchedule: SchedulePattern = {
  base: {
    [TimeOfDay.morning]: SchedulePatterns.weighted([
      { action: { type: ActionInput.Tavern }, weight: 60 }, // 60% chance
      { action: { type: ActionInput.Socialize }, weight: 25 }, // 25% chance
      { action: { type: ActionInput.Rest }, weight: 15 }, // 15% chance
    ]),
    [TimeOfDay.afternoon]: SchedulePatterns.weighted([
      { action: { type: ActionInput.Tavern }, weight: 70 },
      { action: { type: ActionInput.Socialize }, weight: 20 },
      { action: { type: ActionInput.Rest }, weight: 10 },
    ]),
    [TimeOfDay.evening]: { type: ActionInput.Rest },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
};

/**
 * Example 7: Deterministic randomness (same day = same action)
 * Uses seed based on day/week for consistent behavior
 */
export const deterministicRandomSchedule: SchedulePattern = {
  base: {
    [TimeOfDay.morning]: SchedulePatterns.weighted(
      [
        { action: { type: ActionInput.Tavern }, weight: 50 },
        { action: { type: ActionInput.Socialize }, weight: 30 },
        { action: { type: ActionInput.Rest }, weight: 20 },
      ],
      "morning_seed" // Same seed = same result
    ),
    [TimeOfDay.afternoon]: SchedulePatterns.random([
      { type: ActionInput.Tavern },
      { type: ActionInput.Socialize },
    ]),
    [TimeOfDay.evening]: { type: ActionInput.Rest },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
};

/**
 * Example 8: Complex random schedule with weekly variations
 * Different randomness patterns for different weeks
 */
export const complexRandomSchedule: SchedulePattern = {
  base: {
    [TimeOfDay.morning]: SchedulePatterns.probability(
      { type: ActionInput.Tavern },
      0.8
    ),
    [TimeOfDay.afternoon]: SchedulePatterns.probability(
      { type: ActionInput.Tavern },
      0.8
    ),
    [TimeOfDay.evening]: { type: ActionInput.Rest },
    [TimeOfDay.night]: { type: ActionInput.Rest },
  },
  weeklyVariations: {
    // Week 5-8: Busy season - more random (less predictable)
    5: {
      base: {
        [TimeOfDay.morning]: SchedulePatterns.random([
          { type: ActionInput.Tavern },
          { type: ActionInput.Tavern },
          { type: ActionInput.Tavern },
          { type: ActionInput.Socialize }, // Occasional break
        ]),
        [TimeOfDay.afternoon]: SchedulePatterns.random([
          { type: ActionInput.Tavern },
          { type: ActionInput.Tavern },
          { type: ActionInput.Tavern },
          { type: ActionInput.Socialize },
        ]),
      },
    },
    // Week 8: Festival week - more socializing
    8: {
      base: {
        [TimeOfDay.morning]: SchedulePatterns.weighted([
          { action: { type: ActionInput.Socialize }, weight: 60 },
          { action: { type: ActionInput.Tavern }, weight: 40 },
        ]),
        [TimeOfDay.afternoon]: SchedulePatterns.weighted([
          { action: { type: ActionInput.Socialize }, weight: 70 },
          { action: { type: ActionInput.Tavern }, weight: 30 },
        ]),
      },
    },
  },
};

/**
 * Usage in NPC definitions:
 * 
 * // Option 1: Use pattern directly (runtime evaluation with randomness)
 * const npcSchedule = patternToCharacterSchedule(simpleInnStaffSchedule, currentWeek, dayOfWeek, dayOfSeason);
 * 
 * // Option 2: Pre-generate for specific week (compile-time, randomness evaluated once)
 * const npcSchedule = patternToCharacterSchedule(simpleInnStaffSchedule, 1, 1, 1);
 * 
 * // Option 3: Still use full schedule if you need maximum control
 * const npcSchedule: CharacterActionSequence = { ... };
 * 
 * // Option 4: Use random patterns for variation
 * const npcSchedule = patternToCharacterSchedule(randomMerchantSchedule, currentWeek, dayOfWeek, dayOfSeason);
 */

