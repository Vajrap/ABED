import { Character } from "./Character";

/**
 * DEPRECATED: npcRepository is no longer used.
 * NPCs are now loaded from database into characterManager.
 * Use characterManager.getCharacterByID() instead.
 * 
 * This is kept for backward compatibility but should be removed once
 * all references are updated to use characterManager.
 */
export const npcRepository: Record<string, Character> = {};

/**
 * DEPRECATED: playerRepository is no longer used.
 * Player characters are loaded from database into characterManager.
 * Use characterManager.getCharacterByID() or characterManager.getUserCharacterByUserId() instead.
 */
export const playerRepository: Record<string, Character> = {};

/**
 * Runtime registry for active character instances
 * Used for temporary characters like MOBs created for battles
 * These are not persisted to database and are cleaned up after battle
 */
export const activeCharacterRegistry: Record<string, Character> = {};
