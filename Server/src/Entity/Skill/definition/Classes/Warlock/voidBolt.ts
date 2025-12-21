import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WarlockSkillId } from "../../../enums";
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
import { WarlockSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const voidBolt = new WarlockSkill({
  id: WarlockSkillId.VoidBolt,
  name: {
    en: "Void Bolt",
    th: "ลูกบอลสุญญากาศ",
  },
  description: {
    text: {
      en: "Hurl a bolt of void energy that corrupts the target.\nDeal <FORMULA> arcane damage.\n[r]Deal +50% damage[/r] if target has <DebuffCursed>.\nTarget must [r]roll DC12 + <PlanarMod> WILsave[/r] or gain <DebuffCursed> for 2 turns.",
      th: "ขว้างลูกบอลพลังงานสุญญากาศที่ทำให้เป้าหมายเสื่อมสลาย\nสร้างความเสียหาย arcane <FORMULA>\n[r]สร้างความเสียหายเพิ่ม +50%[/r] หากเป้าหมายมี <DebuffCursed>\nเป้าหมายต้องทอย [r]WILsave DC12 + <PlanarMod>[/r] หรือได้รับ <DebuffCursed> 2 เทิร์น",
    },
    formula: {
      en: "(1d8 + <PlanarMod>) × <SkillLevelMultiplier>",
      th: "(1d8 + <PlanarMod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  isFallback: false, // VoidBolt: consumes 2 chaos elements
  consume: {
    hp: 0,
    mp: 5,
    sp: 0,
    elements: [
      {
        element: "chaos",
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
          en: `${actor.name.en} tried to use Void Bolt but has no target`,
          th: `${actor.name.th} พยายามใช้ลูกบอลสุญญากาศแต่ไม่พบเป้าหมาย`,
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

    // Calculate damage: (1d8 + planar mod) × skill level multiplier
    // Damage dice - should not get bless/curse
    const baseDiceDamage = actor.roll({ amount: 1, face: 8, stat: "planar", applyBlessCurse: false });
    let totalDamage = Math.max(0, Math.floor((baseDiceDamage + planarMod) * levelMultiplier));

    // Cursed Bonus: If target has Cursed debuff, deal +50% damage
    const hasCursed = target.buffsAndDebuffs.debuffs.entry.has(DebuffEnum.cursed);
    if (hasCursed) {
      totalDamage = Math.floor(totalDamage * 1.5);
    }

    // Curse/chaos magic uses WIL for hit, LUCK for crit
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({stat: 'willpower'}),
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.arcane,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Save: DC12 + planar mod WIL save
    const willpowerDC = 12 + planarMod;
    const willpowerSave = target.rollSave("willpower");
    let cursedMessage = "";

    if (willpowerSave < willpowerDC) {
      // Save failed: Apply Cursed debuff for 2 turns
      buffsAndDebuffsRepository.cursed.appender(target, { turnsAppending: 2 });
      cursedMessage = ` ${target.name.en} is cursed!`;
    }

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Void Bolt", th: "ลูกบอลสุญญากาศ" },
      damageResult,
    );

    const cursedBonusMessage = hasCursed ? " (Cursed: +50%)" : "";

    return {
      content: {
        en: `${message.en}${cursedBonusMessage}${cursedMessage}`,
        th: `${message.th}${hasCursed ? " (ถูกสาป: +50%)" : ""}${cursedMessage ? ` ${target.name.th} ถูกสาป!` : ""}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: [
        {
          actorId: target.id,
          effect: [TargetEffect.ChaosOne],
        },
      ],
    };
  },
});

