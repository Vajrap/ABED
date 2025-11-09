import { CharacterRoleEnum } from "../../Entity/Character/Subclass/Title/Role/enum";
import type { ItemId } from "../../Entity/Item/type";
import type { SkillId } from "../../Entity/Skill/enums";
import type { ProficiencyKey } from "../../InterFacesEnumsAndTypes/Enums";

export interface ClassDefinition {
  proficiencies: Record<ProficiencyKey, number>; // Starting proficiency bonuses
  startingSkills: SkillId[]; // Placeholder skill names
  startingItems: {id:ItemId, quantity:number}[]; // Placeholder item names
  role: CharacterRoleEnum
}

export const CLASSES: Record<string, ClassDefinition> = {
  fighter: {
    proficiencies: {
      // High proficiency in weapons
      sword: 11,
      axe: 10,
      hammer: 10,
      spear: 10,
      shield: 11,
      bareHand: 10,
      // Some ranged
      bow: 9,
      // Others at 8
      dagger: 8,
      blade: 8,
      wand: 8,
      staff: 8,
      book: 8,
      orb: 8,
    },
    startingSkills: [],
    startingItems: [],
    // startingSkills: ["Basic Attack", "Defensive Stance", "Charge"],
    // startingItems: ["Iron Sword", "Leather Armor", "Wooden Shield", "Health Potion"],
    role: CharacterRoleEnum.Fighter
  },
  cleric: {
    proficiencies: {
      // Moderate weapon proficiency
      hammer: 10,
      staff: 11,
      shield: 10,
      // Some magic items
      orb: 9,
      // Others at 8
      bareHand: 8,
      dagger: 8,
      sword: 8,
      blade: 8,
      wand: 8,
      spear: 8,
      bow: 8,
      axe: 8,
      book: 8,
    },
    startingSkills: [],
    startingItems: [],
    // startingSkills: ["Heal", "Bless", "Turn Undead"],
    // startingItems: ["Sacred Mace", "Robes", "Holy Symbol", "Mana Potion"],
    role: CharacterRoleEnum.Cleric
  },
  rogue: {
    proficiencies: {
      // High proficiency in finesse weapons
      dagger: 11,
      sword: 10,
      // Ranged weapons
      bow: 10,
      // Some others
      bareHand: 9,
      // Others at 8
      blade: 8,
      spear: 8,
      axe: 8,
      staff: 8,
      book: 8,
      orb: 8,
      shield: 8,
      hammer: 8,
      wand: 8
    },
    startingSkills: [],
    startingItems: [],
    // startingSkills: ["Sneak Attack", "Stealth", "Pick Lock"],
    // startingItems: ["Dagger", "Leather Armor", "Throwing Knives", "Lockpicks"],
    role: CharacterRoleEnum.Rogue
  },
  mage: {
    proficiencies: {
      // Magic item proficiency
      staff: 11,
      wand: 10,
      book: 10,
      orb: 10,
      // Some basic weapons
      dagger: 9,
      // Others at 8
      bareHand: 8,
      sword: 8,
      blade: 8,
      spear: 8,
      bow: 8,
      axe: 8,
      shield: 8,
      hammer: 8
    },
    startingSkills: [],
    startingItems: [],
    // startingSkills: ["Magic Missile", "Fireball", "Teleport"],
    // startingItems: ["Staff", "Robes", "Spellbook", "Mana Potion"],
    role: CharacterRoleEnum.Mage
  },
};

export type ClassKey = keyof typeof CLASSES;
