import type { News } from "./News";
import {
  NewsSignificance,
  NewsPropagation,
} from "../../InterFacesEnumsAndTypes/NewsEnums";
import { getEffectiveSpreadConfig, getDecayRate } from "./NewsSpreadConfig";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import { GameTime } from "../../Game/GameTime/GameTime";
import { locationGraph } from "../Location/LocationGraph";
import { rollTwenty } from "../../Utils/Dice";
import { db } from "../../Database/connection";
import {
  newsArchive as newsArchiveTable,
  characterNewsKnowledge as characterNewsKnowledgeTable,
  locationNewsReach as locationNewsReachTable,
} from "../../Database/Schema";
import { eq, inArray } from "drizzle-orm";
import Report from "../../Utils/Reporter";

/**
 * NewsRecord - In-memory representation of archived news
 */
export interface NewsRecord {
  news: News;
  createdDay: number; // Game day when created
  currentLocations: Set<LocationsEnum>; // Where news has spread (multi-front)
  freshness: number; // 100 -> 0 (decays daily)
  lastSpreadDay: number; // Last day spreading was attempted
}

/**
 * NewsArchive - OOP-based news management system
 *
 * Keeps news in-memory for performance
 * Persists to database daily
 * Handles spreading and decay
 */
export class NewsArchive {
  // In-memory storage for fast access
  private newsById: Map<string, NewsRecord>;
  private newsByLocation: Map<LocationsEnum, Set<string>>;
  private characterKnowledge: Map<string, Set<string>>;

  constructor() {
    this.newsById = new Map();
    this.newsByLocation = new Map();
    this.characterKnowledge = new Map();
  }

  /**
   * Load news from database on server start
   * Only loads news that hasn't completely decayed
   */
  async loadFromDatabase(): Promise<void> {
    try {
      const currentDay = GameTime.getDaysSinceEpoch();

      // Load all active news from database
      const newsRecords = await db.select().from(newsArchiveTable);

      let loaded = 0;
      for (const record of newsRecords) {
        const news = this.dbRecordToNews(record);
        const age = currentDay - this.gameDayFromTime(news.ts);
        const decayRate = getDecayRate(news.significance);
        const freshness = Math.max(0, 100 - age * decayRate);

        // Only load if still fresh
        if (freshness > 0) {
          const newsRecord: NewsRecord = {
            news,
            createdDay: this.gameDayFromTime(news.ts),
            currentLocations: new Set(
              (record.currentReach as LocationsEnum[]) || [],
            ),
            freshness,
            lastSpreadDay: record.expiresAtGameDay || currentDay, // Use expires as proxy
          };

          this.newsById.set(news.id, newsRecord);
          loaded++;

          // Index by location
          for (const location of newsRecord.currentLocations) {
            if (!this.newsByLocation.has(location)) {
              this.newsByLocation.set(location, new Set());
            }
            this.newsByLocation.get(location)!.add(news.id);
          }
        }
      }

      // Load character knowledge
      const knowledgeRecords = await db
        .select()
        .from(characterNewsKnowledgeTable);
      for (const kr of knowledgeRecords) {
        if (!this.characterKnowledge.has(kr.characterId)) {
          this.characterKnowledge.set(kr.characterId, new Set());
        }
        this.characterKnowledge.get(kr.characterId)!.add(kr.newsId);
      }

      Report.info(
        `NewsArchive loaded: ${loaded} active news items from database`,
      );
    } catch (error) {
      Report.error("Failed to load news from database:");
      // Continue with empty archive
    }
  }

  /**
   * Archive a new news item (in-memory)
   * Call saveToDatabase() later to persist
   */
  archiveNews(news: News): void {
    const currentDay = GameTime.getDaysSinceEpoch();

    const record: NewsRecord = {
      news,
      createdDay: currentDay,
      currentLocations: this.getInitialLocations(news),
      freshness: 100,
      lastSpreadDay: currentDay,
    };

    this.newsById.set(news.id, record);

    // Index by location
    for (const location of record.currentLocations) {
      if (!this.newsByLocation.has(location)) {
        this.newsByLocation.set(location, new Set());
      }
      this.newsByLocation.get(location)!.add(news.id);
    }
  }

