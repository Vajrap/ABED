## **Minimum Playable Version (MPV) - Roadmap**

### **Game Understanding Summary**

Based on backend code analysis:

#### **Core Game Mechanics**
- **Time System**: 15 minutes real-time = 1 game phase (4 phases per day, 6 days per week)
- **Calendar**: 24 days/month, 14 months/year, 6 days/week
- **Smallest Unit**: Party (not character) - player controls their character within a party of up to 6
- **Action Execution**: Characters execute their scheduled actions each phase
- **Location-Based**: Actions available depend on current location (taverns, training grounds, shops, etc.)
- **News System**: Events generate news at various scopes (world, region, party, private)
- **Travel System**: Parties can travel between locations
- **Battle System**: Turn-based combat with AB gauge system

#### **Action Types (from backend)**
- **Rest**: Inn, Camping, House Rest
- **Training**: Attributes, Proficiencies, Artisan skills, Skills
- **Learning**: Learn new skills, Read books
- **Exploration**: Strolling, specific location actions
- **Crafting**: Various artisan activities
- **Social**: Tavern, socializing
- **Religious**: Various shrine/church activities
- **Combat**: Barracks, Arena, Bounty Board, Adventure Guild
- **Travel**: Move between locations

---

## **MPV Feature List**

### **✅ COMPLETED (Phase 0)**

#### Frontend
- ✅ User authentication (login/register)
- ✅ Character creation
- ✅ Navigation flow (login → character creation → game)
- ✅ Component-based architecture established
- ✅ Theme system (purple/copper/teal/magenta + beige)
- ✅ AlertBox component
- ✅ GameView layout (sidebar + party display + action modals)
- ✅ Action definition system (frontend config)

#### Backend
- ✅ User service (create, authenticate)
- ✅ Character service (create, retrieve)
- ✅ Session management
- ✅ Database schema (users, characters, sessions)
- ✅ Character entity with full game systems

---

## **Phase 1: Core Game Loop (MPV Foundation)**

### **Backend Requirements**

#### 1. Party System ⬜
**Priority: CRITICAL**

```typescript
// API: GET /api/party
Response: {
  party: {
    id: string;
    name: string;
    location: LocationsEnum;
    characters: Character[]; // Array of 1-6 characters
    playerCharacterId: string;
    gold: number;
    supplies: Record<string, number>;
  }
}
```

**Tasks:**
- [ ] Create Party entity/service
- [ ] Create party on character creation (single-member party)
- [ ] GET /api/party endpoint
- [ ] Link character to party
- [ ] Initialize party resources (gold, supplies)

#### 2. Game Time System ⬜
**Priority: CRITICAL**

```typescript
// API: GET /api/game/time
Response: {
  currentDay: number;      // 1-24
  currentPhase: number;    // 0-3 (morning, afternoon, evening, night)
  currentMonth: number;    // 1-14
  currentYear: number;
  dayOfWeek: number;       // 0-5
}
```

**Tasks:**
- [ ] Expose GameTime to API
- [ ] GET /api/game/time endpoint
- [ ] (Optional) Manual time advance for testing

#### 3. Action Schedule System ⬜
**Priority: CRITICAL**

```typescript
// API: POST /api/character/schedule
Request: {
  schedule: {
    [dayOfWeek]: {
      [phase]: {
        type: ActionInput;
        // additional params if needed (e.g., attribute for TrainAttribute)
      }
    }
  }
}

// API: GET /api/character/schedule
Response: {
  schedule: CharacterActionSequence;
}
```

**Tasks:**
- [ ] Update character with action sequence
- [ ] POST /api/character/schedule endpoint
- [ ] GET /api/character/schedule endpoint
- [ ] Validate actions (location-based)

#### 4. Basic Action Processing ⬜
**Priority: HIGH**

**Actions to implement:**
- [ ] **Rest** - Restore HP/MP/SP
- [ ] **Strolling** - Explore, chance for random events
- [ ] **TrainAttribute** - Increase attribute (STR, INT, etc.)
- [ ] **TrainArtisan** - Increase artisan skill (smithing, cooking, etc.)

