import type { ArmorId } from "./Armor/type";
import { BareHandId, type WeaponId } from "./Weapon/type";

/**
 * Equipment ID type - union of all equipment IDs
 */
export type EquipmentId = WeaponId | ArmorId;
