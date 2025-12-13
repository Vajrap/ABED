-- Enable pgvector extension for vector similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- Add tier column to users table for VIP/premium accounts
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'users' 
        AND column_name = 'tier'
    ) THEN
        ALTER TABLE "users" 
        ADD COLUMN "tier" varchar(20) DEFAULT 'free' NOT NULL;
    END IF;
END $$;
--> statement-breakpoint

-- Create chat_rate_limits table for rate limiting NPC-Player conversations
-- Rate limits are per player (not per NPC-player pair)
-- Free tier: 10 exchanges per 15 minutes
-- VIP tier: 50 exchanges per 15 minutes
CREATE TABLE IF NOT EXISTS "chat_rate_limits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"exchange_count" integer DEFAULT 0 NOT NULL,
	"window_start" timestamp NOT NULL,
	"last_exchange" timestamp NOT NULL,
	CONSTRAINT "unique_player_rate_limit" UNIQUE("player_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_rate_limits" ADD CONSTRAINT "chat_rate_limits_player_id_characters_id_fk" FOREIGN KEY ("player_id") REFERENCES "characters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "chat_rate_limit_player_id_idx" ON "chat_rate_limits" ("player_id");--> statement-breakpoint

-- Migrate existing chat_rate_limits data (if any) to new structure
-- This consolidates multiple NPC-player pairs into single player records
DO $$
DECLARE
    player_record RECORD;
    total_exchanges INTEGER;
    earliest_window TIMESTAMP;
    latest_exchange TIMESTAMP;
BEGIN
    -- Only run if old table structure exists (has npc_id column)
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'chat_rate_limits' 
        AND column_name = 'npc_id'
    ) THEN
        -- Group by player_id and aggregate
        FOR player_record IN 
            SELECT DISTINCT player_id 
            FROM chat_rate_limits
        LOOP
            -- Get aggregated data for this player
            SELECT 
                SUM(exchange_count),
                MIN(window_start),
                MAX(last_exchange)
            INTO total_exchanges, earliest_window, latest_exchange
            FROM chat_rate_limits
            WHERE player_id = player_record.player_id;
            
            -- Insert or update consolidated record
            INSERT INTO chat_rate_limits (player_id, exchange_count, window_start, last_exchange)
            VALUES (player_record.player_id, total_exchanges, earliest_window, latest_exchange)
            ON CONFLICT (player_id) DO UPDATE SET
                exchange_count = EXCLUDED.exchange_count,
                window_start = EXCLUDED.window_start,
                last_exchange = EXCLUDED.last_exchange;
        END LOOP;
        
        -- Drop old npc_id column and related constraints/indexes
        ALTER TABLE chat_rate_limits DROP CONSTRAINT IF EXISTS unique_npc_player_rate_limit;
        ALTER TABLE chat_rate_limits DROP CONSTRAINT IF EXISTS chat_rate_limits_npc_id_characters_id_fk;
        DROP INDEX IF EXISTS chat_rate_limit_npc_id_idx;
        ALTER TABLE chat_rate_limits DROP COLUMN IF EXISTS npc_id;
    END IF;
END $$;
--> statement-breakpoint

-- Create lore_embeddings table for RAG system
CREATE TABLE IF NOT EXISTS "lore_embeddings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_type" varchar(50) NOT NULL,
	"content_id" varchar(255) NOT NULL,
	"content_text" text NOT NULL,
	"embedding" vector(384),
	"metadata" jsonb DEFAULT '{}' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "lore_embeddings_content_type_idx" ON "lore_embeddings" ("content_type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "lore_embeddings_content_id_idx" ON "lore_embeddings" ("content_id");--> statement-breakpoint
-- Create vector index for similarity search (ivfflat index for cosine similarity)
-- Note: This requires at least some data to be inserted first, so we'll create it conditionally
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE indexname = 'lore_embeddings_vector_idx'
    ) THEN
        -- Create index only if there's data (will be created after embeddings are added)
        -- For now, we'll create it in the lore extraction script after data is inserted
        NULL;
    END IF;
END $$;
--> statement-breakpoint

-- Add conversation_summaries column to npc_character_relations table
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'npc_character_relations' 
        AND column_name = 'conversation_summaries'
    ) THEN
        ALTER TABLE "npc_character_relations" 
        ADD COLUMN "conversation_summaries" jsonb DEFAULT '[]' NOT NULL;
    END IF;
END $$;
--> statement-breakpoint

-- Add last_phase_index column to chat_rate_limits table for phase-based rate limiting
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'chat_rate_limits' 
        AND column_name = 'last_phase_index'
    ) THEN
        ALTER TABLE "chat_rate_limits" 
        ADD COLUMN "last_phase_index" integer DEFAULT 0 NOT NULL;
    END IF;
END $$;

