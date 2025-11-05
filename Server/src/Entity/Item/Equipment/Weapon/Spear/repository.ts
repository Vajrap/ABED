import { SpearId } from "../type";
import type { Weapon } from "../Weapon";
import { dory } from "./definition/dory";
import { javelin } from "./definition/javelin";
import { halberd } from "./definition/halberd";

export const spearRepository: Record<SpearId, Weapon> = {
  [SpearId.Dory]: dory,
  [SpearId.Javelin]: javelin,
  [SpearId.Halberd]: halberd,
};

