export type SkillId =
  | BasicSkillId
  | MobSkillId
  | ClericSkillId
  | SeerSkillId
  | ScholarSkillId
  | MageSkillId
  | MysticSkillId
  | RogueSkillId
  | SpellbladeSkillId
  | ShamanSkillId
  | BarbarianSkillId
  | WarriorSkillId
  | KnightSkillId
  | GuardianSkillId
  | PaladinSkillId
  | DruidSkillId
  | MonkSkillId
  | WarlockSkillId
  | DuelistSkillId
  | WitchSkillId
  | InquisitorSkillId
  | EngineerSkillId
  | NomadSkillId;

export enum BasicSkillId {
  Basic = "Basic",
}

export enum MobSkillId {
  WorksYouMaggots = "WorksYouMaggots",
  CommanderScream = "CommanderScream",
  Whip = "Whip",
  ThrowPebble = "ThrowPebble",
  PanicSlash = "PanicSlash",
  Shriek = "Shriek",
}

export enum ClericSkillId {
  /**
   * ## Faith System
   * Faith is a buff that can stack up to 5 times.
   * - Gained from: Heal (1 stack on successful heal), Radiance (1 stack on cast)
   * - Consumed by: Revive, TurnUndead, HolyWater, DivineStrike, Bind
   */

  // ---------------
  // Cantrips
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Restore HP to an ally with least HP percentage.
   * - **Healing:** 1d4 + WIL mod
   * - **Debuff Removal:** After heal, roll D20 + WIL mod vs DC13. On success, removes one random debuff from target.
   * - **Fallback:** If all allies are at full HP, performs basic attack instead.
   * - **Faith:** Gain 1 Faith stack on successful heal.
   * 
   * **Consume:** 3 MP
   * **Produce:** 1 order
   * **Cooldown:** 3 turns
   */
  Heal = "Heal",

  /**
   * **Tier:** Common (Cantrip)
   * 
   * Unleash a flash of consecrated light dealing holy damage.
   * - **Damage:** (1d6 + WIL mod) × skill level multiplier
   * - **Bonus vs Undead/Fiend:** +1d4 damage
   * - **Faith:** Gain 1 Faith stack on cast.
   * 
   * **Consume:** 2 MP
   * **Produce:** 1 order
   */
  Radiance = "Radiance",

  // ---------------
  // Healing Cleric
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Cast a mass healing spell, restore HP to all living allies.
   * - **Healing:** 1d6 + ((WIL mod + CHA mod) / 2) + skill level
   * - **Debuff Removal:** At level 5, removes one random debuff from each healed ally.
   * 
   * **Consume:** 6 MP, 2 order, 1 water
   * **Cooldown:** 4 turns
   */
  MassHeal = "MassHeal",

  /**
   * **Tier:** Uncommon
   * 
   * Grant a random front line ally DefenseUp buff for 2 turns (3 at level 5).
   * - **DefenseUp Buff:** Increases pDEF and mDEF by 2
   * 
   * **Consume:** 3 MP, 1 order
   */
  Protection = "Protection",

  /**
   * **Tier:** Rare
   * 
   * Attempt to bring a fallen ally back to life.
   * - **Save:** Roll DC15 (DC13 at level 5) vs (WIL mod + Faith stacks)
   * - **On Success:** Target is revived with 25% HP (35% at level 5)
   * - **On Failure:** Half of Faith stacks are returned (rounded down)
   * - **Faith:** Remove all Faith stacks after use (consumed regardless of success)
   * 
   * **Consume:** 6 MP, 2 order, all Faith stacks
   */
  Revive = "Revive",

  // ---------------
  // Sanctuary Cleric
  // ---------------
  /**
   * **Tier:** Common
   * 
   * Ask for the Blessing from Laoh, granting allies Bless buff for 2 turns.
   * - **Target Count:** Number of allies blessed = CHA mod (minimum 1 ally)
   * - **Bless Buff:** Grants advantage on all saving throws
   * 
   * **Consume:** 4 MP, 1 order
   * **Cooldown:** 3 turns
   */
  Bless = "Bless",

  /**
   * **Tier:** Uncommon
   * 
   * Randomly remove debuff from 1 ally (2 allies at level 5).
   * - **Faith:** Gain 1 Faith stack when successfully removing a debuff.
   * 
   * **Consume:** 4 MP, 1 order
   */
  Purify = "Purify",

  /**
   * **Tier:** Uncommon
   * 
   * Try to bind an enemy, causing them to become Stunned.
   * - **Save:** Enemy must roll DC8 (DC10 at level 5) + 1 per Faith stack vs WIL save
   * - **On Failure:** Target gains Stun debuff for 1 turn
   * - **Faith:** Consume 1 Faith stack after use
   * 
   * **Consume:** 5 MP, 1 order, 1 Faith stack
   */
  Bind = "Bind",

  // ---------------
  // Exorcist Cleric
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Cast a holy spell to destroy undead creatures.
   * - **vs Non-Undead:** Deal 1d4 + WIL mod true holy damage
   * - **vs Undead:** Target makes WIL save vs DC10 + Faith stacks (DC12 + Faith stacks at level 5)
   *   - **Save Failed:** Take 9999 true damage (instant kill)
   *   - **Save Succeeded:** Take 1d12 + WIL mod holy damage
   * - **Faith:** Consume 1 Faith stack after use (whether save fails or succeeds)
   * 
   * **Consume:** 5 MP, 2 order, 1 Faith stack
   * **Produce:** 1 neutral
   */
  TurnUndead = "TurnUndead",

  /**
   * **Tier:** Uncommon
   * 
   * Buff weapon with holy damage.
   * - **Duration:** X turns, where X = Faith stacks (X + 1 at level 5)
   * - **Effect:** Weapon attacks deal additional holy damage (1d4 + WIL mod)
   * - **Faith:** Consume 1 Faith stack after use
   * 
   * **Consume:** 4 MP, 2 order, 1 Faith stack
   */
  HolyWater = "HolyWater",

  /**
   * **Tier:** Rare
   * 
   * A powerful holy strike that consumes Faith for devastating damage.
   * - **Damage:** ((1d6 + WIL mod) × skill level multiplier) + (Faith stacks × 1d4) holy damage
   *   - **Level 5:** Faith bonus damage increases to 1d6 per stack
   * - **Effect:** Apply Burn debuff to target for 2 turns (3 turns at level 5)
   * - **Faith:** Consume 3 Faith stacks (or all available if less than 3)
   * 
   * **Consume:** 6 MP, 3 order, 3 Faith stacks
   */
  DivineStrike = "DivineStrike",
}

export enum SeerSkillId {
  // Buff: Foreseen: first attack or debuff that would hit the target must roll a luk save vs DC8 + your lok mod
  // If fail, the effect missed,
  // Remove Foreseen after triggering
  // Buff: lucky
  // Debuff: BadLuck
  // Both Lucky and Badluck did 'Nothing' bythemselves!

  PlanarEcho = "PlanarEcho",
  // Cantrip
  // Desc: Echo the planar energy around, dealing 1d6 + <CHAmod> * (1 + 0.1 * skill level) arcane damage to a target.
  // If hit, the target must roll DC10 LUKsave or decrease AB gauge by 10.
  // If target failed to save, gain Lucky to self

  // -----------
  // Foresight
  // -----------
  ForeseenStep = "ForeseenStep",
  // Common:
  // Mark an ally with Foreseen for 1 turn.
  Misfortune = "Misfortune",
  // Uncommon roll d20 + chamod VS 12 (10 at level 5) + enemy Luk mod
  // If > deal 1d8 arcane damage and gain lucky
  // else enemy gain 10AB gauge and give unlucky to self
  TwistOutcome = "TwistOutcome",
  // Rare check lucky and badLuck that you have. pick one that have most stack of equal, roll d20. > 10 === pick lucky
  // if lucky was choosen, randomly heal one teammate with least hp percentage for (1d4 + lucky stack) * skill level mod
  // if badluck was choose, deal slash damage on one random enemy for (1d8 + badluck) * skill level mod
  // At level 7, use both buffs+debuffs together

  Precognition = "Precognition",
  // Rare
  // Desc: See the future, gain Precognition buff for 1 turn:
  // Procognition: next attacker that target you must roll their LUKsave vs DC10+<your LUKmod>+(skill level - 1) or it will surely miss, remove the buff after checking.
  // At level 5 if the attacker miss, you gain 1 order
  // At level 7 when used, roll a d20 + <LUKmod> if passed, gain 1 more turn of Precognition buff

