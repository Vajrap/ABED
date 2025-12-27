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

export const radiantSmite = new InquisitorSkill({
  id: InquisitorSkillId.RadiantSmite,
  name: {
    en: "Radiant Smite",
    th: "การลงโทษด้วยแสง",
  },
  description: {
    text: {
      en: "Channel divine wrath into a searing beam of light that smites the wicked.\nDeal <FORMULA> holy damage.\n[r]Deal +1d4 bonus damage[/r] against undead or fiends.\n[r]Deal +1d4 bonus damage[/r] against evil-aligned targets.",
      th: "รวมพลังพิพากษาจากสวรรค์เป็นลำแสงที่เผาผลาญผู้ชั่วร้าย\nสร้างความเสียหายศักดิ์สิทธิ์ <FORMULA>\n[r]สร้างความเสียหายเพิ่ม +1d4[/r] ต่อ undead หรือ fiends\n[r]สร้างความเสียหายเพิ่ม +1d4[/r] ต่อเป้าหมายที่มีความชั่วร้าย",
    },
    formula: {
      en: "(1d6 + (<WILmod> + <PlanarMod>) / 2) × <SkillLevelMultiplier>",
      th: "(1d6 + (<WILmod> + <PlanarMod>) / 2) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  isFallback: false, // RadiantSmite: consumes 1 order element
  consume: {
    hp: 0,
    mp: 2,
    sp: 0,
    elements: [
     
    ],
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

    
    
    const baseDiceDamage = actor.roll({ amount: 1, face: 6, applyBlessCurse: false });
    const levelMultiplier = skillLevelMultiplier(skillLevel);
    const attributeMod = (willMod + planarMod) / 2;
    const totalDamage = Math.max(0, Math.floor((baseDiceDamage + attributeMod) * levelMultiplier));

    // Bonus damage against undead/fiends (enum says +1d4, 1d8 at level 5)
    const isUndeadOrFiend = target.type === CharacterType.undead || target.type === CharacterType.fiend;
    let bonusDamage = isUndeadOrFiend ? actor.roll({ amount: 1, face: skillLevel >= 5 ? 8 : 4, applyBlessCurse: false }) : 0;

    const damageOutput = {
      damage: totalDamage + bonusDamage,
      hit: actor.rollTwenty({stat: 'willpower'}), // Divine/holy magic uses WIL for hit
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.radiance,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Radiant Smite", th: "การลงโทษด้วยแสง" },
      damageResult,
    );

    const bonusMessage = bonusDamage > 0 ? ` +${bonusDamage} vs undead/fiends` : "";

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

