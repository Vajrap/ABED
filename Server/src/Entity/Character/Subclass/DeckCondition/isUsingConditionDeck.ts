import type { Character } from "../../Character";
import type { Party } from "src/Entity/Party/Party";

export function isUsingConditionDeck(character: Character, party: Party): boolean {
  if (character.conditionalSkillsCondition.selectedCondition === "NONE") return false;

  const condition = character.conditionalSkillsCondition;

  // Check SELF condition
  if (condition.selectedCondition === "SELF" && condition.self) {
    const selfCondition = condition.self;
    
    // Conditions use absolute values (e.g., hp.max = vitals.hp.max * 0.3 means "when HP is <= 30% max HP")
    const hpCheck = character.vitals.hp.current >= selfCondition.hp.min && character.vitals.hp.current <= selfCondition.hp.max;
    const mpCheck = character.vitals.mp.current >= selfCondition.mp.min && character.vitals.mp.current <= selfCondition.mp.max;
    const spCheck = character.vitals.sp.current >= selfCondition.sp.min && character.vitals.sp.current <= selfCondition.sp.max;

    return hpCheck && mpCheck && spCheck;
  }

  // TODO: Implement TEAMMATE, ENEMY, PARTY_SIZE conditions
  // For now, if not SELF or NONE, return false
  return false;
}
