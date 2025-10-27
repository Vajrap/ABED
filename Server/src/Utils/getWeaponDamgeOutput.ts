import type { Character } from "src/Entity/Character/Character";
import type { Weapon } from "src/Entity/Item";
import type { AttributeKey } from "src/InterFacesEnumsAndTypes/Enums";
import { statMod } from "./statMod";
import { roll, rollTwenty } from "./Dice";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

type DamageOutPut = {
  damage: number;
  hit: number;
  crit: number;
  type: DamageType;
};

export function getWeaponDamageOutput(
  actor: Character,
  weapon: Weapon,
  type: "physical" | "magical",
): DamageOutPut {
  const weaponDamage = weapon.weaponData.damage;
  const getAttributeBonus = (stats: AttributeKey[]) =>
    stats.reduce(
      (sum, s) => sum + statMod(actor.attribute.getTotal(s)),
      0,
    );

  const proficiencyBonus = statMod(actor.proficiencies.getTotal(weapon.weaponType));
  
  console.log(`      Weapon: ${weapon.name.en} | Proficiency: ${actor.proficiencies.getTotal(weapon.weaponType)} (bonus: ${proficiencyBonus})`);

  const rollStat = (statType: "Damage" | "Hit" | "Crit") => {
    const diceRoll = statType === "Damage"
      ? roll(weaponDamage[`${type}DamageDice`].face).d(weaponDamage[`${type}DamageDice`].dice).total
      : rollTwenty().total;
    const attrBonus = getAttributeBonus(weaponDamage[`${type}${statType}Stat`]);
    const profBonus = statType === "Damage" ? 0 : proficiencyBonus; // Only add proficiency to hit, not damage
    const total = diceRoll + attrBonus + profBonus;
    
    if (statType === "Damage") {
      console.log(`      Damage Roll: ${diceRoll} (${weaponDamage[`${type}DamageDice`].dice}d${weaponDamage[`${type}DamageDice`].face}) + ${attrBonus} (${weaponDamage[`${type}${statType}Stat`].join('+')}) = ${total}`);
    }
    
    return total;
  };

  const damageResult = rollStat("Damage");
  const hitResult = rollStat("Hit");
  const critResult = rollStat("Crit");
  
  const result = {
    damage: Math.max(damageResult, 0),
    hit: hitResult,
    crit: critResult,
    type: weaponDamage[`${type}DamageType`],
  };
  
  return result;
}
