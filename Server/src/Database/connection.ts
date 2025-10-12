import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Database configuration
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://abed_user:abed_password@localhost:40316/abed_db";

// Create connection pool
const pool = new Pool({
  connectionString: DATABASE_URL,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "40316"),
  database: process.env.DB_NAME || "abed_db",
  user: process.env.DB_USER || "abed_user",
  password: process.env.DB_PASSWORD || "abed_password",
  max: 20, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close connections after 30 seconds of inactivity
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

// Create drizzle instance
export const db = drizzle(pool);

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    console.log("✅ Database connection successful");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
};

// Graceful shutdown
export const closeConnection = async (): Promise<void> => {
  try {
    await pool.end();
    console.log("🔌 Database connection closed");
  } catch (error) {
    console.error("❌ Error closing database connection:", error);
  }
};

// Export pool for direct access if needed
export { pool };
