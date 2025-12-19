import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

const MAX_STACKS = 5;

export const faith = new BuffDef({
  name: {
    en: "Faith",
    th: "ศรัทธา",
  },
  description: {
    en: "Faith can stack to the maximum of 5. Used by Cleric skills to enhance their power.",
    th: "ศรัทธาสามารถสแต็กได้สูงสุด 5 สแต็กไม่ลดลงโดยอัตโนมัติและถูกใช้โดยทักษะของ Cleric เพื่อเพิ่มพลัง",
  },
  formula: "Max stacks = 5",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.faith);
    const totalStacks = value;
    
    if (!entry) {
      // Cap at MAX_STACKS
      const actualStacks = Math.min(totalStacks, MAX_STACKS);
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.faith, {
        value: actualStacks,
        counter: 0,
      });
      return {
        en: `${actor.name.en} gains ${actualStacks} Faith stack(s)${totalStacks > MAX_STACKS ? ` (capped at ${MAX_STACKS})` : ""}`,
        th: `${actor.name.th} ได้รับ ${actualStacks} ศรัทธา${totalStacks > MAX_STACKS ? ` (จำกัดที่ ${MAX_STACKS})` : ""}`,
      };
    } else {
      // Add stacks, cap at MAX_STACKS
      const newTotal = entry.value + totalStacks;
      const actualStacks = Math.min(newTotal, MAX_STACKS);
      const added = actualStacks - entry.value;
      entry.value = actualStacks;
      
      return {
        en: `${actor.name.en} gains ${added} Faith stack(s) (${actualStacks}/${MAX_STACKS})${newTotal > MAX_STACKS ? ` (capped)` : ""}`,
        th: `${actor.name.th} ได้รับ ${added} ศรัทธา (${actualStacks}/${MAX_STACKS})${newTotal > MAX_STACKS ? ` (จำกัด)` : ""}`,
      };
    }
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    // Faith has no duration limit, so it doesn't decrease by itself
    // It only gets consumed by skills like Revive, TurnUndead, HolyWater, DivineStrike
    return {
      canAct: true,
      content: {
        en: ``,
        th: ``,
      },
    };
  },
});

