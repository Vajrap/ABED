export * from "./user";
export * from "./session";
export * from "./character";
export * from "./party";
export * from "./news";
export * from "./battle_report";
export * from "./item_instances";
export * from "./game_state";
export * from "./market_state";
export * from "./resource_production_tracking";

// Export database tables for migrations and queries
export { users } from "./user";
export { sessions } from "./session";
export { characters } from "./character";
export { parties } from "./party";
export { newsArchive, newsSpreadQueue, characterNewsKnowledge, locationNewsReach } from "./news";
export { battleReports } from "./battle_report";
export { itemInstances } from "./item_instances";
export { gameState } from "./game_state";
export { marketState } from "./market_state";
export { resourceProductionTracking } from "./resource_production_tracking";

// Re-export types for convenience
export type { User, InsertUser } from "./user";
export type { Session, InsertSession } from "./session";
export type { Character, InsertCharacter } from "./character";
export type { PartyDB, InsertParty } from "./party";
export type { BattleReport, InsertBattleReport } from "./battle_report";
export type { ItemInstance, InsertItemInstance } from "./item_instances";
export type { GameStateDB, InsertGameState } from "./game_state";
export type { MarketStateDB, InsertMarketState } from "./market_state";
export type { ResourceProductionTrackingDB, InsertResourceProductionTracking } from "./resource_production_tracking";
