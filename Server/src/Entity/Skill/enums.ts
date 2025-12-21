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
   * - **Healing:** (1d4 + WIL mod) × skill level multiplier
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
  /**
   * ## Seer System
   * - **Foreseen Buff:** First attack or debuff that would hit the target must roll a LUK save vs DC8 + your LUK mod. If failed, the effect misses. Remove Foreseen after triggering.
   * - **Lucky Buff:** Does nothing by itself, used by other skills (max 10 stacks).
   * - **BadLuck Buff:** Does nothing by itself, used by other skills (max 10 stacks).
   * - **PlanarGrab Buff:** Required for ThreadBacklash skill.
   */

  /**
   * **Tier:** Common (Cantrip)
   * 
   * Echo the planar energy around, dealing arcane damage to a target.
   * - **Damage:** 1d6 + CHA mod × (1 + 0.1 × skill level) arcane damage
   * - **On Hit:** Target must roll DC10 LUK save or decrease AB gauge by 10
   * - **On Save Failed:** Gain 1 Lucky stack to self (reduce AB gauge by 10)
   * - **On Save Success:** Gain 1 BadLuck stack to self
   * 
   * **Consume:** 3 MP
   * **Produce:** 1 wind
   */
  PlanarEcho = "PlanarEcho",

  // -----------
  // Foreseen Step
  // -----------
  /**
   * **Tier:** Common
   * 
   * Mark an ally with Foreseen buff for 1 turn.
   * - **Foreseen Buff:** First attack or debuff that would hit the target must roll a LUK save vs DC8 + your LUK mod. If failed, the effect misses. Remove Foreseen after triggering.
   * 
   * **Consume:** 3 MP, 1 order
   * **Produce:** 1 wind
   */
  ForeseenStep = "ForeseenStep",

  /**
   * **Tier:** Uncommon
   * 
   * Attempt to strike an enemy with forth seeing eyes.
   * - **Roll:** d20 + your LUK mod vs 12 + enemy LUK mod (10 + enemy LUK mod at level 5)
   * - **On Success:** Deal 1d8 (1d10 at level 5) arcane damage and gain 1 Lucky stack.
   * - **On Failure:** Enemy gains +10 AB gauge and you gain 1 BadLuck stack
   * 
   * **Consume:** 3 MP, 1 wind
   * **Produce:** 1 order
   */
  FortuneStrike = "FortuneStrike",

  /**
   * **Tier:** Rare
   * 
   * Twist the outcome by consuming your fortune stacks.
   * - **Selection:** Check Lucky and BadLuck stacks. Pick the one with most stacks (if equal, roll d20 > 10 = pick Lucky)
   * - **If Lucky Chosen:** Randomly heal one teammate with least HP percentage for (1d4 + Lucky stacks) × skill level multiplier
   * - **If BadLuck Chosen:** Deal slash damage to one random enemy for (1d8 + BadLuck stacks) × skill level multiplier
   * - **Level 7:** Use both buffs/debuffs together
   * 
   * **Consume:** 2 different elements (order + chaos), 0 elements produce (random 0-1)
   */
  TwistOutcome = "TwistOutcome",

  /**
   * **Tier:** Rare
   * 
   * See the future, gain Precognition buff for 1 turn.
   * - **Precognition Buff:** Next attacker that targets you must roll their LUK save vs DC10 + your LUK mod + (skill level - 1) or it will surely miss. Remove the buff after checking.
   * - **Level 5:** If the attacker misses, you gain 1 order
   * - **Level 7:** When used, roll a d20 + LUK mod. If passed (DC10), gain 1 more turn of Precognition buff
   * 
   * **Consume:** 1 order, 1 wind
   * **Produce:** 1 water
   */
  Precognition = "Precognition",

  // -----------
  // Manipulator
  // -----------
  /**
   * **Tier:** Uncommon
   * 
   * Look into the planar thread and pull it away from an enemy.
   * - **Damage:** 1d4 + CHA mod arcane damage
   * - **Steal Element:** Roll d14 (-1 per skill level) dice. If passed (DC10), randomly steal 1 element from the enemy
   * 
   * **Consume:** 1 wind
   * **Produce:** 0-1 neutral (random)
   */
  ThreadSnip = "ThreadSnip",

  /**
   * **Tier:** Rare
   * 
   * Grab onto the planar thread with bare hands, risking misfortune.
   * - **Save:** Roll DC 15 - skill level LUK save
   * - **On Fail:** Gain 2 stacks of BadLuck
   * - **On Success:** Roll 3d3 (each die represents order, water, and wind). Gain resource equal to (roll - 1) for each (0-2). Gain PlanarGrab buff
   * 
   * **Consume:** 1 wind
   * **Produce:** None (resources come from skill effect)
   */
  GrabOnPlanarThreadWithBareHand = "GrabOnPlanarThreadWithBareHand",

  /**
   * **Tier:** Rare
   * 
   * Release the stored planar energy in a devastating backlash.
   * - **Requirement:** Must have PlanarGrab buff
   * - **Effect:** Consume ALL elemental resources you have
   * - **Damage:** For each element consumed, deal 1d6 arcane damage to a random enemy
   * - **Consequences:**
   *   - If total resources consumed ≤ 2: Gain 1 BadLuck stack
   *   - If total resources consumed ≥ 5: Gain 1 Lucky stack
   * - **After Use:** Remove PlanarGrab buff
   * 
   * **Consume:** 0 elements (consumes all elemental resources via skill effect), PlanarGrab buff
   * **Produce:** None
   */
  ThreadBacklash = "ThreadBacklash",
}

export enum MageSkillId {
  // ---------------
  // Arcane Elemental Skills
  // Arcane Charge: (buff) Does nothing, used by other skills
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Launch a bolt of arcane energy.
   * - **Damage:** (1d6 + planar mod) × skill level multiplier arcane damage to a target
   * - **Effect:** Gain 1 Arcane Charge stack
   * 
   * **Consume:** 2 MP
   * **Produce:** 1 neutral
   */
  ArcaneBolt = "ArcaneBolt",

  /**
   * **Tier:** Uncommon
   * 
   * Shield yourself with arcane energy.
   * - **Effect:** Gain Arcane Shield buff for 1 turn
   * - **Arcane Shield:** When attacked, roll d20 + planar mod END save. If passed, negate that attack and gain 1 Arcane Charge stack
   * 
   * **Consume:** 3 MP, 1 neutral
   * **Produce:** 1 neutral
   */
  ArcaneShield = "ArcaneShield",

  /**
   * **Tier:** Common
   * 
   * Shoot multiple arcane missiles at random targets.
   * - **Missiles:** Shoot 3 arcane missiles at 3 random targets
   * - **Damage per Missile:** 1d4 + planar mod arcane damage
   * - **Level 5:** Each missile adds damage based on Arcane Charge stacks (rounded down)
   * 
   * **Consume:** 3 MP, 1 neutral
   * **Produce:** 1 chaos
   */
  ArcaneMissiles = "ArcaneMissiles",

  /**
   * **Tier:** Uncommon
   * 
   * Unleash a surge of planar energy across the front line.
   * - **Damage:** 1d8 + planar mod arcane damage to all enemies in front row (+2 raw damage at level 5)
   * - **Charge Bonus:** If arcane charge stacks ≥ 3, deal additional 1d4 damage and remove 3 charges
   * 
   * **Consume:** 4 MP, 2 neutral
   * **Produce:** 1 chaos
   */
  PlanarSurge = "PlanarSurge",

  /**
   * **Tier:** Rare
   * 
   * Convert Arcane Charges into sustained power.
   * - **Effect:** Consume all Arcane Charge stacks, restore mana equal to stacks × 2
   * - **Buff:** Gain Arcane Battery buff stacks for 3 turns (4 turns at level 5) based on consumed Arcane Charge stacks
   * - **Arcane Battery:** Each stack gives +1 damage to all arcane damage attacks
   * 
   * **Consume:** 5 MP, all Arcane Charge stacks, 3 chaos
   * **Produce:** 1 neutral
   */
  ArcaneBattery = "ArcaneBattery",

  /**
   * **Tier:** Epic
   * 
   * Unleash all stored arcane energy in a devastating eruption.
   * - **Effect:** Consume all Arcane Charge stacks
   * - **Damage:** Each stack deals 2d6 damage to random enemies
   * 
   * **Consume:** 6 MP, all Arcane Charge stacks, 3 chaos
   * **Produce:** 1 neutral
   */
  PlanarEruption = "PlanarEruption",

  // ---------------
  // Fire Elemental Skills
  // Burn: (debuff) Take damage equal to burn stack every turn
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Hurl a bolt of fire at a target.
   * - **Damage:** (1d6 + planar mod) × skill level multiplier fire damage to a target
   * - **Effect:** Chance to apply Burn debuff
   * 
   * **Consume:** 2 MP
   * **Produce:** 1 fire
   */
  FireBolt = "FireBolt",

  /**
   * **Tier:** Uncommon
   * 
   * Unleash a wave of fire across the front line.
   * - **Damage:** 1d8 + planar mod fire damage to all enemies in front row
   * - **Save:** On hit, target must roll DC10 + planar mod END save or get 2-3 burn stacks
   * 
   * **Consume:** 4 MP, 2 fire
   * **Produce:** 1 chaos
   */
  BurningHand = "BurningHand",

  /**
   * **Tier:** Uncommon
   * 
   * Exploit existing burn effects to deal damage and heal.
   * - **Damage:** Attack all enemies with burning debuff, dealing 1 or 1d2 per stack inferno damage
   * - **Healing:** Heal self for total damage × (0.1 × skill level) (+ 1d2 per stack at level 5)
   * 
   * **Consume:** 3 MP, 1 fire, 1 chaos
   * **Produce:** 1 fire
   */
  Backdraft = "Backdraft",

  /**
   * **Tier:** Rare
   * 
   * Unleash a blazing sphere of fire that explodes upon impact.
   * - **Targets:** Engulf 1–6 enemies in a devastating inferno
   * - **Damage:** 1d12 + planar mod + 0.5 × skill level fire damage to each target
   * - **Save:** On hit, target must roll DC10 + planar mod END save or get 1–2 burn stacks
   * 
   * **Consume:** 5 MP, 2 fire, 2 chaos
   * **Produce:** 1 fire
   */
  FireBall = "FireBall",

  // ---------------
  // Water Elemental Skills
  // Soaked: When attacked with lightning, take ×2 damage. Once soaked stacks to 5, take 1d6 true water damage
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Lash a target with water.
   * - **Damage:** (1d6 + planar mod) × skill level multiplier water damage to a target
   * - **Effect:** Chance to spill and heal an ally for 1d3 HP
   * 
   * **Consume:** 2 MP
   * **Produce:** 1 water
   */
  HydroLash = "HydroLash",

