# Game View Design Document

## Game Mechanics Understanding

### Core Concept: Party-Based Gameplay
- **Smallest Unit**: Party (not individual character)
- **Player Control**: One character in a party of up to 6
- **Data Structure**: Player receives `Party` data containing all 6 characters
- **Time System**: 6 days × 4 time phases = 24 time slots per week

### Time Structure
- **6 Days**: Named days in the game world
- **4 Phases per Day**: Morning, Afternoon, Evening, Night
- **Action Planning**: Player schedules actions for their character across the week

---

## UI Layout Proposal

### Overall Structure
```
┌─────────────────────────────────────────────────────────────────┐
│  TOP BAR: Action Planning Grid (6 days × 4 phases)              │
├──────────┬──────────────────────────────────────────────────────┤
│          │                                                       │
│          │  CENTRAL AREA: Party Display & Context               │
│  LEFT    │  - Party member portraits (6 slots)                  │
│  SIDEBAR │  - Selected character detail view                    │
│          │  - Quick stats display                               │
│          │                                                       │
│ Buttons: │                                                       │
│ ────────┤                                                       │
│ Stats    │                                                       │
│ Skills   │                                                       │
│ Inventory│                                                       │
│ News     │                                                       │
│ Travel   │                                                       │
│ Journal  │                                                       │
│ Settings │                                                       │
└──────────┴──────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### 1. TOP SECTION: Action Planning Grid

**Purpose**: Weekly action scheduler for the player's character

**Layout**:
```
┌────────────────── ACTION SCHEDULE ──────────────────┐
│  Day 1  │  Day 2  │  Day 3  │  Day 4  │  Day 5  │  Day 6  │
├─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ ☀️ Morn │ ☀️ Morn │ ☀️ Morn │ ☀️ Morn │ ☀️ Morn │ ☀️ Morn │
│ [Action]│ [Action]│ [Action]│ [Action]│ [Action]│ [Action]│
├─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ ☁️ Aftn │ ☁️ Aftn │ ☁️ Aftn │ ☁️ Aftn │ ☁️ Aftn │ ☁️ Aftn │
│ [Action]│ [Action]│ [Action]│ [Action]│ [Action]│ [Action]│
├─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ 🌅 Even │ 🌅 Even │ 🌅 Even │ 🌅 Even │ 🌅 Even │ 🌅 Even │
│ [Action]│ [Action]│ [Action]│ [Action]│ [Action]│ [Action]│
├─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ 🌙 Night│ 🌙 Night│ 🌙 Night│ 🌙 Night│ 🌙 Night│ 🌙 Night│
│ [Action]│ [Action]│ [Action]│ [Action]│ [Action]│ [Action]│
└─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘
```

**Interaction**:
- Click cell → Opens action selection modal
- Shows current action (if set)
- Color-coded by action type
- Collapsible to save space

**Actions Types** (examples):
- Rest, Train, Craft, Study, Socialize, Explore, Work, etc.

---

### 2. CENTER SECTION: Party Display

**Purpose**: Visual representation of the party and character selection

**Layout**:
```
┌─────────────── YOUR PARTY ───────────────┐
│                                           │
│  [Portrait] [Portrait] [Portrait]        │
│   Player      Member     Member          │
│   ⭐ Active   Level 5    Level 3         │
│                                           │
│  [Portrait] [Portrait] [Portrait]        │
│   Member     Member      Empty           │
│   Level 4    Level 2     [+] Recruit     │
│                                           │
├───────────────────────────────────────────┤
│  SELECTED: Character Name                │
│  Level 5 Fighter • Human                 │
│                                           │
│  HP: ████████░░ 80/100                   │
│  MP: ██████████ 50/50                    │
│  SP: ███████░░░ 70/100                   │
│                                           │
│  Location: Fyonar Capital District       │
│  Status: Resting                         │
└───────────────────────────────────────────┘
```

**Features**:
- **6 Portrait Slots** (party limit)
- **Player Character Highlighted** (star/glow effect)
- **Empty Slots** show "[+] Recruit" option
- **Click Portrait** → Display character details below
- **Quick Stats** for selected character
- **Current Status** (what they're doing)

**Portrait Design**:
- Circular frame with brass border
- Glow effect on hover
- Selected state: stronger glow + brass accent
- Player character: purple glow
- Other members: teal glow
- Empty slots: dashed border

---

### 3. LEFT SIDEBAR: Navigation & Actions

**Purpose**: Main navigation and quick access to game features

**Sections**:

#### A. Character Management
```
┌──────────────┐
│ 📊 Stats     │ → Character stats, attributes, battle stats
├──────────────┤
│ ⚔️ Skills    │ → Skills, breathing skills management
├──────────────┤
│ 🎒 Inventory │ → Items, equipment, crafting
└──────────────┘
```

#### B. Party & World
```
┌──────────────┐
│ 🗺️ Travel    │ → Set travel destination, travel method
├──────────────┤
│ 📰 News      │ → World events, quest board, rumors
├──────────────┤
│ 📖 Journal   │ → Quest log, achievements, lore
├──────────────┤
│ 🏛️ Relations │ → NPC relationships, faction standing
└──────────────┘
```

#### C. Meta/System
```
┌──────────────┐
│ ⚙️ Settings  │ → Game settings, save/load
├──────────────┤
│ 💾 Save      │ → Quick save button
├──────────────┤
│ 🚪 Logout    │ → Return to title screen
└──────────────┘
```

**Styling**:
- Vertical stack of buttons
- Brass-bordered boxes
- Icons + Text labels
- Glow on hover
- Active state indicator (purple glow)

---

## Alternative Layout Ideas

### Option A: Bottom Action Bar (Mobile-Friendly)
```
┌────────────────────────────────────────┐
│  Action Grid (collapsible)             │
├────────────────────────────────────────┤
│                                         │
│         Party Display                  │
│      (6 portraits + details)           │
│                                         │
├────────────────────────────────────────┤
│ [Stats][Skills][Inv][News][Travel][...] │ ← Bottom Tab Bar
└────────────────────────────────────────┘
```

### Option B: Tabbed Interface
```
┌─ TAB: Overview ─┬─ TAB: Planning ─┬─ TAB: World ──┐
│                 │                  │               │
│  Party Display  │  Action Grid     │  Map/News     │
│  Quick Stats    │  Character Focus │  Locations    │
│                 │                  │               │
└─────────────────┴──────────────────┴───────────────┘
```

### Option C: MMO-Style (Your Current Plan)
```
┌────────────────────────────────────────┐
│  Action Planning Grid (top)            │
├──────────┬────────────────────────────┤
│ Sidebar  │  Center: Party + Details   │
│ Buttons  │                            │
└──────────┴────────────────────────────┘
```

**Recommendation**: **Option C (Your Plan)** is best because:
- ✅ Action planning is important → deserves top placement
- ✅ Sidebar keeps core functions always accessible
- ✅ Center focus on party → main gameplay element
- ✅ Familiar to RPG players (similar to classic CRPGs)

---

## Interaction Flows

### Flow 1: Planning Actions
```
User clicks action grid cell
  ↓
