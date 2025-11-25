import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MysticSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { MysticSkill } from "./index";

export const mistStep = new MysticSkill({
  id: MysticSkillId.MistStep,
  name: {
    en: "Mist Step",
    th: "ก้าวหมอก",
  },
  description: {
    en: "Shift like mist to a safer position. Move to the backline if you are in the front row; if already in the back row, gain evasion instead. Remove Slow if present. Gain +3 dodge roll for 1 turn (increases to 2 turns at skill level 5).",
    th: "เคลื่อนไหวเหมือนหมอกไปยังตำแหน่งที่ปลอดภัยกว่า หากอยู่ในแถวหน้าให้ย้ายไปแถวหลัง หากอยู่ในแถวหลังแล้วจะได้รับความสามารถหลบหลีกแทน ลบ Slow หากมีอยู่ เพิ่ม dodge +3 เป็นเวลา 1 เทิร์น (เพิ่มเป็น 2 เทิร์นที่เลเวล 5)",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 3,
    sp: 0,
    elements: [{ element: "neutral", value: 1 }],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [{ element: "wind", min: 1, max: 1 }],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const isFrontRow = actor.position <= 2;
    let moved = false;
    let gainedEvasion = false;

    // Remove Slow debuff if present
    const slowEntry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.slow);
    const hasSlow = !!slowEntry;
    if (hasSlow && slowEntry) {
      // Restore agility before removing (slow reduces agility)
      actor.attribute.mutateBattle(
        "agility",
        slowEntry.value + slowEntry.permValue,
      );
      actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.slow);
    }

    if (isFrontRow) {
      // Try to move to backline
      const allOccupiedPositions = actorParty.map((member) => member.position);
      for (const position of [3, 4, 5] as const) {
        if (!allOccupiedPositions.includes(position)) {
          actor.position = position;
          moved = true;
          break;
        }
      }
    } else {
      // Already in back row, gain evasion (retreat buff gives +3 dodge)
      gainedEvasion = true;
      buffsAndDebuffsRepository.retreat.appender(actor, 1, false, 0);
    }

    // Add dodge buff (using retreat buff which gives +3 dodge)
    const dodgeDuration = skillLevel >= 5 ? 2 : 1;
    buffsAndDebuffsRepository.retreat.appender(actor, dodgeDuration, false, 0);

    const messages: string[] = [];
    if (hasSlow) messages.push("removed Slow");
    if (moved) messages.push("moved to backline");
    if (gainedEvasion) messages.push("gained evasion");
    messages.push(`gained +3 dodge for ${dodgeDuration} turn(s)`);

    return {
      content: {
        en: `${actor.name.en} shifts like mist! ${messages.join(", ")}.`,
        th: `${actor.name.th} เคลื่อนไหวเหมือนหมอก! ${messages.join(", ")}.`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: [
        {
          actorId: actor.id,
          effect: [TargetEffect.Evasion],
        },
      ],
    };
  },
});
