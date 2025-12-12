import type { Character } from "../../Entity/Character/Character";

class CharacterManager {
    // Array for iteration (needed for GameLoop, etc.)
    characters: Character[];
    
    // Maps for O(1) lookups (internal optimization)
    private charactersById: Map<string, Character>;
    private charactersByUserId: Map<string, Character>;
    
    constructor() {
        this.characters = [];
        this.charactersById = new Map();
        this.charactersByUserId = new Map();
    }

    /**
     * Get character by ID - O(1) lookup using Map
     */
    getCharacterByID(id: string): Character {
        const character = this.charactersById.get(id);
        if (!character) {
            throw new Error(`Character with ID ${id} not found`);
        }
        return character;
    }

    /**
     * Get character by userId - O(1) lookup using Map
     */
    getUserCharacterByUserId(userId: string): Character | null {
        return this.charactersByUserId.get(userId) || null;
    }

    /**
     * Add character to manager
     * Maintains both array (for iteration) and maps (for fast lookups)
     */
    addCharacter(character: Character) {
        // Add to array for iteration
        this.characters.push(character);
        
        // Add to Maps for O(1) lookups
        this.charactersById.set(character.id, character);
        
        if (character.userId) {
            this.charactersByUserId.set(character.userId, character);
        }
    }

    /**
     * Remove character from manager
     * Useful for cleanup or character deletion
     */
    removeCharacter(id: string): boolean {
        const character = this.charactersById.get(id);
        if (!character) {
            return false;
        }

        // Remove from array
        const index = this.characters.findIndex(c => c.id === id);
        if (index !== -1) {
            this.characters.splice(index, 1);
        }

        // Remove from maps
        this.charactersById.delete(id);
        if (character.userId) {
            this.charactersByUserId.delete(character.userId);
        }

        return true;
    }
}

export const characterManager = new CharacterManager();