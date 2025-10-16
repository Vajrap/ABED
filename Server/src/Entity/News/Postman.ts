import { connectionManager } from "../Connection/connectionManager";
import type { News, NewsDistribution } from "./News";
import WebSocket from "bun";

type NewsPayload =
  | { type: "NEWS"; data: { worldScope: News[] } }
  | { type: "NEWS_REGION"; data: News[] }
  | { type: "NEWS_SUBREGION"; data: News[] }
  | { type: "NEWS_LOCATION"; data: News[] }
  | { type: "NEWS_PARTY"; data: News[] }
  | { type: "NEWS_PRIVATE"; data: News[] };

function buildCache(news: NewsDistribution) {
  const cache = {
    world: {
      type: "NEWS",
      data: { worldScope: news.worldScope },
    } as NewsPayload,
    regions: new Map<string, NewsPayload>(),
    subRegions: new Map<string, NewsPayload>(),
    locations: new Map<string, NewsPayload>(),
  };

  for (const [regionId, data] of news.regionScope.entries()) {
    cache.regions.set(regionId, { type: "NEWS_REGION", data });
  }
  for (const [subRegionId, data] of news.subRegionScope.entries()) {
    cache.subRegions.set(subRegionId, { type: "NEWS_SUBREGION", data });
  }
  for (const [locationId, data] of news.locationScope.entries()) {
    cache.locations.set(locationId, { type: "NEWS_LOCATION", data });
  }

  return cache;
}

class Postman {
  deliver(news: NewsDistribution) {
    const cache = buildCache(news);

    for (const cl of connectionManager.getConnections()) {
      const parts: {
        world: NewsPayload[];
        regions: NewsPayload[];
        subRegions: NewsPayload[];
        locations: NewsPayload[];
        party: NewsPayload[];
        private: NewsPayload[];
      } = {
        world: [cache.world],
        regions: [],
        subRegions: [],
        locations: [],
        party: [],
        private: [],
      };

      const regionPayload = cache.regions.get(cl.context.regionId);
      if (regionPayload) parts.regions.push(regionPayload);

      const subRegionPayload = cache.subRegions.get(cl.context.subRegionId);
      if (subRegionPayload) parts.subRegions.push(subRegionPayload);

      const locationPayload = cache.locations.get(cl.context.locationId);
      if (locationPayload) parts.locations.push(locationPayload);

      // Party + private remain per-client
      const party = news.partyScope.get(cl.context.partyId) ?? [];
      if (party.length > 0) {
        parts.party.push({ type: "NEWS_PARTY", data: party });
      }

      const priv = news.privateScope.get(cl.context.userId) ?? [];
      if (priv.length > 0) {
        parts.private.push({ type: "NEWS_PRIVATE", data: priv });
      }

      try {
        cl.ws.send(JSON.stringify(parts));
      } catch (e) {
        console.error(`Immediate send error for ${cl.context.userId}`, e);
        connectionManager.unregister(cl.context.userId);
      }
    }
  }
}

export const postman = new Postman();
