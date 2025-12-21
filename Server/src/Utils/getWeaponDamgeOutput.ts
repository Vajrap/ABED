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
  ignorePDEF?: number;
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
    if (statType === "Damage") {
      // Damage dice should not get bless/curse
      const diceRoll = actor.roll({
        amount: weaponDamage[`${type}DamageDice`].dice,
        face: weaponDamage[`${type}DamageDice`].face,
        applyBlessCurse: false,
      });
      const attrBonus = withAttributeBonus ? getAttributeBonus(weaponDamage[`${type}${statType}Stat`]) : 0;
      const total = diceRoll + attrBonus;
      Report.debug(`      Damage Roll: ${diceRoll} (${weaponDamage[`${type}DamageDice`].dice}d${weaponDamage[`${type}DamageDice`].face}) + ${attrBonus} (${weaponDamage[`${type}${statType}Stat`].join('+')}) = ${total}`);
      return total;
    } else {
      // Hit/Crit rolls should get bless/curse and use stat mods
      const stats = weaponDamage[`${type}${statType}Stat`];
      // Use first stat (weapons typically have single stat for hit/crit)
      const statKey = stats[0];
      const attrBonus = withAttributeBonus ? getAttributeBonus(stats) : 0;
      const profBonus = statType === "Hit" ? proficiencyBonus : 0; // Only add proficiency to hit, not crit
      
      // rollTwenty with stat will automatically add that stat's mod, so we need to subtract it if we're adding attrBonus manually
      // Actually, let's use rollTwenty without stat and add attrBonus manually to handle multiple stats correctly
      // But wait, rollTwenty({stat: ...}) only handles single stat. Let's check if weapons ever have multiple hit/crit stats...
      // Based on examples, they're always single stats. So we can use rollTwenty({stat: ...}) and only add extra stats if needed
      if (stats.length === 1) {
        // Single stat: use rollTwenty with stat (automatically adds that stat's mod)
        const diceRoll = actor.rollTwenty({ stat: statKey });
        // If there are additional stats in the array, add them manually (shouldn't happen but handle it)
        const additionalBonus = stats.length > 1 ? getAttributeBonus(stats.slice(1)) : 0;
        const total = diceRoll + additionalBonus + profBonus;
        return total;
      } else {
        // Multiple stats: use rollTwenty without stat and add all manually
        const diceRoll = actor.rollTwenty({});
        const total = diceRoll + attrBonus + profBonus;
        return total;
      }
    }
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
