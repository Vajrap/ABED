import { Ring } from ".";
import { RingId } from "../type";
import { copperRing } from "./definition/copperRing";
import { goldRing } from "./definition/goldRing";
import { ironRing } from "./definition/ironRing";
import { silverRing } from "./definition/silverRing";

export const ringRepository: Record<RingId, Ring> = {
  [RingId.CopperRing]: copperRing,
  [RingId.IronRing]: ironRing,
  [RingId.SilverRing]: silverRing,
  [RingId.GoldRing]: goldRing,
};
