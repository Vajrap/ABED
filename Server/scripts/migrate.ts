import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import dotenv from "dotenv";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Load environment variables
dotenv.config();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://abed_user:abed_password@localhost:40316/abed_db";

// Get the directory of the current file (works in both CommonJS and ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Resolve migrations folder path relative to Server directory
// This script runs from Server/ directory, so we need to go up one level from scripts/
const migrationsFolder = join(__dirname, "..", "src", "Database", "migrations");

async function runMigrations() {
  console.log("🚀 Starting database migrations...");
  console.log(`📁 Migrations folder: ${migrationsFolder}`);

  const pool = new Pool({
    connectionString: DATABASE_URL,
  });

  const db = drizzle(pool);

  try {
    // Run migrations - Drizzle will automatically:
    // 1. Check which migrations have been run (via __drizzle_migrations table)
    // 2. Run only the new migrations
    // 3. Record their hashes in the database
    await migrate(db, { migrationsFolder });
    console.log("✅ Migrations completed successfully");
  } catch (error: any) {
    console.error("❌ Migration failed:", error);
    console.error("Error details:", {
      message: error?.message,
      stack: error?.stack,
      migrationsFolder,
    });
    console.error("\n💡 If migrations are out of sync, you may need to:");
    console.error("   1. Check migration status: bun run scripts/check-migration-status.ts");
    console.error("   2. Fix tracking: bun run scripts/run-missing-migrations.ts");
    process.exit(1);
  } finally {
    await pool.end();
    console.log("🔌 Database connection closed");
  }
}

runMigrations();
