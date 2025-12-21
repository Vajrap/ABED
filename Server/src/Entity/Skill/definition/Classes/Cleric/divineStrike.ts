import { ClericSkillId } from "src/Entity/Skill/enums";
import { ClericSkill } from ".";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { Character } from "src/Entity/Character/Character";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BuffEnum, DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { ActorEffect, TargetEffect } from "src/Entity/Skill/effects";
import { getTarget } from "src/Entity/Battle/getTarget";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { statMod } from "src/Utils/statMod";

export const divineStrike = new ClericSkill({
  id: ClericSkillId.DivineStrike,
  name: {
    en: "Divine Strike",
    th: "การโจมตีศักดิ์สิทธิ์",
  },
  description: {
    text: {
      en: "A powerful holy strike that consumes Faith for devastating damage. \nDeal <FORMULA> holy damage. \nApply Burn debuff for {5}'3':'2'{/} turns. \nConsumes 3 Faith stacks.",
      th: "การโจมตีศักดิ์สิทธิ์ที่ทรงพลังซึ่งใช้ศรัทธาเพื่อสร้างความเสียหายที่ร้ายแรง \nสร้างความเสียหายศักดิ์สิทธิ์ <FORMULA> \nทำให้เกิด Burn เป็นเวลา {5}'3':'2'{/} เทิร์น \nใช้ศรัทธา 3",
    },
    formula: {
      en: "((1d6 + <WILmod>) × <SkillLevelMultiplier>) + (<FaithStacks> × {5}'1d6':'1d4'{/})",
      th: "((1d6 + <WILmod>) × <SkillLevelMultiplier>) + (<FaithStacks> × {5}'1d6':'1d4'{/})",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 6,
    sp: 0,
    elements: [
      { element: "order", value: 3 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ) => {
    // Get target enemy
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Divine Strike but has no target`,
          th: `${actor.name.th} พยายามใช้การโจมตีศักดิ์สิทธิ์แต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Get Faith stacks
    const faithEntry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.faith);
    const faithStacks = faithEntry?.value || 0;

    // Calculate base damage: (1d6 + WIL mod) × skill level multiplier
    // Damage dice - should not get bless/curse
    const levelScalar = skillLevelMultiplier(skillLevel);
    const baseDamageWithScalar = Math.floor(
      actor.roll({
        amount: 1,
        face: 6,
        stat: "willpower",
        applyBlessCurse: false,
      }) * levelScalar
    );

    // Add Faith stacks bonus: Faith stacks × 1d4 (1d6 at level 5)
    let faithBonusDamage = 0;
    if (faithStacks > 0) {
      const faithDiceFace = skillLevel >= 5 ? 6 : 4;
      // Roll dice for each Faith stack
      for (let i = 0; i < faithStacks; i++) {
        faithBonusDamage += actor.roll({
          amount: 1,
          face: faithDiceFace,
          applyBlessCurse: false,
        });
      }
    }

    const totalDamage = baseDamageWithScalar + faithBonusDamage;

    // Divine Strike is divine/holy magic, so use WIL for hit (not CONTROL)
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({ stat: "willpower" }),
      crit: actor.rollTwenty({ stat: "luck" }),
      type: DamageType.radiance,
      isMagic: true,
    };

    // Resolve damage
    const damageResult = resolveDamage(
      actor.id,
      target.id,
      damageOutput,
      location,
    );

    // Apply Burn debuff for 2 turns (3 at level 5)
    const burnDuration = skillLevel >= 5 ? 3 : 2;
    debuffsRepository[DebuffEnum.burn].appender(target, { turnsAppending: burnDuration });

    // Consume 3 Faith stacks (or all available if less than 3)
    const faithToConsume = Math.min(3, faithStacks);
    if (faithEntry && faithEntry.value > 0) {
      faithEntry.value -= faithToConsume;
      if (faithEntry.value === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.faith);
      }
    }

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Divine Strike", th: "การโจมตีศักดิ์สิทธิ์" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en} ${target.name.en} is burning!`,
        th: `${message.th} ${target.name.th} ถูกเผาไหม้!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: [
        {
          actorId: target.id,
          effect: [TargetEffect.OrderOne],
        },
      ],
    };
  },
});