  /**
   * Daily spread - Multi-front spreading with d20 rolls
   */
  dailySpread(): void {
    const currentDay = GameTime.getDaysSinceEpoch();
    let spreadAttempts = 0;
    let successful = 0;

    for (const record of this.newsById.values()) {
      const config = getEffectiveSpreadConfig(
        record.news.propagation,
        record.news.spreadConfig,
      );

      // Check if it's time to spread
      if (currentDay - record.lastSpreadDay < config.spreadPeriod) continue;

      // Spread from ALL current locations (multi-front!)
      const spreadFronts = Array.from(record.currentLocations);

      for (const frontLocation of spreadFronts) {
        const neighbors = locationGraph.getConnections(frontLocation);

        for (const neighbor of neighbors) {
          // Skip if already there
          if (record.currentLocations.has(neighbor)) continue;

          spreadAttempts++;

          // Roll d20 vs spreadDC
          const roll = rollTwenty().total;
          if (roll >= config.spreadDC) {
            // Success! News spreads to neighbor
            record.currentLocations.add(neighbor);

            // Index it
            if (!this.newsByLocation.has(neighbor)) {
              this.newsByLocation.set(neighbor, new Set());
            }
            this.newsByLocation.get(neighbor)!.add(record.news.id);

            successful++;
          }
        }
      }

      record.lastSpreadDay = currentDay;
    }

    if (spreadAttempts > 0) {
      Report.info(
        `News spread: ${successful}/${spreadAttempts} successful (${Math.round((successful / spreadAttempts) * 100)}%)`,
      );
    }
  }

  /**
   * Daily decay - Reduce freshness of all news
   */
  dailyDecay(): void {
    const currentDay = GameTime.getDaysSinceEpoch();
    const toRemove: string[] = [];

    for (const [newsId, record] of this.newsById.entries()) {
      const age = currentDay - record.createdDay;
      const decayRate = getDecayRate(record.news.significance);

      record.freshness = Math.max(0, 100 - age * decayRate);

      // Mark for removal if completely decayed
      if (record.freshness === 0) {
        toRemove.push(newsId);
      }
    }

    // Remove decayed news
    for (const newsId of toRemove) {
      this.removeNews(newsId);
    }

    if (toRemove.length > 0) {
      Report.info(`News decayed: ${toRemove.length} items removed`);
    }
  }

