import type { Character } from "src/Entity/Character/Character";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { BuffEnum } from "../../enum";
import { BuffDef, type AppenderOptions } from "../../type";

/**
 * Advancing Pace — fuels a knight's momentum. While active:
 * - Always grants +2 Strength.
 * - If applied below skill level 5 (universalCounter = 0), reduces physical & magical defense by 1.
 * - At skill level 5+ (universalCounter = 1), removes the defense penalty and unlocks the "+35% AB speed" bonus handled in battle logic.
 */
export const advancingPace = new BuffDef({
  name: {
    en: "Advancing Pace",
    th: "ก้าวจังหวะรุก",
  },
  description: {
    en: "Always grants +2 Strength. Below skill level 5, reduces physical & magical defense by 1. At skill level 5+ (universalCounter = 1), removes the defense penalty and unlocks +35% AB speed. The skill level indicator is stored in universalCounter and remains constant throughout the buff's duration.",
    th: "ให้ +2 Strength เสมอ ต่ำกว่าระดับทักษะ 5 ลดพลังป้องกันกายภาพและเวทมนตร์ 1 ที่ระดับทักษะ 5+ (universalCounter = 1) ลบโทษป้องกันและปลดล็อก +35% AB speed ตัวบ่งชี้ระดับทักษะถูกเก็บใน universalCounter และคงที่ตลอดระยะเวลาของบัฟ",
  },
  formula: "STR +2; Below level 5: pDEF -1, mDEF -1; Level 5+: +35% AB speed (level indicator in universalCounter)",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const {
      turnsAppending: value,
      universalCounter = 0,
    } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.advancingPace);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.advancingPace, {
        value,
        counter: universalCounter, // Store skill level indicator (0 = below level 5, 1 = level 5+)
      });
      actor.attribute.mutateBattle("strength", 2);
      if (universalCounter === 0) {
        actor.battleStats.mutateBattle("pDEF", -1);
        actor.battleStats.mutateBattle("mDEF", -1);
      }
    } else {
      // Refresh duration & update tier flag
      entry.value = value;
      const previouslyAdvanced = entry.counter > 0;
      entry.counter = universalCounter;
      if (!previouslyAdvanced && universalCounter === 1) {
        // Upgrade from non-advanced to advanced — remove prior DEF penalty
        actor.battleStats.mutateBattle("pDEF", 1);
        actor.battleStats.mutateBattle("mDEF", 1);
      }
    }

    const advanced = universalCounter === 1;
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
      if (entry.counter === 0) {
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

