import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DuelistSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { DuelistSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const parryRiposte = new DuelistSkill({
  id: DuelistSkillId.ParryRiposte,
  name: {
    en: "Parry & Riposte",
    th: "ปัดป้องและตอบโต้",
  },
  description: {
    text: {
      en: "Assume a defensive stance, ready to parry and counter. \nGain <BuffParry> for {5}'2':'1'{/} turns. \nWhen attacked, [r]roll DC10 CONsave[/r]. If passed, negate the attack and deal <FORMULA> slash damage back to the attacker.",
      th: "ใช้ท่าป้องกัน พร้อมปัดป้องและตอบโต้ \nได้รับ <BuffParry> {5}'2':'1'{/} เทิร์น \nเมื่อถูกโจมตี ให้ทอย control save DC10 หากสำเร็จ จะยกเลิกการโจมตีและสร้างความเสียหาย <FORMULA> ต่อผู้โจมตี",
    },
    formula: {
      en: "(1d6 + <DEXmod>) × <SkillLevelMultiplier>",
      th: "(1d6 + <DEXmod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: ["blade", 'sword', 'dagger'],
  tier: TierEnum.uncommon,
  isFallback: false, // ParryRiposte: consumes 1 neutral element
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
        element: "wind",
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
    // Apply Parry buff for 1 turn (2 turns at level 5)
    const duration = skillLevel >= 5 ? 2 : 1;
    // Store skill level in universalCounter for damage calculation
    buffsAndDebuffsRepository.parry.appender(actor, { 
      turnsAppending: duration, 
      universalCounter: skillLevel 
    });

    return {
      content: {
        en: `${actor.name.en} assumes a defensive stance, ready to parry and counter!${skillLevel >= 5 ? ` (${duration} turns)` : ""}`,
        th: `${actor.name.th} ใช้ท่าป้องกัน พร้อมปัดป้องและตอบโต้!${skillLevel >= 5 ? ` (${duration} เทิร์น)` : ""}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: [],
    };
  },
});

