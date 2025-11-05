import { OrbId } from "../type";
import type { Weapon } from "../Weapon";
import { orb } from "./definition/orb";

export const orbRepository: Record<OrbId, Weapon> = {
  [OrbId.Orb]: orb,
};

