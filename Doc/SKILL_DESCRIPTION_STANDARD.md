# Skill Description Standardization & FE Rendering Strategy

## 1. BE/FE Text Rendering Analysis

### Current Approach: Plain Text Descriptions
**Pros:**
- ✅ Easy to debug - descriptions visible in BE logs
- ✅ Simple implementation - just send strings
- ✅ Works immediately without FE parsing
- ✅ Human-readable in API responses

**Cons:**
- ⚠️ Bandwidth: ~200-500 bytes per skill (with both EN/TH)
- ⚠️ No structured data for rich UI
- ⚠️ Hard to extract formulas programmatically
- ⚠️ Can't highlight/hover specific terms
- ⚠️ Buff/debuff explanations clutter descriptions

### Recommendation: **Markup-Based Approach**

Use lightweight markup tags that FE parses and renders. BE stays simple, FE handles all rendering logic.

**Benefits:**
- ✅ Simple BE implementation - just strings with markup
- ✅ Still debuggable - markup is human-readable
- ✅ FE has full control over rendering
- ✅ No structured data needed - FE parses tags
- ✅ Bandwidth: ~300-400 bytes/skill (slightly more than plain text, but enables rich UI)
- ✅ Tooltips defined in FE, not BE (single source of truth)

**Bandwidth Comparison:**
- Plain text: ~300 bytes/skill
- Markup text: ~350 bytes/skill (minimal overhead)
- **Recommendation**: Compress with gzip (reduces to ~150-200 bytes)

---

## 2. Formula Terminology Standard

### Standard Terms

| Term | Definition | Example |
|------|------------|---------|
| **STR mod** | Strength modifier | `+3` |
| **DEX mod** | Dexterity modifier | `+2` |
| **WIL mod** | Willpower modifier | `+4` |
| **CHA mod** | Charisma modifier | `+1` |
| **skill level multiplier** | `(1 + 0.1 × skill level)` | At level 3: `1.3` |
| **melee range penalty** | Damage reduction when melee attacking backline while frontline exists | `0.7×` or `0.4×` |
| **position modifier** | Generic term (deprecated, use specific terms) | ❌ Avoid |

### Formula Structure

**Standard Format:**
```
(base damage + stat mod) × skill level multiplier × range modifier
```

**Examples:**
- ✅ `(1d6 + WIL mod) × skill level multiplier`
- ✅ `(0.7 × weapon damage + STR mod) × skill level multiplier × melee range penalty`
- ✅ `1d8 + STR mod` (no multipliers)
- ❌ `1d6 + willpower modifier × (1 + 0.1 × skill level)` (too verbose)

### Position/Range Modifier Clarification

**Problem:** "Position modifier" is vague. It's really about **melee range penalties**.

**Solution:** Use specific terms:
- **Melee range penalty**: Applied when melee weapon attacks backline while frontline exists
  - Front-to-front: `1.0×` (no penalty)
  - Front-to-back (frontline exists): `0.7×` (30% reduction)
  - Back-to-back: `0.4×` (60% reduction)
- **Ranged range penalty**: Different rules for ranged weapons
- **No penalty**: Ranged/magical attacks that ignore positioning

**Implementation Note:** The `getPositionModifier` function already handles this, but descriptions should clarify it's about **melee range**, not just "position".

---

## 3. Markup-Based Description Format

### Markup Tags

#### Color/Highlight Tags

**Color/Highlight Tags (Square Brackets)**
- `[r]text[/r]` - Red highlight (important values, penalties)
- `[g]text[/g]` - Green highlight (bonuses, positive effects)
- `[b]text[/b]` - Blue highlight (neutral info)

**Level Conditional Tags (Curly Braces)**
- `{5}'value_if_level_5+':'value_if_below'{/}` - Level-based value substitution
- `{3}'value_if_level_3+':'value_if_below'{/}` - Shows first value if skill level >= number, otherwise second value
- Examples:
  - `{5}'three':'two'{/}` - "three" at level 5+, "two" otherwise
  - `{3}'1d10':'1d8'{/}` - "1d10" at level 3+, "1d8" otherwise

**Tag System Summary:**
- `[...]` = Color/highlight tags
- `<>` = Easy tags (formula parts, buffs/debuffs)
- `{}` = Level conditionals (skill level progression only)

#### Formula Structure

