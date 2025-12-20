import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ShamanSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { roll } from "src/Utils/Dice";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { ShamanSkill } from "./index";

export const wardOfProtection = new ShamanSkill({
  id: ShamanSkillId.WardOfProtection,
  name: {
    en: "Ward of Protection",
    th: "การป้องกันพิเศษ",
  },
  description: {
    text: {
      en: "Ward allies with protective spirits.\nGrants {5}1d3:1d2{/} allies <BuffWardOfProtection> for 2 turns.\n<BuffWardOfProtection>: Reduce incoming damage by (3 + WIL mod / 2) per attack, up to 5 stacks per turn.",
      th: "ป้องกันพันธมิตรด้วยวิญญาณพิทักษ์\nให้ {5}1d3:1d2{/} พันธมิตร <BuffWardOfProtection> เป็นเวลา 2 เทิร์น\n<BuffWardOfProtection>: ลดความเสียหายที่เข้ามา (3 + WIL mod / 2) ต่อการโจมตี สูงสุด 5 สแตคต่อเทิร์น",
    },
    formula: {
      en: "Ward of Protection buff for 2 turns",
      th: "Ward of Protection buff เป็นเวลา 2 เทิร์น",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 2,
    sp: 0,
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
        element: "order",
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
    // Determine number of targets: 1d2 at base, 1d3 at level 5
    const numTargets = skillLevel >= 5 ? roll(1).d(3).total : roll(1).d(2).total;

    // Select random allies (excluding self)
    const allies = actorParty.filter(ally => ally.id !== actor.id && !ally.vitals.isDead);
    const shuffled = [...allies].sort(() => Math.random() - 0.5);
    const targets = shuffled.slice(0, Math.min(numTargets, allies.length));

    if (targets.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to ward allies but there are no allies to protect`,
          th: `${actor.name.th} พยายามป้องกันพันธมิตรแต่ไม่มีพันธมิตรที่จะปกป้อง`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Apply Ward of Protection buff to targets for 2 turns
    for (const target of targets) {
      buffsAndDebuffsRepository.wardOfProtection.appender(target, { turnsAppending: 2 });
    }

    const targetNames = targets.map(t => t.name.en).join(", ");

    return {
      content: {
        en: `${actor.name.en} warded ${targetNames} with protective spirits for 2 turns!`,
        th: `${actor.name.th} ป้องกัน ${targetNames} ด้วยวิญญาณพิทักษ์เป็นเวลา 2 เทิร์น!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: targets.map(t => ({
        actorId: t.id,
        effect: [TargetEffect.TestSkill],
      })),
    };
  },
});

