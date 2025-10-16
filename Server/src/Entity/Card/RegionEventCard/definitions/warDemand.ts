import { RegionEventCard } from "../RegionEventCard";
import { RegionEventCardEnum } from "../types";
import { RegionEnum } from "../../../../InterFacesEnumsAndTypes/Enums/Region";
import { createNews, newsArrayToStructure } from "../../../News/News";
import { TierEnum } from "../../../../InterFacesEnumsAndTypes/Tiers";
import { market } from "../../../Market/Market";

/**
 * War Demand - Regional conflict drives up weapon/armor prices
 * 
 * Effect: Increases ore and wood prices by 50% in affected regions
 * 
 * This demonstrates:
 * - Region Event Cards can also use market modifiers
 * - Multiple events can stack (Global + Region)
 * - Proper eventId prevents conflicts
 */

export const warDemand = new RegionEventCard({
  id: RegionEventCardEnum.RegionalConflict,
  globalEventScale: 30,
  targetRegions: [RegionEnum.NorthernReach, RegionEnum.BorealFrost],
  description: "War drives up demand for weapons and armor. Ore and wood prices spike.",
  onDraw: () => {
    // Use unique eventId for this specific region event
    // Format: EventType_Region1_Region2
    const eventId = `${RegionEventCardEnum.RegionalConflict}_${RegionEnum.NorthernReach}_${RegionEnum.BorealFrost}`;
    
    // Increase weapon/armor material prices
    market.setEventModifier("ore", 1.5, eventId);
    market.setEventModifier("wood", 1.3, eventId);
    
    const worldNews = createNews({
      scope: {
        kind: "worldScope",
      },
      tokens: [{
        t: "text",
        v: "War in the north drives demand for weapons! Blacksmiths and fletchers struggle to keep up with orders."
      }],
      context: {
        region: undefined as any,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      },
      secretTier: TierEnum.uncommon
    });

    const newsNorthern = createNews({
      scope: {
        kind: "regionScope",
        region: RegionEnum.NorthernReach
      },
      tokens: [{
        t: "text",
        v: "The Northern Reach mobilizes for war. Weapon prices soar as armies prepare for conflict."
      }],
      context: {
        region: RegionEnum.NorthernReach,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      },
      secretTier: TierEnum.uncommon
    });

    const newsBoreal = createNews({
      scope: {
        kind: "regionScope",
        region: RegionEnum.BorealFrost
      },
      tokens: [{
        t: "text",
        v: "Boreal Frost's warriors march southward. Every blacksmith in the frozen lands works day and night."
      }],
      context: {
        region: RegionEnum.BorealFrost,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      },
      secretTier: TierEnum.uncommon
    });

    // Auto-map all news items to their scopes
    return newsArrayToStructure([worldNews, newsNorthern, newsBoreal]);
  },
  
  // Region Event Cards don't have onEnd - they're one-time effects
  // The market modifier stays until manually cleared or another event removes it
  // In a full implementation, you might clear region event modifiers at end of season
});

