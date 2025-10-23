import { Character } from "src/Entity/Character/Character";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { BuffsAndDebuffsDef } from "../type";
import { BuffsAndDebuffsEnum } from "../enum";

export const taunt: BuffsAndDebuffsDef = {
    name: {
        en: "taunt",
        th: "ยั่วยุ",
    },
    appender: function (actor: Character, value: number): L10N {
        const entry = actor.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.taunt);
        if (!entry) {
            actor.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.taunt, {
                value: value,
                isPerm: false,
                permValue: 0,
            });
        } else {
            entry.value += value;
        }
        
        return {
            en: `${actor.name.en} got taunt buff: value goes up by ${value}`,
            th: `${actor.name.th} ได้รับ "ยั่วยุ" ${value} หน่วย`,
        };
    },
    
    resolver: function (actor: Character): { canAct: boolean; content: L10N; } {
        const entry = actor.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.taunt);
        if (entry) {
            if (entry.value > 0) {
                entry.value -= 1;
            }
        }
        if (entry && entry.value === 0) {
            actor.buffsAndDebuffs.entry.delete(BuffsAndDebuffsEnum.taunt);
        }

        return {
            canAct: true,
            content: {
                en: `${actor.name.en} taunt decreased: value goes down by 1`,
                th: `${actor.name.th} "ยั่วยุ" ลดลง 1 หน่วย`,
            },
        };
    }
}