**Tasks:**
- [ ] Action execution logic (use existing backend code)
- [ ] Update character stats after actions
- [ ] Generate basic news for actions
- [ ] Save character state to DB after phase

#### 5. News System (Basic) ⬜
**Priority: HIGH**

```typescript
// API: GET /api/news
Response: {
  news: {
    privateNews: NewsItem[];  // For player only
    partyNews: NewsItem[];    // For whole party
    locationNews: NewsItem[]; // At current location
  }
}

interface NewsItem {
  id: string;
  timestamp: string;
  message: string;
  characters: string[]; // Character names involved
}
```

**Tasks:**
- [ ] Basic news generation (action results)
- [ ] GET /api/news endpoint
- [ ] News storage (in-memory for MPV, DB later)
- [ ] Mark news as read

---

### **Frontend Requirements**

#### 6. Party Data Display ⬜
**Priority: CRITICAL**

**Tasks:**
- [ ] Fetch party data on GameView load
- [ ] Display party members (using PartyMemberCard)
- [ ] Show player character
- [ ] Display party resources (gold, supplies)
- [ ] Show current location
- [ ] Show current game time

#### 7. Character Quick View ⬜
**Priority: HIGH**

**Tasks:**
- [ ] Create CharacterQuickView component
- [ ] Display when party member selected
- [ ] Show: HP/MP/SP bars, level, current status
- [ ] Update in real-time (or on refresh)

#### 8. Action Schedule Integration ⬜
**Priority: CRITICAL**

**Tasks:**
- [ ] Fetch character's current schedule
- [ ] Display existing actions in grid
- [ ] Save schedule to backend (POST /api/character/schedule)
- [ ] Validation (show if action invalid)
- [ ] Loading states

#### 9. Training Sub-Selection ⬜
**Priority: HIGH**

**Tasks:**
- [ ] Create TrainingSelectionModal
- [ ] Show list: Attributes, Proficiencies, Artisan skills
- [ ] Save selected training target
- [ ] Display in action cell (e.g., "Train STR")

#### 10. News Display ⬜
**Priority: HIGH**

**Tasks:**
- [ ] Create NewsModal component
- [ ] Fetch news from backend
- [ ] Display news list (latest first)
- [ ] Group by scope (private/party/location)
- [ ] Mark as read
- [ ] Auto-refresh or notification when new news

#### 11. Time Display & Progression ⬜
**Priority: MEDIUM**

**Tasks:**
- [ ] Display current time in UI (Day X, Phase, Month, Year)
- [ ] Show time until next phase
- [ ] (Optional) Manual "Advance Time" button for testing

---

## **Phase 2: Character Management (MPV Enhanced)**

#### 12. Character Stats Modal ⬜
**Priority: MEDIUM**

**Tasks:**
- [ ] Create CharacterStatsModal
- [ ] Display all attributes, proficiencies, artisans
- [ ] Display skills, inventory basics
- [ ] Read-only for MPV

#### 13. Basic Inventory Modal ⬜
**Priority: LOW**

**Tasks:**
- [ ] Create InventoryModal
- [ ] Display items with quantities
- [ ] Show equipped items
- [ ] Read-only for MPV (no equip/use yet)

---

## **Phase 3: Basic Interactions (MPV Complete)**

#### 14. Save/Load System ⬜
**Priority: HIGH**

**Tasks:**
- [ ] Auto-save character/party state
- [ ] Manual save button
- [ ] Load state on login

#### 15. Location Display ⬜
**Priority: LOW**

**Tasks:**
- [ ] Show current location name
- [ ] Show available actions at location
- [ ] (Future: Travel system)

---

## **MPV Completion Criteria**

### **Player Can:**

✅ **Account Management**
- [x] Create account
- [x] Login
- [x] Create character
- [x] See game view

