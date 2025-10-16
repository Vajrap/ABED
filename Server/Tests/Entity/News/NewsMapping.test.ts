import { describe, test, expect } from "bun:test";
import { 
  createNews, 
  newsToStructure, 
  newsArrayToStructure,
  emptyNewsStruct 
} from "../../../src/Entity/News/News";
import { TierEnum } from "../../../src/InterFacesEnumsAndTypes/Tiers";
import { RegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Region";
import { SubRegionEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { LocationsEnum } from "../../../src/InterFacesEnumsAndTypes/Enums/Location";

describe("News Mapping System", () => {
  describe("newsToStructure() - Single News", () => {
    test("maps world scope news correctly", () => {
      const news = createNews({
        scope: { kind: "worldScope" },
        tokens: [{ t: "text", v: "Test world news" }],
        context: {
          region: undefined as any,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
        secretTier: TierEnum.common
      });

      const structure = newsToStructure(news);

      expect(structure.worldScope.length).toBe(1);
      expect(structure.worldScope[0]).toBe(news);
      expect(structure.regionScope.size).toBe(0);
      expect(structure.subRegionScope.size).toBe(0);
    });

    test("maps region scope news correctly", () => {
      const news = createNews({
        scope: { kind: "regionScope", region: RegionEnum.CentralPlain },
        tokens: [{ t: "text", v: "Test region news" }],
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
        secretTier: TierEnum.common
      });

      const structure = newsToStructure(news);

      expect(structure.worldScope.length).toBe(0);
      expect(structure.regionScope.size).toBe(1);
      expect(structure.regionScope.get(RegionEnum.CentralPlain)?.length).toBe(1);
      expect(structure.regionScope.get(RegionEnum.CentralPlain)?.[0]).toBe(news);
    });

    test("maps subregion scope news correctly", () => {
      const news = createNews({
        scope: { kind: "subRegionScope", subRegion: SubRegionEnum.FyonarCapitalDistrict },
        tokens: [{ t: "text", v: "Test subregion news" }],
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: SubRegionEnum.FyonarCapitalDistrict,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
        secretTier: TierEnum.common
      });

      const structure = newsToStructure(news);

      expect(structure.subRegionScope.size).toBe(1);
      expect(structure.subRegionScope.get(SubRegionEnum.FyonarCapitalDistrict)?.length).toBe(1);
    });

    test("maps location scope news correctly", () => {
      const news = createNews({
        scope: { kind: "locationScope", location: LocationsEnum.PlagueWaterCrossing },
        tokens: [{ t: "text", v: "Test location news" }],
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: SubRegionEnum.FyonarCapitalDistrict,
          location: LocationsEnum.PlagueWaterCrossing,
          partyId: "",
          characterIds: []
        },
        secretTier: TierEnum.common
      });

      const structure = newsToStructure(news);

      expect(structure.locationScope.size).toBe(1);
      expect(structure.locationScope.get(LocationsEnum.PlagueWaterCrossing)?.length).toBe(1);
    });

    test("maps party scope news correctly", () => {
      const news = createNews({
        scope: { kind: "partyScope", partyId: "party123" },
        tokens: [{ t: "text", v: "Test party news" }],
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: SubRegionEnum.FyonarCapitalDistrict,
          location: LocationsEnum.PlagueWaterCrossing,
          partyId: "party123",
          characterIds: []
        },
        secretTier: TierEnum.common
      });

      const structure = newsToStructure(news);

      expect(structure.partyScope.size).toBe(1);
      expect(structure.partyScope.get("party123")?.length).toBe(1);
    });

    test("maps private scope news correctly", () => {
      const news = createNews({
        scope: { kind: "privateScope", characterId: "char456" },
        tokens: [{ t: "text", v: "Test private news" }],
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: SubRegionEnum.FyonarCapitalDistrict,
          location: LocationsEnum.PlagueWaterCrossing,
          partyId: "party123",
          characterIds: ["char456"]
        },
        secretTier: TierEnum.rare
      });

      const structure = newsToStructure(news);

      expect(structure.privateScope.size).toBe(1);
      expect(structure.privateScope.get("char456")?.length).toBe(1);
    });

    test("ignores 'none' scope news", () => {
      const news = createNews({
        scope: { kind: "none" },
        tokens: [{ t: "text", v: "Test ignored news" }],
        context: {
          region: undefined as any,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
        secretTier: TierEnum.common
      });

      const structure = newsToStructure(news);

      expect(structure.worldScope.length).toBe(0);
      expect(structure.regionScope.size).toBe(0);
      expect(structure.subRegionScope.size).toBe(0);
      expect(structure.locationScope.size).toBe(0);
      expect(structure.partyScope.size).toBe(0);
      expect(structure.privateScope.size).toBe(0);
    });
  });

  describe("newsArrayToStructure() - Multiple News", () => {
    test("maps multiple news items to different scopes", () => {
      const news1 = createNews({
        scope: { kind: "worldScope" },
        tokens: [{ t: "text", v: "World news" }],
        context: {
          region: undefined as any,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
        secretTier: TierEnum.common
      });

      const news2 = createNews({
        scope: { kind: "regionScope", region: RegionEnum.CentralPlain },
        tokens: [{ t: "text", v: "Region news" }],
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
        secretTier: TierEnum.common
      });

      const news3 = createNews({
        scope: { kind: "partyScope", partyId: "party123" },
        tokens: [{ t: "text", v: "Party news" }],
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: SubRegionEnum.FyonarCapitalDistrict,
          location: LocationsEnum.PlagueWaterCrossing,
          partyId: "party123",
          characterIds: []
        },
        secretTier: TierEnum.common
      });

      const structure = newsArrayToStructure([news1, news2, news3]);

      expect(structure.worldScope.length).toBe(1);
      expect(structure.regionScope.size).toBe(1);
      expect(structure.partyScope.size).toBe(1);
    });

    test("groups multiple news items for same region", () => {
      const news1 = createNews({
        scope: { kind: "regionScope", region: RegionEnum.CentralPlain },
        tokens: [{ t: "text", v: "News 1" }],
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
        secretTier: TierEnum.common
      });

      const news2 = createNews({
        scope: { kind: "regionScope", region: RegionEnum.CentralPlain },
        tokens: [{ t: "text", v: "News 2" }],
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
        secretTier: TierEnum.common
      });

      const structure = newsArrayToStructure([news1, news2]);

      expect(structure.regionScope.size).toBe(1);
      expect(structure.regionScope.get(RegionEnum.CentralPlain)?.length).toBe(2);
      expect(structure.regionScope.get(RegionEnum.CentralPlain)).toEqual([news1, news2]);
    });

    test("handles empty array", () => {
      const structure = newsArrayToStructure([]);

      expect(structure.worldScope.length).toBe(0);
      expect(structure.regionScope.size).toBe(0);
      expect(structure.subRegionScope.size).toBe(0);
      expect(structure.locationScope.size).toBe(0);
      expect(structure.partyScope.size).toBe(0);
      expect(structure.privateScope.size).toBe(0);
    });

    test("handles mixed scopes efficiently", () => {
      const newsList = [
        createNews({
          scope: { kind: "worldScope" },
          tokens: [{ t: "text", v: "World 1" }],
          context: {
            region: undefined as any,
            subRegion: undefined as any,
            location: undefined as any,
            partyId: "",
            characterIds: []
          },
          secretTier: TierEnum.common
        }),
        createNews({
          scope: { kind: "worldScope" },
          tokens: [{ t: "text", v: "World 2" }],
          context: {
            region: undefined as any,
            subRegion: undefined as any,
            location: undefined as any,
            partyId: "",
            characterIds: []
          },
          secretTier: TierEnum.common
        }),
        createNews({
          scope: { kind: "regionScope", region: RegionEnum.NorthernReach },
          tokens: [{ t: "text", v: "North news" }],
          context: {
            region: RegionEnum.NorthernReach,
            subRegion: undefined as any,
            location: undefined as any,
            partyId: "",
            characterIds: []
          },
          secretTier: TierEnum.common
        }),
        createNews({
          scope: { kind: "regionScope", region: RegionEnum.SouthernShore },
          tokens: [{ t: "text", v: "South news" }],
          context: {
            region: RegionEnum.SouthernShore,
            subRegion: undefined as any,
            location: undefined as any,
            partyId: "",
            characterIds: []
          },
          secretTier: TierEnum.common
        }),
      ];

      const structure = newsArrayToStructure(newsList);

      expect(structure.worldScope.length).toBe(2);
      expect(structure.regionScope.size).toBe(2);
      expect(structure.regionScope.get(RegionEnum.NorthernReach)?.length).toBe(1);
      expect(structure.regionScope.get(RegionEnum.SouthernShore)?.length).toBe(1);
    });
  });

  describe("Real-World Usage", () => {
    test("event card example: single world news", () => {
      // Simplified event card pattern
      const news = createNews({
        scope: { kind: "worldScope" },
        tokens: [{ t: "text", v: "Famine strikes!" }],
        context: {
          region: undefined as any,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
        secretTier: TierEnum.rare
      });

      // BEFORE: Manual structure building (verbose)
      // return {
      //   worldScope: [news],
      //   regionScope: new Map(),
      //   subRegionScope: new Map(),
      //   locationScope: new Map(),
      //   partyScope: new Map(),
      //   privateScope: new Map(),
      // };

      // AFTER: Simple helper (one line!)
      const structure = newsToStructure(news);

      expect(structure.worldScope).toEqual([news]);
    });

    test("event card example: multi-region news", () => {
      // Regional conflict affecting 2 regions
      const worldNews = createNews({
        scope: { kind: "worldScope" },
        tokens: [{ t: "text", v: "War erupts!" }],
        context: {
          region: undefined as any,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
        secretTier: TierEnum.uncommon
      });

      const northNews = createNews({
        scope: { kind: "regionScope", region: RegionEnum.NorthernReach },
        tokens: [{ t: "text", v: "Northern armies mobilize" }],
        context: {
          region: RegionEnum.NorthernReach,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
        secretTier: TierEnum.uncommon
      });

      const borealNews = createNews({
        scope: { kind: "regionScope", region: RegionEnum.BorealFrost },
        tokens: [{ t: "text", v: "Frost warriors march" }],
        context: {
          region: RegionEnum.BorealFrost,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
        secretTier: TierEnum.uncommon
      });

      // BEFORE: Manual Map construction (verbose, error-prone)
      // return {
      //   worldScope: [worldNews],
      //   regionScope: new Map([
      //     [RegionEnum.NorthernReach, [northNews]],
      //     [RegionEnum.BorealFrost, [borealNews]],
      //   ]),
      //   subRegionScope: new Map(),
      //   locationScope: new Map(),
      //   partyScope: new Map(),
      //   privateScope: new Map(),
      // };

      // AFTER: Auto-mapping (clean!)
      const structure = newsArrayToStructure([worldNews, northNews, borealNews]);

      expect(structure.worldScope.length).toBe(1);
      expect(structure.regionScope.size).toBe(2);
      expect(structure.regionScope.get(RegionEnum.NorthernReach)).toEqual([northNews]);
      expect(structure.regionScope.get(RegionEnum.BorealFrost)).toEqual([borealNews]);
    });

    test("weather update example", () => {
      // drawSubRegionsWeatherCard returns News[]
      const weatherNews = [
        createNews({
          scope: { kind: "subRegionScope", subRegion: SubRegionEnum.FyonarCapitalDistrict },
          tokens: [{ t: "text", v: "Sunny" }],
          context: {
            region: RegionEnum.CentralPlain,
            subRegion: SubRegionEnum.FyonarCapitalDistrict,
            location: undefined as any,
            partyId: "",
            characterIds: []
          },
          secretTier: TierEnum.common
        }),
        createNews({
          scope: { kind: "subRegionScope", subRegion: SubRegionEnum.BlackCoast },
          tokens: [{ t: "text", v: "Snowing" }],
          context: {
            region: RegionEnum.NorthernReach,
            subRegion: SubRegionEnum.BlackCoast,
            location: undefined as any,
            partyId: "",
            characterIds: []
          },
          secretTier: TierEnum.common
        }),
      ];

      // BEFORE: Manual loop (GameLoop line 145-147)
      // for (const wn of weatherNews) {
      //   addToSubRegionScope(allNews, wn.context.subRegion, wn);
      // }

      // AFTER: Auto-mapping!
      const structure = newsArrayToStructure(weatherNews);

      expect(structure.subRegionScope.size).toBe(2);
      expect(structure.subRegionScope.get(SubRegionEnum.FyonarCapitalDistrict)?.length).toBe(1);
      expect(structure.subRegionScope.get(SubRegionEnum.BlackCoast)?.length).toBe(1);
    });
  });

  describe("Code Reduction", () => {
    test("BEFORE: 13 lines → AFTER: 1 line", () => {
      const news = createNews({
        scope: { kind: "worldScope" },
        tokens: [{ t: "text", v: "Test" }],
        context: {
          region: undefined as any,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
        secretTier: TierEnum.common
      });

      // BEFORE (13 lines):
      // return {
      //   worldScope: [news],
      //   regionScope: new Map(),
      //   subRegionScope: new Map(),
      //   locationScope: new Map(),
      //   partyScope: new Map(),
      //   privateScope: new Map(),
      // };

      // AFTER (1 line):
      const structure = newsToStructure(news);

      // Both produce same result
      expect(structure.worldScope).toEqual([news]);
      expect(structure.regionScope.size).toBe(0);
    });

    test("BEFORE: Manual Map building → AFTER: Auto-mapping", () => {
      const news1 = createNews({
        scope: { kind: "regionScope", region: RegionEnum.CentralPlain },
        tokens: [{ t: "text", v: "News 1" }],
        context: {
          region: RegionEnum.CentralPlain,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
        secretTier: TierEnum.common
      });

      const news2 = createNews({
        scope: { kind: "regionScope", region: RegionEnum.SouthernShore },
        tokens: [{ t: "text", v: "News 2" }],
        context: {
          region: RegionEnum.SouthernShore,
          subRegion: undefined as any,
          location: undefined as any,
          partyId: "",
          characterIds: []
        },
        secretTier: TierEnum.common
      });

      // BEFORE (9+ lines):
      // return {
      //   worldScope: [],
      //   regionScope: new Map([
      //     [RegionEnum.CentralPlain, [news1]],
      //     [RegionEnum.SouthernShore, [news2]],
      //   ]),
      //   subRegionScope: new Map(),
      //   locationScope: new Map(),
      //   partyScope: new Map(),
      //   privateScope: new Map(),
      // };

      // AFTER (1 line):
      const structure = newsArrayToStructure([news1, news2]);

      expect(structure.regionScope.size).toBe(2);
      expect(structure.regionScope.get(RegionEnum.CentralPlain)).toEqual([news1]);
      expect(structure.regionScope.get(RegionEnum.SouthernShore)).toEqual([news2]);
    });
  });
});

