import { MOBs } from "src/Entity/Character/MOBs/enums.ts";
import { Character } from "src/Entity/Character/Character.ts";
import { goblinScout, goblinWarrior } from "./goblins";

export const mobRepository: Record<
  MOBs,
  (difficulty: 1 | 2 | 3 | 4 | 5) => Character
> = {
  goblinScout: goblinScout,
  goblinWarrior: goblinWarrior,
};
