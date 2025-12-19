import { ClericSkillId } from "src/Entity/Skill/enums";
import { ClericSkill } from ".";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { Character } from "src/Entity/Character/Character";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { ActorEffect, TargetEffect } from "src/Entity/Skill/effects";
import { getTarget } from "src/Entity/Battle/getTarget";
import { statMod } from "src/Utils/statMod";

export const bless = new ClericSkill({
    id: ClericSkillId.Bless,
    name: {
        en: "Bless",
        th: "อวยพร",
    },
    description: {
        text: {
            en: "Ask for the Blessing from Laoh, <BuffBlessing> allies for 2 turns. The number of allies is determined by the actor's Charisma modifier, at least 1 ally.",
            th: "อธิษฐานขอการอวยพรจากลาโอห์ เพื่อนร่วมทีมทั้งหมดได้รับสถานะ '<BuffBlessing>' 2 เทิร์น จำนวนพันธมิตรจะถูกกำหนดโดย modifier ของความสะท้อนตน อย่างน้อย 1 คน",
        },
    },
    requirement: {},
    equipmentNeeded: [],
    tier: TierEnum.common,
    cooldown: 3,
    consume: {
        hp: 0,
        mp: 4,
        sp: 0,
        elements: [
            {element: 'order', value: 1},
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
        // At least 1 ally
        const alliesToBless = getTarget(actor, actorParty, _targetParty, 'ally').many(Math.max(1, Math.floor(statMod(actor.attribute.getTotal("charisma")))))
        
        for (const ally of alliesToBless) {
            buffsRepository[BuffEnum.bless].appender(ally, { turnsAppending: 2 });
        }
        const blessedNames = alliesToBless.map(ally => ally.name.en).join(", ");
        const blessedNamesTh = alliesToBless.map(ally => ally.name.th).join(", ");
        
        return {
            content: {
                en: `${actor.name.en} blessed ${blessedNames} for 2 turns.`,
                th: `${actor.name.th} อวยพร ${blessedNamesTh} เป็นเวลา 2 เทิร์น`,
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