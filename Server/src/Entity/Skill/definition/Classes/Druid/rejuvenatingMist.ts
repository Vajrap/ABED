import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DruidSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { DruidSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { statMod } from "src/Utils/statMod";

export const rejuvenatingMist = new DruidSkill({
  id: DruidSkillId.RejuvenatingMist,
  name: {
    en: "Rejuvenating Mist",
    th: "หมอกฟื้นฟู",
  },
  description: {
    en: "Release a gentle natural mist around the party. All allies gain Regen buff for 2 turns (3 turns at level 5): restore (1d4 + WIL mod) HP at the start of their turn. At level 7, willpower mod is remembered + 2.",
    th: "ปล่อยหมอกธรรมชาติรอบทีม พันธมิตรทั้งหมดได้รับบัฟฟื้นฟู 2 เทิร์น (3 เทิร์นที่เลเวล 5): ฟื้นฟู (1d4 + WIL mod) HP ที่เริ่มเทิร์น ที่เลเวล 7 จะจำ willpower mod + 2",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  cooldown: 3,
  consume: {
    hp: 0,
    mp: 4,
    sp: 0,
    elements: [],
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
    location: LocationsEnum,
  ): TurnResult => {
    const livingAllies = actorParty.filter((ally) => !ally.vitals.isDead);

    if (livingAllies.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to cast Rejuvenating Mist but has no allies`,
          th: `${actor.name.th} พยายามใช้หมอกฟื้นฟูแต่ไม่มีพันธมิตร`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const duration = skillLevel >= 5 ? 3 : 2;
    const willMod = statMod(actor.attribute.getTotal("willpower"));
    // At level 7, will mod remember + 2
    const rememberedWillMod = skillLevel >= 7 ? willMod + 2 : willMod;

    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    const allyNames: string[] = [];

    for (const ally of livingAllies) {
      // permValue will be used to remember will mod
      buffsAndDebuffsRepository.regen.appender(ally, duration, false, rememberedWillMod);
      allyNames.push(ally.name.en);
      targetEffects.push({
        actorId: ally.id,
        effect: [TargetEffect.TestSkill],
      });
    }

    return {
      content: {
        en: `${actor.name.en} released Rejuvenating Mist! All allies (${allyNames.join(", ")}) gain Regeneration for ${duration} turn(s)!`,
        th: `${actor.name.th} ปล่อยหมอกฟื้นฟู! พันธมิตรทั้งหมด (${allyNames.join(", ")}) ได้รับการฟื้นฟูเป็นเวลา ${duration} เทิร์น!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects,
    };
  },
});

