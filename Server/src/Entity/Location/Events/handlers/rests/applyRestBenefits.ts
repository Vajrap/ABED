import { rollTwenty } from "../../../../../Utils/Dice";
import type { Character } from "../../../../Character/Character";

export function applyRestBenefits(
  characters: Character[],
  restFactor: number,
): void {
  for (const character of characters) {
    character.vitals.incHp(
      character.vitals.hp.max! * (rollTwenty().total / 15) * restFactor,
    );
    character.vitals.incMp(
      character.vitals.mp.max! * (rollTwenty().total / 15) * restFactor,
    );
    character.vitals.incSp(
      character.vitals.sp.max! * (rollTwenty().total / 15) * restFactor,
    );
    character.needs.add({
      mood: Math.floor(
        (rollTwenty().total +
          character.attribute.getStat("charisma").total / 2) *
          restFactor,
      ),
      energy: Math.floor(
        (rollTwenty().total +
          character.attribute.getStat("vitality").total / 2) *
          restFactor,
      ),
    });
  }
}
