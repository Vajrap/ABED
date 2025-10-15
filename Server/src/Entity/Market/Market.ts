import type { Item, ItemId } from "../Item/Item";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { ResourceType } from "./types";
import type { Tradeable, TransactionHistory, TransactionRecord } from "./types";
import { ResourceProductionTracker } from "./ResourceProductionTracker";
import { calculateLocalShortageFactor } from "./PriceModifiers";
import { locationRepository } from "../Repository/location";

/**
 * Central market system
 * 
 * Handles:
 * - Dynamic pricing based on production and demand
 * - Transaction tracking (buy/sell volumes)
 * - Event-based price modifiers
 */
export class Market {
  // Production tracking for yearly price adjustments
  resourceTracker: ResourceProductionTracker;
  
  // Cached modifiers (recalculated yearly)
  yearlyModifiers: Map<ResourceType, number> = new Map();
  
  // Event-based price overrides (from global events, etc.)
  eventModifiers: Map<Tradeable, number> = new Map();
  
  // Transaction history for market analysis
  transactionHistory: TransactionHistory = new Map();
  
  constructor() {
    this.resourceTracker = new ResourceProductionTracker();
    
    // Initialize with neutral modifiers
    const resources: ResourceType[] = [
      "ore", "gemstone", "wood", "herbs", "silk",
      "fish", "grain", "vegetables", "fruits", "livestock"
    ];
    
    for (const resource of resources) {
      this.yearlyModifiers.set(resource, 1.0);
    }
  }
  
  /**
   * Get current price for an item at a specific location
   * 
   * Formula: basePrice * yearlyModifier * localShortageModifier * eventModifier
   */
  getPrice(item: Item, location: LocationsEnum): number {
    const basePrice = item.cost.baseCost;
    
    let yearlyMod = 1.0;
    let localMod = 1.0;
    
    // If item has a primary resource, use resource-based pricing
    if (item.primaryResource) {
      yearlyMod = this.yearlyModifiers.get(item.primaryResource) ?? 1.0;
      
      const localBaseline = this.resourceTracker.getLocationBaseline(
        location, 
        item.primaryResource
      );
      const loc = locationRepository.get(location);
      const subRegionBaseline = loc 
        ? this.resourceTracker.getSubRegionBaseline(loc.subRegion, item.primaryResource)
        : 0;
      
      localMod = calculateLocalShortageFactor(
        location,
        item.primaryResource,
        localBaseline,
        subRegionBaseline
      );
    }
    
    // Apply event modifier if any
    // Check both item-specific and resource-based event modifiers
    const itemEventMod = this.eventModifiers.get(item.id as Tradeable) ?? 1.0;
    const resourceEventMod = item.primaryResource 
      ? (this.eventModifiers.get(item.primaryResource) ?? 1.0)
      : 1.0;
    
    const eventMod = itemEventMod * resourceEventMod;
    
    return basePrice * yearlyMod * localMod * eventMod;
  }
  
  /**
   * Get price for a raw resource at a location
   */
  getResourcePrice(
    resource: ResourceType, 
    location: LocationsEnum,
    basePrice: number = 10
  ): number {
    const yearlyMod = this.yearlyModifiers.get(resource) ?? 1.0;
    
    const localBaseline = this.resourceTracker.getLocationBaseline(location, resource);
    const loc = locationRepository.get(location);
    const subRegionBaseline = loc 
      ? this.resourceTracker.getSubRegionBaseline(loc.subRegion, resource)
      : 0;
    
    const localMod = calculateLocalShortageFactor(
      location,
      resource,
      localBaseline,
      subRegionBaseline
    );
    
    const eventMod = this.eventModifiers.get(resource) ?? 1.0;
    
    return basePrice * yearlyMod * localMod * eventMod;
  }
  
  /**
   * Adjust yearly prices based on last year's production
   * 
   * Called at new year (season 1, day 1, hour 1)
   */
  adjustYearlyPrices(): void {
    this.yearlyModifiers = this.resourceTracker.calculateYearlyModifiers();
  }
  
  /**
   * Adjust seasonal prices
   * 
   * Called at start of each season (day 1, hour 1)
   * Local shortage factors are recalculated on-demand via getPrice()
   */
  adjustSeasonalPrices(): void {
    // Local shortage factors are calculated dynamically in getPrice()
    // This method is a hook for future seasonal adjustments if needed
  }
  
  /**
   * Set event-based price modifier
   * 
   * Used by global event cards to affect prices
   * Example: Great Famine increases grain prices by 50%
   */
  setEventModifier(tradeable: Tradeable, modifier: number): void {
    this.eventModifiers.set(tradeable, modifier);
  }
  
  /**
   * Clear event modifier
   */
  clearEventModifier(tradeable: Tradeable): void {
    this.eventModifiers.delete(tradeable);
  }
  
  /**
   * Record a transaction (buy or sell)
   */
  recordTransaction(
    location: LocationsEnum,
    tradeable: Tradeable,
    amount: number,
    isBuy: boolean
  ): void {
    if (!this.transactionHistory.has(location)) {
      this.transactionHistory.set(location, new Map());
    }
    
    const locationHistory = this.transactionHistory.get(location)!;
    
    if (!locationHistory.has(tradeable)) {
      locationHistory.set(tradeable, { bought: 0, sold: 0 });
    }
    
    const record = locationHistory.get(tradeable)!;
    
    if (isBuy) {
      record.bought += amount;
    } else {
      record.sold += amount;
    }
  }
  
  /**
   * Get transaction record for analysis
   */
  getTransactionRecord(
    location: LocationsEnum,
    tradeable: Tradeable
  ): TransactionRecord {
    return this.transactionHistory.get(location)?.get(tradeable) ?? {
      bought: 0,
      sold: 0
    };
  }
}

// Global market instance
export const market = new Market();
