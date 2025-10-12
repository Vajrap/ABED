# MPV API Specification

## Overview

This document defines all API endpoints required for the Minimum Playable Version (MPV).

---

## **Authentication**

All game endpoints require authentication via session token in Authorization header:
```
Authorization: Bearer <token>
```

---

## **1. Party Management**

### **GET /api/party**
Get the player's party data

**Request:**
```http
GET /api/party
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "party": {
    "id": "party-uuid",
    "name": "Hero's Party",
    "playerCharacterId": "char-uuid",
    "location": "FyonarCapital",
    "gold": 100,
    "supplies": {
      "food": 20,
      "water": 15
    },
    "characterIds": ["char-uuid", null, null, null, null, null]
  }
}
```

**Notes:**
- Party created automatically on character creation
- characterIds array always has 6 slots
- null = empty slot
- For MPV: Only first slot filled (player character)

---

## **2. Character Data**

### **GET /api/character**
Get player's character data

**Request:**
```http
GET /api/character
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "character": {
    // Full Character object (see CharacterInterface in backend)
    "id": "char-uuid",
    "name": "Hero",
    "level": 5,
    "attributes": { ... },
    "vitals": { "hp": { "current": 80, "max": 100 }, ... },
    // ... all other character fields
  }
}
```

**Notes:**
- Returns full character data matching backend CharacterInterface
- Used when GameView loads to populate character display

---

## **3. Game Time**

### **GET /api/game/time**
Get current game time

**Request:**
```http
GET /api/game/time
```

**Response:**
```json
{
  "success": true,
  "time": {
    "dayOfWeek": 2,        // 0-5 (Laoh, Rowana, Aftree, Udur, Matris, Seethar)
    "phase": 1,            // 0-3 (morning, afternoon, evening, night)
    "day": 15,             // 1-24 (day of month)
    "month": 3,            // 1-14
    "year": 0,
    "phaseTimeRemaining": 847 // seconds until next phase
  }
}
```

**Notes:**
- Public endpoint (no auth required)
- Used to display current time in UI
- phaseTimeRemaining for countdown display

---

## **4. Action Schedule**

### **GET /api/character/schedule**
Get character's action schedule

**Request:**
```http
GET /api/character/schedule
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "schedule": {
    "0": {  // Day of week (0-5)
      "0": { "type": "Rest" },           // Morning
      "1": { "type": "Stroll" },         // Afternoon
      "2": { "type": "TrainAttribute", "attribute": "strength" }, // Evening
      "3": { "type": "Rest" }            // Night
    },
    "1": { "0": {...}, "1": {...}, "2": {...}, "3": {...} },
    // ... days 2-5
  }
}
```

### **POST /api/character/schedule**
Update character's action schedule

**Request:**
```http
POST /api/character/schedule
Authorization: Bearer <token>
Content-Type: application/json

{
  "schedule": {
    "0": {
      "0": { "type": "Rest" },
      "1": { "type": "Stroll" },
      "2": { "type": "TrainAttribute", "attribute": "strength" },
      "3": { "type": "Rest" }
    },
    // ... other days
  }
}
```

**Response:**
```json
{
  "success": true,
  "messageKey": "schedule.saved"
}
```

**Notes:**
- Validates action types
- Does NOT validate location (validated on execution)
- Immediately saves to database
- Can update partial schedule (only changed days)

---

## **5. Available Actions**

### **GET /api/actions/available**
Get actions available at player's current location

**Request:**
```http
GET /api/actions/available
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "location": "FyonarCapital",
  "actions": [
    "rest",
    "strolling",
    "training_attribute",
    "training_proficiency",
    "training_artisan",
    "socializing",
    "dining"
  ]
}
```

**Notes:**
- Returns action IDs only (frontend has names/icons)
- Changes based on party location
- Used to populate action selection modal
- May also vary by time phase (some actions only at certain times)

---

## **6. News System**

### **GET /api/news**
Get player's news feed

**Request:**
```http
GET /api/news?since=<timestamp>
Authorization: Bearer <token>
```

**Query Parameters:**
- `since` (optional): ISO timestamp, returns only news after this time
- If omitted: returns all unread news

**Response:**
```json
{
  "success": true,
  "news": [
    {
      "id": "news-uuid",
      "timestamp": "2025-10-08T10:30:00Z",
      "scope": "private",
      "message": "You rested and recovered 20 HP",
      "characters": ["Hero"],
      "metadata": {
        "hpRecovered": 20
      }
    },
    {
      "id": "news-uuid-2",
      "timestamp": "2025-10-08T10:45:00Z",
      "scope": "party",
      "message": "Your party found 50 gold while strolling",
      "characters": ["Hero"],
      "metadata": {
        "goldGained": 50
      }
    }
  ],
  "hasMore": false
}
```

**Notes:**
- Sorted by timestamp (newest first)
- Limited to last 100 news items per request
- Scopes: private, party, location, subRegion, region, world
- For MPV: Focus on private and party news

### **POST /api/news/mark-read**
Mark news as read

**Request:**
```http
POST /api/news/mark-read
Authorization: Bearer <token>
Content-Type: application/json

{
  "lastReadTimestamp": "2025-10-08T10:45:00Z"
}
```

