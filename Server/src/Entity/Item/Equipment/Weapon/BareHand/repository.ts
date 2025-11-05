import { BareHandId } from "../type";
import type { Weapon } from "../Weapon";
import { bareHand } from "./definition/bareHand";

export const bareHandRepository: Record<BareHandId, Weapon> = {
  [BareHandId.BareHand]: bareHand,
};

