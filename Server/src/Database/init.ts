import { testConnection, closeConnection, pool } from "./connection";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./connection";
import { gameState } from "../Game/GameState";
import { market } from "../Entity/Market/Market";
import { loadItemInstance } from "../Entity/Item/Equipment/ItemInstance/repository";
import {
  gameState as gameStateTable,
  marketState,
  resourceProductionTracking,
  itemInstances,
} from "./Schema";
import Report from "../Utils/Reporter";
import { GameTime } from "../Game/GameTime/GameTime";
import { sql } from "drizzle-orm";
import { loadCharactersFromDatabase } from "../Utils/CharacterDatabaseLoader";
import { loadPartiesFromDatabase } from "../Utils/PartyDatabaseLoader";

export async function initializeDatabase(): Promise<void> {
  Report.info("🚀 Initializing database...");

  try {
    // Test connection first
    const connected = await testConnection();
    if (!connected) {
      throw new Error("Failed to connect to database");
    }

    // Check if tables exist
    const tablesExist = await checkTablesExist();
    if (!tablesExist) {
      Report.info("📦 Creating database tables...");

      try {
        // Run migrations to create tables
        await migrate(db, { migrationsFolder: "./src/Database/migrations" });
        Report.info("✅ Database tables created successfully");
      } catch (migrationError) {
        Report.warn(
          "⚠️  Migration runner failed, attempting manual table creation...",
          { error: migrationError },
        );
        await createTablesManually();
      }
    } else {
      Report.info("✅ Database tables already exist");

      // Still try to run migrations in case there are new ones
      try {
        await migrate(db, { migrationsFolder: "./src/Database/migrations" });
        Report.info("✅ Database migrations up to date");
      } catch (migrationError) {
        Report.info("ℹ️  No new migrations to apply");
      }
    }

    // Load game data from database
    await loadGameDataFromDatabase();

    Report.info("🎉 Database initialization completed successfully");
  } catch (error) {
    Report.error("❌ Database initialization failed", { error });
    throw error;
  }
}

/**
 * Load all game data from database into runtime entities
 */
async function loadGameDataFromDatabase(): Promise<void> {
  Report.info("📥 Loading game data from database...");

  try {
    // Load Characters (must be loaded first as parties depend on them)
    await loadCharactersFromDatabase();
    
    // Load Parties (depends on characters being loaded)
    await loadPartiesFromDatabase();

    // Load Game State
    await loadGameState();

    // Load Market State
    await loadMarketState();

    // Load Resource Production Tracking
    await loadResourceProductionTracking();

    // Load Item Instances
    await loadItemInstances();

    Report.info("✅ Game data loaded successfully");
  } catch (error) {
    Report.error("❌ Error loading game data", { error });
    throw error;
  }
}

/**
 * Load game state from database or create default
 */
async function loadGameState(): Promise<void> {
  try {
    const [state] = await db.select().from(gameStateTable).limit(1);

    if (state) {
      // Update the singleton gameState instance
      Object.assign(gameState, {
        id: state.id,
        lastGlobalEventCardCompleted: state.lastGlobalEventCardCompleted,
        activeGlobalEventCards: state.activeGlobalEventCard,
        globalEventCardDeck: state.globalEventCardDeck,
        completedGlobalEventCards: state.completedGlobalEventCards,
        regionEventCardDeck: state.regionEventCardDeck,
        completedRegionEventCards: state.completedRegionEventCards,
        globalEventScale: state.globalEventScale,
        lastProcessedPhaseIndex: state.lastProcessedPhase,
      });
      GameTime.setLastProcessedPhaseIndex(state.lastProcessedPhase ?? 0);
      Report.info("✅ Game state loaded from database");
    } else {
      // Create default game state in database
      const insertedRows = await db
        .insert(gameStateTable)
        .values({
          lastGlobalEventCardCompleted:
            gameState.lastGlobalEventCardCompleted,
          activeGlobalEventCard: gameState.activeGlobalEventCards,
          globalEventCardDeck: gameState.globalEventCardDeck,
          completedGlobalEventCards: gameState.completedGlobalEventCards,
          regionEventCardDeck: gameState.regionEventCardDeck,
          completedRegionEventCards: gameState.completedRegionEventCards,
          globalEventScale: gameState.globalEventScale,
          lastProcessedPhase: gameState.lastProcessedPhaseIndex,
        })
        .returning({
          id: gameStateTable.id,
          lastProcessedPhase: gameStateTable.lastProcessedPhase,
        });

      const inserted = insertedRows[0];
      if (!inserted) {
        throw new Error("Failed to insert default game state");
      }

      gameState.id = inserted.id;
      gameState.lastProcessedPhaseIndex = inserted.lastProcessedPhase ?? 0;
      GameTime.setLastProcessedPhaseIndex(inserted.lastProcessedPhase ?? 0);
      Report.info("✅ Default game state created in database");
    }
  } catch (error: any) {
    // Check if error is "table does not exist"
    if (error?.code === "42703" && error?.message?.includes("last_processed_phase")) {
      Report.warn(
        "⚠️  game_state.last_processed_phase column missing; attempting to add it automatically",
      );
      await db.execute(
        sql`ALTER TABLE "game_state" ADD COLUMN IF NOT EXISTS "last_processed_phase" integer DEFAULT 0 NOT NULL`,
      );
      return await loadGameState();
    }
    if (
      error?.code === "42P01" ||
      error?.message?.includes("does not exist")
    ) {
      Report.info("ℹ️  Game state table does not exist yet, will be created on next migration");
      return;
    }
    Report.error("❌ Error loading game state", { error });
    throw error;
  }
}

