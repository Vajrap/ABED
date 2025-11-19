export type SkillId = 
  | BasicSkillId
  | MobSkillId
  | ClericSkillId
  | ScholarSkillId
  | MageSkillId
  | MysticSkillId
  | RogueSkillId
  | SpellBladeSkillId
  | ShamanSkillId
  | BarbarianSkillId
  | WarriorSkillId
  | KnightSkillId
  | GuardianSkillId
  | PaladinSkillId
  | DruidSkillId
  | MonkSkillId
  | WarlockSkillId
  | RangerSkillId
  | WitchSkillId
  | InquisitorSkillId


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
  Heal = "Heal", // Restore HP, if high level might remove Debuff
  MassHeal = "MassHeal", // Restore HP to all allies
  // Revive = "Revive", // Bring fallen ally back with 25% HP
  Radiance = "Radiance", // Attack enemy with holy damage
  Bless = "Bless", // Grant saving throw advantage
  TurnUndead = "TurnUndead", // Turn undead deal 9999 damage,
  // HolyWater = "HolyWater", // Buff weapon with holy damage,
  // Passive
  // HealingMastery = "HealingMastery", // Increase healing amount
  
}

export enum SeerSkillId {

}

export enum MageSkillId {
  ArcaneBolt = "ArcaneBolt",
  ArcaneShield = "ArcaneShield",

  Backdraft = "Backdraft",
  FireBolt = "FireBolt",
  FireBall = "FireBall",
  BurningHand = "BurningHand",

  // IceShield = "IceShield",
  // FrostNova = "FrostNova",
  // IceSpike = "IceSpike",
  // BlizzardStorm = "BlizzardStorm",

  // LightningSpear = "LightningSpear",
  // ChainLightning = "ChainLightning",
}

export enum MysticSkillId {
  MistStep = "MistStep",
  // “Shift like mist to a safer position. Move to the backline if you are in the front row; if already in the back row, gain evasion instead. Remove Slow or Bind if present. Gain +3 dodge roll for 1 turn (increases to 2 turns at skill level 5).”

  PlanarAbsorption = "PlanarAbsorption",
  // Gain 'Planar Absorption' buff for 2d3 stacks + intelligence mod + 0.01 times per skill level, If Attacked by a magic spell, absorb damage up to the stacks of planar absoprtion buff,
  // Every 4 damage of each type that is absorbed turned into 1 resource of that element type.

  InnerVeil = "InnerVeil",
  // Cast a veil on one frontline ally, make them harder to target or hit.
  // (Minor concealment / dodge / accuracy debuff to enemy)
  // Role: soft-support defensive buff.

  ReversalPalm = "ReversalPalm",
  // After using, give self a buff 'Reverse Palm' for 1 turn:
  // Reverse Palm: when attacked, roll a d20 willpower save, if passed, deal 1d6 blunt damage + dex mod *(1 + 0.1 * skill level) to the attacker and negate that attack, Then remove the buff, if fail, remove the buff and take damage normally.
  // (The redirection might needed to be implemented in the damage calculation function)

  // FlowingForm = "FlowingForm", // Later Implementation for Passive skills
  // Passive
  // PASSIVE — Each successful dodge grants 1 Flow Buff (max 3). 
  // Each Flow: +1 dodge roll & restore 1 MP at end of turn. 
  // Lose all Flow when hit. 

  // =======================
  // Passives
  // =======================

  Serenity = "Serenity",
  // When taking no damage during a turn, gain a small regen at end of turn.
  // Encourages evasion + flowing playstyle.

  FluidMotion = "FluidMotion",
  // Gain increased movement OR reduced cooldowns when successfully dodging attacks.
  // Movement-based passive reward loop.
}

export enum RogueSkillId {
  RetreatDash = "RetreatDash",
  Backstab = "Backstab", 

  BleedingCut = "BleedingCut",
  // Uncommon
  // require sword dagger or blade
  // Deal weapons damage + Dex mod * (1 + 0.1 * skill level) slash
  // Must be front - front to deal full damage (see skills that have positionMultiplier)
  // target must roll DC10 (DC12 at lvl 5) Endurance save. or get 1d3 bleed stacks (debuff)
  // Bleed: takes 1d3 damage per turn for 3 turns.


  ThrowingKnives = "ThrowingKnives",
  // Common
  // Any range
  // Throw knives at 2 targets, each deals 1d4 + Dex mod * (1 + 0.1 * skill level) pierce damage.
  // target can be repeat, (so just get random again and again, no thing special here)
  // at level 5, add 2 more knives to the throw


