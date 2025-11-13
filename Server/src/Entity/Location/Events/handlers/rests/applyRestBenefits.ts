import { rollTwenty } from "../../../../../Utils/Dice";
import type { Character } from "../../../../Character/Character";

export function applyRestBenefits(
  character: Character,
  restFactor: number,
): void {
    character.vitals.incHp(
      character.vitals.hp.max! * (rollTwenty().total / 15) * restFactor,
    );
    character.vitals.incMp(
      character.vitals.mp.max! * (rollTwenty().total / 15) * restFactor,
    );
    character.vitals.incSp(
      character.vitals.sp.max! * (rollTwenty().total / 15) * restFactor,
    );
    const addedMood = Math.floor(
      (rollTwenty().total +
        character.attribute.getStat("charisma").total / 2) *
        restFactor,
    );
    const addedEnergy = Math.floor(
      (rollTwenty().total +
        character.attribute.getStat("vitality").total / 2) *
        restFactor,
    );
    character.needs.incMood(addedMood);
    character.needs.incEnergy(addedEnergy);
}
