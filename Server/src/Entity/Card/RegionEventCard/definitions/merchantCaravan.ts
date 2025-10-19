import { RegionEventCard } from "../RegionEventCard";
import { RegionEventCardEnum } from "../types";
import { RegionEnum } from "../../../../InterFacesEnumsAndTypes/Enums/Region";
import { createNews, newsArrayToStructure } from "../../../News/News";
import { L10N } from "../../../../InterFacesEnumsAndTypes/L10N";

const description = {
  en: "Large merchant caravans travel through the Central Plain and Southern Shore, bringing exotic goods and news from distant lands.",
  th: "คาราวานพ่อค้าขนาดใหญ่เดินทางผ่านที่ราบกลางและชายฝั่งใต้ นำพามาซึ่งสินค้าแปลกตาและข่าวสารจากดินแดนอันห่างไกล"
};

const newsCentralPlain = {
  en: "A large merchant caravan has entered the Central Plain, bringing exotic goods and tales from distant lands.",
  th: "คาราวานพ่อค้าขนาดใหญ่เข้ามาในที่ราบกลาง นำพาสินค้าแปลกตาและเรื่องราวจากดินแดนอันห่างไกล"
};

const newsSouthernShore = {
  en: "A large merchant caravan has reached the Southern Shore, their wagons heavy with valuable trade goods.",
  th: "คาราวานพ่อค้าขนาดใหญ่มาถึงชายฝั่งใต้แล้ว เกวียนของพวกเขาเต็มไปด้วยสินค้าค้าขายอันมีค่า"
};

export const merchantCaravan = new RegionEventCard({
  id: RegionEventCardEnum.MerchantCaravan,
  name: {
    en: "Merchant Caravan",
    th: "คาราวานพ่อค้า"
  },
  globalEventScale: 10,
  targetRegions: [RegionEnum.CentralPlain, RegionEnum.SouthernShore],
  description,
  onDraw: () => {
    const centralPlainNews = createNews({
      scope: {
        kind: "regionScope",
        region: RegionEnum.CentralPlain
      },
      content: L10N(newsCentralPlain),
      context: {
        region: RegionEnum.CentralPlain,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      }
    });

    const southernShoreNews = createNews({
      scope: {
        kind: "regionScope",
        region: RegionEnum.SouthernShore
      },
      content: L10N(newsSouthernShore),
      context: {
        region: RegionEnum.SouthernShore,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      }
    });

    return newsArrayToStructure([centralPlainNews, southernShoreNews]);
  },
});

