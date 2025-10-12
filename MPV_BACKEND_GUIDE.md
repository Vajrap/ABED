# MPV Backend Implementation Guide

## Overview

This document provides detailed guidance for implementing the backend services and APIs for MPV.

---

## **Implementation Order**

### **Phase 1: Database & Core Services** (Week 1, Days 1-2)
1. Database schema migration
2. Party service
3. News service
4. Update CharacterService

### **Phase 2: API Endpoints** (Week 1, Days 3-4)
5. Party API
6. Game time API
7. Action schedule API
8. News API
9. Training options API

### **Phase 3: Game Loop Integration** (Week 1, Days 5-7)
10. Action processing
11. News generation
12. WebSocket setup
13. Testing & debugging

---

## **1. Database Schema Migration**

### **Step 1: Create Schema Files**

**File**: `Server/src/Database/Schema/party.ts`
```typescript
import { pgTable, varchar, timestamp, uuid, integer, jsonb } from "drizzle-orm/pg-core";
import { characters } from "./character";

export const parties = pgTable("parties", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  playerCharacterId: uuid("player_character_id").notNull().references(() => characters.id, { onDelete: "cascade" }),
  location: varchar("location", { length: 100 }).notNull().default("FyonarCapital"),
  gold: integer("gold").default(100).notNull(),
  supplies: jsonb("supplies").default({}).notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdBy: varchar("created_by", { length: 255 }).notNull(),
  updatedBy: varchar("updated_by", { length: 255 }).notNull(),
});

export type Party = typeof parties.$inferSelect;
export type InsertParty = typeof parties.$inferInsert;
```

**File**: `Server/src/Database/Schema/news.ts`
```typescript
import { pgTable, varchar, timestamp, uuid, text, jsonb } from "drizzle-orm/pg-core";

export const news = pgTable("news", {
  id: uuid("id").primaryKey().defaultRandom(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  scope: varchar("scope", { length: 20 }).notNull(),
  scopeId: varchar("scope_id", { length: 255 }),
  message: text("message").notNull(),
  metadata: jsonb("metadata").default({}).notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;
```

**File**: `Server/src/Database/Schema/userNewsRead.ts`
```typescript
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./user";

export const userNewsRead = pgTable("user_news_read", {
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).primaryKey(),
  lastReadTimestamp: timestamp("last_read_timestamp").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type UserNewsRead = typeof userNewsRead.$inferSelect;
export type InsertUserNewsRead = typeof userNewsRead.$inferInsert;
```

**Update**: `Server/src/Database/Schema/index.ts`
```typescript
export * from "./user";
export * from "./character";
export * from "./session";
export * from "./party";
export * from "./news";
export * from "./userNewsRead";
```

### **Step 2: Generate and Run Migration**
```bash
cd Server
bun run db:generate
bun run db:migrate:run
```

---

## **2. Party Service**

**File**: `Server/src/Services/PartyService.ts`

