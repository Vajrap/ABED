import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BarbarianSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { getTarget } from "src/Entity/Battle/getTarget";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BarbarianSkill } from "./index";
import { statMod } from "src/Utils/statMod";
import { roll, rollTwenty } from "src/Utils/Dice";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const earthshatter = new BarbarianSkill({
  id: BarbarianSkillId.Earthshatter,
  name: {
    en: "Earthshatter",
    th: "สั่นสะเทือนพิภพ",
  },
  description: {
    en: "Slam the ground to damage the enemy front line. Deals 1d8 + STR mod (1d10 at level 5) physical damage to each front-row foe. Targets roll DC8 Endurance save or become Dazed for 1 turn.",
    th: "กระแทกพื้นสร้างความเสียหายให้ศัตรูแถวหน้า สร้างความเสียหาย 1d8 + STR mod (1d10 ที่เลเวล 5) ให้ศัตรูแถวหน้าทุกคน เป้าหมายทอย Endurance DC8 ไม่ผ่านจะติด Dazed 1 เทิร์น",
  },
  requirement: {},
  equipmentNeeded: ["sword", "axe", "blade", "hammer", "spear", "bareHand"],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 5,
    elements: [{ element: "fire", value: 2 }],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [{ element: "earth", min: 1, max: 1 }],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const targets = getTarget(actor, actorParty, targetParty, "enemy").from("frontFirst").all();

    if (!targets || targets.length === 0) {
      return {
        content: {
          en: `${actor.name.en} slams the ground but the foe's front line is empty`,
          th: `${actor.name.th} กระแทกพื้นแต่ไม่มีศัตรูแถวหน้า`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const diceFace = skillLevel >= 5 ? 10 : 8;
    const strMod = statMod(actor.attribute.getTotal("strength"));
    const levelScalar = skillLevelMultiplier(skillLevel);
    const dc = 8;

    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    const targetMessagesEn: string[] = [];
    const targetMessagesTh: string[] = [];

    for (const target of targets) {
      const baseDamage = roll(1).d(diceFace).total + strMod;
      const scaledDamage = Math.max(0, baseDamage * levelScalar);

      const damageOutput = {
        damage: Math.floor(scaledDamage),
        hit: rollTwenty().total + statMod(actor.attribute.getTotal("control")),
        crit: rollTwenty().total + statMod(actor.attribute.getTotal("luck")),
        type: DamageType.blunt,
        isMagic: false,
      };

      const result = resolveDamage(actor.id, target.id, damageOutput, location);

      let extraEn = "";
      let extraTh = "";
      const saveRoll = target.rollSave("endurance");
      if (saveRoll < dc) {
        debuffsRepository.dazed.appender(target, 1, false, 0);
        extraEn = " (Dazed!)";
        extraTh = " (มึนงง!)";
      }

      targetMessagesEn.push(`${target.name.en} takes ${result.actualDamage}${extraEn}`);
      targetMessagesTh.push(`${target.name.th} รับ ${result.actualDamage} ความเสียหาย${extraTh}`);

      targetEffects.push({
        actorId: target.id,
        effect: [TargetEffect.TestSkill],
      });
    }

    return {
      content: {
        en: `${actor.name.en} shatters the earth! ${targetMessagesEn.join(" ")}`,
        th: `${actor.name.th} สั่นสะเทือนพื้นดิน! ${targetMessagesTh.join(" ")}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: targetEffects,
    };
  },
});