  Hiding = "Hiding",
  // Uncommon
  // Try to get hiding, roll D20 + dex mod, against 10 + (higest enemy int mod) + ( row === 'front' ? 5 : 0)
  // if passed get hiding buff for 2 turns,
  // at level 5, base DC = 8, front row penalty = 3
}

export enum SpellBladeSkillId {

  PlanarEdge = "PlanarEdge",
  // Cantrip, auto attack, core idea for spell blade
  // Dealing arcane damage, melee (see positionModifier)
  // must equip sword, blade, dagger or barehand(no weapon)
  // If weapon exist, deal weapon damage + planar mod + edge charge stacks * (1 + 0.1 * skill level) arcane damage.
  // If no weapon, damage dice based on skill Level, 1d6, 1d6, 1d8, 1d8 and 2d4 (level 1-5) + planar mod + edge charge stacks * (1 + 0.1 * skill level) arcane damage.
  // and generate "Edge Charge". Buff
  // Edge Charge buff maximum 5 stacks, no limit on duration.
  // produce 1 wind

  WindSlash = "WindSlash",
  // Uncommon
  // Any range
  // Deal (Planar edge-like damage) * (1 + 0.1 * skill level) arcane damage.
  // consume 1 wind, produce natural
  // Target roll DC7 + (user planar mod) endurance save or get bleed for 1d2 turn.
  // At level 5, if edge charge stacks > 0 deal additional 0.5 damage per stack, round down.


  SpellParry = "SpellParry",
  // rare
  // Get Spell Parry buff for 1 turn.
  // Spell Parry: reduce next spell’s damage by (5 + Int mod).
  // If attacked by a spell, gain 1 Edge Charge (2 if 0 damage taken). 
  // At level 5 also produce 1 Edge Charge when used.
  // Comsume 1 wind, produce 1 chaos

  EdgeBurst = "EdgeBurst",
  // rare
  // Consume ALL Edge Charges (min 1). 
  // Close range, melee (see positionModifier)
  // must equip sword, blade, dagger or barehand(no weapon)
  // Strike target for weapon dmg(or the same as Planar Edge) + Planar mod + (1d2 per edge charge stacks) * (1 + 0.1 * skill level) arcane damage.
  // consume 2 chaos produce nothing
}

export enum ShamanSkillId {
  MendSpirit = "MendSpirit",
  HexOfRot = "HexOfRot",
  SpiritRattle = "SpiritRattle",
  ChaoticBlessing = "ChaoticBlessing",
}

export enum BarbarianSkillId {
  Rage = "Rage",
  // ACTIVE — Enter a frenzied state for several turns.
  // Gain increased attack power and action speed,
  // but reduced defense. Core Barbarian mechanic.

  WildSwing = "WildSwing",
  // ACTIVE — Heavy, reckless melee strike.
  // Hits a random nearby enemy or deals splash damage.
  // High damage but lower accuracy.

  CrushingBlow = "CrushingBlow",
  // ACTIVE — Single-target smash attack.
  // Deals bonus damage if the Barbarian is enraged.
  // Can break armor or stagger the target.

  BloodRoar = "BloodRoar",
  // ACTIVE — Ferocious shout.
  // Increases Barbarian’s offense and may intimidate enemies,
  // reducing their attack or chance to hit.

  Rampage = "Rampage",
  // ACTIVE — Ultimate-like burst.
  // Temporarily gain extra attacks or deal multi-hit strikes.
  // Stronger the lower the Barbarian’s HP is.
  // Pure reckless offense.

  UnboundFury = "UnboundFury",
  // PASSIVE — Barbarian deals increased damage when below HP threshold
  // OR when affected by Rage.
  // Rewards risky high-aggression playstyle.
}

export enum WarriorSkillId {
  Bash = "Bash",
  // common
  // consume 2 neutral, produce 1 earth
  // Deal weapon damage, + str mod, target roll DC8 + (user str mod) endurance save or get stun for 1 turn.
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
}

export enum KnightSkillId {

  GuardStance = "GuardStance",
  // ACTIVE — Enter a disciplined defensive stance.
  // Reduce incoming damage significantly for 1–2 turns.
  // Next melee attack deals bonus retaliation damage.
  // Purpose: defensive timing, not passive tanking (unlike Guardian).

