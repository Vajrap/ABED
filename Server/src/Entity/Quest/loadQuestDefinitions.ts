import { questRegistry } from "./QuestRegistry";
import { questDefinitions } from "./definitions/index";
import Report from "../../Utils/Reporter";

/**
 * Load all quest definitions into the registry
 * Should be called at server startup
 */
export function loadQuestDefinitions(): void {
  let loaded = 0;
  
  for (const questDef of questDefinitions) {
    questRegistry.register(questDef);
    loaded++;
  }
  
  Report.info(`Loaded ${loaded} quest definitions into registry`);
  
  // Log quests by giver for debugging
  const givers = new Set(questDefinitions.map(q => q.giverId));
  for (const giverId of givers) {
    const quests = questRegistry.getByGiver(giverId);
    Report.debug(`Giver ${giverId} has ${quests.length} quest(s)`, {
      questIds: quests.map(q => q.id),
    });
  }
}

