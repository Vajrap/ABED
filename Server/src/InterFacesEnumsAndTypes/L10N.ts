import type { TierEnum } from "./Tiers";
import type { LocationsEnum } from "./Enums/Location";

/**
 * L10N - Localization Type with Markup Support
 * 
 * Combines:
 * 1. Localized text (en, th) with BBCode-style markup
 * 2. Optional tooltip data for entities referenced in markup
 * 
 * Markup syntax:
 * - [char:id]Name[/char]
 * - [loc:id]Location[/loc]
 * - [item:id]Item[/item]
 * - [skill:id]Skill[/skill]
 * - [party:id]Party[/party]
 * - [color:red]Text[/color]
 * - [b]Bold[/b], [i]Italic[/i]
 * 
 * Example:
 * ```
 * L10N({
 *   en: "[char:reis]Reis[/char] learned [skill:flame]Flame Sword[/skill]",
 *   th: "[char:reis]ไรส์[/char] เรียนรู้ [skill:flame]ดาบเพลิง[/skill]",
 *   entities: {
 *     chars: { reis: { name: {...}, level: 5, ... } }
 *   }
 * })
 * ```
 */

// Tooltip data types
export interface CharacterTooltipData {
  name: { en: string; th: string };
  level: number;
  title: string;
  lastSeenLocation?: LocationsEnum;
  portraitUrl?: string;
}

export interface ItemTooltipData {
  name: { en: string; th: string };
  description: { en: string; th: string };
  rarity: TierEnum;
  stats?: Record<string, number>;
  iconUrl?: string;
}

export interface SkillTooltipData {
  name: { en: string; th: string };
  description: { en: string; th: string };
  tier: TierEnum;
  cost?: number;
  iconUrl?: string;
}

export interface LocationTooltipData {
  name: { en: string; th: string };
  description?: { en: string; th: string };
  region: string;
  subRegion: string;
}

export interface PartyTooltipData {
  name: { en: string; th: string };
  memberCount: number;
  members?: Array<{ name: string; level: number }>;
}

// Main L10N type
export interface L10N {
  en: string;
  th: string;
  entities?: {
    chars?: Record<string, CharacterTooltipData>;
    items?: Record<string, ItemTooltipData>;
    skills?: Record<string, SkillTooltipData>;
    locs?: Record<string, LocationTooltipData>;
    parties?: Record<string, PartyTooltipData>;
  };
}

/**
 * Create a localized string with optional tooltip data
 */
export function L10N(data: {
  en: string;
  th: string;
  entities?: L10N["entities"];
}): L10N {
  return {
    en: data.en,
    th: data.th,
    entities: data.entities,
  };
}

/**
 * L10NWithEntities - Auto-build tooltip data from entities
 * 
 * Pass the actual entities and this function will automatically
 * extract tooltip data from them.
 * 
 * @example
 * L10NWithEntities(
 *   {
 *     en: `[char:${char.id}]${char.name}[/char] learned skill`,
 *     th: `[char:${char.id}]${char.name}[/char] เรียนรู้สกิล`
 *   },
 *   { characters: [char] }  // Auto-extracts tooltip data!
 * )
 */
export function L10NWithEntities(
  text: { en: string; th: string },
  context: {
    characters?: Array<any>;      // Character objects
    locations?: LocationsEnum[];  // Location IDs to look up
    items?: Array<any>;           // Item objects
    skills?: Array<any>;          // Skill objects
    parties?: Array<any>;         // Party objects
  }
): L10N {
  const entities: L10N["entities"] = {};
  
  // Auto-build character tooltip data
  if (context.characters && context.characters.length > 0) {
    entities.chars = {};
    for (const char of context.characters) {
      if (!char || char === "none") continue;
      
      entities.chars[char.id] = {
        name: { 
          en: char.name,
          th: char.nameThai || char.name  // Fallback to en if no Thai name
        },
        level: char.level,
        title: typeof char.title === 'string' ? char.title : char.title?.string?.() || "",
        lastSeenLocation: char.location || char.currentLocation,
        portraitUrl: char.portrait,
      };
    }
  }
  
  // Auto-build location tooltip data
  if (context.locations && context.locations.length > 0) {
    entities.locs = {};
    // Import locationRepository dynamically to avoid circular deps
    const { locationRepository } = require("../Entity/Repository/location");
    
    for (const locId of context.locations) {
      const loc = locationRepository.get(locId);
      if (!loc) continue;
      
      entities.locs[locId] = {
        name: {
          en: loc.name || locId,
          th: loc.nameThai || loc.name || locId
        },
        description: loc.description ? {
          en: loc.description,
          th: loc.descriptionThai || loc.description
        } : undefined,
        region: loc.region,
        subRegion: loc.subRegion,
      };
    }
  }
  
  // Auto-build item tooltip data
  if (context.items && context.items.length > 0) {
    entities.items = {};
    for (const item of context.items) {
      if (!item) continue;
      
      entities.items[item.id] = {
        name: {
          en: item.name,
          th: item.nameThai || item.name
        },
        description: {
          en: item.description || "",
          th: item.descriptionThai || item.description || ""
        },
        rarity: item.tier || item.rarity,
        stats: item.stats,
        iconUrl: item.icon,
      };
    }
  }
  
  // Auto-build skill tooltip data
  if (context.skills && context.skills.length > 0) {
    entities.skills = {};
    for (const skill of context.skills) {
      if (!skill) continue;
      
      entities.skills[skill.id] = {
        name: {
          en: skill.name,
          th: skill.nameThai || skill.name
        },
        description: {
          en: skill.description || "",
          th: skill.descriptionThai || skill.description || ""
        },
        tier: skill.tier,
        cost: skill.cost || skill.manaCost,
        iconUrl: skill.icon,
      };
    }
  }
  
  // Auto-build party tooltip data
  if (context.parties && context.parties.length > 0) {
    entities.parties = {};
    for (const party of context.parties) {
      if (!party) continue;
      
      const members = party.characters?.filter((c: any) => c !== "none") || [];
      
      entities.parties[party.partyID || party.id] = {
        name: {
          en: party.name || `${party.leader?.name || "Unknown"}'s Party`,
          th: party.nameThai || party.name || `ปาร์ตี้ของ ${party.leader?.name || "ไม่ทราบ"}`
        },
        memberCount: members.length,
        members: members.slice(0, 5).map((c: any) => ({
          name: c.name,
          level: c.level
        })),
      };
    }
  }
  
  return {
    en: text.en,
    th: text.th,
    entities: Object.keys(entities).length > 0 ? entities : undefined,
  };
}

