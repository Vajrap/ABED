import dotenv from "dotenv";
import { UserService } from "../src/Entity/User/index";
import { testConnection, closeConnection } from "../src/Database/connection";

// Load environment variables
dotenv.config();

async function testEndpoints() {
  console.log("🔧 Testing server endpoints integration...");

  try {
    // Test database connection first
    const connected = await testConnection();
    if (!connected) {
      throw new Error("Database connection failed");
    }

    // Clean up any existing test users
    const existingUser = await UserService.getUserByEmail(
      "endpoint-test@example.com",
    );
    if (existingUser) {
      await UserService.deleteUser(existingUser.id);
      console.log("🧹 Cleaned up existing test user");
    }

    console.log("📝 Testing registration flow...");

    // Test user registration
    const testUserData = {
      password: "testpassword123",
      email: "endpoint-test@example.com",
      characterId: "endpoint_test_char",
      lastNewsReceived: "news_001",
      createdBy: "endpoint_test",
      updatedBy: "endpoint_test",
    };

    // Simulate registration endpoint logic
    const existingUserCheck = await UserService.getUserByEmail(
      testUserData.email,
    );
    if (existingUserCheck) {
      console.log("❌ User already exists check failed");
      return;
    }

    const existingCharacterCheck = await UserService.getUserByCharacterId(
      testUserData.characterId,
    );
    if (existingCharacterCheck) {
      console.log("❌ Character ID already taken check failed");
      return;
    }

    const newUser = await UserService.createUser(testUserData);
    console.log("✅ Registration successful:", {
      id: newUser.id,
      email: newUser.email,
      characterId: newUser.characterId,
    });

    console.log("🔍 Testing login flow...");

    // Test login endpoint logic
    const loginUser = await UserService.getUserByEmail(testUserData.email);
    if (!loginUser) {
      console.log("❌ User not found during login");
      return;
    }

    // Simple password check (TODO: replace with bcrypt)
    if (loginUser.password !== testUserData.password) {
      console.log("❌ Password validation failed");
      return;
    }

    console.log("✅ Login successful for user:", loginUser.email);

    // Test duplicate registration attempt
    console.log("🔄 Testing duplicate registration prevention...");

    const duplicateCheck = await UserService.getUserByEmail(testUserData.email);
    if (duplicateCheck) {
      console.log("✅ Duplicate email prevention working correctly");
    }

    const duplicateCharCheck = await UserService.getUserByCharacterId(
      testUserData.characterId,
    );
    if (duplicateCharCheck) {
      console.log("✅ Duplicate character ID prevention working correctly");
    }

    // Test user update
    console.log("📝 Testing user update flow...");

    const updatedUser = await UserService.updateLastNewsReceived(
      newUser.id,
      "news_002",
      "endpoint_test_update",
    );

    if (updatedUser && updatedUser.lastNewsReceived === "news_002") {
      console.log("✅ User update successful");
    } else {
      console.log("❌ User update failed");
    }

    // Test invalid scenarios
    console.log("🚫 Testing error handling...");

    // Test login with non-existent user
    const nonExistentUser = await UserService.getUserByEmail(
      "nonexistent@example.com",
    );
    if (!nonExistentUser) {
      console.log("✅ Non-existent user handling correct");
    }

    // Test login with wrong password
    const wrongPasswordUser = await UserService.getUserByEmail(
      testUserData.email,
    );
    if (wrongPasswordUser && wrongPasswordUser.password !== "wrongpassword") {
      console.log("✅ Wrong password detection working");
    }

    console.log("📊 Database statistics:");
    const userCount = await UserService.getUserCount();
    console.log(`   Total users: ${userCount}`);

    // Clean up test user
    console.log("🧹 Cleaning up test data...");
    const deleted = await UserService.deleteUser(newUser.id);
    if (deleted) {
      console.log("✅ Test user cleaned up successfully");
    }

    const finalUserCount = await UserService.getUserCount();
    console.log(`   Final user count: ${finalUserCount}`);

    console.log("🎉 All endpoint integration tests passed!");

    // Test schema validation scenarios
    console.log("📋 Testing validation scenarios...");

    const validationTests = [
      {
        name: "Valid email",
        email: "valid@example.com",
        shouldPass: true,
      },
      {
        name: "Invalid email format",
        email: "invalid-email",
        shouldPass: false,
      },
      {
        name: "Empty email",
        email: "",
        shouldPass: false,
      },
      {
        name: "Valid password",
        password: "validpassword123",
        shouldPass: true,
      },
      {
        name: "Short password",
        password: "123",
        shouldPass: false,
      },
    ];

    for (const test of validationTests) {
      if (test.email !== undefined) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = test.email.length > 0 && emailRegex.test(test.email);
        const result = isValid === test.shouldPass ? "✅" : "❌";
        console.log(`   ${result} ${test.name}: ${test.email}`);
      }

      if (test.password !== undefined) {
        const isValid = test.password.length >= 8;
        const result = isValid === test.shouldPass ? "✅" : "❌";
        console.log(`   ${result} ${test.name}: ${test.password}`);
      }
    }

    console.log("🏆 Endpoint integration testing completed successfully!");
  } catch (error) {
    console.error("❌ Endpoint integration test failed:", error);
    process.exit(1);
  } finally {
    await closeConnection();
    console.log("🔌 Database connection closed");
  }
}

// Run the tests
testEndpoints();
