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
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { InquisitorSkill } from "./index";
import { CharacterType } from "src/InterFacesEnumsAndTypes/Enums";

export const cleansingFlame = new InquisitorSkill({
  id: InquisitorSkillId.CleansingFlame,
  name: {
    en: "Cleansing Flame",
    th: "เปลวไฟชำระล้าง",
  },
  description: {
    text: {
      en: "Cleanse with holy flame while smiting enemies.\nDeal <FORMULA> holy damage.\nRemove 1 random debuff from self or 1 random ally.\n[r]Deal +1d3 bonus damage[/r] if target is undead or fiend.",
      th: "ชำระล้างด้วยเปลวไฟศักดิ์สิทธิ์พร้อมโจมตีศัตรู\nสร้างความเสียหายศักดิ์สิทธิ์ <FORMULA>\nลบดีบัฟแบบสุ่ม 1 ตัวจากตัวเองหรือพันธมิตร 1 คน\n[r]สร้างความเสียหายเพิ่ม +1d3[/r] หากเป้าหมายเป็น undead หรือ fiend",
    },
    formula: {
      en: "(1d4 + <WILmod>) × <SkillLevelMultiplier>",
      th: "(1d4 + <WILmod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  isFallback: false, // CleansingFlame: consumes 2 MP (but produces fire, so not fallback)
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
        element: "fire",
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
          en: `${actor.name.en} tried to use Cleansing Flame but has no target`,
          th: `${actor.name.th} พยายามใช้เปลวไฟชำระล้างแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const willMod = statMod(actor.attribute.getTotal("willpower"));
    const levelMultiplier = skillLevelMultiplier(skillLevel);

    // Calculate damage: 1d4 + WIL mod × skill level multiplier
    // Damage dice - should not get bless/curse
    const baseDiceDamage = actor.roll({ amount: 1, face: 4, stat: "willpower", applyBlessCurse: false });
    let totalDamage = Math.max(0, Math.floor(baseDiceDamage * levelMultiplier));

    // Undead/Fiend Bonus: If target is undead or fiend, deal +1d3 damage
    const isUndeadOrFiend = target.type === CharacterType.undead || target.type === CharacterType.fiend;
    const bonusDamage = isUndeadOrFiend ? actor.roll({ amount: 1, face: 3, applyBlessCurse: false }) : 0;

    // Divine/holy magic uses WIL for hit, LUCK for crit
    const damageOutput = {
      damage: totalDamage + bonusDamage,
      hit: actor.rollTwenty({stat: 'willpower'}),
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.radiance,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Cleanse: Remove 1 random debuff from self or 1 random ally
    const aliveAllies = actorParty.filter((ally) => !ally.vitals.isDead && ally.id !== actor.id);
    const cleanseTargets = [actor, ...aliveAllies];
    // Random selection - use actor.roll for consistency (1-based index)
    const randomRoll = actor.roll({ amount: 1, face: cleanseTargets.length, applyBlessCurse: false });
    const randomTargetIndex = randomRoll - 1; // Convert to 0-based index
    const cleanseTarget = cleanseTargets[randomTargetIndex] || actor;

    let cleanseMessage = "";
    if (cleanseTarget.buffsAndDebuffs.debuffs.entry.size > 0) {
      const debuffEntries = Array.from(cleanseTarget.buffsAndDebuffs.debuffs.entry.entries());
      // Random selection - use actor.roll for consistency (1-based index)
      const randomDebuffRoll = actor.roll({ amount: 1, face: debuffEntries.length, applyBlessCurse: false });
      const randomDebuffIndex = randomDebuffRoll - 1; // Convert to 0-based index
      const [debuffId] = debuffEntries[randomDebuffIndex]!;
      cleanseTarget.buffsAndDebuffs.debuffs.entry.delete(debuffId);
      cleanseMessage = ` ${cleanseTarget.name.en} was cleansed of ${debuffId}!`;
    }

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Cleansing Flame", th: "เปลวไฟชำระล้าง" },
      damageResult,
    );

    const bonusMessage = bonusDamage > 0 ? ` +${bonusDamage} vs undead/fiend` : "";

    return {
      content: {
        en: `${message.en}${bonusMessage}${cleanseMessage}`,
        th: `${message.th}${bonusDamage > 0 ? ` +${bonusDamage} ต่อ undead/fiend` : ""}${cleanseMessage}`,
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

