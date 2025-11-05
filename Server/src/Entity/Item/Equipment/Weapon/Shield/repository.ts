import { ShieldId } from "../type";
import type { Weapon } from "../Weapon";
import { buckler } from "./definition/buckler";
import { kiteShield } from "./definition/kiteShield";
import { towerShield } from "./definition/towerShield";

export const shieldRepository: Record<ShieldId, Weapon> = {
  [ShieldId.Buckler]: buckler,
  [ShieldId.KiteShield]: kiteShield,
  [ShieldId.TowerShield]: towerShield,
};

