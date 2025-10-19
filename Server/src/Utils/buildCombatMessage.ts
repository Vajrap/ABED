import type { Character } from "src/Entity/Character/Character";
import type { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

export function buildCombatMessage(
  actor: Character,
  target: Character,
  skillName: { en: string; th: string },
  totalDamage: { isHit: boolean; actualDamage: number; damageType: DamageType },
) {
  const hitTextEN = totalDamage.isHit
    ? `dealing ${totalDamage.actualDamage} ${totalDamage.damageType} damage.`
    : `but MISSED!`;
  const hitTextTH = totalDamage.isHit
    ? `สร้างความเสียหาย ${totalDamage.actualDamage} หน่วย (${totalDamage.damageType})`
    : `แต่พลาดการโจมตี!`;

  return {
    en: `${actor.name.en} attacked ${target.name.en} with ${skillName.en}, ${hitTextEN}`,
    th: `${actor.name.th} โจมตี ${target.name.th} ด้วย ${skillName.th} ${hitTextTH}`,
  };
}
