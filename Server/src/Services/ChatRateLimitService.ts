/**
 * Chat Rate Limit Service
 * 
 * Implements rate limiting for NPC-Player chat conversations.
 * Limits are per player (not per NPC-player pair).
 * Limits reset on each game phase change.
 * Free tier: 10 exchanges per phase
 * VIP tier: 50 exchanges per phase
 */

import { eq } from "drizzle-orm";
import { db } from "../Database/connection";
import { chatRateLimits, users } from "../Database/Schema";
import { characterManager } from "../Game/CharacterManager";
import { GameTime } from "../Game/GameTime/GameTime";
import Report from "../Utils/Reporter";

const MAX_EXCHANGES_FREE = 10;
const MAX_EXCHANGES_VIP = 50; // 5x free limit

export type UserTier = "free" | "vip" | "premium";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  currentPhase: number; // Current game phase index
  tier: UserTier;
  maxExchanges: number;
}

/**
 * Get user tier from character's userId
 */
async function getUserTier(playerId: string): Promise<UserTier> {
  try {
    const character = characterManager.getCharacterByID(playerId);
    if (!character || !character.userId) {
      return "free"; // Default to free if no user
    }

    const [user] = await db
      .select({ tier: users.tier })
      .from(users)
      .where(eq(users.id, character.userId))
      .limit(1);

    const tier = (user?.tier as UserTier) || "free";
    return tier === "vip" || tier === "premium" ? tier : "free";
  } catch (error) {
    Report.error("Error getting user tier", {
      error: error instanceof Error ? error.message : String(error),
      playerId,
    });
    return "free"; // Default to free on error
  }
}

/**
 * Get max exchanges for a tier
 */
function getMaxExchanges(tier: UserTier): number {
  switch (tier) {
    case "vip":
    case "premium":
      return MAX_EXCHANGES_VIP;
    case "free":
    default:
      return MAX_EXCHANGES_FREE;
  }
}

/**
 * Check if an exchange is allowed under rate limit
 * Returns rate limit status
 */
export async function checkRateLimit(
  playerId: string
): Promise<RateLimitResult> {
  try {
    const currentPhase = GameTime.getCurrentPhaseIndex();
    const tier = await getUserTier(playerId);
    const maxExchanges = getMaxExchanges(tier);
    
    // Get existing rate limit record
    const [existing] = await db
      .select()
      .from(chatRateLimits)
      .where(eq(chatRateLimits.playerId, playerId))
      .limit(1);

    if (!existing) {
      // No record exists, create one and allow
      await db.insert(chatRateLimits).values({
        playerId,
        exchangeCount: 1,
        lastPhaseIndex: currentPhase,
        windowStart: new Date(),
        lastExchange: new Date(),
      });

      return {
        allowed: true,
        remaining: maxExchanges - 1,
        currentPhase,
        tier,
        maxExchanges,
      };
    }

    // Check if phase has changed - reset if new phase
    if (existing.lastPhaseIndex !== currentPhase) {
      // Phase changed, reset count
      await db
        .update(chatRateLimits)
        .set({
          exchangeCount: 1,
          lastPhaseIndex: currentPhase,
          windowStart: new Date(),
          lastExchange: new Date(),
        })
        .where(eq(chatRateLimits.id, existing.id));

      return {
        allowed: true,
        remaining: maxExchanges - 1,
        currentPhase,
        tier,
        maxExchanges,
      };
    }

    // Same phase, check count
    if (existing.exchangeCount >= maxExchanges) {
      // Rate limit exceeded for this phase
      return {
        allowed: false,
        remaining: 0,
        currentPhase,
        tier,
        maxExchanges,
      };
    }

    // Under limit, increment count
    await db
      .update(chatRateLimits)
      .set({
        exchangeCount: existing.exchangeCount + 1,
        lastExchange: new Date(),
      })
      .where(eq(chatRateLimits.id, existing.id));

    return {
      allowed: true,
      remaining: maxExchanges - (existing.exchangeCount + 1),
      currentPhase,
      tier,
      maxExchanges,
    };
  } catch (error) {
    Report.error("Error checking rate limit", {
      error: error instanceof Error ? error.message : String(error),
      playerId,
    });
    // On error, allow the request (fail open)
    const currentPhase = GameTime.getCurrentPhaseIndex();
    return {
      allowed: true,
      remaining: MAX_EXCHANGES_FREE,
      currentPhase,
      tier: "free",
      maxExchanges: MAX_EXCHANGES_FREE,
    };
  }
}

/**
 * Initialize rate limit record for a player
 * Called when character is created
 */
export async function initializeRateLimit(playerId: string): Promise<void> {
  try {
    // Check if record already exists
    const [existing] = await db
      .select()
      .from(chatRateLimits)
      .where(eq(chatRateLimits.playerId, playerId))
      .limit(1);

    if (!existing) {
      const currentPhase = GameTime.getCurrentPhaseIndex();
      await db.insert(chatRateLimits).values({
        playerId,
        exchangeCount: 0,
        lastPhaseIndex: currentPhase,
        windowStart: new Date(),
        lastExchange: new Date(),
      });
      
      Report.debug("Initialized rate limit for player", { playerId, currentPhase });
    }
  } catch (error) {
    Report.error("Error initializing rate limit", {
      error: error instanceof Error ? error.message : String(error),
      playerId,
    });
  }
}

/**
 * Reset all rate limits when game phase changes
 * Called from GameLoop when phase advances
 * Note: Individual checks also reset on phase change, but this ensures all are reset
 */
export async function resetRateLimitsForNewPhase(): Promise<void> {
  try {
    const currentPhase = GameTime.getCurrentPhaseIndex();
    await db
      .update(chatRateLimits)
      .set({
        exchangeCount: 0,
        lastPhaseIndex: currentPhase,
        windowStart: new Date(),
      });
    
    Report.debug("Reset all chat rate limits for new phase", {
      phaseIndex: currentPhase,
    });
  } catch (error) {
    Report.error("Error resetting rate limits for new phase", {
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

