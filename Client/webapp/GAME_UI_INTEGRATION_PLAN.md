# Game UI Integration Plan

## Current Situation

### ✅ What We Have
- **Backend API**: Well-defined `/api/actions/update` endpoint with clear request/response structure
- **UI Components**: Basic GameView, ActionScheduleModal, GameSidebar already exist
- **Mock Data**: Current UI uses simple mock data

### ⚠️ Gaps Identified
1. **Day/Time Mismatch**: 
   - UI uses: `["Day 1", "Day 2", ...]` 
   - Backend expects: `DayOfWeek` enum (`laoh`, `rowana`, `aftree`, `udur`, `matris`, `seethar`)

2. **Time Phase Mismatch**:
   - UI uses: `["Morning", "Afternoon", "Evening", "Night"]`
   - Backend expects: `TimeOfDay` enum (`morning`, `afternoon`, `evening`, `night`)

3. **Action Structure**:
   - UI uses: Simple string IDs (`"rest"`, `"training"`)
   - Backend expects: Complex `CharacterAction` objects with parameters:
     - `{ type: ActionInput.TrainAttribute, attribute: AttributeKey }`
     - `{ type: ActionInput.TrainSkill, skillId: SkillId }`
     - etc.

4. **Missing Features**:
   - Travel planning UI
   - Rail travel UI
   - Allowed actions based on location/travel state
   - Converted actions feedback (when backend changes invalid actions to Rest)
   - Party Action Sequence (PAS) for party leader

---

## Recommended Approach: **UI Design First, Then Integrate**

### Phase 1: Design & Mock Data (Current - Do This First)

#### 1.1 Create Type-Safe Mock Data Structure
- Define TypeScript types matching backend exactly
- Use proper `DayOfWeek` and `TimeOfDay` enums
- Create mock `CharacterActionSequence` structure
- Create mock `PartyActionSequence` structure
- Create mock `TravelState` structure

#### 1.2 Update UI Components to Use Proper Structure
- Update `ActionScheduleModal` to use `DayOfWeek` enum
- Update `ActionScheduleModal` to use `TimeOfDay` enum
- Handle complex action types (with parameters)
- Show action parameters when needed (e.g., "Train Strength", "Read Book X")

#### 1.3 Design Missing UI Features
- **Travel Planning Modal**: 
  - Location selection
  - Travel method selection (walk/horse/caravan)
  - Multi-location path planning
- **Rail Travel UI**:
  - Station selection
  - Route visualization
- **Action Validation Feedback**:
  - Show which actions are allowed/disallowed
  - Display converted actions (when backend changes them)
  - Show reasons for conversion
- **Party Leader Features**:
  - Visual indicator for party leader
  - Party Action Sequence controls

#### 1.4 Design Data Flow
- Define how user interactions update state
- Plan state management (useState, context, or Zustand/Redux)
- Design optimistic updates
- Plan error handling UI

### Phase 2: API Service Layer (After UI Design)

#### 2.1 Create API Service Functions
- `updateActions()` - POST to `/api/actions/update`
- `getPartyData()` - Fetch party information
- `getAllowedActions()` - Get allowed actions for current context
- Type-safe request/response interfaces

#### 2.2 Create Data Transformation Layer
- Convert UI action selection → Backend `CharacterAction` format
- Convert Backend response → UI display format
- Handle `convertedActions` array from backend
- Update travel state from backend response

### Phase 3: Integration (Connect UI to API)

#### 3.1 Replace Mock Data with API Calls
- Fetch initial party data
- Fetch current action sequence
- Fetch travel state

#### 3.2 Connect User Interactions to API
- Save action sequence → Call API
- Handle API responses
- Update UI based on backend changes
- Show converted actions feedback

#### 3.3 Error Handling
- Network errors
- Validation errors
- Server errors
- User-friendly error messages

---

## Why Design UI First?

### ✅ Advantages
1. **Better UX**: Think about user experience without API constraints
2. **Faster Iteration**: No need to restart server, mock data is instant
3. **Visual Feedback**: See layouts immediately, easier to experiment
4. **Clear Requirements**: Once UI is designed, you know exactly what API needs to provide
5. **Parallel Work**: Designer/UI dev can work independently of backend

### ⚠️ Considerations
- Use mock data that **matches backend structure exactly**
- Don't create mock data structures that won't work with backend
- Keep backend API spec visible while designing

---

## Action Items

### Immediate (Do This Now)
1. ✅ Create type definitions matching backend enums
2. ✅ Update ActionScheduleModal to use `DayOfWeek` and `TimeOfDay` enums
3. ✅ Design travel planning UI mockup
4. ✅ Create mock data structure matching backend exactly

### Next Steps
1. Design missing UI features (travel, rail, validation feedback)
2. Create API service layer with types
3. Replace mock data with API calls
4. Handle converted actions display

---

## Type Definitions Needed

```typescript
// Match backend exactly
enum DayOfWeek {
  laoh = "laoh",
  rowana = "rowana",
  aftree = "aftree",
  udur = "udur",
  matris = "matris",
  seethar = "seethar",
}

enum TimeOfDay {
  morning = "morning",
  afternoon = "afternoon",
  evening = "evening",
  night = "night",
}

// CharacterActionSequence structure
type CharacterActionSequence = {
  [day in DayOfWeek]: {
    [time in TimeOfDay]: CharacterAction;
  };
};

// CharacterAction types (from backend)
type CharacterAction = 
  | { type: "None" }
  | { type: "Train Attribute"; attribute: AttributeKey }
  | { type: "Train Skill"; skillId: SkillId }
  | // ... etc
```

---

## Questions to Answer During Design

1. **Action Selection**: How does user select actions with parameters?
   - Modal with sub-menus?
   - Inline dropdowns?
   - Multi-step wizard?

2. **Travel Planning**: How does user plan multi-location travel?
   - Map view?
   - List of locations?
   - Drag-and-drop path builder?

3. **Feedback**: How to show converted actions?
   - Toast notifications?
   - Inline warnings?
   - Summary panel?

4. **State Management**: How to handle complex state?
   - React Context?
   - Zustand store?
   - Redux?

---

## Recommendation

**Start with Phase 1 (Design & Mock Data)** - Build out the UI with proper types and mock data that matches backend structure. Once the UI feels good and complete, move to Phase 2 and 3 (API integration).

This way:
- You get a polished UI that works perfectly
- You understand exactly what data you need from backend
- Integration becomes straightforward "wire up the API calls"
- Less rework later

