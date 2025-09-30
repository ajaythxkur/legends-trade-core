use aptos_indexer_processor_sdk::utils::convert::{standardize_address};
use diesel::{AsChangeset, Insertable};
use field_count::FieldCount;
use serde::{Deserialize, Serialize};
use crate::schema::premarket_offers;

#[derive(AsChangeset, Clone, Debug, Deserialize, FieldCount, Insertable, Serialize)]
#[diesel(table_name = premarket_offers)]
pub struct PremarketOffer {
    pub offer_addr: String,
    pub token_addr: String,
    pub price: i64,
    pub amount: i64,
    pub is_buy: bool,
    pub is_full_match: bool,
    pub created_by: String,
    pub ts: i64,
    pub filled_amount: i64,
    pub is_active: bool,
    pub txn_version: i64,
    pub collateral_asset: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PremarketOfferCreatedOnChain {
    pub token_addr: String,
    pub offer_addr: String,
    pub price: String,
    pub amount: String,
    pub is_buy: bool,
    pub is_full_match: bool,
    pub created_by: String,
    pub ts: String,
    pub collateral_asset: String,
}

impl PremarketOfferCreatedOnChain {
       pub fn to_db_offer(&self, txn_version: i64) -> PremarketOffer {
        PremarketOffer {
            offer_addr: standardize_address(&self.offer_addr),
            token_addr: standardize_address(&self.token_addr), 
            price: self.price.parse().unwrap_or(0),
            amount: self.amount.parse().unwrap_or(0),
            created_by: standardize_address(&self.created_by),
            is_buy: self.is_buy,
            is_full_match: self.is_full_match,
            filled_amount: 0,
            is_active: true,
            ts: self.ts.parse().unwrap_or(0),
            txn_version,
            collateral_asset: standardize_address(&self.collateral_asset),
        }
    }
}


#[derive(AsChangeset, Clone, Debug, Deserialize, FieldCount, Insertable, Serialize)]
#[diesel(table_name = premarket_offers)]
pub struct PremarketOfferCancelled {
    pub offer_addr: String,
    pub is_active: bool,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PremarketOfferCancelledOnChain {
    pub offer_addr: String,
    pub ts: String,
}

impl PremarketOfferCancelledOnChain {
    pub fn to_db_offer_updated(&self) -> PremarketOfferCancelled {
        PremarketOfferCancelled {
            offer_addr: standardize_address(&self.offer_addr),
            is_active: false
        }
    }
}