  /**
   * **Tier:** Common
   * 
   * Blast a target with pressurized water.
   * - **Damage:** 1d6 + planar mod water damage to a target
   * - **Effect:** Add 1 Soaked debuff to target. If soaked reaches 5 stacks, trigger 1d6 true water damage
   * 
   * **Consume:** 3 MP, 1 water
   * **Produce:** 1 neutral
   */
  AquaBlast = "AquaBlast",

  /**
   * **Tier:** Uncommon
   * 
   * Release a flowing pulse of water that may chain between targets.
   * - **Chain:** To chain, roll DC15 vs control + skill level
   * - **Effect:** Deal 1d6 + planar + skill mod damage to enemies, or heal 1d3 + planar + skill mod HP to allies
   * 
   * **Consume:** 3 MP, 2 water
   * **Produce:** 1 chaos
   */
  CascadePulse = "CascadePulse",

  /**
   * **Tier:** Rare
   * 
   * Drag an enemy into overwhelming water pressure like abyssal depths.
   * - **Damage:** 1d12 + planar + skill level mod water damage
   * - **Soaked:** Add 2 stacks of Soaked debuff (3 stacks at level 5)
   * 
   * **Consume:** 4 MP, 2 water, 1 chaos
   * **Produce:** 1 neutral
   */
  CrushingDepths = "CrushingDepths",

  // ---------------
  // Earth Elemental Skills
  // Stone Skin: +2 pDEF
  // StoneBounded: (debuff) +2 pDEF but upon taking turn must roll DC12 STR save or can't take turn. If save succeeds, remove StoneBounded debuff
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Hurl a sharp fragment of stone at a target.
   * - **Damage:** (1d6 + planar mod) × skill level multiplier earth damage to a target
   * - **Effect:** Low chance to give self Stone Skin buff for 1 turn
   * 
   * **Consume:** 2 MP
   * **Produce:** 1 earth
   */
  StoneShard = "StoneShard",

  /**
   * **Tier:** Common
   * 
   * Harden your skin with stone-like protection.
   * - **Effect:** Give self Stone Skin buff for 2 turns (+2 pDEF)
   * 
   * **Consume:** 2 MP 1 earth
   * **Produce:** 1 order
   */
  StoneSkin = "StoneSkin",

  /**
   * **Tier:** Uncommon
   * 
   * Grip an enemy with earthen power.
   * - **Damage:** 1d8 earth damage to an enemy in front row (melee)
   * - **Requirement:** Must have Stone Skin buff (removed after use)
   * - **Effect:** Add StoneBounded debuff to the enemy for 2 turns
   * 
   * **Consume:** 3 SP, 1 earth, 1 order
   * **Produce:** 1 neutral
   */
  EarthernGrip = "EarthernGrip",

  /**
   * **Tier:** Uncommon
   * 
   * Send a ground shock through the front row.
   * - **Damage:** 1d8 earth damage to all enemies in front line
   * 
   * **Consume:** 4 MP, 2 earth
   * **Produce:** 1 neutral
   */
  TremorWave = "TremorWave",

  // ---------------
  // Wind Elemental Skills
  // Tailwind: (buff) Each stack increases AB gauge gain, decreases every turn
  // WindFury: During WindFury, Tailwind won't decrease
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Slice a target with cutting wind.
   * - **Damage:** (1d6 + planar mod) × skill level multiplier wind damage to a target
   * - **Effect:** Gain 1 stack of Tailwind
   * 
   * **Consume:** 2 MP
   * **Produce:** 1 wind
   */
  WindSlice = "WindSlice",

  /**
   * **Tier:** Uncommon
   * 
   * Create a sword out of wind and slash an enemy.
   * - **Damage:** 1d8 wind damage to an enemy (melee)
   * - **Save:** Enemy rolls DC10 save or gains 2 stacks of Bleed debuff
   * 
   * **Consume:** 3 SP, 1 neutral
   * **Produce:** 1 wind
   */
  GaleSlash = "GaleSlash",

  /**
   * **Tier:** Rare
   * 
   * Release cutting winds that repeat based on your momentum.
   * - **Damage:** 1d6 wind damage to an enemy
   * - **Repeat:** Every 2 stacks of Tailwind will repeat the attack
   * 
   * **Consume:** 4 MP, 2 wind
   * **Produce:** 1 neutral
   */
  RazorGust = "RazorGust",

  /**
   * **Tier:** Rare
   * 
   * Enter a heightened flow state with wind energy.
   * - **Effect:** Gain 2 stacks of Tailwind (3 stacks at level 7) and WindFury buff for 3 turns (4 turns at level 5)
   * - **WindFury:** During WindFury, Tailwind won't decrease
   * 
   * **Consume:** 5 MP, 2 wind
   * **Produce:** 1 neutral
   */
  WindFury = "WindFury",
}

export enum MysticSkillId {
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Prepare a defensive palm technique.
   * - **Effect:** Give self Reverse Palm buff for 1 turn
   * - **Reverse Palm:** When attacked, roll d20 WIL save. If passed, deal 1d6 blunt damage + DEX mod × (1 + 0.1 × skill level) to the attacker and negate that attack, then remove the buff. If failed, remove the buff and take damage normally
   * - **Requirement:** Must be barehand
   * 
   * **Consume:** 2 SP
   * **Produce:** 1 neutral
   */
  ReversalPalm = "ReversalPalm",

  // ---------------
  // Mist
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Shift like mist to a safer position.
   * - **Movement:** Move to the backline if you are in the front row; if already in the back row, gain evasion instead
   * - **Cleanse:** Remove Slow or Bind if present
   * - **Dodge:** Gain +3 dodge roll for 1 turn (2 turns at skill level 5)
   * 
   * **Consume:** 3 SP, 1 neutral
   * **Produce:** 1 wind
   */
  MistStep = "MistStep",

  /**
   * **Tier:** Uncommon
   * 
   * Pierce through the mist with precise strikes.
   * - **Damage:** (1d8 + DEX mod) × skill level multiplier pierce damage to an enemy, front first
   * - **Back Row Bonus:** If currently in back row, try moving to front row first. If move completed, add WIL mod to damage formula before × skill mod and get +2 dodge for 1 turn
   * - **Requirement:** Must be barehand
   * 
   * **Consume:** 3 SP, 1 wind
   * **Produce:** 1 water
   */
  MistPierce = "MistPierce",

  // ---------------
  // Absorber
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Gain planar absorption to convert incoming magic into resources.
   * - **Effect:** Gain Planar Absorption buff for 2d3 stacks + INT mod + (0.01 × skill level)
   * - **Absorption:** If attacked by a magic spell, absorb damage up to the stacks of Planar Absorption buff
   * - **Resource Conversion:** Every 4 damage of each type that is absorbed is turned into 1 neutral resource
   * 
   * **Consume:** 3 MP 2 water
   * **Produce:** 1 neutral
   */
  PlanarAbsorption = "PlanarAbsorption",

  /**
   * **Tier:** Uncommon
   * 
   * Borrow momentum from your enemy to enhance your own speed.
   * - **Damage:** 1d6 + DEX mod × skill level modifier blunt damage (or palm strike damage) to an enemy
   * - **AB Gauge Manipulation:** If enemy has ≤50 AB gauge, gain +15 AB gauge. Else, decrease enemy AB gauge by 15
   * - **Requirement:** Must be barehand
   * 
   * **Consume:** 3 SP, 1 wind 1 water
   * **Produce:** 1 neutral
   */
  BorrowedMomentum = "BorrowedMomentum",

  // ---------------
  // Mind
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Cast a veil on one frontline ally, making them harder to target or hit. (+ 1 dodge roll for 1 turn)
   * - **Effect:** Minor concealment/dodge/accuracy debuff to enemies targeting the veiled ally
   * - **Role:** Soft-support defensive buff
   * - **Target:** One frontline ally
   * 
   * **Consume:** 2 MP
   * **Produce:** 1 neutral
   */
  InnerVeil = "InnerVeil",
}

export enum RogueSkillId {
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Throw knives at multiple targets.
   * - **Targets:** Throw knives at 2 targets (4 targets at level 5)
   * - **Damage per Knife:** 1d4 + DEX mod × skill level multiplier pierce damage
   * - **Note:** Targets can be repeated (random selection)
   * - **Range:** Any range
   * 
   * **Consume:** 2 SP
   * **Produce:** 1 neutral
   */
  ThrowingKnives = "ThrowingKnives",

  // ---------------
  // Stealth
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Attempt to hide from enemies.
   * - **Save:** Roll d20 + DEX mod vs DC10 + (highest enemy INT mod) + (row === 'front' ? 5 : 0) (DC8 + front row penalty 3 at level 5)
   * - **Effect:** If passed, gain Hiding buff for 1 turns
   * 
   * **Consume:** 3 SP, 2 neutral
   * **Produce:** 1 chaos
   */
  Hiding = "Hiding",

  /**
   * **Tier:** Uncommon
   * 
   * Strike from stealth for devastating damage.
   * - **Requirement:** Must have Hiding buff active
   * - **Damage:** Deal weapon damage + DEX mod × skill level multiplier slash damage
   * - **Bonus:** +50% damage when used from Hiding
   * 
   * **Consume:** 3 SP,
   * **Produce:** 1 chaos
   */
  Backstab = "Backstab",

  // ---------------
  // Melee
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Slash with a cut that causes bleeding.
   * - **Damage:** Weapon damage + DEX mod × skill level multiplier slash damage
   * - **Save:** Target must roll DC10 (DC12 at level 5) END save or get 1d3 bleed stacks
   * - **Bleed Debuff:** Takes 1d3 damage per turn for 3 turns
   * - **Requirement:** Requires sword, dagger, or blade
   * 
   * **Consume:** 3 SP, 2 neutral
   * **Produce:** 1 wind
   */
  BleedingCut = "BleedingCut",

  /**
   * **Tier:** Common
   * 
   * Slice to cripple the enemy's movement.
   * - **Damage:** Weapon damage + DEX mod × skill level multiplier slash damage
   * - **Save:** Target must roll DC10 END save or lose 10 AB gauge
   * - **Requirement:** Requires sword, dagger, or blade
   * 
   * **Consume:** 2 SP 2 neutral
   * **Produce:** 1 wind
   */
  CrippingSlice = "CrippingSlice",

  /**
   * **Tier:** Uncommon
   * 
   * Strike when the enemy is vulnerable.
   * - **Damage:** Weapon damage
   * - **Speed Bonus:** If target is slower than you, deal additional 1d4 + DEX mod damage
   * - **Level 5:** Gain +15 AB gauge
   * - **Requirement:** Requires sword, dagger, or blade
   * 
   * **Consume:** 3 SP, 2 wind
   * **Produce:** 1 neutral
   */
  OpportunistStrike = "OpportunistStrike",