Modal opens with action selection
  ↓
User selects action type
  ↓
If action needs parameters (e.g., "Train → Which skill?")
  ↓
Show parameter selection
  ↓
Confirm → Update grid cell
```

### Flow 2: Viewing Character Details
```
User clicks party member portrait
  ↓
Portrait highlights (selected state)
  ↓
Character detail view updates below
  ↓
Shows: HP/MP/SP, location, status, quick stats
```

### Flow 3: Opening Character Stats
```
User clicks "Stats" sidebar button
  ↓
Modal/Panel opens with full character sheet
  ↓
Shows: All attributes, proficiencies, artisans, etc.
  ↓
Can switch between party members
```

---

## Data Requirements

### Party Data Structure (to fetch)
```typescript
interface Party {
  id: string;
  name: string;
  location: string; // Current location
  members: Character[]; // Array of 1-6 characters
  playerCharacterId: string; // Which one is the player
  gold: number;
  supplies: Record<string, number>;
}
```

### Character Data (already defined)
- Full Character interface from backend
- See: `/types/character.ts`

### Action Data
```typescript
interface ScheduledAction {
  day: number; // 0-5
  phase: number; // 0-3 (morning, afternoon, evening, night)
  actionType: ActionType;
  parameters?: any; // Action-specific params
}
```

---

## Visual Design Notes

### Color Coding Suggestions

**Action Types** (for grid cells):
- 🟣 **Purple** - Training/Combat actions
- 🟠 **Copper** - Crafting/Work actions
- 🟢 **Teal** - Social/Exploration actions
- ⚪ **Grey** - Rest/Default actions
- 💗 **Magenta** - Special/Quest actions

**Party Member States**:
- 🟣 **Purple Glow** - Player character (always)
- 🟢 **Teal Glow** - Healthy party member
- 💗 **Magenta Glow** - Injured/Need attention
- ⚫ **Grey** - Unavailable/Resting

### Typography
- **Titles**: Cinzel, bold, colored
- **Stats/Numbers**: Crimson Text, medium weight
- **Labels**: Crimson Text, regular
- **Icons**: Material Icons with drop-shadow glow

### Spacing
- **Top Action Grid**: 20-25% of screen height
- **Center Party Display**: 50-60% of screen height
- **Sidebar**: 200-250px fixed width
- **Padding**: Generous (2-3 spacing units) for medieval feel

---

## Component Structure (Planned)

```
GameView/
├── ActionPlanningGrid/
│   ├── ActionCell.tsx           # Individual grid cell
│   ├── ActionSelectionModal.tsx # Modal for selecting actions
│   └── ActionPlanningGrid.tsx   # Main grid component
│
├── PartyDisplay/
│   ├── PartyMemberPortrait.tsx  # Individual portrait
│   ├── CharacterQuickView.tsx   # Below portraits - selected char details
│   └── PartyDisplay.tsx         # Main party component
│
├── Sidebar/
│   ├── SidebarButton.tsx        # Reusable sidebar button
│   └── GameSidebar.tsx          # Main sidebar component
│
└── Modals/
    ├── CharacterStatsModal.tsx  # Full character sheet
    ├── SkillsModal.tsx          # Skills management
    ├── InventoryModal.tsx       # Inventory/equipment
    ├── NewsModal.tsx            # World news/events
    ├── TravelModal.tsx          # Travel planning
    └── ... (more as needed)
