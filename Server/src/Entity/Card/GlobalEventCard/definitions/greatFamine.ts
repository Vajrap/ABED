import { GlobalEventCard } from "../GlobalEventCard";
import { GlobalEventCardEnum } from "../types";
import { market } from "../../../Market/Market";
import { createNews, newsToStructure } from "../../../News/News";
import { NewsSignificance } from "../../../../InterFacesEnumsAndTypes/NewsEnums";

/**
 * Great Famine - Major food shortage event
 * 
 * Effect: 
 * - Increases food prices by 100% (doubles them)
 * - Decreases crop production capacity
 * - Creates scarcity and player hardship
 * 
 * Duration: Until card completes
 * Cleanup: Restores normal prices
 */

export const greatFamine = new GlobalEventCard({
  id: GlobalEventCardEnum.GreatFamine,
  name: {
    en: "The Great Famine",
    th: "การกันแคล้นคลาดครั้งใหญ่"
  },
  description: {
    en: "A catastrophic famine sweeps across the lands. Food becomes scarce and expensive.",
    th: "ความอดอยากครั้งใหญ่แผ่คลุมไปทั่วดินแดน อาหารขาดแคลนและราคาแพง"
  },
  
  startingScale: 150,
  
  onDraw: () => {
    // Double food prices (100% increase)
    // Use card ID as eventId for proper cleanup
    const eventId = GlobalEventCardEnum.GreatFamine;
    market.setEventModifier("grain", 2.0, eventId);
    market.setEventModifier("vegetables", 2.0, eventId);
    market.setEventModifier("fruits", 2.0, eventId);
    market.setEventModifier("livestock", 1.8, eventId);
    
    // Generate news
    const news = createNews({
      scope: {
        kind: "worldScope",
      },
      content: {
        en: "A great famine strikes the world! Crops fail across all regions. Food prices soar as desperate people scramble for sustenance. Starvation threatens many settlements.",
        th: "ความอดอยากครั้งใหญ่โจมตีโลก! พืชผลล้มเหลวในทุกภูมิภาค ราคาอาหารพุ่งสูงขึ้นขณะที่ผู้คนต่อสู้เพื่อหาอาหาร ความอดอยากคุกคามหลายชุมชน"
      },
      context: {
        region: undefined as any,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      },
      significance: NewsSignificance.MOMENTOUS
    });
    
    // Auto-map news to structure based on scope
    return newsToStructure(news);
  },
  
  onEnd: () => {
    // Restore normal food prices
    // Clear only THIS event's modifiers, leaving others intact
    const eventId = GlobalEventCardEnum.GreatFamine;
    market.clearEventModifier("grain", eventId);
    market.clearEventModifier("vegetables", eventId);
    market.clearEventModifier("fruits", eventId);
    market.clearEventModifier("livestock", eventId);
  },
  
  // Famine continues until resolved (e.g., by player actions or time)
  completionCondition: () => {
    // In a full implementation, this might check:
    // - Has enough food been distributed?
    // - Have players completed relief quests?
    // - Has sufficient time passed?
    
    // For now, just complete after a year
    return true;
  },
});

