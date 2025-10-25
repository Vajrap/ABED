import { NPCEnums } from "../Entity/Character/NPCs/enum";
import { npcRepository, playerRepository } from "../Entity/Character/repository";

export function getCharacter(id: string) {
    if (Object.values(NPCEnums).includes(id as NPCEnums)) {
        return npcRepository[id as NPCEnums];
    }
    return playerRepository[id];
}
