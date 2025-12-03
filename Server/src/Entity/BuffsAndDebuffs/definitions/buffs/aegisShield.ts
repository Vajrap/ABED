import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const aegisShield = new BuffDef({
  name: {
    en: "Aegis Shield",
    th: "โล่ป้องกันศักดิ์สิทธิ์",
  },
  description: {
    en: "A protective shield that absorbs damage. The shield value doesn't decrease automatically but is depleted when taking damage. When the shield is depleted by damage, Aegis Pulse is added.",
    th: "โล่ป้องกันที่ดูดซับความเสียหาย ค่าโล่ไม่ลดลงโดยอัตโนมัติแต่จะหมดลงเมื่อรับความเสียหาย เมื่อโล่หมดลงจากความเสียหาย Aegis Pulse จะถูกเพิ่ม",
  },
  formula: "Shield value depleted by damage (not by time); Aegis Pulse added when shield depleted",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.aegisShield);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.aegisShield, {
        value: value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} gained ${value} Aegis Shield stack(s)!`,
      th: `${actor.name.th} ได้รับโล่ป้องกันศักดิ์สิทธิ์ ${value} หน่วย!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    // The Aegis Shield from what described, should not be depleted by itself but when being attacked, so the additional of Aegis Pulse should also be calculate during the damageResolver too.
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.aegisShield);
    // Only remove if value is 0, but don't add Aegis Pulse here
    // Aegis Pulse is added in damageResolution when shield is depleted by damage
    if (entry && entry.value === 0 ) {
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.aegisShield);
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

