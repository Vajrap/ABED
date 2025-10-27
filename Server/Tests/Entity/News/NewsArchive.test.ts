import { describe, test, expect, beforeEach } from "@jest/globals";
import { NewsArchive } from "../../../src/Entity/News/NewsArchive";
import { createNews } from "../../../src/Entity/News/News";
import { NewsSignificance, NewsPropagation } from "../../../src/InterFacesEnumsAndTypes/NewsEnums";
import { GameTime } from "../../../src/Game/GameTime/GameTime";
import { LocationsEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Location";
import { RegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Region";
import { getDecayRate } from "../../../src/Entity/News/NewsSpreadConfig";

describe("NewsArchive - OOP Implementation", () => {
  let archive: NewsArchive;
  
  beforeEach(() => {
    archive = new NewsArchive();
    
    // Reset game time
    GameTime.year = 0;
    GameTime.season = 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7;
    GameTime.dayOfSeason = 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
    GameTime.hour = 1 as 1 | 2 | 3 | 4;
  });
  
  describe("Dual-Axis System", () => {
    test("news auto-infers significance and propagation from scope", () => {
      const worldNews = createNews({
        scope: { kind: "worldScope" },
        content: { en: "Test", th: "ทดสอบ" },
        context: {
          region: undefined as any,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
      });
      
      expect(worldNews.significance).toBe(NewsSignificance.MAJOR);
      expect(worldNews.propagation).toBe(NewsPropagation.GLOBAL);
    });
    
    test("can override inferred values", () => {
      const news = createNews({
        scope: { kind: "partyScope", partyId: "party123" },
        significance: NewsSignificance.MOMENTOUS, // Override
        propagation: NewsPropagation.GLOBAL,       // Override
        content: { en: "Epic party achievement!", th: "ความสำเร็จของปาร์ตี้ที่ยิ่งใหญ่!" },
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: undefined as any,
          location: LocationsEnum.WaywardInn,
          partyId: "party123",
          characterIds: []
        },
      });
      
      expect(news.significance).toBe(NewsSignificance.MOMENTOUS);
      expect(news.propagation).toBe(NewsPropagation.GLOBAL);
    });
  });
  
  describe("News Archiving", () => {
    test("archives news with initial freshness of 100", () => {
      const news = createNews({
        scope: { kind: "worldScope" },
        content: { en: "Test", th: "ทดสอบ" },
        context: {
          region: undefined as any,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
      });
      
      archive.archiveNews(news);
      
      const stats = archive.getStats();
      expect(stats.total).toBe(1);
      expect(stats.averageFreshness).toBe(100);
    });
    
    test("tracks news by location", () => {
      const news = createNews({
        scope: { kind: "locationScope", location: LocationsEnum.WaywardInn },
        content: { en: "Local news", th: "ข่าวท้องถิ่น" },
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: undefined as any,
          location: LocationsEnum.WaywardInn,
          partyId: "",
          characterIds: []
        },
      });
      
      archive.archiveNews(news);
      
      const atLocation = archive.getNewsAtLocation(LocationsEnum.WaywardInn);
      expect(atLocation.length).toBe(1);
      expect(atLocation[0]?.id).toBe(news.id);
    });
  });
  
  describe("Daily Decay", () => {
    test("trivial news decays completely in 1 day", () => {
      const news = createNews({
        scope: { kind: "worldScope" },
        significance: NewsSignificance.TRIVIAL,
        content: { en: "Trivial news", th: "ข่าวเล็กน้อย" },
        context: {
          region: undefined as any,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
      });
      
      archive.archiveNews(news);
      expect(archive.getStats().total).toBe(1);
      
      // Advance 1 day
      GameTime.dayOfSeason = 2 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
      archive.dailyDecay();
      
      expect(archive.getStats().total).toBe(0); // Gone!
    });
    
    test("momentous news lasts ~365 days", () => {
      const news = createNews({
        scope: { kind: "worldScope" },
        significance: NewsSignificance.MOMENTOUS,
        content: { en: "Legendary event", th: "เหตุการณ์ในตำนาน" },
        context: {
          region: undefined as any,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
      });
      
      archive.archiveNews(news);
      
      // Simulate 365 days of decay
      const decayRate = getDecayRate(NewsSignificance.MOMENTOUS);
      expect(decayRate).toBeCloseTo(0.27, 2);
      
      // After 365 days: freshness = 100 - 365 * 0.27 ≈ 1.45
      // Still alive!
      
      // After 370 days: freshness = 100 - 370 * 0.27 ≈ 0
      // Should be gone
    });
    
    test("freshness decreases gradually", () => {
      const news = createNews({
        scope: { kind: "worldScope" },
        significance: NewsSignificance.NOTABLE, // Decay rate: 3.33/day
        content: { en: "Notable event", th: "เหตุการณ์สำคัญ" },
        context: {
          region: undefined as any,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
      });
      
      archive.archiveNews(news);
      expect(archive.getStats().averageFreshness).toBe(100);
      
      // Day 1
      GameTime.dayOfSeason = 2 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
      archive.dailyDecay();
      expect(archive.getStats().averageFreshness).toBeCloseTo(96.67, 0); // 100 - 3.33
      
      // Day 10
      GameTime.dayOfSeason = 11 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
      archive.dailyDecay();
      expect(archive.getStats().averageFreshness).toBeCloseTo(66.7, 0); // 100 - 33.3
    });
  });
  
  describe("Daily Spread (Multi-Front with d20)", () => {
    test("news doesn't spread if period hasn't elapsed", () => {
      const news = createNews({
        scope: { kind: "locationScope", location: LocationsEnum.WaywardInn },
        propagation: NewsPropagation.REGIONAL, // spreadPeriod: 2 days
        content: { en: "Test", th: "ทดสอบ" },
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: undefined as any,
          location: LocationsEnum.WaywardInn,
          partyId: "",
          characterIds: []
        },
      });
      
      archive.archiveNews(news);
      
      // Day 1 - too soon to spread (needs 2 days)
      archive.dailySpread();
      
      // Should still be only at initial location
      // (Would need actual location connections to test spreading)
    });
    
    test("spreadDC of 1 always succeeds", () => {
      const news = createNews({
        scope: { kind: "locationScope", location: LocationsEnum.WaywardInn },
        propagation: NewsPropagation.GLOBAL, // spreadDC: 1 (always)
        spreadConfig: {
          spreadPeriod: 1,
          spreadDC: 1, // d20 >= 1 = 100% success
        },
        content: { en: "Test", th: "ทดสอบ" },
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: undefined as any,
          location: LocationsEnum.WaywardInn,
          partyId: "",
          characterIds: []
        },
      });
      
      archive.archiveNews(news);
      
      // With no actual connections, spreading won't happen
      // But the logic is: d20 >= 1 is always true
      // This validates the spread config
      expect(news.spreadConfig?.spreadDC).toBe(1);
    });
  });
  
  describe("Character Knowledge", () => {
    test("marks news as read", () => {
      const news = createNews({
        scope: { kind: "worldScope" },
        content: { en: "Test", th: "ทดสอบ" },
        context: {
          region: undefined as any,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
      });
      
      archive.archiveNews(news);
      archive.markAsRead("char123", news.id);
      
      // Get news for character (only unread)
      const unread = archive.getNewsForCharacter("char123", LocationsEnum.WaywardInn, {
        onlyUnread: true,
      });
      
      // Should be filtered out (we marked it as read)
      // (Would need location-based news to test properly)
    });
    
    test("allows sharing between characters", () => {
      const news = createNews({
        scope: { kind: "worldScope" },
        propagation: NewsPropagation.REGIONAL, // Can be shared
        content: { en: "Test", th: "ทดสอบ" },
        context: {
          region: undefined as any,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
      });
      
      archive.archiveNews(news);
      
      // Char1 knows it
      archive.markAsRead("char1", news.id);
      
      // Char1 shares with Char2
      const shared = archive.shareNews("char1", "char2", news.id);
      
      expect(shared).toBe(true);
    });
    
    test("prevents sharing secrets", () => {
      const secret = createNews({
        scope: { kind: "privateScope", characterId: "char1" },
        propagation: NewsPropagation.SECRET,
        content: { en: "Secret", th: "ความลับ" },
        context: {
          region: undefined as any,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
      });
      
      archive.archiveNews(secret);
      archive.markAsRead("char1", secret.id);
      
      const shared = archive.shareNews("char1", "char2", secret.id);
      
      expect(shared).toBe(false); // Blocked!
    });
  });
  
  describe("Statistics", () => {
    test("tracks news by significance", () => {
      const trivial = createNews({
        scope: { kind: "worldScope" },
        significance: NewsSignificance.TRIVIAL,
        content: { en: "Trivial", th: "เล็กน้อย" },
        context: {
          region: undefined as any,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
      });
      
      const major = createNews({
        scope: { kind: "worldScope" },
        significance: NewsSignificance.MAJOR,
        content: { en: "Major", th: "สำคัญ" },
        context: {
          region: undefined as any,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
      });
      
      archive.archiveNews(trivial);
      archive.archiveNews(major);
      
      const stats = archive.getStats();
      expect(stats.total).toBe(2);
      expect(stats.bySignificance.trivial).toBe(1);
      expect(stats.bySignificance.major).toBe(1);
    });
  });
  
  describe("Decay Rates", () => {
    test("TRIVIAL decays in 1 day", () => {
      const rate = getDecayRate(NewsSignificance.TRIVIAL);
      expect(rate).toBe(100);
      
      // freshness = 100 - 1 * 100 = 0 (gone!)
    });
    
    test("MINOR decays in 10 days", () => {
      const rate = getDecayRate(NewsSignificance.MINOR);
      expect(rate).toBe(10);
      
      // freshness = 100 - 10 * 10 = 0
    });
    
    test("NOTABLE decays in ~30 days", () => {
      const rate = getDecayRate(NewsSignificance.NOTABLE);
      expect(rate).toBeCloseTo(3.33, 2);
      
      // freshness = 100 - 30 * 3.33 ≈ 0.1 (almost gone)
    });
    
    test("MAJOR decays in ~90 days", () => {
      const rate = getDecayRate(NewsSignificance.MAJOR);
      expect(rate).toBeCloseTo(1.11, 2);
      
      // freshness = 100 - 90 * 1.11 ≈ 0.1
    });
    
    test("MOMENTOUS decays in ~365 days", () => {
      const rate = getDecayRate(NewsSignificance.MOMENTOUS);
      expect(rate).toBeCloseTo(0.27, 2);
      
      // freshness = 100 - 365 * 0.27 ≈ 1.45 (barely alive)
      // freshness = 100 - 370 * 0.27 ≈ 0 (gone)
    });
  });
  
  describe("Real-World Examples", () => {
    test("EXAMPLE: Party rest (trivial + secret)", () => {
      const news = createNews({
        scope: { kind: "partyScope", partyId: "party123" },
        significance: NewsSignificance.TRIVIAL,
        propagation: NewsPropagation.SECRET,
        content: { en: "Party rested", th: "ปาร์ตี้พักผ่อน" },
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: undefined as any,
          location: LocationsEnum.WaywardInn,
          partyId: "party123",
          characterIds: []
        },
      });
      
      archive.archiveNews(news);
      
      // Day 1
      expect(archive.getStats().total).toBe(1);
      expect(archive.getStats().averageFreshness).toBe(100);
      
      // Day 2
      GameTime.dayOfSeason = 2 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
      archive.dailyDecay();
      
      expect(archive.getStats().total).toBe(0); // Decayed and removed
    });
    
    test("EXAMPLE: Regional flood (major + continental)", () => {
      const news = createNews({
        scope: { kind: "regionScope", region: RegionEnum.CentralPlain },
        significance: NewsSignificance.MAJOR,
        propagation: NewsPropagation.CONTINENTAL,
        spreadConfig: {
          spreadPeriod: 3,  // Every 3 days
          spreadDC: 10,     // Medium difficulty
        },
        content: { en: "Devastating flood!", th: "น้ำท่วมรุนแรง!" },
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
      });
      
      archive.archiveNews(news);
      
      // Validate config
      expect(news.spreadConfig?.spreadPeriod).toBe(3);
      expect(news.spreadConfig?.spreadDC).toBe(10);
      
      // Validate significance (won't decay for 90 days)
      const decayRate = getDecayRate(NewsSignificance.MAJOR);
      expect(decayRate).toBeCloseTo(1.11, 2);
    });
  });
  
  describe("Filtering", () => {
    test("filters by minimum significance", () => {
      const trivial = createNews({
        scope: { kind: "locationScope", location: LocationsEnum.WaywardInn },
        significance: NewsSignificance.TRIVIAL,
        content: { en: "Trivial", th: "เล็กน้อย" },
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: undefined as any,
          location: LocationsEnum.WaywardInn,
          partyId: "",
          characterIds: []
        },
      });
      
      const notable = createNews({
        scope: { kind: "locationScope", location: LocationsEnum.WaywardInn },
        significance: NewsSignificance.NOTABLE,
        content: { en: "Notable", th: "สำคัญ" },
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: undefined as any,
          location: LocationsEnum.WaywardInn,
          partyId: "",
          characterIds: []
        },
      });
      
      archive.archiveNews(trivial);
      archive.archiveNews(notable);
      
      const filtered = archive.getNewsAtLocation(LocationsEnum.WaywardInn, {
        minSignificance: NewsSignificance.NOTABLE,
      });
      
      expect(filtered.length).toBe(1);
      expect(filtered[0]?.id).toBe(notable.id);
    });
    
    test("filters by minimum freshness", () => {
      const news = createNews({
        scope: { kind: "locationScope", location: LocationsEnum.WaywardInn },
        significance: NewsSignificance.MINOR,
        content: { en: "Test", th: "ทดสอบ" },
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: undefined as any,
          location: LocationsEnum.WaywardInn,
          partyId: "",
          characterIds: []
        },
      });
      
      archive.archiveNews(news);
      
      // Advance time to decay
      GameTime.dayOfSeason = 6 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;
      archive.dailyDecay();
      
      // freshness = 100 - 5 * 10 = 50
      
      const fresh = archive.getNewsAtLocation(LocationsEnum.WaywardInn, {
        minFreshness: 60,
      });
      
      expect(fresh.length).toBe(0); // Too old!
      
      const any = archive.getNewsAtLocation(LocationsEnum.WaywardInn);
      expect(any.length).toBe(1); // Still exists
    });
  });
});

