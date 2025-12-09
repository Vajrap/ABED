import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://abed_user:abed_password@localhost:40316/abed_db";

async function testMigration() {
  const pool = new Pool({
    connectionString: DATABASE_URL,
  });

  try {
    const client = await pool.connect();

    // Check current portrait column type
    console.log("📊 Checking current portrait column type...");
    const columnInfo = await client.query(`
      SELECT data_type, character_maximum_length
      FROM information_schema.columns
      WHERE table_name = 'characters' AND column_name = 'portrait';
    `);
    console.log("Current portrait column:", columnInfo.rows[0]);

    // Check character count
    console.log("\n📊 Checking character count...");
    const charCount = await client.query('SELECT COUNT(*) FROM "characters"');
    console.log(`Characters in database: ${charCount.rows[0].count}`);

    // Check if migration tracking table exists
    console.log("\n📊 Checking migration tracking table...");
    try {
      const allMigrations = await client.query(`
        SELECT * FROM "__drizzle_migrations"
        ORDER BY created_at DESC
        LIMIT 5;
      `);
      console.log("Last 5 migrations:", allMigrations.rows);
    } catch (error: any) {
      console.log("⚠️  Migration tracking table doesn't exist (this is okay)");
    }

    // Now run the migration manually
    console.log("\n🔄 Running migration manually...");
    
    // Step 1: Delete all characters
    console.log("  - Deleting all characters...");
    const deleteResult = await client.query('TRUNCATE TABLE "characters" CASCADE');
    console.log("  ✅ Characters deleted");

    // Step 2: Change column type
    console.log("  - Changing portrait column type...");
    await client.query(`
      ALTER TABLE "characters" 
      ALTER COLUMN "portrait" TYPE jsonb USING NULL::jsonb;
    `);
    console.log("  ✅ Column type changed");

    // Verify the change
    console.log("\n📊 Verifying changes...");
    const newColumnInfo = await client.query(`
      SELECT data_type, character_maximum_length
      FROM information_schema.columns
      WHERE table_name = 'characters' AND column_name = 'portrait';
    `);
    console.log("New portrait column:", newColumnInfo.rows[0]);

    const newCharCount = await client.query('SELECT COUNT(*) FROM "characters"');
    console.log(`Characters in database: ${newCharCount.rows[0].count}`);

    client.release();
    console.log("\n✅ Migration test completed!");
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  } finally {
    await pool.end();
    console.log("🔌 Database connection closed");
  }
}

testMigration().catch(console.error);

