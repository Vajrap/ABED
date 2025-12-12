import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { NPCsByLocation, NPCsParty, NPCTemplate } from "./types";
import { waywardInnNPCs } from "./definitions/locations/waywardInn/index";
import { createHash } from "crypto";

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


/**
 * Generate deterministic UUID from template ID
 * Must match the same function used in seed-npcs.ts and init.ts
 * Exported for use in seed scripts and initialization
 */
export function generateDeterministicUUID(input: string): string {
  const namespace = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"; // NPC namespace
  
  const hash = createHash("sha256")
    .update(namespace + input)
    .digest("hex");
  
  const hex = hash.substring(0, 32);
  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    "4" + hex.substring(13, 16), // Version 4
    ((parseInt(hex.substring(16, 18), 16) & 0x3f) | 0x80).toString(16).padStart(2, "0") + hex.substring(18, 20), // Variant bits
    hex.substring(20, 32),
  ].join("-");
}

/**
 * Get NPC template by template ID (e.g., "wayward_inn_thomas")
 */
export function getNPCTemplateById(templateId: string): NPCTemplate | null {
  const allTemplates = getAllNPCTemplates();
  return allTemplates.find(t => t.id === templateId) || null;
}

/**
 * Get NPC template by database UUID
 * Converts UUID back to template by checking all templates
 */
export function getNPCTemplateByUUID(uuid: string): NPCTemplate | null {
  const allTemplates = getAllNPCTemplates();
  
  // Check each template to see if its deterministic UUID matches
  for (const template of allTemplates) {
    const templateUUID = generateDeterministicUUID(template.id);
    if (templateUUID === uuid) {
      return template;
    }
  }
  
  return null;
}