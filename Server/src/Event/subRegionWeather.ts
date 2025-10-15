import type {News} from "../Entity/News/News.ts";
import {subregionRepository} from "../Entity/Repository/subregion.ts";


export const drawSubRegionsWeatherCard = (): News[] => {
    let news: News[] = [];

    for (const [_, subRegion] of subregionRepository) {
        const allNews = subRegion.handleDailyWeatherUpdate();
        news.push(...allNews);
    }

    return news;
}
