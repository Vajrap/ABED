import { subregionRepository } from "src/Entity/Location/repository";
import type { News } from "../Entity/News/News.ts";
import Report from "../Utils/Reporter";

export const drawSubRegionsWeatherCard = (): News[] => {
  Report.debug("\n--- Drawing Weather Cards ---");
  let news: News[] = [];

  const subRegions = Object.values(subregionRepository);
  Report.debug(`Found ${subRegions.length} subregions`, subRegions.map(sr => sr.id));

  for (const subRegion of subRegions) {
    Report.debug(`Processing weather for subregion: ${subRegion.id}`);
    const allNews = subRegion.handleDailyWeatherUpdate();
    Report.debug(`Generated ${allNews.length} weather news items for ${subRegion.id}`);
    news.push(...allNews);
  }

  Report.debug(`Total weather news generated: ${news.length}`);
  return news;
};
