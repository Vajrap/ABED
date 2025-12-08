/**
 * Mock news data for UI development
 * 
 * This matches the backend News interface structure
 * In production, news will come from backend News interface
 */

// NewsScope types matching backend
export type NewsScope =
  | { kind: "worldScope" }
  | { kind: "regionScope"; region: string }
  | { kind: "subRegionScope"; subRegion: string }
  | { kind: "locationScope"; location: string }
  | { kind: "partyScope"; partyId: string }
  | { kind: "privateScope"; characterId: string }
  | { kind: "none" };

// L10N content structure (simplified for mock - backend uses full L10N with entities)
export interface L10NContent {
  en: string;
  th?: string;
  entities?: {
    chars?: Record<string, any>;
    items?: Record<string, any>;
    skills?: Record<string, any>;
    locs?: Record<string, any>;
    parties?: Record<string, any>;
  };
}

// GameTimeInterface (matching backend)
export interface GameTimeInterface {
  hour: number; // 1-4 (morning, afternoon, evening, night)
  dayOfWeek: number; // 1-6
  dayOfSeason: number; // 1-48
  season: number; // 1-7
  dayPassed: number;
  year: number;
}

// NewsContext (simplified for mock)
export interface NewsContext {
  region: string;
  subRegion: string;
  location: string;
  partyId: string;
  characterIds: string[];
}

// NewsSignificance enum
export enum NewsSignificance {
  TRIVIAL = "trivial",
  MINOR = "minor",
  NOTABLE = "notable",
  MAJOR = "major",
  MOMENTOUS = "momentous",
}

// NewsPropagation enum
export enum NewsPropagation {
  SECRET = "secret",
  PRIVATE = "private",
  LOCAL = "local",
  REGIONAL = "regional",
  CONTINENTAL = "continental",
  GLOBAL = "global",
}

// MockNews interface matching backend News structure
export interface MockNews {
  id: string;
  ts: GameTimeInterface;
  scope: NewsScope;
  content: L10NContent; // L10N content with markup
  context: NewsContext;
  significance?: NewsSignificance;
  propagation?: NewsPropagation;
  tags?: string[];
}

// Helper to get display label for scope kind
export function getNewsScopeLabel(scope: NewsScope): string {
  switch (scope.kind) {
    case "worldScope":
      return "Global";
    case "regionScope":
      return "Region";
    case "subRegionScope":
      return "Sub-Region";
    case "locationScope":
      return "Location";
    case "partyScope":
      return "Party";
    case "privateScope":
      return "Personal";
    case "none":
      return "None";
    default:
      return "Unknown";
  }
}

// Helper to get the text content from L10N (for display)
export function getNewsContentText(content: L10NContent, language: "en" | "th" = "en"): string {
  return language === "th" && content.th ? content.th : content.en;
}

