import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ShamanSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { roll } from "src/Utils/Dice";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { ShamanSkill } from "./index";

export const spiritRattle = new ShamanSkill({
  id: ShamanSkillId.SpiritRattle,
  name: {
    en: "Spirit Rattle",
    th: "กระดิ่งผี",
  },
  description: {
    en: "Shake a bone charm, summoning erratic ghostly aid. Grants random allies (n) a spirit rattle buff for 1 + (0.5 * skillLevel) turns. Number of targets based on 1 + 1d(skillLevel): Character with Spirit Rattle buff automatically heals for 1d4 + willpower mod when take turn",
    th: "เขย่ากระดิ่งแห่งวิญญาณ เรียกความช่วยเหลือจากผีแบบไม่เสถียร ให้บัฟ Spirit Rattle แก่เพื่อนร่วมทีมแบบสุ่ม (n) เป็นเวลา 1 + (0.5 * เลเวลสกิล) เทิร์น จำนวนเป้าหมายขึ้นอยู่กับ 1 + 1d(skillLevel): ผู้ที่มีบัพกระดิ่งวิญญาณจะรักษาตัวเอง 1d4 + will power mod เมื่อเข้าเทิร์น",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
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
        element: 'order',
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
    // Calculate number of targets: 1 + 1d(skillLevel)
    let numTargets = 1 + roll(1).d(skillLevel).total;
    const duration = Math.min(1 + Math.floor(skillLevel * 0.5), skillLevel);
    
    // Select random allies (excluding self)
    const allies = actorParty.filter(ally => ally.id !== actor.id);
    const actualTargets = allies
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(numTargets, allies.length));

    if (actualTargets.length === 0) {
      return {
        content: {
          en: `${actor.name.en} shook the spirit rattle but there are no allies to buff`,
          th: `${actor.name.th} เขย่ากระดิ่งผีแต่ไม่มีเพื่อนร่วมทีมที่จะบัฟ`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    for (const target of actualTargets) {
      buffsAndDebuffsRepository.spiritRattle.appender(target, duration, false, 0);
    }

    // Apply buff to targets (TODO: implement control buff)
    const targetNames = actualTargets.map(t => t.name.en).join(", ");
    
    return {
      content: {
        en: `${actor.name.en} shook the spirit rattle! ${targetNames} gained +2 Control for ${duration} turn(s)! (Not yet implemented)`,
        th: `${actor.name.th} เขย่ากระดิ่งผี! ${targetNames} ได้รับ Control +2 เป็นเวลา ${duration} เทิร์น! (ยังไม่ถูกใช้งาน)`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: actualTargets.map(t => ({
        actorId: t.id,
        effect: [TargetEffect.TestSkill],
      })),
    };
  },
});