⬜ **Game Loop**
- [ ] See their party (character + empty slots)
- [ ] See current game time
- [ ] Plan weekly action schedule (6 days × 4 phases)
- [ ] Select actions: Rest, Strolling, Train Attribute, Train Artisan
- [ ] See schedule saved and persisted
- [ ] Wait for time to advance (or manually advance for testing)
- [ ] See news about what happened
- [ ] See character stats change (attributes, artisan skills increase)
- [ ] See HP/MP/SP restored from resting

⬜ **Character Progression**
- [ ] View character stats
- [ ] See stat increases from training
- [ ] View news/event log
- [ ] Track progress over time

⬜ **Session Management**
- [ ] Save game state
- [ ] Logout
- [ ] Resume game on re-login

---

## **Implementation Priority**

### **Week 1: Backend Core (Critical Path)**
1. **Party System** - Create party on character creation, GET /api/party
2. **Game Time API** - Expose current time
3. **Action Schedule API** - Save/load character schedules
4. **Basic Action Processing** - Rest, Strolling, TrainAttribute, TrainArtisan
5. **News System** - Generate and store action results

### **Week 2: Frontend Integration**
6. **Party Display** - Fetch and show party data
7. **Time Display** - Show current game time
8. **Schedule Integration** - Save/load schedules
9. **Training Sub-Selection** - Modal for selecting what to train
10. **News Display** - Modal showing action results

### **Week 3: Polish & Testing**
11. **Character Stats Modal** - View full character sheet
12. **State Persistence** - Auto-save
13. **Testing** - End-to-end player flow
14. **Bug Fixes** - Address issues
15. **Performance** - Optimize if needed

---

## **Technical Decisions Needed**

### **Questions for Resolution:**

1. **Time Progression**:
   - Auto-advance (15 min real-time = 1 phase)? 
    - Yes, this game is idle, the phase will be moving on its own and all action resolved through   player configured data (Action schedule, travel etc.)
   - Manual advance button for testing?
    - Good Idea
   - Pause/resume functionality?
    - It's an online MMORPG, so. No pause except the admin itself? maybe good to have

2. **Party Formation**:
   - Start with single-character party?
    - Yes
   - When/how to recruit party members?
    - This happen when game progress, story, mission, relation, hiring > higher features, impl later
   - NPC companions or player-only for MPV?
    - I think we'll impl hiring for stage 2, COMPANIONS, so not now

3. **Action Validation**:
   - Show only valid actions per location?
    - Yes
   - Let player plan invalid actions (warn later)?
    - When planning, adding new action, since it's given by the location so invalid action won't be there to choose from, But when character change location, the action chosen might not be refresh so I think if it's not align with location's action we'll change the bg color for that particular phase into yellow or orange, indicate that it has some proble. Also BE should check everytume before initiate actions, to make sure we won't ex
   - Real-time validation vs server-side validation?
    - Client only tells their intention, all things happen in Server, so I'd say it's server-side validation? anyway it's cause by the nature of game engine and how it run, user only config, and wait for the response

4. **News Delivery**:
   - Real-time push (WebSocket)?
    - Yes, we need websocket, News will be send to each logged in user, I think it should send like... all news since the last one user received
   - Polling every phase?
    - I'm not sure what it means
   - Fetch on demand (click News button)?
    - Yes, I think so, and maybe... need idea about news and news archinve, and not all NEWS are for every one, we need to keep track of the 'knowledge' that's the 'Information' field in the character is, maybe it should be called NEWS instead? we'll come back to implement idea about this later, this is huge system, and also critical

5. **State Persistence**:
   - Auto-save every phase?
    - Yes
   - Save only on logout?
    - Nothing to save
   - Save on schedule changes?
    - yes, it's saved into character actions so basically it is saved

---

## **Refined Requirements Based on Answers**

### **1. Time System Architecture**

**How It Works:**
- **Auto-Advance**: Every 15 minutes real-time, game advances 1 phase automatically
- **Server-Side**: GameLoop runs on server, processes all actions
- **Client Updates**: WebSocket pushes updates to connected clients
- **Testing**: Admin panel with manual time advance button
- **No Player Pause**: Game runs 24/7 (idle game mechanics)

