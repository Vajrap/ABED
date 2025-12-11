import { Character } from "src/Entity/Character/Character";
import { EngineerSkill } from ".";
import { EngineerSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ActorEffect } from "src/Entity/Skill/effects";
import { statMod } from "src/Utils/statMod";
import type { TurnResult } from "../../../types";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { getBattle } from "src/Entity/Battle/BattleContext";

export const bearTrap = new EngineerSkill({
  id: EngineerSkillId.BearTrap,
  name: {
    en: "Bear Trap",
    th: "กับดักหมี",
  },
  description: {
    text: {
      en: "Set a bear trap on the battlefield. The next time an enemy uses a melee (physical) attack, the trap triggers, dealing <FORMULA> pierce damage and removing the trap.",
      th: "วางกับดักหมีบนสนามรบ. ครั้งถัดไปที่ศัตรูใช้การโจมตีระยะประชิด (กายภาพ), กับดักจะทำงาน สร้างความเสียหายแทง <FORMULA> และลบกับดักออก",
    },
    formula: {
      en: "(1d6 + <DEXmod>) × <SkillLevelMultiplier>",
      th: "(1d6 + <DEXmod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "fire", min: 1, max: 1 },
    ],
  },
  exec: (
    user: Character,
    userParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const battle = getBattle();
    if (!battle) {
      return {
        content: {
          en: `${user.name.en} tried to set bear trap but is not in battle`,
          th: `${user.name.th} พยายามวางกับดักหมีแต่ไม่ได้อยู่ในสนามรบ`,
        },
        actor: {
          actorId: user.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Calculate trap damage: (1d6 + DEX mod) × skillLevelMultiplier
    const dexMod = statMod(user.attribute.getTotal("dexterity"));
    const diceDamage = user.roll({ amount: 1, face: 6, applyBlessCurse: false });
    const levelScalar = skillLevelMultiplier(skillLevel);
    const trapDamage = Math.floor((diceDamage + dexMod) * levelScalar);

    // Determine which party the user belongs to
    const isPartyA = battle.partyA.characters.includes(user);
    const setterPartyId = isPartyA ? "partyA" : "partyB";

    // Add trap to battle's active traps
    battle.activeTraps.push({
      damage: trapDamage,
      setterId: user.id,
      setterPartyId: setterPartyId,
    });

    return {
      content: {
        en: `${user.name.en} sets a bear trap on the battlefield!`,
        th: `${user.name.th} วางกับดักหมีบนสนามรบ!`,
      },
      actor: {
        actorId: user.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: [],
    };
  },
});