  /**
   * Save all news to database (called daily by GameLoop)
   */
  async saveToDatabase(): Promise<void> {
    try {
      const currentDay = GameTime.getDaysSinceEpoch();

      // Clear existing records (full replace strategy)
      await db.delete(newsArchiveTable);
      await db.delete(locationNewsReachTable);

      // Insert all current news
      const newsToInsert = [];
      for (const record of this.newsById.values()) {
        newsToInsert.push({
          id: record.news.id,
          gameTime: record.news.ts as any,
          scopeKind: record.news.scope.kind,
          scopeData: this.extractScopeData(record.news.scope) as any,
          tokens: record.news.tokens as any,
          context: record.news.context as any,
          tags: record.news.tags as any,
          significance: record.news.significance,
          propagation: record.news.propagation,
          spreadConfig: record.news.spreadConfig as any,
          currentReach: Array.from(record.currentLocations) as any,
          expiresAtGameDay: record.lastSpreadDay, // Store lastSpreadDay
          secretTier: record.news.secretTier ? (record.news.secretTier as unknown as string) : undefined,
        });
      }

      if (newsToInsert.length > 0) {
        await db.insert(newsArchiveTable).values(newsToInsert);
      }

      // Insert location reach records
      const reachToInsert = [];
      for (const [locationId, newsIds] of this.newsByLocation.entries()) {
        for (const newsId of newsIds) {
          reachToInsert.push({
            locationId,
            newsId,
            reachedAtGameDay: currentDay,
          });
        }
      }

      if (reachToInsert.length > 0) {
        await db.insert(locationNewsReachTable).values(reachToInsert);
      }

      // Save character knowledge
      await db.delete(characterNewsKnowledgeTable);
      const knowledgeToInsert = [];
      for (const [characterId, newsIds] of this.characterKnowledge.entries()) {
        for (const newsId of newsIds) {
          knowledgeToInsert.push({
            characterId,
            newsId,
            learnedAtGameDay: currentDay,
            source: "witnessed",
            isRead: true,
          });
        }
      }

      if (knowledgeToInsert.length > 0) {
        await db.insert(characterNewsKnowledgeTable).values(knowledgeToInsert);
      }

      Report.info(
        `NewsArchive saved: ${newsToInsert.length} news, ${reachToInsert.length} location reaches`,
      );
    } catch (error) {
      Report.error("Failed to save news to database:", 
        error instanceof Error ? { message: error.message, stack: error.stack } : { error: String(error) }
      );
    }
  }

  /**
   * Get news at a specific location
   */
  getNewsAtLocation(
    location: LocationsEnum,
    filters?: {
      minSignificance?: NewsSignificance;
      minFreshness?: number;
    },
  ): News[] {
    const newsIds = this.newsByLocation.get(location) ?? new Set();
    const result: News[] = [];

    for (const newsId of newsIds) {
      const record = this.newsById.get(newsId);
      if (!record) continue;

      // Apply filters
      if (filters?.minFreshness && record.freshness < filters.minFreshness)
        continue;
      if (filters?.minSignificance) {
        const {
          compareSignificance,
        } = require("../../InterFacesEnumsAndTypes/NewsEnums");
        if (
          compareSignificance(
            record.news.significance,
            filters.minSignificance,
          ) < 0
        )
          continue;
      }

      result.push(record.news);
    }

    return result;
  }

  /**
   * Get news for a character at their location
   */
  getNewsForCharacter(
    characterId: string,
    location: LocationsEnum,
    filters?: {
      minSignificance?: NewsSignificance;
      onlyUnread?: boolean;
      minFreshness?: number;
    },
  ): News[] {
    let news = this.getNewsAtLocation(location, {
      minSignificance: filters?.minSignificance,
      minFreshness: filters?.minFreshness,
    });

    // Filter by read status
    if (filters?.onlyUnread) {
      const known = this.characterKnowledge.get(characterId) ?? new Set();
      news = news.filter((n) => !known.has(n.id));
    }

    return news;
  }

  /**
   * Mark news as read by character
   */
  markAsRead(characterId: string, newsId: string): void {
    if (!this.characterKnowledge.has(characterId)) {
      this.characterKnowledge.set(characterId, new Set());
    }
    this.characterKnowledge.get(characterId)!.add(newsId);
  }

  /**
   * Share news from one character to another
   */
  shareNews(fromCharId: string, toCharId: string, newsId: string): boolean {
    // Check if source knows the news
    const sourceKnows =
      this.characterKnowledge.get(fromCharId)?.has(newsId) ?? false;
    if (!sourceKnows) return false;

    // Check propagation level
    const record = this.newsById.get(newsId);
    if (!record) return false;

    if (record.news.propagation === NewsPropagation.SECRET) {
      return false; // Secrets can't be shared
    }

    // Add to target's knowledge
    if (!this.characterKnowledge.has(toCharId)) {
      this.characterKnowledge.set(toCharId, new Set());
    }
    this.characterKnowledge.get(toCharId)!.add(newsId);

    return true;
  }

