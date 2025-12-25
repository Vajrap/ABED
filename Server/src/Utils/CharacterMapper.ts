import type { Character } from "../Entity/Character/Character";
import { type CharacterInterface } from "../InterFacesEnumsAndTypes/CharacterInterface";
import { CharacterType, CharacterAlignmentEnum } from "../InterFacesEnumsAndTypes/Enums";
import { skillRepository } from "../Entity/Skill/repository";
import type { CharacterSkillInterface } from "../InterFacesEnumsAndTypes/CharacterSkillInterface";

// Helper function to extract essential UI values from StatBlock objects
function extractStatValues(stats: any): Record<string, any> {
  // Handle CharacterStatArchetype instances (have toJSON method)
  if (stats && typeof stats === 'object' && typeof stats.toJSON === 'function') {
    stats = stats.toJSON();
  }
  
  // Handle arrays - convert to object if needed
  if (Array.isArray(stats)) {
    const result: Record<string, any> = {};
    stats.forEach((item, index) => {
      result[`item_${index}`] = item;
    });
    return result;
  }
  
  // If it's not an object or is null/undefined, return empty object
  if (!stats || typeof stats !== 'object') {
    return {};
  }

  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(stats)) {
    if (value && typeof value === 'object' && 'total' in value) {
      // StatBlock structure: { base, bonus, battle, exp, total }
      const statValue = value as any;
      result[key] = {
        base: statValue.base || 0,
        bonus: statValue.bonus || 0,
        battle: statValue.battle || 0,
        total: statValue.total || 0,
        exp: statValue.exp || 0
      };
    } else if (value && typeof value === 'object' && 'current' in value) {
      // Vital structure: { base, bonus, current }
      // Max is calculated from base + bonus (not stored)
      const vitalValue = value as any;
      const base = vitalValue.base || 0;
      const bonus = vitalValue.bonus || 0;
      const max = Math.max(1, base + bonus);
      result[key] = {
        base,
        bonus,
        current: vitalValue.current || 0,
        max: vitalValue.max !== undefined ? vitalValue.max : max
      };
    } else {
      result[key] = value;
    }
  }

  return result;
}

// Helper function to extract essential UI values from Map-like objects
function extractMapValues(mapData: any): Record<string, any> {
  if (!mapData) return {};

  // If it's already a plain object, return as is
  if (typeof mapData === 'object' && !Array.isArray(mapData) && !mapData.constructor || mapData.constructor === Object) {
    return mapData;
  }

  // If it's a Map-like structure, convert to object
  if (mapData instanceof Map) {
    const result: Record<string, any> = {};
    for (const [key, value] of mapData) {
      result[key] = value;
    }
    return result;
  }

  return mapData;
}

// Helper function to enrich skills array with consume/produce data from skillRepository
function enrichSkillsWithConsumeProduce(skills: Array<{ id: string; level: number; exp: number }>): CharacterSkillInterface[] {
  return skills.map(skill => {
    const skillDef = skillRepository[skill.id as keyof typeof skillRepository];
    const enriched: CharacterSkillInterface = {
      id: skill.id as any,
      level: skill.level,
      exp: skill.exp,
    };

    if (skillDef) {
      enriched.consume = {
        hp: skillDef.consume.hp,
        mp: skillDef.consume.mp,
        sp: skillDef.consume.sp,
        elements: skillDef.consume.elements.map(e => ({
          element: String(e.element),
          value: e.value,
        })),
      };
      enriched.produce = {
        hp: skillDef.produce.hp,
        mp: skillDef.produce.mp,
        sp: skillDef.produce.sp,
        elements: skillDef.produce.elements.map(e => ({
          element: String(e.element),
          min: e.min,
          max: e.max,
        })),
      };
    }

    return enriched;
  });
}

// Helper function to enrich skills Map with consume/produce data from skillRepository
function enrichSkillsMapWithConsumeProduce(skills: Map<string, any> | Record<string, any>): Record<string, CharacterSkillInterface> {
  const result: Record<string, CharacterSkillInterface> = {};
  
  // Handle Map
  if (skills instanceof Map) {
    for (const [skillId, skillData] of skills.entries()) {
      const skillDef = skillRepository[skillId as keyof typeof skillRepository];
      const enriched: CharacterSkillInterface = {
        id: skillId as any,
        level: skillData?.level || 1,
        exp: skillData?.exp || 0,
      };

      if (skillDef) {
        enriched.consume = {
          hp: skillDef.consume.hp,
          mp: skillDef.consume.mp,
          sp: skillDef.consume.sp,
          elements: skillDef.consume.elements.map(e => ({
            element: String(e.element),
            value: e.value,
          })),
        };
        enriched.produce = {
          hp: skillDef.produce.hp,
          mp: skillDef.produce.mp,
          sp: skillDef.produce.sp,
          elements: skillDef.produce.elements.map(e => ({
            element: String(e.element),
            min: e.min,
            max: e.max,
          })),
        };
      }

      result[skillId] = enriched;
    }
  } else {
    // Handle Record/object
    for (const [skillId, skillData] of Object.entries(skills)) {
      const skillDef = skillRepository[skillId as keyof typeof skillRepository];
      const enriched: CharacterSkillInterface = {
        id: skillId as any,
        level: skillData?.level || 1,
        exp: skillData?.exp || 0,
      };

      if (skillDef) {
        enriched.consume = {
          hp: skillDef.consume.hp,
          mp: skillDef.consume.mp,
          sp: skillDef.consume.sp,
          elements: skillDef.consume.elements.map(e => ({
            element: String(e.element),
            value: e.value,
          })),
        };
        enriched.produce = {
          hp: skillDef.produce.hp,
          mp: skillDef.produce.mp,
          sp: skillDef.produce.sp,
          elements: skillDef.produce.elements.map(e => ({
            element: String(e.element),
            min: e.min,
            max: e.max,
          })),
        };
      }

      result[skillId] = enriched;
    }
  }

  return result;
}

