import { Character } from "src/Entity/Character/Character";
import { EngineerSkill } from ".";
import { EngineerSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ActorEffect, TargetEffect } from "src/Entity/Skill/effects";
import type { TurnResult } from "../../../types";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const mechanicalOverdrive = new EngineerSkill({
  id: EngineerSkillId.MechanicalOverdrive,
  name: {
    en: "Mechanical Overdrive",
    th: "โอเวอร์ไดรฟ์เครื่องกล",
  },
  description: {
    text: {
      en: "Enter a mechanical overdrive state, enhancing physical capabilities. Gain Mechanical Overdrive buff for 2 turns (3 turns at level 5). Mechanical Overdrive buff grants +2 STR and +2 AGI. Additionally, gain +5 AB gauge at the start of each turn.",
      th: "เข้าสู่สถานะโอเวอร์ไดรฟ์เครื่องกล เพิ่มความสามารถทางกายภาพ. ได้รับ Mechanical Overdrive buff เป็นเวลา 2 เทิร์น (3 เทิร์นที่ระดับ 5). Mechanical Overdrive buff ให้ +2 STR และ +2 AGI. นอกจากนี้ ยังได้รับ +5 AB gauge เมื่อเริ่มเทิร์น",
    },
    formula: {
      en: "STR +2, AGI +2, +5 AB gauge per turn",
      th: "STR +2, AGI +2, +5 AB gauge ต่อเทิร์น",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 4,
    elements: [
      { element: "fire", value: 1 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "neutral", min: 1, max: 1 },
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const duration = skillLevel >= 5 ? 3 : 2;
    
    buffsRepository.mechanicalOverdrive.appender(actor, { turnsAppending: duration });

    return {
      content: {
        en: `${actor.name.en} enters Mechanical Overdrive for ${duration} turn(s)! (+2 STR, +2 AGI, +5 AB gauge per turn)`,
        th: `${actor.name.th} เข้าสู่โอเวอร์ไดรฟ์เครื่องกลเป็นเวลา ${duration} เทิร์น! (+2 STR, +2 AGI, +5 AB gauge ต่อเทิร์น)`,
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

