-- Add username column to users table and handle character_id migration
DO $$ 
BEGIN
    -- Add username column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' 
        AND column_name = 'username'
    ) THEN
        ALTER TABLE "users" ADD COLUMN "username" varchar(255);
        
        -- Copy character_id to username if character_id exists and username is null
        UPDATE "users" SET "username" = "character_id" WHERE "username" IS NULL AND "character_id" IS NOT NULL;
        
        -- Make username NOT NULL and unique
        ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL;
        ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");
    END IF;
    
    -- Make character_id nullable since we're now using username
    -- First, ensure all existing rows have character_id set (if they have username, use it)
    UPDATE "users" SET "character_id" = "username" WHERE "character_id" IS NULL AND "username" IS NOT NULL;
    
    -- Now make character_id nullable
    ALTER TABLE "users" ALTER COLUMN "character_id" DROP NOT NULL;
    
    -- Make last_news_received nullable (it was NOT NULL in original migration)
    ALTER TABLE "users" ALTER COLUMN "last_news_received" DROP NOT NULL;
    
    -- For new users, we'll set character_id = username in the application code
    -- This keeps backward compatibility while allowing username-based registration
END $$;

