import { Pool } from "pg";
import dotenv from "dotenv";
import { readFile } from "fs/promises";
import { join } from "path";
import { createHash } from "crypto";

dotenv.config();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://abed_user:abed_password@localhost:40316/abed_db";

async function initDrizzleMigrations() {
  const pool = new Pool({
    connectionString: DATABASE_URL,
  });

  try {
    const client = await pool.connect();

    console.log("🔧 Initializing Drizzle migrations tracking...");

    // Create __drizzle_migrations table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
        id SERIAL PRIMARY KEY,
        hash text NOT NULL,
        created_at bigint
      );
    `);
    console.log("✅ Created __drizzle_migrations table");

    // Read journal
    const journalPath = join(process.cwd(), "src/Database/migrations/meta/_journal.json");
    const journalContent = await readFile(journalPath, "utf-8");
    const journal = JSON.parse(journalContent);

    // Read each migration file and create hash
    const migrationsDir = join(process.cwd(), "src/Database/migrations");
    
    for (const entry of journal.entries) {
      const sqlFile = `${entry.tag}.sql`;
      const sqlPath = join(migrationsDir, sqlFile);
      
      try {
        const sqlContent = await readFile(sqlPath, "utf-8");
        // Drizzle creates a hash from the migration content
        // Simplified: use the tag as identifier for now, but ideally should hash the content
        const hash = createHash("sha256").update(sqlContent).digest("hex");
        
        // Check if this migration is already recorded
        const existing = await client.query(
          `SELECT * FROM "__drizzle_migrations" WHERE hash = $1`,
          [hash]
        );
        
        if (existing.rows.length === 0) {
          await client.query(
            `INSERT INTO "__drizzle_migrations" (hash, created_at) VALUES ($1, $2)`,
            [hash, entry.when]
          );
          console.log(`  ✅ Recorded migration: ${entry.tag}`);
        } else {
          console.log(`  ⏭️  Already recorded: ${entry.tag}`);
        }
      } catch (error: any) {
        if (error.code === 'ENOENT') {
          console.log(`  ⚠️  Migration file not found: ${sqlFile}`);
        } else {
          throw error;
        }
      }
    }

    // Verify
    const recorded = await client.query(`SELECT COUNT(*) FROM "__drizzle_migrations"`);
    console.log(`\n📊 Total migrations recorded: ${recorded.rows[0].count}`);

    client.release();
    console.log("\n✅ Drizzle migrations initialized!");
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  } finally {
    await pool.end();
    console.log("🔌 Database connection closed");
  }
}

initDrizzleMigrations().catch(console.error);

