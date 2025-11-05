import { testConnection, closeConnection } from "../src/Database/connection";
import { UserService } from "../src/Entity/User/index";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function testDatabase() {
  console.log("🧪 Testing database connection and User operations...");

  try {
    // Test connection
    const connected = await testConnection();
    if (!connected) {
      throw new Error("Failed to connect to database");
    }

    console.log("📝 Testing User creation...");

    // Test user creation
    const testUser = await UserService.createUser({
      password: "testpassword123",
      email: `test${Date.now()}@example.com`,
      username: "testUser",
    });

    console.log("✅ User created:", {
      id: testUser.id,
      email: testUser.email,
      characterId: testUser.id,
    });

    // Test user retrieval
    console.log("🔍 Testing User retrieval...");
    const retrievedUser = await UserService.getUserById(testUser.id);
    console.log("✅ User retrieved:", retrievedUser ? "Success" : "Failed");

    const userByEmail = await UserService.getUserByEmail(testUser.email!);
    console.log("✅ User by email:", userByEmail ? "Success" : "Failed");

    // Test user update
    console.log("📝 Testing User update...");
    const updatedUser = await UserService.updateUser(testUser.id, {
      lastNewsReceived: "news_002",
    });
    console.log("✅ User updated:", updatedUser ? "Success" : "Failed");

    // Test user count
    const userCount = await UserService.getUserCount();
    console.log("📊 Total users in database:", userCount);

    // Clean up test user
    console.log("🧹 Cleaning up test user...");
    const deleted = await UserService.deleteUser(testUser.id);
    console.log("✅ Test user deleted:", deleted ? "Success" : "Failed");

    console.log("🎉 All database tests passed!");
  } catch (error) {
    console.error("❌ Database test failed:", error);
    process.exit(1);
  } finally {
    await closeConnection();
  }
}

testDatabase();