  // -----------
  // Manipulator
  // -----------
  ThreadSnip = "ThreadSnip",
  // Uncommon
  // Desc: Look into the planar thread and pulled it away from an enemy: Deal 1d4 + <CHAmod> to an enemy, roll D14 (-1 per skill level) dice. If passed, randomly steal 1 element from the enemy
  GrabOnPlanarThreadWithBareHand = "GrabOnPlanarThreadWithBareHand",
  // Rare
  // Desc: Roll DC 15 - skill level Luk save
  // on fail roll, gain 2 stack of badluck
  // on success, roll 3d3, each dice represent order, water and wind, gain resource equal to the roll - 1 (0 - 2): Gain PlanarGrab buff
  ThreadBacklash = "ThreadBacklash",
  // Rare:
  // Need PlabarGrab
  // Consume ALL elemental resources. one have
  // for each element consume deal 1d6 arcane damage to a random enemy.
  // If total resources consumed ≤ 2:
  //   gain 1 BadLuck.
  // If total resources consumed ≥ 5:
  //   gain 1 Lucky.
  // remove planarGrab after use
}

export enum MageSkillId {
  // Arcane Elemental Skills
  // Arcane Charge: (buff) Do nothing
  ArcaneBolt = "ArcaneBolt",
  // Cantrip: 1d6 + planar mod arcane damage to a target. Gain Arcane Charge stack.
  ArcaneShield = "ArcaneShield",
  // Uncommon: Gain Arcane Shield buff for 1 turn. Arcane Shield: When attacked, roll a d20 + planar mod ENDsave, if passed, negate that attack and gain 1 Arcane Charge stack.
  ArcaneMissiles = "ArcaneMissiles",
  // Common: Shoot 3 arcane missiles at 3 random targets, each deal 1d4 + planar mod arcane damage. At level 5, each missile add damage based on Arcane Charge stacks rounded down.
  PlanarSurge = "PlanarSurge",
  // Uncommon: Deal 1d8 + planar mod arcane damage to all enemies in the front row. If arcane charge stacks >= 3, deal additional 1d4 damage and remove 3 charges. At level 5 gain additional + 2 raw arcane damage.
  ArcaneBattery = "ArcaneBattery",
  // Rare: Consume all Arcane Charge Stacks, restore mana equal to stack * 2, and gain stacks of Arcane Battery buff for 3 turns (4 at level 5) based on the stack of Arcane Charge. Arcane Battery: Each stack gives additional 1 damage to all planar mod.
  PlanarEruption = "PlanarEruption",
  // Epic: Consume all Arcane Charge Stacks, Each stack deal 2d6 damage on random enemies

  // Fire Elemental Skills
  // burn: (debuff) Take damage equal to burn stack every turn.
  FireBolt = "FireBolt",
  // Cantrip: 1d6 + planar mod fire damage to a target. chance to burn.
  BurningHand = "BurningHand",
  // Uncommon: 1d8 + planar mod fire damage to all enemies in the front row. On hit, target must roll DC10 + planar mod ENDsave or get 2-3 burn stacks.
  Backdraft = "Backdraft",
  // Uncommon: Attack all enemies with 'burning' 1 or 1d2 per stack fire damage. Then heal self for total damage × (0.1 × skill level) {5} + 1d2 per stack.
  FireBall = "FireBall",
  // Rare: Unleash a blazing sphere of fire that explodes upon impact, engulfing 1–6 enemies in a devastating inferno. Deal 1d12 + planar mod + 0.5 × skill level fire damage to each target. On hit, target must roll DC10 + planar mod ENDsave or get 1–2 burn stacks.

  // Water Elemental Skills
  // Soaked: when attacked with lightning get * 2 damage, once soaked stacked to 5, take 1d6 true water damage.
  HydroLash = "HydroLash",
  // Cantrip: 1d6 + planar mod water damage to a target. chance to spilled and heal an ally for 1d3.
  AquaBlast = "AquaBlast",
  // Common: 1d6 + planar mod water damage to a target. add 1 soaked debuff, if soaked reached 5 stack and triggered damage,
  CascadePulse = "CascadePulse",
  // Uncommon: Release a flowing pulse of water that may chain between allies and enemies; To chain, roll DC15 vs control + skill level, Deal 1d6 + planar + skillmod or heal 1d3 + planar + skillmod
  CrushingDepths = "CrushingDepths",
  // Rare: Drag an enemy into overwhelming water pressure like abyssal depths, deal massive 1d12 + planar + skillLvlMod damage and add 2 (3 at level 5) stacks of soaked.

  // Earth Elemental Skills
  // Stone skin: +2 pDef
  // StoneBounded: (debuff) +2 pDef but upon taking turn the character needs to roll DC12 str save or can't take turn, if the save success, remove stoneBounded debuff,
  StoneShard = "StoneShard",
  // Cantrip: Hurl a sharp fragment of stone at a target, dealing 1d6 earth damage, have a low chance to give self a 'stone skin' for 1 turn
  StoneSkin = "StoneSkin",
  // Common: Give self 'Stone Skin' for 2 turns
  EarthernGrip = "EarthernGrip",
  // Uncommon: Melee: dealing 1d8 enemy in front row, if you have [stone skin], remove it and add [stoneBounded] to the enemy for 2 turns
  TremorWave = "TremorWave",
  // Uncommon: Send a ground shock through the front row, damaging enemies in front line with 1d8 earth damage:

  // Wind Elemental Skills
  // Tailwind: (buff) each stack increase AB gauge gain, decrease every turn.
  // WindFury: during windfury, Tailwind won't decrease.
  WindSlice = "WindSlice",
  // Cantrip: Deal 1d6 wind damage to a target. gain 1 stack of Tailwind.
  GaleSlash = "GaleSlash",
  // Uncommon: Melee: create a sword out of wind, dealing 1d8 damage to an enemy, enemy rolls DC10 saves or gain 2 stacks of bleed
  RazorGust = "RazorGust",
  // Rare: Release cutting winds dealing 1d6 damage to an enemy. every 2 stacks of tailwind will repeat the attack.
  WindFury = "WindFury",
  // Rare: Enter a heightened flow state where give 2 (3 at level 7) stack of Tailwind and WindFury buff for 3 turns (4 turns at level 5).
}

export enum MysticSkillId {
  ReversalPalm = "ReversalPalm",
  // Cantrip:
  // Must be bare hand
  // After using, give self a buff 'Reverse Palm' for 1 turn:
  // Reverse Palm: when attacked, roll a d20 willpower save, if passed, deal 1d6 blunt damage + dex mod *(1 + 0.1 * skill level) to the attacker and negate that attack, Then remove the buff, if fail, remove the buff and take damage normally.

  // -------------
  // Mist
  // -------------
  MistStep = "MistStep",
  // Uncommon
  // “Shift like mist to a safer position. Move to the backline if you are in the front row; if already in the back row, gain evasion instead. Remove Slow or Bind if present. Gain +3 dodge roll for 1 turn (increases to 2 turns at skill level 5).”
  MistPierce = "MistPierce",
  // Uncommon
  // Attack deal (1d8 + dex mod) * level multiplier pierce damage (must be barehand) to an enemy front first
  // If currently the user is in back row, try moving to front row first, if move completed add will mod to damage formular before * with skill mod and get + 2 dodge for 1 turn

  // -------------
  // Absorber
  // -------------
  PlanarAbsorption = "PlanarAbsorption",
  // Gain 'Planar Absorption' buff for 2d3 stacks + intelligence mod + 0.01 times per skill level, If Attacked by a magic spell, absorb damage up to the stacks of planar absoprtion buff,
  // Every 4 damage of each type that is absorbed turned into 1 neutral resource.
  BorrowedMomentum = "BorrowedMomentum",
  // Uncommon
  // Deal 1d6 + dexmod * skill level modifier blunt damage (or palm strike damage), must be barehand, to an enemy
  // If enemy has <= 50 AB gauge, gain + 15 ab gauge
  // else decrease enemy AB gauge for 15 points

  // -------------
  // Mind
  // -------------
  InnerVeil = "InnerVeil",
  // Cast a veil on one frontline ally, make them harder to target or hit.
  // (Minor concealment / dodge / accuracy debuff to enemy)
  // Role: soft-support defensive buff.
}

export enum RogueSkillId {
  ThrowingKnives = "ThrowingKnives",
  // Cantrip
  // Any range
  // Throw knives at 2 targets, each deals 1d4 + Dex mod * (1 + 0.1 * skill level) pierce damage.
  // target can be repeat, (so just get random again and again, no thing special here)
  // at level 5, add 2 more knives to the throw

