import type { Character } from "../Character";
import { CharacterEquipmentSlot } from "../../../InterFacesEnumsAndTypes/Enums";
import { equipDirect } from "../../Item/Equipment/equipDirect";
import { SwordId, DaggerId, AxeId, HammerId, BowId, StaffId, WandId, BookWId, ShieldId, type WeaponId } from "../../Item/Equipment/Weapon/type";
import { BodyId } from "../../Item/Equipment/Armor/type";

/**
 * Get weapon ID based on class and difficulty
 * Difficulty 1-2: Basic weapons
 * Difficulty 3: Mid-tier weapons
 * Difficulty 4-5: Advanced weapons
 */
export function getWeaponForClass(
  className: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
): WeaponId {
  const isLowTier = difficulty <= 2;
  const isMidTier = difficulty === 3;
  const isHighTier = difficulty >= 4;

  // Warrior classes
  if (className.includes("Warrior") || className.includes("Paladin") || className.includes("Barbarian")) {
    if (isLowTier) return SwordId.ShortSword;
    if (isMidTier) return SwordId.LongSword;
    return SwordId.GreatSword;
  }

  // Ranger classes
  if (className.includes("Ranger") || className.includes("Rogue")) {
    if (isLowTier) return BowId.ShortBow;
    if (isMidTier) return BowId.LongBow;
    return BowId.Crossbow;
  }

  // Mage classes
  if (className.includes("Mage") || className.includes("Sorcerer") || className.includes("Warlock")) {
    if (isLowTier) return WandId.Wand;
    if (isMidTier) return StaffId.Staff;
    return StaffId.LongestStaff;
  }

  // Cleric classes
  if (className.includes("Cleric") || className.includes("Druid")) {
    if (isLowTier) return StaffId.QuarterStaff;
    if (isMidTier) return StaffId.Staff;
    return BookWId.Grimoire;
  }

  // Default to short sword
  return SwordId.ShortSword;
}

/**
 * Get body armor ID based on class and difficulty
 * Difficulty 1-2: Light/Cloth armor
 * Difficulty 3: Medium armor
 * Difficulty 4-5: Heavy armor
 */
export function getArmorForClass(
  className: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
): BodyId {
  const isLowTier = difficulty <= 2;
  const isMidTier = difficulty === 3;
  const isHighTier = difficulty >= 4;

  // Mage classes - use robes
  if (className.includes("Mage") || className.includes("Sorcerer") || className.includes("Warlock")) {
    if (isLowTier) return BodyId.Robe;
    if (isMidTier) return BodyId.MageRobe;
    return BodyId.MageRobe; // Keep mage robe for high tier
  }

  // Cleric/Druid - light to medium
  if (className.includes("Cleric") || className.includes("Druid")) {
    if (isLowTier) return BodyId.LeatherArmor;
    if (isMidTier) return BodyId.StuddedLeatherArmor;
    return BodyId.StuddedLeatherArmor;
  }

  // Ranger/Rogue - light armor
  if (className.includes("Ranger") || className.includes("Rogue")) {
    if (isLowTier) return BodyId.LeatherArmor;
    if (isMidTier) return BodyId.StuddedLeatherArmor;
    return BodyId.ChainShirt;
  }

  // Warrior/Paladin/Barbarian - light to heavy
  if (className.includes("Warrior") || className.includes("Paladin") || className.includes("Barbarian")) {
    if (isLowTier) return BodyId.LeatherArmor;
    if (isMidTier) return BodyId.ChainMail;
    return BodyId.PlateArmor;
  }

  // Default to leather armor
  return BodyId.LeatherArmor;
}

/**
 * Equip weapon and armor to a character based on their class and difficulty
 */
export function equipMOB(character: Character, className: string, difficulty: 1 | 2 | 3 | 4 | 5): void {
  // Get appropriate equipment
  const weaponId = getWeaponForClass(className, difficulty);
  const armorId = getArmorForClass(className, difficulty);

  // Direct equip for MOBs (no inventory needed)
  equipDirect(character, weaponId, CharacterEquipmentSlot.rightHand);
  equipDirect(character, armorId, CharacterEquipmentSlot.body);
}

