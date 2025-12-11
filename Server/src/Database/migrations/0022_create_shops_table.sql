-- Migration: Create shops and shop_inventory tables
-- Shops are location-based and can have multiple shops per location
-- Shop inventory never refreshes (as requested)

CREATE TABLE IF NOT EXISTS "shops" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "location_id" varchar(100) NOT NULL, -- LocationsEnum
  "shop_type" varchar(50) NOT NULL, -- ShopType enum
  "inventory" jsonb DEFAULT '{}'::jsonb NOT NULL, -- Map<ItemId, quantity>
  "base_prices" jsonb DEFAULT '{}'::jsonb NOT NULL, -- Map<ItemId, basePrice>
  "pricing_modifiers" jsonb DEFAULT '{"locationModifier": 0, "supplyDemandModifier": 0}'::jsonb NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "shops_location_id_idx" ON "shops"("location_id");
CREATE INDEX IF NOT EXISTS "shops_shop_type_idx" ON "shops"("shop_type");

COMMENT ON TABLE "shops" IS 'Shops at locations. Each location can have multiple shops (e.g., Inn shop + General Store). Shop inventory never refreshes.';
COMMENT ON COLUMN "shops"."inventory" IS 'Shop inventory: { "itemId": quantity, ... }. Items are removed when sold, added when bought from players.';
COMMENT ON COLUMN "shops"."base_prices" IS 'Base prices for items: { "itemId": basePrice, ... }. Used for price calculation.';
COMMENT ON COLUMN "shops"."pricing_modifiers" IS 'Pricing modifiers: { "locationModifier": -0.1 to +0.2, "supplyDemandModifier": -0.2 to +0.3 }';

