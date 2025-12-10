import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://abed_user:abed_password@localhost:40316/abed_db";

async function fixLocationColumn() {
  const pool = new Pool({
    connectionString: DATABASE_URL,
  });

  try {
    const client = await pool.connect();
    console.log("🔧 Adding location column to characters table...");

    // Check if column exists
    const checkResult = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'characters' 
      AND column_name = 'location'
    `);

    if (checkResult.rows.length > 0) {
      console.log("✅ Location column already exists");
    } else {
      // Add the column
      await client.query(`
        ALTER TABLE "characters" ADD COLUMN "location" varchar(100);
      `);
      console.log("✅ Successfully added location column");
    }

    client.release();
    console.log("✅ Fix completed!");
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  } finally {
    await pool.end();
    console.log("🔌 Database connection closed");
  }
}

fixLocationColumn().catch(console.error);

