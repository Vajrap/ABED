import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WarriorSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { WarriorSkill } from ".";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { statMod } from "src/Utils/statMod";

export const warCry = new WarriorSkill({
  id: WarriorSkillId.WarCry,
  name: {
    en: "War Cry",
    th: "เสียงร้องศึก",
  },
  description: {
    text: {
      en: "Let out a mighty battle cry that inspires you and your allies to fight harder.\nAffects yourself + <LEADmod> closest allies.\nGain <BuffWarCry> for {5}'3':'2'{/} turns.",
      th: "เปล่งเสียงร้องศึกที่ยิ่งใหญ่ที่ปลุกใจคุณและพันธมิตรให้ต่อสู้อย่างหนักขึ้น\nส่งผลต่อตัวเอง + <LEADmod> พันธมิตรที่ใกล้ที่สุด\nได้รับ <BuffWarCry> {5}'3':'2'{/} เทิร์น",
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
      {element: 'fire', value: 2},
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: 'neutral',
        min: 1,
        max: 1,
      }
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const charismaMod = statMod(actor.attribute.getTotal("charisma"));
    const leadershipMod = statMod(actor.attribute.getTotal("leadership"));
    const duration = skillLevel >= 5 ? 3 : 2;
    
    // Calculate buff strength: +2 + leadership mod/2
    // += Cha mod, at least 1
    const buffStrength = Math.max(1, charismaMod);
    
    // Determine which allies are affected: self + charisma mod closest allies
    const numAlliesAffected = Math.max(1, 1 + Math.floor(leadershipMod)); // At least self
    const alliesToAffect = actorParty
      .filter(ally => ally.id !== actor.id && !ally.vitals.isDead)
      .slice(0, numAlliesAffected - 1); // -1 because we're including self
    
    const affectedCharacters = [actor, ...alliesToAffect];
    
    // Apply War Cry buff to affected characters
    // Store buff strength in universalCounter
    for (const character of affectedCharacters) {
      buffsAndDebuffsRepository.warCry.appender(character, { 
        turnsAppending: duration, 
        universalCounter: buffStrength 
      });
    }
    
    const affectedNames = affectedCharacters.map(c => c.name.en).join(", ");
    const affectedNamesTh = affectedCharacters.map(c => c.name.th).join(", ");

    return {
      content: {
        en: `${actor.name.en} lets out a mighty War Cry! ${affectedNames} gain +${buffStrength} agility, +${buffStrength} strength for ${duration} turn(s)!`,
        th: `${actor.name.th} เปล่งเสียงร้องศึก! ${affectedNamesTh} ได้รับ +${buffStrength} agility, +${buffStrength} strength เป็นเวลา ${duration} เทิร์น!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: affectedCharacters.map(char => ({
        actorId: char.id,
        effect: [TargetEffect.TestSkill],
      })),
    };
  },
});

