import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ClericSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { rollTwenty, roll } from "src/Utils/Dice";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { ClericSkill } from "./index";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const radiance = new ClericSkill({
  id: ClericSkillId.Radiance,
  name: {
    en: "Radiance",
    th: "รัศมีศักดิ์สิทธิ์",
  },
  description: {
    en: "Unleash a flash of consecrated light dealing 1d6 + willpower modifier, scaled by skill level.",
    th: "ปล่อยแสงศักดิ์สิทธิ์ สร้างความเสียหาย 1d6 + willpower mod และเพิ่มตามเลเวล",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 2,
    sp: 0,
    elements: [],
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
    const target = getTarget(actor, targetParty).one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to cast Radiance but has no target`,
          th: `${actor.name.th} พยายามใช้รัศมีศักดิ์สิทธิ์แต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const willpowerMod = statMod(actor.attribute.getTotal("willpower"));
    const baseRoll = roll(1).d(6).total;
    const totalDamage = Math.max(
      0,
      (baseRoll + willpowerMod) * skillLevelMultiplier(skillLevel),
    );

    const damageOutput = {
      damage: Math.floor(totalDamage),
      hit: rollTwenty().total + statMod(actor.attribute.getTotal("control")),
      crit: rollTwenty().total + statMod(actor.attribute.getTotal("luck")),
      type: DamageType.holy,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    return {
      content: buildCombatMessage(actor, target, { en: "Radiance", th: "รัศมีศักดิ์สิทธิ์" }, damageResult),
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
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
