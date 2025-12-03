import type {Character} from "../../../../Character/Character";
import {createNews, News, NewsContext} from "../../../../News/News";
import {processCharacterCraftingPreferences} from "src/Event/Craft";
import {NewsPropagation, NewsSignificance} from "src/InterFacesEnumsAndTypes/NewsEnums.ts";
import {itemRepository} from "src/Entity/Item/repository.ts";
import type {ItemId} from "src/Entity/Item/type";

export function handleCraftAction(mainCharacter: Character, otherCharacters: Character[], context: NewsContext): News | null {
    if (!mainCharacter.isPlayer) return null; // Guard for only player character
    // TODO:
    const result = processCharacterCraftingPreferences(mainCharacter, otherCharacters)
    return createNews({
        scope: {kind: "partyScope", partyId: mainCharacter.partyID ?? ""},
        content: {
            en: `${mainCharacter.name.en} has crafted ${result.entries().map(([itemId, amount]: [ItemId | string, number]) => {
                return `${amount} ${itemRepository[itemId as ItemId]?.name ?? ""}`
            })}`,
            th: ""
        },
        origin: {system: "craft"},
        context,
        significance: NewsSignificance.TRIVIAL,
        propagation: NewsPropagation.SECRET,
    })
}