# Witch Skill Design

## Class Theme
Strategic curse and hex application, debuff stacking, battlefield control. Primary attributes: **INTELLIGENCE** (magical knowledge, damage), **CONTROL** (precision in curse application, save DCs).

## Weapon Requirement
No specific weapon requirement (spellcaster).

## Element Philosophy
- **Chaos**: Curses, hexes, dark magic
- **Water**: Poison, corruption, lingering effects
- **Neutral**: General witchcraft, utility

---

## 1. Curse Bolt (Common)
**Role**: Basic curse attack, element generator

**Consume**: 2 MP  
**Produce**: 1 chaos

**Description**:  
Launch a bolt of cursed energy at the target. Deals 1d6 + INT mod * (1 + 0.1 * skill level) dark damage. Target rolls DC8 + control mod willpower save or gets cursed for 2 turns (3 at level 5). At level 5, damage increases to 1d8.

**Mechanics**:
- No weapon requirement
- Damage: `1d6 (1d8 at level 5) + INT mod * skillScalar`
- Save DC: `DC8 + control mod` willpower save
- Effect: Apply `Cursed` debuff on failed save
- Duration: 2 turns (3 at level 5)
- Single target, any range
- Uses INTELLIGENCE for damage (magical knowledge)
- Uses CONTROL for save DC (precision in curse application)

**Why**: Basic attack that generates chaos. Uses both INT (damage) and CONTROL (save DC) as primary attributes. Sets up element rotation.

---

## 2. Curse Mark (Uncommon)
**Role**: Setup skill, damage amplifier

**Consume**: 2 MP, 1 chaos  
**Produce**: 1 water

**Description**:  
Place a hex sigil on the target, marking them for increased suffering. Target gets Exposed debuff for 2 turns (3 at level 5). Marked enemies take +1d3 damage from all sources. At level 5, also gain -2 to critical defense. Additionally, the Witch gains +INT mod/2 to hit rolls against marked enemies.

**Mechanics**:
- No weapon requirement
- Apply `Exposed` debuff for 2-3 turns
- `permValue = 1` if skill level >= 5 (for -2 crit defense)
- Store INT mod in debuff for hit bonus calculation
- Single target
- Uses existing Exposed debuff
- Uses INTELLIGENCE for strategic marking (knowledge of weak points)

**Why**: Core setup skill. Consumes chaos from Curse Bolt, produces water. Creates damage amplification synergy. Uses INT for strategic advantage.

---

## 3. Hex Doll (Common)
**Role**: Voodoo doll mechanic, indirect damage

**Consume**: 3 MP, 1 water  
**Produce**: 1 neutral

**Description**:  
Bind a target to a small effigy, creating a sympathetic link. Deals 1d4 + INT mod * (1 + 0.1 * skill level) dark damage immediately. Target rolls DC10 + control mod willpower save or gets hexed for 2 turns (3 at level 5). While hexed, the target takes 1d3 dark damage at the start of each turn. At level 5, also applies cursed debuff.

**Mechanics**:
- No weapon requirement
- Immediate damage: `1d4 + INT mod * skillScalar`
- Save DC: `DC10 + control mod` willpower save
- Effect: Apply `Hexed` debuff on failed save
- Additional effect: Hexed deals 1d3 damage per turn (implemented in hexed resolver)
- At level 5: Also apply `Cursed` debuff
- Duration: 2 turns (3 at level 5)
- Single target
- Uses INTELLIGENCE for damage (magical knowledge)
- Uses CONTROL for save DC (precision in hex application)

**Why**: Classic voodoo doll mechanic. Consumes water from Curse Mark, produces neutral. Creates damage over time. Uses both INT and CONTROL.

---

## 4. Bewitch (Uncommon)
**Role**: Mind control, battlefield disruption

**Consume**: 3 MP, 1 neutral  
**Produce**: 1 chaos

**Description**:  
Influence an enemy's mind with witchcraft, causing confusion and disorientation. Target rolls DC10 + control mod willpower save. If failed, target gets Dazed debuff for 1 turn (2 at level 5). Dazed reduces hit chance by 2. At level 5, also applies hexed debuff and dazed has a chance to cause the target to skip their turn. Additionally, the Witch gains +INT mod/2 to all save DCs against bewitched targets for 2 turns.

