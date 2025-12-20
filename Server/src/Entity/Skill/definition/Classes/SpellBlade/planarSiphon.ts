import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SpellbladeSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { statMod } from "src/Utils/statMod";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { SpellbladeSkill } from "./index";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";

export const planarSiphon = new SpellbladeSkill({
  id: SpellbladeSkillId.PlanarSiphon,
  name: {
    en: "Planar Siphon",
    th: "ดูดพลังระนาบ",
  },
  description: {
    text: {
      en: "Siphon planar energy and mana from enemy casters, draining their magical reserves.\nDeal <FORMULA> arcane damage.\nAdditionally, deal MP damage equal to <FORMULA2>.\nIf enemy's max MP > your max MP, deal additional 1d6 MP damage.",
      th: "ดูดพลังงานระนาบและมานาจากนักเวทศัตรู ทำให้สำรองเวทมนตร์ของพวกเขาหมดลง\nสร้างความเสียหายอาร์เคน <FORMULA>\nนอกจากนี้ สร้างความเสียหาย MP เท่ากับ <FORMULA2>\nหาก max MP ของศัตรู > max MP ของคุณ สร้างความเสียหาย MP เพิ่มเติม 1d6",
    },
    formula: {
      en: "Weapon damage + <PlanarMod> × <SkillLevelMultiplier>",
      th: "ความเสียหายอาวุธ + <PlanarMod> × <SkillLevelMultiplier>",
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
      { element: "chaos", value: 2 },
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
          en: `${actor.name.en} tried to use Planar Siphon but has no target`,
          th: `${actor.name.th} พยายามใช้ดูดพลังระนาบแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const levelScalar = skillLevelMultiplier(skillLevel);

    // HP Damage: Use Planar Edge-like damage (which already includes planar mod via stat roll)
    // But for PlanarSiphon, we use weapon's physical damage dice, not planar edge-like
    // Actually, wait - let me check the enum description again
    // Enum says: "Weapon damage + planar mod × skill level multiplier arcane damage"
    // So we should extract weapon physical dice, roll with planar stat
    
    // Get base weapon physical damage dice
    const weaponDice = weapon.weaponData.damage.physicalDamageDice;
    const baseDamage = actor.roll({
      amount: weaponDice.dice,
      face: weaponDice.face,
      stat: "planar",
      applyBlessCurse: false,
    });
    
    const hpDamage = Math.max(0, baseDamage * levelScalar);

    // Hit/Crit rolls
    const hitValue = actor.rollTwenty({});
    const critValue = actor.rollTwenty({});
    
    const damageOutput = {
      damage: Math.floor(hpDamage),
      hit: hitValue,
      crit: critValue,
      type: DamageType.arcane,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // MP Damage: (1d4 + INT mod + enemy planar mod / 2) × skill level multiplier
    const intMod = statMod(actor.attribute.getTotal("intelligence"));
    const targetPlanarMod = statMod(target.attribute.getTotal("planar"));
    const mpDamageBase = actor.roll({ amount: 1, face: 4, applyBlessCurse: false }) + intMod + Math.floor(targetPlanarMod / 2);
    const mpDamage = Math.max(0, mpDamageBase * levelScalar);

    // Caster Bonus: If enemy's max MP > your max MP, deal additional 1d6 MP damage
    let casterBonusMP = 0;
    if (target.vitals.mp.max > actor.vitals.mp.max) {
      casterBonusMP = actor.roll({ amount: 1, face: 6, applyBlessCurse: false });
    }

    const totalMPDamage = Math.floor(mpDamage) + casterBonusMP;

    // Apply MP damage
    if (damageResult.isHit && totalMPDamage > 0) {
      target.vitals.decMp(totalMPDamage);
    }

    let mpDamageMessage = "";
    if (damageResult.isHit && totalMPDamage > 0) {
      mpDamageMessage = ` ${target.name.en} loses ${totalMPDamage} MP!${casterBonusMP > 0 ? ` (+${casterBonusMP} from caster bonus)` : ""}`;
    }

    return {
      content: {
        en: `${buildCombatMessage(actor, target, { en: "Planar Siphon", th: "ดูดพลังระนาบ" }, damageResult).en}${mpDamageMessage}`,
        th: `${buildCombatMessage(actor, target, { en: "Planar Siphon", th: "ดูดพลังระนาบ" }, damageResult).th}${mpDamageMessage ? ` ${target.name.th} เสีย ${totalMPDamage} MP!${casterBonusMP > 0 ? ` (+${casterBonusMP} จากโบนัสนักเวท)` : ""}` : ""}`,
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

