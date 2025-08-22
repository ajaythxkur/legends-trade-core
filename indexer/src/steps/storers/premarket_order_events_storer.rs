use ahash::AHashMap;
use anyhow::Result;
use aptos_indexer_processor_sdk::utils::errors::ProcessorError;
use diesel::{insert_into, ExpressionMethods, QueryResult, update, QueryDsl};
use diesel_async::{AsyncConnection, AsyncPgConnection, RunQueryDsl};

use crate::{
    db_models::premarket_orders::{PremarketOrder, PremarketOrderCancelled, PremarketOrderClaimed, PremarketOrderSettled},
    schema::premarket_orders,
    utils::{
        database_connection::get_db_connection,
        database_utils::{get_config_table_chunk_size, ArcDbPool},
    },
};

async fn execute_order_created_events_sql(
    conn: &mut AsyncPgConnection,
    items_to_insert: Vec<PremarketOrder>,
) -> QueryResult<()> {
    conn.transaction(|conn| {
        Box::pin(async move {
            let create_orders_query = insert_into(premarket_orders::table)
                .values(items_to_insert.clone())
                .on_conflict(premarket_orders::order_addr)
                .do_nothing();
            create_orders_query.execute(conn).await?;
            Ok(())
        })
    })
    .await
}

pub async fn process_premarket_order_created_events(
    pool: ArcDbPool,
    per_table_chunk_sizes: AHashMap<String, usize>,
    create_events: Vec<PremarketOrder>,
) -> Result<(), ProcessorError> {
    let chunk_size =
        get_config_table_chunk_size::<PremarketOrder>("premarket_orders", &per_table_chunk_sizes);
    let tasks = create_events
        .chunks(chunk_size)
        .map(|chunk| {
            let pool = pool.clone();
            let items = chunk.to_vec();
            tokio::spawn(async move {
                let conn = &mut get_db_connection(&pool)
                    .await
                    .expect("Failed to get connection from pool while processing premarket order created events");
                execute_order_created_events_sql(conn, items).await
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


async fn execute_order_cancelled_events_sql(
    conn: &mut AsyncPgConnection,
    items_to_update: Vec<PremarketOrderCancelled>,
) -> QueryResult<()> {
    conn.transaction(|conn| {
        Box::pin(async move {
            for order in items_to_update {
                let update_order_query = update(premarket_orders::table.filter(premarket_orders::order_addr.eq(order.order_addr)))
                    .set(
                        premarket_orders::is_cancelled.eq(order.is_cancelled)
                    );
                update_order_query.execute(conn).await?;
            }
            Ok(())
        })
    })
    .await
}

pub async fn process_premarket_order_cancelled_events(
    pool: ArcDbPool,
    per_table_chunk_sizes: AHashMap<String, usize>,
    create_events: Vec<PremarketOrderCancelled>,
) -> Result<(), ProcessorError> {
    let chunk_size =
        get_config_table_chunk_size::<PremarketOrder>("premarket_orders", &per_table_chunk_sizes);
    let tasks = create_events
        .chunks(chunk_size)
        .map(|chunk| {
            let pool = pool.clone();
            let items = chunk.to_vec();
            tokio::spawn(async move {
                let conn = &mut get_db_connection(&pool)
                    .await
                    .expect("Failed to get connection from pool while processing premarket order cancelled events");
                execute_order_cancelled_events_sql(conn, items).await
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


async fn execute_order_settled_events_sql(
    conn: &mut AsyncPgConnection,
    items_to_update: Vec<PremarketOrderSettled>,
) -> QueryResult<()> {
    conn.transaction(|conn| {
        Box::pin(async move {
            for order in items_to_update {
                let update_order_query = update(premarket_orders::table.filter(premarket_orders::order_addr.eq(order.order_addr)))
                    .set(
                        premarket_orders::is_settled.eq(order.is_settled)
                    );
                update_order_query.execute(conn).await?;
            }
            Ok(())
        })
    })
    .await
}

pub async fn process_premarket_order_settled_events(
    pool: ArcDbPool,
    per_table_chunk_sizes: AHashMap<String, usize>,
    create_events: Vec<PremarketOrderSettled>,
) -> Result<(), ProcessorError> {
    let chunk_size =
        get_config_table_chunk_size::<PremarketOrder>("premarket_orders", &per_table_chunk_sizes);
    let tasks = create_events
        .chunks(chunk_size)
        .map(|chunk| {
            let pool = pool.clone();
            let items = chunk.to_vec();
            tokio::spawn(async move {
                let conn = &mut get_db_connection(&pool)
                    .await
                    .expect("Failed to get connection from pool while processing premarket order settled events");
                execute_order_settled_events_sql(conn, items).await
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



async fn execute_order_claimed_events_sql(
    conn: &mut AsyncPgConnection,
    items_to_update: Vec<PremarketOrderClaimed>,
) -> QueryResult<()> {
    conn.transaction(|conn| {
        Box::pin(async move {
            for order in items_to_update {
                let update_order_query = update(premarket_orders::table.filter(premarket_orders::order_addr.eq(order.order_addr)))
                    .set(
                        premarket_orders::is_claimed.eq(order.is_claimed)
                    );
                update_order_query.execute(conn).await?;
            }
            Ok(())
        })
    })
    .await
}

pub async fn process_premarket_order_claimed_events(
    pool: ArcDbPool,
    per_table_chunk_sizes: AHashMap<String, usize>,
    create_events: Vec<PremarketOrderClaimed>,
) -> Result<(), ProcessorError> {
    let chunk_size =
        get_config_table_chunk_size::<PremarketOrder>("premarket_orders", &per_table_chunk_sizes);
    let tasks = create_events
        .chunks(chunk_size)
        .map(|chunk| {
            let pool = pool.clone();
            let items = chunk.to_vec();
            tokio::spawn(async move {
                let conn = &mut get_db_connection(&pool)
                    .await
                    .expect("Failed to get connection from pool while processing premarket order claimed events");
                execute_order_claimed_events_sql(conn, items).await
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
