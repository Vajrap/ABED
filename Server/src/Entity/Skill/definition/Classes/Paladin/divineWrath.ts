import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { PaladinSkillId } from "../../../enums";
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
import { PaladinSkill } from "./index";
import { CharacterType } from "src/InterFacesEnumsAndTypes/Enums";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const divineWrath = new PaladinSkill({
  id: PaladinSkillId.DivineWrath,
  name: {
    en: "Divine Wrath",
    th: "ความโกรธศักดิ์สิทธิ์",
  },
  description: {
    text: {
      en: "Unleash divine wrath upon your enemies.\nDeal <FORMULA> holy damage to all enemies in front row.\n[r]Enemies who are undead or fiend take +1d6 additional damage[/r].\nEnemies must roll DC10 + WIL mod WIL save or gain Exposed debuff for 2 turns.",
      th: "ปลดปล่อยความโกรธศักดิ์สิทธิ์ต่อศัตรู\nสร้างความเสียหายศักดิ์สิทธิ์ <FORMULA> ให้ศัตรูทั้งหมดในแถวหน้า\n[r]ศัตรูที่เป็น undead หรือ fiend รับความเสียหายเพิ่ม +1d6[/r]\nศัตรูต้องทอยเซฟ WIL DC10 + WIL mod หรือได้รับ debuff Exposed เป็นเวลา 2 เทิร์น",
    },
    formula: {
      en: "(1d8 + <STRmod> + <WILmod>) × <SkillLevelMultiplier>",
      th: "(1d8 + <STRmod> + <WILmod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 0,
    sp: 5,
    elements: [
      {
        element: "order",
        value: 3,
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
    // Get all enemies in front row
    const enemies = getTarget(actor, actorParty, targetParty, "enemy")
      .from("frontOnly")
      .all();

    if (enemies.length === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to use Divine Wrath but has no targets in front row`,
          th: `${actor.name.th} พยายามใช้ความโกรธศักดิ์สิทธิ์แต่ไม่พบเป้าหมายในแถวหน้า`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const strMod = statMod(actor.attribute.getTotal("strength"));
    const willMod = statMod(actor.attribute.getTotal("willpower"));
    const levelScalar = skillLevelMultiplier(skillLevel);
    
    // Base damage: (1d8 + STR mod + WIL mod) × skill level multiplier
    const baseDice = actor.roll({ amount: 1, face: 8 });
    const baseDamageWithMod = baseDice + strMod + willMod;
    const damageAmount = Math.floor(baseDamageWithMod * levelScalar);

    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    let combinedMessage = "";

    // Save DC: 10 + WIL mod
    const saveDC = 10 + willMod;

    for (const enemy of enemies) {
      let enemyDamage = damageAmount;

      // Undead/Fiend Bonus: Enemies who are undead or fiend take +1d6 additional damage
      const isUndeadOrFiend =
        enemy.type === CharacterType.undead ||
        enemy.type === CharacterType.fiend;
      if (isUndeadOrFiend) {
        const bonusDamage = actor.roll({ amount: 1, face: 6, applyBlessCurse: false });
        enemyDamage += bonusDamage;
      }

      const damageOutput = {
        damage: Math.floor(enemyDamage),
        hit: actor.rollTwenty({stat: 'intelligence'}),
        crit: actor.rollTwenty({stat: 'luck'}),
        type: DamageType.radiance,
        isMagic: true,
      };

      const damageResult = resolveDamage(actor.id, enemy.id, damageOutput, location);
      combinedMessage += buildCombatMessage(
        actor,
        enemy,
        { en: "Divine Wrath", th: "ความโกรธศักดิ์สิทธิ์" },
        damageResult,
      ).en + " ";

      // Save: Enemies must roll DC10 + WIL mod WIL save or gain Exposed debuff for 2 turns
      const willSave = enemy.rollSave("willpower");
      if (willSave < saveDC) {
        debuffsRepository.exposed.appender(enemy, { turnsAppending: 2 });
        combinedMessage += `${enemy.name.en} is Exposed! `;
      }

      targetEffects.push({
        actorId: enemy.id,
        effect: [TargetEffect.OrderOne],
      });
    }

    return {
      content: {
        en: `${actor.name.en} unleashed Divine Wrath! ${combinedMessage.trim()}`,
        th: `${actor.name.th} ปล่อยความโกรธศักดิ์สิทธิ์! ${combinedMessage.trim()}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects,
    };
  },
});

