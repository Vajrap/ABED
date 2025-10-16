import { RegionEventCard } from "../RegionEventCard";
import { RegionEventCardEnum } from "../types";
import { createNews, newsToStructure } from "../../../News/News";
import { TierEnum } from "../../../../InterFacesEnumsAndTypes/Tiers";

export const quietSeason = new RegionEventCard({
  id: RegionEventCardEnum.QuietSeason,
  globalEventScale: 0,
  targetRegions: "all",
  description: "A peaceful season passes. The lands remain calm and uneventful.",
  onDraw: () => {
    // No special effects, just a quiet season
    const news = createNews({
      scope: {
        kind: "worldScope",
      },
      tokens: [{
        t: "text",
        v: "A peaceful season passes. The lands remain calm and uneventful."
      }],
      context: {
        region: undefined as any,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      },
      secretTier: TierEnum.common
    });

    return newsToStructure(news);
  },
});

