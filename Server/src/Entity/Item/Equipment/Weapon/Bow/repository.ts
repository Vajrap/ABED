import { BowId } from "../type";
import type { Weapon } from "../Weapon";
import { longBow } from "./definition/longBow";
import { shortBow } from "./definition/shortBow";
import { crossbow } from "./definition/crossbow";

export const bowRepository: Record<BowId, Weapon> = {
  [BowId.LongBow]: longBow,
  [BowId.ShortBow]: shortBow,
  [BowId.Crossbow]: crossbow,
};