  // ---------------
  // Range
  // ---------------
  /**
   * **Tier:** Common
   * Dash away while attacking, repositioning yourself.
   * - **Movement:** Change position (front ↔ back)
   * - **Effect:** Gain retreat buff, for 1 turn
   * 
   * **Consume:** 2 SP, 1 neutral
   * **Produce:** 1 wind
   */
  RetreatDash = "RetreatDash",

  /**
   * **Tier:** Common
   * 
   * Pin an enemy with a precise shot.
   * - **Damage:** 1d6 + DEX mod pierce damage to a target
   * - **Save:** Target must roll DC10 END save
   * - **On Fail:** Target loses 10 AB gauge (15 at level 5)
   * - **Requirement:** Requires ranged weapon (any range)
   * 
   * **Consume:** 2 SP 1 neutral
   * **Produce:** 1 wind
   */
  PinningShot = "PinningShot",

  /**
   * **Tier:** Uncommon
   * 
   * Split your shot to hit multiple targets.
   * - **Primary Target:** Deal 1d6 + DEX mod pierce damage
   * - **Second Target:** Select a second random enemy, deal half damage (rounded down)
   * - **Bleed Bonus:** If the primary target is bleeding, second hit deals full damage instead
   * - **Requirement:** Requires ranged weapon or throwing knives (any range)
   * 
   * **Consume:** 3 SP, 2 wind
   * **Produce:** 1 neutral
   */
  SplitTrajectory = "SplitTrajectory",
}

export enum SpellbladeSkillId {
  /**
   * ## Edge Charge System
   * Edge Charge is a buff that can stack up to 5 times, no limit on duration.
   * - Scales damage of Planar Edge and "Planar Edge-like damage" skills
   * - Gained from: ChargeSurge, SpellParry (when hit by spell)
   * - Consumed by: EdgeBurst
   */

  /**
   * **Tier:** Common (Cantrip)
   * 
   * Strike with planar energy, the core spellblade technique.
   * - **Damage:** Arcane damage, melee (see position modifier)
   *   - **With Weapon:** Weapon's physical damage dice + planar mod
   *   - **No Weapon:** Damage dice (1d6, 1d6, 1d8, 1d8, 2d4 for levels 1-5) + planar mod
   * - **Effect:** Gain 1 Edge Charge stack (max 5 stacks)
   * - **Note:** Damage dice scales with skill level, but damage does not get skill level multiplier. Other skills with "Planar Edge-like damage" benefit from your Planar Edge skill level by using the same dice.
   * - **Requirement:** Must equip sword, blade, dagger, or barehand (no weapon)
   * 
   * **Consume:** 2 SP
   * **Produce:** 1 neutral
   */
  PlanarEdge = "PlanarEdge",

  // ------------
  // Swift blade
  // ------------
  /**
   * **Tier:** Uncommon
   * 
   * Slash with wind-infused planar energy.
   * - **Damage:** (Planar Edge-like damage) × skill level multiplier wind damage
   * - **Save:** Target rolls DC8 + (user planar mod) END save or gets Bleed debuff for 1d2 turns
   * - **Range:** Any range
   * 
   * **Consume:** 3 SP, 1 wind
   * **Produce:** 1 neutral
   */
  WindSlash = "WindSlash",

  /**
   * **Tier:** Uncommon
   * 
   * Rush forward with gale force.
   * - **Damage:** (Planar Edge-like damage) × skill level multiplier wind damage
   * - **AB Gauge:** If wind resource exists, after use, gain +5 AB gauge (+10 at level 5)
   * - **Range:** Melee, front first
   * 
   * **Consume:** 3 SP, 1 neutral
   * **Produce:** 1 wind
   */
  GaleRush = "GaleRush",

  // --------------
  // Mage Hunter
  // --------------
  /**
   * **Tier:** Rare
   * 
   * Parry spells with planar expertise.
   * - **Effect:** Gain Spell Parry buff for 1 turn
   * - **Spell Parry:** Reduce next spell's damage by (5 + INT mod)
   * - **Charge Gain:** If attacked by a spell, gain 1 Edge Charge (2 if 0 damage taken)
   * - **Level 5:** Also gain 1 Edge Charge when used
   * 
   * **Consume:** 4 SP, 1 wind
   * **Produce:** 1 chaos
   */
  SpellParry = "SpellParry",

  /**
   * **Tier:** Rare
   * 
   * Siphon planar energy and mana from enemy casters.
   * - **Damage:** Weapon damage + planar mod × skill level multiplier arcane damage
   * - **MP Damage:** Additionally, deal MP damage equal to (1d4 + INT mod + enemy planar mod / 2) × skill level multiplier arcane damage
   * - **Caster Bonus:** If enemy's max MP > your max MP, deal additional 1d6 MP damage (targets casters who typically have higher max MP)
   * 
   * **Consume:** 5 SP, 2 chaos
   * **Produce:** 1 neutral
   */
  PlanarSiphon = "PlanarSiphon",

  // ---------------
  // Edge Charge
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Surge with edge charges, building up power.
   * - **Effect:** Gain 1 Edge Charge (2 at level 5)
   * - **Buff:** Also gain ChargeSurge buff for 3 turns, each turn gain +1 Edge Charge
   * - **Cooldown:** 3 turns
   * 
   * **Consume:** 3 SP 2 wind
   * **Produce:** 1 fire
   */
  ChargeSurge = "ChargeSurge",

  /**
   * **Tier:** Rare
   * 
   * Unleash all stored edge charges in a devastating burst.
   * - **Effect:** Consume ALL Edge Charges (min 1)
   * - **Damage:** Weapon damage (or same as Planar Edge) + Planar mod + (1d2 per Edge Charge stack) × skill level multiplier arcane damage
   * - **Requirement:** Must equip sword, blade, dagger, or barehand (no weapon)
   * - **Range:** Close range, melee (see position modifier)
   * 
   * **Consume:** 5 SP, 1 wind 1 fire
   * **Produce:** 0
   */
  EdgeBurst = "EdgeBurst",
}

export enum ShamanSkillId {
  /**
   * ## Ward System
   * Ward: Reduce incoming damage by (3 + WIL mod / 2) per attack, up to 5 stacks per turn
   */

  /**
   * **Tier:** Common (Cantrip)
   * 
   * Mend the spirit of an injured ally.
   * - **Healing:** Heal a random injured ally for (1d4 + WIL mod) × skill level multiplier HP
   * - **Chaos Roll:** Roll d20: if 11+, healing is halved and target gains +1 chaos instead
   * - **Cooldown:** 3 turns
   * 
   * **Consume:** 2 MP
   * **Produce:** 1 chaos
   */
  MendSpirit = "MendSpirit",

  // ---------------
  // Curse
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Mark an enemy with a hex sigil, making them vulnerable to curse effects.
   * - **Effect:** Apply HexMark debuff to target for 2 turns (3 turns at level 5)
   * - **HexMark:** While marked, target takes +1d3 extra chaos damage from all sources
   * - **Curse Amplification:** If target already has Hexed or Cursed debuff when marked, deal 1d4 + planar mod chaos damage and extend those debuffs by 1 turn
   * - **Level 5:** When any curse debuff is applied to a marked target, deal additional 1d2 chaos damage
   * 
   * **Consume:** 3 MP, 1 chaos
   * **Produce:** 1 neutral
   */
  HexMark = "HexMark",

  /**
   * **Tier:** Uncommon
   * 
   * Hex an enemy with rot, weakening them over time.
   * - **Damage:** 1d4 + planar mod + 0.5 × skill level chaos damage to a target
   * - **Save:** Target must roll DC10 + CONTROL mod WIL save or get Hexed debuff for 2 turns
   * - **Hexed Debuff:** Reduces endurance by 2 and deals 1d2 damage per turn
   * 
   * **Consume:** 3 MP, 1 chaos
   * **Produce:** 1 neutral
   */
  HexOfRot = "HexOfRot",
  
  // ---------------
  // Blessing
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Rattle spirits to heal your allies.
   * - **Target:** Grant 1 + 1d(skillLevel) random allies SpiritRattle buff
   * - **Duration:** (1 + floor(skillLevel × 0.5)) turns (capped at skillLevel)
   * - **SpiritRattle Buff:** Heals for 1d4 + WIL mod at the start of each turn
   * 
   * **Consume:** 2 MP, 1 neutral
   * **Produce:** 1 order
   */
  HolyRattle = "SpiritRattle",

  /**
   * **Tier:** Uncommon
   * 
   * Cleanse an ally with blessing energy.
   * - **Target:** 1 random ally with debuffs (2 at level 5)
   * - **Cleanse:** Remove 1 random debuff from target (2 debuffs at level 5)
   * - **Healing:** If debuff removed, heal target for 1d4 + WIL mod HP
   * - **Fallback:** If no debuffs to remove, grant Bless buff for 1 turn instead
   * 
   * **Consume:** 3 MP, 2 neutral
   * **Produce:** 1 order
   */
  CleansingBlessing = "CleansingBlessing",

  /**
   * **Tier:** Common (Cantrip)
   * 
   * Ward allies with protective spirits.
   * - **Target:** 1d2 allies (1d3 at level 5)
   * - **Effect:** Grant Ward of Protection buff for 2 turns
   * - **Ward of Protection:** Reduce incoming damage by (3 + WIL mod / 2) per attack, up to 5 stacks per turn
   * 
   * **Consume:** 2 MP, 1 neutral
   * **Produce:** 1 order
   */
  WardOfProtection = "WardOfProtection",

  // ---------------
  // Harmony
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Harmonize the opposing forces of Order and Chaos.
   * 
    * - **Balancing:**  
    *   If you have both Order and Chaos, reduce the higher one until they are equal.
    *   - Example: Order 3, Chaos 1 → Order 2, Chaos 2
    *   - Example: Order 5, Chaos 0 → Order 3, Chaos 2
    * 
    * - **Damage:**  
    *   Deal damage based on the amount balanced:
    *   - Deal 1d6 damage of the *converted type*  
    *   - Gain +1 damage per resource shifted
    * 
    * - **Perfect Balance:**  
    *   If Order and Chaos are equal and greater than 0:
    *   - Deal 1d4 Order damage **and** 1d4 Chaos damage
    *   - Gain +1 damage per Order and Chaos resource
    * 
    * - **Fallback:**  
    *   If you have no Order and no Chaos:
    *   - Deal 1d6 neutral damage
    * 
    * 
    * **Consume:** 2 MP  
    * **Produce:** 0-1 chaos, 0-1 order
   */
  Harmonization = "Harmonization",

