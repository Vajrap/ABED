/**
 * Convert backend actionSequence to frontend schedule format
 */
export function convertActionSequenceToSchedule(
  actionSequence: Record<string, Record<string, any>> | undefined
): Record<string, string> {
  if (!actionSequence) return {};

  const dayOfWeekMap: Record<string, number> = {
    "laoh": 0,
    "rowana": 1,
    "aftree": 2,
    "udur": 3,
    "matris": 4,
    "seethar": 5,
  };

  const timeOfDayMap: Record<string, number> = {
    "morning": 0,
    "afternoon": 1,
    "evening": 2,
    "night": 3,
  };

  const schedule: Record<string, string> = {};

  const convertActionToString = (action: any): string | null => {
    if (!action || !action.type || action.type === "None") {
      return null;
    }

    const actionType = action.type;

    // Actions with parameters need to be formatted as "actionId|parameterValue"
    if (actionType === "Train Attribute" && action.attribute) {
      return `${actionType}|${action.attribute}`;
    }
    if (actionType === "Train Proficiency" && action.proficiency) {
      return `${actionType}|${action.proficiency}`;
    }
    if (actionType === "Train Artisan" && action.artisan) {
      return `${actionType}|${action.artisan}`;
    }
    if (actionType === "Train Skill" && action.skillId) {
      return `${actionType}|${action.skillId}`;
    }
    if (actionType === "Learn Skill" && action.skillId) {
      return `${actionType}|${action.skillId}`;
    }
    if (actionType === "Read" && action.bookId) {
      return `${actionType}|${action.bookId}`;
    }
    if (actionType === "Craft" && action.itemId) {
      return `${actionType}|${action.itemId}`;
    }
    
    // Organization/Sect actions
    if (actionType === "Heavens Decree" && action.action) {
      return `${actionType}|${action.action}`;
    }
    if (actionType === "Church of Laoh" && action.action) {
      return `${actionType}|${action.action}`;
    }
    if (actionType === "Great Temple of Laoh" && action.action) {
      return `${actionType}|${action.action}`;
    }
    if (actionType === "Cult of Nizarith" && action.action) {
      return `${actionType}|${action.action}`;
    }
    if ((actionType.startsWith("Shrine of") || actionType.startsWith("Major Shrine of")) && action.action) {
      return `${actionType}|${action.action}`;
    }
    if (actionType === "Knight Order" && action.action) {
      return `${actionType}|${action.action}`;
    }
    if (actionType === "Magic School" && action.action) {
      return `${actionType}|${action.action}`;
    }
    if (actionType === "Arcane Academia" && action.action) {
      return `${actionType}|${action.action}`;
    }

    // Simple actions without parameters
    return actionType;
  };

  Object.entries(actionSequence).forEach(([day, timeSlots]) => {
    const dayIndex = dayOfWeekMap[day];
    if (dayIndex === undefined) return;

    Object.entries(timeSlots).forEach(([time, action]) => {
      const phaseIndex = timeOfDayMap[time];
      if (phaseIndex === undefined) return;

      const actionString = convertActionToString(action);
      if (actionString) {
        const key = `${dayIndex}-${phaseIndex}`;
        schedule[key] = actionString;
      }
    });
  });

  return schedule;
}

