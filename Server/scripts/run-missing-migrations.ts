import { Pool } from "pg";
import dotenv from "dotenv";
import { readFile } from "fs/promises";
import { join } from "path";
import { createHash } from "crypto";

dotenv.config();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://abed_user:abed_password@localhost:40316/abed_db";

async function runMissingMigrations() {
  const pool = new Pool({
    connectionString: DATABASE_URL,
  });

  try {
    const client = await pool.connect();

    console.log("🔧 Running missing migrations and fixing tracking...\n");

    // Read journal
    const journalPath = join(process.cwd(), "src/Database/migrations/meta/_journal.json");
    const journalContent = await readFile(journalPath, "utf-8");
    const journal = JSON.parse(journalContent);

    // Get all recorded migrations
    const recordedMigrations = await client.query(`
      SELECT hash FROM "__drizzle_migrations";
    `);
    const recordedHashes = new Set(recordedMigrations.rows.map((r: any) => r.hash));

    const migrationsDir = join(process.cwd(), "src/Database/migrations");
    const missingMigrations: Array<{ tag: string; hash: string; when: number; sql: string }> = [];

    // Find missing migrations
    for (const entry of journal.entries) {
      const sqlFile = `${entry.tag}.sql`;
      const sqlPath = join(migrationsDir, sqlFile);

      try {
        const sqlContent = await readFile(sqlPath, "utf-8");
        const hash = createHash("sha256").update(sqlContent).digest("hex");

        if (!recordedHashes.has(hash)) {
          missingMigrations.push({ tag: entry.tag, hash, when: entry.when, sql: sqlContent });
        }
      } catch (error: any) {
        if (error.code !== 'ENOENT') {
          throw error;
        }
      }
    }

    console.log(`Found ${missingMigrations.length} missing migrations\n`);

    // Check what already exists to avoid conflicts
    const checkTable = async (tableName: string): Promise<boolean> => {
      const result = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = $1
        );
      `, [tableName]);
      return result.rows[0].exists;
    };

    const checkColumn = async (tableName: string, columnName: string): Promise<boolean> => {
      const result = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_name = $1 
          AND column_name = $2
        );
      `, [tableName, columnName]);
      return result.rows[0].exists;
    };

    // Process each missing migration
    for (const mig of missingMigrations) {
      console.log(`\n📦 Processing: ${mig.tag}`);
      
      let shouldRun = true;
      let alreadyApplied = false;

      // Check if migration 0014 was already applied (user_id nullable)
      if (mig.tag === "0014_make_user_id_nullable_for_npcs") {
        const isNullable = await client.query(`
          SELECT is_nullable 
          FROM information_schema.columns 
          WHERE table_name = 'characters' 
          AND column_name = 'user_id';
        `);
        if (isNullable.rows.length > 0 && isNullable.rows[0].is_nullable === 'YES') {
          console.log("  ✅ Already applied (user_id is nullable)");
          alreadyApplied = true;
        }
      }

      // Check if migration 0015 was already applied (character_prompt column)
      if (mig.tag === "0015_add_character_prompt") {
        const exists = await checkColumn("characters", "character_prompt");
        if (exists) {
          console.log("  ✅ Already applied (character_prompt column exists)");
          alreadyApplied = true;
        }
      }

      // Check if migration 0016 was already applied (npc_memory table)
      if (mig.tag === "0016_create_npc_memory_table") {
        const exists = await checkTable("npc_memory");
        if (exists) {
          console.log("  ✅ Already applied (npc_memory table exists)");
          alreadyApplied = true;
        }
      }

      // Check if migration 0017 was already applied (chat tables)
      if (mig.tag === "0017_create_chat_tables") {
        const chatRoomsExists = await checkTable("chat_rooms");
        if (chatRoomsExists) {
          console.log("  ✅ Already applied (chat tables exist)");
          alreadyApplied = true;
        }
      }

      if (alreadyApplied) {
        console.log("  📝 Recording hash in database (migration already applied)");
        await client.query(
          `INSERT INTO "__drizzle_migrations" (hash, created_at) VALUES ($1, $2)`,
          [mig.hash, mig.when]
        );
        console.log("  ✅ Hash recorded");
      } else {
        console.log("  🚀 Running migration...");
        try {
          // Execute the SQL
          await client.query(mig.sql);
          console.log("  ✅ Migration executed successfully");
          
          // Record the hash
          await client.query(
            `INSERT INTO "__drizzle_migrations" (hash, created_at) VALUES ($1, $2)`,
            [mig.hash, mig.when]
          );
          console.log("  ✅ Hash recorded");
        } catch (error: any) {
          console.error(`  ❌ Error running migration: ${error.message}`);
          // If it's a "already exists" error, just record the hash
          if (error.message.includes("already exists") || error.message.includes("duplicate")) {
            console.log("  📝 Migration already applied, just recording hash");
            await client.query(
              `INSERT INTO "__drizzle_migrations" (hash, created_at) VALUES ($1, $2)`,
              [mig.hash, mig.when]
            );
            console.log("  ✅ Hash recorded");
          } else {
            throw error;
          }
        }
      }
    }

    console.log("\n✅ All migrations processed!");

    // Verify final state
    const finalCount = await client.query(`SELECT COUNT(*) FROM "__drizzle_migrations"`);
    console.log(`\n📊 Total migrations in database: ${finalCount.rows[0].count}`);
    console.log(`📊 Expected: ${journal.entries.length}`);

    client.release();
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

runMissingMigrations().catch(console.error);