  /**
   * **Tier:** Uncommon
   * 
   * Strike with dual nature, balancing attack and healing.
   * - **Damage:** Deal (1d6 + planar mod) × skill level multiplier damage to one enemy
   * - **Order Dominance:** If you have Order more than Chaos, heal random ally equal to skill level
   * - **Chaos Dominance:** If you have Chaos more than Order, deal additional damage equal to skill level
   * - **The damage type will follow the dominant resource, if both are equal, deal arcane damage
   * - **Balance:** If your Order and Chaos are equal and > 0, both effects apply
   * 
   * **Consume:** 3 MP, 1 order, 1 chaos
   * **Produce:** 0-1 order, 0-1 chaos
   */
  DualNature = "DualNature",

  /**
   * **Tier:** Uncommon
   * 
   * Channel chaotic blessing with unpredictable results.
   * - **Effect:** 50% chance to deal (1d8 at level 5, else 1d6) + ((WIL mod + Planar mod) / 2) × skill level multiplier chaos damage to all enemies, or heal all allies for the same amount
   * - **Level 5:** Healed allies roll DC10 WIL save, if passed gain +1 chaos
   * - **Level 5:** Damaged enemies roll DC10 WIL save, if failed lose 1 random resource
   * 
   * **Consume:** 4 MP, 1 chaos, 1 order
   * **Produce:** 0-2 neutral (random)
   */
  ChaoticBlessing = "ChaoticBlessing",
}

export enum BarbarianSkillId {
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Enter a state of Rage, gaining combat bonuses.
   * - **Effect:** Gain Rage buff for 3 turns (4 turns at level 5)
   * - **Rage Buff:** +2 pATK, -2 pDEF, -2 mDEF
   * 
   * **Consume:** 3 SP
   * **Produce:** 1 fire
   */
  Rage = "Rage",

  // ---------------
  // BERSERKER
  // ---------------
  /**
   * **Tier:** Uncommon (Chain)
   * 
   * Swing your weapon recklessly, attacking multiple times.
   * - **Hits:** 2 hits (3 hits at level 5)
   * - **Damage per Hit:** (0.7 × weapon damage + STR mod) × (1 + 0.1 × skill level) × position modifier
   * - **Hit Penalty:** -2 hit roll (removed at level 5)
   * - **Requirement:** Must have sword, axe, blade, hammer, spear, or barehand equipped
   * 
   * **Consume:** 4 SP, 1 fire
   * **Produce:** 1 neutral
   */
  RecklessSwing = "RecklessSwing",

  /**
   * **Tier:** Uncommon
   * 
   * Strike with blood-fueled frenzy, dealing increased damage when wounded.
   * - **Damage:** Weapon damage + STR mod × skill level multiplier
   * - **Low HP Bonus:** If HP ≤ 20% (40% at level 5), damage +25%
   * - **On Kill:** Extend Rage duration by 1 turn
   * 
   * **Consume:** 4 SP, 2 fire
   * **Produce:** 1 neutral
   */
  BloodFrenzy = "BloodFrenzy",

  // ---------------
  // BRUTE
  // ---------------
  /**
   * **Tier:** Uncommon (Standalone)
   * 
   * Slam the ground with your weapon, creating a shockwave that damages all enemies in the front row.
   * - **Damage:** 1d8 + STR mod (1d10 + STR mod at level 5) blunt damage to each target
   * - **Save:** Each enemy rolls DC10 (DC12 at level 5) END save or gains Dazed debuff for 1 turn
   * - **Requirement:** Must have sword, axe, blade, hammer, spear, or barehand equipped
   * 
   * **Consume:** 5 SP, 2 fire
   * **Produce:** 1 earth
   */
  Earthshatter = "Earthshatter",

  /**
   * **Tier:** Uncommon
   * 
   * Attack one enemy with a powerful ground slam, affecting adjacent enemies.
   * - **Damage:** 1d6 + STR mod × skill level multiplier blunt damage
   * - **Target Save:** Target rolls DC10 + STR mod END save or gains Dazed debuff for 1 turn
   * - **Splash Damage:** Adjacent enemies take 50% damage (75% at level 5) and roll DC5 END save or gain Dazed debuff for 1 turn
   * 
   * **Consume:** 4 SP, 2 earth
   * **Produce:** 1 neutral
   */
  GroundSlam = "GroundSlam",

  // ---------------
  // Survivalist
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Gain defensive resilience through battle experience.
   * - **Effect:** Gain Battle Hardened buff for 3 turns: +2 pDEF
   * - **Rage Extension:** When attacked during Battle Hardened, Rage duration is extended by 1 turn
   * - **Level 5 Bonus:** Also heal for 1d4 + END mod HP
   * - **Cooldown:** 3 turns
   * 
   * **Consume:** 3 SP, 1 earth, 1 neutral
   * **Produce:** 1 neutral
   */
  BattleHardened = "BattleHardened",
}

export enum WarriorSkillId {
  /**
   * **Tier:** Common
   * 
   * Swing your weapon in a wide arc, cutting through all enemies in the front row.
   * - **Damage:** 1.0× weapon damage (1.2× at level 5) + STR mod × position modifier
   * - **Target:** All enemies in front row
   * - **Requirement:** Must have sword, axe, or blade equipped
   * 
   * **Consume:** 2 neutral
   * **Produce:** 1 wind
   */
  Cleave = "Cleave",

  /**
   * **Tier:** Common
   * 
   * Channel all your strength into a single devastating strike.
   * - **Damage:** 1.3× weapon damage (1.5× at level 5) + STR mod × position modifier
   * 
   * **Consume:** 2 neutral
   * **Produce:** 1 fire
   */
  PowerStrike = "PowerStrike",

  /**
   * **Tier:** Uncommon
   * 
   * Let out a mighty battle cry that inspires you and your allies to fight harder.
   * - **Target:** Self + allies (number of allies = CHA mod)
   * - **Effect:** Affected targets gain WarCry buff for (LEAD mod) turns
   * - **WarCry Buff:** +2 AGI, +2 STR;
   * - **Self must not have WarCry buff to use this skill**
   * 
   * **Consume:** 3 SP, 2 fire
   * **Produce:** 1 neutral
   */
  WarCry = "WarCry",

  // ---------------
  // Weapon Master
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Adapt your attack to your weapon's nature, dealing special effect.
   * - **Damage:** Weapon Physical damage: 
   * - **Damage Type:** Weapon Physical damage type
   * - **Special Effect:** Slash: DC 8 end save or bleed / Blunt: reduce target AB gauge by 10 / Pierce: negate 2 pDef (implement by reduce it before attack and give it back after attack?)
   * 
   * **Produce:** 1 neutral
   */
  WeaponAdaptation = "WeaponAdaptation",

  /**
   * **Tier:** Uncommon
   * 
   * Strike with adaptive technique, exploiting every aspect of your weapon.
   * 
   * - **Damage:** Weapon damage + (STR mod or DEX mod, whichever is higher) × skill level multiplier
   * - **Additional Effect (based on weapon damage type):**
   *   - **Slash:** Apply Bleed (DC8 END save negates DC 10 at level 5)
   *   - **Blunt:** Reduce target AB gauge by 10 (15 at level 5)
   *   - **Pierce:** Ignore 2 pDEF during this attack (Ignore 4 pDEF at level 5)
   * 
   * - **Versatility Bonus:**  
   *   trigger **one additional effect** from another damage type (random, excluding the base one).
   * 
   * **Consume:** 3 SP, 2 neutral  
   * **Produce:** 1 fire
   */
  VersatileStrike = "VersatileStrike",

  // ---------------
  // Battlefield Control
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Dominate the battlefield with overwhelming presence, slowing enemies.
   * - **Damage:** (0.8× weapon damage (0.9× at level 5)) × skill level multiplier to all enemies in front row
   * - **Save:** Each enemy rolls DC10 + STR mod END save or get -10 AB gauge (15 at level 5)
   * 
   * **Consume:** 4 SP, 2 neutral
   * **Produce:** 1 earth
   */
  BattlefieldDominance = "BattlefieldDominance",

  /**
   * **Tier:** Common
   * 
   * Strike while manipulating enemy positioning.
   * - **Damage:** Weapon damage × skill level multiplier
   * - **Front Row Push:** If target is in front row and you're in front row, push target to back row (if slot available) and deal +1d4 damage
   * - **Back Row Pull:** If target is in back row, pull target to front row (if slot available) and deal +1d4 damage
   * 
   * **Consume:** 3 SP, 1 earth
   * **Produce:** 1 fire
   */
  PositioningStrike = "PositioningStrike",

  // ---------------
  // Champion (1v1)
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Challenge an enemy to single combat, exposing their weaknesses.
   * - **Damage:** Weapon damage × skill level multiplier
   * - **Must not have Challenger buff to use this skill**
   * - **Effect:** Mark target with Challenged debuff and self with Challenger buff for 3 turns
   * - **During target selection, the character with Challenged debuff or Challenger buff, if target one target, must look for the other side first, bypass taunt.
   * - **Challenger buff:** +2 hit roll, +2 crit chance against Challenged target
   * 
   * **Consume:** 3 SP, 2 neutral
   * **Produce:** 1 fire
   */
  ChallengeStrike = "ChallengeStrike",

  /**
   * **Tier:** Rare
   * 
   * Deliver a devastating finishing strike that exploits enemy weaknesses.
   * Must have Challenger buff to use this skill
   * - **Damage:** 1.5× weapon damage + STR mod × skill level multiplier
   * - **Challenged Bonus:** If target has Challenged debuff and self has Challenger buff, deal additional +50% damage (+75% at level 5) and remove Challenged debuff along with self Challenger buff
   * 
   * **Consume:** 5 SP, 2 fire
   * **Produce:** 1 earth
   */
  FinishingBlow = "FinishingBlow",
}

export enum KnightSkillId {
  /**
   * **Tier:** Uncommon
   * 
   * Execute a precise thrust with your sword or spear.
   * - **Damage:** Weapon damage + STR mod × skill level multiplier × position modifier pierce damage
   * - **Hit Bonus:** +3 hit roll
   * - **Debuff Bonus:** If enemy has any debuff, crit chance +2 (+4 at level 5)
   * - **Requirement:** Must have sword or spear equipped
   * - **Target:** One enemy, front first
   * 
   * **Consume:** 3 SP, 2 fire
   * **Produce:** 1 earth
   */
  PrecisionThrust = "PrecisionThrust",


  // ---------------
  // Commander (Team Buff)
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Issue a tactical command that hastens your allies.
   * - **Target:** 1d2 + LEAD mod allies
   * - **Effect:** Grant Haste buff for 2 turns (3 at level 5)
   * - **Level 5:** Also grant +5 AB gauge immediately
   * 
   * **Consume:** 4 SP, 2 neutral
   * **Produce:** 1 fire
   */
  TacticalCommand = "TacticalCommand",

