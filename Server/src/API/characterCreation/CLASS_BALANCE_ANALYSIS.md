# Class Balance Analysis at Character Creation

## Summary

This document analyzes the balance of all classes at character creation, examining:
- Number of starting skills
- Skill tier distribution (common, uncommon, rare)
- Starting equipment (armor, weapon, shield)
- Identified imbalances

---

## Starting Skills Analysis

### By Number of Skills

| Skills | Classes | Details |
|--------|---------|---------|
| **1 skill** | 8 classes | Cleric, Mystic, SpellBlade, Knight, Paladin, Druid, Warlock, Inquisitor, Scholar |
| **2 skills** | 11 classes | Seer, Mage, Rogue, Shaman, Barbarian, Warrior, Monk, Duelist, Witch, Engineer, Nomad |
| **3 skills** | 1 class | Guardian |

### By Tier Distribution

| Class | Skills | Tier Breakdown |
|-------|--------|----------------|
| **Cleric** | 1 | Heal (common) |
| **Seer** | 2 | ThreadSnip (uncommon), PlanarEcho (common) |
| **Mage** | 2 | ArcaneBolt (common), FireBolt (common) |
| **Mystic** | 1 | MistStep (common) |
| **Rogue** | 2 | ThrowingKnives (common), RetreatDash (common) |
| **SpellBlade** | 1 | PlanarEdge (common) |
| **Shaman** | 2 | HexOfRot (common), HolyRattle (common) |
| **Barbarian** | 2 | Rage (common), RecklessSwing (common) |
| **Warrior** | 2 | PowerStrike (common), Cleave (common) |
| **Knight** | 1 | PrecisionThrust (uncommon) |
| **Guardian** | 3 | ShieldUp (common), Bash (common), Taunt (common) |
| **Paladin** | 1 | DivineStrike (common) |
| **Druid** | 1 | VineWhip (common) |
| **Monk** | 2 | PalmStrike (common), Meditation (common) |
| **Warlock** | 1 | ChaosBolt (common) |
| **Duelist** | 2 | PreciseStrike (common), BladeFlurry (common) |
| **Witch** | 2 | PoisonDart (common), ChaosBinding (common) |
| **Inquisitor** | 1 | RadiantSmite (common) |
| **Scholar** | 1 | DisruptPattern (common) |
| **Engineer** | 2 | ExplosiveBolt (uncommon), BearTrap (common) |
| **Nomad** | 2 | TacticalSlash (uncommon), AdaptiveStrike (common) |

### Tier Summary

- **Common tier**: 33 skills (82.5%)
- **Uncommon tier**: 7 skills (17.5%)
- **Rare tier**: 0 skills (0%)

Classes with uncommon skills:
- Seer (ThreadSnip)
- Knight (PrecisionThrust)
- Engineer (ExplosiveBolt)
- Nomad (TacticalSlash)

---

## Starting Equipment Analysis

### Armor Types

| Armor Type | Classes | Count |
|------------|---------|-------|
| **MageRobe** | Seer, Mage, Mystic, Warlock, Witch, Inquisitor, Scholar | 7 |
| **Robe** | Cleric, Shaman | 2 |
| **LeatherArmor** | Rogue, SpellBlade, Duelist, Engineer, Nomad | 5 |
| **PaddedArmor** | Warrior | 1 |
| **ChainShirt** | Knight, Guardian | 2 |
| **StuddedLeatherArmor** | Paladin | 1 |
| **HideArmor** | Druid | 1 |
| **Tunic** | Monk | 1 |

### Weapons

| Weapon Type | Classes | Count |
|-------------|---------|-------|
| **Staff** | Cleric, Shaman, Druid | 3 |
| **Orb** | Seer, Mystic, Warlock | 3 |
| **Wand** | Mage, Witch | 2 |
| **Dagger** | Rogue | 1 |
| **Sword** | SpellBlade, Duelist | 2 |
| **Blade** | Warrior, Nomad | 2 |
| **Axe** | Barbarian | 1 |
| **Spear** | Knight | 1 |
| **Hammer** | Guardian, Paladin | 2 |
| **Bow** | Engineer | 1 |
| **Book** | Inquisitor, Scholar | 2 |
| **Bare Hand** | Monk | 1 |

