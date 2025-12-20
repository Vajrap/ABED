/**
 * TODO: LORE ALIGNMENT - Character Creation Level 1
 * 
 * Current: "Spirit Rattle" - Uses abstract "ghostly aid" and "bone charm" concepts.
 * Planar energy should manifest in tangible ways, not abstract spirit summoning.
 * 
 * Suggested Changes:
 * - Rename to "Harmony Rattle" or "Order Resonance" or "Harmony Chant"
 * - Description: "Channel order energy through rattle, creating visible healing resonance
 *   waves" instead of abstract "ghostly aid"
 * - Frame as tangible order energy creating visible resonance waves/healing energy that
 *   flows to allies, rather than abstract spirit summoning
 * - The order element production already exists, emphasize tangible manifestation
 * - Consider: "Harmony Rattle" - tangible order energy waves visibly flowing from rattle
 *   to allies, creating healing resonance (visible energy, not abstract spirits)
 */
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ShamanSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { roll } from "src/Utils/Dice";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { ShamanSkill } from "./index";

export const holyRattle = new ShamanSkill({
  id: ShamanSkillId.HolyRattle,
  name: {
    en: "Holy Rattle",
    th: "กระดิ่งพระพรหม",
  },
  description: {
    text: {
      en: "Channel order energy through resonance, creating visible healing waves that flow to your allies.\nGrants <FORMULA> random allies <BuffSpiritRattle> for {5}3:2{/} turns.\nCharacters with <BuffSpiritRattle> heal for 1d4 + <WILmod> at the start of their turn.",
      th: "ควบคุมพลังงาน order ผ่านการสั่นพ้อง สร้างคลื่นการรักษาที่มองเห็นได้ที่ไหลไปยังพันธมิตร\nให้ <FORMULA> พันธมิตรแบบสุ่ม <BuffSpiritRattle> เป็นเวลา {5}3:2{/} เทิร์น\nผู้ที่มี <BuffSpiritRattle> จะรักษาตัวเอง 1d4 + <WILmod> ที่เริ่มเทิร์น",
    },
    formula: {
      en: "2-6 allies based on skill level",
      th: "2-6 พันธมิตรขึ้นอยู่กับเลเวลสกิล",
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
    const duration = skillLevel >= 5 ? 3 : 2;
    
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
      buffsAndDebuffsRepository.spiritRattle.appender(target, { turnsAppending: duration });
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