  /**
   * **Tier:** Rare
   * 
   * Form your allies into a defensive battle formation.
   * - **Effect:** All allies gain +2 pDEF and +2 mDEF for 3 turns (4 at level 5)
   * - **Bonus:** All allies gain +1 to all saving throws while active
   * 
   * **Consume:** 5 SP, 2 neutral
   * **Produce:** 1 earth
   */
  BattleFormation = "BattleFormation",

  // ---------------
  // Order (Charging/Advancing)
  // ---------------

  /**
   * **Tier:** Rare
   * 
   * Channel planar force into disciplined movement, advancing with relentless pace.
   * - **Effect:** Gain AdvancingPace buff for 3 turns (4 at level 5) (must not already have it)
   * - **AdvancingPace Buff:**
   *   - AB gauge increases with +1d4 per turn
   *   - +2 STR
   *   - -1 pDEF, -1 mDEF (overextending to maintain pace)
   * - Gain +5 AB gauge immediately (10 at level 5)
   * 
   * **Consume:** 4 SP, 3 MP, 3 neutral
   * **Produce:** 1 fire
   */
  AdvancingPace = "AdvancingPace",

  /**
   * **Tier:** Uncommon
   * 
   * Charge relentlessly forward, striking with momentum.
   * - **Damage:** Weapon damage × skill level multiplier
   * - **Movement:** Must move to front row if not already there
   * - **AdvancingPace Bonus:** If you have AdvancingPace buff, deal +1d4 damage (+1d6 at level 5) and gain +10 AB gauge
   * 
   * **Consume:** 3 SP, 1 fire
   * **Produce:** 1 earth
   */
  RelentlessCharge = "RelentlessCharge",

  /**
   * **Tier:** Uncommon
   * 
   * Advance with discipline, maintaining formation while attacking.
   * - **Movement:** Move to front row (if available)
   * - **Damage:** Deal weapon damage × skill level multiplier
   * - **AdvancingPace Bonus:** If you have AdvancingPace buff, get defense up bonus for 1 turn
   * 
   * **Consume:** 4 SP, 1 earth
   * **Produce:** 0-1 fire
   */
  DisciplinedAdvance = "DisciplinedAdvance",

  // ---------------
  // Oathbound (Shield, Conditional)
  // ---------------
  /**
   * **Tier:** Common
   * 
   * Strike while maintaining your shield defense.
   * - **Damage:** Shield damage × skill level multiplier
   * - **DefenseUp Bonus:** If you have DefenseUp buff, deal +25% damage and gain +5 AB gauge
   * - **Level 5:** Also gain DefenseUp buff for 1 turn if you don't already have it
   * - **Requirement:** Must equip shield
   * 
   * **Consume:** 2 SP, 1 neutral
   * **Produce:** 1 earth
   */
  ShieldedStrike = "ShieldedStrike",

  /**
   * **Tier:** Common
   * 
   * Bash your enemy with your shield, has chance to stun them for 1 turn
   * - **Target:** 1 enemy, front first
   * - **Damage:** Shield damage × skill level multiplier
   * - **Save:** Target must roll DC7 + STR mod END save or become Stunned for 1 turn
   * - **DefenseUp Bonus:** If you have DefenseUp buff, DC became 10 + STR mod
   * - **Requirement:** Must equip shield
   * 
   * **Consume:** 3 SP, 1 earth
   * **Produce:** 1 fire
   */
  ShieldBash = "ShieldBash",
}

export enum GuardianSkillId {
  // ---------------
  // Bulwark (Pure Tank)
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Raise your shield high, forming an impenetrable barrier.
   * - **Effect:** Gain DefenseUp buff for 3 turns (4 at level 5)
   * - **Must not already have DefenseUp buff to use this skill**
   * 
   * **Consume:** 2 SP
   * **Produce:** 1 earth
   */
  ShieldUp = "ShieldUp",
  
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Strike a heroic pose, channeling your inner strength.
   * - **Save:** Roll DC(15 - skill level) (DC(10 - skill level) at level 5)
   * - **On Success:** Restore VIT mod + skill level HP
   * - The higher your skill, the easier it becomes to inspire yourself.
   * - **On fail OR when HP is full:** Do basic Attack.
   * **Consume:** 2 SP
   * **Produce:** 1 neutral
   */
  HerosPose = "HerosPose",

  /**
   * **Tier:** Uncommon
   * 
   * Enter an unbreakable fortress stance.
   * - **Effect:** Gain Fortress Stance buff for 3 turns (4 at level 5)
   * - **Fortress Stance Buff:** Gain +3 pDEF and +2 mDEF, -3 pATK - 3 mATK
   * - **During Fortress Stance, your turn is SKIPPED, but health is restored every turn for 1d6 + VIT mod HP
   * - **Must not already have Fortress Stance buff to use this skill**
   * 
   * **Consume:** 4 SP, 1 earth
   * **Produce:** 1 neutral
   */
  FortressStance = "FortressStance",

  // ---------------
  // Sentinel (Taunt, Bash)
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Roar defiantly and draw all enemy attention to yourself.
   * - **Effect:** Gain Taunt buff for 2 + floor(0.5 × skill level) + floor(CHA mod / 2) turns
   * - **When attacked while Taunt is active, gain +1 fire resource
   * - **Can't be used while Taunt buff is active**
   * 
   * **Consume:** 2 SP
   * **Produce:** 1 earth
   */
  Taunt = "Taunt",

  /**
   * **Tier:** Common
   * 
   * Slam your weapon with overwhelming force, crushing your enemy's defenses.
   * - **Damage:** Weapon damage × position modifier
   * - **Save:** Target must roll DC8 + STR mod END save or become Stunned for 1 turn
   * 
   * **Consume:** 3 SP, 1 fire
   * **Produce:** 1 neutral
   */
  Bash = "Bash",

  /**
   * **Tier:** Uncommon
   * 
   * Fulfill your sentinel duty, attacking while drawing enemy attention.
   * - **Damage:** Weapon damage × skill level multiplier
   * - **Effect:** Apply Taunt buff to self for 1 turn if not existed.
   * - **If Taunt is already active, gain 1 turn of defense up buff.
   * - **Save:** Target must roll DC10 + STR mod END save or gain Dazed debuff for 1 turn
   * 
   * **Consume:** 3 SP, 2 earth
   * **Produce:** 1 neutral
   */
  SentinelDuty = "SentinelDuty",

