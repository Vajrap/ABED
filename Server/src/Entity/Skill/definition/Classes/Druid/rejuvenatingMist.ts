import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DruidSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { DruidSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { statMod } from "src/Utils/statMod";

export const rejuvenatingMist = new DruidSkill({
  id: DruidSkillId.RejuvenatingMist,
  name: {
    en: "Rejuvenating Mist",
    th: "หมอกฟื้นฟู",
  },
  description: {
    text: {
      en: "Release a gentle natural mist around the party. \nAll allies gain <BuffRegen> for {5}'3':'2'{/} turns: restore <FORMULA> HP at the start of their turn.",
      th: "ปล่อยหมอกธรรมชาติรอบทีม \nพันธมิตรทั้งหมดได้รับ <BuffRegen> {5}'3':'2'{/} เทิร์น: ฟื้นฟู <FORMULA> HP ที่เริ่มเทิร์น",
    },
    formula: {
      en: "1d4 + <WILmod> {7} +2{/}",
      th: "1d4 + <WILmod> {7} +2{/}",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  cooldown: 3,
  isFallback: true, // Rejuvenating Mist: no elemental resources, no buff requirement
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
      // universalCounter will be used to remember will mod
      buffsAndDebuffsRepository.regen.appender(ally, { 
        turnsAppending: duration, 
        universalCounter: rememberedWillMod 
      });
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

