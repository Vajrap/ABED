import { Character } from "src/Entity/Character/Character";
import { NomadSkill } from ".";
import { NomadSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ActorEffect, TargetEffect } from "src/Entity/Skill/effects";
import type { TurnResult } from "../../../types";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const quickStep = new NomadSkill({
  id: NomadSkillId.QuickStep,
  name: {
    en: "Quick Step",
    th: "ก้าวไว",
  },
  description: {
    text: {
      en: "Quickly change position with enhanced mobility. Change position (front ↔ back) if slot available. Gain +10 AB gauge. Additionally, gain Haste buff for 1 turn.",
      th: "เปลี่ยนตำแหน่งอย่างรวดเร็วพร้อมความคล่องแคล่วเพิ่มขึ้น. เปลี่ยนตำแหน่ง (หน้า ↔ หลัง) หากมีที่ว่าง. ได้รับ +10 AB gauge. นอกจากนี้ ยังได้รับ Haste buff เป็นเวลา 1 เทิร์น",
    },
    formula: {
      en: "+10 AB gauge, Haste 1 turn",
      th: "+10 AB gauge, Haste 1 เทิร์น",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "wind", min: 1, max: 1 },
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const isFrontRow = actor.position <= 2;
    const allOccupiedPositions = actorParty.map((member) => member.position);
    let positionChanged = false;
    let newPosition = actor.position;

    if (isFrontRow) {
      // Try to move to back row
      for (const position of [3, 4, 5] as const) {
        if (!allOccupiedPositions.includes(position)) {
          actor.position = position;
          newPosition = position;
          positionChanged = true;
          break;
        }
      }
    } else {
      // Try to move to front row
      for (const position of [0, 1, 2] as const) {
        if (!allOccupiedPositions.includes(position)) {
          actor.position = position;
          newPosition = position;
          positionChanged = true;
          break;
        }
      }
    }

    // Gain +10 AB gauge
    actor.abGauge = Math.min(100, actor.abGauge + 10);

    // Apply Haste buff for 1 turn
    buffsRepository.haste.appender(actor, { turnsAppending: 1 });

    const positionMessage = positionChanged
      ? ` and moves to ${newPosition <= 2 ? "front" : "back"} row`
      : " (could not change position)";

    return {
      content: {
        en: `${actor.name.en} takes a quick step! Gains +10 AB gauge and Haste for 1 turn${positionMessage}!`,
        th: `${actor.name.th} ก้าวอย่างรวดเร็ว! ได้รับ +10 AB gauge และ Haste เป็นเวลา 1 เทิร์น${positionChanged ? ` และย้ายไปแถว${newPosition <= 2 ? "หน้า" : "หลัง"}` : " (ไม่สามารถเปลี่ยนตำแหน่งได้)"}!`,
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
  },
  isFallback: false,
});

