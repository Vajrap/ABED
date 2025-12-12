import { RegionEventCard } from "../RegionEventCard";
import { RegionEventCardEnum } from "../types";
import { RegionEnum } from "../../../../InterFacesEnumsAndTypes/Enums/Region";
import { createNews, newsArrayToStructure } from "../../../News/News";
import { L10N } from "../../../../InterFacesEnumsAndTypes/L10N";
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

const description = {
  en: "War drives up demand for weapons and armor. Ore and wood prices spike.",
  th: "สงครามทำให้ความต้องการอาวุธและเกราะเพิ่มสูงขึ้น ราคาแร่และไม้พุ่งสูงขึ้น",
};

const worldNewsContent = {
  en: "War in the north drives demand for weapons! Blacksmiths and fletchers struggle to keep up with orders.",
  th: "สงครามทางเหนือทำให้ความต้องการอาวุธเพิ่มสูงขึ้น! ช่างตีเหล็กและช่างทำธนูพยายามทำงานตามคำสั่งซื้อที่ท่วมท้น",
};

const northernNewsContent = {
  en: "The Northern Reach mobilizes for war. Weapon prices soar as armies prepare for conflict.",
  th: "ดินแดนเหนือระดมกำลังเพื่อสงคราม ราคาอาวุธพุ่งสูงขึ้นขณะที่กองทัพเตรียมพร้อมสำหรับการสู้รบ",
};

const borealNewsContent = {
  en: "Boreal Frost's warriors march southward. Every blacksmith in the frozen lands works day and night.",
  th: "นักรบแห่งป่าน้ำแข็งเหนือจัดเดินทัพลงใต้ ช่างตีเหล็กทุกคนในดินแดนเยือกแข็งทำงานทั้งกลางวันและกลางคืน",
};

export const warDemand = new RegionEventCard({
  id: RegionEventCardEnum.RegionalConflict, // Using existing enum value
  name: {
    en: "War Demand",
    th: "ความต้องการในยามสงคราม",
  },
  globalEventScale: 30,
  targetRegions: [RegionEnum.NorthernReaches, RegionEnum.BorealFrost],
  description,
  onDraw: () => {
    // Use unique eventId for this specific region event
    // Format: EventType_Region1_Region2
    const eventId = `WarDemand_${RegionEnum.NorthernReaches}_${RegionEnum.BorealFrost}`;

    // Increase weapon/armor material prices
    market.setEventModifier("ore", 1.5, eventId);
    market.setEventModifier("wood", 1.3, eventId);

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
        characterIds: [],
      },
    });

    const newsNorthern = createNews({
      scope: {
        kind: "regionScope",
        region: RegionEnum.NorthernReaches,
      },
      content: L10N(northernNewsContent),
      context: {
        region: RegionEnum.NorthernReaches,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: [],
      },
    });

    const newsBoreal = createNews({
      scope: {
        kind: "regionScope",
        region: RegionEnum.BorealFrost,
      },
      content: L10N(borealNewsContent),
      context: {
        region: RegionEnum.BorealFrost,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: [],
      },
    });

    return newsArrayToStructure([worldNews, newsNorthern, newsBoreal]);
  },

  // Region Event Cards don't have onEnd - they're one-time effects
  // The market modifier stays until manually cleared or another event removes it
  // In a full implementation, you might clear region event modifiers at end of season
});
