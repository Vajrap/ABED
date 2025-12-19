import { ClericSkillId } from "src/Entity/Skill/enums";
import { ClericSkill } from ".";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { Character } from "src/Entity/Character/Character";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { ActorEffect } from "src/Entity/Skill/effects";

export const holyWater = new ClericSkill({
  id: ClericSkillId.HolyWater,
  name: {
    en: "Holy Water",
    th: "น้ำศักดิ์สิทธิ์",
  },
  description: {
    text: {
      en: "Buff weapon with holy damage for X turns, where X = Faith stacks ({5}'X + 1':'X'{/}). \nWeapon attacks deal additional holy damage. \nConsumes 1 Faith stack after use.",
      th: "เพิ่มพลังอาวุธด้วยความเสียหายศักดิ์สิทธิ์เป็นเวลา X เทิร์น โดย X = จำนวนศรัทธา ({5}'X + 1':'X'{/}) \nการโจมตีด้วยอาวุธสร้างความเสียหายศักดิ์สิทธิ์เพิ่มเติม \nใช้ศรัทธา 1 หลังจากใช้",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  existBuff: [BuffEnum.holyWater],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 4,
    sp: 0,
    elements: [
      { element: "order", value: 2 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ) => {
    // Get Faith stacks
    const faithEntry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.faith);
    const faithStacks = faithEntry?.value || 0;

    if (faithStacks === 0) {
      return {
        content: {
          en: `${actor.name.en} tried to use Holy Water but has no Faith stacks`,
          th: `${actor.name.th} พยายามใช้น้ำศักดิ์สิทธิ์แต่ไม่มีศรัทธา`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Duration: X turns (X + 1 at level 5), where X = Faith stacks
    const duration = skillLevel >= 5 ? faithStacks + 1 : faithStacks;

    // Apply Holy Water buff
    buffsRepository[BuffEnum.holyWater].appender(actor, { turnsAppending: duration });

    // Consume 1 Faith stack
    if (faithEntry && faithEntry.value > 0) {
      faithEntry.value -= 1;
      if (faithEntry.value === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.faith);
      }
    }

    return {
      content: {
        en: `${actor.name.en} blessed their weapon with Holy Water for ${duration} turn(s)!`,
        th: `${actor.name.th} อวยพรอาวุธด้วยน้ำศักดิ์สิทธิ์เป็นเวลา ${duration} เทิร์น!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: [],
    };
  },
});

