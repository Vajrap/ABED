-- Change characters.party_id from uuid to varchar(255) to match parties.party_id
-- This allows NPC parties to use string IDs like "wayward_inn_barkeeper"
DO $$ 
BEGIN
    -- Check if column exists and is uuid type (check both data_type and udt_name for PostgreSQL)
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'characters' 
        AND column_name = 'party_id'
        AND (data_type = 'uuid' OR udt_name = 'uuid')
    ) THEN
        -- Change column type from uuid to varchar(255)
        -- Using ::text to convert UUID to string (nulls will remain null)
        ALTER TABLE "characters" 
        ALTER COLUMN "party_id" TYPE varchar(255) USING CASE 
            WHEN "party_id" IS NULL THEN NULL 
            ELSE "party_id"::text 
        END;
        
        -- Add comment explaining the change
        COMMENT ON COLUMN "characters"."party_id" IS 'Party ID (varchar) - matches parties.party_id type. Can be UUID string for player parties or string ID for NPC parties.';
    END IF;
END $$;

