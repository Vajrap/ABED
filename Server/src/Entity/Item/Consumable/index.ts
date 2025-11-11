/**
 * Consumable item IDs and enums
 * All consumable items must have an entry here for type safety and repository lookup
 */

export enum PotionId {
  healingPotion = "healingPotion", // heal 10 hp
  manaPotion = "manaPotion", // restore 10 mana
  staminaPotion = "staminaPotion", // restore 10 stamina
  // antidote = "antidote", // remove 10 poison
 
  // soothingBalm = "soothingBalm", // Reduce pain; small HP and mood gain
  // tonic = "tonic", // General restorative; small HP/SP/MP recovery

  // // --- Resistance ---
  // fireResistPotion = "fireResistPotion", // Increase Fire defense temporarily
  // frostResistPotion = "frostResistPotion", // Increase Water (Cold) defense temporarily
  // shockResistPotion = "shockResistPotion", // Increase Wind (Lightning) defense
  // stoneSkinPotion = "stoneSkinPotion", // Boost physical defense temporarily
  // wardingDraught = "wardingDraught", // Increase Planar resistance slightly

  // // --- Buffs ---
  // vigorPotion = "vigorPotion", // Boost Strength temporarily
  // focusElixir = "focusElixir", // Boost Intelligence temporarily
  // agilitySerum = "agilitySerum", // Boost Dexterity temporarily
  // couragePotion = "couragePotion", // Improve Mood; resist fear
  // frenzyPotion = "frenzyPotion", // Increase attack, reduce defense
  // clarityDraught = "clarityDraught", // Restore energy and focus

  // // --- Planar / Magical ---
  // planarInfusion = "planarInfusion", // Boost Planar Attunement briefly
  // aetherTonic = "aetherTonic", // Recover HP and MP; volatile
  // voidElixir = "voidElixir", // Trade HP for MP gain
  // chaosBrew = "chaosBrew", // Random buffs and debuffs

  // // --- Utility ---
  // nightVisionPotion = "nightVisionPotion", // Enables seeing in darkness
  // waterBreathingPotion = "waterBreathingPotion", // Breathe underwater
  // climbingTonic = "climbingTonic", // Reduce stamina loss from climbing
  // detoxElixir = "detoxElixir", // Remove minor debuffs and restore satiety
  // revivalDraught = "revivalDraught", // Revive downed ally with low HP
}

export enum FoodId {
  bread = "bread", // Common staple; restores small satiety for the whole party
  jerky = "jerky", // Dried meat; restores moderate satiety and slightly boosts energy (long-lasting)
  stew = "stew", // Warm comfort food; restores good satiety and improves mood slightly
  wine = "wine", // Alcoholic drink; boosts mood but reduces energy (sleepiness)
  fruit = "fruit", // Fresh fruit; restores satiety and slightly improves mood
  feast = "feast", // Lavish meal; restores high satiety, mood, and a bit of energy (for morale)
  herbSoup = "herbSoup", // Medicinal herbs; boosts energy but lowers mood due to bitterness
  driedFish = "driedFish", // Preserved meal; restores satiety but slightly lowers mood
  honey = "honey", // Sweet treat; small satiety gain, moderate mood boost
  spicedTea = "spicedTea", // Calming warm drink; minor satiety, improves mood, small energy gain
  coffee = "coffee", // Bitter stimulant; restores no satiety, increases energy sharply, lowers mood later
}

export enum UsableId {
  campKit = "campKit",
}

export type ConsumableId = PotionId | FoodId | UsableId;
