-- Add party_id column to characters table
DO $$ 
BEGIN
    -- Add party_id column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' 
        AND column_name = 'party_id'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "party_id" uuid;
    END IF;
END $$;