  // ---------------
  // Stealth
  // ---------------
  Hiding = "Hiding",
  // Uncommon
  // Try to get hiding, roll D20 + dex mod, against 10 + (higest enemy int mod) + ( row === 'front' ? 5 : 0)
  // if passed get hiding buff for 2 turns,
  // at level 5, base DC = 8, front row penalty = 3
  Backstab = "Backstab",

  // ---------------
  // Melee
  // ---------------
  BleedingCut = "BleedingCut",
  // Uncommon
  // require sword dagger or blade
  // Deal weapons damage + Dex mod * (1 + 0.1 * skill level) slash
  // target must roll DC10 (DC12 at lvl 5) Endurance save. or get 1d3 bleed stacks (debuff)
  // Bleed: takes 1d3 damage per turn for 3 turns.
  CrippingSlice = "CrippingSlice",
  // Common
  // require sword dagger or blade
  // Deal weapons damage + Dex mod * (1 + 0.1 * skill level) slash
  // target must roll DC10 Endurance save. or lose 10 AB gauge
  OpportunistStrike = "OpportunistStrike",
  // Uncommon
  // require sword dagger or blade
  // Deal weapons damage
  // If target is slower than you get additional 1d4 + dex mod damage
  // at level 5 gain +15 ab gauge

  // ---------------
  // Range
  // ---------------
  RetreatDash = "RetreatDash",
  // Change position + get dodge

  PinningShot = "PinningShot",
  // Common
  // Any range, requires ranged weapon
  // Deal 1d6 + Dex mod pierce damage to a target
  // Target must roll DC10 Endurance save
  // On fail: target loses 10 AB gauge
  // At level 5: AB loss increases to 15

  SplitTrajectory = "SplitTrajectory",
  // Uncommon
  // Any range, requires ranged weapon or throwing knives
  // Choose a primary target:
  // - Deal 1d6 + Dex mod pierce damage
  // Then select a second random enemy:
  // - Deal half damage (rounded down)
  // If the primary target is bleeding, second hit deals full damage instead
}

export enum SpellbladeSkillId {
  // and generate "Edge Charge". Buff
  // Edge Charge buff maximum 5 stacks, no limit on duration.
  

  PlanarEdge = "PlanarEdge",
  // Cantrip, auto attack, core idea for spell blade
  // Dealing arcane damage, melee (see positionModifier)
  // must equip sword, blade, dagger or barehand(no weapon)
  // If weapon exist, deal weapon damage + planar mod + edge charge stacks * (1 + 0.1 * skill level) arcane damage.
  // If no weapon, damage dice based on skill Level, 1d6, 1d6, 1d8, 1d8 and 2d4 (level 1-5) + planar mod + edge charge stacks * (1 + 0.1 * skill level) arcane damage.
  // Note: Does NOT generate Edge Charges, but scales damage with existing Edge Charge stacks. Other skills with "Planar Edge-like damage" also benefit from Edge Charge stacks.
  // Produce 1 neutral
  
  // ------------
  // Swift blade
  // ------------
  WindSlash = "WindSlash",
  // Uncommon
  // Any range
  // Deal (Planar edge-like damage) * (1 + 0.1 * skill level) wind damage.
  // consume 1 wind, produce natural
  // Target roll DC8 + (user planar mod) endurance save or get bleed for 1d2 turn.
  GaleRush = "GaleRush",
  // Uncommon
  // Melee, front first
  // Deal (Planar edge-like damage) * (1 + 0.1 * skill level) wind damage.
  // If wind resource exists, after use, get + 5 abgauge (+10 at level 5)
  // consume 1 neutral, produce 1 wind


  // --------------
  // Mage Hunter
  // --------------
  SpellParry = "SpellParry",
  // rare
  // Get Spell Parry buff for 1 turn.
  // Spell Parry: reduce next spell’s damage by (5 + Int mod).
  // If attacked by a spell, gain 1 Edge Charge (2 if 0 damage taken).
  // At level 5 also produce 1 Edge Charge when used.
  // Comsume 1 wind, produce 1 chaos
  PlanarSiphon = "PlanarSiphon",
  // Rare
  // deal weapon damage + planar mod * skill level mod arcane damage
  // Additionally, deal MP damage equal to (1d4 + int mod + enemy planar mod / 2) * skill level mod arcane damage
  // If enemy's max MP > your max MP: deal additional 1d6 MP damage (targets casters who typically have higher max MP)
  // consume 2 chaos, produce 1 neutral
  

  // ---------------
  // Edge Charge
  // ---------------
  ChargeSurge = "ChargeSurge",
  // Uncommon
  // Gain 1 Edge Charge.  (2 at level 5).
  // Also gain ChargeSurge buff for 3 turns, each turn gain +1 Edge Charge;
  // 3 turns cooldown
  EdgeBurst = "EdgeBurst",
  // rare
  // Consume ALL Edge Charges (min 1).
  // Close range, melee (see positionModifier)
  // must equip sword, blade, dagger or barehand(no weapon)
  // Strike target for weapon dmg(or the same as Planar Edge) + Planar mod + (1d2 per edge charge stacks) * (1 + 0.1 * skill level) arcane damage.
  // consume 2 chaos produce nothing
}

export enum ShamanSkillId {
  // Ward: Reduce incoming damage by (3 + WIL mod / 2) per attack, up to 5 stacks per turn

  MendSpirit = "MendSpirit",
  // Cantrip
  // Heal a random injured ally for (1d4 + WIL mod) * skill level multiplier HP.
  // Roll D20: if 11+, healing is halved and target gains +1 chaos instead.
  // produce 1 chaos, cooldown 3 turns

  // ---------------
  // Curse
  // ---------------
  HexMark = "HexMark",
  // Uncommon: Mark an enemy with a hex sigil, making them vulnerable to curse effects.
  // Apply HexMark debuff to target for 2 turns (3 at level 5).
  // While marked, target takes +1d3 extra chaos damage from all sources.
  // If target already has Hexed or Cursed debuff when marked, deal 1d4 + planar mod chaos damage and extend those debuffs by 1 turn.
  // At level 5: When any curse debuff is applied to a marked target, deal additional 1d2 chaos damage.
  // consume 1 chaos, produce 1 neutral
  HexOfRot = "HexOfRot",
  // Uncommon: Deal 1d4 + planar mod + 0.5 * skill level chaos damage to a target.
  // Target must roll DC10 + control mod WILsave or get Hexed debuff for 2 turns.
  // Hexed: reduces endurance by 2 and deals 1d2 damage per turn.
  // consume 1 chaos, produce 1 neutral
  
  // ---------------
  // Blessing
  // ---------------
  HolyRattle = "SpiritRattle",
  // Common: Grant 1 + 1d(skillLevel) random allies SpiritRattle buff for (1 + floor(skillLevel * 0.5)) turns (capped at skillLevel).
  // SpiritRattle: heals for 1d4 + WIL mod at the start of each turn.
  // consume 1 neutral, produce 1 order
  CleansingBlessing = "CleansingBlessing",
  // Uncommon
  // Target 1 random ally with debuffs (2 at level 5)
  // Remove 1 random debuff from target (2 debuffs at level 5)
  // If debuff removed, heal target for 1d4 + WIL mod HP
  // If no debuffs to remove, grant Bless buff for 1 turn instead
  // Consume 2 neutral, produce 1 order
  WardOfProtection = "WardOfProtection",
  // Common
  // Target 1d2 ally (1d3 at level 5)
  // Grant Ward of Protection buff for 2 turn.
  // Consume 1 neutral, produce 1 order

  // ---------------
  // Harmony
  // ---------------
  Harmonization = "Harmonization",
  // Common
  // For every Order resource one have, turn it into Chaos
  // For every Chaos resource one have, turn it into Order
  // If the conversion >= 3 gain 1 natural
  // 
  DualNature = "DualNature",
  // Uncommon
  // Attack one enemy: Deal (1d6 + planar mod)
  // if you have Order more than Chaos: deal additional damage equal to skill level
  // if you have Chaos more than Order: heal random ally equal to skill level
  // if your Order and Chaos are equal and > 0: both effects apply
  ChaoticBlessing = "ChaoticBlessing",
  // Uncommon: 50% chance to deal (1d8 at level 5, else 1d6) + ((WIL mod + Planar mod) / 2) * skill level multiplier chaos damage to all enemies,
  // or heal all allies for the same amount.
  // At level 5: Healed allies roll DC10 WILsave, if passed gain +1 chaos.
  // At level 5: Damaged enemies roll DC10 WILsave, if failed lose 1 random resource.
  // consume 1 chaos + 1 order, produce 0-2 neutral

}