**Backend Implementation:**
```typescript
// Server continuously runs:
setInterval(() => {
  GameTime.advanceOnePhase();
  processAllPartyActions();
  generateNews();
  sendUpdatesToClients(); // Via WebSocket
}, 15 * 60 * 1000); // 15 minutes
```

**Frontend Implementation:**
- Display current time (updated via WebSocket)
- No control over time progression
- "Time until next phase" countdown display

---

### **2. Party System Architecture**

**MPV Scope:**
- **Solo Start**: Player character creates a single-member party
- **6 Slots**: Party has 6 portrait slots (1 filled, 5 empty)
- **No Recruitment**: Empty slots show "Coming Soon" for MPV
- **Post-MPV**: Hiring/companion system (Stage 2 feature)

**Data Structure:**
```typescript
interface Party {
  id: string;
  name: string; // Auto-generated or player's character name + "'s Party"
  playerCharacterId: string;
  characters: [Character, null, null, null, null, null]; // 1 player + 5 empty
  location: LocationsEnum;
  gold: number;
  supplies: Record<ItemId, number>;
}
```

**On Character Creation:**
- Create Character → Create Party → Add Character to Party

---

### **3. Action Validation Architecture**

**Client-Side (Display Only):**
- GET /api/actions/available (based on current location)
- Show only valid actions in ActionSelectionModal
- Different actions per location (tavern vs training ground)

**Server-Side (Execution):**
- When phase executes, validate each action
- If action invalid for location → Default to "Rest"
- Generate news: "Could not train, rested instead"

**Visual Indication:**
```
Player plans "Training" at Day 3, Morning
Player moves to new location (no training ground)
→ UI shows Day 3 Morning cell with ORANGE/YELLOW background
→ Tooltip: "Warning: Training not available at current location"
→ On execution: Action fails → defaults to Rest → news generated
```

