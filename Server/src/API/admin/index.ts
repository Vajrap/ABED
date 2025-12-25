/**
 * Admin API Routes
 * 
 * Administrative endpoints for maintenance and management tasks.
 * Currently protected by environment variable ADMIN_SECRET.
 */

import { Elysia, t } from "elysia";
import Report from "../../Utils/Reporter";
import { SessionService } from "../../Services/SessionService";
import { storeLoreContent, createVectorIndex } from "../../Services/RAGService";
import { regionRepository, locationRepository } from "../../Entity/Location/repository";
import { getNPCsByLocation } from "../../Entity/Character/NPCs/repository";
import { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import { questDefinitions } from "../../Entity/Quest/definitions";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "change-me-in-production";

/**
 * Check if request is from admin
 * Currently uses ADMIN_SECRET header, but can be extended to check user tier
 */
function isAdminRequest(headers: Record<string, string | undefined>): boolean {
  const adminSecret = headers["x-admin-secret"];
  return adminSecret === ADMIN_SECRET;
}

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
    const name = typeof location.name === 'string' ? location.name : location.name?.en || locationId;
    const region = regionRepository[location.region];
    const regionName = region.name.en;
    
    const description = `${name} is located in ${regionName}. ${location.subRegion || ""}`;
    
    if (description.trim().length > 10) {
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

export const adminRoutes = new Elysia({ prefix: "/admin" })
  .onError(({ code, error, set }) => {
    Report.error("Admin route error", {
      code,
      error: error instanceof Error ? error.message : String(error),
    });
    set.status = 500;
    return { success: false, error: "Internal server error" };
  })
  /**
   * POST /api/admin/embed-lore
   * Trigger lore content embedding generation
   * Requires X-Admin-Secret header
   */
  .post(
    "/embed-lore",
    async ({ headers, set }) => {
      try {
        // Check admin authentication
        if (!isAdminRequest(headers)) {
          set.status = 401;
          return { 
            success: false, 
            error: "Unauthorized. Admin secret required." 
          };
        }

        Report.info("🚀 Admin triggered lore content embedding...");
        
        await embedRegions();
        await embedLocations();
        await embedNPCs();
        await embedQuests();
        
        // Create vector index after all embeddings are stored
        Report.info("Creating vector index...");
        await createVectorIndex();
        
        Report.info("✅ Lore content embedding complete!");
        
        return {
          success: true,
          message: "Lore content embedding completed successfully",
        };
      } catch (error) {
        Report.error("Error embedding lore content", {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        });
        set.status = 500;
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    }
  )
  /**
   * GET /api/admin/health
   * Admin health check endpoint
   */
  .get("/health", () => {
    return {
      success: true,
      message: "Admin API is running",
      timestamp: new Date().toISOString(),
    };
  });

