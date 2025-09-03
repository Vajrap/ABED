export enum LocationEventEnum {
  BattleEvent = "battleEvent",

  //Resting events
  RestInnPoor = "restInnPoor",
  RestInnComfortable = "restInnComfortable",
  RestInnPremium = "restInnPremium",
  RestInnLuxury = "restInnLuxury",
  RestHouse = "restHouse",
  RestCamp = "restCamp",

  //Training events
  TrainAttribute = "trainAttribute",
  TrainProficiency = "trainProficiency",
  TrainArtisan = "trainArtisan",

  //Skill events
  SkillLearn = "skillLearn",
  SkillTrain = "skillTrain",

  //Crafting events
  Craft = "craft",

  //Explorations and Travel events
  StrollEvent = "strollEvent", //Stroll event take 3 arguments, the party, the player, and the event() -> {} to execute, maybe about gaining insight or call a check to call for another event

  //Dialogue events
  DialogueEvent = "dialogueEvent", //Dialogue with NPC, take player character and NPCDialogue (needed implementation) -> NPC Dialogue class would be needed, determine the dialogue tree and the outcome

  //Quest events
  QuestGiverEvent = "questGiverEvent", //Take character and quest, might check if the character has the quest already, if true -> update quest instead.
  QuestUpdateEvent = "questUpdateEvent",
  QuestCompleteEvent = "questCompleteEvent",

  //Item events
  ItemPickupEvent = "itemPickupEvent", //Take character and item, add item to character inventory
  ItemShopEvent = "itemShopEvent", //Take character and shop, open shop interface, buy/sell items

  None = "none",
}
