import type {
  ArtisanKey,
  AttributeKey,
  BattleStatKey,
  ProficiencyKey,
} from "../../../InterFacesEnumsAndTypes/Enums";
import type { Character } from "../../Character/Character";
import type { Equipment } from "./Equipment";

export function modifyBonusStats(
  character: Character,
  equipment: Equipment,
  type: "EQUIP" | "REMOVE",
) {
  const sigh = type === "EQUIP" ? 1 : -1;
  applyBonusChanges<AttributeKey>(equipment.modifier.attributes, (k, d) =>
    character.attribute.applyBattleChange(k, d * sigh),
  );
  applyBonusChanges<ProficiencyKey>(equipment.modifier.proficiencies, (k, d) =>
    character.proficiencies.applyBonusChange(k, d * sigh),
  );
  applyBonusChanges<ArtisanKey>(equipment.modifier.artisans, (k, d) =>
    character.artisans.applyBonusChange(k, d * sigh),
  );
  applyBonusChanges<BattleStatKey>(equipment.modifier.battleStatus, (k, d) =>
    character.battleStats.applyBonusChange(k, d * sigh),
  );
}

function applyBonusChanges<K extends string>(
  stats: Partial<Record<K, number>> | undefined,
  apply: (key: K, delta: number) => void,
) {
  if (!stats) return;
  for (const [k, v] of Object.entries(stats) as [K, number][]) {
    if (v == null || v === 0) continue; // keep negatives, skip 0/undefined
    apply(k, v);
  }
}

export function modifyVitals(
  character: Character,
  equipment: Equipment,
  type: "EQUIP" | "REMOVE",
) {
  const sigh = type === "EQUIP" ? 1 : -1;
  for (const [vital, delta] of Object.entries(
    equipment.modifier.vitals ?? {},
  )) {
    const d = Number(delta) || 0;
    if (!d) continue;
    switch (vital as "hp" | "mp" | "sp") {
      case "hp":
        character.vitals.hp.addBonus(d * sigh);
        break;
      case "mp":
        character.vitals.mp.addBonus(d * sigh);
        break;
      case "sp":
        character.vitals.sp.addBonus(d * sigh);
        break;
    }
  }
}
