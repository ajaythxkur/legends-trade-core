use ahash::AHashMap;
use anyhow::Result;
use aptos_indexer_processor_sdk::{
    traits::{async_step::AsyncRunType, AsyncStep, NamedStep, Processable},
    types::transaction_context::TransactionContext,
    utils::errors::ProcessorError,
};
use async_trait::async_trait;

use super::{
    extractor::{ContractEvent, ContractUpgradeChange, TransactionContextData},
    storers::{
        upgrade_module_change_storer::process_upgrade_module_changes,
        upgrade_package_change_storer::process_upgrade_package_changes,
    },
};
use crate::{
    steps::storers::{premarket_offer_events_storer::{process_premarket_offer_cancelled_events, process_premarket_offer_created_events}, premarket_order_events_storer::{process_premarket_order_cancelled_events, process_premarket_order_claimed_events, process_premarket_order_created_events, process_premarket_order_settled_events}, premarket_tokens_events_storer::{process_premarket_token_created_events, process_premarket_token_fa_updated_events, process_premarket_token_settle_duration_updated_events, process_premarket_token_status_updated_events}},
    utils::database_utils::ArcDbPool,
};

/// Storer is a step that inserts events in the database.
pub struct Storer
where
    Self: Sized + Send + 'static,
{
    pool: ArcDbPool,
}

impl AsyncStep for Storer {}

impl NamedStep for Storer {
    fn name(&self) -> String {
        "Storer".to_string()
    }
}

impl Storer {
    pub fn new(pool: ArcDbPool) -> Self {
        Self { pool }
    }
}

#[async_trait]
impl Processable for Storer {
    type Input = TransactionContextData;
    type Output = TransactionContextData;
    type RunType = AsyncRunType;

    async fn process(
        &mut self,
        transaction_context_data: TransactionContext<TransactionContextData>,
    ) -> Result<Option<TransactionContext<TransactionContextData>>, ProcessorError> {
        let per_table_chunk_sizes: AHashMap<String, usize> = AHashMap::new();
        let data = transaction_context_data.data.clone();
        let (
            premarket_token_created_events,
            premarket_token_settle_duration_updated_events,
            premarket_token_status_updated_events,
            premarket_token_fa_updated_events,
            premarket_offer_created_events,
            premarket_offer_cancelled_events,
            premarket_order_created_events,
            premarket_order_settled_events,
            premarket_order_claimed_events,
            premarket_order_cancelled_events
        ) = data.events.into_iter().fold(
            (
                vec![],
                vec![],
                vec![],
                vec![],
                vec![],
                vec![],
                vec![],
                vec![],
                vec![],
                vec![]
            ),
            |(
                mut premarket_token_create,
                mut premarket_token_settle_duration_update,
                mut premarket_token_status_update,
                mut premarket_token_fa_update,
                mut premarket_offer_create,
                mut premarket_offer_cancel,
                mut premarket_order_create,
                mut premarket_order_settle,
                mut premarket_order_claim,
                mut premarket_order_cancel
            ),
             event| {
                match event {
                    ContractEvent::PremarketTokenCreatedEvent(data) => {
                        premarket_token_create.push(data);
                    },
                    ContractEvent::PremarketTokenSettleDurationUpdateEvent(data) => {
                        premarket_token_settle_duration_update.push(data)
                    },
                    ContractEvent::PremarketTokenStatusUpdatedEvent(data) => {
                        premarket_token_status_update.push(data)
                    },
                    ContractEvent::PremarketTokenFaUpdatedEvent(data) => {
                        premarket_token_fa_update.push(data)
                    },
                    ContractEvent::PremarketOfferCreatedEvent(data) => {
                        premarket_offer_create.push(data)
                    },
                    ContractEvent::PremarketOfferCancelledEvent(data) => {
                        premarket_offer_cancel.push(data)
                    },
                    ContractEvent::PremarketOrderCreatedEvent(data) => {
                        premarket_order_create.push(data)
                    },
                    ContractEvent::PremarketOrderCancelledEvent(data) => {
                        premarket_order_cancel.push(data)
                    },
                     ContractEvent::PremarketOrderSettledEvent(data) => {
                        premarket_order_settle.push(data)
                    },
                     ContractEvent::PremarketOrderClaimedEvent(data) => {
                        premarket_order_claim.push(data)
                    }
                }
                (
                   premarket_token_create,
                   premarket_token_settle_duration_update,
                   premarket_token_status_update,
                   premarket_token_fa_update,
                   premarket_offer_create,
                   premarket_offer_cancel,
                   premarket_order_create,
                   premarket_order_settle,
                   premarket_order_claim,
                   premarket_order_cancel
                )
            },
        );

        process_premarket_token_created_events(
            self.pool.clone(),
            per_table_chunk_sizes.clone(),
            premarket_token_created_events,
        )
        .await?;

        process_premarket_token_settle_duration_updated_events(
            self.pool.clone(),
            per_table_chunk_sizes.clone(),
            premarket_token_settle_duration_updated_events,
        )
        .await?;

        process_premarket_token_status_updated_events(
            self.pool.clone(),
            per_table_chunk_sizes.clone(),
            premarket_token_status_updated_events,
        )
        .await?;

        process_premarket_token_fa_updated_events(
            self.pool.clone(),
            per_table_chunk_sizes.clone(),
            premarket_token_fa_updated_events,
        )
        .await?;

        process_premarket_offer_created_events(
             self.pool.clone(),
            per_table_chunk_sizes.clone(),
            premarket_offer_created_events,
        )
        .await?;

        process_premarket_offer_cancelled_events(
            self.pool.clone(),
            per_table_chunk_sizes.clone(),
            premarket_offer_cancelled_events,
        )
        .await?;

        process_premarket_order_created_events(
            self.pool.clone(),
            per_table_chunk_sizes.clone(),
            premarket_order_created_events,
        )
        .await?;

        process_premarket_order_settled_events(
            self.pool.clone(),
            per_table_chunk_sizes.clone(),
            premarket_order_settled_events,
        )
        .await?;

        process_premarket_order_cancelled_events(
            self.pool.clone(),
            per_table_chunk_sizes.clone(),
            premarket_order_cancelled_events,
        )
        .await?;

        process_premarket_order_claimed_events(
            self.pool.clone(),
            per_table_chunk_sizes.clone(),
            premarket_order_claimed_events,
        )
        .await?;

        let (module_upgrades, package_upgrades) = data.changes.into_iter().fold(
            (vec![], vec![]),
            |(mut module_upgrades, mut package_upgrades), upgrade_change| {
                match upgrade_change {
                    ContractUpgradeChange::ModuleUpgradeChange(module_upgrade) => {
                        module_upgrades.push(module_upgrade);
                    }
                    ContractUpgradeChange::PackageUpgradeChange(package_upgrade) => {
                        package_upgrades.push(package_upgrade);
                    }
                }
                (module_upgrades, package_upgrades)
            },
        );

        process_upgrade_module_changes(
            self.pool.clone(),
            per_table_chunk_sizes.clone(),
            module_upgrades,
        )
        .await?;

        process_upgrade_package_changes(
            self.pool.clone(),
            per_table_chunk_sizes.clone(),
            package_upgrades,
        )
        .await?;

        Ok(Some(transaction_context_data))
    }
}
