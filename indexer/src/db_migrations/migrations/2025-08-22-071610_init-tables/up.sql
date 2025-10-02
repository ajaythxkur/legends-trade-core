-- Create premarket_tokens table
CREATE TABLE "premarket_tokens" (
    token_addr        VARCHAR(66) PRIMARY KEY,
    name              VARCHAR NOT NULL,
    symbol            VARCHAR NOT NULL,
    image             VARCHAR NOT NULL,
    website           VARCHAR,
    twitter           VARCHAR,
    telegram          VARCHAR,
    settle_duration   BIGINT NOT NULL,
    temp_starts_at    BIGINT,
    temp_ends_at      BIGINT,
    settle_started_at BIGINT,
    status            INT NOT NULL DEFAULT 0,
    fa                VARCHAR(66),
    chain_type       INT NOT NULL,
    created_at        TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMP NOT NULL DEFAULT NOW(),
    cross_chain_address VARCHAR(66),
    txn_version       BIGINT NOT NULL
);

-- Create premarket_offers table
CREATE TABLE "premarket_offers" (
    offer_addr    VARCHAR(66) PRIMARY KEY,
    token_addr    VARCHAR(66) NOT NULL,
    price         BIGINT NOT NULL,
    amount        BIGINT NOT NULL,
    is_buy        BOOLEAN NOT NULL,
    is_full_match BOOLEAN NOT NULL,
    created_by    VARCHAR(66) NOT NULL,
    ts            BIGINT NOT NULL,
    filled_amount BIGINT NOT NULL,
    is_active     BOOLEAN NOT NULL DEFAULT TRUE,
    txn_version       BIGINT NOT NULL,
    collateral_asset   VARCHAR(66) NOT NULL,
    CONSTRAINT fk_offer_token FOREIGN KEY (token_addr) REFERENCES "premarket_tokens"(token_addr) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create premarket_orders table
CREATE TABLE "premarket_orders" (
    order_addr VARCHAR(66) PRIMARY KEY,
    token_addr VARCHAR(66) NOT NULL,
    offer_addr VARCHAR(66) NOT NULL,
    buyer      VARCHAR(66) NOT NULL,
    seller     VARCHAR(66) NOT NULL,
    amount     BIGINT NOT NULL,
    created_by VARCHAR(66) NOT NULL,
    ts         BIGINT NOT NULL,
    is_settled BOOLEAN NOT NULL DEFAULT FALSE,
    is_claimed BOOLEAN NOT NULL DEFAULT FALSE,
    is_cancelled BOOLEAN NOT NULL DEFAULT FALSE,
    txn_version       BIGINT NOT NULL,
    CONSTRAINT fk_order_token FOREIGN KEY (token_addr) REFERENCES "premarket_tokens"(token_addr) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_order_offer FOREIGN KEY (offer_addr) REFERENCES "premarket_offers"(offer_addr) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Indexes for faster lookups
CREATE INDEX idx_premarket_offers_token ON "premarket_offers"(token_addr);
CREATE INDEX idx_premarket_orders_token ON "premarket_orders"(token_addr);
CREATE INDEX idx_premarket_orders_offer ON "premarket_orders"(offer_addr);

-- Trigger to update updated_at automatically
CREATE OR REPLACE FUNCTION update_premarket_tokens_updated_at()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trg_update_premarket_tokens_updated_at
BEFORE UPDATE ON "premarket_tokens"
FOR EACH ROW
EXECUTE FUNCTION update_premarket_tokens_updated_at();
