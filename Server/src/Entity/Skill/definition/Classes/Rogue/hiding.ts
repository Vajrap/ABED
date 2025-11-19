import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { RogueSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { RogueSkill } from "./index";
import { statMod } from "src/Utils/statMod";
import { rollTwenty } from "src/Utils/Dice";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const hiding = new RogueSkill({
  id: RogueSkillId.Hiding,
  name: {
    en: "Hiding",
    th: "ซ่อนตัว",
  },
  description: {
    en: "Try to get hiding. Roll D20 + dex mod against DC10 (DC8 at level 5) + (highest enemy int mod) + (row === 'front' ? 5 : 0, or 3 at level 5). If passed, get hiding buff for 2 turns.",
    th: "พยายามซ่อนตัว ทอย D20 + dex mod กับ DC10 (DC8 ที่เลเวล 5) + (int mod สูงสุดของศัตรู) + (แถว === 'หน้า' ? 5 : 0 หรือ 3 ที่เลเวล 5) หากสำเร็จ จะได้รับบัฟซ่อนตัว 2 เทิร์น",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [
        {element: 'wind', value: 2},
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
        {element: 'chaos', min: 1, max: 1},
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Calculate DC: base DC + highest enemy int mod + row penalty
    const baseDC = skillLevel >= 5 ? 8 : 10;
    const rowPenalty = skillLevel >= 5 ? 3 : 5;
    
    // Find highest enemy intelligence modifier
    const enemyIntMods = targetParty
      .filter(t => !t.vitals.isDead)
      .map(t => statMod(t.attribute.getTotal("intelligence")));
    const highestEnemyIntMod = enemyIntMods.length > 0 ? Math.max(...enemyIntMods) : 0;
    
    // Check if actor is in front row
    const isFrontRow = actor.position <= 2;
    const rowModifier = isFrontRow ? rowPenalty : 0;
    
    const dc = baseDC + highestEnemyIntMod + rowModifier;
    
    // Roll D20 + dex mod
    const dexMod = statMod(actor.attribute.getTotal("dexterity"));
    const rollResult = rollTwenty().total;
    const totalRoll = rollResult + dexMod;
    
    if (totalRoll >= dc) {
      // Success: Get hiding buff for 2 turns
      buffsAndDebuffsRepository.hiding.appender(actor, 2, false, 0);
      
      return {
        content: {
          en: `${actor.name.en} successfully hides! (Roll: ${rollResult} + ${dexMod} = ${totalRoll} vs DC ${dc})`,
          th: `${actor.name.th} ซ่อนตัวสำเร็จ! (ทอย: ${rollResult} + ${dexMod} = ${totalRoll} vs DC ${dc})`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [
          {
            actorId: actor.id,
            effect: [TargetEffect.TestSkill],
          },
        ],
      };
    } else {
      // Failure
      return {
        content: {
          en: `${actor.name.en} fails to hide! (Roll: ${rollResult} + ${dexMod} = ${totalRoll} vs DC ${dc})`,
          th: `${actor.name.th} ซ่อนตัวล้มเหลว! (ทอย: ${rollResult} + ${dexMod} = ${totalRoll} vs DC ${dc})`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }
  },
});

