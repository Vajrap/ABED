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
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { roll, rollTwenty } from "src/Utils/Dice";
import { PaladinSkill } from "./index";
import { CharacterType } from "src/InterFacesEnumsAndTypes/Enums";
import type { ProficiencyKey } from "src/InterFacesEnumsAndTypes/Enums";

// Must have any weapon but not bow, orb, wand, book
// So allowed weapons are: bareHand, sword, blade, dagger, spear, axe, hammer, shield, staff
const allowedWeapons: ProficiencyKey[] = [
  "bareHand",
  "sword",
  "blade",
  "dagger",
  "spear",
  "axe",
  "hammer",
  "shield",
  "staff",
];

export const divineStrike = new PaladinSkill({
  id: PaladinSkillId.DivineStrike,
  name: {
    en: "Divine Strike",
    th: "โจมตีศักดิ์สิทธิ์",
  },
  description: {
    en: "A melee attack blessed with holy energy. Deals weapon damage * 1.2 + (STR + WIL mod) * skill level multiplier * position modifier as holy damage. If enemy is undead or fiend, deal additional 1d6 (1d10 at level 5) holy damage.",
    th: "การโจมตีระยะประชิดที่ได้รับพรจากพลังงานศักดิ์สิทธิ์ สร้างความเสียหายอาวุธ * 1.2 + (STR + WIL mod) * skill level multiplier * position modifier เป็นความเสียหายศักดิ์สิทธิ์ หากศัตรูเป็น undead หรือ fiend จะสร้างความเสียหายเพิ่ม 1d6 (1d10 ที่เลเวล 5)",
  },
  requirement: {},
  equipmentNeeded: allowedWeapons,
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [
      {
        element: "neutral",
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
        element: "order",
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
    const target = getTarget(actor, actorParty, targetParty, "enemy")
      .from("frontFirst")
      .one();
    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Divine Strike but has no target`,
          th: `${actor.name.th} พยายามใช้โจมตีศักดิ์สิทธิ์แต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    // Check if weapon is allowed (equipmentNeeded is checked by the system, but double-check here for safety)
    if (!allowedWeapons.includes(weapon.weaponType as ProficiencyKey)) {
      return {
        content: {
          en: `${actor.name.en} cannot use Divine Strike with ${weapon.weaponType}`,
          th: `${actor.name.th} ไม่สามารถใช้โจมตีศักดิ์สิทธิ์ด้วย ${weapon.weaponType}`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const damageType = getWeaponDamageType(weapon.weaponType);
    const damageOutput = getWeaponDamageOutput(actor, weapon, damageType);
    const positionModifier = getPositionModifier(
      actor.position,
      target.position,
      weapon,
    );
    const strMod = statMod(actor.attribute.getTotal("strength"));
    const willMod = statMod(actor.attribute.getTotal("willpower"));
    const levelScalar = skillLevelMultiplier(skillLevel);

    // Deal (weapon damage * 1.2 + (str mod) + (will mod)) * (skill level multiplier) * (position modifier) holy damage
    const holyDamageOutput = {
      damage: Math.floor(
        (damageOutput.damage * 1.2 + strMod + willMod) *
          levelScalar *
          positionModifier,
      ),
      hit: damageOutput.hit,
      crit: damageOutput.crit,
      type: DamageType.holy,
      isMagic: true,
    };

    // If enemy is undead or fiend, deal additional 1d6 (1d10 at lvl5) holy damage
    const isUndeadOrFiend =
      target.type === CharacterType.undead ||
      target.type === CharacterType.fiend;
    if (isUndeadOrFiend) {
      const bonusDice = skillLevel >= 5 ? 10 : 6;
      const bonusDamage = roll(1).d(bonusDice).total;
      holyDamageOutput.damage += bonusDamage;
    }

    holyDamageOutput.damage = Math.floor(holyDamageOutput.damage);
    holyDamageOutput.hit = rollTwenty().total + holyDamageOutput.hit;
    holyDamageOutput.crit = rollTwenty().total + holyDamageOutput.crit;

    const totalDamage = resolveDamage(
      actor.id,
      target.id,
      holyDamageOutput,
      location,
    );
    const message = buildCombatMessage(
      actor,
      target,
      { en: "Divine Strike", th: "โจมตีศักดิ์สิทธิ์" },
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
