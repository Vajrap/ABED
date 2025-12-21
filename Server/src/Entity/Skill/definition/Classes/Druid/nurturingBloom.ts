import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DruidSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { statMod } from "src/Utils/statMod";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { DruidSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const nurturingBloom = new DruidSkill({
  id: DruidSkillId.NurturingBloom,
  name: {
    en: "Nurturing Bloom",
    th: "บานสะพรั่งแห่งการบำรุง",
  },
  description: {
    text: {
      en: "Nurture an ally with blooming life force.\nTarget: 1 random injured ally (2 at level 5).\nRestore <FORMULA> HP.\nGrant <BuffRegen> for 2 turns: restore 1d4 + <WILmod> HP at the start of each turn.\n{5}Also remove 1 random debuff from target.{/}",
      th: "บำรุงพันธมิตรด้วยพลังชีวิตที่เบ่งบาน\nเป้าหมาย: 1 พันธมิตรที่บาดเจ็บแบบสุ่ม (2 ที่เลเวล 5)\nฟื้นฟู <FORMULA> HP\nให้ <BuffRegen> เป็นเวลา 2 เทิร์น: ฟื้นฟู 1d4 + <WILmod> HP ที่เริ่มแต่ละเทิร์น\n{5}ยังลบ debuff แบบสุ่ม 1 ตัวจากเป้าหมายด้วย{/}",
    },
    formula: {
      en: "(2d4 + <WILmod>) × <SkillLevelMultiplier>",
      th: "(2d4 + <WILmod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  isFallback: false, // Nurturing Bloom: consumes 2 neutral elements
  consume: {
    hp: 0,
    mp: 3,
    sp: 0,
    elements: [
      {
        element: "neutral",
        value: 2,
      },
    ],
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
    // Get injured allies (excluding self)
    const injuredAllies = actorParty.filter(
      (ally) => ally.id !== actor.id && !ally.vitals.isDead && ally.vitals.hp.current < ally.vitals.hp.max
    );

    // If no injured allies, target all allies except self
    const possibleTargets = injuredAllies.length > 0 ? injuredAllies : actorParty.filter(ally => ally.id !== actor.id && !ally.vitals.isDead);

    if (possibleTargets.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to use Nurturing Bloom but has no targets`,
          th: `${actor.name.th} พยายามใช้บานสะพรั่งแห่งการบำรุงแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Select targets: 1 at base, 2 at level 5
    const numTargets = skillLevel >= 5 ? 2 : 1;
    const shuffled = [...possibleTargets].sort(() => Math.random() - 0.5);
    const targets = shuffled.slice(0, Math.min(numTargets, possibleTargets.length));

    const willMod = statMod(actor.attribute.getTotal("willpower"));
    const levelScalar = skillLevelMultiplier(skillLevel);
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    const messages: string[] = [];

    for (const target of targets) {
      // Healing: (2d4 + WIL mod) × skill level multiplier
      // Healing dice - should not get bless/curse
      const healAmount = Math.floor((actor.roll({ amount: 2, face: 4, stat: "willpower", applyBlessCurse: false }) + willMod) * levelScalar);
      
      const beforeHp = target.vitals.hp.current;
      target.vitals.incHp(healAmount);
      const actualHeal = target.vitals.hp.current - beforeHp;

      // Grant Regen buff for 2 turns (will remember WIL mod via universalCounter)
      buffsAndDebuffsRepository.regen.appender(target, {
        turnsAppending: 2,
        universalCounter: willMod,
      });

      let message = `${target.name.en} was nurtured and healed for ${actualHeal} HP, gaining Regeneration!`;

      // Level 5: Remove 1 random debuff
      if (skillLevel >= 5) {
        const debuffs = Array.from(target.buffsAndDebuffs.debuffs.entry.keys());
        if (debuffs.length > 0) {
          // Random selection - should not get bless/curse
          const randomIndex = Math.floor(actor.roll({ amount: 1, face: debuffs.length, applyBlessCurse: false })) - 1; // Convert to 0-based index
          const randomDebuff = debuffs[randomIndex];
          if (randomDebuff) {
            target.buffsAndDebuffs.debuffs.entry.delete(randomDebuff);
            message += ` ${target.name.en} was cleansed of a debuff.`;
          }
        }
      }

      messages.push(message);
      targetEffects.push({
        actorId: target.id,
        effect: [TargetEffect.TestSkill],
      });
    }

    return {
      content: {
        en: `${actor.name.en} used Nurturing Bloom! ${messages.join(" ")}`,
        th: `${actor.name.th} ใช้บานสะพรั่งแห่งการบำรุง! ${messages.length > 0 ? messages.map(m => m).join(" ") : ""}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects,
    };
  },
});