// Mock news data matching backend structure
export const mockNews: MockNews[] = [
  {
    id: "news-001",
    ts: { hour: 1, dayOfWeek: 1, dayOfSeason: 1, season: 1, dayPassed: 1, year: 1 },
    scope: { kind: "worldScope" },
    content: {
      en: "Nothing happen",
      th: "ไม่มีอะไรเกิดขึ้น",
    },
    context: {
      region: "Central",
      subRegion: "Capital",
      location: "WaywardInn",
      partyId: "party-001",
      characterIds: [],
    },
    significance: NewsSignificance.TRIVIAL,
    propagation: NewsPropagation.LOCAL,
  },
  {
    id: "news-005",
    ts: { hour: 4, dayOfWeek: 1, dayOfSeason: 1, season: 1, dayPassed: 1, year: 1 },
    scope: { kind: "privateScope", characterId: "luna" },
    content: {
      en: "[char:luna]Luna[/char] discovered a hidden treasure chest in the forest",
      th: "[char:luna]ลูน่า[/char] ค้นพบหีบสมบัติที่ซ่อนอยู่ในป่า",
      entities: {
        chars: {
          luna: {
            name: { en: "Luna", th: "ลูน่า" },
            level: 2,
            title: { en: "Warrior", th: "นักรบ" },
            portraitUrl: "f_human01",
          },
        },
      },
    },
    context: {
      region: "Central",
      subRegion: "Capital",
      location: "WaywardInn",
      partyId: "party-001",
      characterIds: ["luna"],
    },
    significance: NewsSignificance.NOTABLE,
    propagation: NewsPropagation.SECRET,
  },
  {
    id: "news-006",
    ts: { hour: 1, dayOfWeek: 3, dayOfSeason: 3, season: 1, dayPassed: 3, year: 1 },
    scope: { kind: "partyScope", partyId: "party-001" },
    content: {
      en: "The party encountered a group of bandits on the road",
      th: "ปาร์ตี้พบกลุ่มโจรบนถนน",
    },
    context: {
      region: "Central",
      subRegion: "Capital",
      location: "WaywardInn",
      partyId: "party-001",
      characterIds: [],
    },
    significance: NewsSignificance.NOTABLE,
    propagation: NewsPropagation.LOCAL,
  },
  {
    id: "news-007",
    ts: { hour: 2, dayOfWeek: 3, dayOfSeason: 3, season: 1, dayPassed: 3, year: 1 },
    scope: { kind: "locationScope", location: "WaywardInn" },
    content: {
      en: "A merchant caravan arrived at [loc:WaywardInn]Wayward Inn[/loc] with rare goods",
      th: "กองคาราวานพ่อค้ามาถึง [loc:WaywardInn]โรงแรมเวย์เวิร์ด[/loc] พร้อมสินค้าหายาก",
      entities: {
        locs: {
          WaywardInn: {
            name: { en: "Wayward Inn", th: "โรงแรมเวย์เวิร์ด" },
            description: { en: "A cozy inn at the crossroads", th: "โรงแรมแสนอบอุ่นที่ทางแยก" },
            region: "Central",
            subRegion: "Capital",
          },
        },
      },
    },
    context: {
      region: "Central",
      subRegion: "Capital",
      location: "WaywardInn",
      partyId: "party-001",
      characterIds: [],
    },
    significance: NewsSignificance.MINOR,
    propagation: NewsPropagation.LOCAL,
  },
  {
    id: "news-008",
    ts: { hour: 3, dayOfWeek: 4, dayOfSeason: 4, season: 1, dayPassed: 4, year: 1 },
    scope: { kind: "privateScope", characterId: "viljah" },
    content: {
      en: "[char:viljah]Viljah[/char] completed crafting a [item:magicStaff]Magic Staff[/item]",
      th: "[char:viljah]วิลจาห์[/char] สร้าง [item:magicStaff]ไม้เท้าเวทย์[/item] สำเร็จ",
      entities: {
        chars: {
          viljah: {
            name: { en: "Viljah", th: "วิลจาห์" },
            level: 1,
            title: { en: "Hermit Mage", th: "นักเวทผู้สันโดษ" },
            portraitUrl: "m_elven01",
          },
        },
        items: {
          magicStaff: {
            name: { en: "Magic Staff", th: "ไม้เท้าเวทย์" },
            description: { en: "A staff imbued with arcane power", th: "ไม้เท้าที่มีพลังเวทย์" },
            rarity: 3,
          },
        },
      },
    },
    context: {
      region: "Central",
      subRegion: "Capital",
      location: "WaywardInn",
      partyId: "party-001",
      characterIds: ["viljah"],
    },
    significance: NewsSignificance.NOTABLE,
    propagation: NewsPropagation.PRIVATE,
  },
  {
    id: "news-009",
    ts: { hour: 4, dayOfWeek: 5, dayOfSeason: 5, season: 1, dayPassed: 5, year: 1 },
    scope: { kind: "regionScope", region: "Central" },
    content: {
      en: "Rumors spread about a dragon sighting in the mountains",
      th: "ข่าวลือแพร่สะพัดเกี่ยวกับการพบเห็นมังกรบนภูเขา",
    },
    context: {
      region: "Central",
      subRegion: "Capital",
      location: "WaywardInn",
      partyId: "party-001",
      characterIds: [],
    },
    significance: NewsSignificance.MAJOR,
    propagation: NewsPropagation.REGIONAL,
  },
  {
    id: "news-002",
    ts: { hour: 2, dayOfWeek: 1, dayOfSeason: 1, season: 1, dayPassed: 1, year: 1 },
    scope: { kind: "locationScope", location: "WaywardInn" },
    content: {
      en: "The weather in [loc:WaywardInn]Wayward Inn[/loc] is weird, it's a heavy rain.",
      th: "สภาพอากาศที่ [loc:WaywardInn]โรงแรมเวย์เวิร์ด[/loc] แปลกมาก ฝนตกหนัก",
      entities: {
        locs: {
          WaywardInn: {
            name: { en: "Wayward Inn", th: "โรงแรมเวย์เวิร์ด" },
            description: { en: "A cozy inn at the crossroads", th: "โรงแรมแสนอบอุ่นที่ทางแยก" },
            region: "Central",
            subRegion: "Capital",
          },
        },
      },
    },
    context: {
      region: "Central",
      subRegion: "Capital",
      location: "WaywardInn",
      partyId: "party-001",
      characterIds: [],
    },
    significance: NewsSignificance.MINOR,
    propagation: NewsPropagation.LOCAL,
  },
  {
    id: "news-003",
    ts: { hour: 3, dayOfWeek: 2, dayOfSeason: 2, season: 1, dayPassed: 2, year: 1 },
    scope: { kind: "partyScope", partyId: "party-001" },
    content: {
      en: "[char:viljah]Viljah[/char] and [char:luna]Luna[/char] became lover",
      th: "[char:viljah]วิลจาห์[/char] และ [char:luna]ลูน่า[/char] กลายเป็นคนรักกัน",
      entities: {
        chars: {
          viljah: {
            name: { en: "Viljah", th: "วิลจาห์" },
            level: 1,
            title: { en: "Hermit Mage", th: "นักเวทผู้สันโดษ" },
            portraitUrl: "m_elven01",
          },
          luna: {
            name: { en: "Luna", th: "ลูน่า" },
            level: 2,
            title: { en: "Warrior", th: "นักรบ" },
            portraitUrl: "f_human01",
          },
        },
      },
    },
    context: {
      region: "Central",
      subRegion: "Capital",
      location: "WaywardInn",
      partyId: "party-001",
      characterIds: ["viljah", "luna"],
    },
    significance: NewsSignificance.NOTABLE,
    propagation: NewsPropagation.PRIVATE,
  },
  {
    id: "news-004",
    ts: { hour: 1, dayOfWeek: 2, dayOfSeason: 2, season: 1, dayPassed: 2, year: 1 },
    scope: { kind: "privateScope", characterId: "viljah" },
    content: {
      en: "[char:viljah]Viljah[/char] trained [skill:strength]strength[/skill] to 14",
      th: "[char:viljah]วิลจาห์[/char] ฝึกฝน[skill:strength]ความแข็งแรง[/skill] ถึง 14",
      entities: {
        chars: {
          viljah: {
            name: { en: "Viljah", th: "วิลจาห์" },
            level: 1,
            title: { en: "Hermit Mage", th: "นักเวทผู้สันโดษ" },
            portraitUrl: "m_elven01",
          },
        },
        skills: {
          strength: {
            name: { en: "Strength", th: "ความแข็งแรง" },
            description: { en: "Physical power attribute", th: "ความแข็งแกร่งทางกายภาพ" },
            tier: 1,
          },
        },
      },
    },
    context: {
      region: "Central",
      subRegion: "Capital",
      location: "WaywardInn",
      partyId: "party-001",
      characterIds: ["viljah"],
    },
    significance: NewsSignificance.MINOR,
    propagation: NewsPropagation.SECRET,
  },
];

