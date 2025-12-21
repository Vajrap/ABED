import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DruidSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { DruidSkill } from "./index";

export const primalStrike = new DruidSkill({
  id: DruidSkillId.PrimalStrike,
  name: {
    en: "Primal Strike",
    th: "โจมตีดึกดำบรรพ์",
  },
  description: {
    text: {
      en: "Strike with primal ferocity, combining strength and will.\nDeal <FORMULA> nature damage.\nIf used from back row, move to front row first (if available), then deal +1d4 damage first (+1d6 at level 5).",
      th: "โจมตีด้วยความดุร้ายดึกดำบรรพ์ รวมพลังความแข็งแกร่งและความตั้งใจ\nสร้างความเสียหายธรรมชาติ <FORMULA>\nหากใช้จากแถวหลัง ย้ายไปแถวหน้าก่อน (ถ้ามีที่ว่าง) จากนั้นสร้างความเสียหาย +1d4 เพิ่มก่อน (+1d6 ที่เลเวล 5)",
    },
    formula: {
      en: "(Weapon damage without mod + <STRmod> + <WILmod>) × <SkillLevelMultiplier>",
      th: "(ความเสียหายอาวุธโดยไม่มี mod + <STRmod> + <WILmod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  isFallback: false, // Primal Strike: consumes 1 neutral element
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
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
        element: "earth",
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
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();
    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Primal Strike but has no target`,
          th: `${actor.name.th} พยายามใช้โจมตีดึกดำบรรพ์แต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const damageType = getWeaponDamageType(weapon.weaponType);
    // Get base weapon damage without attribute modifiers
    const weaponDamageData = getWeaponDamageOutput(actor, weapon, damageType, false);
    
    const isBackRow = actor.position > 2;
    let moved = false;
    let bonusDamage = 0;

    // Back Row Bonus: If used from back row, move to front row first (if available)
    if (isBackRow) {
      const allOccupiedPositions = actorParty.map((member) => member.position);
      for (const position of [0, 1, 2] as const) {
        if (!allOccupiedPositions.includes(position)) {
          actor.position = position;
          moved = true;
          break;
        }
      }
      
      // If move completed, deal +1d4 damage first (+1d6 at level 5)
      if (moved) {
        const bonusDiceFace = skillLevel >= 5 ? 6 : 4;
        // Bonus damage dice - should not get bless/curse
        bonusDamage = actor.roll({ amount: 1, face: bonusDiceFace, applyBlessCurse: false });
      }
    }

    const strMod = statMod(actor.attribute.getTotal("strength"));
    const willMod = statMod(actor.attribute.getTotal("willpower"));
    const levelScalar = skillLevelMultiplier(skillLevel);
    const positionModifier = getPositionModifier(actor.position, target.position, weapon);

    // Formula: (Weapon damage without mod + STR mod + WIL mod) × skill level multiplier
    let totalDamage = weaponDamageData.damage + strMod + willMod + bonusDamage;
    totalDamage = Math.floor(totalDamage * levelScalar * positionModifier);

    // Nature damage, but uses weapon's hit/crit stats (physical attack)
    const damageOutput = {
      damage: totalDamage,
      hit: weaponDamageData.hit,
      crit: weaponDamageData.crit,
      type: DamageType.nature,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    
    let positionMessage = "";
    if (moved) {
      positionMessage = ` ${actor.name.en} moved to front row and dealt ${bonusDamage} bonus damage!`;
    }

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Primal Strike", th: "โจมตีดึกดำบรรพ์" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${positionMessage}`,
        th: `${message.th}${moved ? ` ${actor.name.th} ย้ายไปแถวหน้าและสร้างความเสียหายโบนัส ${bonusDamage}!` : ""}`,
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