export enum BarbarianSkillId {
  Rage = "Rage",
  // Cantrip,
  // Gain Rage for upto 3 turns (pAtk + 2, pDef and mDef - 2). At lvl5: 4 turns
  // Jump in and attack with full force. (weapon damage), -3 hit roll.
  // consume 3 SP, produce 1 fire.

  // ---------------
  // BERSERKER
  // ---------------
  RecklessSwing = "RecklessSwing",
  // Common
  // Multi-hit melee.
  // must have sword axe blade hammer spear barehand
  // 2 hits (3 hits at lvl5), each (0.7×weapon + STR mod) * (1 + 0.1 * skill level) * (positionModifier) damage = weapon damage type , -3 hit roll.
  // consume 4 SP 1 fire, produce 1 neutral
  BloodFrenzy = "BloodFrenzy",
  // Uncommon
  // Melee close range
  // Deal weapon damage + str mod * skill level mod 
  // If HP <= 20% (40% at level 5), damage += 25%
  // If target was killed, Rage duration is extended by 1 turn.

  // ---------------
  // BRUTE
  // ---------------
  Earthshatter = "Earthshatter",
  // Uncommon
  // AoE front row.
  // 1d8 + STR mod (1d10 at lvl5).
  // Enemies roll DC10 (DC12 lvl5) Fort save or Dazed 1 turn.
  // consume 5 SP 1 fire, produce 1 earth.
  GroundSlam = "GroundSlam",
  // Uncommon
  // Attack one enemy; deal 1d6 + str mod * skill level mod blunt damage.
  // target must roll DC10 + str mod endurance save or get dazed for 1 turn.
  // adjacent enemies take 50% damage and roll dc5 endurance save or get dazed for 1 turn.
  // at leve 5, adjacent takes 75% damage instead

  // ---------------
  // Survivalist
  // ---------------
  BattleHardened = "BattleHardened",
  // Uncommon
  // Gain Battle Hardened buff for 3 turns: pDef + 2
  // when attakced during Battle Hardened: Rage duration is extended by 1 turn.
  // Cool down 3 turns
  // If used at level 5, also heal for 1d4 + endurance mod HP
  
}

export enum WarriorSkillId {
  Cleave = "Cleave",
  // common
  // consume 2 neutral, produce 1 wind
  // Deal 1x weapon damage ((at level 5 = 1.2x), + str mod) * (skillScalar) * (positionModifier) attacking enemy to the 'front most row' (so the skill scalar must know which row we're attacking)

  PowerStrike = "PowerStrike",
  // Common
  // consume 2 neutral, produce 1 fire
  // ACTIVE — Strong single-target melee attack.
  // Higher may be (1.3 and 1.5 at level 5 + str mod) * (skillScalar) * (posotionModifier)
  // Bread-and-butter offensive skill.

  WarCry = "WarCry",
  // Uncommon
  // ACTIVE — Battle shout that boosts self or team morale.
  // Increases attack or action speed for a few turns.(+2 agi +2 str), 2 turns, 3 turns when level 5

  // ---------------
  // Weapon Master
  // ---------------
  WeaponAdaptation = "WeaponAdaptation",
  // Common
  // Single target melee attack
  // Deal weapon damage + STR mod * (1 + 0.1 * skill level) * skill level multiplier damage
  // Damage type adapts to weapon: Slash (sword/blade), Pierce (spear), Blunt (hammer/axe)
  // If you've used a different damage type in the previous 2 turns, deal +25% damage (encourages weapon switching)
  // consume 2 neutral, produce 1 fire
  // At level 5: Bonus damage increases to +35%

  VersatileCombat = "VersatileCombat",
  // Uncommon
  // Self-buff for 3 turns (4 at level 5)
  // Versatile Combat: When you deal damage, if it's a different damage type than your last attack, gain +1 STR for 1 turn (stacks up to +2 STR)
  // Additionally, gain +2 hit roll while active
  // consume 3 SP, 1 fire, produce 1 neutral

  // ---------------
  // Battlefield Control
  // ---------------
  BattlefieldDominance = "BattlefieldDominance",
  // Uncommon
  // AoE front row
  // Deal (weapon damage * 0.8 + STR mod) * (1 + 0.1 * skill level) * skill level multiplier damage to all enemies in front row
  // Enemies must roll DC10 + STR mod END save or gain Slow debuff for 2 turns
  // consume 4 SP, 1 wind, produce 1 neutral
  // At level 5: Damage becomes weapon damage * 0.9, and enemies who fail save also lose 10 AB gauge

  PositioningStrike = "PositioningStrike",
  // Common
  // Single target melee attack
  // Deal weapon damage + STR mod * (1 + 0.1 * skill level) * skill level multiplier damage
  // If target is in front row and you're in front row: Push target to back row (if slot available) and deal +1d4 damage
  // If target is in back row: Pull target to front row (if slot available) and deal +1d4 damage
  // consume 3 SP, produce 1 earth

  // ---------------
  // Champion (1v1)
  // ---------------
  DuelistChallenge = "DuelistChallenge",
  // Uncommon
  // Single target enemy
  // Mark target with Exposed debuff for 3 turns (4 at level 5)
  // Deal (weapon damage + STR mod) * (1 + 0.1 * skill level) * skill level multiplier damage
  // While target has Exposed debuff from this skill: You gain +2 hit roll and +2 crit chance against them
  // consume 3 SP, 1 fire, produce 1 neutral

  FinishingBlow = "FinishingBlow",
  // Rare
  // Single target melee attack
  // Deal (weapon damage * 1.5 + STR mod) * (1 + 0.1 * skill level) * skill level multiplier damage
  // If target has Exposed debuff: Deal additional +50% damage and remove Exposed debuff
  // If target is below 30% HP: Deal +1d6 damage
  // consume 5 SP, 2 fire, produce 1 neutral
  // At level 5: Bonus damage against exposed targets becomes +75%
}

export enum KnightSkillId {
  PrecisionThrust = "PrecisionThrust",
  // Uncommon
  // Require sword, spear
  // target one frontfirst
  // Thrust the sword or spear right at one enemy dealing ((weapon damage + Str mod) * (1 + 0.1 * skill level)) * (positionModifier) pierce damage. with addtional +3 hit roll
  // If enemy has any debuff, crit change + 2 (4 at level 5).
  // consume 2 fire, produce 1 earth

  AdvancingPace = "AdvancingPace",
  // Rare
  // must not already be under Advancing Pace
  // The knight channels planar force into disciplined movement.
  // Gain AdvancingPace buff for 3 turns.
  //
  // AdvancingPace:
  // - AB gauge increases with 1d4 more
  // - +2 Strength
  // - -1 Defense (the knight overextends to maintain the pace)
  // At level 5: AB speed becomes +35% and the DEF penalty is removed.
  //
  // consume: 4 SP, 3 MP, 3 natural
  // produce: 1 fire

  // ---------------
  // Commander (Team Buff)
  // ---------------
  TacticalCommand = "TacticalCommand",
  // Uncommon
  // Target 1d2 + LEAD mod allies (1d3 + LEAD mod at level 5)
  // Grant Haste buff for 2 turns (3 at level 5)
  // Additionally, targets gain +1 STR while Haste is active
  // consume 4 SP, 1 fire, produce 1 neutral
  // At level 5: Also grant +5 AB gauge immediately

  BattleFormation = "BattleFormation",
  // Rare
  // All allies gain +2 pDEF and +2 mDEF for 3 turns (4 at level 5)
  // Additionally, all allies gain +1 to all saving throws while active
  // consume 5 SP, 2 fire, produce 1 earth

  // ---------------
  // Order (Charging/Advancing)
  // ---------------
  RelentlessCharge = "RelentlessCharge",
  // Common
  // Melee attack, must move to front row if not already there
  // Deal (weapon damage + STR mod) * (1 + 0.1 * skill level) * skill level multiplier damage
  // If you have AdvancingPace buff: Deal +1d4 damage and gain +10 AB gauge
  // consume 3 SP, produce 1 fire
  // At level 5: Bonus damage increases to +1d6

  DisciplinedAdvance = "DisciplinedAdvance",
  // Uncommon
  // Move to front row (if available) and gain AdvancingPace buff for 2 turns (3 at level 5)
  // Additionally, deal (weapon damage * 0.8 + STR mod) * (1 + 0.1 * skill level) damage to closest enemy
  // consume 4 SP, 1 fire, produce 1 fire