/**
 * Load market state from database or create default
 */
async function loadMarketState(): Promise<void> {
  try {
    const [state] = await db.select().from(marketState).limit(1);

    if (state) {
      market.stateId = state.id;
      // Restore market state from database
      // Convert JSONB maps back to Map objects
      const yearlyModifiers = new Map(Object.entries(state.yearlyModifiers as Record<string, number>));
      const eventModifiers = new Map(
        Object.entries(state.eventModifiers as Record<string, Record<string, number>>).map(
          ([key, value]) => [key, new Map(Object.entries(value))]
        )
      );
      const transactionHistory = new Map(
        Object.entries(state.transactionHistory as Record<string, Record<string, any>>).map(
          ([locKey, locValue]) => [
            locKey,
            new Map(Object.entries(locValue))
          ]
        )
      );

      market.yearlyModifiers = yearlyModifiers as any;
      market.eventModifiers = eventModifiers as any;
      market.transactionHistory = transactionHistory as any;

      Report.info("✅ Market state loaded from database");
    } else {
      // Create default market state (yearly modifiers already initialized in Market constructor)
      const currentYear = GameTime.year;
      const insertedRows = await db
        .insert(marketState)
        .values({
          yearlyModifiers: Object.fromEntries(market.yearlyModifiers),
          eventModifiers: {},
          transactionHistory: {},
          currentYear,
          lastYearlyAdjustment: new Date(),
        })
        .returning({ id: marketState.id });

      const inserted = insertedRows[0];
      if (inserted) {
        market.stateId = inserted.id;
      }
      Report.info("✅ Default market state created in database");
    }
  } catch (error: any) {
    // Check if error is "table does not exist"
    if (error?.code === "42P01" || error?.message?.includes("does not exist")) {
      Report.info("ℹ️  Market state table does not exist yet, will be created on next migration");
      return;
    }
    Report.error("❌ Error loading market state", { error });
    throw error;
  }
}

/**
 * Load resource production tracking from database or create default
 */
async function loadResourceProductionTracking(): Promise<void> {
  try {
    const [tracking] = await db.select().from(resourceProductionTracking).limit(1);

    if (tracking) {
      market.resourceTracker.dbId = tracking.id;
      // Restore resource production tracker
      // Convert JSONB maps back to Map objects
      const yp = tracking.yearlyProduction as any;
      const bl = tracking.baselines as any;
      
      const yearlyProduction = {
        global: new Map(Object.entries(yp.global as Record<string, number>)),
        subregion: new Map(
          Object.entries(yp.subregion as Record<string, Record<string, number>>).map(
            ([key, value]) => [key, new Map(Object.entries(value))]
          )
        ),
        location: new Map(
          Object.entries(yp.location as Record<string, Record<string, number>>).map(
            ([key, value]) => [key, new Map(Object.entries(value))]
          )
        ),
      };

      const baselines = {
        global: new Map(Object.entries(bl.global as Record<string, number>)),
        subregion: new Map(
          Object.entries(bl.subregion as Record<string, Record<string, number>>).map(
            ([key, value]) => [key, new Map(Object.entries(value))]
          )
        ),
        location: new Map(
          Object.entries(bl.location as Record<string, Record<string, number>>).map(
            ([key, value]) => [key, new Map(Object.entries(value))]
          )
        ),
      };

      market.resourceTracker.yearlyProduction = yearlyProduction as any;
      market.resourceTracker.baselines = baselines as any;

      Report.info("✅ Resource production tracking loaded from database");
    } else {
      // Create default resource production tracking
      const currentYear = GameTime.year;
      const tracker = market.resourceTracker;

      const insertedRows = await db
        .insert(resourceProductionTracking)
        .values({
          currentYear,
          yearlyProduction: {
            global: Object.fromEntries(tracker.yearlyProduction.global),
            subregion: Object.fromEntries(
              Array.from(tracker.yearlyProduction.subregion.entries()).map(([k, v]) => [k, Object.fromEntries(v)])
            ),
            location: Object.fromEntries(
              Array.from(tracker.yearlyProduction.location.entries()).map(([k, v]) => [k, Object.fromEntries(v)])
            ),
          },
          baselines: {
            global: Object.fromEntries(tracker.baselines.global),
            subregion: Object.fromEntries(
              Array.from(tracker.baselines.subregion.entries()).map(([k, v]) => [k, Object.fromEntries(v)])
            ),
            location: Object.fromEntries(
              Array.from(tracker.baselines.location.entries()).map(([k, v]) => [k, Object.fromEntries(v)])
            ),
          },
          lastReset: new Date(),
        })
        .returning({ id: resourceProductionTracking.id });

      const inserted = insertedRows[0];
      if (inserted) {
        market.resourceTracker.dbId = inserted.id;
      }
      Report.info("✅ Default resource production tracking created in database");
    }
  } catch (error: any) {
    // Check if error is "table does not exist"
    if (error?.code === "42P01" || error?.message?.includes("does not exist")) {
      Report.info("ℹ️  Resource production tracking table does not exist yet, will be created on next migration");
      return;
    }
    Report.error("❌ Error loading resource production tracking", { error });
    throw error;
  }
}

