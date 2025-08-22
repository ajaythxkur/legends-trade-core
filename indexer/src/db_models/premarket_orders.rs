use aptos_indexer_processor_sdk::utils::convert::{standardize_address};
use diesel::{AsChangeset, Insertable};
use field_count::FieldCount;
use serde::{Deserialize, Serialize};
use crate::schema::premarket_orders;

#[derive(AsChangeset, Clone, Debug, Deserialize, FieldCount, Insertable, Serialize)]
#[diesel(table_name = premarket_orders)]
pub struct PremarketOrder {
    pub order_addr: String,
    pub token_addr: String,
    pub offer_addr: String,
    pub buyer: String,
    pub seller: String,
    pub amount: i64,
    pub created_by: String,
    pub ts: i64,
    pub is_settled: bool,
    pub is_claimed: bool,
    pub is_cancelled: bool,
    pub txn_version: i64
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PremarketOrderCreatedOnChain {
    pub token_addr: String,
    pub offer_addr: String,
    pub order_addr: String,
    pub buyer: String,
    pub seller: String,
    pub amount: String,
    pub created_by: String,
    pub ts: String
}

impl PremarketOrderCreatedOnChain {
       pub fn to_db_order(&self, txn_version: i64) -> PremarketOrder {
        PremarketOrder {
            token_addr: standardize_address(&self.token_addr), 
            order_addr: standardize_address(&self.order_addr), 
            offer_addr: standardize_address(&self.offer_addr), 
            buyer: standardize_address(&self.buyer), 
            seller: standardize_address(&self.seller), 
            amount: self.amount.parse().unwrap_or(0),
            created_by: standardize_address(&self.created_by), 
            is_claimed: false,
            is_settled: false,
            is_cancelled: false,
            ts: self.ts.parse().unwrap_or(0),
            txn_version
        }
    }
}

#[derive(AsChangeset, Clone, Debug, Deserialize, FieldCount, Insertable, Serialize)]
#[diesel(table_name = premarket_orders)]
pub struct PremarketOrderSettled {
    pub order_addr: String,
    pub is_settled: bool
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PremarketOrderSettledOnChain {
    pub order_addr: String,
    pub ts: String
}

impl PremarketOrderSettledOnChain {
    pub fn to_db_order_updated(&self) -> PremarketOrderSettled {
        PremarketOrderSettled {
            order_addr: standardize_address(&self.order_addr),
            is_settled: true
        }
    }
}

#[derive(AsChangeset, Clone, Debug, Deserialize, FieldCount, Insertable, Serialize)]
#[diesel(table_name = premarket_orders)]
pub struct PremarketOrderClaimed {
    pub order_addr: String,
    pub is_claimed: bool
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PremarketOrderClaimedOnChain {
    pub order_addr: String,
    pub ts: String
}

impl PremarketOrderClaimedOnChain {
    pub fn to_db_order_updated(&self) -> PremarketOrderClaimed {
        PremarketOrderClaimed {
            order_addr: standardize_address(&self.order_addr),
            is_claimed: true
        }
    }
}

#[derive(AsChangeset, Clone, Debug, Deserialize, FieldCount, Insertable, Serialize)]
#[diesel(table_name = premarket_orders)]
pub struct PremarketOrderCancelled {
    pub order_addr: String,
    pub is_cancelled: bool
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PremarketOrderCancelledOnChain {
    pub order_addr: String,
    pub ts: String
}

impl PremarketOrderCancelledOnChain {
    pub fn to_db_order_updated(&self) -> PremarketOrderCancelled {
        PremarketOrderCancelled {
            order_addr: standardize_address(&self.order_addr),
            is_cancelled: true
        }
    }
}