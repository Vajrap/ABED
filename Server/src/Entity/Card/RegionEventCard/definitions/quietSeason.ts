import { RegionEventCard } from "../RegionEventCard";
import { RegionEventCardEnum } from "../types";
import { createNews, newsToStructure } from "../../../News/News";

const description = {
  en: "A peaceful season passes. The lands remain calm and uneventful.",
  th: "ฤดูกาลที่สงบสุข ไร้ซึ่งเหตุการณ์วุ่นวายใด ๆ"
}

export const quietSeason = new RegionEventCard({
  id: RegionEventCardEnum.QuietSeason,
  name: {
    en: "Quiet Season",
    th: "สงบก่อนมรสุม"
  },
  globalEventScale: 0,
  targetRegions: "all",
  description,
  onDraw: () => {
    // No special effects, just a quiet season
    const news = createNews({
      scope: {
        kind: "worldScope",
      },
      context: {
        region: undefined as any,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      },
      content: description
    });

    return newsToStructure(news);
  },
});

