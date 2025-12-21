import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { PaladinSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { PaladinSkill } from "./index";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { getTarget } from "src/Entity/Battle/getTarget";

export const inspiringPresence = new PaladinSkill({
  id: PaladinSkillId.InspiringPresence,
  name: {
    en: "Inspiring Presence",
    th: "การปรากฏตัวที่สร้างแรงบันดาลใจ",
  },
  description: {
    text: {
      en: "Project an inspiring presence that bolsters your allies.\nGive Inspired buff to all allies for {5}'3':'2'{/} turns (Except you).\nInspired: Gain +1 to all saving throws + At the start of each turn, restore 1d3 HP.",
      th: "แสดงการปรากฏตัวที่สร้างแรงบันดาลใจที่เสริมกำลังพันธมิตร\nให้ Inspired buff กับพันธมิตรทั้งหมดเป็นเวลา {5}'3':'2'{/} เทิร์น (ยกเว้นคุณ)\nInspired: ได้ +1 ต่อการทอยเซฟทั้งหมด + เมื่อเริ่มเทิร์นใหม่ ฟื้นฟู 1d3 HP",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 5,
    elements: [
      {
        element: "neutral",
        value: 2,
      },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "order",
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
  ): TurnResult => {
    // Duration: 2 turns (3 at level 5)
    const duration = skillLevel >= 5 ? 3 : 2;

    // Get all living allies except self
    const allies = getTarget(actor, actorParty, targetParty, "ally").except([actor]).all();

    if (allies.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to inspire but has no allies`,
          th: `${actor.name.th} พยายามสร้างแรงบันดาลใจแต่ไม่มีพันธมิตร`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Apply Inspired buff to all allies
    for (const ally of allies) {
      buffsRepository.inspired.appender(ally, { turnsAppending: duration });
    }

    const allyNames = allies.map((ally) => ally.name.en).join(", ");
    const allyNamesTh = allies.map((ally) => ally.name.th).join(", ");

    return {
      content: {
        en: `${actor.name.en} inspires ${allyNames}! They are now Inspired for ${duration} turn(s)!`,
        th: `${actor.name.th} สร้างแรงบันดาลใจให้ ${allyNamesTh}! พวกเขาได้รับ Inspired เป็นเวลา ${duration} เทิร์น!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: allies.map((ally) => ({
        actorId: ally.id,
        effect: [TargetEffect.OrderOne],
      })),
    };
  },
});

