-- Drop trigger and function first
DROP TRIGGER IF EXISTS trg_update_premarket_tokens_updated_at ON "premarket_tokens";
DROP FUNCTION IF EXISTS update_premarket_tokens_updated_at;

-- Drop indexes
DROP INDEX IF EXISTS idx_premarket_offers_token;
DROP INDEX IF EXISTS idx_premarket_orders_token;
DROP INDEX IF EXISTS idx_premarket_orders_offer;

-- Drop tables (order matters because of foreign keys)
DROP TABLE IF EXISTS "premarket_orders";
DROP TABLE IF EXISTS "premarket_offers";
DROP TABLE IF EXISTS "premarket_tokens";
