import type { Character } from "src/Entity/Character/Character";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { BuffEnum } from "../../enum";
import { BuffDef } from "../../type";

/**
 * Advancing Pace — fuels a knight's momentum. While active:
 * - Always grants +2 Strength.
 * - If applied below skill level 5, reduces physical & magical defense by 1.
 * - At skill level 5+ (permValue = 1), removes the defense penalty and unlocks the “+35% AB speed” bonus handled in battle logic.
 */
export const advancingPace = new BuffDef({
  name: {
    en: "Advancing Pace",
    th: "ก้าวจังหวะรุก",
  },
  appender: function (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.advancingPace);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.advancingPace, {
        value,
        isPerm,
        permValue,
      });
      actor.attribute.mutateBattle("strength", 2);
      if (permValue === 0) {
        actor.battleStats.mutateBattle("pDEF", -1);
        actor.battleStats.mutateBattle("mDEF", -1);
      }
    } else {
      // Refresh duration & update tier flag
      entry.value = value;
      entry.isPerm = entry.isPerm || isPerm;
      const previouslyAdvanced = entry.permValue > 0;
      entry.permValue = permValue;
      if (!previouslyAdvanced && permValue === 1) {
        // Upgrade from non-advanced to advanced — remove prior DEF penalty
        actor.battleStats.mutateBattle("pDEF", 1);
        actor.battleStats.mutateBattle("mDEF", 1);
      }
    }

    const advanced = permValue === 1;
    return {
      en: `${actor.name.en} maintains an Advancing Pace${advanced ? " (enhanced)" : ""}.`,
      th: `${actor.name.th} รักษาจังหวะบุกไว้${advanced ? " (ขั้นสูง)" : ""}`,
    };
  },
  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.advancingPace);
    if (!entry) {
      return {
        canAct: true,
        content: {
          en: `${actor.name.en} feels steady.`,
          th: `${actor.name.th} ยังเคลื่อนไหวมั่นคง`,
        },
      };
    }

    if (entry.value > 0) {
      entry.value = Math.max(0, entry.value - 1);
    }

    let removed = false;
    if (entry.value === 0) {
      // Remove stat changes
      actor.attribute.mutateBattle("strength", -2);
      if (entry.permValue === 0) {
        actor.battleStats.mutateBattle("pDEF", 1);
        actor.battleStats.mutateBattle("mDEF", 1);
      }
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.advancingPace);
      removed = true;
    }

    return {
      canAct: true,
      content: {
        en: removed
          ? `${actor.name.en}'s Advancing Pace fades.`
          : `${actor.name.en} keeps up the momentum.`,
        th: removed
          ? `ผลของ "ก้าวจังหวะรุก" ของ ${actor.name.th} จางหาย`
          : `${actor.name.th} ยังรักษาจังหวะบุกอยู่`,
      },
    };
  },
});