```typescript
import { eq } from "drizzle-orm";
import { db } from "../Database/connection";
import { parties, type InsertParty, type Party } from "../Database/Schema";
import { LocationsEnum } from "../Entity/Location/Config/enum";
import Report from "../Utils/Reporter";

export class PartyService {
  /**
   * Create a new party for a character
   */
  static async createParty(
    characterId: string,
    characterName: string
  ): Promise<Party> {
    const newParty: InsertParty = {
      name: `${characterName}'s Party`,
      playerCharacterId: characterId,
      location: LocationsEnum.FyonarCapital,
      gold: 100,
      supplies: {
        food: 20,
        water: 15,
        campSupplies: 5
      },
      createdBy: "system",
      updatedBy: "system",
    };

    const [party] = await db
      .insert(parties)
      .values(newParty)
      .returning();

    if (!party) {
      throw new Error("Failed to create party");
    }

    Report.info(`Party created: ${party.name} (${party.id})`);
    return party;
  }

  /**
   * Get party by player character ID
   */
  static async getPartyByCharacterId(characterId: string): Promise<Party | null> {
    const [party] = await db
      .select()
      .from(parties)
      .where(eq(parties.playerCharacterId, characterId))
      .limit(1);

    return party || null;
  }

  /**
   * Update party resources
   */
  static async updateParty(
    partyId: string,
    updates: Partial<Omit<Party, 'id' | 'createdAt' | 'createdBy'>>
  ): Promise<Party> {
    const [updatedParty] = await db
      .update(parties)
      .set({
        ...updates,
        updatedAt: new Date(),
        updatedBy: "system",
      })
      .where(eq(parties.id, partyId))
      .returning();

    if (!updatedParty) {
      throw new Error("Failed to update party");
    }

    return updatedParty;
  }

  /**
   * Add gold to party
   */
  static async addGold(partyId: string, amount: number): Promise<void> {
    const party = await this.getPartyById(partyId);
    if (!party) throw new Error("Party not found");

    await this.updateParty(partyId, {
      gold: party.gold + amount
    });
  }

  /**
   * Subtract gold from party
   */
  static async subtractGold(partyId: string, amount: number): Promise<boolean> {
    const party = await this.getPartyById(partyId);
    if (!party) throw new Error("Party not found");
    if (party.gold < amount) return false;

    await this.updateParty(partyId, {
      gold: party.gold - amount
    });
    return true;
  }

  /**
   * Get party by ID
   */
  static async getPartyById(partyId: string): Promise<Party | null> {
    const [party] = await db
      .select()
      .from(parties)
      .where(eq(parties.id, partyId))
      .limit(1);

    return party || null;
  }

  /**
   * Update party location
   */
  static async updateLocation(partyId: string, location: LocationsEnum): Promise<void> {
    await this.updateParty(partyId, { location });
    Report.info(`Party ${partyId} moved to ${location}`);
  }
}
```

---

## **3. News Service**

**File**: `Server/src/Services/NewsService.ts`

```typescript
import { eq, and, gt, desc } from "drizzle-orm";
import { db } from "../Database/connection";
import { news, userNewsRead, type InsertNews, type News } from "../Database/Schema";
import Report from "../Utils/Reporter";

export type NewsScope = 'private' | 'party' | 'location' | 'subRegion' | 'region' | 'world';

export class NewsService {
  /**
   * Create a news item
   */
  static async createNews(
    scope: NewsScope,
    scopeId: string | null,
    message: string,
    metadata: Record<string, any> = {}
  ): Promise<News> {
    const newsItem: InsertNews = {
      scope,
      scopeId,
      message,
      metadata,
    };

    const [created] = await db
      .insert(news)
      .values(newsItem)
      .returning();

    if (!created) {
      throw new Error("Failed to create news");
    }

    Report.info(`News created: [${scope}] ${message}`);
    return created;
  }

  /**
   * Create multiple news items (batch)
   */
  static async createNewsBatch(items: Array<{
    scope: NewsScope;
    scopeId: string | null;
    message: string;
    metadata?: Record<string, any>;
  }>): Promise<News[]> {
    const newsItems: InsertNews[] = items.map(item => ({
      scope: item.scope,
      scopeId: item.scopeId,
      message: item.message,
      metadata: item.metadata || {},
    }));

    const created = await db
      .insert(news)
      .values(newsItems)
      .returning();

    Report.info(`Created ${created.length} news items`);
    return created;
  }

