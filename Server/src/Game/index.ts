import { characterManager } from "./CharacterManager"

export class Game {
    //db=db;
    characterManager = characterManager;

    async start(): Promise<boolean> {
        return true
    }


    
} 

