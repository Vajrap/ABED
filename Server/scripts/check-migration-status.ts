import { Pool } from "pg";
import dotenv from "dotenv";
import { readdir, readFile } from "fs/promises";
import { join } from "path";

dotenv.config();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://abed_user:abed_password@localhost:40316/abed_db";

async function checkMigrationStatus() {
  const pool = new Pool({
    connectionString: DATABASE_URL,
  });

  try {
    const client = await pool.connect();

    // Check if __drizzle_migrations table exists
    console.log("📊 Checking for Drizzle migrations table...");
    try {
      const tableExists = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = '__drizzle_migrations'
        );
      `);
      console.log("Table exists:", tableExists.rows[0].exists);

      if (tableExists.rows[0].exists) {
        const migrations = await client.query(`
          SELECT * FROM "__drizzle_migrations" ORDER BY created_at;
        `);
        console.log("\n📋 Migrations in database:");
        console.log(JSON.stringify(migrations.rows, null, 2));
      }
    } catch (error: any) {
      console.log("❌ Error checking migrations table:", error.message);
    }

    // List migration files
    console.log("\n📁 Checking migration files...");
    const migrationsDir = join(process.cwd(), "src/Database/migrations");
    const files = await readdir(migrationsDir);
    const sqlFiles = files.filter(f => f.endsWith('.sql')).sort();
    console.log("SQL migration files:", sqlFiles);

    // Check journal
    console.log("\n📋 Checking journal...");
    const journalPath = join(migrationsDir, "meta", "_journal.json");
    const journalContent = await readFile(journalPath, "utf-8");
    const journal = JSON.parse(journalContent);
    console.log("Journal entries:", journal.entries.length);
    console.log("Last entry:", journal.entries[journal.entries.length - 1]);

    client.release();
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

checkMigrationStatus().catch(console.error);

