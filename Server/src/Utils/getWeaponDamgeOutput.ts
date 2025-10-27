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

  const rollStat = (statType: "Damage" | "Hit" | "Crit") =>
    (statType === "Damage"
      ? roll(weaponDamage[`${type}DamageDice`].face).d(
          weaponDamage[`${type}DamageDice`].dice,
        ).total
      : rollTwenty().total) + getAttributeBonus(weaponDamage[`${type}${statType}Stat`]) + proficiencyBonus;

  return {
    damage: Math.max(rollStat("Damage"), 0),
    hit: rollStat("Hit") + proficiencyBonus,
    crit: rollStat("Crit"),
    type: weaponDamage[`${type}DamageType`],
  };
}
