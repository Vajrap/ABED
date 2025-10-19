import { gold } from "./Gold";
import { GoldId, type MiscItemId } from "./index";
import type { ItemMisc } from "./Misc";

export const miscRepository: Record<MiscItemId, ItemMisc> = {
    [GoldId.gold]: gold
}