# Party API - Updated Implementation

## Summary

Two separate endpoints implemented with full character data in party response.

---

## API Endpoints

### 1. GET /api/party/user
**Purpose**: Get current logged-in user's party (main endpoint for players)

**Authentication**: Required (Bearer token)

**Response**:
```json
{
  "success": true,
  "party": {
    "id": "party-uuid",
    "partyID": "party-uuid",
    "location": "FyonarCity",
    "isTraveling": false,
    "characters": [
      {
        // Full CharacterInterface for slot 0 (player)
        "id": "char-uuid",
        "name": "Hero",
        "level": 5,
        "portrait": "m_human01",
        "vitals": { ... },
        "attributes": { ... },
        // ... all character data
      },
      null, // Empty slot 1
      null, // Empty slot 2
      null, // Empty slot 3
      null, // Empty slot 4
      null  // Empty slot 5
    ],
    "playerCharacterId": "char-uuid"
  }
}
```

**Usage**:
```bash
curl http://localhost:7890/api/party/user \
  -H "Authorization: Bearer <token>"
```

---

### 2. GET /api/party/:partyId
**Purpose**: Get ANY party by ID (admin/debug use)

**Authentication**: Not required (but maybe should add later)

**Response**: Same as above but for specified party

**Usage**:
```bash
curl http://localhost:7890/api/party/some-party-uuid
```

---

## Key Changes from Original

### 1. Split into Two Endpoints

**Before**: Single `/api/party` endpoint  
**After**: 
- `/api/party/user` - Get user's party
- `/api/party/:partyId` - Get party by ID

**Reason**: Different use cases, clearer semantics

---

### 2. PartyInterface Updated

**Before**:
```typescript
interface PartyInterface {
  characterIds: (string | "none")[]; // Just IDs
}
```

**After**:
```typescript
interface PartyInterface {
  characters: (CharacterInterface | null)[]; // Full character data
}
```

**Reason**: Frontend needs all character data to display party members

---

### 3. PartyMapper Enhanced

**Before**: Only mapped character IDs  
**After**: Maps all 6 character slots with full CharacterInterface data

```typescript
export function mapPartyToInterface(party: Party): PartyInterface {
  // Map all 6 character slots to CharacterInterface or null
  const characters = party.characters.map(char => 
    char === "none" ? null : mapCharacterToInterface(char)
  );
  
  return {
    id: party.partyID,
    partyID: party.partyID,
    location: party.location,
    isTraveling: party.isTraveling,
    characters, // Full data, not just IDs
    playerCharacterId: party.leader.id,
  };
}
```

---

## Response Structure

### Single Response Object

**Before**: Returned both `party` and `character` separately  
**After**: Returns only `party` which contains all character data

```json
{
  "success": true,
  "party": {
    "characters": [
      { /* full character 0 data */ },
      null,
      null,
      null,
      null,
      null
    ]
  }
}
```

**Benefits**:
- Simpler response structure
- All party data in one place
- Frontend can iterate through characters array
- Null for empty slots (easy to check)

---

## Known Issues (Intentional)

### Skills Mapping Error

**Location**: `Server/src/Utils/CharacterMapper.ts` lines 94-95

**Error**:
```
Type 'SkillId[]' is not assignable to type 'CharacterSkillInterface[]'
```

**Status**: **Intentionally left as error**

**Reason**: 
- Skills system not fully implemented yet
- Error serves as reminder to fix later
- Using `[]` would hide the TODO

**When to fix**: When implementing the full skills system

---

## Architecture Flow

### GET /api/party/user
```
Request with Bearer token
    ↓
SessionService.validateSession(token)
    ↓
Get User
    ↓
CharacterManager.getUserCharacterByUserId(user.id)
    ↓
Get Character (in-memory)
    ↓
PartyManager.getPartyByID(character.partyID)
    ↓
Get Party (in-memory)
    ↓
mapPartyToInterface(party)
    ├─> Map party metadata
    └─> Map all 6 character slots
        └─> mapCharacterToInterface() for each non-null character
    ↓
Return { success: true, party: {...} }
```

### GET /api/party/:partyId
```
Request with partyId param
    ↓
PartyManager.getPartyByID(partyId)
    ↓
Get Party (in-memory)
    ↓
mapPartyToInterface(party)
    ↓
Return { success: true, party: {...} }
```

---

## Error Handling

**Both endpoints handle**:
- Missing/invalid token (user endpoint only)
- Invalid session (user endpoint only)
- Character not found (user endpoint only)
- Character has no partyID (user endpoint only)
- Party not found (both)
- Invalid partyId parameter (ID endpoint only)
- Unexpected errors (both)

---

## Frontend Usage

### Fetching User's Party

```typescript
const response = await fetch('http://localhost:7890/api/party/user', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const data = await response.json();

if (data.success) {
  const party = data.party;
  
  // Access all characters
  party.characters.forEach((char, index) => {
    if (char) {
      console.log(`Slot ${index}: ${char.name} (Level ${char.level})`);
    } else {
      console.log(`Slot ${index}: Empty`);
    }
  });
  
  // Find player character
  const playerChar = party.characters.find(c => c?.id === party.playerCharacterId);
}
```

---

## Testing

### Test User Party Endpoint

```bash
# 1. Login
TOKEN=$(curl -s -X POST http://localhost:7890/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}' \
  | jq -r '.token')

# 2. Get party
curl http://localhost:7890/api/party/user \
  -H "Authorization: Bearer $TOKEN" \
  | jq
```

### Test Party by ID Endpoint

```bash
# Get party by ID (no auth needed)
curl http://localhost:7890/api/party/some-party-uuid | jq
```

---

## Files Modified

1. **Server/src/API/party/index.ts**
   - Split into two routes: `/user` and `/:partyId`
   - Removed separate character response
   - Added partyId validation

2. **Server/src/InterFacesEnumsAndTypes/PartyInterface.ts**
   - Changed `characterIds` to `characters`
   - Changed type from `(string | "none")[]` to `(CharacterInterface | null)[]`

3. **Server/src/Utils/PartyMapper.ts**
   - Maps full character data for all slots
   - Uses `mapCharacterToInterface()` for each character
   - Returns `null` for empty slots

---

## Next Steps

### Immediate
1. Test both endpoints with real data
2. Verify character data mapping works correctly
3. Check performance with full character data (should be fast since in-memory)

### Future
1. Add authentication to `/:partyId` endpoint (admin only)
2. Fix skills mapping when skills system is implemented
3. Add caching if performance becomes an issue
4. Add pagination if party list endpoints needed

---

**Status**: Complete - Two separate endpoints with full character data ✅

**Known Issues**: Skills mapping error (intentional) ⚠️

**Ready for Testing**: Yes ✅

---

**Last Updated**: October 8, 2025

