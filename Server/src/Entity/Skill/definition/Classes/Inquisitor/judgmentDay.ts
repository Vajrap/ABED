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
import { InquisitorSkill } from "./index";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { CharacterType } from "src/InterFacesEnumsAndTypes/Enums";

export const judgmentDay = new InquisitorSkill({
  id: InquisitorSkillId.JudgmentDay,
  name: {
    en: "Judgment Day",
    th: "วันพิพากษา",
  },
  description: {
    en: "Call down a concentrated pillar of radiant force. Deals 2d6 + (willpower + planar mod) * (1 + 0.15 * skill level) holy damage to single target. If target has Exposed debuff, deal +50% damage. Against undead/fiends, deal +1d8 bonus damage. At level 5, damage increases to 2d8 base.",
    th: "เรียกเสาแสงศักดิ์สิทธิ์ที่เข้มข้น สร้างความเสียหายศักดิ์สิทธิ์ 2d6 + (willpower + planar mod) * (1 + 0.15 * เลเวลสกิล) ต่อเป้าหมายเดียว หากเป้าหมายมี Exposed debuff จะสร้างความเสียหายเพิ่ม +50% ต่อ undead/fiends จะสร้างความเสียหายเพิ่ม +1d8 ที่เลเวล 5 ความเสียหายพื้นฐานเพิ่มเป็น 2d8",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 4,
    sp: 0,
    elements: [
      {
        element: "order",
        value: 2,
      },
      {
        element: "fire",
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
        element: "neutral",
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
          en: `${actor.name.en} tried to cast Judgment Day but has no target`,
          th: `${actor.name.th} พยายามใช้วันพิพากษาแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Calculate damage: 2d6 (2d8 at level 5) + (WIL + PLANAR) * (1 + 0.15 * skill level)
    const willMod = statMod(actor.attribute.getTotal("willpower"));
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const luckMod = statMod(actor.attribute.getTotal("luck"));
    
    const baseDiceDamage = roll(2).d(skillLevel >= 5 ? 8 : 6).total;
    const levelMultiplier = 1 + (0.15 * skillLevel);
    const attributeMod = willMod + planarMod;
    let totalDamage = Math.max(0, Math.floor(baseDiceDamage + (attributeMod * levelMultiplier)));

    // Check if target has Exposed debuff for +50% damage
    const exposed = target.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.exposed);
    const hasExposed = exposed && exposed.value > 0;
    if (hasExposed) {
      totalDamage = Math.floor(totalDamage * 1.5);
    }

    // Bonus damage against undead/fiends
    const isUndeadOrFiend = target.type === CharacterType.undead || target.type === CharacterType.fiend;
    const bonusDamage = isUndeadOrFiend ? roll(1).d(8).total : 0;

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
      { en: "Judgment Day", th: "วันพิพากษา" },
      damageResult,
    );

    const exposedBonus = hasExposed ? " (Exposed: +50%)" : "";
    const evilBonus = bonusDamage > 0 ? ` +${bonusDamage} vs evil` : "";

    return {
      content: {
        en: `${message.en}${exposedBonus}${evilBonus}`,
        th: `${message.th}${hasExposed ? " (ถูกเปิดเผย: +50%)" : ""}${bonusDamage > 0 ? ` +${bonusDamage} ต่อความชั่วร้าย` : ""}`,
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

