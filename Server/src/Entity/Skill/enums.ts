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
  Barrier = "Barrier", // Create a barrier reduce incoming damage
  // TurnUndead = "TurnUndead", // Turn undead deal 9999 damage,
  // HolyWater = "HolyWater", // Buff weapon with holy damage,
  // Passive
  // HealingMastery = "HealingMastery", // Increase healing amount
  
}

export enum ScholarSkillId {
  Analyze = "Analyze",
  // Study a target and reveal its hidden stats, defense types, and weaknesses.
  // Often applies a debuff: target takes slightly more damage for X turns.
  // Purpose: Information + light damage amplification.

  MagicSeal = "MagicSeal",
  // Temporarily disable an enemy’s ability to cast spells.
  // Could silence them, increase their cooldowns, or block one chosen ability.
  // Purpose: Anti-mage control, Scholar specialty.

  WeakpointMark = "WeakpointMark",
  // Mark a vulnerable spot on the enemy. For a few turns, the marked enemy
  // takes increased CRIT or PENETRATION damage from all sources.
  // Purpose: Tactical damage setup.

  BarrierScript = "BarrierScript",
  // Create a small protective barrier around an ally using arcane script.
  // Reduces incoming damage or converts a portion of it into non-lethal damage.
  // Purpose: Supportive shielding without being a healer.

  TacticalReposition = "TacticalReposition",
  // Move an ally or yourself into an optimal position.
  // Could grant extra dodge or give an ally an immediate mini-action (like pivot).
  // Purpose: Strategic battlefield manipulation (ultimate-level utility).

  // =======================
  // Passives
  // =======================

  Insight = "Insight",
  // When hitting a studied/marked target, Scholar gains bonus accuracy or crit chance.
  // Purpose: Rewards using Analyze/WeakpointMark.

  MentalDiscipline = "MentalDiscipline",
  // Reduces cooldowns of Scholar skills when Scholar takes no damage in a turn.
  // Purpose: Encourages playing carefully and planning ahead.
}

export enum MageSkillId {
  ArcaneBolt = "ArcaneBolt",
  ArcaneShield = "ArcaneShield",
  ArcanePulse = "ArcanePulse",      
  // Short-range AoE burst of raw arcane force. 
  // Deals moderate damage and may stagger enemies.
  // Purpose: "Get off me" spell, Mage’s defensive AoE.

  ManaTwist = "ManaTwist",
  // Disrupt enemy concentration: apply silence, increase their cooldown,
  // OR reduce their resource gain for a few turns.
  // Purpose: Arcane interference / control skill.

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
  // Dash to a nearby position. Gain temporary evasion and remove slow/immobilize.
  // Role: reposition + self-cleanse + defensive mobility.
  // Mystic signature skill: fluid movement and mist-like evasion.

  BreathFocus = "BreathFocus",
  // Enter a breathing stance. Increase next skill’s potency (damage, healing, or control)
  // OR reduce its resource cost depending on tier.
  // Role: setup move for empowered effects.

  InnerVeil = "InnerVeil",
  // Create a faint veil around self or ally, making them harder to target or hit.
  // (Minor concealment / dodge / accuracy debuff to enemy)
  // Role: soft-support defensive buff.

  ReversalPalm = "ReversalPalm",
  // Melee strike that reflects a portion of the next incoming attack back to the attacker.
  // Role: “redirect force” flavor — Mystic’s version of a counter.

  FlowingForm = "FlowingForm",
  // Adopt a temporary flowing stance: 
  // - increased evasion  
  // - slight regen  
  // - attacks become weaker but much harder to interrupt  
  // Role: ultimate-like self-sustain + stability stance.

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
  // Fast melee strike that applies bleed for several turns.
  // Purpose: sustained DPS tool that rewards hit-and-run.

  ShadowFeint = "ShadowFeint",
  // Make a deceptive strike. Deals moderate damage and lowers the target’s accuracy.
  // Purpose: debuff + safer melee presence.