  ShieldBash = "ShieldBash",
  // ACTIVE — Slam the target with shield.
  // Deals moderate damage and briefly stuns or staggers the enemy.
  // More accurate and controlled than Warrior's Bash.

  PrecisionThrust = "PrecisionThrust",
  // ACTIVE — Focused melee strike targeting a weak point.
  // High accuracy, moderate damage, bonus crit chance.
  // Knight’s signature disciplined offense.

  RallyingCall = "RallyingCall",
  // ACTIVE — Inspire nearby allies with a disciplined shout.
  // Small buff to attack or defense for 2–3 turns.
  // Not as strong as WarCry, but more reliable and defensive.

  IronAdvance = "IronAdvance",
  // ACTIVE — Ultimate-ish.
  // Knight marches forward through enemies with unstoppable momentum.
  // Cannot be interrupted; takes reduced damage during movement;
  // knocks back or disrupts enemies in path.
  // Perfect for frontline initiation or breaking clusters.

  ArmoredMastery = "ArmoredMastery",
  // PASSIVE — Knight takes reduced damage from physical hits
  // AND gains small offense when wearing heavy armor.
  // Reinforces the Knight’s bruiser identity: durable + damaging.
}

export enum GuardianSkillId {
  Taunt = "Taunt",
  HerosPose = "HerosPose",
  ShieldUp = "ShieldUp",

  IronWall = "IronWall",
  // ACTIVE — Plant feet firmly into the ground.
  // Become immune to knockback, stun, or displacement for several turns.
  // Reduces incoming damage further, but lowers movement to 0.
  // Guardian becomes an *anchor* — perfect pure tank fantasy.

  ProtectAlly = "ProtectAlly",
  // ACTIVE — Redirect the next attack that would hit an ally.
  // Guardian takes the hit instead, with reduced damage.
  // A core guardian-style intervention skill.

  Sentinel = "Sentinel",
  // PASSIVE — When hit, Guardian gains a small DEF boost for 1 turn.
  // Stacks up to a low limit.
  // Encourages being attacked and rewards tanking properly.
}

export enum PaladinSkillId {

  DivineStrike = "DivineStrike",
  // ACTIVE — A melee attack blessed with holy energy.
  // Deals physical + light magic damage.
  // Slight chance to purge 1 minor debuff from self.
  // Bread-and-butter offensive tool.

  HolyAegis = "HolyAegis",
  // ACTIVE — Place a holy shield on an ally.
  // Absorbs a moderate amount of damage.
  // Strong, reliable single-target protection.

  Judgment = "Judgment",
  // ACTIVE — Smite the target with righteous power.
  // Deals moderate damage and reduces their attack or accuracy.
  // Combines offense and control.

  PurifyingWave = "PurifyingWave",
  // ACTIVE — Emit a wave of holy light.
  // Cleanses 1 debuff from all allies OR grants a small regen for a few turns.
  // Light support tool that defines Paladin's role.

  RadiantCharge = "RadiantCharge",
  // ACTIVE — Ultimate-ish.
  // Dash to an enemy and unleash a burst of holy energy.
  // Damages the target and grants allies a small defensive buff.
  // Great initiation skill.

  RighteousGuard = "RighteousGuard",
  // PASSIVE — When the Paladin protects or assists an ally (Aegis/Purify),
  // gain a small temporary DEF or magic resist boost.
  // Encourages Paladin's supportive playstyle.
}

export enum DruidSkillId {

  VineWhip = "VineWhip",
  // ACTIVE — Medium-range strike using conjured vines.
  // Deals physical+magic nature damage and may pull the enemy 1 tile closer.
  // Bread-and-butter attack with battlefield control.

  Regrowth = "Regrowth",
  // ACTIVE — Restore HP to an ally over several turns.
  // A regeneration-over-time spell instead of a burst heal.
  // Defines Druid's healing identity as slow but steady.

  EntanglingRoots = "EntanglingRoots",
  // ACTIVE — Root an enemy in place for 1–2 turns.
  // May also reduce their attack or movement.
  // Classic Druid battlefield control tool.

  ThornShield = "ThornShield",
  // ACTIVE — Coat an ally (or self) in protective thorns.
  // Slight damage reduction + deals thorn retaliation damage to attackers.
  // Great for frontline synergy.

