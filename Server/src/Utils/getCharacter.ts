import { NPCEnums } from "../Entity/Character/NPCs/enum";
import { npcRepository, playerRepository, activeCharacterRegistry } from "../Entity/Character/repository";

export function getCharacter(id: string) {
    // First, check active characters (includes MOBs created for battles)
    if (activeCharacterRegistry[id]) {
        return activeCharacterRegistry[id];
    }
    
    // Then check NPCs
    if (Object.values(NPCEnums).includes(id as NPCEnums)) {
        return npcRepository[id as NPCEnums];
    }
    
    // Finally, check player characters
    return playerRepository[id];
}
