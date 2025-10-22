import type { Item } from "../Item/Item";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { ResourceType } from "./types";
import type { Tradeable, TransactionHistory, TransactionRecord } from "./types";
import { ResourceProductionTracker } from "./ResourceProductionTracker";
import { calculateLocalShortageFactor } from "./PriceModifiers";
import { locationRepository } from "../Location/Location/repository";
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
  
  // Event-based price modifiers (stacking system)
  // Outer map: tradeable -> Inner map: eventId -> modifier
  // Multiple events can affect the same resource, and they multiply together
  eventModifiers: Map<Tradeable, Map<string, number>> = new Map();
  
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
      const loc = locationRepository[location];
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
    
    // Apply event modifiers (multiply all active modifiers)
    let eventMod = 1.0;
    
    // Check item-specific modifiers
    const itemModifiers = this.eventModifiers.get(item.id as Tradeable);
    if (itemModifiers) {
      for (const modifier of itemModifiers.values()) {
        eventMod *= modifier;
      }
    }
    
    // Check resource-based modifiers
    if (item.primaryResource) {
      const resourceModifiers = this.eventModifiers.get(item.primaryResource);
      if (resourceModifiers) {
        for (const modifier of resourceModifiers.values()) {
          eventMod *= modifier;
        }
      }
    }
    
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
    const loc = locationRepository[location];
    const subRegionBaseline = loc 
      ? this.resourceTracker.getSubRegionBaseline(loc.subRegion, resource)
      : 0;
    
    const localMod = calculateLocalShortageFactor(
      location,
      resource,
      localBaseline,
      subRegionBaseline
    );
    
    // Apply all event modifiers (multiply them together)
    let eventMod = 1.0;
    const resourceModifiers = this.eventModifiers.get(resource);
    if (resourceModifiers) {
      for (const modifier of resourceModifiers.values()) {
        eventMod *= modifier;
      }
    }
    
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
   * Set event-based price modifier (stacking system)
   * 
   * Multiple events can affect the same resource, and they multiply together.
   * Each event must provide a unique eventId for proper cleanup.
   * 
   * Example:
   * - Global Event "Famine": setEventModifier("grain", 2.0, "GreatFamine")
   * - Region Event "Drought": setEventModifier("grain", 1.3, "Drought_CentralPlain")
   * - Final modifier: 2.0 × 1.3 = 2.6
   * 
   * @param tradeable - The resource or item to modify
   * @param modifier - The price multiplier (1.0 = no change, 2.0 = double, 0.5 = half)
   * @param eventId - Unique identifier for this event (used for cleanup)
   */
  setEventModifier(tradeable: Tradeable, modifier: number, eventId: string): void {
    if (!this.eventModifiers.has(tradeable)) {
      this.eventModifiers.set(tradeable, new Map());
    }
    
    const modifiers = this.eventModifiers.get(tradeable)!;
    modifiers.set(eventId, modifier);
  }
  
  /**
   * Clear a specific event's modifier
   * 
   * Only removes the modifier for the specified event, leaving others intact.
   * 
   * @param tradeable - The resource or item
   * @param eventId - The event identifier to remove
   */
  clearEventModifier(tradeable: Tradeable, eventId: string): void {
    const modifiers = this.eventModifiers.get(tradeable);
    if (modifiers) {
      modifiers.delete(eventId);
      
      // Clean up empty map
      if (modifiers.size === 0) {
        this.eventModifiers.delete(tradeable);
      }
    }
  }
  
  /**
   * Get the combined event modifier for a tradeable
   * 
   * Multiplies all active event modifiers together.
   * 
   * @param tradeable - The resource or item
   * @returns Combined modifier (1.0 if no modifiers active)
   */
  getEventModifier(tradeable: Tradeable): number {
    const modifiers = this.eventModifiers.get(tradeable);
    if (!modifiers || modifiers.size === 0) {
      return 1.0;
    }
    
    let combined = 1.0;
    for (const modifier of modifiers.values()) {
      combined *= modifier;
    }
    return combined;
  }
  
  /**
   * Get all active event modifiers for a tradeable
   * 
   * Returns a map of eventId -> modifier for debugging/display
   */
  getEventModifiers(tradeable: Tradeable): Map<string, number> {
    return this.eventModifiers.get(tradeable) ?? new Map();
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
