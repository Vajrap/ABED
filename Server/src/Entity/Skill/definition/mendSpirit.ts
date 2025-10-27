import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SkillId } from "../enums";
import { Skill } from "../Skill";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../types";
import { ActorEffect, TargetEffect } from "../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { roll, rollTwenty } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";

export const mendSpirit = new Skill({
  id: SkillId.MendSpirit,
  name: {
    en: "Mend Spirit",
    th: "ช่อมจิตวิญญาณ",
  },
  description: {
    en: "Patch up an ally's life force with unstable spiritual energy. Heals a random injured ally for 1d3 + willpower mod + 0.5*skill level, with a 30% chance to generate 1 Chaos for them instead of full healing, and a 30% chance for heal to be halved.",
    th: "ช่อมจิตวิญญาณของเพื่อนร่วมทีมด้วยพลังจิตที่ไม่เสถียร รักษาเพื่อนร่วมทีมที่บาดเจ็บแบบสุ่ม 1d3 + ค่า willpower + 0.5*เลเวลสกิล แต่มี 30% โอกาสที่จะได้ 1 Chaos แทนการรักษาเต็มจำนวน และ 30% โอกาสที่การรักษาจะถูกแบ่งครึ่ง",
  },
  requirement: {},
  equipmentNeeded: [],
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
        min: 0,
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
    // Find injured allies (HP < max)
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

    if (sideEffect <= 6) {
      // 30% chance: Generate Chaos instead of healing
      target.resources.chaos += 1;
      message = `${target.name.en} received 1 Chaos energy instead of healing!`;
    } else if (sideEffect <= 12) {
      // 30% chance: Heal is halved
      const baseHeal = roll(1).d(3).total + statMod(actor.attribute.getTotal("willpower")) + 0.5 * skillLevel;
      healAmount = Math.floor(baseHeal / 2);
      target.vitals.incHp(healAmount);
      message = `${target.name.en} healed for ${healAmount} HP (halved by unstable energy)!`;
    } else {
      // 40% chance: Normal healing
      healAmount = roll(1).d(3).total + statMod(actor.attribute.getTotal("willpower")) + 0.5 * skillLevel;
      target.vitals.incHp(Math.floor(healAmount));
      message = `${target.name.en} healed for ${Math.floor(healAmount)} HP!`;
    }

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

