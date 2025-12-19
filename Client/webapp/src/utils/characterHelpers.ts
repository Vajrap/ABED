import type { CharacterInterface } from "@/types/api";

/**
 * Extract character skills into a map format
 */
export function getCharacterSkillsMap(character: CharacterInterface | null): Record<string, { level: number; exp: number }> | undefined {
  if (!character) return undefined;
  
  const skillsMap: Record<string, { level: number; exp: number }> = {};
  
  if (character.activeSkills) {
    character.activeSkills.forEach((skill) => {
      skillsMap[skill.id] = { level: skill.level, exp: skill.exp };
    });
  }
  
  if (character.conditionalSkills) {
    character.conditionalSkills.forEach((skill) => {
      if (!skillsMap[skill.id]) {
        skillsMap[skill.id] = { level: skill.level, exp: skill.exp };
      }
    });
  }
  
  return Object.keys(skillsMap).length > 0 ? skillsMap : undefined;
}

