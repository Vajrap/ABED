import { rollTwenty } from "../../../../../Utils/Dice";
import type { Character } from "../../../../Character/Character";
import Report from "../../../../../Utils/Reporter";

export function applyRestBenefits(
  character: Character,
  restFactor: number,
): void {
    const moodBefore = character.needs.mood.current;
    const energyBefore = character.needs.energy.current;
    
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
    
    console.log("Rest benefits applied", {
      characterId: character.id,
      characterName: typeof character.name === 'string' ? character.name : character.name?.en,
      moodBefore,
      moodAfter: character.needs.mood.current,
      energyBefore,
      energyAfter: character.needs.energy.current,
      addedMood,
      addedEnergy,
      restFactor,
      moodChange: character.needs.mood.current - moodBefore,
      energyChange: character.needs.energy.current - energyBefore,
    });
}
