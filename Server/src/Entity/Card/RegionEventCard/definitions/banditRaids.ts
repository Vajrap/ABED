import { RegionEventCard } from "../RegionEventCard";
import { RegionEventCardEnum } from "../types";
import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region.ts";
import { createNews, newsArrayToStructure } from "../../../News/News";

const description = {
  en: "Organized bandit groups have become bold, raiding settlements in the Eastern Frontier and Western Forest.",
  th: "กลุ่มโจรเริ่มเหิมเกริม เข้าปล้นสะดมหมู่บ้านทางตะวันออกและตะวันตก"
}

export const banditRaids = new RegionEventCard({
  id: RegionEventCardEnum.BanditRaids,
  name: {
    en: "Bandit Raids",
    th: "โจรร้ายเหิมเกริม"
  },
  globalEventScale: 20,
  targetRegions: [RegionEnum.EasternFrontier, RegionEnum.WesternForest],
  description,
  onDraw: () => {
    const worldNews = createNews({
      scope: {
        kind: "worldScope",
      },
      content: description,
      context: {
        region: undefined as any,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      },
    });

    const newsEastern = createNews({
      scope: {
        kind: "regionScope",
        region: RegionEnum.EasternFrontier
      },
      content: description,
      context: {
        region: RegionEnum.EasternFrontier,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      },
    });

    const newsWestern = createNews({
      scope: {
        kind: "regionScope",
        region: RegionEnum.WesternForest
      },
      content: description,
      context: {
        region: RegionEnum.WesternForest,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      },
    });

    // Auto-map all news items to their scopes
    return newsArrayToStructure([worldNews, newsEastern, newsWestern]);
  },
});

