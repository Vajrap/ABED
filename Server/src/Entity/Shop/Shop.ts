import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { ItemId } from "../Item/type";
import { market } from "../Market/Market";
import { locationRepository } from "../Location/Location/repository";
import { getItem } from "../Item/repository";

export enum ShopType {
  Inn = "inn",
  Blacksmith = "blacksmith",
  GeneralStore = "general_store",
  Apothecary = "apothecary",
  Marketplace = "marketplace",
}

export type ShopInventory = Map<ItemId, number>; // itemId -> quantity

export interface ShopPricingModifiers {
  locationModifier: number; // -0.1 to +0.2 based on location type
  supplyDemandModifier: number; // -0.2 to +0.3 based on item rarity and stock
}

/**
 * Shop entity - represents a shop at a location
 * Each location can have multiple shops (e.g., WaywardInn has Inn shop + General Store)
 */
export class Shop {
  id: string;
  locationId: LocationsEnum;
  shopType: ShopType;
  inventory: ShopInventory;
  pricingModifiers: ShopPricingModifiers;
  basePrices: Map<ItemId, number>; // Store base prices for reference

  constructor(
    id: string,
    locationId: LocationsEnum,
    shopType: ShopType,
    initialInventory: ShopInventory = new Map(),
    pricingModifiers?: Partial<ShopPricingModifiers>,
  ) {
    this.id = id;
    this.locationId = locationId;
    this.shopType = shopType;
    this.inventory = new Map(initialInventory);
    this.basePrices = new Map();
    
    // Initialize base prices from inventory
    for (const [itemId] of this.inventory.entries()) {
      const basePrice = this.getBasePrice(itemId);
      if (basePrice > 0) {
        this.basePrices.set(itemId, basePrice);
      }
    }

    // Set pricing modifiers
    const location = locationRepository[locationId];
    const defaultLocationModifier = this.getDefaultLocationModifier(locationId, shopType);
    this.pricingModifiers = {
      locationModifier: pricingModifiers?.locationModifier ?? defaultLocationModifier,
      supplyDemandModifier: pricingModifiers?.supplyDemandModifier ?? 0,
    };
  }

  /**
   * Get base price for an item from Market system
   */
  private getBasePrice(itemId: ItemId): number {
    // Get item from repository
    const item = getItem(itemId);
    if (!item) {
      return 0;
    }

    // Use Market system to get price at this location
    return market.getPrice(item, this.locationId);
  }

  /**
   * Get default location modifier based on location type and shop type
   * Towns: -0.1 (cheaper), Remote: +0.2 (expensive)
   */
  private getDefaultLocationModifier(
    locationId: LocationsEnum,
    shopType: ShopType,
  ): number {
    // TODO: Implement location type detection (town vs remote)
    // For now, default to 0 (no modifier)
    return 0;
  }

  /**
   * Calculate current price for an item
   * Formula: basePrice × (1 + locationModifier) × (1 + supplyDemandModifier)
   */
  getCurrentPrice(itemId: ItemId): number {
    const basePrice = this.basePrices.get(itemId) || this.getBasePrice(itemId);
    if (basePrice === 0) return 0;

    const locationMod = 1 + this.pricingModifiers.locationModifier;
    const supplyDemandMod = 1 + this.pricingModifiers.supplyDemandModifier;

    return Math.round(basePrice * locationMod * supplyDemandMod);
  }

  /**
   * Check if item is in stock
   */
  hasItem(itemId: ItemId): boolean {
    const quantity = this.inventory.get(itemId) || 0;
    return quantity > 0;
  }

  /**
   * Get available quantity of an item
   */
  getQuantity(itemId: ItemId): number {
    return this.inventory.get(itemId) || 0;
  }

  /**
   * Remove item from inventory (when sold)
   */
  removeItem(itemId: ItemId, quantity: number): boolean {
    const currentQuantity = this.inventory.get(itemId) || 0;
    if (currentQuantity < quantity) {
      return false;
    }
    const newQuantity = currentQuantity - quantity;
    if (newQuantity <= 0) {
      this.inventory.delete(itemId);
    } else {
      this.inventory.set(itemId, newQuantity);
    }
    return true;
  }

  /**
   * Add item to inventory (when buying from player)
   */
  addItem(itemId: ItemId, quantity: number): void {
    const currentQuantity = this.inventory.get(itemId) || 0;
    this.inventory.set(itemId, currentQuantity + quantity);
    
    // Update base price if not already set
    if (!this.basePrices.has(itemId)) {
      const basePrice = this.getBasePrice(itemId);
      if (basePrice > 0) {
        this.basePrices.set(itemId, basePrice);
      }
    }
  }
}

