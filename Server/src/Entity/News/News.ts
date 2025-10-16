import { randomUUID } from "crypto";
import { GameTime } from "../../Game/GameTime/GameTime";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import { RegionEnum } from "../../InterFacesEnumsAndTypes/Enums/Region";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";
import type { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import type { GameTimeInterface } from "../../InterFacesEnumsAndTypes/Time";
import { NewsSignificance, NewsPropagation } from "../../InterFacesEnumsAndTypes/NewsEnums";
import type { NewsSpreadConfig } from "./NewsSpreadConfig";
import type { L10N } from "../../InterFacesEnumsAndTypes/L10N";

// SCOPE
export type NewsScope =
  | { kind: "worldScope" }
  | { kind: "regionScope"; region: RegionEnum }
  | { kind: "subRegionScope"; subRegion: SubRegionEnum }
  | { kind: "locationScope"; location: LocationsEnum }
  | { kind: "partyScope"; partyId: string }
  | { kind: "privateScope"; characterId: string }
  | { kind: "none" };

export type NewsContext = {
  region: RegionEnum;
  subRegion: SubRegionEnum;
  location: LocationsEnum;
  partyId: string;
  characterIds: string[];
};

// TOKENIZED CONTENT (not plain string)
// Text string will need special parsing on FE, example,
// {cl:00} for coloring?
// {/n} for new line?
export type NewsToken =
  | { t: "text"; v: string }
  | { t: "loc"; id: LocationsEnum; label?: string }
  | { t: "party"; label: string }
  | { t: "char"; v: CharNewsInterface[] }
  | { t: "item"; v: ItemInterface }
  | { t: "skill"; id: string; label?: string };

// Use to group news, FE things, think later on what do we need here
enum NewsTag {
  CRAFT = "CRAFT",
  LEGENDARY = "LEGENDARY",
  COMBAT = "COMBAT",
  EVENT = "EVENT",
  MISC = "MISC",
  PLAYER = "PLAYER",
}

// NEWS ITEM
/*
  Now, news system will be tied to character, each news has its own id and timestamp that related to GameTimeInterface
  When a Character encounter with any News, the id will be collected into character's news; 
  also newly met News will shown up to FE client next time they 
    Login, once logged in, show NewsInterface or 
    Open the News menu, or
    Is currently Logged in, through WebSocket, and shown in NewsInterface
  That means we need to track, which news has been seen too.
  TODO: Add, News and UnSeenNews to Character class

  Next, since in the game, it's possible for character to exchange news with other character,
  So... I think, News should also have 'Secret Tier' which tells if it is something secret or not,
  think of catrastophic event like Regional flood, even if it's Huge and legendary in scale, But it's not secret,
*/
export interface News {
  id: string;
  ts: GameTimeInterface;
  scope: NewsScope;
  tags?: NewsTag[];
  
  // NEW: Simple L10N content with markup
  content: L10N;  // Replaces tokens array
  
  // DEPRECATED: Old token system (for migration)
  tokens?: NewsToken[];
  
  context: NewsContext;
  
  // Dual-axis system
  significance: NewsSignificance;
  propagation: NewsPropagation;
  spreadConfig?: NewsSpreadConfig;
  
  // DEPRECATED
  secretTier?: TierEnum;
}

export function createNews(data: {
  scope: NewsScope;
  content: L10N;  // NEW: Required L10N content
  tokens?: NewsToken[];  // DEPRECATED: Optional for migration
  origin?: {
    location?: LocationsEnum;
    partyId?: string;
    system?: "craft" | "combat" | "quest" | string;
  };
  context: NewsContext;
  
  // Dual-axis system
  significance?: NewsSignificance;
  propagation?: NewsPropagation;
  spreadConfig?: NewsSpreadConfig;
  
  
  tags?: NewsTag[];
}): News {
  const id = randomUUID();
  const ts = GameTime.getCurrentGameDateTime();
  
  // Default significance based on scope if not provided
  const defaultSignificance = data.significance ?? inferSignificanceFromScope(data.scope);
  
  // Default propagation based on scope if not provided
  const defaultPropagation = data.propagation ?? inferPropagationFromScope(data.scope);
  
  return {
    id,
    ts,
    scope: data.scope,
    tags: data.tags,
    content: data.content,
    tokens: data.tokens,  // Optional, for backwards compat
    context: data.context,
    significance: defaultSignificance,
    propagation: defaultPropagation,
    spreadConfig: data.spreadConfig,
  };
}

/**
 * Infer reasonable default significance from scope
 */
function inferSignificanceFromScope(scope: NewsScope): NewsSignificance {
  switch (scope.kind) {
    case "worldScope":
      return NewsSignificance.MAJOR;
    case "regionScope":
      return NewsSignificance.NOTABLE;
    case "subRegionScope":
      return NewsSignificance.MINOR;
    case "locationScope":
      return NewsSignificance.MINOR;
    case "partyScope":
      return NewsSignificance.TRIVIAL;
    case "privateScope":
      return NewsSignificance.TRIVIAL;
    case "none":
      return NewsSignificance.TRIVIAL;
  }
}

/**
 * Infer reasonable default propagation from scope
 */
function inferPropagationFromScope(scope: NewsScope): NewsPropagation {
  switch (scope.kind) {
    case "worldScope":
      return NewsPropagation.GLOBAL;
    case "regionScope":
      return NewsPropagation.REGIONAL;
    case "subRegionScope":
      return NewsPropagation.LOCAL;
    case "locationScope":
      return NewsPropagation.LOCAL;
    case "partyScope":
      return NewsPropagation.PRIVATE;
    case "privateScope":
      return NewsPropagation.SECRET;
    case "none":
      return NewsPropagation.SECRET;
  }
}

// These needs to think of in terms of public and private data, something should be hidden from other player, some information might be more public
// TODO: what should user see when pointing to character's name? level?
export type CharNewsInterface = {
  name: string;
  title: string;
  fame: string;
  portrait: string;
  level: number;
};
// TODO: same as up there? what should be seen? like item tier, etc
type ItemInterface = {
  name: string;
  stats: {};
};

export type NewsDistribution = {
  worldScope: News[];
  regionScope: Map<RegionEnum, News[]>;
  subRegionScope: Map<SubRegionEnum, News[]>;
  locationScope: Map<LocationsEnum, News[]>;
  partyScope: Map<string, News[]>;
  privateScope: Map<string, News[]>;
};

export function emptyNewsDistribution(): NewsDistribution {
  return {
    worldScope: [],
    regionScope: new Map(),
    subRegionScope: new Map(),
    locationScope: new Map(),
    partyScope: new Map(),
    privateScope: new Map(),
  };
}

/**
 * Map a single News item to the correct scope in the structure
 * 
 * This is the core mapping logic - News.scope tells us where it goes!
 */
function mapNewsToStructure(structure: NewsDistribution, news: News): void {
  switch (news.scope.kind) {
    case "worldScope":
      structure.worldScope.push(news);
      break;
      
    case "regionScope": {
      const region = news.scope.region;
      if (!structure.regionScope.has(region)) {
        structure.regionScope.set(region, []);
      }
      structure.regionScope.get(region)!.push(news);
      break;
    }
      
    case "subRegionScope": {
      const subRegion = news.scope.subRegion;
      if (!structure.subRegionScope.has(subRegion)) {
        structure.subRegionScope.set(subRegion, []);
      }
      structure.subRegionScope.get(subRegion)!.push(news);
      break;
    }
      
    case "locationScope": {
      const location = news.scope.location;
      if (!structure.locationScope.has(location)) {
        structure.locationScope.set(location, []);
      }
      structure.locationScope.get(location)!.push(news);
      break;
    }
      
    case "partyScope": {
      const partyId = news.scope.partyId;
      if (!structure.partyScope.has(partyId)) {
        structure.partyScope.set(partyId, []);
      }
      structure.partyScope.get(partyId)!.push(news);
      break;
    }
      
    case "privateScope": {
      const characterId = news.scope.characterId;
      if (!structure.privateScope.has(characterId)) {
        structure.privateScope.set(characterId, []);
      }
      structure.privateScope.get(characterId)!.push(news);
      break;
    }
      
    case "none":
      // Ignore news with no scope
      break;
  }
}

/**
 * Convert News array to NewsEmittedFromLocationStructure
 * 
 * This is the main helper - use this everywhere!
 * 
 * BEFORE:
 * ```typescript
 * return {
 *   worldScope: [news1],
 *   regionScope: new Map([[region, [news2]]]),
 *   subRegionScope: new Map(),
 *   locationScope: new Map(),
 *   partyScope: new Map(),
 *   privateScope: new Map(),
 * };
 * ```
 * 
 * AFTER:
 * ```typescript
 * return newsArrayToStructure([news1, news2]);
 * ```
 */
export function newsArrayToStructure(newsList: News[]): NewsDistribution {
  const structure = emptyNewsDistribution();
  for (const news of newsList) {
    mapNewsToStructure(structure, news);
  }
  return structure;
}

/**
 * Convert single News to structure (convenience)
 */
export function newsToStructure(news: News): NewsDistribution {
  return newsArrayToStructure([news]);
}
