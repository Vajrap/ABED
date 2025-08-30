import {
  DiceEnum,
  EquipmentSlot,
  type AttributeKey,
} from "../../../../InterFacesEnumsAndTypes/Enums";
import type { Item } from "../../Item";
import { Equipment } from "../Equipment";
import type { EquipmentModifier } from "../Type";

export class Weapon extends Equipment {
  weaponData: WeaponData;
  constructor(
    data: Partial<Item>,
    modifier: EquipmentModifier,
    weaponData: WeaponData,
  ) {
    super(data, EquipmentSlot.weapon, modifier);
    this.weaponData = weaponData;
  }
}

type WeaponData = {
  handle: 1 | 2;
  requirement: any; // should be used to compare with character stat base if surpassed the threshold => 100% usability, else will get least damage and accuracy but wearable
  physical: DamageData;
  magical: DamageData;
};

type DamageData = {
  dice: DiceEnum;
  damageType: DamageType;
  damageStat: AttributeKey;
  hitStat: AttributeKey;
  critStat: AttributeKey;
};

enum DamageType {
  // Physical
  slash = "slash",
  blunt = "blunt",
  pierce = "pierce",
  // Elemental - Magical
  order = "order",
  chaos = "chaos",
  fire = "fire",
  earth = "earth",
  water = "water",
  air = "air",
  // 2nd tier
  ice = "ice",
  spirit = "spirit",
  lightning = "lightning",
  demonic = "demonic",
  metal = "metal",
  angelic = "angelic",
  // 3rd tier
  nature = "nature",
  life = "life",
  dark = "dark",
  necrotic = "necrotic",
  poison = "poison",
  holy = "holy",
  // all elements
  arcane = "arcane",

  // ???
  resource = "resource",
}
