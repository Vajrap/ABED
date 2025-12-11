import { eq, and, sql } from "drizzle-orm";
import { db } from "../connection";
import { users, type User, type InsertUser } from "../Schema/user";

export class UserService {
  /**
   * Create a new user
   */
  static async createUser(
    userData: Omit<InsertUser, "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy" | "lastNewsReceived"> & { lastNewsReceived?: string },
  ): Promise<User> {
    // Hash password using Bun's built-in password hashing
    const hashedPassword = await Bun.password.hash(userData.password, {
      algorithm: "bcrypt",
      cost: 10, // bcrypt cost factor
    });

    // Use raw SQL to handle character_id column which may still exist in DB but not in schema
    // This allows backward compatibility during migration
    // Provide default for last_news_received if not specified
    const lastNewsReceived = userData.lastNewsReceived ?? 'news_000';
    const result = await db.execute(sql`
      INSERT INTO users (username, password, email, last_news_received, character_id, created_by, updated_by)
      VALUES (${userData.username}, ${hashedPassword}, ${userData.email ?? null}, ${lastNewsReceived}, ${userData.username}, 'system', 'system')
      RETURNING *
    `);

    // Fetch the created user using Drizzle to get proper typing
    const [createdUser] = await db.select().from(users).where(eq(users.username, userData.username)).limit(1);

    if (!createdUser) {
      throw new Error("Failed to create user");
    }

    return createdUser;
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: string): Promise<User | null> {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);

    return user[0] || null;
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string): Promise<User | null> {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user[0] || null;
  }

  /**
   * Get user by username
   */
  static async getUserByUsername(username: string): Promise<User | null> {
    try {
      // Try to get by username (new schema)
      const user = await db
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);

      if (user[0]) {
        return user[0];
      }
    } catch (error) {
      // If username column doesn't exist yet (during migration), try character_id
      // This is a fallback for backward compatibility
      try {
        const result = await db.execute(sql`
          SELECT * FROM users WHERE character_id = ${username} LIMIT 1
        `);
        if (result.rows && result.rows.length > 0) {
          // Map character_id result to User type
          const row = result.rows[0] as any;
          return {
            id: row.id,
            username: row.username || row.character_id, // Use username if exists, else character_id
            password: row.password,
            email: row.email,
            lastNewsReceived: row.last_news_received,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            createdBy: row.created_by,
            updatedBy: row.updated_by,
          } as User;
        }
      } catch (fallbackError) {
        // Both methods failed, re-throw original error
        throw error;
      }
    }
    
    return null;
  }

  /**
   * Update user by ID
   */
  static async updateUser(
    id: string,
    userData: Partial<Omit<InsertUser, "id" | "createdAt">>,
  ): Promise<User | null> {
    const updatedUser = await db
      .update(users)
      .set({
        ...userData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    return updatedUser[0] || null;
  }

  /**
   * Update user password
   */
  static async updateUserPassword(
    id: string,
    newPassword: string,
  ): Promise<User | null> {
    // Hash password using Bun's built-in password hashing
    const hashedPassword = await Bun.password.hash(newPassword, {
      algorithm: "bcrypt",
      cost: 10, // bcrypt cost factor
    });

    const updatedUser = await db
      .update(users)
      .set({
        password: hashedPassword,
        updatedAt: new Date(),
        
      })
      .where(eq(users.id, id))
      .returning();

    return updatedUser[0] || null;
  }

  /**
   * Verify password against stored hash
   */
  static async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await Bun.password.verify(password, hashedPassword);
  }

  /**
   * Update last news received
   */
  static async updateLastNewsReceived(
    id: string,
    lastNewsReceived: string,
    updatedBy: string,
  ): Promise<User | null> {
    const updatedUser = await db
      .update(users)
      .set({
        lastNewsReceived,
        updatedAt: new Date(),
        updatedBy,
      })
      .where(eq(users.id, id))
      .returning();

    return updatedUser[0] || null;
  }

  /**
   * Delete user by ID
   */
  static async deleteUser(id: string): Promise<boolean> {
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    return deletedUser.length > 0;
  }

  /**
   * Get all users (with optional pagination)
   */
  static async getAllUsers(limit?: number, offset?: number): Promise<User[]> {
    let query = db.select().from(users);

    if (limit && offset) {
      return await query.limit(limit).offset(offset);
    } else if (limit) {
      return await query.limit(limit);
    } else if (offset) {
      return await query.offset(offset);
    }

    return await query;
  }

  /**
   * Check if user exists by email
   */
  static async userExistsByEmail(email: string): Promise<boolean> {
    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user.length > 0;
  }

  /**
   * Check if user exists by username
   */
  static async userExistsByUsername(username: string): Promise<boolean> {
    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    return user.length > 0;
  }

  /**
   * Get user count
   */
  static async getUserCount(): Promise<number> {
    const result = await db.select().from(users);
    return result.length;
  }
}
