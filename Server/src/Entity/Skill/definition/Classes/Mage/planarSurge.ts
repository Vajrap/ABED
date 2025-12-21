import type { Character } from "src/Entity/Character/Character";
import { MageSkill } from ".";
import { MageSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { getTarget } from "src/Entity/Battle/getTarget";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const planarSurge = new MageSkill({
  id: MageSkillId.PlanarSurge,
  name: {
    en: "Planar Surge",
    th: "คลื่นพลังระนาบ",
  },
  description: {
    text: {
      en: "Unleash a surge of planar energy across the front line. Deal <FORMULA> arcane damage to all enemies in front row. If arcane charge stacks ≥ 3, deal additional 1d4 damage and remove 3 charges.",
      th: "ปล่อยคลื่นพลังงานระนาบข้ามแถวหน้า สร้างความเสียหายอาร์เคน <FORMULA> ให้ศัตรูทั้งหมดในแถวหน้า หากสแต็ก Arcane Charge ≥ 3 สร้างความเสียหายเพิ่มเติม 1d4 และลบ 3 สแต็ก",
    },
    formula: {
      en: "(1d8 + <PlanarMod>{5}'+2'{/}) × <SkillLevelMultiplier> arcane damage (+1d4 if Arcane Charge ≥ 3)",
      th: "(1d8 + <PlanarMod>{5}'+2'{/}) × <SkillLevelMultiplier> ความเสียหายอาร์เคน (+1d4 หาก Arcane Charge ≥ 3)",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 4,
    sp: 0,
    elements: [
      { element: "neutral", value: 2 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "chaos", min: 1, max: 1 },
    ],
  },
  exec: (
    user: Character,
    userParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Get all enemies in front row
    const frontRowEnemies = getTarget(user, userParty, targetParty, "enemy")
      .from("frontFirst")
      .all();

    if (frontRowEnemies.length === 0) {
      return {
        content: {
          en: `${user.name.en} tried to surge planar energy but found no enemies in the front row!`,
          th: `${user.name.th} พยายามปล่อยคลื่นพลังงานระนาบแต่ไม่พบศัตรูในแถวหน้า!`,
        },
        actor: {
          actorId: user.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Check Arcane Charge stacks
    const arcaneChargeEntry = user.buffsAndDebuffs.buffs.entry.get(BuffEnum.arcaneCharge);
    const arcaneChargeStacks = arcaneChargeEntry?.value || 0;
    const hasChargeBonus = arcaneChargeStacks >= 3;

    // Calculate base damage: 1d8 + planar mod (+2 raw damage at level 5)
    // Damage dice - should not get bless/curse
    const baseDamage = user.roll({ amount: 1, face: 8, stat: "planar", applyBlessCurse: false });
    const level5Bonus = skillLevel >= 5 ? 2 : 0;
    const levelScalar = skillLevelMultiplier(skillLevel);
    const baseTotalDamage = Math.floor((baseDamage + level5Bonus) * levelScalar);

    // Charge bonus: +1d4 damage if charges ≥ 3
    // Damage dice - should not get bless/curse
    let chargeBonusDamage = 0;
    if (hasChargeBonus) {
      chargeBonusDamage = user.roll({ amount: 1, face: 4, applyBlessCurse: false });
    }

    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    let totalDamageDealt = 0;

    // Deal damage to all front row enemies
    // Standard arcane/elemental magic uses CONTROL for hit
    for (const enemy of frontRowEnemies) {
      const totalDamage = baseTotalDamage + chargeBonusDamage;
      const damageOutput = {
        damage: totalDamage,
        hit: user.rollTwenty({stat: 'control'}),
        crit: user.rollTwenty({stat: 'luck'}),
        type: DamageType.arcane,
        isMagic: true,
      };
      const damageResult = resolveDamage(user.id, enemy.id, damageOutput, location);
      totalDamageDealt += damageResult.actualDamage;
      targetEffects.push({ actorId: enemy.id, effect: [TargetEffect.TestSkill] });
    }

    // Consume 3 Arcane Charge stacks if bonus was used
    if (hasChargeBonus && arcaneChargeEntry) {
      arcaneChargeEntry.value = Math.max(0, arcaneChargeEntry.value - 3);
      if (arcaneChargeEntry.value === 0) {
        user.buffsAndDebuffs.buffs.entry.delete(BuffEnum.arcaneCharge);
      }
    }

    const chargeBonusText = hasChargeBonus ? ` (with Arcane Charge bonus!)` : "";

    return {
      content: {
        en: `${user.name.en} unleashed a Planar Surge, dealing ${totalDamageDealt} total arcane damage to ${frontRowEnemies.length} enemy(ies) in the front row!${chargeBonusText}`,
        th: `${user.name.th} ปล่อยคลื่นพลังระนาบ สร้างความเสียหายอาร์เคนรวม ${totalDamageDealt} ให้ ${frontRowEnemies.length} ศัตรูในแถวหน้า!${chargeBonusText}`,
      },
      actor: {
        actorId: user.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects,
    };
  },
});

