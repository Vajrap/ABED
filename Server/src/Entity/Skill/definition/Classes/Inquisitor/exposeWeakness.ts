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
    en: "Reveal the enemy's wrongdoing or impurity. Target gets Exposed debuff for 2 turns (3 at level 5). Marked enemies take +1d3 damage from all sources. At level 5, also gain -2 to critical defense. Additionally, the Inquisitor gains +willpower mod/2 to hit rolls against exposed enemies for the duration.",
    th: "เปิดเผยความผิดหรือความไม่บริสุทธิ์ของศัตรู เป้าหมายได้รับ Exposed debuff 2 เทิร์น (3 เทิร์นที่เลเวล 5) เป้าหมายที่ถูกทำเครื่องหมายจะรับความเสียหายเพิ่ม +1d3 จากทุกแหล่ง ที่เลเวล 5 จะได้รับ -2 ต่อการป้องกันคริติคอล และผู้ใช้จะได้รับ +willpower mod/2 ต่อ hit rolls ต่อเป้าหมายที่ถูกเปิดเผย",
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
    const permValue = skillLevel >= 5 ? 1 : 0; // permValue = 1 means -2 crit defense at level 5
    
    buffsAndDebuffsRepository.exposed.appender(target, duration, false, permValue);

    // Apply ExposeWeaknessActive buff to user with same duration for hit bonus
    // Store willpower mod in permValue for hit bonus calculation
    const willMod = statMod(actor.attribute.getTotal("willpower"));
    buffsAndDebuffsRepository.exposeWeaknessActive.appender(actor, duration, false, willMod);

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