  // ---------------
  // Oathbound (Shield, Conditional)
  // ---------------
  ShieldedStrike = "ShieldedStrike",
  // Common
  // Must equip shield
  // Single target melee attack
  // Deal (weapon damage + STR mod) * (1 + 0.1 * skill level) * skill level multiplier damage
  // If you have DefenseUp buff: Deal +25% damage and gain +5 AB gauge
  // consume 2 SP, produce 1 earth
  // At level 5: Also gain DefenseUp buff for 1 turn if you don't already have it

  OathOfProtection = "OathOfProtection",
  // Uncommon
  // Must equip shield
  // Target 1 random ally (2 at level 5)
  // Grant DefenseUp buff for 2 turns (3 at level 5)
  // Additionally, if target takes damage while DefenseUp is active, you gain +1 STR for 1 turn (max +2 STR, stacks)
  // consume 3 SP, 1 earth, produce 1 neutral
}

export enum GuardianSkillId {
  // ---------------
  // Bulwark (Pure Tank)
  // ---------------
  ShieldUp = "ShieldUp",
  // Common
  // Raise your shield high, forming an impenetrable barrier.
  // Gain DefenseUp buff for 3 turns (4 at level 5)
  
  HerosPose = "HerosPose",
  // Common
  // Strike a heroic pose, channeling your inner strength.
  // Roll DC(15 - skill level) (10 - skill level at level 5). On success, restore VIT mod + skill level HP.
  // The higher your skill, the easier it becomes to inspire yourself.

  FortressStance = "FortressStance",
  // Uncommon
  // Self-buff for 3 turns (4 at level 5)
  // Fortress Stance: Gain +3 pDEF and +2 mDEF
  // Additionally, reduce all incoming damage by 1 per attack (2 at level 5)
  // Cannot use while you have Taunt buff
  // consume 4 SP, 1 earth, produce 1 neutral

  // ---------------
  // Sentinel (Taunt, Bash)
  // ---------------
  Taunt = "Taunt",
  // Common
  // Roar defiantly and draw all enemy attention to yourself.
  // Gain Taunt buff for 2 + floor(0.5 × skill level) + floor(CHA mod / 2) turns

  Bash = "Bash",
  // Common
  // Slam your weapon with overwhelming force, crushing your enemy's defenses.
  // Deal weapon damage * position modifier damage.
  // Target must roll DC8 + STR mod END save or become Stun for 1 turn.
  // consume 2 earth, produce 1 fire

  SentinelDuty = "SentinelDuty",
  // Uncommon
  // Single target enemy
  // Deal (weapon damage + STR mod) * (1 + 0.1 * skill level) * skill level multiplier damage
  // Apply Taunt buff to self for 2 turns (3 at level 5)
  // Target must roll DC10 + STR mod END save or gain Dazed debuff for 1 turn
  // consume 3 SP, 1 earth, produce 1 fire

  // ---------------
  // Bastion (Protection)
  // ---------------
  GuardAlly = "GuardAlly",
  // Uncommon
  // Target 1 random ally (2 at level 5)
  // Grant DefenseUp buff to target for 2 turns (3 at level 5)
  // Additionally, gain Taunt buff for 1 turn - enemies are more likely to target you instead
  // consume 3 SP, produce 1 earth
  // At level 5: If target takes damage while DefenseUp is active, restore 1d4 + VIT mod HP to target

  ProtectiveBarrier = "ProtectiveBarrier",
  // Rare
  // All allies gain +2 pDEF for 2 turns (3 at level 5)
  // Additionally, you gain +3 pDEF and Taunt buff for the same duration
  // consume 5 SP, 2 earth, produce 1 neutral
}

export enum PaladinSkillId {
  // ---------------
  // Aegis (Protection)
  // ---------------
  AegisShield = "AegisShield",
  // Uncommon
  // Active - Activate Aegis Shield for 3 stack (4 at lvl5)
  // Must not have Aegis Shield buff
  // Aegis Shield: each stack can mitigate 5 + (willpower mod) points of incoming damage.
  // example, (will power mod = 0), taking 5 damage: Aegis shield will mitigate 5 damage and decrease 1 stack.
  // Taking 7 damage: Aegis shield will mitigate 7 damage and decrease 2 stack.
  // When Aegis Shield is depleted, add Aegis Pulse buff for 1 turn.
  // consume 3 order, produce 1 neutral.

  AegisPulse = "AegisPulse",
  // Uncommon
  // Must have Aegis Pulse buff
  // ACTIVE — Emit a wave of holy light.
  // Healing allies for 1d4 + willpower mod * (1 + 0.1 * skill level) HP.
  // Dealing small holy damage to all enemies. for 1d4 + willpower mod * (1 + 0.1 * skill level) holy damage.
  // consume nothing but will remove Aegis Pulse buff.

  AegisWard = "AegisWard",
  // Rare
  // Target 1 random ally (2 at level 5)
  // Grant DefenseUp buff for 2 turns (3 at level 5)
  // Additionally, target gains Regen buff for 2 turns: restore 1d4 + WIL mod HP at the start of each turn
  // consume 4 SP, 2 order, produce 1 neutral

  // ---------------
  // Retribution (Damaging)
  // ---------------
  DivineStrike = "DivineStrike",
  // Uncommon
  // ACTIVE — A melee attack blessed with holy energy.
  // target one, front first, melee.
  // Must have any weapon but not bow, orb, wand, book,
  // Deal (weapon damage * 1.2 + (str mod) + (will mod)) * (skill level multiplier) * (position modifier) holy damage.
  // If enemy is undead or fiend, deal additional 1d6 holy damage. (1d10 at lvl5)
  // consume 2 order, produce 1 neutral.

  RighteousSmite = "RighteousSmite",
  // Uncommon
  // Single target melee attack
  // Deal (weapon damage * 1.3 + STR mod + WIL mod) * (1 + 0.1 * skill level) * skill level multiplier holy damage
  // If enemy has dealt damage to any ally in the last 2 turns: Deal +50% damage
  // If enemy is undead or fiend: Deal additional +1d6 holy damage
  // consume 3 SP, 2 order, produce 1 neutral
  // At level 5: Bonus damage increases to +75%

  DivineWrath = "DivineWrath",
  // Rare
  // AoE front row
  // Deal (1d8 + STR mod + WIL mod) * (1 + 0.1 * skill level) * skill level multiplier holy damage to all enemies in front row
  // Enemies who are undead or fiend take +1d6 additional damage
  // Enemies must roll DC10 + WIL mod WIL save or gain Exposed debuff for 2 turns
  // consume 5 SP, 3 order, produce 1 neutral

  // ---------------
  // Leadership (Team Buff - Different from Knight)
  // ---------------
  RallyingCry = "RallyingCry",
  // Common
  // All allies gain +2 STR and +1 END for 2 turns (3 at level 5)
  // Additionally, all allies gain Bless buff for 1 turn (2 turns at level 5)
  // consume 4 SP, 1 order, produce 1 neutral

  InspiringPresence = "InspiringPresence",
  // Uncommon
  // Self-buff for 3 turns (4 at level 5)
  // Inspiring Presence: All allies gain +1 to all saving throws
  // Additionally, at the start of each turn, restore 1d3 HP to all allies
  // consume 5 SP, 2 order, produce 1 order
  // At level 5: HP restoration becomes 1d4
}

export enum DruidSkillId {
  // ---------------
  // Nature's Wrath
  // ---------------
  VineWhip = "VineWhip",
  // Common
  // Deal 1d6 + (willpower mod) * (1 + 0.1 * skill level) nature damage.
  // target roll DC7 endurance save or get entangled for 1 turn.
  // Entangled: when take turns, must roll DC10 strength save or skip the turn.
  // produce 1 earth.

  ThornBurst = "ThornBurst",
  // Uncommon
  // AoE front row
  // Deal 1d6 + WIL mod * (1 + 0.1 * skill level) * skill level multiplier nature damage to all enemies in front row
  // Enemies must roll DC10 + WIL mod END save or gain Bleed debuff for 2 turns (1d3 damage per turn)
  // consume 3 MP, 1 earth, produce 1 neutral
  // At level 5: Also apply Slow debuff for 1 turn to enemies who fail save

  NaturesGrasp = "NaturesGrasp",
  // Rare
  // Single target
  // Deal 1d8 + WIL mod * (1 + 0.1 * skill level) * skill level multiplier nature damage
  // Target must roll DC10 + WIL mod END save or become Entangled for 2 turns (3 at level 5)
  // Additionally, if target is already Entangled, deal +50% damage
  // consume 4 MP, 2 earth, produce 1 earth

