import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { RogueSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { RogueSkill } from "./index";

export const retreatDash = new RogueSkill({
  id: RogueSkillId.RetreatDash,
  name: {
    en: "Retreat Dash",
    th: "วิ่งหนี",
  },
  description: {
    en: "A desperate retreat. Grants +3 dodge for 1 turn and attempts to move to backline.",
    th: "การหนีแบบสิ้นหวัง เพิ่ม dodge 3 หน่วย เป็นเวลา 1 เทิร์น และพยายามย้ายไปแถวหลัง",
  },
  requirement: {},
  equipmentNeeded: [], // No equipment needed for movement skill
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [
      {
        element: "neutral",
        value: 1,
      },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "wind",
        min: 1,
        max: 1,
      },
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ) => {
    // TODO: Implement Evasion +30% for 1 turn
    buffsAndDebuffsRepository.retreat.appender(actor, 1, false, 0);
    // TODO: Implement movement to backline logic
    let moved = false;

    if (actor.position > 2) {
      const allOccupiedPositions = actorParty.map((member) => member.position);
      for (const position of [3, 4, 5] as const) {
        if (!allOccupiedPositions.includes(position)) {
          actor.position = position;
          moved = true;
          break;
        }
      }
    }

    let turnResult: TurnResult = {
      content: buildCombatMessage(
        actor,
        actor, // Self-target for retreat
        {
          en: `${actor.name} dashed to retreat gain +3 dodge. ${moved ? `and moved to back line` : ""}`,
          th: `${actor.name.th} วิ่งหนี ได้รับ +3 dodge. ${moved ? `และย้ายไปแถวหลัง` : ""}`,
        },
        {
          isHit: true,
          isCrit: false,
          actualDamage: 0,
          damageType: DamageType.arcane,
        },
      ),
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Retreat],
      },
      targets: [
        {
          actorId: actor.id,
          effect: [TargetEffect.Evasion],
        },
      ],
    };

    return turnResult;
  },
});
