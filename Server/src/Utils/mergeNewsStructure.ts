import type {
  News,
  NewsDistribution,
} from "../Entity/News/News";

export function mergeNewsStructures(
  ...structures: NewsDistribution[]
): NewsDistribution {
  const mergeMaps = (
    base: Map<any, News[]>,
    incoming: Map<any, News[]>,
  ): Map<any, News[]> => {
    const result = new Map(base);

    for (const [key, value] of incoming.entries()) {
      if (result.has(key)) {
        result.set(key, [...(result.get(key) ?? []), ...value]);
      } else {
        result.set(key, [...value]);
      }
    }

    return result;
  };

  return structures.reduce<NewsDistribution>(
    (acc, curr) => ({
      worldScope: [...acc.worldScope, ...curr.worldScope],
      regionScope: mergeMaps(acc.regionScope, curr.regionScope),
      subRegionScope: mergeMaps(acc.subRegionScope, curr.subRegionScope),
      locationScope: mergeMaps(acc.locationScope, curr.locationScope),
      partyScope: mergeMaps(acc.partyScope, curr.partyScope),
      privateScope: mergeMaps(acc.privateScope, curr.privateScope),
    }),
    {
      worldScope: [],
      regionScope: new Map(),
      subRegionScope: new Map(),
      locationScope: new Map(),
      partyScope: new Map(),
      privateScope: new Map(),
    },
  );
}
