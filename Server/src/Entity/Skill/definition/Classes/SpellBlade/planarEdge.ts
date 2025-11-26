import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SpellBladeSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { getPositionModifier } from "src/Utils/getPositionModifier";
import { statMod } from "src/Utils/statMod";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { SpellBladeSkill } from "./index";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { roll, rollTwenty } from "src/Utils/Dice";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { BareHandId } from "src/Entity/Item/Equipment/Weapon/type";

export const planarEdge = new SpellBladeSkill({
  id: SpellBladeSkillId.PlanarEdge,
  name: {
    en: "Planar Edge",
    th: "ขอบแห่งระนาบ",
  },
  description: {
    en: "Cantrip. Deal arcane damage. If weapon exists: weapon damage + planar mod + edge charge stacks * (1 + 0.1 * skill level). If no weapon: skill level dice (1d6, 1d6, 1d8, 1d8, 2d4 for levels 1-5) + planar mod + edge charge stacks * (1 + 0.1 * skill level). Generates 1 Edge Charge (max 5 stacks).",
    th: "Cantrip สร้างความเสียหายเวท หากมีอาวุธ: ความเสียหายอาวุธ + planar mod + edge charge stacks * (1 + 0.1 * เลเวลสกิล) หากไม่มีอาวุธ: ลูกเต๋าตามเลเวล (1d6, 1d6, 1d8, 1d8, 2d4 สำหรับเลเวล 1-5) + planar mod + edge charge stacks * (1 + 0.1 * เลเวลสกิล) สร้าง Edge Charge 1 หน่วย (สูงสุด 5 หน่วย)",
  },
  requirement: {},
  equipmentNeeded: ["sword", "blade", "dagger", "bareHand"],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "wind", min: 1, max: 1 },
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
          en: `${actor.name.en} tried to use Planar Edge but has no target`,
          th: `${actor.name.th} พยายามใช้ขอบแห่งระนาบแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const isBareHand = weapon.id === BareHandId.BareHand;
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const levelScalar = skillLevelMultiplier(skillLevel);

    // Get Edge Charge stacks
    const edgeChargeEntry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.edgeCharge);
    const edgeChargeStacks = edgeChargeEntry?.value || 0;

    const baseDamage = 
      isBareHand ? 
        skillLevel <= 2 ? roll(1).d(6).total : 
        skillLevel <= 4 ? roll(1).d(8).total : 
        roll(2).d(4).total : 
      roll(weapon.weaponData.damage.magicalDamageDice.dice)
        .d(weapon.weaponData.damage.magicalDamageDice.face).total;
    const hitValue = rollTwenty().total + statMod(actor.attribute.getTotal("dexterity"));
    const critValue = rollTwenty().total + statMod(actor.attribute.getTotal("luck"));

    const rawDamage = baseDamage + planarMod + edgeChargeStacks;
    const scaledDamage = Math.max(0, rawDamage * levelScalar);

    const damageOutput = {
      damage: Math.floor(scaledDamage),
      hit: hitValue,
      crit: critValue,
      type: DamageType.arcane,
      isMagic: true,
    };

    // Apply position modifier (melee)
    const positionModifierValue = getPositionModifier(
      actor.position,
      target.position,
      weapon,
    );
    damageOutput.damage = Math.floor(damageOutput.damage * positionModifierValue);

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Generate 1 Edge Charge
    buffsAndDebuffsRepository.edgeCharge.appender(actor, 1, false, 0);

    return {
      content: buildCombatMessage(
        actor,
        target,
        { en: "Planar Edge", th: "ขอบแห่งระนาบ" },
        damageResult,
      ),
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

