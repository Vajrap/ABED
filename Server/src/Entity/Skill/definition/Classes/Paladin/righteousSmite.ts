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
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { PaladinSkill } from "./index";
import { CharacterType } from "src/InterFacesEnumsAndTypes/Enums";
import { getBattleStatistics } from "src/Entity/Battle/BattleContext";

export const righteousSmite = new PaladinSkill({
  id: PaladinSkillId.RighteousSmite,
  name: {
    en: "Righteous Smite",
    th: "ลงโทษอย่างชอบธรรม",
  },
  description: {
    text: {
      en: "Deliver righteous retribution against those who have harmed your allies.\nDeal <FORMULA> holy damage.\n[r]Deal +1d6 holy damage[/r] against undead or fiends.",
      th: "ส่งมอบการลงโทษอย่างชอบธรรมต่อผู้ที่ทำร้ายพันธมิตรของคุณ\nสร้างความเสียหายศักดิ์สิทธิ์ <FORMULA>\n[r]สร้างความเสียหายศักดิ์สิทธิ์เพิ่ม +1d6[/r] ต่อ undead หรือ fiends",
    },
    formula: {
      en: "((<WeaponDamageWithoutAtrMod> × 1.3) + (<STRmod> + <WILmod>)) × <SkillLevelMultiplier>",
      th: "((<WeaponDamageWithoutAtrMod> × 1.3) + (<STRmod> + <WILmod>)) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
      {
        element: "order",
        value: 2,
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
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();
    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Righteous Smite but has no target`,
          th: `${actor.name.th} พยายามใช้ลงโทษอย่างชอบธรรมแต่ไม่พบเป้าหมาย`,
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
    const weaponDamageData = weapon.weaponData.damage;
    // Weapon damage dice - should not get bless/curse
    const weaponDamageRoll = actor.roll({
        amount: weaponDamageData[`${damageType}DamageDice`].dice,
        face: weaponDamageData[`${damageType}DamageDice`].face,
        applyBlessCurse: false,
    })
    const levelScalar = skillLevelMultiplier(skillLevel);
    
    const strMod = statMod(actor.attribute.getTotal("strength"));
    const willMod = statMod(actor.attribute.getTotal("willpower"));
    const combinedMod = strMod + willMod;

    // Base damage: ((weapon damage * 1.3) + (STR+WIL)) * skill level multiplier
    let holyDamage = Math.floor(
      ((weaponDamageRoll * 1.3) + combinedMod) * levelScalar,
    );

    // Undead/Fiend Bonus: If enemy is undead or fiend, deal additional +1d6 holy damage
    const isUndeadOrFiend =
      target.type === CharacterType.undead ||
      target.type === CharacterType.fiend;
    if (isUndeadOrFiend) {
      // Damage dice - don't apply bless/curse
      const bonusDamage = actor.roll({ amount: 1, face: 6, applyBlessCurse: false });
      holyDamage += bonusDamage;
    }

    const holyDamageOutput = {
      damage: Math.floor(holyDamage),
      hit: actor.rollTwenty({stat: 'dexterity'}),
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.radiance,
      isMagic: true,
    };

    const totalDamage = resolveDamage(
      actor.id,
      target.id,
      holyDamageOutput,
      location,
    );
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Righteous Smite", th: "ลงโทษอย่างชอบธรรม" },
      totalDamage,
    );

    return {
      content: message,
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: [
        {
          actorId: target.id,
          effect: [TargetEffect.OrderOne],
        },
      ],
    };
  },
});

