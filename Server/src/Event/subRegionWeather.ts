import { subregionRepository } from "src/Entity/Location/SubRegion/repository.ts";
import type {News} from "../Entity/News/News.ts";


export const drawSubRegionsWeatherCard = (): News[] => {
    console.log("\n--- Drawing Weather Cards ---");
    let news: News[] = [];

    const subRegions = Object.values(subregionRepository);
    console.log(`Found ${subRegions.length} subregions:`, subRegions.map(sr => sr.id));

    for (const subRegion of subRegions) {
        console.log(`Processing weather for subregion: ${subRegion.id}`);
        const allNews = subRegion.handleDailyWeatherUpdate();
        console.log(`Generated ${allNews.length} weather news items for ${subRegion.id}`);
        news.push(...allNews);
    }

    console.log(`Total weather news generated: ${news.length}`);
    return news;
}
