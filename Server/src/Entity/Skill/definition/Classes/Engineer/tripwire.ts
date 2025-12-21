import { Character } from "src/Entity/Character/Character";
import { EngineerSkill } from ".";
import { EngineerSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ActorEffect } from "src/Entity/Skill/effects";
import { statMod } from "src/Utils/statMod";
import type { TurnResult } from "../../../types";
import { getBattle } from "src/Entity/Battle/BattleContext";

export const tripwire = new EngineerSkill({
  id: EngineerSkillId.Tripwire,
  name: {
    en: "Tripwire",
    th: "สายกับดัก",
  },
  description: {
    text: {
      en: "Set a tripwire on the battlefield. The next time an enemy moves or uses a melee attack, the trap triggers. Target must roll DC10 + DEX mod AGI save or gain Stun debuff for 1 turn (2 turns at level 5). Additionally, deal 1d4 + DEX mod pierce damage.",
      th: "วางสายกับดักบนสนามรบ. ครั้งถัดไปที่ศัตรูเคลื่อนที่หรือใช้การโจมตีระยะประชิด, กับดักจะทำงาน. เป้าหมายต้องทอย DC10 + DEX mod AGI save หรือถูก Stun 1 เทิร์น (2 เทิร์นที่ระดับ 5). นอกจากนี้ สร้างความเสียหายแทง 1d4 + DEX mod",
    },
    formula: {
      en: "1d4 + <DEXmod>",
      th: "1d4 + <DEXmod>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
      { element: "fire", value: 1 },
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
          en: `${user.name.en} tried to set tripwire but is not in battle`,
          th: `${user.name.th} พยายามวางสายกับดักแต่ไม่ได้อยู่ในสนามรบ`,
        },
        actor: {
          actorId: user.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Calculate trap damage: 1d4 + DEX mod
    const dexMod = statMod(user.attribute.getTotal("dexterity"));
    const diceDamage = user.roll({ amount: 1, face: 4, applyBlessCurse: false });
    const trapDamage = diceDamage + dexMod;

    // Calculate save DC: DC10 + DEX mod
    const saveDC = 10 + dexMod;

    // Stun duration: 1 turn (2 turns at level 5)
    const stunDuration = skillLevel >= 5 ? 2 : 1;

    // Determine which party the user belongs to
    const isPartyA = battle.partyA.characters.includes(user);
    const setterPartyId = isPartyA ? "partyA" : "partyB";

    // Add trap to battle's active traps
    // Note: Battle.ts needs to be updated to handle tripwire triggers (moves or melee attacks)
    // and apply save check, damage, and Stun debuff
    battle.activeTraps.push({
      damage: trapDamage,
      setterId: user.id,
      setterPartyId: setterPartyId,
    });

    return {
      content: {
        en: `${user.name.en} sets a tripwire on the battlefield!`,
        th: `${user.name.th} วางสายกับดักบนสนามรบ!`,
      },
      actor: {
        actorId: user.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: [],
    };
  },
  isFallback: false,
});

