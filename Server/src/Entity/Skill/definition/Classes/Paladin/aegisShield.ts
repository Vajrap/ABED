import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { PaladinSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { PaladinSkill } from "./index";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const aegisShield = new PaladinSkill({
  id: PaladinSkillId.AegisShield,
  name: {
    en: "Aegis Shield",
    th: "โล่ป้องกันศักดิ์สิทธิ์",
  },
  description: {
    en: "Activate Aegis Shield for 3 stacks (4 at level 5). Each stack can mitigate 5 + (willpower mod) points of incoming damage. When depleted, grants Aegis Pulse buff for 1 turn. Must not have Aegis Shield buff.",
    th: "เปิดใช้งานโล่ป้องกันศักดิ์สิทธิ์ 3 หน่วย (4 ที่เลเวล 5) แต่ละหน่วยสามารถลดความเสียหายที่ได้รับ 5 + (willpower mod) หน่วย เมื่อหมดลงจะได้รับบัฟ Aegis Pulse 1 เทิร์น ต้องไม่มีบัฟ Aegis Shield",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  notExistBuff: [BuffEnum.aegisShield],
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
      {
        element: "order",
        value: 3,
      },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "neutral",
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
    // Check if actor already has Aegis Shield
    const existingShield = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.aegisShield);
    if (existingShield && existingShield.value > 0) {
      return {
        content: {
          en: `${actor.name.en} already has Aegis Shield active`,
          th: `${actor.name.th} มีโล่ป้องกันศักดิ์สิทธิ์อยู่แล้ว`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.Focus],
        },
        targets: [],
      };
    }

    // Activate Aegis Shield for 3 stack (4 at lvl5)
    const stacks = skillLevel >= 5 ? 4 : 3;
    buffsRepository[BuffEnum.aegisShield].appender(actor, stacks, false, 0);

    return {
      content: {
        en: `${actor.name.en} activated Aegis Shield with ${stacks} stack(s)!`,
        th: `${actor.name.th} เปิดใช้งานโล่ป้องกันศักดิ์สิทธิ์ ${stacks} หน่วย!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Focus],
      },
      targets: [
        {
          actorId: actor.id,
          effect: [TargetEffect.OrderOne],
        },
      ],
    };
  },
});

