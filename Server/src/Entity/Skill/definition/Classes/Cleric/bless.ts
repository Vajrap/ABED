import { ClericSkillId } from "src/Entity/Skill/enums";
import { ClericSkill } from ".";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { Character } from "src/Entity/Character/Character";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { rollTwenty } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";
import { ActorEffect, TargetEffect } from "src/Entity/Skill/effects";

export const bless = new ClericSkill({
    id: ClericSkillId.Bless,
    name: {
        en: "Bless",
        th: "อวยพร",
    },
    description: {
        text: {
            en: "Ask for the Blessing from Laoh, <BuffBlessing> all ally for 2 turns. \n{5}\nThe user [b]throw DC10 + <WILmod>, if success, gain +1 order.[/b]{/}",
            th: "อธิษฐานขอการอวยพรจากลาโอห์ เพื่อนร่วมทีมทั้งหมดได้รับสถานะ '<BuffBlessing>' 2 เทิร์น \n{5}\nหลังจากใช้ ทอย [b]DC10 + <WILmod>[/b] หากผ่านจะได้รับ +1 order{/}",
        },
    },
    requirement: {},
    equipmentNeeded: [],
    tier: TierEnum.uncommon,
    consume: {
        hp: 0,
        mp: 4,
        sp: 0,
        elements: [
            {element: 'order', value: 3},
        ],
    },
    produce: {
        hp: 0,
        mp: 0,
        sp: 0,
        elements: [
            {element: 'neutral', min: 0, max: 1},
        ],
    },
    exec: (
        actor: Character,
        actorParty: Character[],
        _targetParty: Character[],
        skillLevel: number,
        _location: LocationsEnum,
    ) => {
        // Bless affects all allies, charisma enhances the blessing's reach and effectiveness
        const alliesToBless = actorParty.filter(ally => !ally.vitals.isDead);
        
        for (const ally of alliesToBless) {
            buffsRepository[BuffEnum.bless].appender(ally, { turnsAppending: 2 });
        }
        let gainOrder = false;
        if (skillLevel >= 5) {
            if (rollTwenty().total + statMod(actor.attribute.getTotal("willpower")) >= 10) {
                gainOrder = true;
                actor.resources.order += 1;
            }
        }
        const blessedNames = alliesToBless.map(ally => ally.name.en).join(", ");
        const blessedNamesTh = alliesToBless.map(ally => ally.name.th).join(", ");
        
        return {
            content: {
                en: `${actor.name.en} blessed ${blessedNames} for 2 turns.${gainOrder ? ` ${actor.name.en} also gained +1 order` : ""}`,
                th: `${actor.name.th} อวยพร ${blessedNamesTh} เป็นเวลา 2 เทิร์น${gainOrder ? ` ${actor.name.th} ก็ได้รับ +1 order` : ""}`,
            },
            actor: {
                actorId: actor.id,
                effect: [ActorEffect.Cast],
            },
            targets: alliesToBless.map((ally) => ({
                actorId: ally.id,
                effect: [TargetEffect.Bless],
            })),
        };
    },    
})