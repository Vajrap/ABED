import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WitchSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { WitchSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const chaoticWeave = new WitchSkill({
  id: WitchSkillId.ChaoticWeave,
  name: {
    en: "Chaotic Weave",
    th: "ถักทอความวุ่นวาย",
  },
  description: {
    text: {
      en: "Weave chaotic magic with unpredictable effects.\nDeal <FORMULA> arcane damage.\nRandom Effect: Roll 1d4: 1-2: Apply <DebuffCursed> for 1 turn, 3: Apply <DebuffSlow> for 1 turn, 4: Apply <DebuffDazed> for 1 turn.",
      th: "ถักทอเวทมนตร์วุ่นวายด้วยผลลัพธ์ที่คาดเดาไม่ได้\nสร้างความเสียหาย arcane <FORMULA>\nผลลัพธ์สุ่ม: ทอย 1d4: 1-2: เพิ่ม <DebuffCursed> 1 เทิร์น, 3: เพิ่ม <DebuffSlow> 1 เทิร์น, 4: เพิ่ม <DebuffDazed> 1 เทิร์น",
    },
    formula: {
      en: "(1d4 + <PlanarMod>) × <SkillLevelMultiplier>",
      th: "(1d4 + <PlanarMod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  isFallback: true, // ChaoticWeave: no elemental resources (produces chaos, but doesn't consume any), no buff requirement
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
        element: "chaos",
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
          en: `${actor.name.en} tried to use Chaotic Weave but has no target`,
          th: `${actor.name.th} พยายามใช้ถักทอความวุ่นวายแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const levelMultiplier = skillLevelMultiplier(skillLevel);
    
    // Calculate damage: 1d4 + planar mod × skill level multiplier arcane damage
    // Damage dice - should not get bless/curse
    const baseDiceDamage = actor.roll({ amount: 1, face: 4, stat: "planar", applyBlessCurse: false });
    const totalDamage = Math.max(0, Math.floor((baseDiceDamage + planarMod) * levelMultiplier));
    
    // Curse/dark magic uses WIL for hit, LUCK for crit
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({stat: 'willpower'}),
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.arcane,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Random Effect: Roll 1d4: 1-2: Apply Cursed debuff for 1 turn, 3: Apply Slow debuff for 1 turn, 4: Apply Dazed debuff for 1 turn
    // Random selection - should not get bless/curse
    const randomRoll = actor.roll({ amount: 1, face: 4, applyBlessCurse: false });
    let effectMessage = "";
    
    if (randomRoll <= 2) {
      // 1-2: Apply Cursed debuff for 1 turn
      buffsAndDebuffsRepository.cursed.appender(target, { turnsAppending: 1 });
      effectMessage = ` ${target.name.en} is cursed!`;
    } else if (randomRoll === 3) {
      // 3: Apply Slow debuff for 1 turn
      buffsAndDebuffsRepository.slow.appender(target, { turnsAppending: 1 });
      effectMessage = ` ${target.name.en} is slowed!`;
    } else {
      // 4: Apply Dazed debuff for 1 turn
      buffsAndDebuffsRepository.dazed.appender(target, { turnsAppending: 1 });
      effectMessage = ` ${target.name.en} is dazed!`;
    }

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Chaotic Weave", th: "ถักทอความวุ่นวาย" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${effectMessage}`,
        th: `${message.th}${effectMessage ? ` ${target.name.th} ถูก${randomRoll <= 2 ? "สาป" : randomRoll === 3 ? "ทำให้ช้า" : "ทำให้มึนงง"}!` : ""}`,
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
  },
});

