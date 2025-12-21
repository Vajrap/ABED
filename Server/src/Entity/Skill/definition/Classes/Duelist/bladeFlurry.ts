import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DuelistSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { DuelistSkill } from "./index";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const bladeFlurry = new DuelistSkill({
  id: DuelistSkillId.BladeFlurry,
  name: {
    en: "Blade Flurry",
    th: "ชุดการโจมตีดาบ",
  },
  description: {
    text: {
      en: "Unleash a rapid flurry of blade strikes. \nDeal {5}'3':'2'{/} hits of <FORMULA> slash damage. \nTargets can be the same or different.",
      th: "ปล่อยชุดการโจมตีดาบอย่างรวดเร็ว \nสร้างความเสียหาย {5}'3':'2'{/} ครั้ง แต่ละครั้ง <FORMULA> เป็นความเสียหายตัด \nเป้าหมายสามารถเป็นคนเดียวกันหรือต่างกัน",
    },
    formula: {
      en: "([r]0.7[/r] × <WeaponDamage> × <SkillLevelMultiplier>) × <MeleeRangePenalty>",
      th: "([r]0.7[/r] × <WeaponDamage> × <SkillLevelMultiplier>) × <MeleeRangePenalty>",
    },
  },
  requirement: {},
  equipmentNeeded: ["blade", 'sword', 'dagger'],
  tier: TierEnum.uncommon,
  isFallback: false, // BladeFlurry: consumes 1 wind and 1 neutral elements
  consume: {
    hp: 0,
    mp: 0,
    sp: 4,
    elements: [
      {
        element: "wind",
        value: 1,
      },
      {
        element: "neutral",
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
    const weapon = actor.getWeapon();

    const aliveTargets = targetParty.filter(t => !t.vitals.isDead);
    if (aliveTargets.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to use Blade Flurry but has no target`,
          th: `${actor.name.th} พยายามใช้ชุดการโจมตีดาบแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Deal 2 hits (3 at level 5)
    const numHits = skillLevel >= 5 ? 3 : 2;
    const dexMod = statMod(actor.attribute.getTotal("dexterity"));
    const levelScalar = skillLevelMultiplier(skillLevel);

    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    const messages: string[] = [];
    const messagesTh: string[] = [];
    let totalDamageDealt = 0;

    for (let i = 0; i < numHits; i++) {
      // Select target randomly, can repeat
      const randomIndex = Math.floor(Math.random() * aliveTargets.length);
      const target = aliveTargets[randomIndex];
      if (!target) {
        continue;
      }
      
      const positionModifier = getPositionModifier(actor.position, target.position, weapon);
      
      // Get base weapon damage (without attribute mods for the 0.7x calculation)
      const weaponDamageDice = weapon.weaponData.damage.physicalDamageDice;
      // Damage dice - should not get bless/curse
      const weaponRoll = actor.roll({ amount: weaponDamageDice.dice, face: weaponDamageDice.face, applyBlessCurse: false });
      
      // Damage per hit: (0.7× weapon damage + DEX mod) × skill level multiplier
      const baseDamage = (weaponRoll * 0.7) + dexMod;
      const hitDamage = Math.floor(baseDamage * levelScalar * positionModifier);

      // Physical attacks use DEX for hit, LUCK for crit
      const damageOutput = {
        damage: hitDamage,
        hit: actor.rollTwenty({stat: 'dexterity'}),
        crit: actor.rollTwenty({stat: 'luck'}),
        type: DamageType.slash,
        isMagic: false,
      };

      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      totalDamageDealt += damageResult.actualDamage;

      const message = buildCombatMessage(actor, target, { en: "Blade Flurry", th: "ชุดการโจมตีดาบ" }, damageResult);
      messages.push(message.en);
      messagesTh.push(message.th);

      // Add target effect if not already added
      const existingTarget = targetEffects.find(t => t.actorId === target.id);
      if (!existingTarget) {
        targetEffects.push({
          actorId: target.id,
          effect: [TargetEffect.TestSkill],
        });
      }
    }

    return {
      content: {
        en: messages.join(" "),
        th: messagesTh.join(" "),
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: targetEffects,
    };
  },
});