  // ---------------
  // Growth (Healing/Support)
  // ---------------
  RejuvenatingMist = "RejuvenatingMist",
  // Rare
  // Release a gentle natural mist around the party.
  // All allies gain Regen buff for 2 turns: the perm value will be used for remember will mod: restore (1d4 + WIL mod) HP at the start of their turn.
  // At level 5, lasts 3 turns. at level 7 will mod remember + 2
  // consume 4 MP, produce 1 earth

  NurturingBloom = "NurturingBloom",
  // Uncommon
  // Target 1 random injured ally (2 at level 5)
  // Restore (2d4 + WIL mod) * skill level multiplier HP
  // Additionally, grant Regen buff for 2 turns: restore 1d4 + WIL mod HP at the start of each turn
  // consume 3 MP, 1 earth, produce 1 neutral
  // At level 5: Also remove 1 random debuff from target

  NaturalResilience = "NaturalResilience",
  // Common
  // Target 1 random ally (2 at level 5)
  // Grant Bless buff for 2 turns (3 at level 5)
  // Additionally, target gains +1 END while Bless is active
  // consume 2 MP, produce 1 earth

  // ---------------
  // Wild (Primal/Hybrid)
  // ---------------
  ThrowSpear = "ThrowSpear",
  // Rare
  // Must equip Spear
  // deal damage based on range.
  // if front - front 0.8 + skillLevel
  // if front - back 1.2 + skillLevel
  // if back - back 1.6 + skillLevel
  // Note that this skill don't have level multiplier but add the level into damage directly.
  // at level 5, based range damage added 0.2 times (1.0, 1.4, 1.8)
  // consume 2 neutral, produce 1 earth.

  PrimalStrike = "PrimalStrike",
  // Common
  // Melee attack
  // Deal (weapon damage + STR mod + WIL mod) * (1 + 0.1 * skill level) * skill level multiplier nature damage
  // If used from back row: Move to front row first (if available), then deal +1d4 damage
  // consume 3 SP, produce 1 earth
  // At level 5: Bonus damage increases to +1d6

  WildInstinct = "WildInstinct",
  // Uncommon
  // Self-buff for 2 turns (3 at level 5)
  // Wild Instinct: Gain +2 STR and +2 AGI
  // Additionally, at the start of each turn, restore 1d3 + WIL mod HP
  // consume 4 SP, 1 earth, produce 1 neutral
}

export enum MonkSkillId {
  // ---------------
  // Fist (Offensive)
  // ---------------
  PalmStrike = "PalmStrike",
  // Common
  // ACTIVE — A precise melee strike using internal force.
  // target one, front first, melee.
  // Must equip barehand.
  // deal 1d6 + (str | dex mod whichever higher) * (position modifier) blunt damage.
  // Each level ignore 1 point of armor.
  // at level 5 damage dice = 1d8
  // produce 1 wind.
  // If armor is NOT cloth, damageOutput reduce by 70%.

  FlurryOfBlows = "FlurryOfBlows",
  // Uncommon
  // ACTIVE — Perform a flurry of rapid blows.
  // target one, front first, melee.
  // Must equip barehand.
  // Deal 2 hits (3 hits at lvl5) of damage *FROM* Palm Strike level that one self had,
  // (Palm Strike level can be check from character.skills + character.activeSkills + character.conditionalDeck, I think)
  // If no palm strike, damage = 1d4 + (str | dex mod whichever higher) * (position modifier) blunt damage.
  // consume 2 wind, produce 1 neutral.
  // If armor is NOT cloth, damageOutput reduce by 70%.

  StunningFist = "StunningFist",
  // Uncommon
  // Must equip barehand
  // Single target melee attack
  // Deal (1d6 + (STR | DEX mod whichever higher)) * (1 + 0.1 * skill level) * skill level multiplier blunt damage
  // Target must roll DC10 + (STR | DEX mod whichever higher) END save or become Stun for 1 turn
  // consume 3 SP, produce 1 wind
  // At level 5: Save DC increases to DC12

  // ---------------
  // Flow (Meditation/Resource)
  // ---------------
  Meditation = "Meditation",
  // Common
  // Restore 1d4 + skillLevel to HP or MP or SP, whichever is lowest (in percent).
  // produce 1 order.

  InnerPeace = "InnerPeace",
  // Uncommon
  // Self-buff for 2 turns (3 at level 5)
  // Inner Peace: Restore 1d4 + (STR | DEX mod whichever higher) HP at the start of each turn
  // Additionally, gain +1 to all saving throws while active
  // consume 2 MP, produce 1 order
  // At level 5: Also restore 1 SP per turn

  ChiFlow = "ChiFlow",
  // Rare
  // Restore 2d4 + (STR | DEX mod whichever higher) HP
  // Additionally, restore 2 MP and 2 SP
  // If you're below 30% HP: Restore additional 1d4 HP
  // consume nothing, produce 1 order
  // Cooldown 4 turns (3 at level 5)

  // ---------------
  // Master (Precision/Control)
  // ---------------
  PrecisionStrike = "PrecisionStrike",
  // Common
  // Must equip barehand
  // Single target melee attack
  // Deal (1d6 + (STR | DEX mod whichever higher)) * (1 + 0.1 * skill level) * skill level multiplier blunt damage
  // +4 hit roll (precision)
  // Each level ignore 1 point of armor (same as Palm Strike)
  // consume 2 SP, produce 1 wind
  // At level 5: Hit roll bonus increases to +6

  DizzyingPalm = "DizzyingPalm",
  // Uncommon
  // Must equip barehand
  // Single target melee attack
  // Deal (1d4 + (STR | DEX mod whichever higher)) * (1 + 0.1 * skill level) * skill level multiplier blunt damage
  // Target must roll DC10 + (STR | DEX mod whichever higher) END save or gain Dazed debuff for 2 turns
  // consume 3 SP, 1 wind, produce 1 neutral
  // At level 5: Also reduce target's AB gauge by 10 if save fails
}

export enum WarlockSkillId {
  // ---------------
  // Shadow (Offensive)
  // ---------------
  ChaosBolt = "ShadowBolt",
  // Common
  // ACTIVE — Launch a bolt of condensed shadow energy.
  // Ranged single-target magic damage
  // Deal 1d6 + planar mod * (1 + 0.1 * skill level) * skill level multiplier arcane damage
  // Target must roll DC10 + planar mod WIL save or gain Cursed debuff for 1 turn (reduces saving throws)
  // consume 2 MP, produce 1 chaos

  ShadowBurst = "ShadowBurst",
  // Uncommon
  // AoE front row
  // Deal 1d6 + planar mod * (1 + 0.1 * skill level) * skill level multiplier arcane damage to all enemies in front row
  // Enemies must roll DC10 + planar mod WIL save or gain Slow debuff for 1 turn
  // consume 4 MP, 1 chaos, produce 1 chaos
  // At level 5: Also apply Cursed debuff for 1 turn to enemies who fail save

  VoidBolt = "VoidBolt",
  // Rare
  // Single target ranged
  // Deal (1d8 + planar mod) * (1 + 0.1 * skill level) * skill level multiplier arcane damage
  // If target has Cursed debuff: Deal +50% damage
  // Target must roll DC12 + planar mod WIL save or gain Cursed debuff for 2 turns
  // consume 5 MP, 2 chaos, produce 1 chaos

  // ---------------
  // Corruption (Debuff)
  // ---------------
  Corruption = "Corruption",
  // Uncommon
  // ACTIVE — Corrupt the target with dark energy.
  // Single target
  // Deal 1d4 + planar mod * (1 + 0.1 * skill level) * skill level multiplier arcane damage
  // Target must roll DC10 + planar mod WIL save or gain Cursed debuff for 2 turns
  // Additionally, if target already has Cursed debuff, also apply Hexed debuff for 2 turns (reduces endurance by 2 and deals 1d2 damage per turn)
  // consume 3 MP, 1 chaos, produce 1 chaos

  CurseOfWeakness = "CurseOfWeakness",
  // Common
  // Single target
  // Target must roll DC10 + planar mod WIL save or gain Cursed debuff for 2 turns (3 at level 5)
  // If save fails, also deal 1d3 + planar mod arcane damage
  // consume 2 MP, produce 1 chaos
  // At level 5: Also apply Slow debuff for 1 turn if save fails

