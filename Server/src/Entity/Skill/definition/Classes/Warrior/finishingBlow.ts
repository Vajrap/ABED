import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WarriorSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { WarriorSkill } from ".";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum, DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { statMod } from "src/Utils/statMod";

export const finishingBlow = new WarriorSkill({
  id: WarriorSkillId.FinishingBlow,
  name: {
    en: "Finishing Blow",
    th: "จบศัตรู",
  },
  description: {
    text: {
      en: "Deliver a devastating finishing strike that exploits enemy weaknesses.\nMust have <BuffChallenger> buff to use this skill.\nDeal <FORMULA> damage.\nChallenged Bonus: If target has <DebuffChallenged> debuff and self has <BuffChallenger> buff, deal additional +50% damage ({5}+75%{/} at level 5) and remove <DebuffChallenged> debuff along with self <BuffChallenger> buff.",
      th: "ส่งการโจมตีจบที่ทำลายล้างที่ใช้ประโยชน์จากจุดอ่อนของศัตรู\nต้องมี <BuffChallenger> buff เพื่อใช้ทักษะนี้\nสร้างความเสียหาย <FORMULA>\nโบนัสท้าทาย: หากเป้าหมายมี <DebuffChallenged> debuff และตัวเองมี <BuffChallenger> buff สร้างความเสียหายเพิ่มเติม +50% ({5}+75%{/} ที่เลเวล 5) และลบ <DebuffChallenged> debuff พร้อมกับ <BuffChallenger> buff ของตัวเอง",
    },
    formula: {
      en: "1.5× <WeaponDamage> + <STRmod> × <SkillLevelMultiplier>",
      th: "1.5× <WeaponDamage> + <STRmod> × <SkillLevelMultiplier>",
    },
  },
  existBuff: [BuffEnum.challenger],
  requirement: {
    
  },
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 0,
    sp: 5,
    elements: [
      { element: "fire", value: 2 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "earth", min: 1, max: 1 },
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
          en: `${actor.name.en} tried to use Finishing Blow but has no target`,
          th: `${actor.name.th} พยายามใช้จบศัตรูแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const damageOutput = getWeaponDamageOutput(actor, weapon, "physical", false); // Get base damage without mods
    const strMod = statMod(actor.attribute.getTotal("strength"));
    const levelScalar = skillLevelMultiplier(skillLevel);
    const positionModifierValue = getPositionModifier(
      actor.position,
      target.position,
      weapon,
    );

    // Base damage: 1.5× weapon damage + STR mod × skill level multiplier
    const baseDamage = (damageOutput.damage * 1.5 + strMod) * levelScalar * positionModifierValue;

    // Check for Challenged bonus
    const challenger = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.challenger);
    const challenged = target.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.challenged);
    const hasChallengedBonus = challenger && challenger.value > 0 && challenged && challenged.value > 0;

    let finalDamage = baseDamage;
    let bonusMessage = "";
    
    if (hasChallengedBonus) {
      // Challenged Bonus: +50% damage (+75% at level 5) and remove buffs/debuffs
      const bonusMultiplier = skillLevel >= 5 ? 1.75 : 1.5;
      finalDamage = Math.floor(baseDamage * bonusMultiplier);
      bonusMessage = ` Challenged bonus!`;
      
      // Remove Challenged debuff and Challenger buff
      target.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.challenged);
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.challenger);
    }

    // Get hit/crit with mods
    const weaponDamageWithMods = getWeaponDamageOutput(actor, weapon, "physical", true);
    
    const finalDamageOutput = {
      damage: Math.floor(finalDamage),
      hit: weaponDamageWithMods.hit,
      crit: weaponDamageWithMods.crit,
      type: damageOutput.type,
      isMagic: false,
    };

    const damageResult = resolveDamage(actor.id, target.id, finalDamageOutput, location);
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Finishing Blow", th: "จบศัตรู" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${bonusMessage}`,
        th: `${message.th}${bonusMessage}`,
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

