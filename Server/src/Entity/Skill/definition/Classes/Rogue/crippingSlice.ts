import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { RogueSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { RogueSkill } from "./index";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const crippingSlice = new RogueSkill({
  id: RogueSkillId.CrippingSlice,
  name: {
    en: "Cripping Slice",
    th: "ตัดขา",
  },
  description: {
    text: {
      en: "Slice to cripple the enemy's movement. Deal <FORMULA> slash damage. Target must [r]roll DC10 ENDsave[/r] or lose 10 AB gauge.",
      th: "ตัดเพื่อทำให้การเคลื่อนไหวของศัตรูเสียหาย สร้างความเสียหายตัด <FORMULA> เป้าหมายต้องทอย [r]ENDsave DC10[/r] หรือเสีย 10 AB gauge",
    },
    formula: {
      en: "<WeaponDamage> × <SkillLevelMultiplier> × <MeleeRangePenalty>",
      th: "<WeaponDamage> × <SkillLevelMultiplier> × <MeleeRangePenalty>",
    },
  },
  requirement: {},
  equipmentNeeded: ["sword", "dagger", "blade"],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [
      { element: "neutral", value: 2 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "wind", min: 1, max: 1 },
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
          en: `${actor.name.en} tried to use Cripping Slice but has no target`,
          th: `${actor.name.th} พยายามใช้ตัดขาแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const type = getWeaponDamageType(weapon.weaponType);
    const damageOutput = getWeaponDamageOutput(actor, weapon, type);

    // Apply position modifier
    const positionModifierValue = getPositionModifier(
      actor.position,
      target.position,
      weapon,
    );

    // Formula: WeaponDamage × SkillLevelMultiplier × PositionModifier
    const levelScalar = skillLevelMultiplier(skillLevel);

    damageOutput.damage = (damageOutput.damage * levelScalar) * positionModifierValue;
    damageOutput.type = "slash" as any; // Force slash damage type

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Check for AB gauge reduction
    let abGaugeMessage = "";
    if (damageResult.isHit) {
      const saveRoll = target.rollSave("endurance");
      if (saveRoll < 10) {
        // Save failed: lose 10 AB gauge
        const initialGauge = target.abGauge;
        target.abGauge = Math.max(0, target.abGauge - 10);
        const reduced = initialGauge - target.abGauge;
        abGaugeMessage = ` ${target.name.en} failed the save and lost ${reduced} AB gauge!`;
      }
    }

    return {
      content: {
        en: `${buildCombatMessage(actor, target, { en: "Cripping Slice", th: "ตัดขา" }, damageResult).en}${abGaugeMessage}`,
        th: `${buildCombatMessage(actor, target, { en: "Cripping Slice", th: "ตัดขา" }, damageResult).th}${abGaugeMessage ? ` ${target.name.th} ล้มเหลวในการทดสอบและเสีย ${abGaugeMessage.match(/\d+/)?.[0] || "10"} AB gauge!` : ""}`,
      },
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

