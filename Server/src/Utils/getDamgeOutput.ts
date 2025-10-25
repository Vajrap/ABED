import type { Character } from "src/Entity/Character/Character";
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

export function getDamageOutput(
  actor: Character,
  dice: number,
  diceFace: number,
  damageStat: AttributeKey[],
  hit: number,
  hitStat: AttributeKey[],
  crit: number,
  critStat: AttributeKey[],
  type?: DamageType
): DamageOutPut {
  const getBonus = (stats: AttributeKey[]) =>
    stats.reduce(
      (sum, s) => sum + statMod(actor.attribute.getStat(s).total),
      0,
    );

  const rollStat = (statType: "Damage" | "Hit" | "Crit") =>
  {
    switch (statType) {
      case "Damage":
        return { damage: roll(diceFace).d(dice).total + getBonus(damageStat) }
      case "Hit":
        return { hit: rollTwenty().total + getBonus(hitStat) + hit }
      case "Crit":
        return { crit: rollTwenty().total + getBonus(critStat) + crit }
    }
  }

  return {
    damage: rollStat("Damage")?.damage ?? 0,
    hit: rollStat("Hit")?.hit ?? 0,
    crit: rollStat("Crit")?.crit ?? 0,
    type: type ?? DamageType.blunt,
  };
}
