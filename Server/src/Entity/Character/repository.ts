import { Character } from "./Character";
import { NPCEnums } from "./NPCs/enum";
import { nobody } from "./NPCs/nobody";

export const npcRepository: Record<NPCEnums, Character> = {
    [NPCEnums.noBody]: nobody,
};

export const playerRepository: Record<string, Character> = {
};
