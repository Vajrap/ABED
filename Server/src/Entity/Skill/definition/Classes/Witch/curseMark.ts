import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WitchSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { WitchSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { statMod } from "src/Utils/statMod";

export const curseMark = new WitchSkill({
  id: WitchSkillId.CurseMark,
  name: {
    en: "Curse Mark",
    th: "เครื่องหมายคำสาป",
  },
  description: {
    en: "Place a hex sigil on the target, marking them for increased suffering. Target gets Exposed debuff for 2 turns (3 at level 5). Marked enemies take +1d3 damage from all sources. At level 5, also gain -2 to critical defense. Additionally, the Witch gains +INT mod/2 to hit rolls against marked enemies.",
    th: "วางเครื่องหมายคำสาปบนเป้าหมาย ทำให้เป้าหมายได้รับ Exposed debuff 2 เทิร์น (3 เทิร์นที่เลเวล 5) เป้าหมายที่ถูกทำเครื่องหมายจะรับความเสียหายเพิ่ม +1d3 จากทุกแหล่ง ที่เลเวล 5 จะได้รับ -2 ต่อการป้องกันคริติคอล และผู้ใช้จะได้รับ +INT mod/2 ต่อ hit rolls ต่อเป้าหมายที่ถูกทำเครื่องหมาย",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 2,
    sp: 0,
    elements: [
      {
        element: "chaos",
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
        element: "water",
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
          en: `${actor.name.en} tried to use Curse Mark but has no target`,
          th: `${actor.name.th} พยายามใช้เครื่องหมายคำสาปแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Apply Exposed debuff and Hex Mark debuff to target
    const duration = skillLevel >= 5 ? 3 : 2;
    const permValue = skillLevel >= 5 ? 1 : 0; // permValue = 1 means -2 crit defense at level 5
    
    buffsAndDebuffsRepository.exposed.appender(target, duration, false, permValue);
    buffsAndDebuffsRepository.hexMark.appender(target, duration, false, 0);

    // Apply Curse Mark Active buff to user with same duration
    // Store INT mod in permValue for bonus damage calculation
    const intMod = statMod(actor.attribute.getTotal("intelligence"));
    buffsAndDebuffsRepository.curseMarkActive.appender(actor, duration, false, intMod);

    return {
      content: {
        en: `${actor.name.en} places a curse mark on ${target.name.en}! ${target.name.en} is marked and exposed. ${actor.name.en} gains Curse Mark Active for ${duration} turns.`,
        th: `${actor.name.th} วางเครื่องหมายคำสาปบน ${target.name.th}! ${target.name.th} ถูกทำเครื่องหมายและเปิดเผย ${actor.name.th} ได้รับ "เครื่องหมายคำสาปใช้งาน" ${duration} เทิร์น`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
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

