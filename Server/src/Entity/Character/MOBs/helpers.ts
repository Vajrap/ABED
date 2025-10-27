import { CharacterAttributes } from "../Subclass/Stats/CharacterAttributes";
import { CharacterProficiencies } from "../Subclass/Stats/CharacterProficiencies";

export function makeAttribute(data: {
  charisma: number;
  luck: number;
  intelligence: number;
  leadership: number;
  vitality: number;
  willpower: number;
  planar: number;
  control: number;
  dexterity: number;
  agility: number;
  strength: number;
  endurance: number;
}): CharacterAttributes {
  return new CharacterAttributes()
    .setBase("charisma", data.charisma)
    .setBase("luck", data.luck)
    .setBase("intelligence", data.intelligence)
    .setBase("leadership", data.leadership)
    .setBase("vitality", data.vitality)
    .setBase("willpower", data.willpower)
    .setBase("planar", data.planar)
    .setBase("control", data.control)
    .setBase("dexterity", data.dexterity)
    .setBase("agility", data.agility)
    .setBase("strength", data.strength)
    .setBase("endurance", data.endurance);
}

export function makeProficiencies(data: {
  bareHand: number;
  dagger: number;
  sword: number;
  rapier: number;
  greatSword: number;
  machete: number;
  blade: number;
  scimitar: number;
  zanmadao: number;
  axe: number;
  warAxe: number;
  halberd: number;
  spear: number;
  javelin: number;
  mace: number;
  flail: number;
  warHammer: number;
  throwingKnife: number;
  crossbow: number;
  bow: number;
  gun: number;
  magicWand: number;
  staff: number;
  tome: number;
  orb: number;
  relic: number;
  shield: number;
}): CharacterProficiencies {
  return new CharacterProficiencies()
    .setBase("bareHand", data.bareHand)
    .setBase("dagger", data.dagger)
    .setBase("sword", data.sword)
    .setBase("rapier", data.rapier)
    .setBase("greatSword", data.greatSword)
    .setBase("machete", data.machete)
    .setBase("blade", data.blade)
    .setBase("scimitar", data.scimitar)
    .setBase("zanmadao", data.zanmadao)
    .setBase("axe", data.axe)
    .setBase("warAxe", data.warAxe)
    .setBase("halberd", data.halberd)
    .setBase("spear", data.spear)
    .setBase("javelin", data.javelin)
    .setBase("mace", data.mace)
    .setBase("flail", data.flail)
    .setBase("warHammer", data.warHammer)
    .setBase("throwingKnife", data.throwingKnife)
    .setBase("crossbow", data.crossbow)
    .setBase("bow", data.bow)
    .setBase("gun", data.gun)
    .setBase("magicWand", data.magicWand)
    .setBase("staff", data.staff)
    .setBase("tome", data.tome)
    .setBase("orb", data.orb)
    .setBase("relic", data.relic)
    .setBase("shield", data.shield);
}

export function scaleByDifficulty(
  base: number,
  difficulty: number,
  variance: number = 0.15,
) {
  const scaled = base + (difficulty - 1) * (base * 0.1); // +10% per difficulty
  const randomFactor = 1 + (Math.random() * 2 - 1) * variance; // ±variance%
  return Math.round(scaled * randomFactor);
}