  WildShape = "WildShape",
  // ACTIVE — Ultimate-ish transformation.
  // Temporarily assume an animal aspect (Wolf, Bear, Hawk, etc.).
  // Gain different bonuses depending on build:
  //   - Bear: Defense + HP
  //   - Wolf: Speed + lifesteal
  //   - Hawk: Accuracy + initiative
  // Not a permanent shift; lasts a few turns.

  NatureBond = "NatureBond",
  // PASSIVE — Whenever Druid applies a regen or root effect,
  // gain a small self-buff (DEF up, regen, or resource tick).
  // Encourages using Druid’s nature control & healing cycle.
}

export enum MonkSkillId {

  PalmStrike = "PalmStrike",
  // ACTIVE — A precise melee strike using internal force.
  // Ignores a portion of the target’s armor.
  // Bread-and-butter Monk damage skill.

  Meditation = "Meditation",
  // ACTIVE — Enter a short meditative focus.
  // Restore a small amount of HP or resource, and gain minor defense for 1 turn.
  // Defines Monk's self-sustain + discipline.

  CounterStance = "CounterStance",
  // ACTIVE — Take a defensive martial posture.
  // The next melee attack taken triggers an automatic counter-hit.
  // Encourages timing and prediction.

  ChiBurst = "ChiBurst",
  // ACTIVE — Release stored chi in a short-range blast.
  // AOE cone damage + small knockback or stagger.
  // Monk's only early AOE option.

  InnerHarmony = "InnerHarmony",
  // ACTIVE — Ultimate-ish.
  // Enter a heightened state of balance and calm.
  // For a few turns:
  //   - Increased evasion
  //   - Increased accuracy
  //   - Basic attacks become empowered with chi damage
  //   - Meditation becomes instant
  // The Monk's peak form.

  MartialDiscipline = "MartialDiscipline",
  // PASSIVE — Each time the Monk dodges or counters an attack,
  // gain a stacking buff that increases damage slightly for the next turn.
  // Rewards reactive, skillful gameplay.
}

export enum WarlockSkillId {

  ShadowBolt = "ShadowBolt",
  // ACTIVE — Launch a bolt of condensed shadow energy.
  // Ranged single-target magic damage with a small chance to weaken the target.
  // Basic Warlock nuke.

  LifeDrain = "LifeDrain",
  // ACTIVE — Drain vitality from an enemy.
  // Deals damage and restores a portion of HP to the Warlock.
  // Core sustain tool.

  SoulTether = "SoulTether",
  // ACTIVE — Bind the Warlock to a target.
  // Both are tethered: if the target moves away, it is slowed or suffers damage.
  // Optionally reduces escape or increases received damage.
  // Battlefield control through shadow binds.

  GloomField = "GloomField",
  // ACTIVE — Create a small zone of oppressive shadow.
  // Enemies inside suffer reduced accuracy or lowered resistances,
  // and may take minor DOT shadow damage.
  // Area control tool.

  DarkPact = "DarkPact",
  // ACTIVE — Ultimate-ish.
  // Sacrifice a portion of your HP to greatly enhance damage for a few turns 
  // OR to instantly unleash a high-damage shadow burst.
  // High-risk, high-reward signature Warlock move.

  ForbiddenKnowledge = "ForbiddenKnowledge",
  // PASSIVE — When applying DOTs or draining HP,
  // Warlock gains a stacking buff to magic damage or resource regen.
  // Encourages sustained corruption playstyle.
}

export enum RangerSkillId {

  AimedShot = "AimedShot",
  // ACTIVE — Carefully line up a precise arrow.
  // High damage, increased crit chance, but slower to fire.
  // Ranger's bread-and-butter burst attack.

  TwinArrows = "TwinArrows",
  // ACTIVE — Fire two fast arrows at one target OR split between two.
  // Lower damage per hit but great for applying effects quickly.
  // Reliable multi-hit option.

  TripwireTrap = "TripwireTrap",
  // ACTIVE — Lay a trap on the ground.
  // The first enemy that moves into it is slowed, tripped, or briefly rooted.
  // Battlefield control through hunting tools.

  HunterMark = "HunterMark",
  // ACTIVE — Mark an enemy with a tracking sigil.
  // Marked enemy takes increased damage from Ranger attacks
  // and becomes easier to hit.
  // Signature skill for building damage over time.

  VolleyRain = "VolleyRain",
  // ACTIVE — Ultimate-ish.
  // Launch a rain of arrows over an area for multiple turns.
  // Deals chip damage each turn and disrupts enemy positioning.
  // Excellent zoning tool for ranged dominance.

