import type { Character } from "../../Entity/Character/Character";

class CharacterManager {
    characters: Character[];
    constructor() {
        this.characters = [];
    }

    getCharacterByID(id: string): Character {
        const character = this.characters.find(c => c.id === id);
        if (!character) { throw new Error(`Character with ID ${id} not found`)}
        return character
    }

    addCharacter(character: Character) {
        this.characters.push(character);
    }
}

export const characterManager = new CharacterManager();