  /**
   * Get news for a user (private + party + location)
   */
  static async getNewsForUser(
    userId: string,
    characterId: string,
    partyId: string,
    location: string,
    since?: Date
  ): Promise<News[]> {
    // Get user's last read timestamp if not provided
    let sinceDate = since;
    if (!sinceDate) {
      const [userRead] = await db
        .select()
        .from(userNewsRead)
        .where(eq(userNewsRead.userId, userId))
        .limit(1);
      
      sinceDate = userRead?.lastReadTimestamp || new Date(0);
    }

    // Get private news
    const privateNews = await db
      .select()
      .from(news)
      .where(
        and(
          eq(news.scope, 'private'),
          eq(news.scopeId, characterId),
          gt(news.timestamp, sinceDate)
        )
      )
      .orderBy(desc(news.timestamp))
      .limit(50);

    // Get party news
    const partyNews = await db
      .select()
      .from(news)
      .where(
        and(
          eq(news.scope, 'party'),
          eq(news.scopeId, partyId),
          gt(news.timestamp, sinceDate)
        )
      )
      .orderBy(desc(news.timestamp))
      .limit(50);

    // Get location news
    const locationNews = await db
      .select()
      .from(news)
      .where(
        and(
          eq(news.scope, 'location'),
          eq(news.scopeId, location),
          gt(news.timestamp, sinceDate)
        )
      )
      .orderBy(desc(news.timestamp))
      .limit(50);

    // Combine and sort
    const allNews = [...privateNews, ...partyNews, ...locationNews]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 100);

    return allNews;
  }

  /**
   * Mark news as read for a user
   */
  static async markAsRead(userId: string, timestamp: Date): Promise<void> {
    // Upsert user_news_read
    await db
      .insert(userNewsRead)
      .values({
        userId,
        lastReadTimestamp: timestamp,
      })
      .onConflictDoUpdate({
        target: userNewsRead.userId,
        set: {
          lastReadTimestamp: timestamp,
          updatedAt: new Date(),
        },
      });

    Report.info(`User ${userId} marked news as read up to ${timestamp}`);
  }

  /**
   * Get unread count for a user
   */
  static async getUnreadCount(
    userId: string,
    characterId: string,
    partyId: string,
    location: string
  ): Promise<number> {
    const [userRead] = await db
      .select()
      .from(userNewsRead)
      .where(eq(userNewsRead.userId, userId))
      .limit(1);

    const sinceDate = userRead?.lastReadTimestamp || new Date(0);

    const allNews = await this.getNewsForUser(userId, characterId, partyId, location, sinceDate);
    return allNews.length;
  }
}
```

---

## **4. Update CharacterService**

**File**: `Server/src/Services/CharacterService.ts`

Add party creation to `handleCreateCharacter`:

```typescript
static async handleCreateCharacter(
  userId: string,
  characterData: CharacterCreationData
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Create the Character entity
    const character = this.createCharacter(userId, characterData);
    
    // 2. Convert to InsertCharacter for database
    const insertCharacter = this.characterToInsertCharacter(character);
    
    // 3. Save to database
    const { id: characterId } = await this.saveCharacterToDatabase(insertCharacter);
    
    // 4. Create party for character (NEW)
    await PartyService.createParty(characterId, character.name);
    
    // 5. Return success
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
```

---

## **5. Party API**

**File**: `Server/src/API/party/index.ts`

```typescript
import express, { type Request, type Response } from 'express';
import Report from "../../Utils/Reporter";
import { PartyService } from "../../Services/PartyService";
import { CharacterService } from "../../Services/CharacterService";
import { SessionService } from "../../Services/SessionService";
import { characters } from "../../Database/Schema";
import { db } from "../../Database/connection";
import { eq } from "drizzle-orm";

export const partyRoutes = express.Router();

partyRoutes.get("/", async (req: Request, res: Response) => {
  console.log("🔥 PARTY ROUTE HIT!");
  try {
    // Get user from session
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return res.json({ success: false, messageKey: "auth.noToken" });
    }

    const user = await SessionService.validateSession(token);
    if (!user) {
      return res.json({ success: false, messageKey: "auth.invalidSession" });
    }

    // Get user's character
    const character = await CharacterService.getUserCharacter(user.id);
    if (!character) {
      return res.json({ success: false, messageKey: "character.notFound" });
    }

    // Get party
    const party = await PartyService.getPartyByCharacterId(character.id);
    if (!party) {
      return res.json({ success: false, messageKey: "party.notFound" });
    }

    // Get all characters in party
    const partyCharacters = await db
      .select()
      .from(characters)
      .where(eq(characters.partyId, party.id));

    // Build character IDs array (6 slots)
    const characterIds: (string | null)[] = [null, null, null, null, null, null];
    partyCharacters.forEach((char, index) => {
      if (index < 6) {
        characterIds[index] = char.id;
      }
    });

    return res.json({
      success: true,
      party: {
        id: party.id,
        name: party.name,
        playerCharacterId: party.playerCharacterId,
        location: party.location,
        gold: party.gold,
        supplies: party.supplies,
        characterIds,
      }
    });
  } catch (error) {
    Report.error(`Party fetch error: ${error}`);
    return res.json({ success: false, messageKey: "party.fetchFailed" });
  }
});

