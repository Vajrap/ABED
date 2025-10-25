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
      mace: 10,
      spear: 10,
      shield: 11,
      bareHand: 10,
      greatSword: 10,
      // Some ranged
      bow: 9,
      crossbow: 9,
      // Others at 8
      dagger: 8,
      rapier: 8,
      machete: 8,
      blade: 8,
      scimitar: 8,
      zanmadao: 8,
      warAxe: 8,
      halberd: 8,
      javelin: 8,
      flail: 8,
      warHammer: 8,
      throwingKnife: 8,
      gun: 8,
      magicWand: 8,
      staff: 8,
      tome: 8,
      orb: 8,
      relic: 8,
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
      mace: 10,
      staff: 11,
      shield: 10,
      // Some magic items
      relic: 10,
      orb: 9,
      // Others at 8
      bareHand: 8,
      dagger: 8,
      sword: 8,
      rapier: 8,
      greatSword: 8,
      machete: 8,
      blade: 8,
      scimitar: 8,
      zanmadao: 8,
      axe: 8,
      warAxe: 8,
      halberd: 8,
      spear: 8,
      javelin: 8,
      flail: 8,
      warHammer: 8,
      throwingKnife: 8,
      crossbow: 8,
      bow: 8,
      gun: 8,
      magicWand: 8,
      tome: 8,
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
      rapier: 10,
      sword: 10,
      // Ranged weapons
      bow: 10,
      crossbow: 10,
      throwingKnife: 11,
      // Some others
      bareHand: 9,
      greatSword: 8,
      // Others at 8
      machete: 8,
      blade: 8,
      scimitar: 8,
      zanmadao: 8,
      axe: 8,
      warAxe: 8,
      halberd: 8,
      spear: 8,
      javelin: 8,
      mace: 8,
      flail: 8,
      warHammer: 8,
      gun: 8,
      magicWand: 8,
      staff: 8,
      tome: 8,
      orb: 8,
      relic: 8,
      shield: 8,
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
      magicWand: 10,
      tome: 10,
      orb: 10,
      // Some basic weapons
      dagger: 9,
      // Others at 8
      bareHand: 8,
      sword: 8,
      rapier: 8,
      greatSword: 8,
      machete: 8,
      blade: 8,
      scimitar: 8,
      zanmadao: 8,
      axe: 8,
      warAxe: 8,
      halberd: 8,
      spear: 8,
      javelin: 8,
      mace: 8,
      flail: 8,
      warHammer: 8,
      throwingKnife: 8,
      crossbow: 8,
      bow: 8,
      gun: 8,
      relic: 8,
      shield: 8,
    },
    startingSkills: [],
    startingItems: [],
    // startingSkills: ["Magic Missile", "Fireball", "Teleport"],
    // startingItems: ["Staff", "Robes", "Spellbook", "Mana Potion"],
    role: CharacterRoleEnum.Mage
  },
};

export type ClassKey = keyof typeof CLASSES;
