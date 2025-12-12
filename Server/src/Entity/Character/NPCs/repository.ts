import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { NPCsByLocation, NPCsParty, NPCTemplate } from "./types";
import { waywardInnNPCs } from "./definitions/locations/waywardInn/index";

export const npcsByLocRepository: Record<LocationsEnum, NPCsByLocation> = {
  [LocationsEnum.WaywardInn]: waywardInnNPCs,
};

/**
 * Get NPCs definition for a specific location
 */
export function getNPCsByLocation(location: LocationsEnum): NPCsByLocation | null {
  return npcsByLocRepository[location] || null;
}

/**
 * Get all NPC party definitions for a specific location
 */
export function getNPCsPartiesForLocation(location: LocationsEnum): NPCsParty[] {
  const npcsByLoc = getNPCsByLocation(location);
  return npcsByLoc?.npcsParty || [];
}

/**
 * Get all NPC templates for a specific location (flattened from parties)
 */
export function getNPCTemplatesForLocation(location: LocationsEnum): NPCTemplate[] {
  const parties = getNPCsPartiesForLocation(location);
  return parties.flatMap(party => party.npcs);
}

/**
 * Get all NPC templates from all locations
 */
export function getAllNPCTemplates(): NPCTemplate[] {
  const allTemplates: NPCTemplate[] = [];
  for (const location of Object.values(LocationsEnum)) {
    allTemplates.push(...getNPCTemplatesForLocation(location));
  }
  return allTemplates;
}