```

---

## Additional Features to Consider

### Information Density
- **Default**: Show essential info (HP, level, location)
- **Expanded**: Click to see detailed stats
- **Minimize**: Collapse action grid when not planning

### Quick Actions
- **Quick Rest** button - Set all unplanned slots to "Rest"
- **Repeat Last Week** - Copy previous week's schedule
- **Templates** - Save common schedules (Training Week, Exploration Week, etc.)

### Visual Feedback
- **Validation**: Red glow if action invalid (e.g., can't train without trainer)
- **Conflicts**: Yellow glow if action conflicts with party plans
- **Complete**: Green checkmark when week is fully planned

### Notifications
- **Action Results**: After time passes, show what happened
- **Alerts**: Items running low, character needs attention
- **Quest Updates**: New quests available, quest progress

### Context Awareness
- **Location-Based Actions**: Show available actions based on current location
- **Character-Based Actions**: Show actions based on character class/skills
- **Party-Based Actions**: Some actions require multiple party members

---

## Recommended Improvements to Your Plan

### Your Plan:
```
Top: Action Grid (6×4)
Center: Party Portraits → Click to view
Left Sidebar: Stats, Skills, Inventory, News
```

### Enhanced Suggestions:

#### 1. **Add Right Sidebar for Context**
```
Left Sidebar        Center           Right Sidebar
─────────────────────────────────────────────────
Navigation      Party Display      Current Context
Buttons         Portraits          ├─ Location info
                Details            ├─ Time/Date
                                   ├─ Party resources
                                   └─ Quick notifications