**Separate Formula Field:**
Instead of embedding formulas in description text, use a separate `formula` field:

```typescript
description: {
  text: L10N,      // Description text with <FORMULA> placeholder
  formula: L10N    // Actual formula string with markup
}
```

**Formula Tags (used in `formula` field):**
- `<WeaponDamage>` - Weapon damage value (tooltip shows current weapon damage)
- `<STRmod>`, `<DEXmod>`, `<WILmod>`, `<CHAmod>` - Stat modifiers (tooltip shows current value)
- `<SkillLevelMultiplier>` - Skill level multiplier (tooltip shows formula and current value)
- `<MeleeRangePenalty>` - Melee range penalty (tooltip explains positioning rules)
- Color tags: `[r]text[/r]`, `[g]text[/g]`, `[b]text[/b]` for highlighting

#### Buff/Debuff Tags
- `<BuffBlessing>`, `<DebuffCurse>`, etc. - Buff/debuff references (FE renders with icon + tooltip)
- Format: `<BuffName>` or `<DebuffName>` (matches enum names)

#### Special Tags
- `<Cooldown:3>` - Cooldown indicator (shows turns) // Depricate, cooldown is in the definition, no need to add to description
- `<Resource:MP:3>` - Resource cost (type and amount)

### Example: Reckless Swing

```typescript
description: {
  text: {
    en: "Swing your weapon recklessly attacking targeted enemy {5}'three':'two'{/} times, \neach dealing <FORMULA>. Hit roll suffer [r]-3[/r] penalty.",
    th: "เหวี่ยงอาวุธฟาดไม่ยั้งใส่เป้าหมาย โจมตีต่อเนื่อง {5}'3':'2'{/} ครั้ง \nแต่ละครั้งสร้างความเสียหาย <FORMULA> ความแม่นยำในการโจมตีลดลง [r]3[/r]",
  },
  formula: {
    en: "(([r]0.7[/r] × <WeaponDamage> + <STRmod>) × <SkillLevelMultiplier>) × <MeleeRangePenalty>",
    th: "(([r]0.7[/r] × <WeaponDamage> + <STRmod>) × <SkillLevelMultiplier>) × <MeleeRangePenalty>",
  },
}
```

### Example: Heal

```typescript
description: {
  text: {
    en: "Cast a healing spell, restore HP to an ally with least HP percentage. Heals for <FORMULA>. {3}\nThen [b]removes one random debuff[/b] from the target.{/}",
    th: "ร่ายเวทย์มนต์รักษา ฟื้นฟู HP ให้กับพันธมิตร รักษา <FORMULA> {3}\nจากนั้น[b]ลบหนึ่งดีบัฟแบบสุ่ม[/b]จากเป้าหมายด้วย{/}",
  },
  formula: {
    en: "(1d6 + <WILmod>) × <SkillLevelMultiplier>",
    th: "(1d6 + <WILmod>) × <SkillLevelMultiplier>",
  },
}
```

**Note:** For text blocks (not just values), you can use `{3}text{/}` without the colon syntax - it shows the text if level >= 3, hides it otherwise.

### Example: Bless

```typescript
description: {
  text: {
    en: "Ask for the Blessing from Laoh, <BuffBlessing> all ally for 2 turns. {5}\nThe user throw DC10 + <WILmod>, if success, gain +1 order.{/},
    th: "อธิษฐานขอการอวยพรจากลาโอห์ เพื่อนร่วมทีมทั้งหมดได้รับสถานะ '<BuffBlessing>' 2 เทิร์น {5}หลังจากใช้ ทอย DC10 + <WILmod> หากผ่านจะได้รับ +1 order{/} <BuffBlessing>: ได้เปรียบในการทอย saving throw",
  },
  // No formula field needed (no damage/healing formula)
}
```

### Example: Earthshatter

```typescript
description: {
  text: {
    en: "Slam the ground with your weapon, sending a shock wave to the enemy line dealing damage all enemy in a line. \nDeals <FORMULA> blunt damage to each target. \nEach target rolls DC8 Endurance save or becomes <DebuffDazed> for 1 turn.",
    th: "กระแทกพื้นด้วยอาวุธอย่างรุนแรง ส่งคลื่นสั่นสะเทือนใส่ศัตรูแถวหน้า \nสร้างความเสียหาย <FORMULA> ให้ศัตรูแถวหน้าทุกคน \nเป้าหมายแต่ละคนทอย Endurance DC8 ไม่ผ่านจะติด <DebuffDazed> 1 เทิร์น",
  },
  formula: {
    en: "({5}'1d10':'1d8'{/} + <STRmod>) × <SkillLevelMultiplier>",
    th: "({5}'1d10':'1d8'{/} + <STRmod>) × <SkillLevelMultiplier>",
  },
}
```

