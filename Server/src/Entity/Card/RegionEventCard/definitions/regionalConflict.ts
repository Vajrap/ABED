import { RegionEventCard } from "../RegionEventCard";
import { RegionEventCardEnum } from "../types";
import { RegionEnum } from "../../../../InterFacesEnumsAndTypes/Enums/Region";
import { createNews, newsArrayToStructure } from "../../../News/News";
import { TierEnum } from "../../../../InterFacesEnumsAndTypes/Tiers";

export const regionalConflict = new RegionEventCard({
  id: RegionEventCardEnum.RegionalConflict,
  globalEventScale: 30,
  targetRegions: [RegionEnum.NorthernReach, RegionEnum.BorealFrost],
  description: "A territorial dispute has escalated into armed conflict between forces in the Northern Reach and Boreal Frost.",
  onDraw: () => {
    const worldNews = createNews({
      scope: {
        kind: "worldScope",
      },
      tokens: [{
        t: "text",
        v: "War has erupted in the northern territories! A territorial dispute between the Northern Reach and Boreal Frost has escalated into open armed conflict."
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
        v: "The Northern Reach mobilizes its forces for war. Settlements fortify their defenses as conflict looms."
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
        v: "Boreal Frost's warriors march southward. The frozen lands echo with war drums and battle cries."
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
});

