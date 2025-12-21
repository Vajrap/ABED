import type { Character } from "src/Entity/Character/Character";
import { GuardianSkillId } from "../../../enums";
import { GuardianSkill } from "./index";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const guardian = new GuardianSkill({
  id: GuardianSkillId.Guardian,
  name: {
    en: "Guardian",
    th: "ผู้คุ้มกัน",
  },
  description: {
    text: {
      en: "Stand guard over your allies, protecting them from harm.\nGain <BuffGuardian> buff.\nIf any ally in your party became a target change the target to you.\nWhen you change target to yours, gain +1 earth resource.\n{5}Gain DefenseUp buff for 1 turn{/}",
      th: "ยืนคุ้มกันพันธมิตร ป้องกันพวกเขาจากอันตราย\nได้รับ <BuffGuardian> buff\nหากพันธมิตรคนใดในทีมของคุณกลายเป็นเป้าหมายของ getTarget ด้วย one() method เปลี่ยนเป้าหมายเป็นคุณ\nเมื่อเปลี่ยนเป้าหมายเป็นคุณ ได้รับ +1 earth resource\n{5}ได้รับ DefenseUp buff ชั่วคราว 1 เทิร์น{/}",
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
        element: "earth",
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
    _location: LocationsEnum,
  ): TurnResult => {
    // Apply Guardian buff to actor - protects ALL allies in the party
    buffsRepository.guardian.appender(actor, { turnsAppending: 1 });
    if (skillLevel >= 5) {
      buffsRepository.defenseUp.appender(actor, { turnsAppending: 1 });
    }

    return {
      content: {
        en: `${actor.name.en} stands guard over all allies!`,
        th: `${actor.name.th} ยืนคุ้มกันพันธมิตรทั้งหมด!`,
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
});