  // ---------------
  // Pact (Life Drain/Sacrifice)
  // ---------------
  LifeDrain = "LifeDrain",
  // Uncommon
  // ACTIVE — Drain vitality from an enemy.
  // Single target
  // Deal 1d6 + planar mod * (1 + 0.1 * skill level) * skill level multiplier arcane damage
  // Restore HP equal to 50% of damage dealt (75% at level 5)
  // consume 3 MP, 1 chaos, produce 1 chaos

  DarkPact = "DarkPact",
  // Rare
  // ACTIVE — Ultimate-ish.
  // Sacrifice 2d4 HP (1d4 at level 5)
  // Gain Dark Pact buff for 3 turns (4 at level 5)
  // Dark Pact: All damage dealt increased by +25% (+35% at level 5), but you take +1 damage from all sources
  // consume nothing, produce 2 chaos
  // At level 5: Also gain +2 planar mod while active
}

export enum DuelistSkillId {
  // ---------------
  // Parry (Defensive Counter)
  // ---------------
  ParryRiposte = "ParryRiposte",
  // Uncommon
  // ACTIVE — Assume defensive stance, ready to parry and counter.
  // Gain Parry buff for 1 turn (2 at level 5).
  // When attacked, roll DC10 + CONTROL mod END save. If passed, negate the attack and deal (1d6 + DEX mod) * skill level multiplier slash damage back to attacker.
  // consume 3 SP, produce 1 wind

  DuelingStance = "DuelingStance",
  // Rare
  // ACTIVE — Adopt a focused dueling stance, enhancing precision.
  // Gain DuelingStance buff for 3 turns (4 at level 5).
  // DuelingStance: +2 hit roll, +2 crit chance, +1 STR
  // Additionally, when you parry an attack, gain +5 AB gauge
  // consume 4 SP, 1 wind, produce 1 neutral

  PerfectParry = "PerfectParry",
  // Common
  // Single target melee attack
  // Must have Parry buff active
  // Deal (weapon damage + DEX mod) * (1 + 0.1 * skill level) * skill level multiplier slash damage
  // Additionally, extend Parry buff duration by 1 turn
  // consume 2 SP, produce 1 wind

  // ---------------
  // Precision (Accurate Strikes)
  // ---------------
  PreciseStrike = "PreciseStrike",
  // Common
  // ACTIVE — Execute a precise blade strike with perfect timing.
  // Single target melee attack
  // Deal (weapon damage * (1.0 at base, 1.2 at level 5)) * skill level multiplier slash damage
  // +3 hit roll
  // consume 2 SP, produce 1 wind

  FeintStrike = "FeintStrike",
  // Uncommon
  // Single target melee attack
  // Deal (weapon damage + DEX mod) * (1 + 0.1 * skill level) * skill level multiplier slash damage
  // +4 hit roll (+6 at level 5)
  // If this attack hits: Gain +10 AB gauge and target loses 10 AB gauge
  // consume 3 SP, 1 wind, produce 1 neutral

  // ---------------
  // Flow (Multi-hit Combos)
  // ---------------
  BladeFlurry = "BladeFlurry",
  // Uncommon
  // ACTIVE — Unleash a rapid flurry of blade strikes.
  // Multi-hit melee attack: 2 hits (3 hits at level 5)
  // Each hit: Deal (weapon damage * 0.7 + DEX mod) * (1 + 0.1 * skill level) * skill level multiplier slash damage
  // consume 4 SP, 1 wind, produce 1 neutral

  ComboStrike = "ComboStrike",
  // Common
  // Single target melee attack
  // Deal (weapon damage + DEX mod) * (1 + 0.1 * skill level) * skill level multiplier slash damage
  // If you've attacked this target in the previous turn: Deal +25% damage and gain +5 AB gauge
  // consume 3 SP, produce 1 wind
}

export enum WitchSkillId {
  // ---------------
  // Hex (Marking/Setup)
  // ---------------
  ChaosBrand = "CurseMark",
  // Uncommon
  // ACTIVE — Place a hex sigil on a target, marking them for increased suffering.
  // Single target
  // Apply HexMark debuff to target for 2 turns (3 at level 5)
  // While marked, target takes +1d3 extra chaos damage from all sources
  // consume 2 MP, 1 chaos, produce 1 neutral

  HexWeave = "HexWeave",
  // Common
  // Single target
  // Apply HexMark debuff to target for 2 turns
  // Deal 1d3 + planar mod true damage
  // If target already has HexMark, also apply Cursed debuff for 1 turn
  // consume 2 MP, produce 1 chaos

  // ---------------
  // Curse (Direct Debuff)
  // ---------------
  PoisonDart = "CurseBolt",
  // Common
  // ACTIVE — Launch a bolt of cursed energy at the target.
  // Ranged single target
  // Deal 1d3 + planar mod true arcane damage
  // Target must roll DC8 + CONTROL mod WIL save or gain Cursed debuff for 2 turns
  // consume 2 MP, produce 1 chaos

  MisfortuneCurse = "MisfortuneCurse",
  // Uncommon
  // Single target
  // Target must roll DC10 + CONTROL mod WIL save or gain Cursed debuff for 2 turns (3 at level 5)
  // Additionally, if save fails, also apply Slow debuff for 1 turn
  // If target already has Cursed debuff, deal 1d4 + planar mod arcane damage
  // consume 3 MP, 1 chaos, produce 1 chaos

  // ---------------
  // Chaos (Unpredictable Magic)
  // ---------------
  ChaosBinding = "HexDoll",
  // Rare
  // ACTIVE — Bind a target to a small effigy, creating a sympathetic link.
  // Single target
  // Deal 1d4 + planar mod * (1 + 0.1 * skill level) arcane damage
  // Target must roll DC10 + CONTROL mod WIL save or gain Hexed debuff for 2 turns (reduces endurance by 2 and deals 1d2 damage per turn)
  // If target has HexMark debuff, also apply Cursed debuff for 1 turn
  // consume 4 MP, 1 chaos, produce 1 neutral

  Bewitch = "Bewitch",
  // Uncommon
  // ACTIVE — Influence an enemy's mind with witchcraft, causing confusion.
  // Single target enemy
  // Target must roll DC10 + CONTROL mod WIL save or gain Charmed debuff for 1 turn (2 at level 5)
  // Charmed: On their turn, roll DC12 WIL save. If failed, target a random ally instead of intended target for their action
  // consume 3 MP, 1 chaos, produce 1 neutral

  ChaoticWeave = "ChaoticWeave",
  // Common
  // Single target
  // Deal 1d4 + planar mod * (1 + 0.1 * skill level) arcane damage
  // Roll 1d4: 1-2: Apply Cursed debuff for 1 turn, 3: Apply Slow debuff for 1 turn, 4: Apply Dazed debuff for 1 turn
  // consume 2 MP, produce 1 chaos
}

export enum InquisitorSkillId {
  // ---------------
  // Smite (Holy Damage)
  // ---------------
  RadiantSmite = "RadiantSmite",
  // Common
  // ACTIVE — Launch a focused blast of radiant energy.
  // Ranged single target
  // Deal 1d6 + ((WIL + PLANAR) / 2) * (1 + 0.1 * skill level) * skill level multiplier holy damage
  // Target must roll DC8 + CONTROL mod WIL save or gain Exposed debuff for 2 turns
  // +1d4 bonus damage against undead/fiends (1d8 at level 5)
  // consume 2 MP, 1 order, produce 1 neutral

  JudgmentDay = "JudgmentDay",
  // Rare
  // ACTIVE — Call down a concentrated pillar of radiant force.
  // Single target
  // Deal (2d6 + (WIL + PLANAR) * (1 + 0.15 * skill level)) * skill level multiplier holy damage
  // +50% damage if target has Exposed debuff
  // +1d8 against undead/fiends (2d8 at level 5)
  // consume 5 MP, 2 order, 1 fire, produce 1 neutral

  // ---------------
  // Expose (Vulnerability Setup)
  // ---------------
  ExposeWeakness = "ExposeWeakness",
  // Uncommon
  // ACTIVE — Reveal the enemy's wrongdoing or impurity.
  // Single target enemy
  // Apply Exposed debuff for 2 turns (3 at level 5)
  // Exposed: takes +1d3 damage from all sources. At level 5, also gain -2 crit defense (using perm value in debuff)
  // You gain +WIL mod/2 hit roll against exposed enemies
  // consume 2 MP, 1 order, produce 1 fire

