#!/usr/bin/env bun
// Database Management Script for ABED Server
// Usage: bun run scripts/db-management.ts [command]

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://abed_user:abed_password@localhost:40316/abed_db";

class DatabaseManager {
  private pool: Pool;
  private db: any;

  constructor() {
    this.pool = new Pool({
      connectionString: DATABASE_URL,
    });
    this.db = drizzle(this.pool);
  }

  async testConnection(): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      await client.query("SELECT 1");
      client.release();
      console.log("✅ Database connection successful");
      return true;
    } catch (error) {
      console.error("❌ Database connection failed:", error);
      return false;
    }
  }

  async checkTablesExist(): Promise<{
    users: boolean;
    sessions: boolean;
    characters: boolean;
    totalTables: number;
  }> {
    try {
      const client = await this.pool.connect();

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

      // Get total table count
      const tablesResult = await client.query(`
        SELECT COUNT(*) as count
        FROM information_schema.tables
        WHERE table_schema = 'public';
      `);

      client.release();

      return {
        users: usersResult.rows[0]?.exists || false,
        sessions: sessionsResult.rows[0]?.exists || false,
        characters: charactersResult.rows[0]?.exists || false,
        totalTables: parseInt(tablesResult.rows[0]?.count || "0"),
      };
    } catch (error) {
      console.error("❌ Error checking tables:", error);
      return { users: false, sessions: false, characters: false, totalTables: 0 };
    }
  }

  async createTables(): Promise<boolean> {
    try {
      console.log("🔨 Creating database tables...");

      const client = await this.pool.connect();

      // Create users table
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

      // Create sessions table
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

      // Create characters table
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
      console.log("✅ Tables created successfully");
      return true;
    } catch (error) {
      console.error("❌ Table creation failed:", error);
      return false;
    }
  }

  async runMigrations(): Promise<boolean> {
    try {
      console.log("📦 Running database migrations...");
      await migrate(this.db, { migrationsFolder: "./src/Database/migrations" });
      console.log("✅ Migrations completed successfully");
      return true;
    } catch (error) {
      console.error("❌ Migrations failed:", error);
      return false;
    }
  }

  async dropTables(): Promise<boolean> {
    try {
      console.log("🗑️  Dropping all tables...");

      const client = await this.pool.connect();

      // Drop tables in correct order (handle foreign keys)
      await client.query('DROP TABLE IF EXISTS "users" CASCADE;');

      client.release();
      console.log("✅ Tables dropped successfully");
      return true;
    } catch (error) {
      console.error("❌ Table dropping failed:", error);
      return false;
    }
  }

  async resetDatabase(): Promise<boolean> {
    try {
      console.log("🔄 Resetting database...");

      const dropped = await this.dropTables();
      if (!dropped) return false;

      const created = await this.createTables();
      if (!created) return false;

      console.log("✅ Database reset completed");
      return true;
    } catch (error) {
      console.error("❌ Database reset failed:", error);
      return false;
    }
  }

  async getTableInfo(): Promise<void> {
    try {
      const client = await this.pool.connect();

      // Get table information
      const tablesResult = await client.query(`
        SELECT
          table_name,
          table_schema
        FROM information_schema.tables
        WHERE table_schema = 'public'
        ORDER BY table_name;
      `);

      console.log("\n📊 Database Tables:");
      console.log("─".repeat(40));

      if (tablesResult.rows.length === 0) {
        console.log("No tables found");
      } else {
        tablesResult.rows.forEach((row, index) => {
          console.log(`${index + 1}. ${row.table_name}`);
        });
      }

      // Get users table details if it exists
      const usersResult = await client.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_name = 'users'
        AND table_schema = 'public'
        ORDER BY ordinal_position;
      `);

      if (usersResult.rows.length > 0) {
        console.log("\n👤 Users Table Structure:");
        console.log("─".repeat(40));
        usersResult.rows.forEach((row) => {
          const nullable = row.is_nullable === "YES" ? "NULL" : "NOT NULL";
          const defaultVal = row.column_default
            ? ` (${row.column_default})`
            : "";
          console.log(
            `  ${row.column_name}: ${row.data_type} ${nullable}${defaultVal}`,
          );
        });
      }

      // Get record counts
      try {
        const countResult = await client.query(
          "SELECT COUNT(*) as count FROM users",
        );
        const userCount = countResult.rows[0]?.count || 0;
        console.log(`\n📈 Records: ${userCount} users`);
      } catch (e) {
        console.log("\n📈 Records: Unable to count (table may not exist)");
      }

      client.release();
    } catch (error) {
      console.error("❌ Error getting table info:", error);
    }
  }

  async seedTestData(): Promise<boolean> {
    try {
      console.log("🌱 Seeding test data...");

      const client = await this.pool.connect();

      // Insert test user
      await client.query(`
        INSERT INTO users (
          password, email, character_id, last_news_received,
          created_by, updated_by
        ) VALUES (
          'testpassword123',
          'test@abed.com',
          'test_hero',
          'news_001',
          'db_seed',
          'db_seed'
        ) ON CONFLICT (email) DO NOTHING;
      `);

      // Insert demo users
      await client.query(`
        INSERT INTO users (
          password, email, character_id, last_news_received,
          created_by, updated_by
        ) VALUES
        ('demo123ABC', 'alice@demo.com', 'alice_mage', 'news_001', 'db_seed', 'db_seed'),
        ('demo123ABC', 'bob@demo.com', 'bob_warrior', 'news_001', 'db_seed', 'db_seed'),
        ('demo123ABC', 'charlie@demo.com', 'charlie_rogue', 'news_001', 'db_seed', 'db_seed')
        ON CONFLICT (email) DO NOTHING;
      `);

      client.release();
      console.log("✅ Test data seeded successfully");
      return true;
    } catch (error) {
      console.error("❌ Test data seeding failed:", error);
      return false;
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

// CLI Interface
async function main() {
  const command = process.argv[2] || "help";
  const dbManager = new DatabaseManager();

  try {
    // Always test connection first
    const connected = await dbManager.testConnection();
    if (!connected) {
      console.error("❌ Cannot connect to database. Exiting.");
      process.exit(1);
    }

    switch (command.toLowerCase()) {
      case "status":
      case "info":
        await dbManager.getTableInfo();
        break;

      case "create":
      case "setup":
        await dbManager.createTables();
        break;

      case "migrate":
        await dbManager.runMigrations();
        break;

      case "drop":
        console.log(
          "⚠️  Are you sure you want to drop all tables? This will delete ALL data!",
        );
        console.log("⚠️  This action cannot be undone.");
        // In a real scenario, you'd want confirmation input here
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await dbManager.dropTables();
        break;

      case "reset":
        console.log("⚠️  Resetting database (drop + create)...");
        await dbManager.resetDatabase();
        break;

      case "seed":
        await dbManager.seedTestData();
        break;

      case "full-setup":
        console.log("🚀 Full database setup (create + migrate + seed)...");
        await dbManager.createTables();
        await dbManager.runMigrations();
        await dbManager.seedTestData();
        await dbManager.getTableInfo();
        break;

      case "help":
      default:
        console.log(`
📚 ABED Database Management Tool

Usage: bun run scripts/db-management.ts [command]

Commands:
  status      Show database and table information
  create      Create all database tables
  migrate     Run database migrations
  drop        Drop all tables (⚠️ DESTRUCTIVE)
  reset       Drop and recreate all tables (⚠️ DESTRUCTIVE)
  seed        Add test data to tables
  full-setup  Complete setup (create + migrate + seed)
  help        Show this help message

Examples:
  bun run scripts/db-management.ts status
  bun run scripts/db-management.ts full-setup
  bun run scripts/db-management.ts seed

Environment:
  DATABASE_URL: ${DATABASE_URL}
        `);
        break;
    }
  } catch (error) {
    console.error("❌ Command failed:", error);
    process.exit(1);
  } finally {
    await dbManager.close();
  }
}

// Run if called directly
if (import.meta.main) {
  main();
}

export { DatabaseManager };
