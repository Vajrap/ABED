-- Migration: Create chat tables for chat logging and NPC-Character relations
-- Creates: chat_rooms, chat_logs, public_chat_logs, npc_character_relations

-- Chat Rooms Table (private 1-on-1 chats)
CREATE TABLE IF NOT EXISTS "chat_rooms" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "char_1" uuid NOT NULL,
  "char_2" uuid NOT NULL,
  "is_npc_chat" boolean DEFAULT false NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "chat_rooms_char_1_characters_id_fk" FOREIGN KEY ("char_1") REFERENCES "characters"("id") ON DELETE cascade ON UPDATE no action,
  CONSTRAINT "chat_rooms_char_2_characters_id_fk" FOREIGN KEY ("char_2") REFERENCES "characters"("id") ON DELETE cascade ON UPDATE no action,
  CONSTRAINT "unique_chat_room" UNIQUE("char_1", "char_2")
);

-- Chat Logs Table (private chat messages)
CREATE TABLE IF NOT EXISTS "chat_logs" (
  "room_id" uuid NOT NULL,
  "sender" uuid NOT NULL,
  "receiver" uuid NOT NULL,
  "timestamp" timestamp DEFAULT now() NOT NULL,
  "message" text NOT NULL,
  CONSTRAINT "chat_logs_room_id_chat_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "chat_rooms"("id") ON DELETE cascade ON UPDATE no action,
  CONSTRAINT "chat_logs_sender_characters_id_fk" FOREIGN KEY ("sender") REFERENCES "characters"("id") ON DELETE cascade ON UPDATE no action,
  CONSTRAINT "chat_logs_receiver_characters_id_fk" FOREIGN KEY ("receiver") REFERENCES "characters"("id") ON DELETE cascade ON UPDATE no action,
  PRIMARY KEY("room_id", "sender", "timestamp")
);

-- Public Chat Logs Table (global, region, location, party chats)
CREATE TABLE IF NOT EXISTS "public_chat_logs" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "scope" varchar(20) NOT NULL,
  "scope_id" varchar(255),
  "sender" uuid NOT NULL,
  "timestamp" timestamp DEFAULT now() NOT NULL,
  "message" text NOT NULL,
  CONSTRAINT "public_chat_logs_sender_characters_id_fk" FOREIGN KEY ("sender") REFERENCES "characters"("id") ON DELETE cascade ON UPDATE no action
);

-- NPC-Character Relations Table
CREATE TABLE IF NOT EXISTS "npc_character_relations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "npc_id" uuid NOT NULL,
  "character_id" uuid NOT NULL,
  "affection" integer DEFAULT 0 NOT NULL,
  "closeness" integer DEFAULT 0 NOT NULL,
  "relation_title" varchar(50),
  "last_conversation_summary" text,
  "important_events" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "conversation_count" integer DEFAULT 0 NOT NULL,
  "first_met_at" timestamp DEFAULT now() NOT NULL,
  "last_interacted_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "npc_character_relations_npc_id_characters_id_fk" FOREIGN KEY ("npc_id") REFERENCES "characters"("id") ON DELETE cascade ON UPDATE no action,
  CONSTRAINT "npc_character_relations_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE cascade ON UPDATE no action,
  CONSTRAINT "unique_npc_character_relation" UNIQUE("npc_id", "character_id")
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "chat_room_char1_idx" ON "chat_rooms"("char_1");
CREATE INDEX IF NOT EXISTS "chat_room_char2_idx" ON "chat_rooms"("char_2");
CREATE INDEX IF NOT EXISTS "chat_log_room_id_idx" ON "chat_logs"("room_id");
CREATE INDEX IF NOT EXISTS "chat_log_timestamp_idx" ON "chat_logs"("timestamp");
CREATE INDEX IF NOT EXISTS "chat_log_sender_idx" ON "chat_logs"("sender");
CREATE INDEX IF NOT EXISTS "public_chat_scope_idx" ON "public_chat_logs"("scope", "scope_id");
CREATE INDEX IF NOT EXISTS "public_chat_timestamp_idx" ON "public_chat_logs"("timestamp");
CREATE INDEX IF NOT EXISTS "public_chat_sender_idx" ON "public_chat_logs"("sender");
CREATE INDEX IF NOT EXISTS "npc_relation_npc_id_idx" ON "npc_character_relations"("npc_id");
CREATE INDEX IF NOT EXISTS "npc_relation_character_id_idx" ON "npc_character_relations"("character_id");

