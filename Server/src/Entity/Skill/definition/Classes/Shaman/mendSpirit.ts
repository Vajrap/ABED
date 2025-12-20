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
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const mendSpirit = new ShamanSkill({
  id: ShamanSkillId.MendSpirit,
  name: {
    en: "Mend Spirit",
    th: "ช่อมจิตวิญญาณ",
  },
  description: {
    text: {
      en: "Mend an ally's wounds with unstable spiritual energy that flows unpredictably.\nHeal a random injured ally for <FORMULA> HP.\nRoll D20: if 11+, [r]heal is halved[/r] and target [b]gains +1 chaos[/b] instead of full healing.",
      th: "ช่อมแผลของพันธมิตรด้วยพลังงานจิตที่ไม่เสถียรที่ไหลอย่างคาดเดาไม่ได้\nรักษาพันธมิตรที่บาดเจ็บแบบสุ่ม <FORMULA> HP\nทอย D20: หาก 11+ [r]การรักษาลดลงครึ่งหนึ่ง[/r] และเป้าหมาย [b]ได้รับ +1 chaos[/b] แทนการรักษาเต็มจำนวน",
    },
    formula: {
      en: "(1d4 + <WILmod>) × <SkillLevelMultiplier>",
      th: "(1d4 + <WILmod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  cooldown: 3,
  consume: {
    hp: 0,
    mp: 2,
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

    const baseHeal = (roll(1).d(4).total + statMod(actor.attribute.getTotal("willpower"))) * skillLevelMultiplier(skillLevel);

    if (sideEffect <= 10) {
      // Full healing (roll <= 10 means <= 10, so 11+ is the halved case)
      healAmount = Math.floor(baseHeal);
      target.vitals.incHp(healAmount);
      message = `${target.name.en} healed for ${healAmount} HP.`;
    } else {
      // Heal is halved, + 1 chaos (roll 11+)
      healAmount = Math.floor(baseHeal / 2);
      target.resources.chaos += 1;
      target.vitals.incHp(healAmount);
      message = `${target.name.en} healed for ${healAmount} HP and received 1 Chaos energy.`;
    }

    // Apply cooldown debuff
    debuffsRepository.mendSpiritCooldown.appender(actor, { turnsAppending: 3 });

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

