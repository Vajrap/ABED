# Complete Attribute Usage Summary

## Overview
This document summarizes how each character attribute is used across the entire game system, not just in battle.

---

## STRENGTH
**Battle/Skills:**
- Physical damage calculations (10+ instances across Warrior, Barbarian, Knight, Monk, Paladin skills)
- Save DCs for stun/bash effects (DC8 + str mod)
- Weapon physical damage (via `weapon.physicalDamageStat`)
- Buffs: Advancing Pace (+2 STR), War Cry (+2 STR)
- Entangled debuff save (DC10 strength save to avoid skipping turn)

**System:**
- Battle attribute training (random training after battle)
- Race base stats (Orc: 11, Dwarf: 10, others: 8)

**Usage Diversity:** Moderate - primarily damage, some saves and buffs

---

## DEXTERITY
**Battle/Skills:**
- Physical damage calculations (5 instances: Rogue skills, Monk skills)
- Weapon physical hit chance (via `weapon.physicalHitStat`)
- Weapon physical damage (for dex-based weapons like daggers, scimitars, javelins)
- Backstab damage scaling
- Hiding skill effectiveness

**System:**
- Battle attribute training
- Race base stats (Goblin: 9, others: 8-9)

**Usage Diversity:** Moderate - damage and hit chance for dex-based builds

---

## INTELLIGENCE
**Battle/Skills:**
- **Skill learning progress bonus** (`statMod(intelligence/2)` added to learning progress)
- Save DCs (Shadow Bolt: DC8 + int mod)
- Hiding detection (enemy intelligence vs hiding)
- Spell Parry buff (intelligence mod affects parry)
- Planar Absorption buff (intelligence mod adds stacks)
- Cognitive Overload damage

**System:**
- Battle attribute training
- Race base stats (Elven: 10, others: 8)

**Usage Diversity:** Low - mostly skill learning and a few niche mechanics

---

## WILLPOWER
**Battle/Skills:**
- **Healing calculations** (13+ instances: Cleric, Druid, Paladin skills)
- Damage calculations (Life Drain, some other skills)
- Save DCs (many willpower saves)
- Buff effects (Regen stores willpower mod, Aegis Shield mitigation: 5 + willpower mod)
- Turn Undead instant kill save
- Bless skill element generation save
- Spirit Rattle healing

**System:**
- Battle attribute training
- Race base stats (Dwarf: 10, Orc/Elven: 9, others: 8)

**Usage Diversity:** High - healing, damage, saves, buff effects

---

## PLANAR
**Battle/Skills:**
- **Magic damage calculations** (14+ instances: all mage/warlock/shaman skills)
- Save DCs (many planar-based save DCs)
- **Magic resistance** (target's planar mod + planarAptitude affects magic damage)
- **Spell effectiveness** (caster's planarAptitude affects magic damage)
- Weapon magical damage (via `weapon.magicalDamageStat`)
- Element generation (system-level, affects resource replenishment)

**System:**
- Battle attribute training
- Race base stats (Elven: 10, others: 8)
- Planar Aptitude system (separate from attribute)

**Usage Diversity:** High - core magic stat, damage, saves, resistance

---

## CONTROL
**Battle/Skills:**
- **Hit chance** (20 instances: almost ALL skills use controlMod for hit) - **90% of usage**
- **MP regeneration** (`manaDice + controlMod - armorPenalty`)
- Save DCs (2 instances: Corruption DC10 + controlMod)
- Weapon magical hit chance (via `weapon.magicalHitStat`)

**System:**
- Battle attribute training
- Race base stats (Human/Halfling/Elven: 9, others: 7-8)

**Usage Diversity:** Very Low - 90% hit chance, 10% MP regen and save DCs

---

## LUCK
**Battle/Skills:**
- **Crit chance** (19 instances: almost ALL skills use luckMod for crit) - **100% of usage**
- Weapon physical/magical crit (via `weapon.physicalCritStat`/`magicalCritStat`)

**System:**
- Battle attribute training
- Race base stats (Halfling: 11, others: 8-9)

**Usage Diversity:** Very Low - 100% crit chance only

---

## AGILITY
**Battle/Skills:**
- **Dodge chance** (`statMod(agility)` added to dodge)
- **AB gauge increment** (DC10 + agility mod for turn order)
- Buffs/Debuffs: War Cry (+2), Haste (+value), Slow (-value), Fear (-value), Mist Step (restore)

**System:**
- Battle attribute training
- Race base stats (Goblin/Halfling: 9, others: 8)
- Can be mutated by buffs/debuffs

**Usage Diversity:** Moderate - dodge, turn order, movement effects

---

## ENDURANCE
**Battle/Skills:**
- **SP regeneration** (`staminaDice + enduranceMod - armorPenalty`)
- **Crit defense** (`statMod(endurance)` used as critDefense)
- **Physical defense** (`statMod(endurance)` added to pDEF)
- Save DCs (many endurance saves: burn, stun, bleed, entangled, etc.)
- Hexed debuff (reduces endurance by 2)

**System:**
- Battle attribute training
- Race base stats (Dwarf: 11, Orc: 10, others: 8)
- Can be mutated by debuffs

**Usage Diversity:** High - defense, regen, saves

---

## VITALITY
**Battle/Skills:**
- Hero's Pose skill (`statMod(vitality) + skillLevel` for healing)

**System:**
- Battle attribute training
- Race base stats (Orc: 10, others: 8-9)

**Usage Diversity:** Very Low - only 1 skill uses it

---

## CHARISMA
**Battle/Skills:**
- None in battle/skills

**System:**
- Battle attribute training
- Race base stats (Human: 10, others: 7-9)

**Usage Diversity:** None - not used in any game mechanics

---

## LEADERSHIP
**Battle/Skills:**
- None in battle/skills

**System:**
- Battle attribute training
- Race base stats (Human: 10, Orc/Dwarf: 9, others: 6-8)

**Usage Diversity:** None - not used in any game mechanics

---

## SUMMARY BY USAGE DIVERSITY

### High Diversity (Multiple Systems):
- **WILLPOWER**: Healing, damage, saves, buff effects
- **PLANAR**: Magic damage, saves, resistance, effectiveness
- **ENDURANCE**: Defense, regen, saves

### Moderate Diversity:
- **STRENGTH**: Damage, saves, buffs
- **DEXTERITY**: Damage, hit chance
- **AGILITY**: Dodge, turn order, movement

### Low Diversity:
- **INTELLIGENCE**: Skill learning, few niche mechanics
- **CONTROL**: Hit chance (90%), MP regen (10%)
- **LUCK**: Crit chance (100%)

### Very Low/No Usage:
- **VITALITY**: Only 1 skill
- **CHARISMA**: No usage
- **LEADERSHIP**: No usage

---

## Key Observations

1. **CONTROL is extremely narrow**: Used almost exclusively for hit chance (90% of instances), with only MP regen and 2 save DCs as other uses.

2. **LUCK is also very narrow**: Used exclusively for crit chance.

3. **CHARISMA and LEADERSHIP are completely unused** in game mechanics despite being trainable attributes.

4. **VITALITY is nearly unused** - only appears in one skill.

5. **INTELLIGENCE is underutilized** - primarily used for skill learning, with few battle applications.

6. **WILLPOWER, PLANAR, and ENDURANCE** have the most diverse usage across multiple systems.