  TrackerInstinct = "TrackerInstinct",
  // PASSIVE — Ranger gains increased accuracy and crit chance 
  // against enemies affected by traps or HunterMark.
  // Reinforces the synergy between marks, traps, and ranged hits.
}

export enum WitchSkillId {
  CurseMark = "CurseMark",
  // ACTIVE — Place a hex sigil on a target.
  // Target takes increased damage over time, and the Witch gains bonuses 
  // when attacking marked enemies.
  // Signature setup skill — defines Witch’s curse mechanics.

  PoisonMist = "PoisonMist",
  // ACTIVE — Create a lingering poisonous cloud in an area.
  // Enemies inside take poison damage each turn and suffer reduced healing.
  // Slow, cruel battlefield corruption.

  HexDoll = "HexDoll",
  // ACTIVE — Bind a target to a small effigy.
  // Damaging the doll deals a fraction of that damage to the target,
  // OR causes periodic pain regardless of distance.
  // Classic “voodoo doll” mechanic.

  Bewitch = "Bewitch",
  // ACTIVE — Influence an enemy’s mind with witchcraft.
  // Light charm/confuse effect: enemy might skip a turn, mis-target, or reduce aggression.
  // Not full mind-control, but disruptive.

  RitualCircle = "RitualCircle",
  // ACTIVE — Ultimate-ish.
  // Draw a cursed ritual circle on the ground.
  // Enemies inside suffer stacking debuffs (weaken, slow, defense down),
  // and curses applied by the Witch become stronger or spread.
  // Strong area denial + curse amplification zone.

  Malice = "Malice",
  // PASSIVE — Whenever the Witch applies a curse or poison effect,
  // extend its duration or slightly increase its potency.
  // Rewards maintaining multiple curses and ritual zones.
}

export enum InquisitorSkillId {
  RadiantSmite = "RadiantSmite",
  // ACTIVE — Deliver a focused blast of radiant energy.
  // High single-target holy damage, especially against debuffed or "corrupted" targets.
  // Inquisitor's signature strike.

  ExposeWeakness = "ExposeWeakness",
  // ACTIVE — Reveal the enemy’s wrongdoing or impurity.
  // Reduces their defenses or increases damage taken.
  // Stacks with ally attacks; strong support-debuff.

  PurgeMagic = "PurgeMagic",
  // ACTIVE — Attempt to forcibly remove magical buffs from a target.
  // If successful, deals extra holy damage.
  // Inquisitor's anti-mage / anti-buff tool.

  TruthSentence = "TruthSentence",
  // ACTIVE — Pronounce a "sentence of truth" on an enemy.
  // Enemy must pass a willpower-like check or suffer:
  // - reduced accuracy
  // - reduced damage
  // - or forced inability to hide/stealth.
  // Psychological suppression technique.

  JudgmentDay = "JudgmentDay",
  // ACTIVE — Ultimate-ish.
  // Call down a concentrated pillar or beam of radiant force.
  // Deals heavy damage, massively penalizes corrupted/marked/evil targets,
  // and may blind or stagger surrounding enemies.
  // Devastating finisher with thematic zeal.

  Zeal = "Zeal",
  // PASSIVE — When the Inquisitor attacks or debuffs an enemy,
  // gain a small stacking buff to damage or accuracy for the next turn.
  // Encourages relentless offensive pressure.
}

export enum ScholarSkillId {
  Analyze = "Analyze",
  // Uncommon
  // Mark a vulnerable spot on the enemy. For 2 turns, the marked enemy get Exposed debuff
  // Exposed: takes additional 1d3 damage from all sources.
  // if skill level is 5, the exposed enemy also gain -2 to critical defense
  // We can use the 'perm' value in buff to acheive the -2 to critical defense

  DisruptPattern = "DisruptPattern",
  // Cantrip
  // Force DC10 (DC12 at lvl 5) Will save. 
  // Fail: target is Dazed 1 turn. 
  // Success: reduce target's next initiative by 20 (30 at lvl 5).

  CognitiveOverload = "CognitiveOverload",
  // Uncommon
  // Deal 1d4 (1d6 at lvl 5) + INT mod * (1 + 0.1 * skill level) true arcane damage. Refresh 1 random debuff on the target.
  // If target has ≥3 debuffs, damage becomes 1d6 (1d8 at lvl 5).
}

export enum EngineerSkillId {

}

export enum NomadSkillId {

}