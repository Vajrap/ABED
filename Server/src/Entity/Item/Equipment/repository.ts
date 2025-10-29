import type { Equipment } from "./Equipment";
import type { EquipmentId } from "./types";
import { bareHand } from "./Weapon/BareHand/definition/bareHand";
import { poorLeatherArmor } from "./Armor/Body/definition/poorLeatherArmor";
import { tatteredClothes } from "./Armor/Body/definition/tatteredClothes";
import { tatteredCap } from "./Armor/HeadWear/definition/tatteredCap";
import {BladeId, BowId, SpearId, Weapon} from "./Weapon";
import { BareHandId, SwordId, DaggerId, MaceId, AxeId, ShieldId } from "./Weapon/type";
import { BodyId, HeadWearId } from "./Armor/type";
import { WeaponId } from "./Weapon/type";
import {ironShortSword} from "src/Entity/Item/Equipment/Weapon/Sword/definition/ironShortSword.ts";
import {ironLongSword} from "src/Entity/Item/Equipment/Weapon/Sword/definition/ironLongSword.ts";
import {ironGreatSword} from "src/Entity/Item/Equipment/Weapon/Sword/definition/ironGreatSword.ts";
import {ironRapier} from "src/Entity/Item/Equipment/Weapon/Sword/definition/ironRapier.ts";
import {ironKatana} from "src/Entity/Item/Equipment/Weapon/Blade/definition/ironKatana.ts";
import {ironScimitar} from "src/Entity/Item/Equipment/Weapon/Blade/definition/ironScimitar.ts";
import {ironCutlass} from "src/Entity/Item/Equipment/Weapon/Blade/definition/ironCutlass.ts";
import {ironFalchion} from "src/Entity/Item/Equipment/Weapon/Blade/definition/ironFalchion.ts";
import {ironStiletto} from "src/Entity/Item/Equipment/Weapon/Dagger/definition/ironStiletto.ts";
import {ironKnife} from "src/Entity/Item/Equipment/Weapon/Dagger/definition/ironKnife.ts";
import {ironDory} from "src/Entity/Item/Equipment/Weapon/Spear/definition/ironDory.ts";
import {ironJavelin} from "src/Entity/Item/Equipment/Weapon/Spear/definition/ironJavelin.ts";
import {ironHalberd} from "src/Entity/Item/Equipment/Weapon/Spear/definition/ironHalberd.ts";
import {oakLongBow} from "src/Entity/Item/Equipment/Weapon/Bow/definition/oakLongBow.ts";
import {oakShortBow} from "src/Entity/Item/Equipment/Weapon/Bow/definition/oakShortBow.ts";
import {oakCrossBow} from "src/Entity/Item/Equipment/Weapon/Bow/definition/oakCrossBow.ts";


/**
 * Equipment Repository
 * Central Map for fast runtime lookup: EquipmentId -> Equipment instance
 * All equipment items must be registered here for the game to use them
 */
export const equipmentRepository: Record<EquipmentId, Equipment> = {
    // Weapons

    // Hands
    [BareHandId.BareHand]: bareHand,

    // Swords
    [SwordId.IronShortSword]: ironShortSword,
    [SwordId.IronLongSword]: ironLongSword,
    [SwordId.IronGreatSword]: ironGreatSword,
    [SwordId.IronRapier]: ironRapier,

    // Blade
    [BladeId.IronKatana]: ironKatana,
    [BladeId.IronScimitar]: ironScimitar,
    [BladeId.IronCutlass]: ironCutlass,
    [BladeId.IronFalchion]: ironFalchion,

    // Dagger
    [DaggerId.IronStiletto]: ironStiletto,
    [DaggerId.IronKnife]: ironKnife,

    // Spear
    [SpearId.IronDory]: ironDory,
    [SpearId.IronJavelin]: ironJavelin,
    [SpearId.IronHalberd]: ironHalberd,

    // Bow
    [BowId.OakLongBow]: oakLongBow,
    [BowId.OakShortBow]: oakShortBow,
    [BowId.OakCrossbow]: oakCrossBow,

  // Armor
  [BodyId.PoorLeatherArmor]: poorLeatherArmor,
  [BodyId.TatteredClothes]: tatteredClothes,
  [HeadWearId.TatteredCap]: tatteredCap,
};

export function getEquipment(id: EquipmentId): Equipment | null {
  const equipment = equipmentRepository[id];
  return equipment ?? null;
}

export function getWeaponFromRepository(id: WeaponId) {
  const weapon = equipmentRepository[id] as Weapon;
  return weapon ?? null;
}