---

## 4. Frontend Rendering Strategy

### Parser Implementation

FE parses markup tags and renders accordingly:

```typescript
// Pseudo-code for FE parser
function parseSkillDescription(text: string, skillLevel: number, character: Character) {
  return text
    // Color/highlight tags (square brackets)
    .replace(/\[r\](.*?)\[\/r\]/g, '<span class="text-red">$1</span>')
    .replace(/\[g\](.*?)\[\/g\]/g, '<span class="text-green">$1</span>')
    .replace(/\[b\](.*?)\[\/b\]/g, '<span class="text-blue">$1</span>')
    
    // Level conditional tags (curly braces)
    // Format: {5}'value_if_5+':'value_if_below'{/}
    .replace(/\{(\d+)\}'([^']+)':'([^']+)'\{\/\}/g, (match, level, valueIfMet, valueIfNot) => {
      return skillLevel >= parseInt(level) ? valueIfMet : valueIfNot;
    })
    // Format: {5}text{/} - show text if level >= 5, hide otherwise
    .replace(/\{(\d+)\}(.*?)\{\/\}/g, (match, level, content) => {
      return skillLevel >= parseInt(level) ? content : '';
    })
    
    // Replace <FORMULA> placeholder with actual formula
    .replace(/<FORMULA>/g, () => {
      return renderFormula(skill.formula, character, skillLevel);
    })
    .replace(/<Formula>(.*?)<\/Formula>/g, (match, formula) => {
      return renderFormula(formula, character);
    })
    .replace(/<WeaponDamage>/g, () => {
      const damage = getCurrentWeaponDamage(character);
      return `<span class="tooltip" data-tooltip="Current weapon damage: ${damage}">${damage}</span>`;
    })
    .replace(/<STRmod>/g, () => {
      const mod = getStatMod(character, 'strength');
      return `<span class="tooltip" data-tooltip="Strength modifier: ${mod}">STR mod</span>`;
    })
    .replace(/<SkillLevelMultiplier>/g, () => {
      const multiplier = 1 + 0.1 * skillLevel;
      return `<span class="tooltip" data-tooltip="Formula: (1 + 0.1 × skill level) = ${multiplier}">skill level multiplier</span>`;
    })
    .replace(/<MeleeRangePenalty>/g, () => {
      return `<span class="tooltip" data-tooltip="Melee range penalty: Front-to-front 100%, Front-to-back 70%, Back-to-back 40%">melee range penalty</span>`;
    })
    .replace(/<Buff(\w+)>/g, (match, buffName) => {
      return renderBuffIcon(buffName, 'buff');
    })
    .replace(/<Debuff(\w+)>/g, (match, debuffName) => {
      return renderBuffIcon(debuffName, 'debuff');
    })
    .replace(/<Cooldown:(\d+)>/g, (match, turns) => {
      return `<span class="cooldown">${turns} turns cooldown</span>`;
    });
}
```

### Component Structure

```tsx
<SkillTooltip>
  <SkillName />
  <SkillDescription>
    {/* Parsed markup renders as: */}
    <span>
      Swing your weapon recklessly attacking targeted enemy{' '}
      <span className="text-red">two</span> times{' '}
      {skillLevel >= 5 && <span className="level-conditional">(three at level 5)</span>}
      , each dealing{' '}
      {/* <FORMULA> is replaced with formula field content */}
      <FormulaDisplay>
        {/* Formula is parsed from skill.formula */}
        (<span className="text-red">0.7</span> ×{' '}
        <Tooltip content="Current weapon damage: 12">12</Tooltip> +{' '}
        <Tooltip content="STR mod: +3">STR mod</Tooltip>) ×{' '}
        <Tooltip content="Skill Level Multiplier: (1 + 0.1 × 3) = 1.3">
          skill level multiplier
        </Tooltip> ×{' '}
        <Tooltip content="Melee range penalty: Front-to-front 100%, Front-to-back 70%">
          melee range penalty
        </Tooltip>
      </FormulaDisplay>
      . Hit roll suffer <span className="text-red">-3</span> penalty.
    </span>
  </SkillDescription>
</SkillTooltip>
```

