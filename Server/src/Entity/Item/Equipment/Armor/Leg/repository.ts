import { LegId } from "../type";
import { chainLeggings } from "./definition/chainLeggins";
import { leatherPants } from "./definition/leatherPants";
import { linenPants } from "./definition/linenPants";
import { plateGreaves } from "./definition/plateGreaves";
import { Leg } from "./Leg";

export const legRepository: Record<LegId, Leg> = {
  [LegId.LinenPants]: linenPants,
  [LegId.LeatherPants]: leatherPants,
  [LegId.ChainLeggings]: chainLeggings,
  [LegId.PlateGreaves]: plateGreaves,
};
