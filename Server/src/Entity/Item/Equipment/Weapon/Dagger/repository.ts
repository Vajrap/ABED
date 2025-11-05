import { DaggerId } from "../type";
import type { Weapon } from "../Weapon";
import { stiletto } from "./definition/stiletto";
import { knife } from "./definition/knife";

export const daggerRepository: Record<DaggerId, Weapon> = {
  [DaggerId.Stiletto]: stiletto,
  [DaggerId.Knife]: knife,
};

