import type { CharacterConfig } from '../services/types';

/**
 * Generate a default name based on race and class
 * Format: {race}{class} (e.g., "HumanWarrior", "ElvenMage")
 */
export function generateDefaultName(race?: string, className?: string): string {
  if (!race || !className) {
    return 'Unknown';
  }
  return `${race}${className}`;
}

/**
 * Generate unique names for all characters that don't have names
 * If multiple characters have the same race+class, append numbers (1, 2, 3, etc.)
 */
export function assignDefaultNames(characters: CharacterConfig[]): CharacterConfig[] {
  // Track how many times we've seen each race+class combination
  const nameCounts = new Map<string, number>();
  
  return characters.map(char => {
    // Skip if it's a MOB (they should have their own names)
    if (char.type === 'mob') {
      return char;
    }
    
    // Skip if both names are already provided
    if (char.name.en && char.name.th) {
      return char;
    }
    
    // Generate default name if race and class are available
    if (char.race && char.class) {
      const baseName = generateDefaultName(char.race, char.class);
      
      // Count how many characters with this race+class we've seen so far
      const currentCount = (nameCounts.get(baseName) || 0) + 1;
      nameCounts.set(baseName, currentCount);
      
      // If there's only one character with this race+class, no number needed
      // If there are multiple, assign numbers starting from 1
      let finalName = baseName;
      
      // Check if there will be duplicates by looking ahead
      const totalCount = characters.filter(c => 
        c.type === 'custom' && 
        c.race === char.race && 
        c.class === char.class &&
        (!c.name.en || !c.name.th) // Only count those that need names
      ).length;
      
      if (totalCount > 1) {
        finalName = `${baseName}${currentCount}`;
      }
      
      return {
        ...char,
        name: {
          en: char.name.en || finalName,
          th: char.name.th || finalName,
        },
      };
    }
    
    // If no race/class, keep original
    return char;
  });
}

