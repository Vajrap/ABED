# Attribute Expansion Recommendations

Based on analysis of the skill system and current attribute usage, here are specific recommendations for expanding the use of underutilized attributes.

## CONTROL - Precision & Spell Mastery

**Current Usage:** 90% hit chance, 10% MP regen, 2 save DCs

**Philosophy:** CONTROL = **Precision/Accuracy/Mastery**, not raw power
- **PLANAR** = Magical power, damage, spell effectiveness
- **CONTROL** = Precision, accuracy, consistency, mastery

**Recommended Additional Uses (Balanced):**

### 1. Save DCs (Selective - Precision-Based Only)
Control should affect save DCs for effects that require **precision/targeting**, not raw power:
- **Corruption** (already uses Control) ✅ - Precision in applying corruption
- **Vine Whip**: Change from DC7 to `DC7 + control mod` - Precise vine targeting

**Keep PLANAR for power-based save DCs:**
- **Fire Bolt/Ball/Burning Hand**: Keep `planar mod` - Raw fire power forces save
- **Earthshatter**: Keep DC8/12 or use `str mod` - Raw physical force
- **Bash**: Keep `str mod` - Raw strength forces stun

**Exception - Curse/Precision Hybrid:**
- **Hex of Rot**: `DC10 + control mod` - Curse requires precision in application, not just raw power

### 2. Buff/Debuff Duration (Selective - Concentration/Maintenance Only)
Control should affect duration only for effects that require **maintaining control/concentration**:
- **Planar Absorption**: Stacks + `control mod / 2` - Requires control to maintain absorption

**Keep base duration for power-based buffs:**
- **Taunt**: Keep base duration - Raw presence/intimidation
- **Rage**: Keep base duration - Raw emotional power
- **Advancing Pace**: Keep base duration - Raw physical discipline
- **Aegis Shield**: Keep base stacks - Divine power, not control


### 5. Skill Effect Scaling (Precision-Based Only)
Control should scale effects that require **precision/mastery**, not raw power:
- **HexOfRot**: DC10 + control mod
- **Meditation**: Healing amount + `control mod / 2` (precise energy control)


## CHARISMA - Social Influence & Presence

**Current Usage:** None

**Recommended Uses:**

### 1. Taunt & Threat Management
- **Taunt duration**: Base + `charisma mod / 2` turns

### 2. Social/Influence Skills (Future/Existing)
<!-- - **Bewitch** (Witch): Save DC = `DC10 + charisma mod` (willpower save) NOT IMPLEMENTED YET-->
<!-- - **Truth Sentence** (Inquisitor): Save DC = `DC10 + charisma mod` (willpower save) NOT IMPLEMENTED YET-->
- **Commander Scream** (MOB): Effectiveness + `charisma mod`

### 3. Party Morale & Coordination
- **War Cry**: Affects more allies based on `charisma mod` (self + `charisma mod` closest allies)
- **Bless**: Number of allies affected + `charisma mod / 2`
- **Mass Heal**: Healing effectiveness + `charisma mod` (represents inspiring presence)

---

## LEADERSHIP - Party Coordination & Command

**Current Usage:** None

**Recommended Uses:**

### 1. Party-Wide Buff Effectiveness
- **War Cry**: Buff strength + `leadership mod / 2` (instead of fixed +2, becomes `+2 + leadership mod / 2`)


### 4. Battlefield Command
- Party initiative bonus: Higher leadership party members act first

---

## VITALITY - Health & Endurance

**Current Usage:** Max HP on level up, 1 skill (Hero's Pose)

**Recommended Additional Uses:**

### 1. HP-Related Skills
- **Hero's Pose**: Already uses vitality ✅
- **Life Drain**: Healing percentage + `vitality mod / 10` (e.g., 50% → 50% + 2% per vitality mod)
- **All Regeneration buffs**: Base healing + `vitality mod` per turn


---

## LUCK - Fortune & Serendipity

**Current Usage:** 100% crit chance

**User Note:** Will be used heavily in crafting, traveling, etc. (outside battle)

**Recommended Battle Uses (to complement existing):**

### 1. Save Success Bonus
- When rolling saves, first roll `d20 + luck mod` as a "luck check"
- If luck check > 15, add `luck mod / 2` (rounded down) to the actual saving throw roll
- Represents "lucky breaks" that help you succeed on saves
- Example: Luck mod +3, luck check rolls 17 → add +1 to save roll


## Notes & Key Distinctions

### CONTROL vs PLANAR (Critical Distinction)
**PLANAR** = **Magical Power**
- Raw damage
- Spell effectiveness
- Power-based save DCs (Fire skills, Hex of Rot)
- Element generation
- "How powerful is your magic?"

**CONTROL** = **Precision/Mastery**
- Hit chance (accuracy) for *MAGIC* attacks
- Precision-based save DCs (Vine Whip, Hex of Rot, Corruption)
- Concentration-based buff maintenance (Planar Absorption)
- Precise energy control (Meditation)
- "How precise/consistent are you with magic?"

**Why this matters:** By keeping CONTROL focused on magic precision and selective save DCs (curse/precision-based), we avoid making it OP while still giving it meaningful uses beyond just hit chance. The distinction between PLANAR (power) and CONTROL (precision) remains clear.

