import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

const MAX_STACKS = 5;

export const edgeCharge = new BuffDef({
  name: {
    en: "Edge Charge",
    th: "ประจุขอบ",
  },
  description: {
    en: "Edge Charge can stack to the maximum of 5. Consumed by skills like EdgeBurst.",
    th: "สแต็กได้สูงสุด 5 สแต็กไม่ลดลงโดยอัตโนมัติและถูกใช้โดยทักษะเช่น EdgeBurst",
  },
  formula: "Max stacks = 5",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.edgeCharge);
    const totalStacks = value;
    
    if (!entry) {
      // Cap at MAX_STACKS
      const actualStacks = Math.min(totalStacks, MAX_STACKS);
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.edgeCharge, {
        value: actualStacks,
        counter: 0,
      });
      return {
        en: `${actor.name.en} gains ${actualStacks} Edge Charge stack(s)${totalStacks > MAX_STACKS ? ` (capped at ${MAX_STACKS})` : ""}`,
        th: `${actor.name.th} ได้รับ ${actualStacks} Edge Charge${totalStacks > MAX_STACKS ? ` (จำกัดที่ ${MAX_STACKS})` : ""}`,
      };
    } else {
      // Add stacks, cap at MAX_STACKS
      const newTotal = entry.value + totalStacks;
      const actualStacks = Math.min(newTotal, MAX_STACKS);
      const added = actualStacks - entry.value;
      entry.value = actualStacks;
      
      return {
        en: `${actor.name.en} gains ${added} Edge Charge stack(s) (${actualStacks}/${MAX_STACKS})${newTotal > MAX_STACKS ? ` (capped)` : ""}`,
        th: `${actor.name.th} ได้รับ ${added} Edge Charge (${actualStacks}/${MAX_STACKS})${newTotal > MAX_STACKS ? ` (จำกัด)` : ""}`,
      };
    }
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    // Edge Charge has no duration limit, so it doesn't decrease
    // It only gets consumed by skills like EdgeBurst
    return {
      canAct: true,
      content: {
        en: `${actor.name.en} maintains Edge Charge`,
        th: `${actor.name.th} รักษา Edge Charge`,
      },
    };
  },
});

