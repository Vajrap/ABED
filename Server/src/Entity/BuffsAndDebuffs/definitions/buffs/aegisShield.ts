import type { Character } from "src/Entity/Character/Character";
import { BuffDef } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const aegisShield = new BuffDef({
  name: {
    en: "Aegis Shield",
    th: "โล่ป้องกันศักดิ์สิทธิ์",
  },
  appender: function (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.aegisShield);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.aegisShield, {
        value: value,
        isPerm: isPerm,
        permValue: permValue,
        counter: 0,
      });
    } else {
      if (!entry.isPerm && isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
      entry.permValue += permValue;
    }

    return {
      en: `${actor.name.en} gained ${value} Aegis Shield stack(s)!`,
      th: `${actor.name.th} ได้รับโล่ป้องกันศักดิ์สิทธิ์ ${value} หน่วย!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    // The Aegis Shield from what described, should not be depleted by itself but when being attacked, so the additional of Aegis Pulse should also be calculate during the damageResolver too.
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.aegisShield);
    // Only remove if value is 0 and permValue is 0, but don't add Aegis Pulse here
    // Aegis Pulse is added in damageResolution when shield is depleted by damage
    if (entry && entry.value === 0 && entry.permValue === 0) {
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

