import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { InquisitorSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { roll, rollTwenty } from "src/Utils/Dice";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { InquisitorSkill } from "./index";
import { CharacterAlignmentEnum, CharacterType } from "src/InterFacesEnumsAndTypes/Enums";

export const radiantSmite = new InquisitorSkill({
  id: InquisitorSkillId.RadiantSmite,
  name: {
    en: "Radiant Smite",
    th: "การลงโทษด้วยแสง",
  },
  description: {
    en: "Launch a focused blast of radiant energy. Deals 1d6 + (willpower + planar mod)/2 * (1 + 0.1 * skill level) holy damage. At level 5, damage increases to 1d8. Deals +1d4 bonus damage against undead/fiends. And +1d4 bonus damage against evil aligned targets.",
    th: "ปล่อยพลังงานแสงที่มุ่งเน้น สร้างความเสียหายศักดิ์สิทธิ์ 1d6 + (willpower + planar mod)/2 * (1 + 0.1 * เลเวลสกิล) ที่เลเวล 5 ความเสียหายเพิ่มเป็น 1d8 และสร้างความเสียหายเพิ่ม +1d4 ต่อ undead/fiends และ +1d4 ต่อเป้าหมายที่มีความชั่วร้าย",
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
          en: `${actor.name.en} tried to cast Radiant Smite but has no target`,
          th: `${actor.name.th} พยายามใช้การลงโทษด้วยแสงแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Calculate damage: 1d6 (1d8 at level 5) + (WIL + PLANAR)/2 * skillScalar
    const willMod = statMod(actor.attribute.getTotal("willpower"));
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const luckMod = statMod(actor.attribute.getTotal("luck"));

    
    
    const baseDiceDamage = roll(1).d(skillLevel >= 5 ? 8 : 6).total;
    const levelMultiplier = skillLevelMultiplier(skillLevel);
    const attributeMod = (willMod + planarMod) / 2;
    const totalDamage = Math.max(0, Math.floor((baseDiceDamage + attributeMod) * levelMultiplier));

    // Bonus damage against undead/fiends
    const isUndeadOrFiend = target.type === CharacterType.undead || target.type === CharacterType.fiend;
    let bonusDamage = isUndeadOrFiend ? roll(1).d(4).total : 0;

    const evilAlignments = [CharacterAlignmentEnum.Cruel, CharacterAlignmentEnum.Vile, CharacterAlignmentEnum.Tyrant, CharacterAlignmentEnum.Infernal];
    const isTargetEvil = evilAlignments.includes(target.alignment.alignment());
    bonusDamage += isTargetEvil ? roll(1).d(4).total : 0;


    const damageOutput = {
      damage: totalDamage + bonusDamage,
      hit: rollTwenty().total + controlMod,
      crit: rollTwenty().total + luckMod,
      type: DamageType.holy,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Radiant Smite", th: "การลงโทษด้วยแสง" },
      damageResult,
    );

    let bonusMessage = bonusDamage > 0 ? ` +${bonusDamage}` : "";
    if (isTargetEvil) {
      bonusMessage += ` vs evil`;
    }
    if (isUndeadOrFiend) {
      bonusMessage += ` vs undead/fiends`;
    }

    return {
      content: {
        en: `${message.en}${bonusMessage}`,
        th: `${message.th}${bonusMessage}`,
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