/**
 * Markup helper functions for building L10N strings
 */

export const markup = {
  /**
   * Character link with tooltip
   */
  char(id: string, enName: string, thName: string): { en: string; th: string } {
    return {
      en: `[char:${id}]${enName}[/char]`,
      th: `[char:${id}]${thName}[/char]`,
    };
  },

  /**
   * Location link with tooltip
   */
  loc(id: string, enName: string, thName: string): { en: string; th: string } {
    return {
      en: `[loc:${id}]${enName}[/loc]`,
      th: `[loc:${id}]${thName}[/loc]`,
    };
  },

  /**
   * Item link with tooltip
   */
  item(id: string, enName: string, thName: string): { en: string; th: string } {
    return {
      en: `[item:${id}]${enName}[/item]`,
      th: `[item:${id}]${thName}[/item]`,
    };
  },

  /**
   * Skill link with tooltip
   */
  skill(id: string, enName: string, thName: string): { en: string; th: string } {
    return {
      en: `[skill:${id}]${enName}[/skill]`,
      th: `[skill:${id}]${thName}[/skill]`,
    };
  },

  /**
   * Party link with tooltip
   */
  party(id: string, enName: string, thName: string): { en: string; th: string } {
    return {
      en: `[party:${id}]${enName}[/party]`,
      th: `[party:${id}]${thName}[/party]`,
    };
  },

  /**
   * Colored text
   */
  color(color: string, enText: string, thText: string): { en: string; th: string } {
    return {
      en: `[color:${color}]${enText}[/color]`,
      th: `[color:${color}]${thText}[/color]`,
    };
  },

  /**
   * Bold text
   */
  bold(enText: string, thText: string): { en: string; th: string } {
    return {
      en: `[b]${enText}[/b]`,
      th: `[b]${thText}[/b]`,
    };
  },

  /**
   * Italic text
   */
  italic(enText: string, thText: string): { en: string; th: string } {
    return {
      en: `[i]${enText}[/i]`,
      th: `[i]${thText}[/i]`,
    };
  },
};

/**
 * Validate markup syntax (basic check)
 * Returns true if markup appears valid
 */
export function validateMarkup(text: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check for unclosed tags
  const openTags = text.match(/\[(\w+):/g) || [];
  const closeTags = text.match(/\[\/(\w+)\]/g) || [];
  
  if (openTags.length !== closeTags.length) {
    errors.push(`Mismatched tags: ${openTags.length} open, ${closeTags.length} close`);
  }
  
  // Check for malformed tags
  const malformed = text.match(/\[[^\]]*$/);
  if (malformed) {
    errors.push("Unclosed bracket detected");
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Extract entity IDs from markup
 * Useful for validation
 */
export function extractEntityIds(text: string): {
  chars: string[];
  items: string[];
  skills: string[];
  locs: string[];
  parties: string[];
} {
  const result = {
    chars: [] as string[],
    items: [] as string[],
    skills: [] as string[],
    locs: [] as string[],
    parties: [] as string[],
  };
  
  const regex = /\[(\w+):(\w+)\]/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    const tag = match[1];
    const id = match[2];
    if (!tag || !id) continue;
    
    switch (tag) {
      case "char":
        result.chars.push(id);
        break;
      case "item":
        result.items.push(id);
        break;
      case "skill":
        result.skills.push(id);
        break;
      case "loc":
        result.locs.push(id);
        break;
      case "party":
        result.parties.push(id);
        break;
    }
  }
  
  return result;
}

