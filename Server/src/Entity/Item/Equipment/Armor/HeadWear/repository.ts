import { HeadWearId } from "../type";
import { chainCoif } from "./definition/chainCoif";
import { leatherCap } from "./definition/leatherCap";
import { scholarCap } from "./definition/scholarCap";
import { scoutHood } from "./definition/scoutHood";
import { simpleHood } from "./definition/simpleHood";
import { steelHelm } from "./definition/steelHelm";
import { HeadWear } from "./HeadWear";

export const headWearRepository: Record<HeadWearId, HeadWear> = {
  [HeadWearId.SimpleHood]: simpleHood,
  [HeadWearId.ScholarCap]: scholarCap,
  [HeadWearId.LeatherCap]: leatherCap,
  [HeadWearId.ScoutHood]: scoutHood,
  [HeadWearId.ChainCoif]: chainCoif,
  [HeadWearId.SteelHelm]: steelHelm,
};
