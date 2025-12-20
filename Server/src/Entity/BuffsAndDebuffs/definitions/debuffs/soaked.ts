import type { Character } from "src/Entity/Character/Character";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

const MAX_STACKS = 5;

export const soaked = new DebuffDef({
  name: {
    en: "Soaked",
    th: "เปียกชุ่ม",
  },
  description: {
    en: "When attacked with lightning, take ×2 damage. Once soaked stacks to 5, take 1d6 true water damage.",
    th: "เมื่อถูกโจมตีด้วยสายฟ้า รับความเสียหาย ×2 เมื่อสแต็กถึง 5 จะรับความเสียหายน้ำแท้ 1d6",
  },
  formula: "Max stacks = 5. ×2 lightning damage. 1d6 true damage at 5 stacks",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.soaked);
    const existingValue = entry?.value || 0;
    const newValue = Math.min(existingValue + value, MAX_STACKS);
    
    if (entry) {
      entry.value = newValue;
    } else {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.soaked, {
        value: newValue,
        counter: 0,
      });
    }

    // If soaked reaches 5 stacks, trigger 1d6 true water damage (deal directly as true damage bypasses mitigation)
    let damageMessageEn = "";
    let damageMessageTh = "";
    if (existingValue < MAX_STACKS && newValue >= MAX_STACKS) {
      const trueDamageAmount = actor.roll({ amount: 1, face: 6, applyBlessCurse: false });
      actor.vitals.decHp(trueDamageAmount);
      damageMessageEn = ` Soaked maxed out! ${actor.name.en} took ${trueDamageAmount} true water damage!`;
      damageMessageTh = ` Soaked เต็ม! ${actor.name.th} รับความเสียหายน้ำแท้ ${trueDamageAmount}!`;
    }

    return {
      en: `${actor.name.en} got Soaked debuff: ${newValue} stack(s)${damageMessageEn}`,
      th: `${actor.name.th} ได้รับ "เปียกชุ่ม" ${newValue} สแต็ก${damageMessageTh}`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.soaked);
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.soaked);
    }
    return {
      canAct: true,
      content: { en: "", th: "" },
    };
  },
});

