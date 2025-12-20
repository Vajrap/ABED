import type { Character } from "src/Entity/Character/Character";
import { SeerSkill } from ".";
import { SeerSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { getTarget } from "src/Entity/Battle/getTarget";
import { statMod } from "src/Utils/statMod";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const fortuneStrike = new SeerSkill({
  id: SeerSkillId.FortuneStrike,
  name: {
    en: "Fortune Strike",
    th: "การโจมตีโชคชะตา",
  },
  description: {
    text: {
      en: "Attempt to strike an enemy with foresight. Roll d20 + your LUK mod vs 12 + enemy LUK mod (10 + enemy LUK mod at level 5). On success, deal {5}'1d10':'1d8'{/} arcane damage and gain 1 Lucky stack. On failure, enemy gains +10 AB gauge and you gain 1 BadLuck stack.",
      th: "พยายามโจมตีศัตรูด้วยการมองเห็นล่วงหน้า ทอย d20 + LUK mod ของคุณ เทียบกับ 12 + LUK mod ของศัตรู (10 + LUK mod ของศัตรูที่ระดับ 5) หากสำเร็จ สร้างความเสียหายอาร์เคน {5}'1d10':'1d8'{/} และได้รับ 1 Lucky หากล้มเหลว ศัตรูได้รับ +10 AB gauge และคุณได้รับ 1 BadLuck",
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
      { element: 'wind', value: 1 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: 'order', min: 1, max: 1 },
    ],
  },
  exec: (
    user: Character,
    userParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Get target enemy
    const target = getTarget(user, userParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${user.name.en} tried to strike with fortune but has no target`,
          th: `${user.name.th} พยายามโจมตีด้วยโชคชะตาแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: user.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Contested roll: d20 + user LUK mod vs DC + enemy LUK mod
    const userLuckRoll = user.rollTwenty({ stat: 'luck' });
    const enemyLuckMod = statMod(target.attribute.getTotal("luck"));
    // DC is 12 + enemy LUK mod at base, 10 + enemy LUK mod at level 5
    const dc = (skillLevel >= 5 ? 10 : 12) + enemyLuckMod;
    const success = userLuckRoll >= dc;

    if (success) {
      // Success: Deal damage and gain Lucky stack
      const damageDice = skillLevel >= 5 ? 10 : 8;
      const diceDamage = user.roll({
        amount: 1,
        face: damageDice,
        stat: 'luck',
      });
      const levelScalar = skillLevelMultiplier(skillLevel);
      const totalDamage = Math.floor(diceDamage * levelScalar);

      const damageOutput = {
        damage: totalDamage,
        hit: user.rollTwenty({ stat: 'control' }),
        crit: user.rollTwenty({ stat: 'luck' }),
        type: DamageType.arcane,
        isMagic: true,
      };

      const damageResult = resolveDamage(
        user.id,
        target.id,
        damageOutput,
        location,
      );

      // Gain 1 Lucky stack
      buffsRepository[BuffEnum.lucky].appender(user, { turnsAppending: 1 });

      const message = buildCombatMessage(
        user,
        target,
        { en: "Fortune Strike", th: "การโจมตีโชคชะตา" },
        damageResult,
      );

      return {
        content: {
          en: `${message.en} ${user.name.en} gains 1 Lucky stack!`,
          th: `${message.th} ${user.name.th} ได้รับ 1 Lucky!`,
        },
        actor: {
          actorId: user.id,
          effect: [ActorEffect.Cast],
        },
        targets: [
          {
            actorId: target.id,
            effect: [TargetEffect.TestSkill],
          },
        ],
      };
    } else {
      // Failure: Enemy gains +10 AB gauge, user gains 1 BadLuck stack
      target.abGauge = Math.min(100, target.abGauge + 10);
      buffsRepository[BuffEnum.badLuck].appender(user, { turnsAppending: 1 });

      return {
        content: {
          en: `${user.name.en}'s Fortune Strike failed! ${target.name.en} gains +10 AB gauge and ${user.name.en} gains 1 BadLuck stack!`,
          th: `${user.name.th} การโจมตีโชคชะตาล้มเหลว! ${target.name.th} ได้รับ +10 AB gauge และ ${user.name.th} ได้รับ 1 BadLuck!`,
        },
        actor: {
          actorId: user.id,
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