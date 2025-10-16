import type {
  News,
  NewsDistribution,
} from "../Entity/News/News";
import type { LocationsEnum } from "../InterFacesEnumsAndTypes/Enums/Location";
import type { RegionEnum } from "../InterFacesEnumsAndTypes/Enums/Region";
import type { SubRegionEnum } from "../InterFacesEnumsAndTypes/Enums/SubRegion";

// Utility to add to a Map<K, V[]>
export function addToWorldScope(
  news: NewsDistribution,
  item: News,
) {
  news.worldScope.push(item);
}

export function addToRegionScope(
  news: NewsDistribution,
  region: RegionEnum,
  item: News,
) {
  const arr = news.regionScope.get(region);
  if (arr) {
    arr.push(item);
  } else {
    news.regionScope.set(region, [item]);
  }
}

export function addToSubRegionScope(
  news: NewsDistribution,
  subRegion: SubRegionEnum,
  item: News,
) {
  const arr = news.subRegionScope.get(subRegion);
  if (arr) {
    arr.push(item);
  } else {
    news.subRegionScope.set(subRegion, [item]);
  }
}

export function addToLocationScope(
  news: NewsDistribution,
  location: LocationsEnum,
  item: News,
) {
  const arr = news.locationScope.get(location);
  if (arr) {
    arr.push(item);
  } else {
    news.locationScope.set(location, [item]);
  }
}

export function addToPartyScope(
  news: NewsDistribution,
  partyId: string,
  item: News,
) {
  const arr = news.partyScope.get(partyId);
  if (arr) {
    arr.push(item);
  } else {
    news.partyScope.set(partyId, [item]);
  }
}

export function addToPrivateScope(
  news: NewsDistribution,
  characterId: string,
  item: News,
) {
  const arr = news.privateScope.get(characterId);
  if (arr) {
    arr.push(item);
  } else {
    news.privateScope.set(characterId, [item]);
  }
}
