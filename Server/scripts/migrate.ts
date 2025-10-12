import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://abed_user:abed_password@localhost:40316/abed_db";

async function runMigrations() {
  console.log("🚀 Starting database migrations...");

  const pool = new Pool({
    connectionString: DATABASE_URL,
  });

  const db = drizzle(pool);

  try {
    await migrate(db, { migrationsFolder: "./src/Database/migrations" });
    console.log("✅ Migrations completed successfully");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
    console.log("🔌 Database connection closed");
  }
}

runMigrations();
