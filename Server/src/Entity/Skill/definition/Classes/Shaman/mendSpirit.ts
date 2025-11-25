import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ShamanSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { roll, rollTwenty } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";
import { ShamanSkill } from "./index";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const mendSpirit = new ShamanSkill({
  id: ShamanSkillId.MendSpirit,
  name: {
    en: "Mend Spirit",
    th: "ช่อมจิตวิญญาณ",
  },
  description: {
    en: "Patch up an ally's life force with unstable spiritual energy. Heals a random injured ally for 1d4 + willpower mod + 0.5*skill level, but if the user roll 1D20 and result in 11+, generate 1 Chaos for them instead of full healing and the heal is halved.",
    th: "ช่อมจิตวิญญาณของเพื่อนร่วมทีมด้วยพลังจิตที่ไม่เสถียร รักษาเพื่อนร่วมทีมที่บาดเจ็บแบบสุ่ม 1d4 + ค่า willpower + 0.5*เลเวลสกิล แต่ถ้าผู้ใช้ทอย 1D20 และผลลัพธ์ออกมาเป็น 11+ ให้เพิ่ม 1 Chaos แทนการรักษาเต็มจำนวน และการรักษาจะถูกลดลงครึ่งหนึ่ง",
  },
  requirement: {},
  equipmentNeeded: [],
  notExistDebuff: [DebuffEnum.mendSpiritCooldown],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "chaos",
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
  ) => {
    let injuredAllies = actorParty.filter(
      (ally) => ally.vitals.hp.current < ally.vitals.hp.max && !ally.vitals.isDead
    );

    if (injuredAllies.length === 0) {
        if (actorParty.length === 0) {
          return {
            content: {
              en: `${actor.name.en} tried to mend spirits but no allies are injured`,
              th: `${actor.name.th} พยายามช่อมจิตวิญญาณแต่ไม่มีเพื่อนร่วมทีมที่บาดเจ็บ`,
            },
            actor: {
              actorId: actor.id,
              effect: [ActorEffect.TestSkill],
            },
            targets: [],
          };
        } else {
            injuredAllies = actorParty;
        }
    }

    // Pick random injured ally
    const target = injuredAllies[Math.floor(Math.random() * injuredAllies.length)]!;

    // Check for side effects, use D20
    const sideEffect = rollTwenty().total;
    let message = "";
    let healAmount = 0;

    const baseHeal = roll(1).d(4).total + statMod(actor.attribute.getTotal("willpower")) + 0.5 * skillLevel;

    if (sideEffect <= 11) {
      // Full healing
      target.vitals.incHp(healAmount);
      message = `${target.name.en} healed for ${healAmount} HP.`;
    } else {
      // Heal is halved, + 1 chaos
      healAmount = Math.floor(baseHeal / 2);
      target.resources.chaos += 1;
      target.vitals.incHp(healAmount);
      message = `${target.name.en} healed for ${healAmount} HP and received 1 Chaos energy.`;
    }

    // Apply cooldown debuff
    debuffsRepository.mendSpiritCooldown.appender(actor, 3, false, 0);

    return {
      content: {
        en: `${actor.name.en} used Mend Spirit on ${target.name.en}. ${message}`,
        th: `${actor.name.th} ใช้ช่อมจิตวิญญาณกับ ${target.name.th}. ${message}`,
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

