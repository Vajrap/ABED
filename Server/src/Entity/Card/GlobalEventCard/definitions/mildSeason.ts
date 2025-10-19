import { GlobalEventCard } from "../GlobalEventCard";
import { GlobalEventCardEnum } from "../types";
import { locationRepository } from "../../../Repository/location";
import { createNews, newsToStructure } from "../../../News/News";
import { NewsSignificance } from "../../../../InterFacesEnumsAndTypes/NewsEnums";

/**
 * Mild Season - Simple beneficial minor event
 * 
 * From doc: "All crop RGC +5% this year"
 * 
 * Effect: Increases crop (grain, vegetables, fruits) capacity by 5% globally
 * Duration: Until card completes (end of year)
 * Cleanup: Restores original capacities
 */

// Store original capacities for restoration
const originalCapacities = new Map<string, { grain: number; vegetables: number; fruits: number }>();

export const mildSeason = new GlobalEventCard({
  id: GlobalEventCardEnum.MildSeason,
  name: {
    en: "Mild Season",
    th: "ฤดูกาลที่เหมาะสม"
  },
  description: {
    en: "Pleasant weather favors the crops this year. Farmers enjoy a 5% boost to crop yields.",
    th: "สภาพอากาศที่ดีช่วยให้พืชผลเจริญเติบโต เกษตรกรได้รับผลผลิตเพิ่มขึ้น 5%"
  },
  
  startingScale: 100,
  
  onDraw: () => {
    // Apply 5% boost to all crop capacities globally
    for (const location of locationRepository.values()) {
      // Store original values for cleanup
      originalCapacities.set(location.id, {
        grain: location.resourceGeneration.capacity.grain,
        vegetables: location.resourceGeneration.capacity.vegetables,
        fruits: location.resourceGeneration.capacity.fruits,
      });
      
      // Apply 5% boost
      location.resourceGeneration.capacity.grain = Math.floor(
        location.resourceGeneration.capacity.grain * 1.05
      );
      location.resourceGeneration.capacity.vegetables = Math.floor(
        location.resourceGeneration.capacity.vegetables * 1.05
      );
      location.resourceGeneration.capacity.fruits = Math.floor(
        location.resourceGeneration.capacity.fruits * 1.05
      );
    }
    
    // Generate news
    const news = createNews({
      scope: {
        kind: "worldScope",
      },
      content: {
        en: "Pleasant weather graces the lands this year. Farmers shrug and say, 'Not the best, not the worst. A decent season.'",
        th: "สภาพอากาศที่ดีงามตลอดปี เกษตรกรกล่าวว่า 'ไม่ดีที่สุดแต่ก็ไม่แย่ที่สุด ฤดูกาลที่พอใช้ได้'"
      },
      context: {
        region: undefined as any,
        subRegion: undefined as any,
        location: undefined as any,
        partyId: "",
        characterIds: []
      },
      significance: NewsSignificance.NOTABLE
    });
    
    // Auto-map news to structure based on scope
    return newsToStructure(news);
  },
  
  onEnd: () => {
    // Restore original capacities
    for (const location of locationRepository.values()) {
      const original = originalCapacities.get(location.id);
      if (original) {
        location.resourceGeneration.capacity.grain = original.grain;
        location.resourceGeneration.capacity.vegetables = original.vegetables;
        location.resourceGeneration.capacity.fruits = original.fruits;
      }
    }
    
    // Clear stored values
    originalCapacities.clear();
  },
  
  // Card completes at end of year (checked daily)
  completionCondition: () => {
    // Will be completed by GameLoop when year ends
    return true;
  }
});

