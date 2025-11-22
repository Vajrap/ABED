# Duelist Skill Design

## Class Theme
1v1 precision combat, finesse dueling, parry/riposte. Primary attributes: **DEX** (finesse damage), **CONTROL** (precision timing), **AGILITY** (dueling footwork).

## Weapon Requirement
All offensive skills require **blade**.

## Element Philosophy
- **Wind**: Speed, precision, finesse
- **Fire**: Intensity, passion, dueling spirit
- **Neutral**: Balance, technique

---

## 1. Precise Strike (Common)
**Role**: Basic precision attack, element generator

**Consume**: 2 SP  
**Produce**: 1 wind

**Description**:  
Execute a precise blade strike with perfect timing. Deals weapon damage + DEX mod * (1 + 0.1 * skill level) slash damage. +control mod to hit roll. At level 5, damage increases to 1.2x weapon damage and gains +2 crit.

**Mechanics**:
- Require: blade
- Damage: `weapon + DEX mod * skillScalar`
- Hit: `d20 + control mod + proficiency` (precision timing)
- Crit: `d20 + luck mod` (base), +2 at level 5
- At level 5: `1.2x weapon` instead of `1.0x`
- Single target, melee (front-front preferred)
- Uses position modifier

**Why**: Basic attack that generates wind. Uses CONTROL for precision (expanded attribute). Sets up element rotation.

---

## 2. Parry & Riposte (Uncommon)
**Role**: Defensive counter-attack, reactive skill

**Consume**: 1 wind, 2 SP  
**Produce**: 1 fire

**Description**:  
Assume a defensive stance, ready to parry and counter. Gain Parry buff for 1 turn (2 turns at level 5). When attacked, roll DC10 + control mod willpower save. If passed, negate the attack and deal 1d6 + DEX mod * (1 + 0.1 * skill level) slash damage back to the attacker. Then remove Parry buff.

**Mechanics**:
- Require: blade
- Apply `Parry` buff (new buff needed, or reuse existing)
- On being attacked: DC10 + control mod willpower save
- Success: Negate attack, counter-attack for `1d6 + DEX mod * skillScalar`
- Fail: Take damage normally, remove buff
- Duration: 1 turn (2 at level 5)
- Uses CONTROL for save DC (precision timing)

**Why**: Defensive option with counter-attack. Consumes wind from Precise Strike, produces fire. Uses CONTROL for precision timing (expanded attribute).

---

## 3. Blade Flurry (Common)
**Role**: Multi-hit combo, fast damage

**Consume**: 2 SP, 1 fire  
**Produce**: 1 neutral

**Description**:  
Unleash a rapid flurry of blade strikes. Deal 2 hits (3 at level 5) of 1d4 + DEX mod * (1 + 0.1 * skill level) slash damage. Each hit benefits from position modifier. Targets can be the same or different.

**Mechanics**:
- Require: blade
- 2 hits (3 at level 5)
- Damage per hit: `1d4 + DEX mod * skillScalar`
- Each hit applies position modifier
- Targets selected randomly, can repeat
- Each hit rolls hit/crit separately
- Fast application of damage

**Why**: Multi-hit option that benefits from setup. Consumes fire from Parry & Riposte, produces neutral. Creates sustainable rotation.

---

## 4. Dueling Stance (Uncommon)
**Role**: Setup buff, combat enhancement

**Consume**: 2 MP, 1 neutral  
**Produce**: 1 wind

**Description**:  
Adopt a focused dueling stance, enhancing your precision. Gain Dueling Stance buff for 2 turns (3 at level 5). While active: +control mod/2 to hit rolls, +agility mod/2 to dodge. At level 5, also gain +2 crit.

**Mechanics**:
- No weapon requirement (stance)
- Apply `Dueling Stance` buff (new buff needed)
- Duration: 2 turns (3 at level 5)
- Effects: +control mod/2 hit, +agility mod/2 dodge
- At level 5: +2 crit
- Store mods in permValue or apply directly
- Single target (self)

**Why**: Setup skill that enhances precision. Consumes neutral from Blade Flurry, produces wind. Uses CONTROL and AGILITY (expanded attributes). Creates self-buff synergy.

---

## Element Rotation Analysis

### Sustainable Rotation:
1. **Precise Strike** (2 SP → 1 wind) - Generate wind
2. **Parry & Riposte** (1 wind, 2 SP → 1 fire) - Convert wind to fire
3. **Blade Flurry** (1 fire, 2 SP → 1 neutral) - Convert fire to neutral
4. **Dueling Stance** (1 neutral, 2 MP → 1 wind) - Convert neutral to wind
5. Repeat from step 2

### Alternative Rotation:
- Skip Dueling Stance: Precise Strike → Parry & Riposte → Blade Flurry → repeat
- Use Dueling Stance when MP available for enhanced precision

### Element Flow:
- **Wind → Fire → Neutral → Wind**: Core rotation
- Self-sustaining with SP/MP costs
- Dueling Stance is situational but powerful setup

---

## Attribute Usage

### DEX (Primary):
- Precise Strike: Damage
- Parry & Riposte: Counter-attack damage
- Blade Flurry: Damage per hit

### CONTROL (Expanded):
- Precise Strike: Hit bonus (precision)
- Parry & Riposte: Save DC (precision timing)
- Dueling Stance: Hit bonus (precision enhancement)

### AGILITY (Expanded):
- Dueling Stance: Dodge bonus (dueling footwork)

### LUCK:
- Precise Strike: Crit (lucky precision)
- Dueling Stance: Crit bonus at level 5

---

## Skill Synergy

1. **Dueling Stance → Any Attack**: Enhanced precision benefits all attacks
2. **Parry & Riposte → Follow-up**: Counter-attack sets up next turn
3. **Precise Strike → Parry & Riposte → Blade Flurry**: Element rotation
4. **Multiple hits + Dueling Stance**: Blade Flurry benefits from enhanced hit chance

---

## New Buff Needed

### Parry Buff
- Duration-based buff
- When attacked: roll willpower save
- Success: negate attack, counter-attack
- Fail: take damage, remove buff
- Implemented in damageResolution or as buff resolver

---

## Tier Distribution
- **Common**: Precise Strike, Blade Flurry (basic attacks)
- **Uncommon**: Parry & Riposte, Dueling Stance (defensive/setup)

This gives 2 common skills for basic gameplay and 2 uncommon for advanced dueling tactics.

