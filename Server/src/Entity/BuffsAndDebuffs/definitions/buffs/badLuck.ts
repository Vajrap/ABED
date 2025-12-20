import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

const MAX_STACKS = 10;

export const badLuck = new BuffDef({
  name: {
    en: "Bad Luck",
    th: "โชคร้าย",
  },
  description: {
    en: "Bad Luck can stack to the maximum of 10. Used by other Seer skills for various effects.",
    th: "สแต็กโชคร้ายได้สูงสุด 10 สแต็กไม่ลดลงโดยอัตโนมัติ ถูกใช้โดยทักษะ Seer อื่นๆ เพื่อเอฟเฟกต์ต่างๆ",
  },
  formula: "Max stacks = 10",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;

    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.badLuck);
    const totalStacks = value;

    if (!entry) {
      // Cap at MAX_STACKS
      const actualStacks = Math.min(totalStacks, MAX_STACKS);
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.badLuck, {
        value: actualStacks,
        counter: 0,
      });
      return {
        en: `${actor.name.en} gains ${actualStacks} Bad Luck stack(s)${totalStacks > MAX_STACKS ? ` (capped at ${MAX_STACKS})` : ""}`,
        th: `${actor.name.th} ได้รับ ${actualStacks} โชคร้าย${totalStacks > MAX_STACKS ? ` (จำกัดที่ ${MAX_STACKS})` : ""}`,
      };
    } else {
      // Add stacks, cap at MAX_STACKS
      const newTotal = entry.value + totalStacks;
      const actualStacks = Math.min(newTotal, MAX_STACKS);
      const added = actualStacks - entry.value;
      entry.value = actualStacks;

      return {
        en: `${actor.name.en} gains ${added} Bad Luck stack(s) (${actualStacks}/${MAX_STACKS})${newTotal > MAX_STACKS ? ` (capped)` : ""}`,
        th: `${actor.name.th} ได้รับ ${added} โชคร้าย (${actualStacks}/${MAX_STACKS})${newTotal > MAX_STACKS ? ` (จำกัด)` : ""}`,
      };
    }
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    // Bad Luck stacks do not decrease automatically per turn; they persist until consumed by skills
    // Only clean up if value is 0 (e.g., after being consumed by a skill)
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.badLuck);
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.badLuck);
    }

    return {
      canAct: true,
      content: {
        en: ``,
        th: ``,
      },
    };
  },
});

