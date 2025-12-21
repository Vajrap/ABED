import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ClericSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { ClericSkill } from "./index";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { CharacterType } from "src/InterFacesEnumsAndTypes/Enums";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const radiance = new ClericSkill({
  id: ClericSkillId.Radiance,
  name: {
    en: "Radiance",
    th: "รัศมีศักดิ์สิทธิ์",
  },
  description: {
    text: {
      en: "Unleash a flash of consecrated light dealing <FORMULA>. \nDeal additional [b]1d4[/b] if the target is undead or fiend.",
      th: "ปล่อยแสงศักดิ์สิทธิ์ สร้างความเสียหาย <FORMULA> \nสร้างความเสียหายเพิ่มเติม [b]1d4[/b] หากเป้าหมายเป็น undead หรือ fiend",
    },
    formula: {
      en: "(1d6 + <WILmod>) × <SkillLevelMultiplier>",
      th: "(1d6 + <WILmod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 2,
    sp: 0,
    elements: [],
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
  isFallback: true, // Radiance: no elemental resources, no buff requirement
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to cast Radiance but has no target`,
          th: `${actor.name.th} พยายามใช้รัศมีศักดิ์สิทธิ์แต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Base damage dice - should not get bless/curse
    const baseDamage = actor.roll({
      amount: 1,
      face: 6,
      stat: "willpower",
      applyBlessCurse: false,
    }) * skillLevelMultiplier(skillLevel);

    let totalDamage = baseDamage;

    // Bonus damage vs undead/fiend - should not get bless/curse
    if (
      target.type === CharacterType.undead ||
      target.type === CharacterType.fiend
    ) {
      totalDamage += actor.roll({
        amount: 1,
        face: 4,
        applyBlessCurse: false,
      });
    }

    // Radiance is divine/holy magic, so use WIL for hit (not CONTROL)
    const damageOutput = {
      damage: Math.floor(totalDamage),
      hit: actor.rollTwenty({stat: "willpower"}),
      crit: actor.rollTwenty({stat: "luck"}),
      type: DamageType.radiance,
      isMagic: true,
    };

    const damageResult = resolveDamage(
      actor.id,
      target.id,
      damageOutput,
      location,
    );

    // Gain 1 Faith stack
    buffsRepository[BuffEnum.faith].appender(actor, { turnsAppending: 1 });

    return {
      content: buildCombatMessage(
        actor,
        target,
        { en: "Radiance", th: "รัศมีศักดิ์สิทธิ์" },
        damageResult,
      ),
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
