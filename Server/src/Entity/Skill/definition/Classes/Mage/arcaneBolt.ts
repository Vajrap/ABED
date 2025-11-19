import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MageSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { roll, rollTwenty } from "src/Utils/Dice";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { MageSkill } from "./index";

export const arcaneBolt = new MageSkill({
  id: MageSkillId.ArcaneBolt,
  name: { en: "Arcane Bolt", th: "ลูกเวทมนตร์" },
  description: {
    en: "Unleash a focused spark of fire toward an enemy. Deals 1d6 + Planar modifier * (1 + Skill Level * 0.1) as Magic damage.",
    th: "ปล่อยประกายไฟพุ่งใส่ศัตรู สร้างความเสียหาย 1d6 + ค่าพลังเวท (Planar) + 0.5×เลเวลสกิล เป็นความเสียหายประเภทไฟ หลังโจมตีโดน ทอย DC 13 เพื่อติดสถานะเผาไหม้ (1–2 สแตค) แก่ศัตรู",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: { hp: 0, mp: 2, sp: 0, elements: [] },
  produce: {
    hp: 0, mp: 0, sp: 0,
    elements: [{ element: "neutral", min: 1, max: 1 }],
  },
  exec: (actor: Character, _ally: Character[], enemies: Character[], skillLevel: number, location: LocationsEnum) => {
    const target = getTarget(actor, enemies).one();
    if (!target) {
      return {
        content: { en: `${actor.name.en} tried to cast Arcane Bolt but has no target`, th: `${actor.name.th} พยายามใช้ลูกเวทมนตร์แต่ไม่พบเป้าหมาย` },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const luckMod = statMod(actor.attribute.getTotal("luck"));
    const baseDiceDamage = roll(1).d(skillLevel === 5 ? 8 : 6).total;
    const totalDamage = Math.max(
      0,
      (baseDiceDamage + planarMod) * skillLevelMultiplier(skillLevel),
    );
    const hitBonus = controlMod;
    const critBonus = luckMod;
    const damageOutput = {
      damage: Math.floor(totalDamage),
      hit: rollTwenty().total + hitBonus,
      crit: rollTwenty().total + critBonus,
      type: DamageType.arcane,
      isMagic: true,
    };
    const totalDamageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    const turnResult: TurnResult = {
      content: {
        en: `${buildCombatMessage(actor, target, { en: `Arcane Bolt`, th: `ลูกเวทมนตร์` }, totalDamageResult).en}`,
        th: `${buildCombatMessage(actor, target, { en: `Arcane Bolt`, th: `ลูกเวทมนตร์` }, totalDamageResult).th}`,
      },
      actor: { actorId: actor.id, effect: [ActorEffect.ArcaneOne] },
      targets: [{ actorId: target.id, effect: [TargetEffect.ArcaneOne] }],
    };
    return turnResult;
  },
});