**Frontend Validation States:**
- ✅ Green border: Valid action
- ⚠️ Orange/Yellow background: Action may fail (location mismatch)
- ❌ Red border: Invalid action (shouldn't happen if we show only available)

---

### **4. News System Architecture**

**News Scopes** (from backend):
```typescript
interface NewsStructure {
  worldScope: NewsItem[];        // Everyone sees (global events)
  regionScope: Map<RegionEnum, NewsItem[]>;
  subRegionScope: Map<SubRegionEnum, NewsItem[]>;
  locationScope: Map<LocationEnum, NewsItem[]>;
  partyScope: Map<PartyId, NewsItem[]>;    // Your party sees
  privateScope: Map<CharacterId, NewsItem[]>; // Only you see
}
```

**Delivery Method:**
- **WebSocket Push**: When phase advances, server pushes new news
- **On Login**: GET /api/news/unread - fetch all news since last login
- **On Demand**: Click "News" button → show all received news
- **Persistence**: Track `lastNewsReceived` timestamp per user

**News vs Information (Knowledge System):**
- **News**: Time-based events, action results, world happenings
- **Information**: Character's accumulated knowledge (separate system)
- **For MPV**: Focus on News only, Information system is Stage 2+

**News Types for MPV:**
```
Private News:
- "You rested and recovered 20 HP"
- "Your Strength increased by 1"
- "You failed to train (no training facility)"

Party News:
- "Party member Warrior leveled up!"
- "Party arrived at Fyonar Capital"

Location News:
- "A merchant arrived at the market"
- "The tavern is hosting a festival"

(World/Region news: Post-MPV)
```

---

### **5. State Persistence Architecture**

**What Gets Saved:**
```
Every Phase (auto):
- Character stats (HP, attributes, skills, etc.)
- Party state (location, resources)
- Character action sequences (already saved on edit)

On Schedule Change (immediate):
- Character.actionSequence → Database
- No need to wait for phase

On Logout:
- lastNewsReceived timestamp
- Session cleanup

Nothing to "Save Manually":
- All game state is persistent
- Save button not needed (it's auto)
```

**Database Updates:**
```
Phase Advance Trigger:
1. Process all actions
2. Update character stats → DB
3. Update party resources → DB
4. Generate news → Store temporarily
5. Push news to clients via WebSocket
6. Update lastNewsReceived on client ACK
```

---

### **6. WebSocket Implementation Requirements**

**Events to Push:**
```typescript
// Server → Client events
"time:advanced" → { day, phase, month, year }
"news:new" → { news: NewsItem[] }
"party:updated" → { gold, supplies, location }
"character:updated" → { characterId, changes: Partial<Character> }
```

**Client Subscribes:**
```typescript
socket.on("time:advanced", (time) => {
  updateTimeDisplay(time);
});

socket.on("news:new", (data) => {
  addNewsToFeed(data.news);
  showNotification("New events occurred!");
});

socket.on("character:updated", (data) => {
  updateCharacterStats(data);
});
```

---

### **7. Location-Action Mapping**

**Each location defines available actions:**

```typescript
// Example locations
Tavern: {
  actions: [Rest, Strolling, Socializing, Dining]
}

Training Ground: {
  actions: [Rest, TrainAttribute, TrainProficiency, TrainSkill]
}

Library: {
  actions: [Rest, Reading, Research, Studying]
}

Market: {
  actions: [Rest, Shopping, Strolling]
}

Crafting Workshop: {
  actions: [Rest, Crafting, TrainArtisan]
}
```

**API Response:**
```typescript
GET /api/actions/available
→ ["rest", "strolling", "training_attribute", "training_artisan"]
```

**Frontend Uses:**
- Filters ACTION_DEFINITIONS to show only available
- Different actions per time phase AND location

---

## **Out of Scope for MPV**

### **Deferred to Post-MPV:**
- ❌ Travel system
- ❌ Battle system
- ❌ NPC recruitment
- ❌ Crafting/item creation
- ❌ Quest system
- ❌ Multiplayer/co-op
- ❌ Market/economy
- ❌ Skill learning (beyond training)
- ❌ Equipment system (equip/unequip)
- ❌ Complex events
- ❌ Relationship system
- ❌ Faction standings

---

## **Success Metrics for MPV**

### **Player Experience:**
- Player can create character → plan week → see results → character improves
- One complete gameplay loop (plan → execute → review → repeat)
- Character progression visible and satisfying
- No critical bugs or crashes

### **Technical Goals:**
- < 200ms API response times
- No data loss on page refresh
- Graceful error handling
- Clean, maintainable code

---

## **Estimated Effort**

### **Backend: ~20-30 hours**
- Party system: 4-6h
- Game time API: 2-3h
- Action schedule API: 3-4h
- Action processing: 8-10h
- News system: 4-6h
- Testing: 2-3h

### **Frontend: ~15-20 hours**
- Party display: 3-4h
- Schedule integration: 4-5h
- Training sub-selection: 2-3h
- News display: 3-4h
- Stats modal: 2-3h
- Testing: 2-3h

### **Total: ~35-50 hours** (1-2 weeks for single developer)

---

## **Next Steps**

### **Immediate Actions:**

1. **Review This Document** - Confirm MPV scope
2. **Clarify Technical Decisions** - Answer the 5 questions above
3. **Start Backend** - Implement Party system first
4. **Test Integration** - Verify FE can fetch party data
5. **Iterate** - Build features incrementally

### **Development Approach:**

**Vertical Slices** (recommended):
- Slice 1: Party display (backend + frontend)
- Slice 2: Schedule system (backend + frontend)
- Slice 3: Action execution (backend + frontend)
- Slice 4: News system (backend + frontend)

This ensures we have working features early, not just backend OR frontend.

---

**Last Updated**: October 8, 2025  
**Status**: Planning Complete - Ready for Development  
**Target**: MPV completion in 1-2 weeks