### Tooltip Definitions (FE-Side)

Tooltips are defined in FE, not BE:

```typescript
// FE tooltip definitions
const TOOLTIPS = {
  SkillLevelMultiplier: {
    title: "Skill Level Multiplier",
    description: "Formula: (1 + 0.1 × skill level)",
    examples: {
      1: "1.1",
      3: "1.3",
      5: "1.5",
    },
  },
  MeleeRangePenalty: {
    title: "Melee Range Penalty",
    description: "Melee attacks deal reduced damage when targeting backline while frontline exists.",
    rules: {
      "Front-to-front": "100%",
      "Front-to-back (frontline exists)": "70%",
      "Back-to-back": "40%",
    },
  },
  STRmod: {
    title: "Strength Modifier",
    description: "Your current Strength modifier",
    // FE calculates from character stats
  },
  // Buff/Debuff tooltips from buff/debuff definitions
  BuffBlessing: {
    // Loaded from buff definition
  },
  DebuffDazed: {
    // Loaded from debuff definition
  },
};
```

---

## 5. Implementation Plan

### Phase 1: Standardize Terminology & Structure (Current)
- [x] Define standard terms (STR mod, WIL mod, etc.)
- [x] Replace "position modifier" with "melee range penalty" in descriptions
- [x] Define markup tag specification
- [x] Define description structure: `{ text: L10N, formula?: L10N }`
- [ ] Update Skill class to support new description structure
- [ ] Update all skill descriptions to use new format
- [ ] Document markup tags and usage

### Phase 2: FE Parser Implementation
- [ ] Build markup parser in FE
- [ ] Create `FormulaDisplay` component
- [ ] Implement tooltip system (FE-side definitions)
- [ ] Create buff/debuff icon renderer
- [ ] Test with 2-3 skills as examples

### Phase 3: FE Rich Rendering (Future)
- [ ] Add hover tooltips for all formula parts
- [ ] Implement conditional text rendering (level-based)
- [ ] Add color highlighting
- [ ] Create tooltip definitions for all standard terms
- [ ] Migrate all skills to markup format

---

## 6. Critical Issue: Frontline Existence Check

**Problem:** Position modifier calculation doesn't check if frontline actually exists!

**Current Code:**
```typescript
// getPositionModifier only checks positions, not if frontline is alive
if (actorFront && targetFront) return 1;
if (actorFront || targetFront) return 0.7; // ❌ Assumes frontline exists
return 0.4;
```

**Fix Needed:**
```typescript
export function getPositionModifier(
  actorPosition: number,
  targetPosition: number,
  weapon: Weapon,
  actorParty: Character[],  // Add party context
  targetParty: Character[],  // Add party context
): number {
  const actorFront = actorPosition <= 2;
  const targetFront = targetPosition <= 2;
  
  // Check if frontline actually exists
  const actorFrontlineExists = actorParty.some(c => 
    c.position <= 2 && !c.vitals.isDead
  );
  const targetFrontlineExists = targetParty.some(c => 
    c.position <= 2 && !c.vitals.isDead
  );

  switch (weapon.preferredPosition) {
    case WeaponPosition.Melee:
      if (actorFront && targetFront) return 1;
      // Only apply penalty if frontline exists
      if (actorFront && !targetFront && targetFrontlineExists) return 0.7;
      if (!actorFront && targetFront && actorFrontlineExists) return 0.7;
      if (!actorFront && !targetFront) return 0.4;
      return 1; // No penalty if no frontline blocking
    // ... rest of cases
  }
}
```

**Action Required:** Update `getPositionModifier` signature and all call sites.

---

## 6. Markup Tag Reference

### Color Tags (Square Brackets)
- `[r]text[/r]` - Red highlight (penalties, important values)
- `[g]text[/g]` - Green highlight (bonuses, positive effects)
- `[b]text[/b]` - Blue highlight (neutral information)

### Level Conditional Tags (Curly Braces)
- `{5}'value_if_5+':'value_if_below'{/}` - Value substitution based on skill level
- `{3}text{/}` - Show text if skill level >= 3, hide otherwise
- Examples:
  - `{5}'three':'two'{/}` → "three" at level 5+, "two" otherwise
  - `{3}'1d10':'1d8'{/}` → "1d10" at level 3+, "1d8" otherwise
  - `{5}At level 5, gain +1 order.{/}` → Shows text only at level 5+