  // ---------------
  // Bastion (Protection)
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Stand guard over an ally, protecting them from harm.
   * - **Target:** 1 random ally (2 at level 5)
   * - **If the ally became a target of getTarget with one() method, change the target to you.`
   * - **When you change target to yours, gain +1 earth resource
   * - **After one triggered, remove the buff
   * (This means we need to add buff to 2 characters, one is the user and one is the target, when target get picked, just check if he has the buff or not, if yes, check in the party for another character who have the other buff, and pick another target instead)
   * (Guarded and Guardian buffs)
   * **Consume:** 3 SP, 1 neutral
   * **Produce:** 1 earth
   */
  Guardian = "Guardian",
}

export enum PaladinSkillId {
  // ---------------
  // Aegis (Protection)
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Activate a powerful shield of holy energy that mitigates incoming damage.
   * - **Effect:** Gain Aegis Shield buff for 3 stacks (4 stacks at level 5) (must not already have it)
   * - **Aegis Shield Buff:** Each stack can mitigate 5 + WIL mod points of incoming damage
   *   - Example: Taking 5 damage with 0 WIL mod: mitigates 5 damage, decreases 1 stack
   *   - Taking 7 damage: mitigates 7 damage, decreases 2 stacks
   * - **On Depletion:** When Aegis Shield is depleted, gain Aegis Pulse buff for 1 turn
   * 
   * **Consume:** 4 SP, 3 order
   * **Produce:** 1 neutral
   */
  AegisShield = "AegisShield",

  /**
   * **Tier:** Uncommon
   * 
   * Emit a wave of holy light from your depleted shield.
   * - **Requirement:** Must have Aegis Pulse buff (removed after use)
   * - **Healing:** All allies heal for (1d4 + WIL mod) × skill level multiplier HP
   * - **Damage:** All enemies take (1d4 + WIL mod) × skill level multiplier holy damage
   * 
   * **Consume:** 0 (removes Aegis Pulse buff)
   * **Produce:** 0
   */
  AegisPulse = "AegisPulse",


  // ---------------
  // Retribution (Damaging)
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Strike with a melee attack blessed with holy energy.
   * - **Damage:** (1.2× weapon damage + STR mod + WIL mod) × skill level multiplier × position modifier holy damage
   * - **Undead/Fiend Bonus:** If enemy is undead or fiend, deal additional 1d6 holy damage (1d10 at level 5)
   * - **Requirement:** Must have any weapon but not bow, orb, wand, book
   * - **Target:** One enemy, front first, melee
   * 
   * **Consume:** 3 SP, 2 order
   * **Produce:** 1 neutral
   */
  DivineStrike = "DivineStrike",

  /**
   * **Tier:** Uncommon
   * 
   * Deliver righteous retribution against those who have harmed your allies.
   * - **Damage:** (1.3× weapon damage + STR mod + WIL mod) × skill level multiplier holy damage
   * - **Retribution Bonus:** If enemy has dealt damage to any ally in the last 2 turns, deal +50% damage (+75% at level 5)
   * - **Undead/Fiend Bonus:** If enemy is undead or fiend, deal additional +1d6 holy damage
   * 
   * **Consume:** 3 SP, 2 order
   * **Produce:** 1 neutral
   */
  RighteousSmite = "RighteousSmite",

  /**
   * **Tier:** Rare
   * 
   * Unleash divine wrath upon your enemies.
   * - **Damage:** (1d8 + STR mod + WIL mod) × skill level multiplier holy damage to all enemies in front row
   * - **Undead/Fiend Bonus:** Enemies who are undead or fiend take +1d6 additional damage
   * - **Save:** Enemies must roll DC10 + WIL mod WIL save or gain Exposed debuff for 2 turns
   * 
   * **Consume:** 5 SP, 3 order
   * **Produce:** 1 neutral
   */
  DivineWrath = "DivineWrath",

  // ---------------
  // Leadership (Team Buff - Different from Knight)
  // ---------------
  /**
   * **Tier:** Common
   * 
   * Rally your allies with an inspiring cry.
   * - **Effect:** All allies gain your CHA Mod * Skill level multiplier HP MP and SP restored, + CHA mod AB gauge. Except you.
   * 
   * **Consume:** 4 SP, 1 order
   * **Produce:** 1 neutral
   */
  RallyingCry = "RallyingCry",

  /**
   * **Tier:** Uncommon
   * 
   * Project an inspiring presence that bolsters your allies.
   * - **Effect:** Give Inspired buff to all allies for 2 turns (3 turns at level 5) (Except you)
   * - **Inspired:** Gain +1 to all saving throws + At the start of each turn, restore 1d3 HP every turns
   * 
   * **Consume:** 5 SP, 2 neutral
   * **Produce:** 1 order
   */
  InspiringPresence = "InspiringPresence",
}

export enum DruidSkillId {
  // ---------------
  // Nature's Wrath
  // ---------------
  /**
   * **Tier:** Common (Fallback)
   * 
   * Whip a target with thorny vines, dealing nature damage.
   * - **Damage:** 1d6 + WIL mod × skill level multiplier nature damage
   * - **Save:** Target rolls DC6 END save or becomes Entangled for 1 turn
   * - **Entangled Debuff:** When taking turns, must roll DC10 STR save or skip the turn
   * 
   * **Consume:** 3 MP
   * **Produce:** 1 earth
   */
  VineWhip = "VineWhip",

  /**
   * **Tier:** Uncommon
   * 
   * Release a burst of thorns that cuts through the enemy front line.
   * - **Damage:** 1d6 + WIL mod × skill level multiplier nature damage to all enemies in front row
   * - **Save:** Enemies must roll DC10 + WIL mod END save or gain Bleed debuff for 2 turns (1d3 damage per turn)
   * - **Level 5:** Also apply Slow debuff for 1 turn to enemies who fail save
   * 
   * **Consume:** 3 MP, 1 earth
   * **Produce:** 1 water
   */
  ThornBurst = "ThornBurst",

  /**
   * **Tier:** Rare
   * 
   * Grasp a target with nature's powerful vines.
   * - **Damage:** 1d8 + WIL mod × skill level multiplier nature damage
   * - **Save:** Target must roll DC10 + WIL mod END save or become Entangled for 2 turns (3 turns at level 5)
   * - **Entangled Bonus:** If target is already Entangled, deal +50% damage
   * 
   * **Consume:** 4 MP, 1 earth 1 water
   * **Produce:** 1 neutral
   */
  NaturesGrasp = "NaturesGrasp",

  // ---------------
  // Growth (Healing/Support)
  // ---------------
  /**
   * **Tier:** Rare
   * 
   * Release a gentle natural mist that rejuvenates your party.
   * - **Effect:** All allies gain Regen buff for 2 turns (3 turns at level 5)
   * - **Immediate Effect:** Restore 1d3 + Will mod * skill level multiplier HP to all allies except you
   * - **Regen Buff:** Restore (1d4 + WIL mod) HP at the start of each turn
   * 
   * **Consume:** 4 MP, 1 earth 1 water
   * **Produce:** 1 neutral
   */
  RejuvenatingMist = "RejuvenatingMist",

  /**
   * **Tier:** Uncommon
   * 
   * Nurture an ally with blooming life force.
   * - **Target:** 1 random injured ally (2 at level 5)
   * - **Healing:** Restore (2d4 + WIL mod) × skill level multiplier HP
   * - **Regen:** Grant Regen buff for 2 turns: restore 1d4 + WIL mod HP at the start of each turn
   * - **Level 5:** Also remove 1 random debuff from target
   * 
   * **Consume:** 3 MP, 2 neutral
   * **Produce:** 1 earth
   */
  NurturingBloom = "NurturingBloom",

  /**
   * **Tier:** Common (Cantrip)
   * 
   * Grant natural resilience to an ally.
   * - **Target:** 1 random ally (2 at level 5)
   * - **Effect:** Grant Bless buff for 2 turns (3 turns at level 5)
   * - **Bonus:** Target gains +1 END while Bless is active
   * 
   * **Consume:** 2 MP
   * **Produce:** 1 earth
   */
  NaturalResilience = "NaturalResilience",

  // ---------------
  // Wild (Primal/Hybrid)
  // ---------------
  /**
   * **Tier:** Rare
   * 
   * Hurl your spear with primal force, dealing damage based on range.
   * - **Damage:** Weapon damage × range multiplier + skill level (no skill level multiplier)
   *   - Front to front: 0.8× + skill level (1.0× at level 5)
   *   - Front to back: 1.2× + skill level (1.4× at level 5)
   *   - Back to back: 1.6× + skill level (1.8× at level 5)
   * - **Requirement:** Must equip Spear
   * 
   * **Consume:** 3 SP, 2 neutral
   * **Produce:** 1 earth
   */
  ThrowSpear = "ThrowSpear",

  /**
   * **Tier:** Common
   * 
   * Strike with primal ferocity, combining strength and will.
   * - **Damage:** (Weapon damage without mod + STR mod + WIL mod) × skill level multiplier nature damage
   * - **Back Row Bonus:** If used from back row, move to front row first (if available), then deal +1d4 damage first (+1d6 at level 5)
   * 
   * **Consume:** 3 SP, 1 neutral
   * **Produce:** 1 earth
   */
  PrimalStrike = "PrimalStrike",

  /**
   * **Tier:** Uncommon
   * 
   * Tap into your wild instincts, becoming more ferocious.
   * - **Effect:** Gain Wild Instinct buff for 2 turns (3 turns at level 5)
   * - **Wild Instinct Buff:** Gain +2 STR and +2 AGI
   * - **Must not have Wild Instinct buff to use this skill**
   * 
   * **Consume:** 4 SP, 1 earth
   * **Produce:** 1 neutral
   */
  WildInstinct = "WildInstinct",
}

export enum MonkSkillId {
  // ---------------
  // Fist (Offensive)
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Deliver a precise melee strike using internal force.
   * - **Damage:** 1d6 + (STR or DEX mod, whichever is higher) × position modifier blunt damage
   * - **Armor Penetration:** Ignore 2 point of pDef
   * - **Armor Penalty:** If your armor is NOT cloth, damage reduced by 70%
   * - **Requirement:** Must equip barehand
   * - **Target:** One enemy, front first, melee
   * 
   * **Consume:** 2 SP
   * **Produce:** 1 wind
   */
  PalmStrike = "PalmStrike",

  /**
   * **Tier:** Uncommon
   * 
   * Perform a flurry of rapid blows with incredible speed.
   * - **Hits:** 2 hits (3 hits at level 5)
   * - **Damage per Hit:** Uses Palm Strike damage at your Palm Strike skill level
   *   - If you don't have Palm Strike, damage = 1d4 + (STR or DEX mod, whichever is higher) × position modifier blunt damage
   * - **Armor Penalty:** If your armor is NOT cloth, damage reduced by 70%
   * - **Requirement:** Must equip barehand
   * - **Target:** One enemy, front first, melee
   * 
   * **Consume:** 3 SP, 2 wind
   * **Produce:** 1 neutral
   */
  FlurryOfBlows = "FlurryOfBlows",

  /**
   * **Tier:** Uncommon
   * 
   * Strike with stunning force, disrupting your enemy.
   * - **Damage:** (1d6 + (STR or DEX mod, whichever is higher)) × skill level multiplier blunt damage
   * - **Save:** Target must roll DC10 (DC12 at level 5) + (STR or DEX mod, whichever is higher) END save or become Stunned for 1 turn
   * - **Requirement:** Must equip barehand
   * - **Armor Penalty:** If your armor is NOT cloth, damage reduced by 70% DC reduced by 3
   * - **Target:** One enemy, front first, melee
   * 
   * **Consume:** 3 SP
   * **Produce:** 1 wind
   */
  StunningFist = "StunningFist",

  // ---------------
  // Master (Precision/Control)
  // ---------------
  /**
   * **Tier:** Common
   * 
   * Strike with perfect precision, bypassing defenses.
   * - **Damage:** (1d6 + (STR or DEX mod, whichever is higher)) × skill level multiplier blunt damage
   * - **Hit Bonus:** +4 hit roll (+6 at level 5)
   * - **Armor Penetration:** Each skill level ignores 1 point of armor (same as Palm Strike)
   * - **Requirement:** Must equip barehand
   * - **Armor Penalty:** If your armor is NOT cloth, damage reduced by 70% DC reduced by 3
   * - **Target:** One enemy, front first, melee
   
   * 
   * **Consume:** 2 SP 1 wind
   * **Produce:** 1 neutral
   */
  PrecisionStrike = "PrecisionStrike",

  /**
   * **Tier:** Uncommon
   * 
   * Strike with a dizzying palm technique that disorients enemies.
   * - **Damage:** (1d4 + (STR or DEX mod, whichever is higher)) × skill level multiplier blunt damage
   * - **Save:** Target must roll DC10 + (STR or DEX mod, whichever is higher) END save or gain Dazed debuff for 2 turns
   * - **Level 5:** Also reduce target's AB gauge by 10 if save fails
   * - **Requirement:** Must equip barehand
   * - **Armor Penalty:** If your armor is NOT cloth, damage reduced by 70% DC reduced by 3
   * - **Target:** One enemy, front first, melee
   *
   * **Consume:** 3 SP, 1 wind
   * **Produce:** 1 neutral
   */
  DizzyingPalm = "DizzyingPalm",
}

export enum WarlockSkillId {
  // ---------------
  // Shadow (Offensive)
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Launch a bolt of condensed chaos energy.
   * - **Damage:** 1d6 + planar mod × skill level multiplier chaos damage
   * - **Save:** Target must roll DC10 + planar mod WIL save or gain Cursed debuff for 1 turn (reduces saving throws)
   * 
   * **Consume:** 2 MP
   * **Produce:** 1 chaos
   */
  ChaosBolt = "ChaosBolt",

  /**
   * **Tier:** Uncommon
   * 
   * Release a burst of shadow energy that engulfs the enemy front line.
   * - **Damage:** 1d6 + planar mod × skill level multiplier arcane damage to all enemies in front row
   * - **Save:** Enemies must roll DC10 + planar mod WIL save or gain Slow debuff for 1 turn
   * - **Level 5:** Also apply Cursed debuff for 1 turn to enemies who fail save
   * 
   * **Consume:** 4 MP, 1 chaos
   * **Produce:** 1 neutral
   */
  ChaosBurst = "ChaosBurst",

  /**
   * **Tier:** Rare
   * 
   * Hurl a bolt of void energy that corrupts the target.
   * - **Damage:** (1d8 + planar mod) × skill level multiplier arcane damage
   * - **Cursed Bonus:** If target has Cursed debuff, deal +50% damage
   * - **Save:** Target must roll DC12 + planar mod WIL save or gain Cursed debuff for 2 turns
   * - **Range:** Single target ranged
   * 
   * **Consume:** 5 MP, 2 chaos
   * **Produce:** 1 neutral
   */
  VoidBolt = "VoidBolt",

  // ---------------
  // Corruption (Debuff)
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Corrupt the target with dark energy.
   * - **Damage:** 1d4 + planar mod × skill level multiplier arcane damage
   * - **Save:** Target must roll DC10 + planar mod WIL save or gain Cursed debuff for 2 turns
   * - **Bonus:** If target already has Cursed debuff, also apply Hexed debuff for 2 turns (reduces endurance by 2 and deals 1d2 damage per turn)
   * - **Target:** Single target
   * 
   * **Consume:** 3 MP, 2 neutral
   * **Produce:** 1 chaos
   */
  Corruption = "Corruption",

  /**
   * **Tier:** Common (Cantrip)
   * 
   * Curse a target with weakness, reducing their resolve.
   * - **Save:** Target must roll DC10 + planar mod WIL save or gain Cursed debuff for 2 turns (3 turns at level 5)
   * - **Damage:** If save fails, also deal 1d3 + planar mod arcane damage
   * - **Target:** Single target
   * 
   * **Consume:** 2 MP
   * **Produce:** 1 chaos
   */
  CurseOfWeakness = "CurseOfWeakness",

  // ---------------
  // Pact (Life Drain/Sacrifice)
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Drain vitality from an enemy, restoring your own health.
   * - **Damage:** 1d6 + planar mod × skill level multiplier arcane damage
   * - **Lifesteal:** Restore HP equal to 50% of damage dealt (75% at level 5)
   * - **Target:** Single target
   * 
   * **Consume:** 3 MP, 2 chaos
   * **Produce:** 1 fire
   */
  LifeDrain = "LifeDrain",

  /**
   * **Tier:** Rare
   * 
   * Form a dark pact, sacrificing your health for immense power.
   * - **Effect:** Gain Dark Pact buff for 3 turns (4 turns at level 5)
   * - **Dark Pact Buff:** All damage dealt increased by +25% (+35% at level 5), but you take +1 damage from all sources
   * - **Level 5:** Also gain +2 planar mod while active
   * - **Must not have dark pact buff to use this skill**
   * 
   * **Consume:** 5 HP, 1 fire
   * **Produce:** 1 chaos
   */
  DarkPact = "DarkPact",
}

export enum DuelistSkillId {
  // ---------------
  // Parry (Defensive Counter)
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Assume defensive stance, ready to parry and counter.
   * - **Effect:** Gain Parry buff for 1 turn (2 turns at level 5)
   * - **Parry:** When attacked, roll DC10 + CONTROL mod END save. If passed, negate the attack and deal (1d6 + DEX mod) × skill level multiplier slash damage back to attacker
   * 
   * **Consume:** 3 SP, 1 neutral
   * **Produce:** 1 wind
   */
  ParryRiposte = "ParryRiposte",

  /**
   * **Tier:** Rare
   * 
   * Adopt a focused dueling stance, enhancing precision.
   * - **Effect:** Gain DuelingStance buff for 3 turns (4 turns at level 5)
   * - **DuelingStance Buff:** +2 hit roll, +2 crit chance, +1 STR
   * - **Parry Bonus:** When you parry an attack, gain +5 AB gauge
   * 
   * **Consume:** 4 SP, 1 wind
   * **Produce:** 1 neutral
   */
  DuelingStance = "DuelingStance",


  // ---------------
  // Precision (Accurate Strikes)
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Execute a precise blade strike with perfect timing.
   * - **Damage:** (1.0× weapon damage (1.2× at level 5)) × skill level multiplier slash damage
   * - **Hit Bonus:** +3 hit roll
   * - **Target:** Single target melee attack
   * 
   * **Consume:** 2 SP
   * **Produce:** 1 wind
   */
  PreciseStrike = "PreciseStrike",

  /**
   * **Tier:** Uncommon
   * 
   * Feint to create an opening, then strike with precision.
   * - **Damage:** Weapon damage × skill level multiplier weapon pdamage type damage
   * - **Hit Bonus:** +4 hit roll (+6 at level 5)
   * - **On Hit:** Gain +10 AB gauge and target loses 10 AB gauge
   * - **Target:** Single target melee attack
   * 
   * **Consume:** 3 SP, 1 wind
   * **Produce:** 1 neutral
   */
  FeintStrike = "FeintStrike",

  // ---------------
  // Flow (Multi-hit Combos)
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Unleash a rapid flurry of blade strikes.
   * - **Hits:** 2 hits (3 hits at level 5)
   * - **Damage per Hit:** (0.7× weapon damage + DEX mod) × skill level multiplier slash damage
   * - **Target:** Multi-hit melee attack
   * 
   * **Consume:** 4 SP, 1 wind, 1 neutral
   * **Produce:** 1 fire
   */
  BladeFlurry = "BladeFlurry",
}

export enum WitchSkillId {
  // ---------------
  // Hex (Marking/Setup)
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Place a hex sigil on a target, marking them for increased suffering.
   * - **Effect:** Apply HexMark debuff to target for 2 turns (3 turns at level 5)
   * - **HexMark:** While marked, target takes +1d3 extra chaos damage from all sources
   * - **Target:** Single target
   * 
   * **Consume:** 2 MP, 1 chaos
   * **Produce:** 1 neutral
   */
  ChaosBrand = "CurseMark",

  /**
   * **Tier:** Common (Cantrip)
   * 
   * Weave a hex into your attack, marking the target.
   * - **Damage:** 1d3 + planar mod true damage
   * - **Effect:** Apply HexMark debuff to target for 2 turns
   * - **Bonus:** If target already has HexMark, also apply Cursed debuff for 1 turn
   * - **Target:** Single target
   * 
   * **Consume:** 2 MP
   * **Produce:** 1 chaos
   */
  HexWeave = "HexWeave",

  // ---------------
  // Curse (Direct Debuff)
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Launch a bolt of cursed energy at the target.
   * - **Damage:** 1d3 + planar mod true arcane damage
   * - **Save:** Target must roll DC8 + CONTROL mod WIL save or gain Cursed debuff for 2 turns
   * - **Range:** Ranged single target
   * 
   * **Consume:** 2 MP
   * **Produce:** 1 chaos
   */
  PoisonDart = "CurseBolt",

  /**
   * **Tier:** Uncommon
   * 
   * Curse a target with misfortune, hindering their abilities.
   * - **Save:** Target must roll DC10 + CONTROL mod WIL save or gain Cursed debuff for 2 turns (3 turns at level 5)
   * - **Slow:** If save fails, also apply Slow debuff for 1 turn
   * - **Damage:** If target already has Cursed debuff, deal 1d4 + planar mod arcane damage
   * - **Target:** Single target
   * 
   * **Consume:** 3 MP, 1 chaos
   * **Produce:** 1 chaos
   */
  MisfortuneCurse = "MisfortuneCurse",

  // ---------------
  // Chaos (Unpredictable Magic)
  // ---------------
  /**
   * **Tier:** Rare
   * 
   * Bind a target to a small effigy, creating a sympathetic link.
   * - **Damage:** 1d4 + planar mod × skill level multiplier arcane damage
   * - **Save:** Target must roll DC10 + CONTROL mod WIL save or gain Hexed debuff for 2 turns (reduces endurance by 2 and deals 1d2 damage per turn)
   * - **Bonus:** If target has HexMark debuff, also apply Cursed debuff for 1 turn
   * - **Target:** Single target
   * 
   * **Consume:** 4 MP, 2 chaos
   * **Produce:** 1 neutral
   */
  ChaosBinding = "HexDoll",

  /**
   * **Tier:** Uncommon
   * 
   * Influence an enemy's mind with witchcraft, causing confusion.
   * - **Save:** Target must roll DC10 + CONTROL mod WIL save or gain Charmed debuff for 1 turn (2 turns at level 5)
   * - **Charmed Debuff:** On their turn, roll DC12 WIL save. If failed, target a random ally instead of intended target for their action
   * - **Target:** Single target enemy
   * 
   * **Consume:** 3 MP, 2 chaos
   * **Produce:** 1 neutral
   */
  Bewitch = "Bewitch",

  /**
   * **Tier:** Common (Cantrip)
   * 
   * Weave chaotic magic with unpredictable effects.
   * - **Damage:** 1d4 + planar mod × skill level multiplier arcane damage
   * - **Random Effect:** Roll 1d4: 1-2: Apply Cursed debuff for 1 turn, 3: Apply Slow debuff for 1 turn, 4: Apply Dazed debuff for 1 turn
   * - **Target:** Single target
   * 
   * **Consume:** 2 MP
   * **Produce:** 1 chaos
   */
  ChaoticWeave = "ChaoticWeave",
}

export enum InquisitorSkillId {
  // ---------------
  // Smite (Holy Damage)
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Launch a focused blast of radiant energy.
   * - **Damage:** 1d6 + ((WIL + PLANAR) / 2) × skill level multiplier holy damage
   * - **Save:** Target must roll DC8 + CONTROL mod WIL save or gain Exposed debuff for 2 turns
   * - **Undead/Fiend Bonus:** +1d4 bonus damage against undead/fiends (1d8 at level 5)
   * - **Range:** Ranged single target
   * 
   * **Consume:** 2 MP, 1 order
   * **Produce:** 1 neutral
   */
  RadiantSmite = "RadiantSmite",

  /**
   * **Tier:** Rare
   * 
   * Call down a concentrated pillar of radiant force.
   * - **Damage:** (2d6 + (WIL + PLANAR) × (1 + 0.15 × skill level)) × skill level multiplier holy damage
   * - **Exposed Bonus:** +50% damage if target has Exposed debuff
   * - **Undead/Fiend Bonus:** +1d8 against undead/fiends (2d8 at level 5)
   * - **Target:** Single target
   * 
   * **Consume:** 5 MP, 2 order, 1 fire
   * **Produce:** 1 neutral
   */
  JudgmentDay = "JudgmentDay",

  // ---------------
  // Expose (Vulnerability Setup)
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Reveal the enemy's wrongdoing or impurity.
   * - **Effect:** Apply Exposed debuff for 2 turns (3 turns at level 5)
   * - **Exposed Debuff:** Takes +1d3 damage from all sources. At level 5, also gain -2 crit defense
   * - **Bonus:** You gain +(WIL mod / 2) hit roll against exposed enemies
   * - **Target:** Single target enemy
   * 
   * **Consume:** 2 MP, 1 order
   * **Produce:** 1 fire
   */
  ExposeWeakness = "ExposeWeakness",

  // ---------------
  // Purge (Utility/Dispel)
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Attempt to forcibly remove magical buffs from a target.
   * - **Save:** Target must roll DC10 + CONTROL mod WIL save
   * - **Failed:** Remove 1-2 random buffs and deal (1d4 + WIL mod) × skill level multiplier holy damage
   * - **Passed:** Deal half holy damage
   * - **Target:** Single target
   * 
   * **Consume:** 3 MP, 1 fire
   * **Produce:** 1 order
   */
  PurgeMagic = "PurgeMagic",

  /**
   * **Tier:** Common (Cantrip)
   * 
   * Cleanse with holy flame while smiting enemies.
   * - **Damage:** 1d4 + WIL mod × skill level multiplier holy damage
   * - **Cleanse:** Remove 1 random debuff from self or 1 random ally
   * - **Undead/Fiend Bonus:** If target is undead or fiend, deal +1d3 damage
   * - **Target:** Single target enemy
   * 
   * **Consume:** 2 MP
   * **Produce:** 1 fire
   */
  CleansingFlame = "CleansingFlame",
}

export enum ScholarSkillId {
  // ---------------
  // Analyze (Information/Vulnerability)
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Mark a vulnerable spot on the enemy through analysis.
   * - **Effect:** Apply Exposed debuff for 2 turns (3 turns at level 5)
   * - **Exposed Debuff:** Takes +1d3 damage from all sources
   * - **Level 5:** Exposed enemy also gains -2 to critical defense
   * - **Target:** Single target enemy
   * 
   * **Consume:** 2 MP
   * **Produce:** 1 neutral
   */
  Analyze = "Analyze",

  /**
   * **Tier:** Common (Cantrip)
   * 
   * Study the enemy's weakness and strike.
   * - **Effect:** Apply Exposed debuff for 1 turn
   * - **Damage:** Additionally, deal 1d3 + INT mod true arcane damage
   * - **Target:** Single target enemy
   * 
   * **Consume:** 2 MP
   * **Produce:** 1 neutral
   */
  WeaknessStudy = "WeaknessStudy",

  // ---------------
  // Disrupt (Control/Interrupt)
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Disrupt the target's combat pattern with knowledge.
   * - **Save:** Force DC10 WIL save (DC12 at level 5)
   * - **Failed:** Target gains Dazed debuff for 1 turn
   * - **Success:** Reduce target's AB gauge by 20 (30 at level 5)
   * - **Target:** Single target
   * 
   * **Consume:** 2 MP
   * **Produce:** 1 neutral
   */
  DisruptPattern = "DisruptPattern",

  /**
   * **Tier:** Uncommon
   * 
   * Interfere with the target's mental processes.
   * - **Save:** Target must roll DC10 + INT mod WIL save or gain Dazed debuff for 1 turn (2 turns at level 5)
   * - **AB Reduction:** Additionally, reduce target's AB gauge by 10
   * - **Target:** Single target
   * 
   * **Consume:** 2 MP 1 neutral
   * **Produce:** 1 order
   */
  MentalInterference = "MentalInterference",

  // ---------------
  // Overload (Debuff Exploitation)
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Overload the target's mind by exploiting existing debuffs.
   * - **Damage:** 1d4 + INT mod × skill level multiplier true arcane damage (1d6 at level 5, 1d8 if target has ≥3 debuffs)
   * - **Debuff Refresh:** Refresh 1 random debuff on the target (extend duration by 1 turn)
   * - **Multi-Debuff Bonus:** If target has ≥3 debuffs, damage becomes 1d6 (1d8 at level 5)
   * - **Target:** Single target
   * 
   * **Consume:** 3 MP 1 order 1 chaos
   * **Produce:** 1 neutral
   */
  CognitiveOverload = "CognitiveOverload",

  /**
   * **Tier:** Common
   * 
   * Strike with debilitating precision, exploiting vulnerabilities.
   * - **Damage:** (0.8× weapon damage + INT mod) × skill level multiplier arcane damage
   * - **Debuff Bonus:** If target has ≥2 debuffs, deal +1d4 damage
   * - **Multi-Debuff:** If target has ≥3 debuffs, also apply Slow debuff for 1 turn
   * - **Target:** Single target melee attack
   * 
   * **Consume:** 3 SP 1 order
   * **Produce:** 1 chaos
   */
  DebilitatingStrike = "DebilitatingStrike",
}

export enum EngineerSkillId {
  // ---------------
  // Trap (Battlefield Control)
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Set a bear trap on the battlefield.
   * - **Trigger:** The next time an enemy uses a melee (physical) attack, the trap triggers
   * - **Damage:** Deal (1d6 + DEX mod) × skill level multiplier pierce damage and remove the trap
   * 
   * **Consume:** 2 SP
   * **Produce:** 1 fire
   */
  BearTrap = "BearTrap",

  /**
   * **Tier:** Uncommon
   * 
   * Set a tripwire on the battlefield.
   * - **Trigger:** The next time an enemy moves or uses a melee attack, the trap triggers
   * - **Save:** Target must roll DC10 + DEX mod AGI save or gain Stun debuff for 1 turn (2 turns at level 5)
   * - **Damage:** Additionally, deal 1d4 + DEX mod pierce damage
   * 
   * **Consume:** 3 SP, 1 fire
   * **Produce:** 1 neutral
   */
  Tripwire = "Tripwire",

  // ---------------
  // Explosive (AoE Damage)
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Fire an explosive bolt at a target.
   * - **Damage:** (1d8 + DEX mod) × skill level multiplier fire damage to a target
   * - **Splash:** If hit, deals 50% splash damage to adjacent enemies in the same row
   * - **Requirement:** Requires bow (ranged attack)
   * 
   * **Consume:** 3 SP
   * **Produce:** 1 fire
   */
  ExplosiveBolt = "ExplosiveBolt",

  /**
   * **Tier:** Uncommon
   * 
   * Throw a fragmentation grenade at the enemy front line.
   * - **Damage:** (1d6 + DEX mod) × skill level multiplier fire damage to all enemies in front row
   * - **Save:** Enemies must roll DC10 + DEX mod END save or gain Bleed debuff for 2 turns (1d3 damage per turn)
   * - **Level 5:** Also apply Slow debuff for 1 turn to enemies who fail save
   * 
   * **Consume:** 4 SP, 1 fire
   * **Produce:** 1 neutral
   */
  FragmentationGrenade = "FragmentationGrenade",

  // ---------------
  // Construct (Mechanical Utilities)
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Enter a mechanical overdrive state, enhancing physical capabilities.
   * - **Effect:** Gain Mechanical Overdrive buff for 2 turns (3 turns at level 5)
   * - **Mechanical Overdrive Buff:** Gain +2 STR and +2 AGI
   * - **AB Gauge:** Additionally, gain +5 AB gauge at the start of each turn
   * 
   * **Consume:** 4 SP, 1 fire
   * **Produce:** 1 neutral
   */
  MechanicalOverdrive = "MechanicalOverdrive",

  /**
   * **Tier:** Common (Cantrip)
   * 
   * Shift gears to boost an ally's performance.
   * - **Target:** self
   * - **Effect:** Grant Haste buff for 2 turns
   * - **SP Restoration:** Additionally, restore 2 SP
   * - **Must not have Haste buff to use this skill**
   * 
   * **Consume:** 2 SP
   * **Produce:** 1 fire
   */
  GearShift = "GearShift",
}

export enum NomadSkillId {
  // ---------------
  // Adaptive (Position-Changing)
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Strike while adapting your position to the flow of battle.
   * - **Damage:** Weapon damage + attribute modifier × (1.0 + 0.1 per 2 character levels, max 1.5 at level 10) × skill level multiplier
   * - **Position Change:** Must change position: front → back or back → front (if slot available)
   * - **Penalty:** -2 hit roll penalty
   * - **Range:** This attack has no range penalty
   * - **Target:** Melee attack that changes position
   * 
   * **Consume:** 2 SP
   * **Produce:** 1 neutral
   */
  AdaptiveStrike = "AdaptiveStrike",

  /**
   * **Tier:** Uncommon
   * 
   * Retreat tactically while striking back.
   * - **Movement:** Move to back row (if available) and grant Retreat buff for 1 turn (2 turns at level 5)
   * - **Damage:** Additionally, deal (0.8× weapon damage + attribute mod) × skill level multiplier damage to a random
   * 
   * **Consume:** 3 SP 1 neutral
   * **Produce:** 1 wind
   */
  AdaptiveRetreat = "AdaptiveRetreat",

  // ---------------
  // Tactical (Position-Based Effects)
  // ---------------
  /**
   * **Tier:** Uncommon
   * 
   * Adapt your stance to your current position.
   * - **Front Row:** Engulf your weapon with fire and attack, dealing (weapon damage + attribute modifier + 1d4) × skill level multiplier fire damage. Enemy must roll DC10 END save (DC12 at level 5) or gain Burn debuff for 1d3 turns
   * - **Back Row:** Gain Retreat buff for 1 turn (2 turns at level 5)
   * - **Requirement:** Must equip dagger or blade
   * 
   * **Consume:** 3 SP 1 wind
   * **Produce:** 1 fire
   */
  TacticalSlash = "TacticalSlash",

  /**
   * **Tier:** Uncommon
   * 
   * Strike adapts to enemy position.
   * - **Enemy in Front Row:** Throw hot sand into enemy eyes, dealing 1d2 true damage. Enemy must roll DC10 AGI save (DC12 at level 5) or gain Blind debuff for 1 turn (-3 hit roll)
   * - **Enemy in Back Row:** Launch a powerful shot, dealing (weapon damage + attribute modifier) × (skill level multiplier + 0.3) piercing damage
   * - **Range:** No range penalty
   * - **Requirement:** Must equip bow
   * 
   * **Consume:** 3 SP 1 neutral
   * **Produce:** 1 wind
   */
  TacticalShot = "TacticalShot",

  /**
   * **Tier:** Common (Cantrip)
   * 
   * Advance tactically while attacking.
   * - **Movement:** Move to front row (if available) and deal (weapon damage + attribute mod) × skill level multiplier damage
   * - **Bonus:** If moving from back row, gain +5 AB gauge
   * 
   * **Consume:** 2 SP
   * **Produce:** 1 wind
   */
  TacticalAdvance = "TacticalAdvance",

  // ---------------
  // Mobility (Movement/Positioning)
  // ---------------
  /**
   * **Tier:** Common (Cantrip)
   * 
   * Quickly change position with enhanced mobility.
   * - **Movement:** Change position (front ↔ back) if slot available
   * - **AB Gauge:** Gain +10 AB gauge
   * - **Haste:** Additionally, gain Haste buff for 1 turn
   * 
   * **Consume:** 2 SP
   * **Produce:** 1 wind
   */
  QuickStep = "QuickStep",

  /**
   * **Tier:** Uncommon
   * 
   * Strike while repositioning the enemy.
   * - **Damage:** (Weapon damage + attribute mod) × skill level multiplier
   * - **Front Row Push:** If target is in front row, push target to back row (if slot available) and deal +1d4 damage
   * - **Back Row Pull:** If target is in back row, pull target to front row (if slot available) and deal +1d4 damage
   * - **Level 5:** Also gain +5 AB gauge if position change succeeds
   * - **Target:** Single target melee attack
   * 
   * **Consume:** 3 SP 1 wind 1 fire
   * **Produce:** 1 neutral
   */
  RepositioningStrike = "RepositioningStrike",
}