// Add to API index
```

**Update**: `Server/src/API/index.ts`
```typescript
import { partyRoutes } from "./party";
// ...
apiRoutes.use('/party', partyRoutes);
```

---

## **6. Game Time API**

**File**: `Server/src/API/game/index.ts`

```typescript
import express, { type Request, type Response } from 'express';
import { GameTime } from "../../Game/GameTime/GameTime";

export const gameRoutes = express.Router();

gameRoutes.get("/time", async (req: Request, res: Response) => {
  try {
    // Calculate time remaining until next phase (15 minutes)
    const now = new Date();
    const nextPhase = new Date(now.getTime() + (15 * 60 * 1000));
    const secondsRemaining = Math.floor((nextPhase.getTime() - now.getTime()) / 1000);

    return res.json({
      success: true,
      time: {
        dayOfWeek: GameTime.getCurrentGameDayOfWeek(),
        phase: GameTime.getCurrentGamePhase(),
        day: GameTime.gameDateDay,
        month: GameTime.gameDateMonth,
        year: GameTime.gameDateYear,
        phaseTimeRemaining: secondsRemaining
      }
    });
  } catch (error) {
    return res.json({ success: false, messageKey: "game.timeFetchFailed" });
  }
});

// Admin endpoint for testing
gameRoutes.post("/time/advance", async (req: Request, res: Response) => {
  // TODO: Add admin authentication
  try {
    const { phases = 1 } = req.body;
    
    for (let i = 0; i < phases; i++) {
      GameTime.advanceOnePhrase();
    }

    return res.json({
      success: true,
      newTime: {
        dayOfWeek: GameTime.getCurrentGameDayOfWeek(),
        phase: GameTime.getCurrentGamePhase(),
        day: GameTime.gameDateDay,
        month: GameTime.gameDateMonth,
        year: GameTime.gameDateYear,
      }
    });
  } catch (error) {
    return res.json({ success: false, messageKey: "game.advanceFailed" });
  }
});
```

**Update**: `Server/src/API/index.ts`
```typescript
import { gameRoutes } from "./game";
// ...
apiRoutes.use('/game', gameRoutes);
```

---

## **7. News API**

**File**: `Server/src/API/news/index.ts`

```typescript
import express, { type Request, type Response } from 'express';
import Report from "../../Utils/Reporter";
import { NewsService } from "../../Services/NewsService";
import { CharacterService } from "../../Services/CharacterService";
import { PartyService } from "../../Services/PartyService";
import { SessionService } from "../../Services/SessionService";

export const newsRoutes = express.Router();

newsRoutes.get("/", async (req: Request, res: Response) => {
  try {
    // Authenticate
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return res.json({ success: false, messageKey: "auth.noToken" });
    }

    const user = await SessionService.validateSession(token);
    if (!user) {
      return res.json({ success: false, messageKey: "auth.invalidSession" });
    }

    // Get character and party
    const character = await CharacterService.getUserCharacter(user.id);
    if (!character) {
      return res.json({ success: false, messageKey: "character.notFound" });
    }

    const party = await PartyService.getPartyByCharacterId(character.id);
    if (!party) {
      return res.json({ success: false, messageKey: "party.notFound" });
    }

    // Get news
    const since = req.query.since ? new Date(req.query.since as string) : undefined;
    const news = await NewsService.getNewsForUser(
      user.id,
      character.id,
      party.id,
      party.location,
      since
    );

    return res.json({
      success: true,
      news,
      hasMore: false  // For MPV, no pagination
    });
  } catch (error) {
    Report.error(`News fetch error: ${error}`);
    return res.json({ success: false, messageKey: "news.fetchFailed" });
  }
});