// Map database character to frontend interface
export function mapCharacterToInterface(character: Character): CharacterInterface {
  return {
    id: character.id,
    name: typeof character.name === 'string' ? character.name : (character.name?.en || character.name?.th || ''),
    gender: character.gender as "MALE" | "FEMALE" | "NONE",
    race: typeof character.race === 'string' ? character.race : (character.race ? String(character.race) : ''),
    type: (character.type as CharacterType) || CharacterType.humanoid,
    level: character.level,
    portrait: typeof character.portrait === 'object' && character.portrait !== null 
      ? character.portrait 
      : (character.portrait || ""), // Support both PortraitData and legacy string format
    background: character.background || "",
    alignment: character.alignment.alignment(),

    // Extract essential UI values from complex objects
    // CharacterStatArchetype instances need to be converted to plain objects first
    artisans: extractStatValues(
      character.artisans && typeof (character.artisans as any).toJSON === 'function' 
        ? (character.artisans as any).toJSON() 
        : character.artisans || {}
    ) as any,
    attributes: extractStatValues(
      character.attribute && typeof (character.attribute as any).toJSON === 'function' 
        ? (character.attribute as any).toJSON() 
        : character.attribute || {}
    ) as any, // Note: database uses 'attribute' not 'attributes'
    battleStats: extractStatValues(
      character.battleStats && typeof (character.battleStats as any).toJSON === 'function' 
        ? (character.battleStats as any).toJSON() 
        : character.battleStats || {}
    ) as any,
    elements: extractStatValues(
      character.elements && typeof (character.elements as any).toJSON === 'function' 
        ? (character.elements as any).toJSON() 
        : character.elements || {}
    ) as any,
    proficiencies: extractStatValues(
      character.proficiencies && typeof (character.proficiencies as any).toJSON === 'function' 
        ? (character.proficiencies as any).toJSON() 
        : character.proficiencies || {}
    ) as any,
    needs: (() => {
      // Needs have a special structure - they're 0-100 values
      const needsData = character.needs && typeof (character.needs as any).toJSON === 'function' 
        ? (character.needs as any).toJSON() 
        : character.needs || {};
      const result: Record<string, any> = {};
      for (const [key, value] of Object.entries(needsData)) {
        if (value && typeof value === 'object' && 'current' in value) {
          // CharacterNeed structure: { bonus, current } - max is always 100
          result[key] = {
            current: (value as any).current || 50,
            max: 100,
            bonus: (value as any).bonus || 0,
          };
        } else if (typeof value === 'number') {
          result[key] = {
            current: value,
            max: 100,
            bonus: 0,
          };
        } else {
          result[key] = value;
        }
      }
      return result as any;
    })(),
    vitals: (() => {
      // Vitals have base, bonus, current - max is calculated from base + bonus
      const vitalsData = character.vitals && typeof (character.vitals as any).toJSON === 'function' 
        ? (character.vitals as any).toJSON() 
        : character.vitals || {};
      const result: Record<string, any> = {};
      for (const [key, value] of Object.entries(vitalsData)) {
        if (value && typeof value === 'object' && 'current' in value) {
          // Vital structure: { base, bonus, current } - max = base + bonus
          const base = (value as any).base || 0;
          const bonus = (value as any).bonus || 0;
          const max = Math.max(1, base + bonus);
          result[key] = {
            base,
            bonus,
            current: (value as any).current || 0,
            max: (value as any).max !== undefined ? (value as any).max : max,
          };
        } else {
          result[key] = value;
        }
      }
      return result as any;
    })(),
    fame: extractStatValues(character.fame || {}) as any,
    behavior: {
      battlePolicy: character.behavior.battlePolicy,
      tradePolicy: character.behavior.tradePolicy.engagement,
      craftingPreference: character.behavior.craftingPreference,
      riskTaking: character.behavior.riskTaking,
      travelPace: character.behavior.travelPace,

      eventResponse: character.behavior.eventResponse,
      preferredInnType: character.behavior.preferredInnType,
      useCampSupplies: character.behavior.useCampSupplies,
    },
    title: character.title.string() as any,
    possibleEpithets: character.possibleEpithets || [] as any,
    possibleRoles: character.possibleRoles || [] as any,
    actionSequence: character.actionSequence || {} as any,
    informations: character.information || {} as any,
    skills: enrichSkillsMapWithConsumeProduce(character.skills || new Map()) as any,
    activeSkills: enrichSkillsWithConsumeProduce(character.activeSkills || []) as any,
    conditionalSkills: enrichSkillsWithConsumeProduce(character.conditionalSkills || []) as any,
    conditionalSkillsCondition: character.conditionalSkillsCondition || {} as any,
    breathingSkills: extractMapValues(character.breathingSkills || {}) as any,
    activeBreathingSkill: character.activeBreathingSkill || null as any,
    planarAptitude: extractStatValues(character.planarAptitude || {}) as any,
    relations: extractMapValues(character.relations || {}) as any,
    traits: (character.traits instanceof Map 
      ? Array.from(character.traits.keys()) 
      : (character.traits || [])) as any,
    inventorySize: character.inventorySize || { base: 20, bonus: 0 } as any,
    inventory: extractMapValues(character.inventory || {}) as any,
    equipments: extractMapValues(character.equipments || {}) as any,
  };
}
