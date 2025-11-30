import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { InquisitorSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { InquisitorSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { DebuffEnum, BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { statMod } from "src/Utils/statMod";

export const exposeWeakness = new InquisitorSkill({
  id: InquisitorSkillId.ExposeWeakness,
  name: {
    en: "Expose Weakness",
    th: "เปิดเผยจุดอ่อน",
  },
  description: {
    text: {
      en: "Point out the enemy's sins and expose their vulnerabilities for all to see.\n{5}\nAlso reduces their [r]critical defense by 2[/r].{/}\n[b]You gain +floor(<WILmod> / 2) hit[/b] against exposed enemies.",
      th: "ชี้ให้เห็นบาปของศัตรูและเปิดเผยจุดอ่อนให้ทุกคนเห็น\n{5}\nยังลด [r]การป้องกันคริติคอล 2[/r] ด้วย{/}\n[b]คุณได้รับ +floor(<WILmod> / 2) hit[/b] ต่อเป้าหมายที่ถูกเปิดเผย",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 2,
    sp: 0,
    elements: [
      {
        element: "order",
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
        element: "fire",
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
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Expose Weakness but has no target`,
          th: `${actor.name.th} พยายามใช้เปิดเผยจุดอ่อนแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Apply Exposed debuff for 2 turns (3 at level 5)
    const duration = skillLevel >= 5 ? 3 : 2;
    const universalCounter = skillLevel >= 5 ? 1 : 0; // universalCounter = 1 means -2 crit defense at level 5
    
    buffsAndDebuffsRepository.exposed.appender(target, { 
      turnsAppending: duration, 
      universalCounter 
    });

    // Apply ExposeWeaknessActive buff to user with same duration for hit bonus
    // Store willpower mod in universalCounter for hit bonus calculation
    const willMod = statMod(actor.attribute.getTotal("willpower"));
    buffsAndDebuffsRepository.exposeWeaknessActive.appender(actor, { 
      turnsAppending: duration, 
      universalCounter: willMod 
    });

    return {
      content: {
        en: `${actor.name.en} exposes ${target.name.en}'s weakness! ${target.name.en} is marked and takes increased damage. ${actor.name.en} gains +${Math.floor(willMod / 2)} hit against exposed enemies.`,
        th: `${actor.name.th} เปิดเผยจุดอ่อนของ ${target.name.th}! ${target.name.th} ถูกทำเครื่องหมายและรับความเสียหายเพิ่ม ${actor.name.th} ได้รับ +${Math.floor(willMod / 2)} hit ต่อเป้าหมายที่ถูกเปิดเผย`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: [
        {
          actorId: target.id,
          effect: [TargetEffect.TestSkill],
        },
      ],
    };
  },
});

