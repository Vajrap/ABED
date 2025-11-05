import { SwordId } from "../type";
import type { Weapon } from "../Weapon";
import { shortSword } from "./definition/shortSword";
import { longSword } from "./definition/longSword";
import { greatSword } from "./definition/greatSword";
import { rapier } from "./definition/rapier";

export const swordRepository: Record<SwordId, Weapon> = {
  [SwordId.ShortSword]: shortSword,
  [SwordId.LongSword]: longSword,
  [SwordId.GreatSword]: greatSword,
  [SwordId.Rapier]: rapier,
};
