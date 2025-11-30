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
    text: {
      en: "Summon a divine barrier of pure holy energy that protects you from harm.\nActivate <BuffAegisShield> with {5}'4':'3'{/} stacks.",
      th: "เรียกกำแพงศักดิ์สิทธิ์จากพลังงานศักดิ์สิทธิ์บริสุทธิ์ที่ปกป้องคุณจากอันตราย\nเปิดใช้งาน <BuffAegisShield> {5}'4':'3'{/} สแตค",
    },
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
    buffsRepository[BuffEnum.aegisShield].appender(actor, { turnsAppending: stacks });

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

