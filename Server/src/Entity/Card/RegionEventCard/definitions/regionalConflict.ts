import { RegionEventCard } from "../RegionEventCard";
import { RegionEventCardEnum } from "../types";
import { RegionEnum } from "../../../../InterFacesEnumsAndTypes/Enums/Region";
import { createNews, newsArrayToStructure } from "../../../News/News";
import { L10N } from "../../../../InterFacesEnumsAndTypes/L10N";

const description = {
  en: "A territorial dispute has escalated into armed conflict between forces in the Northern Reach and Boreal Frost.",
  th: "ข้อพิพาทเรื่องอาณาเขตบานปลายกลายเป็นความขัดแย้งทางอาวุธระหว่างกองกำลังในดินแดนเหนือและป่าน้ำแข็งเหนือจัด"
};

const worldNewsContent = {
  en: "War has erupted in the northern territories! A territorial dispute between the Northern Reach and Boreal Frost has escalated into open armed conflict.",
  th: "สงครามปะทุขึ้นในดินแดนทางเหนือ! ข้อพิพาทเรื่องอาณาเขตระหว่างดินแดนเหนือและป่าน้ำแข็งเหนือจัดได้บานปลายกลายเป็นความขัดแย้งทางอาวุธอย่างเปิดเผย"
};

const northernNewsContent = {
  en: "The Northern Reach mobilizes its forces for war. Settlements fortify their defenses as conflict looms.",
  th: "ดินแดนเหนือระดมกำลังเพื่อสงคราม หมู่บ้านต่างๆ เสริมป้อมปราการเมื่อความขัดแย้งใกล้เข้ามา"
};

const borealNewsContent = {
  en: "Boreal Frost's warriors march southward. The frozen lands echo with war drums and battle cries.",
  th: "นักรบแห่งป่าน้ำแข็งเหนือจัดเดินทัพลงใต้ ดินแดนเยือกแข็งสะท้อนเสียงกลองรบและเสียงโห่ร้องสู้รบ"
};

export const regionalConflict = new RegionEventCard({
  id: RegionEventCardEnum.RegionalConflict,
  name: {
    en: "Regional Conflict",
    th: "ความขัดแย้งระดับภูมิภาค"
  },
  globalEventScale: 30,
  // TODO: Add back the NorthernReach and BorealFrost when they are implemented
  targetRegions: [RegionEnum.CentralPlain],
  // targetRegions: [RegionEnum.NorthernReach, RegionEnum.BorealFrost],
  description,
  onDraw: () => {
    const worldNews = createNews({
      scope: {
        kind: "worldScope",
      },
      content: L10N(worldNewsContent),
      context: {
        region: undefined as any,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      }
    });

    const newsNorthern = createNews({
      scope: {
        kind: "regionScope",
        // region: RegionEnum.NorthernReach
        region: RegionEnum.CentralPlain
      },
      content: L10N(northernNewsContent),
      context: {
        // region: RegionEnum.NorthernReach,
        region: RegionEnum.CentralPlain,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      }
    });

    const newsBoreal = createNews({
      scope: {
        kind: "regionScope",
        // region: RegionEnum.BorealFrost
        region: RegionEnum.CentralPlain
      },
      content: L10N(borealNewsContent),
      context: {
        // region: RegionEnum.BorealFrost,
        region: RegionEnum.CentralPlain,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      }
    });

    return newsArrayToStructure([worldNews, newsNorthern, newsBoreal]);
  },
});

