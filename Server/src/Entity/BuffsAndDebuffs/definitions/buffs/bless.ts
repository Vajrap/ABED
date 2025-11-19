import { Character } from "src/Entity/Character/Character";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { BuffDef } from "../../type";
import { BuffEnum } from "../../enum";

export const bless = new BuffDef({
    name: {
        en: "bless",
        th: "อวยพร",
    },
    appender: function (actor: Character, value: number): L10N {
        const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.bless);
        if (!entry) {
            actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.bless, {
                value: value,
                isPerm: false,
                permValue: 0,
            });
        } else {
            entry.value += value;
        }
        
        return {
            en: `${actor.name.en} got bless buff: value goes up by ${value}`,
            th: `${actor.name.th} ได้รับ "อวยพร" ${value} หน่วย`,
        };
    },
    
    resolver: function (actor: Character): { canAct: boolean; content: L10N; } {
        const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.bless);
        if (entry) {
            if (entry.value > 0) {
                entry.value -= 1;
            }
        }
        if (entry && entry.value === 0) {
            actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.bless);
        }

        return {
            canAct: true,
            content: {
                en: `${actor.name.en} bless decreased: value goes down by 1`,
                th: `${actor.name.th} "อวยพร" ลดลง 1 หน่วย`,
            },
        };
    }
});