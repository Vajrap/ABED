import { WandId } from "../type";
import type { Weapon } from "../Weapon";
import { wand } from "./definition/wand";

export const wandRepository: Record<WandId, Weapon> = {
  [WandId.Wand]: wand,
};

