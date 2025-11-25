import { Character } from "src/Entity/Character/Character";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { DebuffDef } from "../../type";
import { DebuffEnum } from "../../enum";

export const cursed = new DebuffDef({
    name: {
        en: "cursed",
        th: "ถูกสาป",
    },
    appender: function (actor: Character, value: number): L10N {
        const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.cursed);
        if (!entry) {
            actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.cursed, {
                value: value,
                isPerm: false,
                permValue: 0,
                counter: 0,
            });
        } else {
            entry.value += value;
        }
        
        return {
            en: `${actor.name.en} got cursed debuff: value goes up by ${value}`,
            th: `${actor.name.th} ได้รับ "ถูกสาป" ${value} หน่วย`,
        };
    },
    
    resolver: function (actor: Character): { canAct: boolean; content: L10N; } {
        const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.cursed);
        if (entry) {
            if (entry.value > 0) {
                entry.value -= 1;
            }
        }
        if (entry && entry.value === 0) {
            actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.cursed);
        }

        return {
            canAct: true,
            content: {
                en: `${actor.name.en} cursed decreased: value goes down by 1`,
                th: `${actor.name.th} "ถูกสาป" ลดลง 1 หน่วย`,
            },
        };
    }
});