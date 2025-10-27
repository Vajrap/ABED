// Actor Effects - What the actor does during skill execution
export enum ActorEffect {
  // Basic Attack Types
  SlashOne = "ActSlashOne",
  SlashTwo = "ActSlashTwo",
  SlashThree = "ActSlashThree",
  BluntOne = "ActBluntOne",
  BluntTwo = "ActBluntTwo",
  BluntThree = "ActBluntThree",
  PierceOne = "ActPierceOne",
  PierceTwo = "ActPierceTwo",
  PierceThree = "ActPierceThree",

  // Elemental Attacks
  FireOne = "ActFireOne",
  FireTwo = "ActFireTwo",
  FireThree = "ActFireThree",
  WaterOne = "ActWaterOne",
  WaterTwo = "ActWaterTwo",
  WaterThree = "ActWaterThree",
  EarthOne = "ActEarthOne",
  EarthTwo = "ActEarthTwo",
  EarthThree = "ActEarthThree",
  WindOne = "ActWindOne",
  WindTwo = "ActWindTwo",
  WindThree = "ActWindThree",
  OrderOne = "ActOrderOne",
  OrderTwo = "ActOrderTwo",
  OrderThree = "ActOrderThree",
  ChaosOne = "ActChaosOne",
  ChaosTwo = "ActChaosTwo",
  ChaosThree = "ActChaosThree",

  // Special Actions
  Cast = "ActCast",
  Shout = "ActShout",
  Shake = "ActShake",
  Retreat = "ActRetreat",
  Charge = "ActCharge",
  Focus = "ActFocus",
  Taunt = "ActTaunt",

  // Generic/Test
  TestSkill = "ActTestSkill",
}

// Target Effects - What happens to targets during skill execution
export enum TargetEffect {
  // Basic Attack Types
  SlashOne = "TarSlashOne",
  SlashTwo = "TarSlashTwo",
  SlashThree = "TarSlashThree",
  BluntOne = "TarBluntOne",
  BluntTwo = "TarBluntTwo",
  BluntThree = "TarBluntThree",
  PierceOne = "TarPierceOne",
  PierceTwo = "TarPierceTwo",
  PierceThree = "TarPierceThree",

  // Elemental Attacks
  FireOne = "TarFireOne",
  FireTwo = "TarFireTwo",
  FireThree = "TarFireThree",
  WaterOne = "TarWaterOne",
  WaterTwo = "TarWaterTwo",
  WaterThree = "TarWaterThree",
  EarthOne = "TarEarthOne",
  EarthTwo = "TarEarthTwo",
  EarthThree = "TarEarthThree",
  WindOne = "TarWindOne",
  WindTwo = "TarWindTwo",
  WindThree = "TarWindThree",
  OrderOne = "TarOrderOne",
  OrderTwo = "TarOrderTwo",
  OrderThree = "TarOrderThree",
  ChaosOne = "TarChaosOne",
  ChaosTwo = "TarChaosTwo",
  ChaosThree = "TarChaosThree",

  // Status Effects
  Dazed = "TarDazed",
  Fear = "TarFear",
  Taunt = "TarTaunt",
  Haste = "TarHaste",
  Slow = "TarSlow",
  Hiding = "TarHiding",

  // Special Effects
  Evasion = "TarEvasion",
  Block = "TarBlock",
  Parry = "TarParry",
  Dodge = "TarDodge",

  // Generic/Test
  TestSkill = "TarTestSkill",
  
}
