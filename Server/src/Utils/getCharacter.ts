import { activeCharacterRegistry } from "../Entity/Character/repository";
import { characterManager } from "../Game/CharacterManager";
import type { Character } from "../Entity/Character/Character";

/**
 * Get a character by ID
 * 
 * Priority:
 * 1. activeCharacterRegistry - Temporary characters (MOBs in battles)
 * 2. characterManager - All characters loaded from database (NPCs and players)
 * 
 * @param id - Character ID (UUID)
 * @returns Character instance or undefined if not found
 */
export function getCharacter(id: string): Character | undefined {
    // First, check active characters (includes MOBs created for battles)
    if (activeCharacterRegistry[id]) {
        return activeCharacterRegistry[id];
    }
    
    // Then check characterManager (includes all NPCs and players loaded from DB)
    try {
        return characterManager.getCharacterByID(id);
    } catch (error) {
        // Character not found in manager
        return undefined;
    }
}
