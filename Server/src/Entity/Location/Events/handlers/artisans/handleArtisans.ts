import type { Character } from "../../../../Character/Character";
import type { NewsContext, News } from "../../../../News/News";
import { ActionInput } from "../../../../Character/Subclass/Action/CharacterAction";
import { handleMiningAction } from "../gathering/mining";
import { handleWoodCuttingAction } from "../gathering/woodCutting";
import { handleForagingAction } from "../gathering/foraging";
import { handleSmeltingAction } from "../refining/smelting";
import { handleTanningAction } from "../refining/tanning";
import { handleCarpentryAction } from "../refining/carpentry";
import { handleWeavingAction } from "../refining/weaving";
import { handleEnchantingAction } from "../refining/enchanting";

/**
 * Route artisan actions to appropriate handlers
 * Handles gathering actions (Mining, WoodCutting, Foraging)
 * Handles refining actions (Smelting, Tanning, Carpentry, Weaving, Enchanting)
 */
export function handelArtisanAction(
  character: Character,
  context: NewsContext,
  actionInput: ActionInput,
): News[] | null {
  switch (actionInput) {
    case ActionInput.Mining:
      return handleMiningAction(character, context);
    
    case ActionInput.WoodCutting:
      return handleWoodCuttingAction(character, context);
    
    case ActionInput.Foraging:
      return handleForagingAction(character, context);
    
    case ActionInput.Smelting:
      return handleSmeltingAction(character, context);
    
    case ActionInput.Tanning:
      return handleTanningAction(character, context);
    
    case ActionInput.Carpentry:
      return handleCarpentryAction(character, context);
    
    case ActionInput.Weaving:
      return handleWeavingAction(character, context);
    
    case ActionInput.Enchanting:
      return handleEnchantingAction(character, context);
    
    default:
      return [];
  }
}