**Response:**
```json
{
  "success": true
}
```

---

## **7. WebSocket Events**

### **Connection**
```javascript
const socket = io('http://localhost:7890', {
  auth: {
    token: sessionToken
  }
});
```

### **Server → Client Events**

#### **time:advanced**
Emitted every 15 minutes when game phase advances

```json
{
  "dayOfWeek": 2,
  "phase": 1,
  "day": 15,
  "month": 3,
  "year": 0
}
```

#### **news:new**
Emitted when new news is generated for the player

```json
{
  "news": [
    {
      "id": "news-uuid",
      "timestamp": "2025-10-08T10:30:00Z",
      "scope": "private",
      "message": "You trained Strength and gained 1 point!",
      "metadata": { "attributeGained": "strength", "amount": 1 }
    }
  ]
}
```

#### **character:updated**
Emitted when character stats change

```json
{
  "characterId": "char-uuid",
  "changes": {
    "vitals": {
      "hp": { "current": 90, "max": 100 }
    },
    "attributes": {
      "strength": { "base": 11, "bonus": 0, "total": 11 }
    }
  }
}
```

#### **party:updated**
Emitted when party resources change

```json
{
  "partyId": "party-uuid",
  "changes": {
    "gold": 150,
    "supplies": {
      "food": 18
    }
  }
}
```

### **Client → Server Events**

#### **subscribe:party**
Subscribe to party updates

```json
{
  "partyId": "party-uuid"
}
```

#### **unsubscribe:party**
Unsubscribe from party updates

```json
{
  "partyId": "party-uuid"
}
```

---

## **8. Training Sub-Selection**

### **GET /api/training/options**
Get available training targets for a specific training type

**Request:**
```http
GET /api/training/options?type=attribute
Authorization: Bearer <token>
```

**Query Parameters:**
- `type`: One of `attribute`, `proficiency`, `artisan`, `skill`

**Response for type=attribute:**
```json
{
  "success": true,
  "options": [
    { "id": "strength", "name": "Strength", "current": 10 },
    { "id": "intelligence", "name": "Intelligence", "current": 8 },
    { "id": "vitality", "name": "Vitality", "current": 9 },
    // ... all attributes
  ]
}
```

**Response for type=artisan:**
```json
{
  "success": true,
  "options": [
    { "id": "smithing", "name": "Smithing", "current": 8 },
    { "id": "cooking", "name": "Cooking", "current": 10 },
    // ... all artisan skills
  ]
}
```

**Notes:**
- Returns current values so player can see progress
- Frontend uses this to populate training selection modal
- For MPV: Only implement attribute and artisan

---

## **9. Admin/Testing Endpoints**

### **POST /api/admin/time/advance**
Manually advance game time (testing only)

**Request:**
```http
POST /api/admin/time/advance
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "phases": 1  // Number of phases to advance (default: 1)
}
```

**Response:**
```json
{
  "success": true,
  "newTime": {
    "dayOfWeek": 2,
    "phase": 2,
    "day": 15,
    "month": 3,
    "year": 0
  }
}
```

**Notes:**
- Protected endpoint (requires admin role or dev environment)
- Triggers full game loop processing
- Useful for testing without waiting 15 minutes

---

## **Error Responses**

All endpoints may return error responses:

```json
{
  "success": false,
  "messageKey": "error.key.for.i18n",
  "message": "Human-readable error message"
}
```

**Common Error Keys:**
- `auth.noToken` - Missing authentication token
- `auth.invalidSession` - Invalid or expired token
- `party.notFound` - Player has no party
- `character.notFound` - Character not found
- `schedule.invalidAction` - Invalid action type
- `location.actionNotAvailable` - Action not available at location

---

## **Response Time Expectations**

- **GET endpoints**: < 100ms
- **POST endpoints**: < 200ms
- **WebSocket events**: < 50ms after game tick
- **Heavy operations** (phase processing): < 2s

---

## **Rate Limiting**

For MPV:
- No rate limiting (trust-based)
- Post-MPV: Implement rate limiting for anti-cheat

---

## **Implementation Checklist**

### **Backend APIs**
- [ ] GET /api/party
- [ ] GET /api/character
- [ ] GET /api/game/time
- [ ] GET /api/character/schedule
- [ ] POST /api/character/schedule
- [ ] GET /api/actions/available
- [ ] GET /api/news
- [ ] POST /api/news/mark-read
- [ ] GET /api/training/options
- [ ] POST /api/admin/time/advance (testing)

### **WebSocket Events**
- [ ] Server setup (Socket.IO)
- [ ] Authentication middleware
- [ ] time:advanced emission
- [ ] news:new emission
- [ ] character:updated emission
- [ ] party:updated emission
- [ ] Room management (per party/user)

### **Frontend Integration**
- [ ] WebSocket client setup
- [ ] Event handlers for all events
- [ ] API service methods for all endpoints
- [ ] Loading states
- [ ] Error handling
- [ ] Reconnection logic

---

**Last Updated**: October 8, 2025  
**Status**: Specification Complete - Ready for Implementation

