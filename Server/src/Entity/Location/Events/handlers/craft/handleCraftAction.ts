import type { Character } from "../../../../Character/Character";
import type { NewsContext, NewsWithScope } from "../../../../News/News";

export function handleCraftAction(character: Character, context: NewsContext): NewsWithScope[] {
    // TODO
    const news: NewsWithScope[] = [];
    let isCrafted = false;
    const a = character.behavior.craftingPreference.craftingList
    if (a[1].bluePrintID !== 0) {
        // Handle crafting for blueprint 1
    }
    if (a[2].bluePrintID !== 0) {
        // Handle crafting for blueprint 2
    }
    if (a[3].bluePrintID !== 0) {
        // Handle crafting for blueprint 3
    }
    if (a[4].bluePrintID !== 0) {
        // Handle crafting for blueprint 4
    }
    return news;
}