use ahash::AHashMap;
use anyhow::Result;
use aptos_indexer_processor_sdk::utils::errors::ProcessorError;
use diesel::{insert_into, ExpressionMethods, QueryResult, update, QueryDsl};
use diesel_async::{AsyncConnection, AsyncPgConnection, RunQueryDsl};

use crate::{
    db_models::premarket_offers::{PremarketOffer, PremarketOfferCancelled},
    schema::premarket_offers,
    utils::{
        database_connection::get_db_connection,
        database_utils::{get_config_table_chunk_size, ArcDbPool},
    },
};

async fn execute_offer_created_events_sql(
    conn: &mut AsyncPgConnection,
    items_to_insert: Vec<PremarketOffer>,
) -> QueryResult<()> {
    conn.transaction(|conn| {
        Box::pin(async move {
            let create_offers_query = insert_into(premarket_offers::table)
                .values(items_to_insert.clone())
                .on_conflict(premarket_offers::offer_addr)
                .do_nothing();
            create_offers_query.execute(conn).await?;

            Ok(())
        })
    })
    .await
}

pub async fn process_premarket_offer_created_events(
    pool: ArcDbPool,
    per_table_chunk_sizes: AHashMap<String, usize>,
    create_events: Vec<PremarketOffer>,
) -> Result<(), ProcessorError> {
    let chunk_size =
        get_config_table_chunk_size::<PremarketOffer>("premarket_offers", &per_table_chunk_sizes);
    let tasks = create_events
        .chunks(chunk_size)
        .map(|chunk| {
            let pool = pool.clone();
            let items = chunk.to_vec();
            tokio::spawn(async move {
                let conn = &mut get_db_connection(&pool)
                    .await
                    .expect("Failed to get connection from pool while processing premarket token created events");
                execute_offer_created_events_sql(conn, items).await
            })
        })
        .collect::<Vec<_>>();

    let results = futures_util::future::try_join_all(tasks)
        .await
        .expect("Task panicked executing in chunks");
    for res in results {
        res.map_err(|e| {
            tracing::warn!("Error running query: {:?}", e);
            ProcessorError::ProcessError {
                message: e.to_string(),
            }
        })?;
    }
    Ok(())
}


async fn execute_offer_cancelled_events_sql(
    conn: &mut AsyncPgConnection,
    items_to_update: Vec<PremarketOfferCancelled>,
) -> QueryResult<()> {
    conn.transaction(|conn| {
        Box::pin(async move {
            for offer in items_to_update {
                let update_offer_query = update(premarket_offers::table.filter(premarket_offers::offer_addr.eq(offer.offer_addr)))
                    .set(
                        premarket_offers::is_active.eq(offer.is_active)
                    );
                update_offer_query.execute(conn).await?;
            }
            Ok(())
        })
    })
    .await
}

pub async fn process_premarket_offer_cancelled_events(
    pool: ArcDbPool,
    per_table_chunk_sizes: AHashMap<String, usize>,
    create_events: Vec<PremarketOfferCancelled>,
) -> Result<(), ProcessorError> {
    let chunk_size =
        get_config_table_chunk_size::<PremarketOffer>("premarket_offers", &per_table_chunk_sizes);
    let tasks = create_events
        .chunks(chunk_size)
        .map(|chunk| {
            let pool = pool.clone();
            let items = chunk.to_vec();
            tokio::spawn(async move {
                let conn = &mut get_db_connection(&pool)
                    .await
                    .expect("Failed to get connection from pool while processing premarket offer cancelled events");
                execute_offer_cancelled_events_sql(conn, items).await
            })
        })
        .collect::<Vec<_>>();

    let results = futures_util::future::try_join_all(tasks)
        .await
        .expect("Task panicked executing in chunks");
    for res in results {
        res.map_err(|e| {
            tracing::warn!("Error running query: {:?}", e);
            ProcessorError::ProcessError {
                message: e.to_string(),
            }
        })?;
    }
    Ok(())
}
