import { BladeId } from "../type";
import type { Weapon } from "../Weapon";
import { katana } from "./definition/katana";
import { scimitar } from "./definition/scimitar";
import { cutlass } from "./definition/cutlass";
import { falchion } from "./definition/falchion";

export const bladeRepository: Record<BladeId, Weapon> = {
  [BladeId.Katana]: katana,
  [BladeId.Scimitar]: scimitar,
  [BladeId.Cutlass]: cutlass,
  [BladeId.Falchion]: falchion,
};