/**
 * Load item instances from database into repository
 */
async function loadItemInstances(): Promise<void> {
  try {
    const instances = await db.select().from(itemInstances);

    let loadedCount = 0;
    for (const instance of instances) {
      const loaded = loadItemInstance(instance);
      if (loaded) {
        loadedCount++;
      }
    }

    Report.info("✅ Item instances loaded", { count: loadedCount });
  } catch (error: any) {
    // Check if error is "table does not exist"
    if (error?.code === "42P01" || error?.message?.includes("does not exist")) {
      Report.info("ℹ️  Item instances table does not exist yet, will be created on next migration");
      return;
    }
    Report.error("❌ Error loading item instances", { error });
    // Don't throw - item instances might not exist yet
    Report.info("ℹ️  Continuing without item instances");
  }
}

// Check if required tables exist
async function checkTablesExist(): Promise<boolean> {
  try {
    const client = await pool.connect();
    
    // Check users table
    const usersResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'users'
      );
    `);

    // Check sessions table
    const sessionsResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'sessions'
      );
    `);

    // Check characters table
    const charactersResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'characters'
      );
    `);
    
    client.release();

    const usersExists = usersResult.rows[0]?.exists || false;
    const sessionsExists = sessionsResult.rows[0]?.exists || false;
    const charactersExists = charactersResult.rows[0]?.exists || false;
    
    Report.debug("Table existence check", {
      usersExists,
      sessionsExists,
      charactersExists,
    });
    
    return usersExists && sessionsExists && charactersExists;
  } catch (error) {
    Report.error("❌ Error checking table existence", { error });
    return false;
  }
}

// Manually create tables if migration fails
async function createTablesManually(): Promise<void> {
  try {
    const client = await pool.connect();

    // Create users table manually (from our generated migration)
    await client.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "password" varchar(255) NOT NULL,
        "email" varchar(255) NOT NULL,
        "character_id" varchar(255) NOT NULL,
        "last_news_received" varchar(255) NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL,
        "created_by" varchar(255) NOT NULL,
        "updated_by" varchar(255) NOT NULL,
        CONSTRAINT "users_email_unique" UNIQUE("email")
      );
    `);

    // Create sessions table manually
    await client.query(`
      CREATE TABLE IF NOT EXISTS "sessions" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
        "token" varchar(255) NOT NULL,
        "expires_at" timestamp NOT NULL,
        "is_active" boolean DEFAULT true NOT NULL,
        "user_agent" varchar(500),
        "ip_address" varchar(45),
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL,
        "created_by" varchar(255) NOT NULL,
        "updated_by" varchar(255) NOT NULL,
        CONSTRAINT "sessions_token_unique" UNIQUE("token")
      );
    `);

    // Create characters table manually
    await client.query(`
      CREATE TABLE IF NOT EXISTS "characters" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
        "name" varchar(255) NOT NULL,
        "gender" varchar(10) NOT NULL,
        "race" varchar(50) NOT NULL,
        "portrait" varchar(50) NOT NULL,
        "background" varchar(100) NOT NULL,
        "starting_class" varchar(50) NOT NULL,
        "attributes" jsonb NOT NULL,
        "battle_stats" jsonb NOT NULL,
        "proficiencies" jsonb NOT NULL,
        "artisans" jsonb NOT NULL,
        "level" integer DEFAULT 1 NOT NULL,
        "is_active" boolean DEFAULT true NOT NULL,
        "inventory" jsonb DEFAULT '{}' NOT NULL,
        "equipments" jsonb DEFAULT '{}' NOT NULL,
        "skills" jsonb DEFAULT '{}' NOT NULL,
        "vitals" jsonb NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL,
        "created_by" varchar(255) NOT NULL,
        "updated_by" varchar(255) NOT NULL,
        CONSTRAINT "characters_name_unique" UNIQUE("name")
      );
    `);

    client.release();
    Report.info("✅ Tables created manually");
  } catch (error) {
    Report.error("❌ Manual table creation failed", { error });
    throw error;
  }
}

export async function shutdownDatabase(): Promise<void> {
  Report.info("🔄 Shutting down database connection...");
  await closeConnection();
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  Report.info("🛑 Received SIGINT, shutting down gracefully...");
  await shutdownDatabase();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  Report.info("🛑 Received SIGTERM, shutting down gracefully...");
  await shutdownDatabase();
  process.exit(0);
});