### Shields

| Shield Status | Classes | Count |
|--------------|---------|-------|
| **With Shield** | Knight, Guardian, Paladin, Duelist | 4 |
| **No Shield** | All others | 16 |

---

## Identified Imbalances

### 1. **Guardian Has 3 Starting Skills** ⚠️
- **Issue**: Guardian starts with 3 skills (ShieldUp, Bash, Taunt) while most classes have 1-2
- **Impact**: Guardian has more tactical options at level 1
- **Recommendation**: Consider if this is intentional (tank class needs more tools) or if it should be reduced to 2

### 2. **Tier Distribution Imbalance** ⚠️
- **Issue**: Most classes (16/20) have only common-tier skills, while 4 classes have uncommon skills
- **Impact**: Classes with uncommon skills may have slightly more powerful starting options
- **Note**: This may be intentional design - uncommon skills are still accessible but slightly better

### 3. **Equipment Variety** ✅
- **Status**: Good variety in armor types, weapons, and shield usage
- **Note**: Mage classes (7 classes) all use MageRobe, which is appropriate for their role

### 4. **Skill Count Distribution** ⚠️
- **Issue**: 8 classes have 1 skill, 11 classes have 2 skills, 1 class has 3 skills
- **Impact**: Classes with 1 skill may feel limited at start
- **Recommendation**: Consider if single-skill classes need a second starting skill for better early-game experience

### 5. **No Rare Tier Skills** ✅
- **Status**: No classes start with rare-tier skills, which is appropriate for level 1 characters
- **Note**: This maintains balance and prevents power creep at creation

---

## Recommendations

### High Priority

1. **Review Guardian's 3 Skills**
   - Determine if this is intentional design (tank needs more tools)
   - If not, consider reducing to 2 skills or giving other classes more options

2. **Consider Single-Skill Classes**
   - Classes with only 1 skill: Cleric, Mystic, SpellBlade, Knight, Paladin, Druid, Warlock, Inquisitor, Scholar
   - Evaluate if they need a second starting skill for better early-game experience

### Medium Priority

3. **Tier Distribution Review**
   - Consider if classes with uncommon skills (Seer, Knight, Engineer, Nomad) should have their uncommon skills downgraded to common
   - OR give other classes uncommon skills to balance

4. **Equipment Balance**
   - Review if armor types are balanced (some classes may benefit from better starting armor)
   - Consider if shield users need adjustment (4 classes have shields, 16 don't)

### Low Priority

5. **Documentation**
   - Document design intent for skill count differences
   - Clarify if Guardian's 3 skills are intentional

---

## Balance Score

| Aspect | Score | Notes |
|--------|-------|-------|
| **Skill Count** | 7/10 | Guardian has 3, most have 1-2 |
| **Tier Distribution** | 8/10 | Mostly common, some uncommon |
| **Equipment Variety** | 9/10 | Good variety, appropriate for roles |
| **Overall Balance** | 8/10 | Minor imbalances, mostly well-balanced |

---

## Conclusion

The class balance at character creation is **generally good** with minor imbalances:

✅ **Strengths:**
- No classes start with rare-tier skills
- Good equipment variety
- Most classes have 1-2 skills (reasonable)

⚠️ **Areas for Improvement:**
- Guardian has 3 skills (may be intentional)
- 8 classes have only 1 skill (may feel limited)
- 4 classes have uncommon skills while others have common

**Overall Assessment**: The balance is acceptable for a game with diverse class roles. The imbalances are minor and may be intentional design choices (e.g., Guardian as a tank needs more tools, some classes are simpler to play).

