/**
 * TODO: LORE ALIGNMENT - Character Creation Level 1
 * 
 * Current: "Curse Mark" - Uses abstract "hex sigil" concept. Planar energy should manifest
 * in tangible ways, not abstract mystical symbols.
 * 
 * Suggested Changes:
 * - Rename to "Chaos Brand" or "Weakness Mark" or "Vulnerability Mark"
 * - Description: "Mark target with visible chaos energy, exposing physical weaknesses" instead
 *   of abstract "hex sigil"
 * - Frame as tangible chaos energy creating a visible mark/brand on target that exposes
 *   vulnerabilities (like a glowing chaos mark on their armor/skin)
 * - The chaos consumption and water production already exist, emphasize tangible manifestation
 * - Consider: "Chaos Brand" - physically brand target with visible chaos energy that makes
 *   them take more damage (tangible weakness exposure)
 */
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

export const chaosBrand = new WitchSkill({
  id: WitchSkillId.ChaosBrand,
  name: {
    en: "Chaos Brand",
    th: "ประจุวินาที",
  },
  description: {
    text: {
      en: "Brand your enemy with visible chaos energy that exposes their weaknesses for all to see.\nTarget gets <DebuffExposed> for {5}'3':'2'{/} turns.\nMarked enemies take [r]+1d3 damage from all sources[/r].\n{5}\nAlso reduces their [r]critical defense by 2[/r].{/}\n[b]You gain +floor(<INTmod> / 2) hit[/b] against marked enemies.",
      th: "ประทับตราพลังงาน chaos ที่มองเห็นได้บนศัตรู เปิดเผยจุดอ่อนของพวกเขาต่อทุกคน\nเป้าหมายได้รับ <DebuffExposed> {5}'3':'2'{/} เทิร์น\nศัตรูที่ถูกประทับตราจะรับ [r]ความเสียหายเพิ่ม +1d3 จากทุกแหล่ง[/r]\n{5}\nยังลด [r]การป้องกันคริติคอล 2[/r] ด้วย{/}\n[b]คุณได้รับ +floor(<INTmod> / 2) hit[/b] ต่อศัตรูที่ถูกประทับตรา",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  isFallback: false, // ChaosBrand: consumes 1 chaos element
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
    const universalCounter = skillLevel >= 5 ? 1 : 0; // universalCounter = 1 means -2 crit defense at level 5
    
    buffsAndDebuffsRepository.exposed.appender(target, { 
      turnsAppending: duration, 
      universalCounter 
    });
    buffsAndDebuffsRepository.hexMark.appender(target, { turnsAppending: duration });

    // Apply Curse Mark Active buff to user with same duration
    // Store INT mod in universalCounter for bonus damage calculation
    const intMod = statMod(actor.attribute.getTotal("intelligence"));
    buffsAndDebuffsRepository.curseMarkActive.appender(actor, { 
      turnsAppending: duration, 
      universalCounter: intMod 
    });

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