### Formula Tags
- `<Formula>...</Formula>` - Formula block (rendered with tooltips)
- `<WeaponDamage>` - Current weapon damage (tooltip shows value)
- `<STRmod>`, `<DEXmod>`, `<WILmod>`, `<CHAmod>` - Stat modifiers (tooltip shows current value)
- `<SkillLevelMultiplier>` - Skill level multiplier (tooltip shows formula)
- `<MeleeRangePenalty>` - Melee range penalty (tooltip explains rules)

### Buff/Debuff Tags
- `<BuffName>` - Buff reference (FE renders icon + tooltip from buff definition)
- `<DebuffName>` - Debuff reference (FE renders icon + tooltip from debuff definition)
- Examples: `<BuffBlessing>`, `<DebuffDazed>`, `<DebuffCurse>`

### Special Tags
- `<Cooldown:N>` - Cooldown indicator (N = turns)
- `<Resource:TYPE:AMOUNT>` - Resource cost (e.g., `<Resource:MP:3>`)

### Notes:
- All tooltips are defined in FE, not BE
- FE calculates dynamic values (weapon damage, stat mods) from character data
- Buff/debuff tooltips come from buff/debuff definitions
- Markup is human-readable and debuggable

## 8. Conditional Text: Level-Based vs Static

### Current Approach: Inline Level Conditionals

**Format:** 
- `{5}'value_if_5+':'value_if_below'{/}` - Value substitution
- `{3}text{/}` - Show/hide text block

**Example:**
```
"{5}'three':'two'{/}"
"{3}At level 3+, also removes one <DebuffCurse>{/}"
```

**Pros:**
- ✅ Simple to write: `{5}'three':'two'{/}`
- ✅ Inline value substitution (no separate blocks)
- ✅ Clear level threshold (the number)
- ✅ Can be used in formulas too
- ✅ Compact and readable
- ✅ Easy to parse in FE

**Cons:**
- ⚠️ Doesn't show "at level X" context (but FE can add this)
- ⚠️ Requires parsing (but simple regex)

---

### Alternative: Inline Conditional Values

**Format:** `{cond:level=5}value_if_true:value_if_false{/cond}`

**Example:**
```
"Deals {cond:level=5}1d10:1d8{/cond} + STR mod damage"
"Deals {cond:level>=3}1d10:1d8{/cond} + STR mod damage"
```

**Pros:**
- ✅ More compact (no separate conditional blocks)
- ✅ Values change dynamically
- ✅ Could work for formulas too: `{cond:level=5}(1d10 + <STRmod>):(1d8 + <STRmod>){/cond}`

