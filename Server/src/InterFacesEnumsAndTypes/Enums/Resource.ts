// Resource types that correspond to artisan collection skills
export const RESOURCE_TYPES = [
  // Mining-related resources
  "ore",           // General ore (iron, copper, silver, gold, etc.)
  "gemstone",      // Precious stones and gems
  
  // Forestry-related resources  
  "wood",          // General wood (oak, pine, etc.)
  
  // Foraging-related resources
  "herbs",         // Medicinal and magical herbs
  "silk",
  
  // Fishing-related resources
  "fish",          // Various fish
 
  // Agriculture-related resources
  "grain",         // Wheat, barley, rice, etc.
  "vegetables",    // Various vegetables
  "fruits",        // Cultivated fruits
  
  "livestock",
] as const;

export type ResourceType = (typeof RESOURCE_TYPES)[number];

// Mapping artisan skills to their primary resource types
export const ARTISAN_TO_RESOURCE_MAPPING: Record<string, ResourceType[]> = {
  mining: ["ore", "gemstone"],
  woodCutting: ["wood"],
  foraging: ["herbs", "fruits", "silk"],
  fishing: ["fish"],
  agriculture: ["grain", "vegetables"]
};

