use aptos_indexer_processor_sdk::utils::convert::{standardize_address};
use diesel::{AsChangeset, Insertable};
use field_count::FieldCount;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use serde::de::Deserializer;
use crate::schema::premarket_tokens;

#[derive(AsChangeset, Clone, Debug, Deserialize, FieldCount, Insertable, Serialize)]
#[diesel(table_name = premarket_tokens)]
pub struct PremarketToken {
    pub token_addr: String,
    pub name: String,
    pub symbol: String,
    pub image: String,
    pub website: Option<String>,
    pub twitter: Option<String>,
    pub telegram: Option<String>,
    pub settle_duration: i64,
    pub temp_starts_at: Option<i64>,
    pub temp_ends_at: Option<i64>,
    pub settle_started_at: Option<i64>,
    pub status: i32,
    pub fa: Option<String>,
    pub chain_type: i32,
    pub txn_version: i64
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PremarketTokenCreatedOnChain {
    pub token_addr: String,
    pub name: String,
    pub symbol: String,
    pub image: String,
    #[serde(deserialize_with = "deserialize_aptos_option_string")]
    pub website: Option<String>,
    #[serde(deserialize_with = "deserialize_aptos_option_string")]
    pub twitter: Option<String>,
    #[serde(deserialize_with = "deserialize_aptos_option_string")]
    pub telegram: Option<String>,
    pub settle_duration: String,
    pub chain_type: i32
}

impl PremarketTokenCreatedOnChain {
       pub fn to_db_token(&self, txn_version: i64) -> PremarketToken {
        PremarketToken {
            token_addr: standardize_address(&self.token_addr), 
            name: self.name.clone(), 
            symbol: self.symbol.clone(), 
            image: self.image.clone(),
            website: self.website.clone(),
            twitter: self.twitter.clone(),
            telegram: self.telegram.clone(),
            settle_duration: self.settle_duration.parse().unwrap(),
            chain_type: self.chain_type,
            fa: None,
            settle_started_at: None,
            status: 0,
            temp_ends_at: None,
            temp_starts_at: None,
            txn_version
        }
    }
}

#[derive(AsChangeset, Clone, Debug, Deserialize, FieldCount, Insertable, Serialize)]
#[diesel(table_name = premarket_tokens)]
pub struct PremarketTokenSettleDurationUpdated {
    pub token_addr: String,
    pub settle_duration: i64,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PremarketTokenSettleDurationUpdatedOnChain {
    pub token_addr: String,
    pub settle_duration: String
}

impl PremarketTokenSettleDurationUpdatedOnChain {
    pub fn to_db_token_updated(&self) -> PremarketTokenSettleDurationUpdated {
        PremarketTokenSettleDurationUpdated {
            token_addr: standardize_address(&self.token_addr),
            settle_duration: self.settle_duration.parse().unwrap_or(86400),
        }
    }
}

#[derive(AsChangeset, Clone, Debug, Deserialize, FieldCount, Insertable, Serialize)]
#[diesel(table_name = premarket_tokens)]
pub struct PremarketTokenStatusUpdated {
    pub token_addr: String,
    pub settle_started_at: i64,
    pub status: i32
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PremarketTokenStatusUpdatedOnChain {
    pub token_addr: String,
    pub settle_started_at: String,
    pub status: i32
}

impl PremarketTokenStatusUpdatedOnChain {
    pub fn to_db_token_updated(&self) -> PremarketTokenStatusUpdated {
        PremarketTokenStatusUpdated {
            token_addr: standardize_address(&self.token_addr),
            settle_started_at: self.settle_started_at.parse().unwrap(),
            status: self.status
        }
    }
}

#[derive(AsChangeset, Clone, Debug, Deserialize, FieldCount, Insertable, Serialize)]
#[diesel(table_name = premarket_tokens)]
pub struct PremarketTokenFaUpdated {
    pub token_addr: String,
    pub fa: String
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PremarketTokenFaUpdatedOnChain {
    pub token_addr: String,
    pub fa: String
}

impl PremarketTokenFaUpdatedOnChain {
    pub fn to_db_token_updated(&self) -> PremarketTokenFaUpdated {
        PremarketTokenFaUpdated {
            token_addr: standardize_address(&self.token_addr),
            fa: standardize_address(&self.fa)
        }
    }
}

pub fn deserialize_aptos_option_string<'de, D>(
    deserializer: D,
) -> Result<Option<String>, D::Error>
where
    D: Deserializer<'de>,
{
    let val: Value = Deserialize::deserialize(deserializer)?;
    match val {
        Value::Object(obj) if obj.get("vec").is_some() => {
            let vec = obj.get("vec").unwrap();
            if let Value::Array(arr) = vec {
                if arr.is_empty() {
                    Ok(None)
                } else if let Some(Value::String(s)) = arr.get(0) {
                    Ok(Some(s.clone()))
                } else {
                    Ok(None)
                }
            } else {
                Ok(None)
            }
        }
        _ => Ok(None),
    }
}