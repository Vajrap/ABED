import { EarId } from "../type";
import { copperEarring } from "./definition/copperEarring";
import { goldEarring } from "./definition/goldEarring";
import { ironEarring } from "./definition/ironEarring";
import { silverEarring } from "./definition/silverEarring";
import { Ear } from "./Ear";

export const earRepository: Record<EarId, Ear> = {
  [EarId.CopperEarring]: copperEarring,
  [EarId.IronEarring]: ironEarring,
  [EarId.SilverEarring]: silverEarring,
  [EarId.GoldEarring]: goldEarring,
};
