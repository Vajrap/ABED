import type { ResourceType } from "../Enums/Resource";

// Resource generation capacity for locations
export interface ResourceGenerateCapacity {
  // Mineral resources
  ore: number;
  gemstone: number;
  
  // Organic/forestry resources
  wood: number;
  
  // Foraging resources
  herbs: number;
  silk: number;
  
  // Aquatic resources
  fish: number;
  
  // Agricultural resources
  grain: number;
  vegetables: number;
  fruits: number;

  livestock: number;
}

// Resource generation rates (how much is generated per time period)
export interface ResourceGenerationRate extends ResourceGenerateCapacity {}

// Current resource stockpile in a location
export interface ResourceStockpile extends ResourceGenerateCapacity {}

// Resource generation configuration for a location
export interface ResourceGenerationConfig {
  capacity: ResourceGenerateCapacity;
  rate: ResourceGenerationRate;
  stockpile: ResourceStockpile;
}

// Helper type for resource operations
export type ResourceOperation = {
  type: 'add' | 'remove' | 'set';
  resource: ResourceType;
  amount: number;
};

// Default empty resource capacity
export const EMPTY_RESOURCE_CAPACITY: ResourceGenerateCapacity = {
  // Mineral
  ore: 0,
  gemstone: 0,
  
  // Organic
  wood: 0,
  silk: 0,
  
  // Foraging
  herbs: 0,
  
  // Aquatic
  fish: 0,
  
  // Agricultural
  grain: 0,
  vegetables: 0,
  fruits: 0,
  
  livestock: 0,
};