  // ---------------
  // Purge (Utility/Dispel)
  // ---------------
  PurgeMagic = "PurgeMagic",
  // Uncommon
  // ACTIVE — Attempt to forcibly remove magical buffs from a target.
  // Single target
  // Target must roll DC10 + CONTROL mod WIL save
  // Failed: Remove 1-2 random buffs and deal (1d4 + WIL mod) * skill level multiplier holy damage
  // Passed: Deal half holy damage
  // consume 3 MP, 1 fire, produce 1 order

  CleansingFlame = "CleansingFlame",
  // Common
  // Single target enemy
  // Deal 1d4 + WIL mod * (1 + 0.1 * skill level) * skill level multiplier holy damage
  // Remove 1 random debuff from self or 1 random ally
  // If target is undead or fiend: Deal +1d3 damage
  // consume 2 MP, produce 1 order
}

export enum ScholarSkillId {
  // ---------------
  // Analyze (Information/Vulnerability)
  // ---------------
  Analyze = "Analyze",
  // Uncommon
  // Single target enemy
  // Mark a vulnerable spot on the enemy. Apply Exposed debuff for 2 turns (3 at level 5)
  // Exposed: takes +1d3 damage from all sources
  // At level 5, the exposed enemy also gains -2 to critical defense (using perm value in debuff)
  // consume 2 MP, produce 1 neutral

  WeaknessStudy = "WeaknessStudy",
  // Common
  // Single target enemy
  // Apply Exposed debuff for 1 turn
  // Additionally, deal 1d3 + INT mod true arcane damage
  // consume 2 MP, produce 1 neutral

  // ---------------
  // Disrupt (Control/Interrupt)
  // ---------------
  DisruptPattern = "DisruptPattern",
  // Common
  // Cantrip
  // Single target
  // Force DC10 WIL save (DC12 at level 5)
  // Fail: target gains Dazed debuff for 1 turn
  // Success: reduce target's AB gauge by 20 (30 at level 5)
  // produce 1 neutral

  MentalInterference = "MentalInterference",
  // Uncommon
  // Single target
  // Target must roll DC10 + INT mod WIL save or gain Dazed debuff for 1 turn (2 at level 5)
  // Additionally, reduce target's AB gauge by 15
  // consume 2 MP, produce 1 neutral

  // ---------------
  // Overload (Debuff Exploitation)
  // ---------------
  CognitiveOverload = "CognitiveOverload",
  // Uncommon
  // Single target
  // Deal 1d4 + INT mod * (1 + 0.1 * skill level) * skill level multiplier true arcane damage (1d6 at level 5)
  // Refresh 1 random debuff on the target (extend duration by 1 turn)
  // If target has ≥3 debuffs, damage becomes 1d6 (1d8 at level 5)
  // consume 3 MP, produce 1 neutral

  DebilitatingStrike = "DebilitatingStrike",
  // Common
  // Single target melee attack
  // Deal (weapon damage * 0.8 + INT mod) * (1 + 0.1 * skill level) * skill level multiplier arcane damage
  // If target has ≥2 debuffs: Deal +1d4 damage
  // If target has ≥3 debuffs: Also apply Slow debuff for 1 turn
  // consume 3 SP, produce 1 neutral
}

export enum EngineerSkillId {
  // ---------------
  // Trap (Battlefield Control)
  // ---------------
  BearTrap = "BearTrap",
  // Common
  // Set a bear trap on the battlefield. The next time an enemy uses a melee (physical) attack, the trap triggers
  // Deal (1d6 + DEX mod) * skill level multiplier pierce damage and removing the trap
  // consume 2 SP, produce 1 fire

  Tripwire = "Tripwire",
  // Uncommon
  // Set a tripwire on the battlefield. The next time an enemy moves or uses a melee attack, the trap triggers
  // Target must roll DC10 + DEX mod AGI save or gain Stun debuff for 1 turn (2 at level 5)
  // Additionally, deal 1d4 + DEX mod pierce damage
  // consume 3 SP, 1 fire, produce 1 neutral

  // ---------------
  // Explosive (AoE Damage)
  // ---------------
  ExplosiveBolt = "ExplosiveBolt",
  // Common
  // Ranged attack (requires bow)
  // Fire an explosive bolt that deals (1d8 + DEX mod) * skill level multiplier fire damage to a target
  // If hit, deals 50% splash damage to adjacent enemies in the same row
  // consume 3 SP, produce 1 fire

  FragmentationGrenade = "FragmentationGrenade",
  // Uncommon
  // AoE front row
  // Deal (1d6 + DEX mod) * (1 + 0.1 * skill level) * skill level multiplier fire damage to all enemies in front row
  // Enemies must roll DC10 + DEX mod END save or gain Bleed debuff for 2 turns (1d3 damage per turn)
  // consume 4 SP, 1 fire, produce 1 fire
  // At level 5: Also apply Slow debuff for 1 turn to enemies who fail save

  // ---------------
  // Construct (Mechanical Utilities)
  // ---------------
  MechanicalOverdrive = "MechanicalOverdrive",
  // Uncommon
  // Self-buff for 2 turns (3 at level 5)
  // Mechanical Overdrive: Gain +2 STR and +2 AGI
  // Additionally, gain +5 AB gauge at the start of each turn
  // consume 4 SP, 1 fire, produce 1 neutral

  GearShift = "GearShift",
  // Common
  // Single target ally (including self)
  // Grant Haste buff for 2 turns (3 at level 5)
  // Additionally, restore 2 SP
  // consume 2 SP, produce 1 fire
}

export enum NomadSkillId {
  // ---------------
  // Adaptive (Position-Changing)
  // ---------------
  AdaptiveStrike = "AdaptiveStrike",
  // Common
  // Melee attack that changes position
  // Deal weapon damage + attribute modifier according to weapon * (1.0 + 0.1 per 2 character levels, max 1.5 at level 10) * skill level multiplier damage
  // Must change position: front -> back or back -> front (if slot available)
  // -2 hit roll penalty
  // This attack has no range penalty
  // consume 2 SP, produce 1 neutral

  AdaptiveRetreat = "AdaptiveRetreat",
  // Uncommon
  // Move to back row (if available) and grant Retreat buff for 1 turn (2 at level 5)
  // Additionally, deal (weapon damage * 0.8 + attribute mod) * (1 + 0.1 * skill level) * skill level multiplier damage to closest enemy
  // consume 3 SP, produce 1 wind

  // ---------------
  // Tactical (Position-Based Effects)
  // ---------------
  TacticalSlash = "TacticalSlash",
  // Uncommon
  // Self row based: Adapt your stance to your current position
  // Must equip dagger or blade
  // Front row: Engulf your weapon with fire and attack, dealing (weapon damage + attribute modifier + 1d4) * skill level multiplier fire damage
  // Enemy must roll DC10 END save (DC12 at level 5) or gain Burn debuff for 1d3 turns
  // Back row: Gain Retreat buff for 1 turn (2 at level 5)
  // consume 3 SP, produce 1 fire

  TacticalShot = "TacticalShot",
  // Uncommon
  // Enemy row based: Strike adapts to enemy position
  // Must equip bow
  // Enemy in front row: Throw hot sand into enemy eyes, dealing 1d2 true damage
  // Enemy must roll DC10 AGI save (DC12 at level 5) or gain Blind debuff for 1 turn (-3 hit roll)
  // Enemy in back row: Launch a powerful shot, dealing (weapon damage + attribute modifier) * (skill level multiplier + 0.3) piercing damage
  // No range penalty
  // consume 3 SP, produce 1 neutral

  TacticalAdvance = "TacticalAdvance",
  // Common
  // Move to front row (if available) and deal (weapon damage + attribute mod) * (1 + 0.1 * skill level) * skill level multiplier damage
  // If moving from back row: Gain +5 AB gauge
  // consume 2 SP, produce 1 neutral

  // ---------------
  // Mobility (Movement/Positioning)
  // ---------------
  QuickStep = "QuickStep",
  // Common
  // Change position (front <-> back) if slot available
  // Gain +10 AB gauge
  // Additionally, gain Haste buff for 1 turn
  // consume 2 SP, produce 1 wind

  RepositioningStrike = "RepositioningStrike",
  // Uncommon
  // Single target melee attack
  // Deal (weapon damage + attribute mod) * (1 + 0.1 * skill level) * skill level multiplier damage
  // If target is in front row: Push target to back row (if slot available) and deal +1d4 damage
  // If target is in back row: Pull target to front row (if slot available) and deal +1d4 damage
  // consume 3 SP, produce 1 neutral
  // At level 5: Also gain +5 AB gauge if position change succeeds
}
