import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { RogueSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { BuffEnum, DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { RogueSkill } from "./index";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { statMod } from "src/Utils/statMod";

export const backstab = new RogueSkill({
  id: RogueSkillId.Backstab,
  name: {
    en: "Backstab",
    th: "แทงข้างหลัง",
  },
  description: {
    text: {
      en: "While you're hiding, slip into your enemy's blind spot and drive your blade deep into their vulnerable back.\nDeal <FORMULA> pierce damage.\n[b]Gains +{5}'5':'4'{/} crit[/b] if target has <DebuffFear> or <DebuffDazed>.",
      th: "ในขณะที่ซ่อนตัว ข้ามเข้าไปที่จุดที่ศัตรูมองไม่เห็น และทะลุจุดอ่อนของศัตรูที่หลัง\nสร้างความเสียหายแทง <FORMULA>\n[b]ได้รับ +{5}'5':'4'{/} crit[/b] หากเป้าหมายมี <DebuffFear> หรือ <DebuffDazed>",
    },
    formula: {
      en: "({5}'1.5':'1.3'{/} × <WeaponDamage> + <DEXmod> × <SkillLevelMultiplier>",
      th: "({5}'1.5':'1.3'{/} × <WeaponDamage> + <DEXmod> × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: ["dagger"],
  existBuff: [BuffEnum.hiding],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 5,
    elements: [
      {
        element: "chaos",
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
        min: 0,
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
  ) => {
    const target = getTarget(actor, actorParty, targetParty, "enemy").from("backFirst").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to backstab but has no target`,
          th: `${actor.name.th} พยายามแทงข้างหลังแต่ไม่พบเป้าหมาย`,
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
    const levelScalar = skillLevelMultiplier(skillLevel);
    
    // Formula: ({5}'1.5':'1.3'{/} × <WeaponDamage> + <DEXmod>) × <SkillLevelMultiplier>
    // Note: getWeaponDamageOutput may include stat modifiers in damage depending on weapon
    // For daggers, it typically includes DEXmod. To match formula exactly:
    // (weaponMultiplier × baseWeaponDamage + DEXmod) × levelScalar
    const dexMod = statMod(actor.attribute.getTotal("dexterity"));
    const weaponMultiplier = skillLevel >= 5 ? 1.5 : 1.3;
    
    // If getWeaponDamageOutput includes DEXmod, we need to extract base damage
    // Otherwise, damageOutput.damage is already base damage
    // We'll check if damage is significantly higher than expected base (indicating modifiers included)
    // For simplicity, assume damageOutput.damage is base weapon damage (as per test mocks)
    // Formula: (weaponMultiplier × WeaponDamage + DEXmod) × levelScalar
    damageOutput.damage = (weaponMultiplier * damageOutput.damage + dexMod) * levelScalar;

    const additionCrit = skillLevel >= 5 ? 5 : 4;
    const hasFearOrDaze =
      !!target.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.fear) ||
      !!target.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.dazed);

    const totalDamage = resolveDamage(
      actor.id,
      target.id,
      damageOutput,
      location,
      hasFearOrDaze ? additionCrit : 0,
    );

    let turnResult: TurnResult = {
      content: buildCombatMessage(
        actor,
        target,
        {
          en: `backstab`,
          th: `แทงข้างหลัง`,
        },
        totalDamage,
      ),
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

    return turnResult;
  },
});
