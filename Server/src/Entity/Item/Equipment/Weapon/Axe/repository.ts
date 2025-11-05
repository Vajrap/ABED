import { AxeId } from "../type";
import type { Weapon } from "../Weapon";
import { axe } from "./definition/axe";
import { broadAxe } from "./definition/broadAxe";
import { warAxe } from "./definition/warAxe";

export const axeRepository: Record<AxeId, Weapon> = {
  [AxeId.Axe]: axe,
  [AxeId.BroadAxe]: broadAxe,
  [AxeId.WarAxe]: warAxe,
};