```

#### 2. **Collapsible Action Grid**
- Start collapsed (just show current day)
- Click "Plan Week" → Expands to full 6×4 grid
- Saves screen space when not actively planning

#### 3. **Party Resources Bar** (between action grid and portraits)
```
┌─────────────────────────────────────────────┐
│ 💰 Gold: 1,234 │ 🍞 Food: 45 │ ⚗️ Potions: 12 │
└─────────────────────────────────────────────┘
```

#### 4. **Additional Sidebar Buttons**:
- **🏛️ Relations** - NPC relationships, faction standings
- **📖 Journal** - Quest log, achievements, completed quests
- **🎯 Quests** - Active quests, quest objectives
- **🗺️ Map** - World map, travel routes
- **⚙️ Settings** - Game settings, save/load
- **💾 Save** - Quick save button (prominent)
- **🚪 Menu** - Game menu (resume, settings, logout)

#### 5. **Status Indicators on Portraits**:
- **HP Bar** - Thin bar under portrait
- **Status Icons** - Small icons for buffs/debuffs
- **Level Badge** - Corner overlay with level number
- **Activity Indicator** - What they're currently doing

---

## State Management Considerations

### Data to Fetch on Load
1. **Party Data** (includes all 6 characters)
2. **Current Location** (where the party is)
3. **Current Time** (day, phase)
4. **Action Schedule** (player's planned actions)
5. **Party Resources** (gold, supplies, etc.)

### Real-Time Updates Needed?
- **Action Results** - When time progresses
- **Party Status** - HP/MP changes, status effects
- **Location** - When party travels
- **Resources** - When spent/gained

### Local State (UI only)
- Selected character (which portrait is clicked)
- Active sidebar panel (which modal is open)
- Action grid expanded/collapsed
- Unsaved schedule changes

---

## Mobile Considerations

### Responsive Breakpoints

**Desktop (> 1024px)**:
```
┌────────────────────────────────────┐
│  Action Grid (full 6×4)            │
├──────────┬────────────┬────────────┤
│ Sidebar  │   Party    │  Context   │
└──────────┴────────────┴────────────┘
```

**Tablet (768px - 1024px)**:
```
┌────────────────────────────────────┐
│  Action Grid (compact 3×8)         │
├──────────┬─────────────────────────┤
│ Sidebar  │   Party + Context       │
└──────────┴─────────────────────────┘
```

**Mobile (< 768px)**:
```
┌────────────────────────────────────┐
│  Party Display                     │
├────────────────────────────────────┤
│  Bottom Tab Bar                    │
│  [Home][Plan][Stats][News][More]   │
└────────────────────────────────────┘
```

---

## Implementation Priority

### Phase 1: Core Layout (MVP)
1. ✅ GameView basic container
2. ⬜ Left sidebar with buttons (no functionality yet)
3. ⬜ Party portrait display (6 slots, static)
4. ⬜ Fetch and display party data
5. ⬜ Character selection (click portrait)
6. ⬜ Character quick view (below portraits)

### Phase 2: Action Planning
7. ⬜ Action planning grid (6×4 layout)
8. ⬜ Action cell component
9. ⬜ Action selection modal
10. ⬜ Save action schedule to backend

### Phase 3: Detail Modals
11. ⬜ Character stats modal
12. ⬜ Skills modal
13. ⬜ Inventory modal
14. ⬜ News modal

### Phase 4: Polish
15. ⬜ Animations and transitions
16. ⬜ Loading states
17. ⬜ Error handling
18. ⬜ Mobile responsive layout

---

## Questions to Resolve

### Gameplay Questions:
1. **Party Formation**: Can player recruit NPCs? Or is party pre-determined?
2. **Action Scope**: Does the schedule apply to just the player, or whole party?
3. **Time Progression**: Does time auto-advance, or player-triggered?
4. **Simultaneous Actions**: Can party members do different things?

### Technical Questions:
1. **API Endpoint**: `/api/party/get` or `/api/character/party`?
2. **Data Format**: Party object with embedded characters, or separate?
3. **Action Schedule**: Stored per character or per party?
4. **Real-time**: WebSocket for updates, or polling?

---

## Conclusion

Your initial plan is solid! Here's the **refined vision**:

### Final Recommended Layout:
```
┌───────────────────────────────────────────────────────┐
│  ACTION PLANNING GRID (6 days × 4 phases)             │
│  [Collapsible - Click to expand/collapse]             │
├────────────┬──────────────────────┬───────────────────┤
│            │                      │  📍 Location      │
│  SIDEBAR   │   PARTY DISPLAY     │  ⏰ Time: Day 3   │
│  ────────  │   ──────────────     │  💰 Gold: 1,234  │
│  📊 Stats  │   [P] [2] [3]       │  🍞 Food: 45     │
│  ⚔️ Skills │   [4] [5] [+]       │                   │
│  🎒 Inv    │                      │  ──────────────  │
│  🗺️ Travel│   Selected: Name     │  🔔 Notifications│
│  📰 News   │   HP: ████░░ 80/100  │  • Quest update  │
│  📖 Journal│   Location: City     │  • Low supplies  │
│  ⚙️ Settings│                     │                   │
└────────────┴──────────────────────┴───────────────────┘
```

**Next Steps**: Implement Phase 1 components once design is approved! 🎮

---

**Last Updated**: October 7, 2025  
**Status**: Design Phase - Awaiting Approval

