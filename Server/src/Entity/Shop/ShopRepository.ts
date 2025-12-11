import { Shop, ShopType, type ShopInventory } from "./Shop";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import { randomUUID } from "crypto";
import { itemRepository } from "../Item/repository";
import type { ItemId } from "../Item/type";
import { consumableRepository } from "../Item/Consumable/repository";
import { equipmentRepository } from "../Item/Equipment/repository";

/**
 * Shop repository - manages shops per location
 * Each location can have multiple shops
 */
class ShopRepository {
  private shops: Map<string, Shop> = new Map(); // shopId -> Shop
  private shopsByLocation: Map<LocationsEnum, string[]> = new Map(); // locationId -> shopIds[]

  /**
   * Create a shop at a location
   */
  createShop(
    locationId: LocationsEnum,
    shopType: ShopType,
    initialInventory?: ShopInventory,
  ): Shop {
    const shopId = randomUUID();
    const shop = new Shop(shopId, locationId, shopType, initialInventory);
    
    this.shops.set(shopId, shop);
    
    // Add to location mapping
    const locationShops = this.shopsByLocation.get(locationId) || [];
    locationShops.push(shopId);
    this.shopsByLocation.set(locationId, locationShops);
    
    return shop;
  }

  /**
   * Get shop by ID
   */
  getShop(shopId: string): Shop | null {
    return this.shops.get(shopId) || null;
  }

  /**
   * Get all shops at a location
   */
  getShopsByLocation(locationId: LocationsEnum): Shop[] {
    const shopIds = this.shopsByLocation.get(locationId) || [];
    return shopIds
      .map(id => this.shops.get(id))
      .filter((shop): shop is Shop => shop !== undefined);
  }

  /**
   * Initialize default shops for a location
   * Creates shops based on location type
   */
  initializeLocationShops(locationId: LocationsEnum): void {
    // Check if shops already exist for this location
    if (this.shopsByLocation.has(locationId)) {
      return;
    }

    // Create default shops based on location
    // For now, create a General Store for all locations
    // TODO: Add logic to create different shop types based on location
    
    const generalStore = this.createShop(locationId, ShopType.GeneralStore);
    
    // Populate with basic items (example)
    // TODO: Implement proper shop inventory initialization based on shop type
  }

  /**
   * Get shop inventory with current prices
   */
  getShopInventory(shopId: string): Array<{
    itemId: ItemId;
    quantity: number;
    basePrice: number;
    currentPrice: number;
  }> {
    const shop = this.getShop(shopId);
    if (!shop) {
      return [];
    }

    const inventory: Array<{
      itemId: ItemId;
      quantity: number;
      basePrice: number;
      currentPrice: number;
    }> = [];

    for (const [itemId, quantity] of shop.inventory.entries()) {
      const basePrice = shop.basePrices.get(itemId) || 0;
      const currentPrice = shop.getCurrentPrice(itemId);
      
      inventory.push({
        itemId,
        quantity,
        basePrice,
        currentPrice,
      });
    }

    return inventory;
  }
}

export const shopRepository = new ShopRepository();

