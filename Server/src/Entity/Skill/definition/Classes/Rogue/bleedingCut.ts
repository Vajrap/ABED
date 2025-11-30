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
import { statMod } from "src/Utils/statMod";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { roll } from "src/Utils/Dice";

export const bleedingCut = new RogueSkill({
  id: RogueSkillId.BleedingCut,
  name: {
    en: "Bleeding Cut",
    th: "ตัดเลือดไหล",
  },
  description: {
    text: {
      en: "Slice your enemy with a precise cut that leaves them bleeding profusely.\nDeal <FORMULA> slash damage.\nTarget must [r]roll DC{5}'12':'10'{/} ENDsave[/r] or get <DebuffBleed> 1d3 stacks.",
      th: "ตัดศัตรูด้วยการตัดที่แม่นยำ ทำให้เลือดไหลไม่หยุด\nสร้างความเสียหายตัด <FORMULA>\nเป้าหมายต้องทอย [r]ENDsave DC{5}'12':'10'{/}[/r] หรือถูก <DebuffBleed> 1d3 สแตค",
    },
    formula: {
      en: "(<WeaponDamage> + <DEXmod>) × <SkillLevelMultiplier> × <MeleeRangePenalty>",
      th: "(<WeaponDamage> + <DEXmod>) × <SkillLevelMultiplier> × <MeleeRangePenalty>",
    },
  },
  requirement: {},
  equipmentNeeded: ["sword", "dagger", "blade"],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
        {element: 'neutral', value: 1},
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
        {element: 'wind', min: 1, max: 1},
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
          en: `${actor.name.en} tried to use Bleeding Cut but has no target`,
          th: `${actor.name.th} พยายามใช้ตัดเลือดไหลแต่ไม่พบเป้าหมาย`,
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

    // Apply position modifier - must be front-front for full damage
    const positionModifierValue = getPositionModifier(
      actor.position,
      target.position,
      weapon,
    );

    // Add dex mod with skill level scaling
    const dexMod = statMod(actor.attribute.getTotal("dexterity"));
    const levelScalar = skillLevelMultiplier(skillLevel);

    damageOutput.damage = ((damageOutput.damage + dexMod) * levelScalar) * positionModifierValue;
    damageOutput.type = "slash" as any; // Force slash damage type

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Check for bleed application
    const dc = skillLevel >= 5 ? 12 : 10;
    const saveRoll = target.rollSave("endurance");
    let bleedMessage = "";

    if (saveRoll < dc) {
      // Save failed: apply bleed
      const bleedStacks = roll(1).d(3).total;
      debuffsRepository.bleed.appender(target, { turnsAppending: bleedStacks });
      bleedMessage = ` ${target.name.en} failed the save and is bleeding!`;
    }

    return {
      content: {
        en: `${buildCombatMessage(actor, target, { en: "Bleeding Cut", th: "ตัดเลือดไหล" }, damageResult).en}${bleedMessage}`,
        th: `${buildCombatMessage(actor, target, { en: "Bleeding Cut", th: "ตัดเลือดไหล" }, damageResult).th}${bleedMessage ? ` ${target.name.th} ล้มเหลวในการทดสอบและเลือดไหล!` : ""}`,
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