newsRoutes.post("/mark-read", async (req: Request, res: Response) => {
  try {
    // Authenticate
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return res.json({ success: false, messageKey: "auth.noToken" });
    }

    const user = await SessionService.validateSession(token);
    if (!user) {
      return res.json({ success: false, messageKey: "auth.invalidSession" });
    }

    const { lastReadTimestamp } = req.body;
    if (!lastReadTimestamp) {
      return res.json({ success: false, messageKey: "news.invalidTimestamp" });
    }

    await NewsService.markAsRead(user.id, new Date(lastReadTimestamp));

    return res.json({ success: true });
  } catch (error) {
    Report.error(`Mark news as read error: ${error}`);
    return res.json({ success: false, messageKey: "news.markReadFailed" });
  }
});
```

**Update**: `Server/src/API/index.ts`
```typescript
import { newsRoutes } from "./news";
// ...
apiRoutes.use('/news', newsRoutes);
```

---

## **8. WebSocket Setup**

**File**: `Server/src/WebSocket/index.ts`

```typescript
import { Server as SocketIOServer } from 'socket.io';
import type { Server as HTTPServer } from 'http';
import { SessionService } from '../Services/SessionService';
import Report from '../Utils/Reporter';

export class WebSocketServer {
  private io: SocketIOServer;
  private userSockets: Map<string, string> = new Map(); // userId -> socketId

  constructor(httpServer: HTTPServer) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    this.setupMiddleware();
    this.setupEventHandlers();
  }

  private setupMiddleware() {
    // Authentication middleware
    this.io.use(async (socket, next) => {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const user = await SessionService.validateSession(token);
      if (!user) {
        return next(new Error('Invalid session'));
      }

      socket.data.userId = user.id;
      socket.data.username = user.username;
      next();
    });
  }

  private setupEventHandlers() {
    this.io.on('connection', (socket) => {
      const userId = socket.data.userId;
      const username = socket.data.username;

      Report.info(`WebSocket connected: ${username} (${userId})`);
      this.userSockets.set(userId, socket.id);

      socket.on('disconnect', () => {
        Report.info(`WebSocket disconnected: ${username}`);
        this.userSockets.delete(userId);
      });

      // Subscribe to party updates
      socket.on('subscribe:party', (data: { partyId: string }) => {
        socket.join(`party:${data.partyId}`);
        Report.info(`${username} subscribed to party ${data.partyId}`);
      });

      socket.on('unsubscribe:party', (data: { partyId: string }) => {
        socket.leave(`party:${data.partyId}`);
        Report.info(`${username} unsubscribed from party ${data.partyId}`);
      });
    });
  }

  // Emit time advanced to all clients
  public emitTimeAdvanced(time: any) {
    this.io.emit('time:advanced', time);
  }

  // Emit news to specific user
  public emitNewsToUser(userId: string, news: any[]) {
    const socketId = this.userSockets.get(userId);
    if (socketId) {
      this.io.to(socketId).emit('news:new', { news });
    }
  }

  // Emit character update to specific user
  public emitCharacterUpdate(userId: string, changes: any) {
    const socketId = this.userSockets.get(userId);
    if (socketId) {
      this.io.to(socketId).emit('character:updated', changes);
    }
  }

  // Emit party update to all party members
  public emitPartyUpdate(partyId: string, changes: any) {
    this.io.to(`party:${partyId}`).emit('party:updated', changes);
  }
}

export let wsServer: WebSocketServer;

export function initializeWebSocket(httpServer: HTTPServer) {
  wsServer = new WebSocketServer(httpServer);
  Report.info('WebSocket server initialized');
}
```

**Update**: `Server/src/index.ts`
```typescript
import { createServer } from 'http';
import { initializeWebSocket } from './WebSocket';

