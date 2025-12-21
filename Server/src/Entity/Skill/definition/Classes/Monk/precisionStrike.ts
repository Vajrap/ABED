import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MonkSkillId } from "../../../enums";
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
import { MonkSkill } from "./index";
import { BareHandId } from "src/Entity/Item/Equipment/Weapon/type";
import { ArmorClass } from "src/Entity/Item/Equipment/Armor/Armor";
import { bodyRepository } from "src/Entity/Item/Equipment/Armor/Body/repository";

export const precisionStrike = new MonkSkill({
  id: MonkSkillId.PrecisionStrike,
  name: {
    en: "Precision Strike",
    th: "โจมตีแม่นยำ",
  },
  description: {
    text: {
      en: "Strike with perfect precision, bypassing defenses.\nDeal <FORMULA> blunt damage.\nHit Bonus: +4 hit roll (+6 at level 5).\nEach skill level ignores 1 point of armor (same as Palm Strike).\n[r]Damage reduced by 70% and DC reduced by 3[/r] if wearing non-cloth armor.",
      th: "โจมตีด้วยความแม่นยำสมบูรณ์แบบ ผ่านการป้องกัน\nสร้างความเสียหายทื่อ <FORMULA>\nโบนัสตี: +4 hit roll (+6 ที่เลเวล 5)\nแต่ละเลเวลสกิลเพิกเฉยต่อเกราะ 1 หน่วย (เหมือน Palm Strike)\n[r]ความเสียหายลดลง 70% และ DC ลดลง 3[/r] หากสวมเกราะที่ไม่ใช่ผ้า",
    },
    formula: {
      en: "(1d6 + max(<STRmod>, <DEXmod>)) × <SkillLevelMultiplier>",
      th: "(1d6 + max(<STRmod>, <DEXmod>)) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: ["bareHand"],
  tier: TierEnum.common,
  isFallback: false, // Precision Strike: consumes 1 wind element
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [
      {
        element: "wind",
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
    const target = getTarget(actor, actorParty, targetParty, "enemy").from("frontFirst").one();
    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Precision Strike but has no target`,
          th: `${actor.name.th} พยายามใช้โจมตีแม่นยำแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    if (weapon.id !== BareHandId.BareHand) {
      return {
        content: {
          en: `${actor.name.en} must be barehanded to use Precision Strike`,
          th: `${actor.name.th} ต้องใช้มือเปล่าเพื่อใช้โจมตีแม่นยำ`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const strMod = statMod(actor.attribute.getTotal("strength"));
    const dexMod = statMod(actor.attribute.getTotal("dexterity"));
    const higherMod = Math.max(strMod, dexMod);

    // Calculate damage: (1d6 + (STR or DEX mod, whichever is higher)) × skill level multiplier
    const levelScalar = skillLevelMultiplier(skillLevel);
    // Damage dice - should not get bless/curse
    const baseDamage = actor.roll({ amount: 1, face: 6, stat: higherMod === strMod ? "strength" : "dexterity", applyBlessCurse: false }) + higherMod;
    let totalDamage = Math.floor(baseDamage * levelScalar);

    // Armor Penetration: Each skill level ignores 1 point of armor (same as Palm Strike)
    const armorIgnore = skillLevel;
    totalDamage += armorIgnore;

    // Armor Penalty: If your armor is NOT cloth, damage reduced by 70%
    if (actor.equipments.body) {
      const armor = bodyRepository[actor.equipments.body];
      if (armor && armor.armorData.armorClass !== ArmorClass.Cloth) {
        totalDamage = Math.floor(totalDamage * 0.3);
      }
    }

    // Physical attacks use DEX for accuracy, with hit bonus
    const hitBonus = skillLevel >= 5 ? 6 : 4;
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({stat: 'dexterity'}) + hitBonus,
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.blunt,
      isMagic: false,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Precision Strike", th: "โจมตีแม่นยำ" },
      damageResult,
    );

    return {
      content: message,
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
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

