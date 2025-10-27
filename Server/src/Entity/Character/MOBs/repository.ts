import { MOBs } from "src/Entity/Character/MOBs/enums.ts";
import { Character } from "src/Entity/Character/Character.ts";
import { goblinScout, goblinWarrior, goblinMage, goblinCaptain, goblinCleric } from "./goblins";

export const mobRepository: Record<
  MOBs,
  (difficulty: 1 | 2 | 3 | 4 | 5) => Character
> = {
  // Goblins
  goblinScout: goblinScout,
  goblinWarrior: goblinWarrior,
  goblinMage: goblinMage,
  goblinCleric: goblinCleric,
  goblinCaptain: goblinCaptain,
};
