import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import { RegionEnum } from "../../InterFacesEnumsAndTypes/Enums/Region";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";

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
export interface News {
  ts: number; // epoch ms
  scope: NewsScope;
  tags?: NewsTag[]; // "craft","legendary","combat"
  tokens: NewsToken[]; // rich, UI-resolvable content
  context: NewsContext;
}

export function createNews(data: {
  scope: NewsScope;
  tokens: NewsToken[];
  origin?: {
    location?: LocationsEnum;
    partyId?: string;
    system?: "craft" | "combat" | "quest" | string;
  };
  context: NewsContext;
}): News {
  const ts = Date.now();
  return {
    ts,
    scope: data.scope,
    tokens: data.tokens,
    context: data.context,
  };
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

export type NewsEmittedFromLocationStructure = {
  worldScope: News[];
  regionScope: Map<RegionEnum, News[]>;
  subRegionScope: Map<SubRegionEnum, News[]>;
  locationScope: Map<LocationsEnum, News[]>;
  partyScope: Map<string, News[]>;
  privateScope: Map<string, News[]>;
};

// each event should emit this, and the handler might be the one dealing with then, putting into the map
export type NewsWithScope = {
  scope: NewsScope;
  news: News;
};

export function emptyNewsStruct(): NewsEmittedFromLocationStructure {
  return {
    worldScope: [],
    regionScope: new Map(),
    subRegionScope: new Map(),
    locationScope: new Map(),
    partyScope: new Map(),
    privateScope: new Map(),
  };
}
