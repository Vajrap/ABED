import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { RogueSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { RogueSkill } from "./index";
import { statMod } from "src/Utils/statMod";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const hiding = new RogueSkill({
  id: RogueSkillId.Hiding,
  name: {
    en: "Hiding",
    th: "ซ่อนตัว",
  },
  description: {
    text: {
      en: "Melt into the shadows, becoming one with the darkness.\nRoll D20 + <DEXmod> against DC{5}'8':'10'{/} + highest enemy INTmod + {5}'3':'5'{/} if in front row.\nIf passed, gain <BuffHiding> for 1 turn.",
      th: "ละลายเข้ากับเงามืด กลายเป็นหนึ่งเดียวกับความมืด\nทอย D20 + <DEXmod> กับ DC{5}'8':'10'{/} + INTmod สูงสุดของศัตรู + {5}'3':'5'{/} หากอยู่ในแถวหน้า\nหากสำเร็จ ได้รับ <BuffHiding> 1 เทิร์น",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
        {element: 'neutral', value: 2},
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
    
    // Roll D20 + dex mod - this is a skill check, so it should get bless/curse
    const totalRoll = actor.rollTwenty({stat: 'dexterity'});
    
    if (totalRoll >= dc) {
      // Success: Get hiding buff for 1 turn
      buffsAndDebuffsRepository.hiding.appender(actor, { turnsAppending: 1 });
      
      return {
        content: {
          en: `${actor.name.en} successfully hides! (Roll: ${totalRoll} vs DC ${dc})`,
          th: `${actor.name.th} ซ่อนตัวสำเร็จ! (ทอย: ${totalRoll} vs DC ${dc})`,
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
          en: `${actor.name.en} fails to hide! (Roll: ${totalRoll} vs DC ${dc})`,
          th: `${actor.name.th} ซ่อนตัวล้มเหลว! (ทอย: ${totalRoll} vs DC ${dc})`,
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

