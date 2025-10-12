import { eq, and, lt } from "drizzle-orm";
import { db } from "../Database/connection";
import { sessions, users, type Session, type InsertSession, type User } from "../Database/Schema";
import { randomUUID } from "crypto";

export class SessionService {
  // Session duration: 7 days
  private static readonly SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

  /**
   * Create a new session for a user
   * This will invalidate all other active sessions for the user (single login requirement)
   */
  static async createSession(
    userId: string,
    userAgent?: string,
    ipAddress?: string
  ): Promise<{ session: Session; token: string }> {
    // First, invalidate all existing sessions for this user
    await this.invalidateUserSessions(userId);

    // Generate a new session token
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + this.SESSION_DURATION_MS);

    const newSession: InsertSession = {
      userId,
      token,
      expiresAt,
      isActive: true,
      createdBy: "system",
      updatedBy: "system",
    };

    const [session] = await db
      .insert(sessions)
      .values(newSession)
      .returning();

    if (!session) {
      throw new Error("Failed to create session");
    }

    return { session, token };
  }

  /**
   * Validate a session token and return the associated user
   * Returns null if session is invalid or expired
   */
  static async validateSession(token: string): Promise<User | null> {
    if (!token) return null;

    const [sessionWithUser] = await db
      .select({
        session: sessions,
        user: users,
      })
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(
        and(
          eq(sessions.token, token),
          eq(sessions.isActive, true),
          // Check if session is not expired
          // Using raw SQL for date comparison
          sql`${sessions.expiresAt} > NOW()`
        )
      )
      .limit(1);

    if (!sessionWithUser) {
      return null;
    }

    // Extend session expiration on successful validation
    await this.extendSession(token);

    return sessionWithUser.user;
  }

  /**
   * Extend a session's expiration time
   */
  static async extendSession(token: string): Promise<boolean> {
    const newExpiresAt = new Date(Date.now() + this.SESSION_DURATION_MS);

    const result = await db
      .update(sessions)
      .set({
        expiresAt: newExpiresAt,
        updatedAt: new Date(),
        updatedBy: "system",
      })
      .where(eq(sessions.token, token));

    return (result.rowCount || 0) > 0;
  }

  /**
   * Invalidate a specific session
   */
  static async invalidateSession(token: string): Promise<boolean> {
    const result = await db
      .update(sessions)
      .set({
        isActive: false,
        updatedAt: new Date(),
        updatedBy: "system",
      })
      .where(eq(sessions.token, token));

    return (result.rowCount || 0) > 0;
  }

  /**
   * Invalidate all sessions for a specific user
   */
  static async invalidateUserSessions(userId: string): Promise<number> {
    const result = await db
      .update(sessions)
      .set({
        isActive: false,
        updatedAt: new Date(),
        updatedBy: "system",
      })
      .where(and(eq(sessions.userId, userId), eq(sessions.isActive, true)));

    return result.rowCount || 0;
  }

  /**
   * Get all active sessions for a user (for debugging/admin purposes)
   */
  static async getUserSessions(userId: string): Promise<Session[]> {
    return await db
      .select()
      .from(sessions)
      .where(and(eq(sessions.userId, userId), eq(sessions.isActive, true)));
  }

  /**
   * Clean up expired sessions (should be called periodically)
   */
  static async cleanupExpiredSessions(): Promise<number> {
    const result = await db
      .update(sessions)
      .set({
        isActive: false,
        updatedAt: new Date(),
        updatedBy: "system",
      })
      .where(
        and(
          eq(sessions.isActive, true),
          // Using raw SQL for date comparison
          sql`${sessions.expiresAt} <= NOW()`
        )
      );

    return result.rowCount || 0;
  }

  /**
   * Check if a user has any active sessions
   */
  static async hasActiveSession(userId: string): Promise<boolean> {
    const [session] = await db
      .select()
      .from(sessions)
      .where(
        and(
          eq(sessions.userId, userId),
          eq(sessions.isActive, true),
          sql`${sessions.expiresAt} > NOW()`
        )
      )
      .limit(1);

    return !!session;
  }
}

// Import sql for raw queries
import { sql } from "drizzle-orm";
