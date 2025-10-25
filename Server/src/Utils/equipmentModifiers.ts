import type {
  ArtisanKey,
  AttributeKey,
  BattleStatKey,
  ProficiencyKey,
} from "src/InterFacesEnumsAndTypes/Enums";
import type { Character } from "src/Entity/Character/Character";
import type { Equipment } from "src/Entity/Item/Equipment/Equipment";

export function modifyBonusStats(
  character: Character,
  equipment: Equipment,
  type: "EQUIP" | "REMOVE",
) {
  const sign = type === "EQUIP" ? 1 : -1;
  
  // Apply attribute bonuses
  if (equipment.modifier.attributes) {
    for (const [key, delta] of Object.entries(equipment.modifier.attributes)) {
      character.attribute.applyBattleChange(key as AttributeKey, delta * sign);
    }
  }
  
  // Apply proficiency bonuses
  if (equipment.modifier.proficiencies) {
    for (const [key, delta] of Object.entries(equipment.modifier.proficiencies)) {
      character.proficiencies.applyBonusChange(key as ProficiencyKey, delta * sign);
    }
  }
  
  // Apply battle status bonuses
  if (equipment.modifier.battleStatus) {
    for (const [key, delta] of Object.entries(equipment.modifier.battleStatus)) {
      character.battleStats.applyBonusChange(key as BattleStatKey, delta * sign);
    }
  }
  
  // Apply artisan bonuses
  if (equipment.modifier.artisans) {
    for (const [key, delta] of Object.entries(equipment.modifier.artisans)) {
      character.artisans.applyBonusChange(key as ArtisanKey, delta * sign);
    }
  }
}

export function modifyVitals(
  character: Character,
  equipment: Equipment,
  type: "EQUIP" | "REMOVE",
) {
  const sign = type === "EQUIP" ? 1 : -1;
  
  if (equipment.modifier.vitals) {
    const vitals = equipment.modifier.vitals;
    if (vitals.hp) {
      if (sign > 0) {
        character.vitals.incHp(vitals.hp);
      } else {
        character.vitals.decHp(vitals.hp);
      }
    }
    if (vitals.mp) {
      if (sign > 0) {
        character.vitals.incMp(vitals.mp);
      } else {
        character.vitals.decMp(vitals.mp);
      }
    }
    if (vitals.sp) {
      if (sign > 0) {
        character.vitals.incSp(vitals.sp);
      } else {
        character.vitals.decSp(vitals.sp);
      }
    }
  }
}
