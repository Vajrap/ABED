import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { RogueSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { RogueSkill } from "./index";

export const opportunistStrike = new RogueSkill({
  id: RogueSkillId.OpportunistStrike,
  name: {
    en: "Opportunist Strike",
    th: "โจมตีโอกาส",
  },
  description: {
    text: {
      en: "Strike when the enemy is vulnerable. Deal <FORMULA> damage. If target is slower than you, deal additional 1d4 + <DEXmod> damage. {5}Gain +15 AB gauge.",
      th: "โจมตีเมื่อศัตรูอ่อนแอ สร้างความเสียหาย <FORMULA> หากศัตรูช้ากว่าคุณ สร้างความเสียหายเพิ่มเติม 1d4 + <DEXmod> {5}ได้รับ +15 AB gauge",
    },
    formula: {
      en: "<WeaponDamage> (+ 1d4 + <DEXmod> if target is slower)",
      th: "<WeaponDamage> (+ 1d4 + <DEXmod> หากศัตรูช้ากว่า)",
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
      { element: "wind", value: 2 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "neutral", min: 1, max: 1 },
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
          en: `${actor.name.en} tried to use Opportunist Strike but has no target`,
          th: `${actor.name.th} พยายามใช้โจมตีโอกาสแต่ไม่พบเป้าหมาย`,
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

    // Check if target is slower (compare agility)
    const actorAgility = actor.attribute.getTotal("agility");
    const targetAgility = target.attribute.getTotal("agility");
    const isTargetSlower = targetAgility < actorAgility;

    let speedBonusMessage = "";
    if (isTargetSlower) {
      const bonusDamage = actor.roll({ amount: 1, face: 4 });
      damageOutput.damage += bonusDamage;
      speedBonusMessage = ` (Speed bonus: +${bonusDamage})`;
    }

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Level 5: Gain +15 AB gauge
    let abGaugeMessage = "";
    if (skillLevel >= 5) {
      actor.abGauge = Math.min(100, actor.abGauge + 15);
      abGaugeMessage = ` ${actor.name.en} gains +15 AB gauge!`;
    }

    return {
      content: {
        en: `${buildCombatMessage(actor, target, { en: "Opportunist Strike", th: "โจมตีโอกาส" }, damageResult).en}${speedBonusMessage}${abGaugeMessage}`,
        th: `${buildCombatMessage(actor, target, { en: "Opportunist Strike", th: "โจมตีโอกาส" }, damageResult).th}${speedBonusMessage ? ` (โบนัสความเร็ว: +${speedBonusMessage.match(/\d+/)?.[0] || ""})` : ""}${abGaugeMessage ? ` ${actor.name.th} ได้รับ +15 AB gauge!` : ""}`,
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

