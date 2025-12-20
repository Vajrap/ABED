import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ShamanSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { roll } from "src/Utils/Dice";
import { ShamanSkill } from "./index";

export const dualNature = new ShamanSkill({
  id: ShamanSkillId.DualNature,
  name: {
    en: "Dual Nature",
    th: "ธรรมชาติคู่",
  },
  description: {
    text: {
      en: "Strike with dual nature, balancing attack and healing.\nDeal <FORMULA> damage to one enemy.\n**Order Dominance:** If you have Order more than Chaos, heal random ally equal to skill level.\n**Chaos Dominance:** If you have Chaos more than Order, deal additional damage equal to skill level.\n**The damage type will follow the dominant resource, if both are equal, deal arcane damage**\n**Balance:** If your Order and Chaos are equal and > 0, both effects apply.",
      th: "โจมตีด้วยธรรมชาติคู่ สร้างสมดุลระหว่างการโจมตีและการรักษา\nสร้างความเสียหาย <FORMULA> ให้ศัตรูหนึ่งคน\n**Order ครอบงำ:** หากคุณมี Order มากกว่า Chaos จะรักษาพันธมิตรแบบสุ่มเท่ากับเลเวลสกิล\n**Chaos ครอบงำ:** หากคุณมี Chaos มากกว่า Order จะสร้างความเสียหายเพิ่มเติมเท่ากับเลเวลสกิล\n**ประเภทความเสียหายจะตามทรัพยากรที่ครอบงำ หากทั้งสองเท่ากัน จะสร้างความเสียหาย arcane**\n**สมดุล:** หาก Order และ Chaos ของคุณเท่ากันและ > 0 ผลทั้งสองจะใช้",
    },
    formula: {
      en: "(1d6 + <PlanarMod>) × <SkillLevelMultiplier>",
      th: "(1d6 + <PlanarMod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 3,
    sp: 0,
    elements: [
      {
        element: "order",
        value: 1,
      },
      {
        element: "chaos",
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
        min: 0,
        max: 1,
      },
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
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Dual Nature but has no target`,
          th: `${actor.name.th} พยายามใช้ธรรมชาติคู่แต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const order = actor.resources.order;
    const chaos = actor.resources.chaos;
    const levelMultiplier = skillLevelMultiplier(skillLevel);

    // Base damage: (1d6 + planar mod) × skill level multiplier
    const baseDamage = actor.roll({ amount: 1, face: 6, stat: 'planar' });
    let totalDamage = Math.floor(baseDamage * levelMultiplier);
    const baseDamageType = order === chaos ? DamageType.arcane : order > chaos ? DamageType.order : DamageType.chaos;

    const baseDamageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({stat: 'intelligence'}), // Auto-hit spell
      crit: actor.rollTwenty({stat: 'luck'}),
      type: baseDamageType,
      isMagic: true,
    };

    const baseDamageResult = resolveDamage(actor.id, target.id, baseDamageOutput, location);

    // Check dominance
    function orderDominance(): Character | null {
      const healAmount = skillLevel;
      const allies = actorParty.filter(ally => ally.id !== actor.id && !ally.vitals.isDead);
      if (allies.length > 0) {
        const allyToHeal = allies[Math.floor(Math.random() * allies.length)]!;
        allyToHeal.vitals.incHp(healAmount);
        return allyToHeal;
      }
      return null;
    }

    function chaosDominance(target: Character) {
      const additionalDamageOutput = {
        damage: skillLevel,
        hit: actor.rollTwenty({stat: 'intelligence'}),
        crit: actor.rollTwenty({stat: 'luck'}),
        type: DamageType.chaos,
        isMagic: true,
      };
      return resolveDamage(actor.id, target.id, additionalDamageOutput, location);
    }

    if (order > 0 && order > chaos) {
        const healedAlly = orderDominance();
        return {
            content: {
                en: `${actor.name.en} used Dual Nature on ${target.name.en}. Order dominance. Dealt ${baseDamageResult.actualDamage} ${baseDamageResult.damageType} damage${healedAlly ? ` and healed ${healedAlly.name.en} for ${skillLevel} HP` : ''}.`,
                th: `${actor.name.th} ใช้ธรรมชาติคู่กับ ${target.name.th}. Order ครอบงำ. สร้างความเสียหาย ${baseDamageResult.actualDamage} ${baseDamageResult.damageType}${healedAlly ? ` และรักษา ${healedAlly.name.th} ${skillLevel} HP` : ''}`,
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
                ...(healedAlly ? [{
                    actorId: healedAlly.id,
                    effect: [TargetEffect.TestSkill],
                }] : []),
            ],
        };
    } else if (chaos > 0 && chaos > order) {
        const additionalDamageResult = chaosDominance(target);
        return {
            content: {
                en: `${actor.name.en} used Dual Nature on ${target.name.en}. Chaos dominance. Dealt ${baseDamageResult.actualDamage} ${baseDamageResult.damageType} damage and ${additionalDamageResult.actualDamage} Chaos damage.`,
                th: `${actor.name.th} ใช้ธรรมชาติคู่กับ ${target.name.th}. Chaos ครอบงำ. สร้างความเสียหาย ${baseDamageResult.actualDamage} ${baseDamageResult.damageType} และ ${additionalDamageResult.actualDamage} Chaos`,
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
    } else if (order === chaos && order > 0) {
        const healedAlly = orderDominance();
        const additionalDamageResult = chaosDominance(target);
        return {
            content: {
                en: `${actor.name.en} used Dual Nature on ${target.name.en}. Balance. Dealt ${baseDamageResult.actualDamage} ${baseDamageResult.damageType} damage and ${additionalDamageResult.actualDamage} Chaos damage${healedAlly ? ` and healed ${healedAlly.name.en} for ${skillLevel} HP` : ''}.`,
                th: `${actor.name.th} ใช้ธรรมชาติคู่กับ ${target.name.th}. สมดุล. สร้างความเสียหาย ${baseDamageResult.actualDamage} ${baseDamageResult.damageType} และ ${additionalDamageResult.actualDamage} Chaos${healedAlly ? ` และรักษา ${healedAlly.name.th} ${skillLevel} HP` : ''}`,
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
                ...(healedAlly ? [{
                    actorId: healedAlly.id,
                    effect: [TargetEffect.TestSkill],
                }] : []),
            ],
        };
    } else {
        return {
            content: {
                en: `${actor.name.en} used Dual Nature on ${target.name.en}. Dealt ${baseDamageResult.actualDamage} ${baseDamageResult.damageType} damage.`,
                th: `${actor.name.th} ใช้ธรรมชาติคู่กับ ${target.name.th}. สร้างความเสียหาย ${baseDamageResult.actualDamage} ${baseDamageResult.damageType}`,
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
    }
  },
});

