import type { Character } from "src/Entity/Character/Character";
import { KnightSkill } from "./index";
import { KnightSkillId } from "../../../enums";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { statMod } from "src/Utils/statMod";
import { getTarget } from "src/Entity/Battle/getTarget";

export const tacticalCommand = new KnightSkill({
  id: KnightSkillId.TacticalCommand,
  name: {
    en: "Tactical Command",
    th: "คำสั่งยุทธวิธี",
  },
  description: {
    text: {
      en: "Issue a tactical command that hastens your allies.\nTarget: 1d2 + <LEADmod> allies.\nGrant <BuffHaste> for {5}3:2{/} turns.\n{5}Also grant +5 AB gauge immediately.{/}",
      th: "ออกคำสั่งยุทธวิธีที่เร่งความเร็วพันธมิตรของคุณ\nเป้าหมาย: 1d2 + <LEADmod> พันธมิตร\nให้ <BuffHaste> {5}3:2{/} เทิร์น\n{5}ยังให้ +5 AB gauge ทันที{/}",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 4,
    elements: [
      {
        element: "neutral",
        value: 2,
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
    _location: LocationsEnum,
  ): TurnResult => {
    const leadershipMod = statMod(actor.attribute.getTotal("leadership"));
    // Random selection - should not get bless/curse
    const numTargets = actor.roll({ amount: 1, face: 2, applyBlessCurse: false }) + leadershipMod;
    const duration = skillLevel >= 5 ? 3 : 2;

    // Get allies excluding self and dead ones
    const availableAllies = actorParty.filter(
      (ally) => ally.id !== actor.id && !ally.vitals.isDead,
    );

    // Select up to numTargets allies
    const selectedAllies = availableAllies.slice(0, Math.max(1, numTargets));

    // Apply Haste buff to selected allies
    for (const ally of selectedAllies) {
      buffsRepository.haste.appender(ally, { turnsAppending: duration });

      // Level 5: Grant +5 AB gauge immediately
      if (skillLevel >= 5) {
        ally.abGauge = Math.min(100, ally.abGauge + 5);
      }
    }

    const allyNames = selectedAllies.map((ally) => ally.name.en).join(", ");
    const allyNamesTh = selectedAllies.map((ally) => ally.name.th).join(", ");

    return {
      content: {
        en: `${actor.name.en} issues a tactical command! ${allyNames} gain Haste for ${duration} turn(s)${skillLevel >= 5 ? " and +5 AB gauge" : ""}!`,
        th: `${actor.name.th} ออกคำสั่งยุทธวิธี! ${allyNamesTh} ได้รับ Haste เป็นเวลา ${duration} เทิร์น${skillLevel >= 5 ? " และ +5 AB gauge" : ""}!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: selectedAllies.map((ally) => ({
        actorId: ally.id,
        effect: [TargetEffect.Haste],
      })),
    };
  },
});

