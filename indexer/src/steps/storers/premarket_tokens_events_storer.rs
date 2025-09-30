use ahash::AHashMap;
use anyhow::Result;
use aptos_indexer_processor_sdk::utils::errors::ProcessorError;
use diesel::{insert_into, ExpressionMethods, QueryResult, update, QueryDsl};
use diesel_async::{AsyncConnection, AsyncPgConnection, RunQueryDsl};

use crate::{
    db_models::premarket_tokens::{PremarketToken, PremarketTokenFaUpdated, PremarketTokenSettleDurationUpdated, PremarketTokenStatusUpdated},
    schema::premarket_tokens,
    utils::{
        database_connection::get_db_connection,
        database_utils::{get_config_table_chunk_size, ArcDbPool},
    },
};

async fn execute_token_created_events_sql(
    conn: &mut AsyncPgConnection,
    items_to_insert: Vec<PremarketToken>,
) -> QueryResult<()> {
    conn.transaction(|conn| {
        Box::pin(async move {
            let create_tokens_query = insert_into(premarket_tokens::table)
                .values(items_to_insert.clone())
                .on_conflict(premarket_tokens::token_addr)
                .do_nothing();
            create_tokens_query.execute(conn).await?;
            Ok(())
        })
    })
    .await
}

pub async fn process_premarket_token_created_events(
    pool: ArcDbPool,
    per_table_chunk_sizes: AHashMap<String, usize>,
    create_events: Vec<PremarketToken>,
) -> Result<(), ProcessorError> {
    let chunk_size =
        get_config_table_chunk_size::<PremarketToken>("premarket_tokens", &per_table_chunk_sizes);
    let tasks = create_events
        .chunks(chunk_size)
        .map(|chunk| {
            let pool = pool.clone();
            let items = chunk.to_vec();
            tokio::spawn(async move {
                let conn = &mut get_db_connection(&pool)
                    .await
                    .expect("Failed to get connection from pool while processing premarket token created events");
                execute_token_created_events_sql(conn, items).await
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


async fn execute_token_settle_duration_updated_events_sql(
    conn: &mut AsyncPgConnection,
    items_to_update: Vec<PremarketTokenSettleDurationUpdated>,
) -> QueryResult<()> {
    conn.transaction(|conn| {
        Box::pin(async move {
            for token in items_to_update {
                let update_token_query = update(premarket_tokens::table.filter(premarket_tokens::token_addr.eq(token.token_addr)))
                    .set(
                        premarket_tokens::settle_duration.eq(token.settle_duration)
                    );
                update_token_query.execute(conn).await?;
            }
            Ok(())
        })
    })
    .await
}

pub async fn process_premarket_token_settle_duration_updated_events(
    pool: ArcDbPool,
    per_table_chunk_sizes: AHashMap<String, usize>,
    create_events: Vec<PremarketTokenSettleDurationUpdated>,
) -> Result<(), ProcessorError> {
    let chunk_size =
        get_config_table_chunk_size::<PremarketToken>("premarket_tokens", &per_table_chunk_sizes);
    let tasks = create_events
        .chunks(chunk_size)
        .map(|chunk| {
            let pool = pool.clone();
            let items = chunk.to_vec();
            tokio::spawn(async move {
                let conn = &mut get_db_connection(&pool)
                    .await
                    .expect("Failed to get connection from pool while processing premarket token settle duration updated events");
                execute_token_settle_duration_updated_events_sql(conn, items).await
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


async fn execute_token_status_updated_events_sql(
    conn: &mut AsyncPgConnection,
    items_to_update: Vec<PremarketTokenStatusUpdated>,
) -> QueryResult<()> {
    conn.transaction(|conn| {
        Box::pin(async move {
            for token in items_to_update {
                let update_token_query = update(premarket_tokens::table.filter(premarket_tokens::token_addr.eq(token.token_addr)))
                    .set((
                        premarket_tokens::status.eq(token.status),
                        premarket_tokens::settle_started_at.eq(token.settle_started_at)
                    ));
                update_token_query.execute(conn).await?;
            }
            Ok(())
        })
    })
    .await
}

pub async fn process_premarket_token_status_updated_events(
    pool: ArcDbPool,
    per_table_chunk_sizes: AHashMap<String, usize>,
    create_events: Vec<PremarketTokenStatusUpdated>,
) -> Result<(), ProcessorError> {
    let chunk_size =
        get_config_table_chunk_size::<PremarketToken>("premarket_tokens", &per_table_chunk_sizes);
    let tasks = create_events
        .chunks(chunk_size)
        .map(|chunk| {
            let pool = pool.clone();
            let items = chunk.to_vec();
            tokio::spawn(async move {
                let conn = &mut get_db_connection(&pool)
                    .await
                    .expect("Failed to get connection from pool while processing premarket token status updated events");
                execute_token_status_updated_events_sql(conn, items).await
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

async fn execute_token_fa_updated_events_sql(
    conn: &mut AsyncPgConnection,
    items_to_update: Vec<PremarketTokenFaUpdated>,
) -> QueryResult<()> {
    conn.transaction(|conn| {
        Box::pin(async move {
            for token in items_to_update {
                let update_token_query = update(premarket_tokens::table.filter(premarket_tokens::token_addr.eq(token.token_addr)))
                    .set(
                        premarket_tokens::fa.eq(token.fa),
                    );
                update_token_query.execute(conn).await?;
            }
            Ok(())
        })
    })
    .await
}

pub async fn process_premarket_token_fa_updated_events(
    pool: ArcDbPool,
    per_table_chunk_sizes: AHashMap<String, usize>,
    create_events: Vec<PremarketTokenFaUpdated>,
) -> Result<(), ProcessorError> {
    let chunk_size =
        get_config_table_chunk_size::<PremarketToken>("premarket_tokens", &per_table_chunk_sizes);
    let tasks = create_events
        .chunks(chunk_size)
        .map(|chunk| {
            let pool = pool.clone();
            let items = chunk.to_vec();
            tokio::spawn(async move {
                let conn = &mut get_db_connection(&pool)
                    .await
                    .expect("Failed to get connection from pool while processing premarket token fa updated events");
                execute_token_fa_updated_events_sql(conn, items).await
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