**Mechanics**:
- No weapon requirement
- Save DC: `DC10 + control mod` willpower save
- Effect: Apply `Dazed` debuff on failed save
- Duration: 1 turn (2 at level 5)
- At level 5: Also apply `Hexed` debuff
- Self-buff: Gain "Witch's Focus" buff for 2 turns
  - Increases save DCs by INT mod/2 against bewitched target
  - Store target ID in buff
- Single target
- Uses CONTROL for save DC (precision in mind control)
- Uses INTELLIGENCE for strategic advantage (increased DCs)

**Why**: Mind control/disruption skill. Consumes neutral from Hex Doll, produces chaos. Creates battlefield control. Uses both INT and CONTROL. May need new "Witch's Focus" buff or reuse existing.

---

## Element Rotation Analysis

### Sustainable Rotation:
1. **Curse Bolt** (2 MP → 1 chaos) - Generate chaos
2. **Curse Mark** (1 chaos, 2 MP → 1 water) - Convert chaos to water
3. **Hex Doll** (1 water, 3 MP → 1 neutral) - Convert water to neutral
4. **Bewitch** (1 neutral, 3 MP → 1 chaos) - Convert neutral to chaos
5. Repeat from step 2

### Alternative Rotation:
- Skip Bewitch: Curse Bolt → Curse Mark → Hex Doll → repeat
- Use Bewitch when MP available for battlefield control

### Element Flow:
- **Chaos → Water → Neutral → Chaos**: Core rotation
- Self-sustaining with MP costs
- Bewitch is situational but powerful control

---

## Attribute Usage

### INTELLIGENCE (Primary):
- Curse Bolt: Damage
- Curse Mark: Hit bonus against marked enemies
- Hex Doll: Damage
- Bewitch: Save DC bonus against bewitched targets

### CONTROL (Primary):
- Curse Bolt: Save DC (precision in curse application)
- Hex Doll: Save DC (precision in hex application)
- Bewitch: Save DC (precision in mind control)

### Secondary Attributes:
- Willpower: May be used for some effects
- Planar: Not primary, but may affect some calculations

---

## Skill Synergy

1. **Curse Mark → Any Attack**: Marked enemies take increased damage
2. **Hex Doll → Turn Damage**: Hexed deals damage over time
3. **Bewitch → Control**: Dazed enemies may skip turns
4. **Multiple Debuffs**: Stacking cursed, hexed, exposed, dazed for maximum effect
5. **Witch's Focus**: Increased save DCs against bewitched targets

---

## New Buff/Debuff Needed

### Witch's Focus Buff (Optional)
- Duration-based buff
- Increases save DCs by INT mod/2 against specific target
- Store target ID in permValue
- Implemented in damageResolution or skill execution

Alternatively, can use existing buffs or implement the DC bonus directly in skill execution.

---

## Tier Distribution
- **Common**: Curse Bolt, Hex Doll (basic attacks)
- **Uncommon**: Curse Mark, Bewitch (setup/control)

This gives 2 common skills for basic gameplay and 2 uncommon for advanced witchcraft tactics.

---

## Key Design Decisions

1. **INT for Damage, CONTROL for Save DCs**: 
   - INTELLIGENCE represents magical knowledge and power
   - CONTROL represents precision in applying curses/hexes
   - This distinguishes Witch from Warlock (which uses PLANAR for power)

2. **Debuff Stacking Focus**:
   - Multiple skills apply different debuffs
   - Curse Mark amplifies damage from all sources
   - Hex Doll provides damage over time
   - Bewitch provides battlefield control

3. **Element Rotation**:
   - Sustainable chaos → water → neutral → chaos cycle
   - Each skill consumes and produces elements
   - Allows for flexible rotation based on MP availability

4. **Strategic vs Raw Power**:
   - Witch is about setup and payoff
   - Curse Mark sets up for increased damage
   - Hex Doll and Bewitch provide ongoing effects
   - Less burst damage, more sustained pressure

