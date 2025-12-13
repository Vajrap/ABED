/**
 * Lore Content Extraction and Embedding Script
 * 
 * Extracts game lore from definition files and generates embeddings.
 * Stores embeddings in the lore_embeddings table for RAG retrieval.
 */

import { storeLoreContent, createVectorIndex } from "../src/Services/RAGService";
import { regionRepository } from "../src/Entity/Location/Region/repository";
import { locationRepository } from "../src/Entity/Location/Location/repository";
import { getNPCsByLocation } from "../src/Entity/Character/NPCs/repository";
import { LocationsEnum } from "../src/InterFacesEnumsAndTypes/Enums/Location";
import { questDefinitions } from "../src/Entity/Quest/definitions";
import Report from "../src/Utils/Reporter";

/**
 * Extract and embed region descriptions
 */
async function embedRegions(): Promise<void> {
  Report.info("Extracting region descriptions...");
  
  for (const [regionId, region] of Object.entries(regionRepository)) {
    const description = typeof region.description === 'string' 
      ? region.description 
      : region.description?.en || "";
    
    if (description) {
      await storeLoreContent(
        "region",
        regionId,
        description,
        {
          name: typeof region.name === 'string' ? region.name : region.name?.en || regionId,
          source: "region_repository",
        }
      );
      Report.debug("Embedded region", { regionId });
    }
  }
  
  Report.info(`✅ Embedded ${Object.keys(regionRepository).length} regions`);
}

/**
 * Extract and embed location descriptions
 */
async function embedLocations(): Promise<void> {
  Report.info("Extracting location descriptions...");
  
  let count = 0;
  for (const [locationId, location] of Object.entries(locationRepository)) {
    // Locations might not have explicit descriptions, but we can create one from name and context
    const name = typeof location.name === 'string' ? location.name : location.name?.en || locationId;
    const region = regionRepository[location.region];
    const regionName = region.name.en;
    
    // Create a basic description from available info
    const description = `${name} is located in ${regionName}. ${location.subRegion || ""}`;
    
    if (description.trim().length > 10) { // Only store if we have meaningful content
      await storeLoreContent(
        "location",
        locationId,
        description,
        {
          name,
          region: regionName,
          subRegion: location.subRegion,
          source: "location_repository",
        }
      );
      count++;
    }
  }
  
  Report.info(`✅ Embedded ${count} locations`);
}

/**
 * Extract and embed NPC character prompts and backgrounds
 */
async function embedNPCs(): Promise<void> {
  Report.info("Extracting NPC descriptions...");
  
  let count = 0;
  for (const location of Object.values(LocationsEnum)) {
    const npcsByLoc = getNPCsByLocation(location);
    if (!npcsByLoc) continue;
    
    for (const npcParty of npcsByLoc.npcsParty) {
      for (const npcTemplate of npcParty.npcs) {
        // Extract character prompt (most detailed)
        if (npcTemplate.characterPrompt) {
          await storeLoreContent(
            "character",
            npcTemplate.id,
            npcTemplate.characterPrompt,
            {
              name: typeof npcTemplate.name === 'string' ? npcTemplate.name : npcTemplate.name?.en || npcTemplate.id,
              race: npcTemplate.race,
              gender: npcTemplate.gender,
              level: npcTemplate.level,
              background: npcTemplate.background,
              location,
              source: "npc_template",
            }
          );
          count++;
        } else if (npcTemplate.background) {
          // Fallback to background if no prompt
          await storeLoreContent(
            "character",
            npcTemplate.id,
            npcTemplate.background,
            {
              name: typeof npcTemplate.name === 'string' ? npcTemplate.name : npcTemplate.name?.en || npcTemplate.id,
              race: npcTemplate.race,
              location,
              source: "npc_template",
            }
          );
          count++;
        }
      }
    }
  }
  
  Report.info(`✅ Embedded ${count} NPCs`);
}

/**
 * Extract and embed quest descriptions
 */
async function embedQuests(): Promise<void> {
  Report.info("Extracting quest descriptions...");
  
  let count = 0;
  for (const questDef of questDefinitions) {
    // Extract quest description/objective text
    const name = typeof questDef.name === 'string' ? questDef.name : questDef.name?.en || questDef.id;
    const description = typeof questDef.description === 'string' 
      ? questDef.description 
      : questDef.description?.en || "";
   
    
    const combined = `${name}. ${description}`.trim();
    
    if (combined.length > 10) {
      await storeLoreContent(
        "quest",
        questDef.id,
        combined,
        {
          name,
          type: questDef.type,
          tier: questDef.tier,
          source: "quest_definitions",
        }
      );
      count++;
    }
  }
  
  Report.info(`✅ Embedded ${count} quests`);
}

/**
 * Main function to extract and embed all lore content
 */
async function main() {
  try {
    Report.info("🚀 Starting lore content extraction and embedding...");
    
    await embedRegions();
    await embedLocations();
    await embedNPCs();
    await embedQuests();
    
    // Create vector index after all embeddings are stored
    Report.info("Creating vector index...");
    await createVectorIndex();
    
    Report.info("✅ Lore content extraction and embedding complete!");
  } catch (error) {
    Report.error("❌ Error extracting lore content", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.main) {
  main();
}