**Cons:**
- ❌ Harder to read in source code
- ❌ More complex parsing (need to evaluate conditions)
- ❌ Mixing logic with presentation
- ❌ Harder to debug (what value is shown?)
- ❌ FE needs skill level to render (can't show "static" preview)
- ❌ Gets messy with multiple conditions
- ❌ Can't easily show "at level X" context to user

---

### Hybrid Approach: Conditional Blocks with Value Substitution

**Format:** Keep `[l]...[/l]` but allow value substitution inside

**Example:**
```
"Deals 1d[l]10:8[/l] + STR mod damage"
"Deals [l](1d10 at level 5):(1d8)[/l] + STR mod damage"
```

**Pros:**
- ✅ Still readable
- ✅ Values can change
- ✅ Clear what's conditional
- ✅ Can show context ("at level 5")

**Cons:**
- ⚠️ Still need parsing for value substitution
- ⚠️ Syntax might be confusing (`[l]10:8[/l]`)

---

### Recommendation: **Stick with Current Approach**

**Reasons:**
1. **Readability**: `[l](three at level 5)[/l]` is much clearer than `{cond:level=5}3:2{/cond}`
2. **Maintainability**: Easy to see what changes at what level
3. **Debugging**: Can easily see what text is shown/hidden
4. **User Experience**: Users can see "at level 5" context, not just a changing number
5. **Simplicity**: FE just needs to check level and show/hide, no complex parsing

**When to use inline conditionals:**
- Only if you have **many** small value changes (like 1d8→1d10, 2 hits→3 hits)
- And you're willing to trade readability for compactness
- And you don't need to show "at level X" context

**Better alternative for formulas:**
- Keep formulas in separate `formula` field
- Use level-based formula calculation in FE
- Example: `formula: "(1d[l]10:8[/l] + <STRmod>) × <SkillLevelMultiplier>"` 
- But this still has the readability issue

**Final verdict:** The `{5}'value_if_5+':'value_if_below'{/}` syntax is clean, compact, and easy to write. It's perfect for level-based progression while keeping source code readable.

---

### Player Progression & Information Visibility

**Consideration:** Should players see what skills do at higher levels, or should it be hidden until they reach that level?

#### Option 1: Show All (Current Approach)
```
"{5}'three':'two'{/}"
"{3}At level 3+, also removes one <DebuffCurse>{/}"
```

**Pros:**
- ✅ Players know what they're working towards
- ✅ Encourages leveling up skills
- ✅ Transparent - no surprises
- ✅ Players can plan builds

**Cons:**
- ⚠️ Less mystery/discovery
- ⚠️ Can feel overwhelming (too much info)

#### Option 2: Hide Until Level Reached
```
// At level 1-4: "Deals 1d8 + STR mod"
// At level 5+: "Deals 1d10 + STR mod"
```

**Pros:**
- ✅ Cleaner UI (less clutter)
- ✅ Creates sense of discovery
- ✅ Less overwhelming for new players
- ✅ Surprise factor when leveling up

**Cons:**
- ❌ Players can't plan ahead
- ❌ Might feel like missing information
- ❌ Harder to compare skills at different levels
- ❌ Need separate descriptions per level (or complex parsing)

#### Option 3: Hybrid - Show with Fade/Gray
```
"{5}'three':'two'{/}"  // Shown but grayed out/faded until level reached
```

**Pros:**
- ✅ Best of both worlds
- ✅ Shows future potential (encourages leveling)
- ✅ Clearly indicates "not yet available"
- ✅ Maintains transparency

**Cons:**
- ⚠️ Still shows information (might be too much for some)
- ⚠️ Requires FE styling (grayed/faded state)

#### Recommendation: **Option 3 (Hybrid with Visual Indication)**

**Implementation:**
- Keep `{5}'value_if_5+':'value_if_below'{/}` syntax in description
- FE renders with visual indication:
  - **Current level or below**: Normal styling (shows appropriate value)
  - **Above current level**: Grayed out/faded + "at level X" indicator
  - **Optional**: Add a "preview" toggle to show/hide future levels

**Example FE Rendering:**
```tsx
// At skill level 1:
"two times" + <span className="text-muted">(three at level 5)</span>

// At skill level 5:
"three times" + <span className="text-normal"></span>
```

**Benefits:**
- Players can see progression path
- Clear visual distinction (what's available vs future)
- Maintains readability in source code (simple `{5}'three':'two'{/}` syntax)
- Easy to implement in FE (simple regex parsing)

**Alternative:** If you want true hiding:
- FE can simply not render values above current level
- But this loses progression visibility (players can't see what they're working towards)

**Game Design Note:** Many games show future upgrades to encourage progression. Hiding everything can feel frustrating. A middle ground (show but indicate it's not yet available) often works best.

## 9. Summary

### Immediate Actions:
1. ✅ Standardize terminology across all descriptions
2. ✅ Replace "position modifier" with "melee range penalty" 
3. ⚠️ **CRITICAL**: Fix frontline existence check in `getPositionModifier`
4. Update all skill descriptions to use markup format
5. Define markup tag specification

### Future Enhancements:
1. Build FE markup parser
2. Create FE tooltip definitions for standard terms
3. Implement formula rendering with tooltips
4. Add buff/debuff icon renderer
5. Migrate all skills to markup format

### Bandwidth Strategy:
- **Current**: ~300 bytes/skill (acceptable)
- **With markup**: ~350 bytes/skill (minimal overhead, enables rich UI)
- **With gzip**: ~150-200 bytes/skill (excellent)
- **Recommendation**: Use markup format, compress with gzip

### Benefits of Markup Approach:
- ✅ Simple BE implementation (just strings)
- ✅ FE has full control over rendering
- ✅ Tooltips defined once in FE (single source of truth)
- ✅ Human-readable and debuggable
- ✅ No structured data needed
- ✅ Easy to extend with new tags