  /**
   * Get statistics about archive
   */
  getStats() {
    const bySignificance = {
      trivial: 0,
      minor: 0,
      notable: 0,
      major: 0,
      momentous: 0,
    };

    for (const record of this.newsById.values()) {
      bySignificance[record.news.significance]++;
    }

    return {
      total: this.newsById.size,
      locations: this.newsByLocation.size,
      bySignificance,
      averageFreshness: this.getAverageFreshness(),
    };
  }

  // === Private Helper Methods ===

  private removeNews(newsId: string): void {
    const record = this.newsById.get(newsId);
    if (!record) return;

    // Remove from main map
    this.newsById.delete(newsId);

    // Remove from location indexes
    for (const location of record.currentLocations) {
      this.newsByLocation.get(location)?.delete(newsId);
      if (this.newsByLocation.get(location)?.size === 0) {
        this.newsByLocation.delete(location);
      }
    }
  }

  private getInitialLocations(news: News): Set<LocationsEnum> {
    const locations = new Set<LocationsEnum>();

    switch (news.scope.kind) {
      case "locationScope":
        locations.add(news.scope.location);
        break;
      case "subRegionScope":
        // Get all locations in subregion from locationRepository
        for (const loc of require("../Repository/location").locationRepository.values()) {
          if (loc.subRegion === news.scope.subRegion) {
            locations.add(loc.id);
          }
        }
        break;
      case "regionScope":
        // Get all locations in region
        for (const loc of Object.values(require("../Location/Location/repository").locationRepository) as any[]) {
          if (loc.region === news.scope.region) {
            locations.add(loc.id);
          }
        }
        break;
      case "worldScope":
        // All locations
        for (const loc of locationGraph.getAllLocations()) {
          locations.add(loc);
        }
        break;
      case "partyScope":
      case "privateScope":
      case "none":
        // No geographic locations
        break;
    }

    return locations;
  }

  private extractScopeData(scope: News["scope"]): object {
    switch (scope.kind) {
      case "worldScope":
        return {};
      case "regionScope":
        return { region: scope.region };
      case "subRegionScope":
        return { subRegion: scope.subRegion };
      case "locationScope":
        return { location: scope.location };
      case "partyScope":
        return { partyId: scope.partyId };
      case "privateScope":
        return { characterId: scope.characterId };
      case "none":
        return {};
    }
  }

  private gameDayFromTime(gameTime: any): number {
    return (
      gameTime.year * 336 + (gameTime.season - 1) * 48 + gameTime.dayOfSeason
    );
  }

  private dbRecordToNews(record: any): News {
    return {
      id: record.id,
      ts: record.gameTime,
      scope: this.reconstructScope(record.scopeKind, record.scopeData || {}),
      content: record.content || { en: "", th: "" }, // Added content field
      tokens: record.tokens || [],
      context: record.context || {},
      tags: record.tags,
      significance: record.significance as NewsSignificance,
      propagation: record.propagation as NewsPropagation,
      spreadConfig: record.spreadConfig,
      secretTier: record.secretTier,
    };
  }

  private reconstructScope(kind: string, data: any): News["scope"] {
    switch (kind) {
      case "worldScope":
        return { kind: "worldScope" };
      case "regionScope":
        return { kind: "regionScope", region: data.region };
      case "subRegionScope":
        return { kind: "subRegionScope", subRegion: data.subRegion };
      case "locationScope":
        return { kind: "locationScope", location: data.location };
      case "partyScope":
        return { kind: "partyScope", partyId: data.partyId };
      case "privateScope":
        return { kind: "privateScope", characterId: data.characterId };
      default:
        return { kind: "none" };
    }
  }

  private getAverageFreshness(): number {
    if (this.newsById.size === 0) return 0;
    const total = Array.from(this.newsById.values()).reduce(
      (sum, r) => sum + r.freshness,
      0,
    );
    return Math.round(total / this.newsById.size);
  }
}

// Global instance
export const newsArchiveService = new NewsArchive();
