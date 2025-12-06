# Game Page Data Status

## Current Situation

### ✅ Backend API EXISTS
- **Endpoint**: `GET /api/party/user`
- **Returns**: `{ success: boolean, party: PartyInterface }`
- **Location**: `Server/src/API/party/index.ts`
- **Status**: ✅ Fully implemented

### ❌ Frontend NOT Fetching Data
- **Current State**: Uses hardcoded simple mock data
- **File**: `Client/webapp/app/game/GameView.tsx` (line 18-26)
- **Status**: No API call happening

---

## Backend API Response Structure

### PartyInterface Structure:
```typescript
interface PartyInterface {
  id: string;                    // Party ID
  partyID: string;               // Same as ID
  location: string;              // LocationsEnum (e.g., "WaywardInn")
  isTraveling: boolean;          // Whether party is currently traveling
  characters: (CharacterInterface | null)[]; // Array of 6 slots (can be null)
  playerCharacterId: string;     // ID of player's character
}
```

### CharacterInterface Structure:
- Full character data including:
  - Basic info: `id`, `name`, `gender`, `race`, `type`, `level`, `portrait`, `background`
  - Stats: `attributes`, `battleStats`, `elements`, `proficiencies`, `artisans`
  - Vitals: `hp`, `mp`, `sp` (current/max)
  - Needs: `mood`, `energy`, `satiety`
  - Skills: `skills`, `activeSkills`, `conditionalSkills`, `breathingSkills`
  - Inventory: `inventory`, `equipments`, `inventorySize`
  - Social: `fame`, `relations`, `traits`, `title`
  - Action sequence: `actionSequence`
  - And more...

---

## Recommendation: Use Mock Data for UI Dev

### Why Mock Data First?
1. ✅ **Faster iteration** - No server dependency
2. ✅ **UI design first** - Focus on UX without API constraints  
3. ✅ **Easy integration later** - Just swap mock for API call
4. ✅ **Match backend structure** - Use same types/interfaces

### What to Do:
1. **Create mock data** that matches `PartyInterface` structure exactly
2. **Use TypeScript types** from backend (copy to frontend types)
3. **Design UI** with this mock data
4. **Later**: Replace mock data with API call to `/api/party/user`

---

## Next Steps

1. ✅ Create mock data file with proper structure
2. ✅ Update GameView to use mock data
3. ⏭️ Later: Create API service to fetch real data
4. ⏭️ Later: Replace mock with API call

---

## Mock Data Location

Suggested location: `Client/webapp/src/data/mockPartyData.ts`

This keeps mock data separate from components and makes it easy to remove later.

