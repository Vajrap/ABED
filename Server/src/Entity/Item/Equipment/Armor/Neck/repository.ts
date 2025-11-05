import { silverEarring } from "../Ear/definition/silverEarring";
import { NeckId } from "../type";
import { copperNecklace } from "./definition/copperNecklace";
import { goldNecklace } from "./definition/goldNecklace";
import { silverNecklace } from "./definition/silverNecklace";
import { Neck } from "./Neck";

export const necklaceRepository: Record<NeckId, Neck> = {
  [NeckId.CopperNecklace]: copperNecklace,
  [NeckId.SilverNecklace]: silverNecklace,
  [NeckId.GoldNecklace]: goldNecklace,
};
