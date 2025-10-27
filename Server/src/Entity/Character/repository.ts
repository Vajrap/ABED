import { Character } from "./Character";
import { NPCEnums } from "./NPCs/enum";
import { nobody } from "./NPCs/nobody";

export const npcRepository: Record<NPCEnums, Character> = {
    [NPCEnums.noBody]: nobody,
};

export const playerRepository: Record<string, Character> = {
};

// Runtime registry for active character instances (including MOBs in battles)
export const activeCharacterRegistry: Record<string, Character> = {};
