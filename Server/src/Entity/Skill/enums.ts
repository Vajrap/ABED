export type SkillId =
  | BasicSkillId
  | MobSkillId
  | ClericSkillId
  | SeerSkillId
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

export enum SeerSkillId {}

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

  // Serenity = "Serenity",
  // When taking no damage during a turn, gain a small regen at end of turn.
  // Encourages evasion + flowing playstyle.

  // FluidMotion = "FluidMotion",
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
  HolyRattle = "SpiritRattle",
  ChaoticBlessing = "ChaoticBlessing",
}

export enum BarbarianSkillId {
  Rage = "Rage",
  // Cantrip,
  // Common
  // Can't have Rage Buff
  // Gain Rage for 3 turns (pAtk + 2, pDef and mDef - 2). At lvl5: 4 turns
  // consume 3 SP, produce 1 fire.

  RecklessSwing = "RecklessSwing",
  // Common
  // Multi-hit melee.
  // must have sword axe blade hammer spear barehand
  // 2 hits (3 hits at lvl5), each (0.7×weapon + STR mod) * (1 + 0.1 * skill level) * (positionModifier) damage = weapon damage type , -3 hit roll.
  // consume 4 SP 1 fire, produce 1 neutral

  Earthshatter = "Earthshatter",
  // Uncommon
  // AoE front row.
  // 1d8 + STR mod (1d10 at lvl5).
  // Enemies roll DC10 (DC12 lvl5) Fort save or Dazed 1 turn.
  // consume 5 SP 1 fire, produce 1 earth.
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
}

export enum GuardianSkillId {
  Taunt = "Taunt",
  HerosPose = "HerosPose",
  ShieldUp = "ShieldUp",
  Bash = "Bash",
}

export enum PaladinSkillId {
  DivineStrike = "DivineStrike",
  // ACTIVE — A melee attack blessed with holy energy.
  // target one, front first, melee.
  // Must have any weapon but not bow, orb, wand, book,
  // Deal (weapon damage * 1.2 + (str mod) + (will mod)) * (skill level multiplier) * (position modifier) holy damage.
  // If enemy is undead or fiend, deal additional 1d6 holy damage. (1d10 at lvl5)
  // consume 2 order, produce 1 neutral.

  AegisPulse = "AegisPulse",
  // Must have Aegis Pulse buff
  // ACTIVE — Emit a wave of holy light.
  // Healing allies for 1d4 + willpower mod * (1 + 0.1 * skill level) HP.
  // Dealing small holy damage to all enemies. for 1d4 + willpower mod * (1 + 0.1 * skill level) holy damage.
  // consume nothing but will remove Aegis Pulse buff.

  AegisShield = "AegisShield",
  // Active - Activate Aegis Shield for 3 stack (4 at lvl5)
  // Must not have Aegis Shield buff
  // Aegis Shield: each stack can mitigate 5 + (willpower mod) points of incoming damage.
  // example, (will power mod = 0), taking 5 damage: Aegis shield will mitigate 5 damage and decrease 1 stack.
  // Taking 7 damage: Aegis shield will mitigate 7 damage and decrease 2 stack.
  // When Aegis Shield is depleted, add Aegis Pulse buff for 1 turn.
  // consume 3 order, produce 1 neutral.
}

export enum DruidSkillId {
  VineWhip = "VineWhip",
  // Deal 1d6 + (willpower mod) * (1 + 0.1 * skill level) nature damage.
  // target roll DC7 endurance save or get entangled for 1 turn.
  // Entangled: when take turns, must roll DC10 strength save or skip the turn.
  // produce 1 earth.

  ThrowSpear = "ThrowSpear",
  // Must equip Spear
  // rare
  // deal damage based on range.
  // if front - front 0.8 + skillLevel
  // if front - back 1.2 + skillLevel
  // if back - back 1.6 + skillLevel
  // Note that this skill don't have level multiplier but add the level into damage directly.
  // at level 5, based range damage added 0.2 times (1.0, 1.4, 1.8)
  // consume 2 neutral, produce 1 earth.

  RejuvenatingMist = "RejuvenatingMist",
  // Rare
  // Release a gentle natural mist around the party.
  // All allies gain Regen buff for 2 turns: the perm value will be used for remember will mod: restore (1d4 + WIL mod) HP at the start of their turn.
  // At level 5, lasts 3 turns. at level 7 will mod remember + 2
  // consume 4 MP, produce 1 earth
}

export enum MonkSkillId {
  PalmStrike = "PalmStrike",
  // ACTIVE — A precise melee strike using internal force.
  // target one, front first, melee.
  // Must equip barehand.
  // deal 1d6 + (str | dex mod whichever higher) * (position modifier) blunt damage.
  // Each level ignore 1 point of armor.
  // at level 5 damage dice = 1d8
  // produce 1 wind.
  // If armor is NOT cloth, damageOutput reduce by 70%.

  Meditation = "Meditation",
  // Restore 1d4 + skillLevel to HP or MP or SP, whichever is lowest (in percent).
  // produce 1 order.

