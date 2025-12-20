import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SpellbladeSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { SpellbladeSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const spellParry = new SpellbladeSkill({
  id: SpellbladeSkillId.SpellParry,
  name: {
    en: "Spell Parry",
    th: "ปัดเวท",
  },
  description: {
    text: {
      en: "Weave a defensive barrier of planar energy that deflects incoming spells.\nGain <BuffSpellParry> for {5}2:1{/} turn.\nReduces next spell's damage by 5 + <INTmod>.\nIf attacked by a spell, [b]gain 1 <BuffEdgeCharge>[/b] (2 if 0 damage taken).\n{5}\n[b]Gain 1 <BuffEdgeCharge>[/b] when used.{/}",
      th: "ถักทอเกราะป้องกันจากพลังงานระนาบที่เบี่ยงเบนเวทมนตร์ที่เข้ามา\nได้รับ <BuffSpellParry> {5}2:1{/} เทิร์น\nลดความเสียหายเวทครั้งถัดไป 5 + <INTmod>\nหากถูกโจมตีด้วยเวท [b]ได้รับ <BuffEdgeCharge> 1 สแตค[/b] (2 สแตคหากไม่ได้รับความเสียหาย)\n{5}\n[b]ได้รับ <BuffEdgeCharge> 1 สแตค[/b] เมื่อใช้{/}",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 0,
    sp: 4,
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
  notExistBuff: [BuffEnum.spellParry],
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Apply Spell Parry buff for 1 turn
    buffsAndDebuffsRepository.spellParry.appender(actor, { turnsAppending: skillLevel >= 5 ? 2 : 1 });

    // At level 5, also produce 1 Edge Charge when used
    if (skillLevel >= 5) {
      buffsAndDebuffsRepository.edgeCharge.appender(actor, { turnsAppending: 1 });
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

