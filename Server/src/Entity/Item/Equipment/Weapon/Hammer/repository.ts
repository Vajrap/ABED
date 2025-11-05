import { HammerId } from "../type";
import type { Weapon } from "../Weapon";
import { morningStar } from "./definition/morningStar";
import { hammer } from "./definition/hammer";
import { warHammer } from "./definition/warHammer";
import { scepter } from "./definition/scepter";

export const hammerRepository: Record<HammerId, Weapon> = {
  [HammerId.MorningStar]: morningStar,
  [HammerId.Hammer]: hammer,
  [HammerId.WarHammer]: warHammer,
  [HammerId.Scepter]: scepter,
};

