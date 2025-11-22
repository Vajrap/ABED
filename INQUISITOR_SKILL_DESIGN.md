# Inquisitor Skill Design

## Class Theme
Aggressive holy magic damage dealer, zealous purifier. Uses order and fire elements to deal holy damage. Primary attributes: **WILLPOWER** (holy power, damage), **PLANAR** (magic power), **CONTROL** (precision, save DCs).

## Weapon Requirement
No specific weapon requirement (spellcaster, but can use weapons).

## Element Philosophy
- **Order**: Divine authority, holy power
- **Fire**: Purifying flame, zealous intensity
- **Holy Damage**: Combination of order + fire (conceptual)
- Focus on aggressive magic damage dealing

---

## 1. Radiant Smite (Common)
**Role**: Basic holy damage nuke, element generator

**Consume**: 2 MP, no elements  
**Produce**: 1 order

**Description**:  
Launch a focused blast of radiant energy. Deals 1d6 + (willpower mod + planar mod)/2 * (1 + 0.1 * skill level) holy damage. Target rolls DC8 + control mod willpower save or gets Exposed debuff for 2 turns (3 at level 5). At level 5, damage increases to 1d8. Deals +1d4 bonus damage against undead/fiends.

**Mechanics**:
- No weapon requirement
- Damage: `1d6 (1d8 at level 5) + (WIL + PLANAR)/2 * skillScalar`
- Save DC: `DC8 + control mod` willpower save
- Effect: Apply `Exposed` debuff on failed save
- Bonus damage: +1d4 against undead/fiends
- Duration: 2 turns (3 at level 5)
- Single target, any range
- Uses WILLPOWER + PLANAR for damage (holy + magic power)
- Uses CONTROL for save DC (precision)

**Why**: Basic attack that generates order. Uses both WIL (holy) and PLANAR (magic) as primary attributes. Sets up element rotation. Aggressive damage dealer.

---

## 2. Expose Weakness (Uncommon)
**Role**: Setup skill, damage amplifier

**Consume**: 2 MP, 1 order  
**Produce**: 1 fire

**Description**:  
Reveal the enemy's wrongdoing or impurity. Target gets Exposed debuff for 2 turns (3 at level 5). Marked enemies take +1d3 damage from all sources. At level 5, also gain -2 to critical defense. Additionally, the Inquisitor gains +willpower mod/2 to hit rolls against exposed enemies for the duration.

**Mechanics**:
- No weapon requirement
- Apply `Exposed` debuff for 2-3 turns
- `permValue = 1` if skill level >= 5 (for -2 crit defense)
- Store willpower mod in debuff for hit bonus calculation
- Single target
- Uses existing Exposed debuff
- Uses WILLPOWER for strategic marking (divine insight)

**Why**: Core setup skill. Consumes order from Radiant Smite, produces fire. Creates damage amplification synergy. Uses WIL for divine insight.

---

## 3. Judgment Day (Uncommon)
**Role**: Big holy damage nuke, finisher

**Consume**: 4 MP, 2 order, 1 fire  
**Produce**: 1 neutral

**Description**:  
Call down a concentrated pillar of radiant force. Deals 2d6 + (willpower mod + planar mod) * (1 + 0.15 * skill level) holy damage to single target. If target has Exposed debuff, deal +50% damage. Against undead/fiends, deal +1d8 bonus damage. At level 5, damage increases to 2d8 base.

**Mechanics**:
- No weapon requirement
- Damage: `2d6 (2d8 at level 5) + (WIL + PLANAR) * (1 + 0.15 * skill level)`
- Bonus: +50% damage if target has Exposed
- Bonus: +1d8 against undead/fiends
- Single target
- Uses WILLPOWER + PLANAR for damage (holy + magic power)
- High MP cost, consumes both order and fire

**Why**: Big nuke that consumes accumulated resources. Rewards setup with Expose Weakness. Devastating finisher with thematic zeal. Aggressive damage dealer.

---

## 4. Purge Magic (Uncommon)
**Role**: Anti-mage tool, buff removal + damage

**Consume**: 3 MP, 1 fire  
**Produce**: 1 order

**Description**:  
Attempt to forcibly remove magical buffs from a target. Target rolls DC10 + control mod willpower save. If failed, remove 1-2 random buffs and deal 1d4 + willpower mod * (1 + 0.1 * skill level) holy damage. If successful (save passed), still deal 1d2 + willpower mod/2 holy damage. At level 5, remove 2-3 buffs on failed save.

**Mechanics**:
- No weapon requirement
- Save DC: `DC10 + control mod` willpower save
- On failed save: Remove 1-2 buffs (2-3 at level 5) + deal full damage
- On passed save: Deal half damage
- Damage: `1d4 + WIL mod * skillScalar` (full) or `1d2 + WIL mod/2` (half)
- Single target
- Uses CONTROL for save DC (precision in purging)
- Uses WILLPOWER for damage (holy power)

**Why**: Anti-mage tool. Consumes fire from Expose Weakness, produces order. Creates sustainable rotation. Removes buffs while dealing damage. Aggressive utility.

---

## Element Rotation Analysis

**Rotation**: Order → Fire → Order (sustainable)
1. **Radiant Smite** (0 elements → 1 order): Generate order
2. **Expose Weakness** (1 order → 1 fire): Convert order to fire
3. **Purge Magic** (1 fire → 1 order): Convert fire back to order
4. **Judgment Day** (2 order + 1 fire → 1 neutral): Big nuke, uses accumulated resources

**Sustainable Loop**: Radiant Smite → Expose Weakness → Purge Magic → (repeat)
**Burst Combo**: Expose Weakness → Judgment Day (uses Exposed for +50% damage)

---

## Attribute Usage
- **WILLPOWER**: Primary damage attribute (holy power)
- **PLANAR**: Secondary damage attribute (magic power)
- **CONTROL**: Save DCs (precision in judgment/purging)

---

## Skill Synergy
1. **Radiant Smite** → **Expose Weakness**: Basic attack applies Exposed, setup skill enhances it
2. **Expose Weakness** → **Judgment Day**: Setup enables +50% damage on big nuke
3. **Expose Weakness** → **Purge Magic**: Fire element rotation
4. **Purge Magic** → **Radiant Smite**: Order element rotation

---

## Tier Distribution
- **Common**: Radiant Smite (basic attack)
- **Uncommon**: Expose Weakness, Purge Magic, Judgment Day (setup, utility, finisher)

---

## Key Design Decisions
1. **Aggressive Magic Damage**: All skills deal holy magic damage
2. **Element Rotation**: Sustainable order ↔ fire rotation
3. **Setup Synergy**: Expose Weakness enables Judgment Day bonus
4. **Anti-Mage**: Purge Magic removes buffs while dealing damage
5. **Undead/Fiend Bonus**: Multiple skills deal bonus damage to evil targets
6. **Dual Attributes**: WIL + PLANAR for damage, CONTROL for precision