// ... existing code ...

async function startServer() {
  try {
    await initializeDatabase();

    const game = new Game();
    await game.start();

    // Create HTTP server
    const httpServer = createServer(app);

    // Initialize WebSocket
    initializeWebSocket(httpServer);

    // Start server
    httpServer.listen(PORT, () => {
      Report.info(`Server running on port ${PORT}`);
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down server...');
      httpServer.close(async () => {
        await shutdownDatabase();
        process.exit(0);
      });
    });

  } catch (error) {
    Report.error(`Server startup failed: ${error}`);
    await shutdownDatabase();
    process.exit(1);
  }
}
```

---

## **9. Action Processing Integration**

**File**: `Server/src/Game/GameLoop.ts`

Update to generate news and emit WebSocket events:

```typescript
import { wsServer } from '../WebSocket';
import { NewsService } from '../Services/NewsService';

async function runGameLoop(state: GameState) {
  try {
    GameTime.advanceOnePhrase();
    
    // Emit time advanced
    wsServer.emitTimeAdvanced({
      dayOfWeek: GameTime.getCurrentGameDayOfWeek(),
      phase: GameTime.getCurrentGamePhase(),
      day: GameTime.gameDateDay,
      month: GameTime.gameDateMonth,
      year: GameTime.gameDateYear,
    });

    const mileStoneNews = handleGameMilestones(state);
    const news = await processEvents(
      GameTime.getCurrentGameDayOfWeek(),
      GameTime.getCurrentGamePhase(),
    );

    const allNews = mergeNewsStructures(news, mileStoneNews);

    // Save news to database and emit to clients
    await sendPartyData(allNews);
    
    console.log("Game loop executed successfully.");
  } catch (error) {
    console.error("Error during game loop:", error);
  }
}

async function sendPartyData(newsStructure: NewsEmittedFromLocationStructure) {
  // Save private news
  for (const [characterId, newsItems] of newsStructure.privateScope) {
    for (const newsItem of newsItems) {
      await NewsService.createNews(
        'private',
        characterId,
        newsItem.message,
        newsItem.metadata
      );
      
      // Emit to user (need to get userId from characterId)
      // TODO: Add character-to-user mapping
    }
  }

  // Save party news
  for (const [partyId, newsItems] of newsStructure.partyScope) {
    for (const newsItem of newsItems) {
      await NewsService.createNews(
        'party',
        partyId,
        newsItem.message,
        newsItem.metadata
      );
      
      // Emit to party
      wsServer.emitPartyUpdate(partyId, { news: newsItem });
    }
  }

  // TODO: Handle other scopes (location, region, world)
}
```

---

## **Implementation Checklist**

### **Database**
- [ ] Create party schema
- [ ] Create news schema
- [ ] Create userNewsRead schema
- [ ] Generate migration
- [ ] Run migration
- [ ] Test tables created

### **Services**
- [ ] PartyService (create, get, update)
- [ ] NewsService (create, get, mark read)
- [ ] Update CharacterService (create party on character creation)

### **API Endpoints**
- [ ] GET /api/party
- [ ] GET /api/game/time
- [ ] POST /api/game/time/advance (admin)
- [ ] GET /api/news
- [ ] POST /api/news/mark-read
- [ ] GET /api/training/options (optional for MPV)

### **WebSocket**
- [ ] Setup Socket.IO
- [ ] Authentication middleware
- [ ] Connection handling
- [ ] Event emitters (time, news, character, party)
- [ ] Room management

### **Game Loop Integration**
- [ ] Update GameLoop to save news
- [ ] Emit WebSocket events on phase advance
- [ ] Test action processing generates news

### **Testing**
- [ ] Test party creation on character creation
- [ ] Test news generation
- [ ] Test WebSocket connection
- [ ] Test time advance (manual)
- [ ] End-to-end flow

---

**Last Updated**: October 8, 2025  
**Status**: Implementation Guide Complete - Ready for Development
