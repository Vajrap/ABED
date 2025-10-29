import { Weapon, WeaponPosition, type WeaponData } from "../Weapon";
import type { Item } from "../../../Item";
import type { EquipmentModifier } from "../../type";
import {SpearId} from "../type";

/**
 * Spear class - generic spear weapons
 * Locked to "spear" proficiency and Versatile position
 */
export class Spear extends Weapon<"spear", WeaponPosition.Versatile> {
    declare id: SpearId;

    constructor(
        data: Item,
        modifier: EquipmentModifier,
        weaponData: Omit<WeaponData<"spear", WeaponPosition.Versatile>, "weaponType" | "preferredPosition">
    ) {
        super(data, modifier, {
            ...weaponData,
            weaponType: "spear",
            preferredPosition: WeaponPosition.Versatile,
        });
    }
}
