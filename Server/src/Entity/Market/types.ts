import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";
import type { ItemId } from "../Item/type";
import type { ResourceType } from "../../InterFacesEnumsAndTypes/ResourceTypes";

/**
 * Baseline production expectations at different scopes
 */
export interface ProductionBaselines {
  global: Map<ResourceType, number>;
  subregion: Map<SubRegionEnum, Map<ResourceType, number>>;
  location: Map<LocationsEnum, Map<ResourceType, number>>;
}

/**
 * Yearly production tracking at different scopes
 */
export interface YearlyProduction {
  global: Map<ResourceType, number>;
  subregion: Map<SubRegionEnum, Map<ResourceType, number>>;
  location: Map<LocationsEnum, Map<ResourceType, number>>;
}

/**
 * Transaction record for buy/sell tracking
 */
export interface TransactionRecord {
  bought: number;
  sold: number;
}

/**
 * Transaction history by location and item/resource
 */
export type TransactionHistory = Map<
  LocationsEnum, 
  Map<ItemId | ResourceType, TransactionRecord>
>;

/**
 * Tradeable types (both items and resources)
 */
export type Tradeable = ItemId | ResourceType;

