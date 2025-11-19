import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SpellBladeSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { SpellBladeSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const spellParry = new SpellBladeSkill({
  id: SpellBladeSkillId.SpellParry,
  name: {
    en: "Spell Parry",
    th: "ปัดเวท",
  },
  description: {
    en: "Get Spell Parry buff for 1 turn. Spell Parry: reduce next spell's damage by (5 + Int mod). If attacked by a spell, gain 1 Edge Charge (2 if 0 damage taken). At level 5, also produce 1 Edge Charge when used.",
    th: "ได้รับบัฟปัดเวท 1 เทิร์น ปัดเวท: ลดความเสียหายเวทครั้งถัดไป (5 + Int mod) หากถูกโจมตีด้วยเวท จะได้รับ Edge Charge 1 หน่วย (2 หน่วยหากไม่ได้รับความเสียหาย) ที่เลเวล 5 จะสร้าง Edge Charge 1 หน่วยเมื่อใช้ด้วย",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "wind", value: 1 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "chaos", min: 1, max: 1 },
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Apply Spell Parry buff for 1 turn
    buffsAndDebuffsRepository.spellParry.appender(actor, 1, false, 0);

    // At level 5, also produce 1 Edge Charge when used
    if (skillLevel >= 5) {
      buffsAndDebuffsRepository.edgeCharge.appender(actor, 1, false, 0);
    }

    return {
      content: {
        en: `${actor.name.en} prepares Spell Parry!${skillLevel >= 5 ? " Gains 1 Edge Charge." : ""}`,
        th: `${actor.name.th} เตรียมปัดเวท!${skillLevel >= 5 ? " ได้รับ Edge Charge 1 หน่วย" : ""}`,
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

