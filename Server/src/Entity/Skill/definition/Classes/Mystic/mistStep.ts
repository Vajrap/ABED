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
    text: {
      en: "Shift like mist to a safer position, becoming one with the air itself.\nIf in front row: move to backline.\nIf in back row: gain <BuffRetreat> for {5}'2':'1'{/} turns.\nRemoves <DebuffSlow> if present.",
      th: "เคลื่อนไหวเหมือนหมอกไปยังตำแหน่งที่ปลอดภัยกว่า กลายเป็นหนึ่งเดียวกับอากาศ\nหากอยู่ในแถวหน้า: ย้ายไปแถวหลัง\nหากอยู่ในแถวหลัง: ได้รับ <BuffRetreat> เป็นเวลา {5}'2':'1'{/} เทิร์น\nลบ <DebuffSlow> หากมีอยู่",
    },
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
        slowEntry.value,
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
      buffsAndDebuffsRepository.retreat.appender(actor, { turnsAppending: skillLevel >= 5 ? 2 : 1 });
    }

    const messages: string[] = [];
    if (hasSlow) messages.push("removed Slow");
    if (moved) messages.push("moved to backline");
    if (gainedEvasion) messages.push("gained evasion");
    if (!isFrontRow) messages.push(`gained +3 dodge for ${skillLevel >= 5 ? 2 : 1} turn(s)`);

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