  ThrowingKnives = "ThrowingKnives",
  // Ranged attack hitting 2–3 targets OR same target multiple times.
  // Purpose: gives Rogue a mid-range option; good opener.

  SmokeBomb = "SmokeBomb",
  // Create a smoke field. Enemies inside have reduced accuracy; Rogue gains stealth.
  // May reset enemy targeting or force misses for a turn.
  // Purpose: battlefield control + stealth re-entry tool (ultimate-ish).

  // =======================
  // Passives
  // =======================

  Cunning = "Cunning",
  // Deal increased damage to enemies suffering from any debuff.
  // Encourages synergy with bleed, feint, smoke, etc.

  Lightfoot = "Lightfoot",
  // Gain bonus initiative and movement distance.
  // Purpose: Rogue moves first and moves far.
}

export enum SpellBladeSkillId {

  PlanarEdge = "PlanarEdge",
  // PASSIVE — Core identity of the SpellBlade.
  // Conjure a blade of pure planar energy. 
  // Always counts as armed. Basic attacks deal magical melee damage 
  // and generate "Edge Charge". Some abilities consume or empower the Edge.

  ArcaneSlash = "ArcaneSlash",
  // ACTIVE — Hybrid melee + magic strike using the Planar Edge.
  // Deals melee damage + small arcane bonus.
  // If you have at least 1 Edge Charge, consumes 1 to release a short arc wave.

  EdgeInfusion = "EdgeInfusion",
  // ACTIVE — Empower the Planar Edge temporarily.
  // Increases magic damage on melee attacks and boosts Edge Charge generation 
  // for several turns. Core buff of the SpellBlade rotation.

  BladeWard = "BladeWard",
  // ACTIVE — Coat the planar blade in a defensive aura.
  // Gain temporary armor + magic resistance.
  // Enemies that hit you in melee take minor arcane retaliation.

  SpellParry = "SpellParry",
  // ACTIVE — Enter a parry stance against magic.
  // The next enemy spell targeting you is weakened or negated.
  // Successful parry grants 1 Edge Charge and empowers your next ArcaneSlash.

  ElementalBurst = "ElementalBurst",
  // ACTIVE — Finisher / ultimate-like ability.
  // Consume ALL Edge Charges to deliver a devastating melee strike 
  // followed by a small magic explosion (AOE).
  // Damage scales heavily with the number of Edge Charges consumed.
}

export enum ShamanSkillId {
  MendSpirit = "MendSpirit",
  HexOfRot = "HexOfRot",
  SpiritRattle = "SpiritRattle",
  ChaoticBlessing = "ChaoticBlessing",
  TotemStrike = "TotemStrike",
  // ACTIVE — Summon a small spirit totem for a single hit.
  // Deals magic damage with a secondary effect 
  // (slow, minor stun chance, or resource drain). 
  // Unstable, but reliable enough to use in combat.

  SpiritChannel = "SpiritChannel",
  // PASSIVE — When the Shaman applies a debuff or DOT, gain a small self-buff.
  // Could be: +resistance, +attack, or +regen for 1 turn.
  // Rewards continuous curse/hex application.
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
  Cleave = "Cleave",

  PowerStrike = "PowerStrike",
  // ACTIVE — Strong single-target melee attack.
  // Higher damage than Bash, no control.
  // Bread-and-butter offensive skill.

  ShieldBreak = "ShieldBreak",
  // ACTIVE — Heavy strike aimed at breaking defense.
  // Reduces the target’s armor or guard for several turns.
  // Excellent for supporting party DPS.

  WarCry = "WarCry",
  // ACTIVE — Battle shout that boosts self or team morale.
  // Increases attack or action speed for a few turns.
  // Simple, effective self-buff with team value.

  WeaponMastery = "WeaponMastery",
  // PASSIVE — Warrior deals increased damage with melee weapons
  // OR gains reduced cooldown on weapon skills.
  // Reinforces Warrior’s identity as the "pure weapon user".
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