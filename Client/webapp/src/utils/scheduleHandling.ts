import { actionService } from "@/services/actionService";

const DAY_OF_WEEK_MAP = [
  "laoh",      // Day 0
  "rowana",    // Day 1
  "aftree",    // Day 2
  "udur",      // Day 3
  "matris",    // Day 4
  "seethar",   // Day 5
];

const TIME_OF_DAY_MAP = [
  "morning",   // Phase 0 - Morning
  "afternoon", // Phase 1 - Afternoon
  "evening",   // Phase 2 - Evening
  "night",     // Phase 3 - Night
];

function mapActionToCharacterAction(actionInputValue: string | null): any {
  if (!actionInputValue) {
    return { type: "None" };
  }
  
  const [actionId, parameterValue] = actionInputValue.includes("|")
    ? actionInputValue.split("|")
    : [actionInputValue, null];
  
  switch (actionId) {
    // Simple actions without parameters
    case "None":
      return { type: "None" };
    case "Rest":
      return { type: "Rest" };
    case "Inn":
      return { type: "Inn" };
    case "Camping":
      return { type: "Camping" };
    case "House Rest":
      return { type: "House Rest" };
    case "Socialize":
      return { type: "Socialize" };
    case "Stroll":
      return { type: "Stroll" };
    case "Tavern":
      return { type: "Tavern" };
    case "Mining":
      return { type: "Mining" };
    case "Wood Cutting":
      return { type: "Wood Cutting" };
    case "Foraging":
      return { type: "Foraging" };
    case "Smelting":
      return { type: "Smelting" };
    case "Tanning":
      return { type: "Tanning" };
    case "Carpentry":
      return { type: "Carpentry" };
    case "Weaving":
      return { type: "Weaving" };
    case "Enchanting":
      return { type: "Enchanting" };
      
    // Actions that need parameters
    case "Train Attribute":
      return parameterValue
        ? { type: "Train Attribute", attribute: parameterValue }
        : { type: "None" };
    case "Train Proficiency":
      return parameterValue
        ? { type: "Train Proficiency", proficiency: parameterValue }
        : { type: "None" };
    case "Train Artisan":
      return parameterValue
        ? { type: "Train Artisan", artisan: parameterValue }
        : { type: "None" };
    case "Train Skill":
      return parameterValue
        ? { type: "Train Skill", skillId: parameterValue }
        : { type: "None" };
    case "Learn Skill":
      return parameterValue
        ? { type: "Learn Skill", skillId: parameterValue }
        : { type: "None" };
    case "Read":
      return parameterValue
        ? { type: "Read", bookId: parameterValue }
        : { type: "None" };
    case "Craft":
      return parameterValue
        ? { type: "Craft", itemId: parameterValue }
        : { type: "None" };
      
    // Organization/Sect actions that need sub-selection
    case "Heavens Decree":
      return parameterValue
        ? { type: "Heavens Decree", action: parameterValue }
        : { type: "None" };
    case "Church of Laoh":
      return parameterValue
        ? { type: "Church of Laoh", action: parameterValue }
        : { type: "None" };
    case "Great Temple of Laoh":
      return parameterValue
        ? { type: "Great Temple of Laoh", action: parameterValue }
        : { type: "None" };
    case "Cult of Nizarith":
      return parameterValue
        ? { type: "Cult of Nizarith", action: parameterValue }
        : { type: "None" };
    case "Shrine of Gelthoran":
    case "Shrine of Aqorath":
    case "Shrine of Valthoria":
    case "Shrine of Pyrnthanas":
      return parameterValue
        ? { type: actionId, action: parameterValue }
        : { type: "None" };
    case "Major Shrine of Gelthoran":
    case "Major Shrine of Aqorath":
    case "Major Shrine of Valthoria":
    case "Major Shrine of Pyrnthanas":
      return parameterValue
        ? { type: actionId, action: parameterValue }
        : { type: "None" };
    case "Knight Order":
      return parameterValue
        ? { type: "Knight Order", action: parameterValue }
        : { type: "None" };
    case "Magic School":
      return parameterValue
        ? { type: "Magic School", action: parameterValue }
        : { type: "None" };
    case "Arcane Academia":
      return parameterValue
        ? { type: "Arcane Academia", action: parameterValue }
        : { type: "None" };
      
    default:
      console.warn(`[ScheduleHandling] Unknown ActionInput value: ${actionId}, defaulting to None`);
      return { type: "None" };
  }
}

export async function handleScheduleSave(schedule: Record<string, string>): Promise<void> {
  console.log("[GameView] Schedule saved:", schedule);
  
  try {
    const actionSequence: Record<string, Record<string, any>> = {};
    
    // Initialize all days with empty time slots
    DAY_OF_WEEK_MAP.forEach((day) => {
      actionSequence[day] = {};
      TIME_OF_DAY_MAP.forEach((time) => {
        actionSequence[day][time] = { type: "None" };
      });
    });
    
    // Fill in scheduled actions
    Object.entries(schedule).forEach(([key, actionId]) => {
      const [dayIndexStr, phaseIndexStr] = key.split("-");
      const dayIndex = parseInt(dayIndexStr, 10);
      const phaseIndex = parseInt(phaseIndexStr, 10);
      
      if (
        dayIndex >= 0 &&
        dayIndex < DAY_OF_WEEK_MAP.length &&
        phaseIndex >= 0 &&
        phaseIndex < TIME_OF_DAY_MAP.length
      ) {
        const day = DAY_OF_WEEK_MAP[dayIndex];
        const time = TIME_OF_DAY_MAP[phaseIndex];
        actionSequence[day][time] = mapActionToCharacterAction(actionId);
      }
    });
    
    const request = {
      actionSequence,
    };
    
    console.log("[GameView] Built request payload:", request);
    
    const response = await actionService.updateActions(request);
    console.log("[GameView] Actions updated successfully:", response);
    
    if (response.status === "SUCCESS") {
      console.log("[GameView] Schedule saved successfully");
      if (response.convertedActions && response.convertedActions.length > 0) {
        console.warn("[GameView] Some actions were converted:", response.convertedActions);
      }
    } else {
      console.error("[GameView] Schedule save failed:", response.reason);
    }
  } catch (error) {
    console.error("[GameView] Error saving schedule:", error);
    throw error;
  }
}

