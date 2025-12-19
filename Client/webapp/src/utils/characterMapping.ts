import type { CharacterInterface } from "@/types/api";
import type { CharacterStatsView } from "@/types/game";

export function mapCharacterToMember(
  character: CharacterInterface | null,
  isPlayer: boolean
): CharacterStatsView | null {
  if (!character) return null;
  
  return {
    id: character.id,
    name: character.name,
    gender: character.gender,
    race: character.race,
    type: character.type,
    level: character.level,
    portrait: character.portrait || null,
    background: character.background,
    alignment: character.alignment as any,
    title: character.title,
    possibleEpithets: character.possibleEpithets ? character.possibleEpithets.map(e => String(e)) : [],
    possibleRoles: character.possibleRoles ? character.possibleRoles.map(r => String(r)) : [],
    attributes: character.attributes,
    battleStats: character.battleStats,
    elements: character.elements,
    proficiencies: character.proficiencies,
    artisans: character.artisans,
    vitals: character.vitals ? {
      hp: {
        current: character.vitals.hp.current,
        base: (character.vitals.hp as any).base || 0,
        bonus: (character.vitals.hp as any).bonus || 0,
      },
      mp: {
        current: character.vitals.mp.current,
        base: (character.vitals.mp as any).base || 0,
        bonus: (character.vitals.mp as any).bonus || 0,
      },
      sp: {
        current: character.vitals.sp.current,
        base: (character.vitals.sp as any).base || 0,
        bonus: (character.vitals.sp as any).bonus || 0,
      },
    } : undefined,
    needs: character.needs,
    planarAptitude: character.planarAptitude,
    equipment: character.equipments,
  };
}

export function getPartyMembers(
  party: { characters: (CharacterInterface | null)[]; playerCharacterId: string } | null
): CharacterStatsView[] {
  if (!party) return [];
  
  return party.characters
    .map((char) => {
      const isPlayer = char?.id === party.playerCharacterId;
      return mapCharacterToMember(char, isPlayer);
    })
    .filter((member): member is CharacterStatsView => member !== null);
}

