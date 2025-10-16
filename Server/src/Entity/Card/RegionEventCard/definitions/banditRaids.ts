import { RegionEventCard } from "../RegionEventCard";
import { RegionEventCardEnum } from "../types";
import { RegionEnum } from "../../../../InterFacesEnumsAndTypes/Enums/Region";
import { createNews, newsArrayToStructure } from "../../../News/News";
import { TierEnum } from "../../../../InterFacesEnumsAndTypes/Tiers";

export const banditRaids = new RegionEventCard({
  id: RegionEventCardEnum.BanditRaids,
  globalEventScale: 20,
  targetRegions: [RegionEnum.EasternFrontier, RegionEnum.WesternForest],
  description: "Organized bandit groups have become bold, raiding settlements in the Eastern Frontier and Western Forest.",
  onDraw: () => {
    const worldNews = createNews({
      scope: {
        kind: "worldScope",
      },
      tokens: [{
        t: "text",
        v: "Reports of organized bandit raids spread across multiple regions. Travelers and merchants should exercise extreme caution!"
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

    const newsEastern = createNews({
      scope: {
        kind: "regionScope",
        region: RegionEnum.EasternFrontier
      },
      tokens: [{
        t: "text",
        v: "Bandit groups have been raiding caravans and small settlements throughout the Eastern Frontier. Local authorities struggle to maintain order."
      }],
      context: {
        region: RegionEnum.EasternFrontier,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      },
      secretTier: TierEnum.common
    });

    const newsWestern = createNews({
      scope: {
        kind: "regionScope",
        region: RegionEnum.WesternForest
      },
      tokens: [{
        t: "text",
        v: "The Western Forest has become increasingly dangerous, with organized bandits using the dense trees as cover for their raids."
      }],
      context: {
        region: RegionEnum.WesternForest,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      },
      secretTier: TierEnum.common
    });

    // Auto-map all news items to their scopes
    return newsArrayToStructure([worldNews, newsEastern, newsWestern]);
  },
});