  FlurryOfBlows = "FlurryOfBlows",
  // ACTIVE — Perform a flurry of rapid blows.
  // target one, front first, melee.
  // Must equip barehand.
  // Deal 2 hits (3 hits at lvl5) of damage *FROM* Palm Strike level that one self had,
  // (Palm Strike level can be check from character.skills + character.activeSkills + character.conditionalDeck, I think)
  // If no palm strike, damage = 1d4 + (str | dex mod whichever higher) * (position modifier) blunt damage.
  // consume 2 wind, produce 1 neutral.
  // If armor is NOT cloth, damageOutput reduce by 70%.
}

export enum WarlockSkillId {
  ChaosBolt = "ShadowBolt",
  // ACTIVE — Launch a bolt of condensed shadow energy.
  // Ranged single-target magic damage with a small chance to weaken the target.
  // Basic Warlock nuke.

  LifeDrain = "LifeDrain",
  // ACTIVE — Drain vitality from an enemy.
  // Deals damage and restores a portion of HP to the Warlock.
  // Core sustain tool.

  Corruption = "Corruption",
  // ACTIVE — Corrupt the target with dark energy.
  // Deals immediate damage and applies multiple debuffs.
  // DOT/Debuff application tool.

  DarkPact = "DarkPact",
  // ACTIVE — Ultimate-ish.
  // Sacrifice a portion of your HP to greatly enhance damage for a few turns
  // OR to instantly unleash a high-damage shadow burst.
  // High-risk, high-reward signature Warlock move.
}

export enum DuelistSkillId {
  PreciseStrike = "PreciseStrike",
  // ACTIVE — Execute a precise blade strike with perfect timing.
  // Basic precision attack, generates wind element.
  // Uses CONTROL for precision (expanded attribute).

  ParryRiposte = "ParryRiposte",
  // ACTIVE — Assume defensive stance, ready to parry and counter.
  // Defensive counter-attack with reactive mechanics.
  // Uses CONTROL for precision timing (expanded attribute).

  BladeFlurry = "BladeFlurry",
  // ACTIVE — Unleash a rapid flurry of blade strikes.
  // Multi-hit combo for fast damage application.

  DuelingStance = "DuelingStance",
  // ACTIVE — Adopt a focused dueling stance, enhancing precision.
  // Setup buff that enhances combat effectiveness.
  // Uses CONTROL and AGILITY (expanded attributes).
}

export enum WitchSkillId {
  PoisonDart = "CurseBolt", // Too bland, we have so much fire bolt arcane bolt shadow bolt, I think should be a bit weirder, maybe small true damage and can curse with low DC?
  // ACTIVE — Launch a bolt of cursed energy at the target.
  // Basic curse attack, generates chaos element.
  // Uses INTELLIGENCE for damage, CONTROL for save DC (precision in curse application).

  ChaosBrand = "CurseMark",
  // ACTIVE — Place a hex sigil on a target, marking them for increased suffering.
  // Setup skill that amplifies damage from all sources.
  // Uses INTELLIGENCE for strategic advantage (knowledge of weak points).
  // Good idea, but seems like we need a new buff again? can we just use the existing ones?

  ChaosBinding = "HexDoll",
  // ACTIVE — Bind a target to a small effigy, creating a sympathetic link.
  // Voodoo doll mechanic with damage over time.
  // Uses INTELLIGENCE for damage, CONTROL for save DC (precision in hex application).

  Bewitch = "Bewitch",
  // ACTIVE — Influence an enemy's mind with witchcraft, causing confusion.
  // Mind control and battlefield disruption.
  // Uses CONTROL for save DC (precision in mind control), INTELLIGENCE for strategic advantage.
  // Might need to fix the getTarget method to receive more atgument.
  // getTarget(actor, actorParty, targetParty, targetType: 'ally' | 'enemy' | 'any') so chooding target with charc means the character needs to roll will power saves or target wrong part
}

export enum InquisitorSkillId {
  RadiantSmite = "RadiantSmite",
  // ACTIVE — Launch a focused blast of radiant energy.
  // Basic holy damage nuke, generates order element.
  // Deals 1d6 + (WIL + PLANAR)/2 holy damage. DC8 + control mod willpower save for Exposed.
  // +1d4 bonus damage against undead/fiends. 1d8 at level 5.

  ExposeWeakness = "ExposeWeakness",
  // ACTIVE — Reveal the enemy's wrongdoing or impurity.
  // Setup skill that applies Exposed debuff. Consumes order, produces fire.
  // Marked enemies take +1d3 damage from all sources. -2 crit defense at level 5.
  // Inquisitor gains +WIL mod/2 hit against exposed enemies.

  PurgeMagic = "PurgeMagic",
  // ACTIVE — Attempt to forcibly remove magical buffs from a target.
  // DC10 + control mod willpower save. Failed: remove 1-2 buffs + deal holy damage.
  // Passed: deal half holy damage. Consumes fire, produces order.

  JudgmentDay = "JudgmentDay",
  // ACTIVE — Call down a concentrated pillar of radiant force.
  // Big holy damage nuke: 2d6 + (WIL + PLANAR) * (1 + 0.15 * skill level).
  // +50% damage if target has Exposed. +1d8 against undead/fiends.
  // Consumes 2 order + 1 fire, produces neutral. 2d8 at level 5.
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

export enum EngineerSkillId {}

export enum NomadSkillId {}
