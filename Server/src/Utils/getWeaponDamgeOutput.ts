import type { Character } from "src/Entity/Character/Character";
import type { Weapon } from "src/Entity/Item";
import type { AttributeKey } from "src/InterFacesEnumsAndTypes/Enums";
import { statMod } from "./statMod";
import { roll, rollTwenty } from "./Dice";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import Report from "./Reporter";

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
  withAttributeBonus: boolean = true,
): DamageOutPut {
  const weaponDamage = weapon.weaponData.damage;
  const getAttributeBonus = (stats: AttributeKey[]) =>
    stats.reduce(
      (sum, s) => sum + statMod(actor.attribute.getTotal(s)),
      0,
    );

  const proficiencyBonus = statMod(actor.proficiencies.getTotal(weapon.weaponType));
  
  const rollStat = (statType: "Damage" | "Hit" | "Crit") => {
    const diceRoll = statType === "Damage"
      ? roll(weaponDamage[`${type}DamageDice`].dice).d(weaponDamage[`${type}DamageDice`].face).total
      : rollTwenty().total;
    const attrBonus = withAttributeBonus ? getAttributeBonus(weaponDamage[`${type}${statType}Stat`]) : 0;
    const profBonus = statType === "Damage" ? 0 : proficiencyBonus; // Only add proficiency to hit, not damage
    const total = diceRoll + attrBonus + profBonus;
    
    if (statType === "Damage") {
      Report.debug(`      Damage Roll: ${diceRoll} (${weaponDamage[`${type}DamageDice`].dice}d${weaponDamage[`${type}DamageDice`].face}) + ${attrBonus} (${weaponDamage[`${type}${statType}Stat`].join('+')}) = ${total}`);
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
