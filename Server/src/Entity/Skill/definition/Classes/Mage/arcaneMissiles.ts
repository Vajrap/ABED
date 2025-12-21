import { Character } from "src/Entity/Character/Character";
import { MageSkill } from "./index";
import { MageSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { ActorEffect, TargetEffect } from "../../../effects";
import { getTarget } from "src/Entity/Battle/getTarget";
import type { TurnResult } from "../../../types";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const arcaneMissiles = new MageSkill({
  id: MageSkillId.ArcaneMissiles,
  name: {
    en: "Arcane Missiles",
    th: "มิสไซล์อาร์เคน",
  },
  description: {
    text: {
      en: "Shoot multiple arcane missiles at random targets. Shoot 3 arcane missiles at 3 random targets. At level 5, each missile adds damage based on Arcane Charge stacks.",
      th: "ยิงมิสไซล์อาร์เคนหลายลูกไปที่เป้าหมายสุ่ม. ยิง 3 มิสไซล์อาร์เคนไปที่เป้าหมายสุ่ม 3 คน. ที่ระดับ 5, แต่ละมิสไซล์จะเพิ่มความเสียหายตามสแต็ก Arcane Charge",
    },
    formula: {
      en: "1d4 + <PlanarMod> arcane damage per missile (+Arcane Charge stacks at level 5)",
      th: "1d4 + <PlanarMod> ความเสียหายอาร์เคนต่อมิสไซล์ (+สแต็ก Arcane Charge ที่ระดับ 5)",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 3,
    sp: 0,
    elements: [
      { element: "neutral", value: 1 },
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
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Check if there are any enemies at all
    const firstTarget = getTarget(actor, actorParty, targetParty, "enemy").byPassTaunt().one();
    
    if (!firstTarget) {
      return {
        content: {
          en: `${actor.name.en} tried to cast Arcane Missiles but has no targets`,
          th: `${actor.name.th} พยายามใช้มิสไซล์อาร์เคนแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const planarMod = statMod(actor.attribute.getTotal("planar"));
    
    // Check Arcane Charge stacks for level 5 bonus
    const arcaneChargeEntry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.arcaneCharge);
    const arcaneChargeStacks = arcaneChargeEntry?.value || 0;
    const chargeBonusPerMissile = skillLevel >= 5 ? Math.floor(arcaneChargeStacks) : 0;

    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    const messages: string[] = [];
    let totalDamageDealt = 0;

    // Shoot 3 missiles - each missile independently selects a random target (bypassing taunt)
    // This allows the same target to be hit multiple times
    for (let i = 0; i < 3; i++) {
      // Each missile independently selects a random target, bypassing taunt
      const target = getTarget(actor, actorParty, targetParty, "enemy").byPassTaunt().one();
      
      if (!target) {
        continue; // Skip if no target available
      }
      
      // Calculate damage per missile: 1d4 + planar mod + charge bonus (at level 5)
      // Damage dice - should not get bless/curse
      const diceDamage = actor.roll({ amount: 1, face: 4, applyBlessCurse: false });
      const totalDamage = diceDamage + planarMod + chargeBonusPerMissile;

      // Standard arcane/elemental magic uses CONTROL for hit
      const damageOutput = {
        damage: totalDamage,
        hit: actor.rollTwenty({ stat: "control" }),
        crit: actor.rollTwenty({ stat: "luck" }),
        type: DamageType.arcane,
        isMagic: true,
      };

      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      totalDamageDealt += damageResult.actualDamage;

      const message = buildCombatMessage(
        actor,
        target,
        { en: "Arcane Missile", th: "มิสไซล์อาร์เคน" },
        damageResult,
      );
      messages.push(message.en);

      // Only add target effect once per unique target
      if (!targetEffects.find(t => t.actorId === target.id)) {
        targetEffects.push({
          actorId: target.id,
          effect: [TargetEffect.TestSkill],
        });
      }
    }

    const chargeBonusText = chargeBonusPerMissile > 0 ? ` (with +${chargeBonusPerMissile} from Arcane Charge per missile!)` : "";

    return {
      content: {
        en: `${actor.name.en} casts Arcane Missiles! ${messages.join(" ")}${chargeBonusText}`,
        th: `${actor.name.th} ใช้มิสไซล์อาร์เคน! ${messages.join(" ")}${chargeBonusText ? ` (เพิ่ม ${chargeBonusPerMissile} จาก Arcane Charge ต่อมิสไซล์!)` : ""}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects,
    };
  },
  isFallback: false,
});

