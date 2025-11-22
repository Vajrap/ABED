import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DuelistSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { DuelistSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const parryRiposte = new DuelistSkill({
  id: DuelistSkillId.ParryRiposte,
  name: {
    en: "Parry & Riposte",
    th: "ปัดป้องและตอบโต้",
  },
  description: {
    en: "Assume a defensive stance, ready to parry and counter. Gain Parry buff for 1 turn (2 turns at level 5). When attacked, roll DC10 control save. If passed, negate the attack and deal 1d6 + DEX mod * (1 + 0.1 * skill level) slash damage back to the attacker. Then remove Parry buff.",
    th: "ใช้ท่าป้องกัน พร้อมปัดป้องและตอบโต้ ได้รับบัฟ Parry 1 เทิร์น (2 เทิร์นที่เลเวล 5) เมื่อถูกโจมตี ให้ทอย control save DC10 + control mod หากสำเร็จ จะยกเลิกการโจมตีและสร้างความเสียหาย 1d6 + DEX mod * (1 + 0.1 * เลเวลสกิล) ต่อผู้โจมตี แล้วลบบัฟ Parry",
  },
  requirement: {},
  equipmentNeeded: ["blade"],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [
      {
        element: "wind",
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
        element: "fire",
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
    const weapon = actor.getWeapon();
    if (weapon.weaponType !== "blade") {
      return {
        content: {
          en: `${actor.name.en} must equip a blade to use Parry & Riposte`,
          th: `${actor.name.th} ต้องใช้อาวุธประเภทดาบเพื่อใช้ปัดป้องและตอบโต้`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Apply Parry buff for 1 turn (2 turns at level 5)
    const duration = skillLevel >= 5 ? 2 : 1;
    // Store skill level in permValue for damage calculation
    buffsAndDebuffsRepository.parry.appender(actor, duration, false, skillLevel);

    return {
      content: {
        en: `${actor.name.en} assumes a defensive stance, ready to parry and counter!${skillLevel >= 5 ? ` (${duration} turns)` : ""}`,
        th: `${actor.name.th} ใช้ท่าป้องกัน พร้อมปัดป้องและตอบโต้!${skillLevel >= 5 ? ` (${duration} เทิร์น)` : ""}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: [],
    };
  },
});

