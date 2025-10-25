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
  const getBonus = (stats: AttributeKey[]) =>
    stats.reduce(
      (sum, s) => sum + statMod(actor.attribute.getStat(s).total),
      0,
    );

  const rollStat = (statType: "Damage" | "Hit" | "Crit") =>
    (statType === "Damage"
      ? roll(weaponDamage[`${type}DamageDice`].face).d(
          weaponDamage[`${type}DamageDice`].dice,
        ).total
      : rollTwenty().total) + getBonus(weaponDamage[`${type}${statType}Stat`]);

  return {
    damage: Math.max(rollStat("Damage"), 0),
    hit: rollStat("Hit"),
    crit: rollStat("Crit"),
    type: weaponDamage[`${type}DamageType`],
  };
}
