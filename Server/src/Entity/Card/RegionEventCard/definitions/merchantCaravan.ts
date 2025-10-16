import { RegionEventCard } from "../RegionEventCard";
import { RegionEventCardEnum } from "../types";
import { RegionEnum } from "../../../../InterFacesEnumsAndTypes/Enums/Region";
import { createNews, newsArrayToStructure } from "../../../News/News";
import { TierEnum } from "../../../../InterFacesEnumsAndTypes/Tiers";

export const merchantCaravan = new RegionEventCard({
  id: RegionEventCardEnum.MerchantCaravan,
  globalEventScale: 10,
  targetRegions: [RegionEnum.CentralPlain, RegionEnum.SouthernShore],
  description: "Large merchant caravans travel through the Central Plain and Southern Shore, bringing exotic goods and news from distant lands.",
  onDraw: () => {
    const newsCentralPlain = createNews({
      scope: {
        kind: "regionScope",
        region: RegionEnum.CentralPlain
      },
      tokens: [{
        t: "text",
        v: "A large merchant caravan has entered the Central Plain, bringing exotic goods and tales from distant lands."
      }],
      context: {
        region: RegionEnum.CentralPlain,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      },
      secretTier: TierEnum.common
    });

    const newsSouthernShore = createNews({
      scope: {
        kind: "regionScope",
        region: RegionEnum.SouthernShore
      },
      tokens: [{
        t: "text",
        v: "A large merchant caravan has reached the Southern Shore, their wagons heavy with valuable trade goods."
      }],
      context: {
        region: RegionEnum.SouthernShore,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      },
      secretTier: TierEnum.common
    });

    // Auto-map both news items to their scopes
    return newsArrayToStructure([newsCentralPlain, newsSouthernShore]);
  },
});

