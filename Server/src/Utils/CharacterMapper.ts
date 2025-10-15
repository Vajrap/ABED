import type { Character } from "../Entity/Character/Character";
import { type CharacterInterface } from "../InterFacesEnumsAndTypes/CharacterInterface";
import { CharacterType, CharacterAlignmentEnum } from "../InterFacesEnumsAndTypes/Enums";

// Helper function to extract essential UI values from StatBlock objects
function extractStatValues(stats: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(stats)) {
    if (value && typeof value === 'object' && 'total' in value) {
      // StatBlock structure: { base, bonus, battle, exp, total }
      result[key] = {
        base: value.base || 0,
        bonus: value.bonus || 0,
        battle: value.battle || 0,
        total: value.total || 0,
        exp: value.exp || 0
      };
    } else if (value && typeof value === 'object' && 'current' in value) {
      // Vital structure: { base, bonus, current, max }
      result[key] = {
        base: value.base || 0,
        bonus: value.bonus || 0,
        current: value.current || 0,
        max: value.max || 0
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

// Map database character to frontend interface
export function mapCharacterToInterface(character: Character): CharacterInterface {
  return {
    id: character.id,
    name: character.name,
    gender: character.gender as "MALE" | "FEMALE" | "NONE",
    race: character.race,
    type: (character.type as CharacterType) || CharacterType.humanoid,
    level: character.level,
    portrait: character.portrait || "",
    background: character.background || "",
    alignment: character.alignment.alignment(),
    
    // Extract essential UI values from complex objects
    artisans: extractStatValues(character.artisans || {}) as any,
    attributes: extractStatValues(character.attribute || {}) as any, // Note: database uses 'attribute' not 'attributes'
    battleStats: extractStatValues(character.battleStats || {}) as any,
    elements: extractStatValues(character.elements || {}) as any,
    proficiencies: extractStatValues(character.proficiencies || {}) as any,
    needs: extractStatValues(character.needs || {}) as any,
    vitals: extractStatValues(character.vitals || {}) as any,
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
    title: character.title.string(),
    possibleEpithets: character.possibleEpithets || [] as any,
    possibleRoles: character.possibleRoles || [] as any,
    actionSequence: character.actionSequence || {} as any,
    informations: character.informations || {} as any,
    skills: extractMapValues(character.skills || {}) as any,
    activeSkills: extractMapValues(character.activeSkills || {}) as any,
    conditionalSkills: extractMapValues(character.conditionalSkills || {}) as any,
    conditionalSkillsCondition: character.conditionalSkillsCondition || {} as any,
    breathingSkills: extractMapValues(character.breathingSkills || {}) as any,
    activeBreathingSkill: character.activeBreathingSkill || null as any,
    planarAptitude: extractStatValues(character.planarAptitude || {}) as any,
    relations: extractMapValues(character.relations || {}) as any,
    traits: character.traits || [] as any,
    inventorySize: character.inventorySize || { base: 20, bonus: 0 } as any,
    inventory: extractMapValues(character.inventory || {}) as any,
    equipments: extractMapValues(character.equipments || {}) as any,
  };
}
