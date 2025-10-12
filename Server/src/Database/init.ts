import { testConnection, closeConnection, pool } from "./connection";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./connection";

export async function initializeDatabase(): Promise<void> {
  console.log("🚀 Initializing database...");

  try {
    // Test connection first
    const connected = await testConnection();
    if (!connected) {
      throw new Error("Failed to connect to database");
    }

    // Check if tables exist
    const tablesExist = await checkTablesExist();
    if (!tablesExist) {
      console.log("📦 Creating database tables...");

      try {
        // Run migrations to create tables
        await migrate(db, { migrationsFolder: "./src/Database/migrations" });
        console.log("✅ Database tables created successfully");
      } catch (migrationError) {
        console.warn(
          "⚠️  Migration runner failed, attempting manual table creation...",
        );
        await createTablesManually();
      }
    } else {
      console.log("✅ Database tables already exist");

      // Still try to run migrations in case there are new ones
      try {
        await migrate(db, { migrationsFolder: "./src/Database/migrations" });
        console.log("✅ Database migrations up to date");
      } catch (migrationError) {
        console.log("ℹ️  No new migrations to apply");
      }
    }

    console.log("🎉 Database initialization completed successfully");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    throw error;
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
    
    console.log(`📊 Users table exists: ${usersExists}`);
    console.log(`📊 Sessions table exists: ${sessionsExists}`);
    console.log(`📊 Characters table exists: ${charactersExists}`);
    
    return usersExists && sessionsExists && charactersExists;
  } catch (error) {
    console.error("❌ Error checking table existence:", error);
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
    console.log("✅ Tables created manually");
  } catch (error) {
    console.error("❌ Manual table creation failed:", error);
    throw error;
  }
}

export async function shutdownDatabase(): Promise<void> {
  console.log("🔄 Shutting down database connection...");
  await closeConnection();
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Received SIGINT, shutting down gracefully...");
  await shutdownDatabase();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n🛑 Received SIGTERM, shutting down gracefully...");
  await shutdownDatabase();
  process.exit(0);
});
