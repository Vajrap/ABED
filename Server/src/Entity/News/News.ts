import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { RegionEnum } from "../../InterFacesEnumsAndTypes/Enums/Region";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";
import { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";

// SCOPE
export type NewsScope =
  | { kind: "world" }
  | { kind: "region"; region: RegionEnum }
  | { kind: "subRegion"; subRegion: SubRegionEnum }
  | { kind: "location"; location: LocationsEnum };

type CharInterface = {
  name: string;
  stats: {};
};

type ItemInterface = {
  name: string;
  stats: {};
};

// TOKENIZED CONTENT (not plain string)
export type NewsToken =
  | { t: "text"; v: string }
  | { t: "loc"; id: LocationsEnum; label?: string }
  | { t: "party"; id: string; label?: string }
  | { t: "char"; v: CharInterface }
  | { t: "item"; v: ItemInterface }
  | { t: "skill"; id: string; label?: string }
  | { t: "tier"; v: TierEnum }
  | { t: "icon"; name: string }; // optional

const newsThings: NewsToken[] = [
  { t: "text", v: "[LOCATION][CRAFT]" },
  { t: "char", v: { name: "someone", stats: {} } },
  { t: "text", v: "has crafted a" },
  { t: "tier", v: TierEnum.legendary },
  { t: "item", v: { name: "sword", stats: {} } },
  { t: "text", v: "!!!!" },
];

export type NewsPriority = "low" | "normal" | "high" | "critical";

// NEWS ITEM
export interface News {
  id: string; // snowflake/uuid
  ts: number; // epoch ms
  scope: NewsScope;
  priority: NewsPriority;
  tags?: string[]; // "craft","legendary","combat"
  tokens: NewsToken[]; // rich, UI-resolvable content
  origin?: {
    // who emitted it
    location?: LocationsEnum;
    partyId?: string;
    system?: "craft" | "combat" | "quest" | string;
  };
}
