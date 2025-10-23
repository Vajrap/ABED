import { CharacterAttributes } from "../Subclass/Stats/CharacterAttributes";

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

export function scaleByDifficulty(
  base: number,
  difficulty: number,
  variance: number = 0.15,
) {
  const scaled = base + (difficulty - 1) * (base * 0.1); // +10% per difficulty
  const randomFactor = 1 + (Math.random() * 2 - 1) * variance; // ±variance%
  return Math.round(scaled * randomFactor);
}
