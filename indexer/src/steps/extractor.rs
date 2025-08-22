use ahash::AHashMap;
use anyhow::Result;
use aptos_indexer_processor_sdk::{
    aptos_protos::transaction::v1::{
        transaction::TxnData, write_set_change::Change, Event as EventPB, MoveModuleBytecode,
        Transaction, WriteSetChange,
    },
    traits::{async_step::AsyncRunType, AsyncStep, NamedStep, Processable},
    types::transaction_context::TransactionContext,
    utils::{convert::standardize_address, errors::ProcessorError},
};
use async_trait::async_trait;
use rayon::prelude::*;

use crate::db_models::{
    module_upgrade::ModuleUpgrade, package_upgrade::{PackageUpgrade, PackageUpgradeChangeOnChain}, premarket_offers::{PremarketOffer, PremarketOfferCancelled, PremarketOfferCancelledOnChain, PremarketOfferCreatedOnChain}, premarket_orders::{PremarketOrder, PremarketOrderCancelled, PremarketOrderCancelledOnChain, PremarketOrderClaimed, PremarketOrderClaimedOnChain, PremarketOrderCreatedOnChain, PremarketOrderSettled, PremarketOrderSettledOnChain}, premarket_tokens::{PremarketToken, PremarketTokenCreatedOnChain, PremarketTokenFaUpdated, PremarketTokenFaUpdatedOnChain, PremarketTokenSettleDurationUpdated, PremarketTokenSettleDurationUpdatedOnChain, PremarketTokenStatusUpdated, PremarketTokenStatusUpdatedOnChain}
};

/// Extractor is a step that extracts events and their metadata from transactions.
pub struct Extractor
where
    Self: Sized + Send + 'static,
{
    contract_address: String,
}

impl Extractor {
    pub fn new(contract_address: String) -> Self {
        Self { contract_address }
    }
}

impl AsyncStep for Extractor {}

impl NamedStep for Extractor {
    fn name(&self) -> String {
        "Extractor".to_string()
    }
}

#[async_trait]
impl Processable for Extractor {
    type Input = Vec<Transaction>;
    type Output = TransactionContextData;
    type RunType = AsyncRunType;

    async fn process(
        &mut self,
        item: TransactionContext<Vec<Transaction>>,
    ) -> Result<Option<TransactionContext<TransactionContextData>>, ProcessorError> {
        let results: Vec<(Vec<ContractEvent>, Vec<ContractUpgradeChange>)> = item
            .data
            .par_iter()
            .map(|txn| {
                let txn_version = txn.version as i64;
                let txn_info = match txn.info.as_ref() {
                    Some(info) => {
                        if info.success {
                            info
                        } else {
                            return (vec![], vec![]);
                        }
                    }
                    None => {
                        tracing::warn!(
                            transaction_version = txn_version,
                            "Transaction info doesn't exist"
                        );
                        return (vec![], vec![]);
                    }
                };
                let txn_data = match txn.txn_data.as_ref() {
                    Some(data) => data,
                    None => {
                        tracing::warn!(
                            transaction_version = txn_version,
                            "Transaction data doesn't exist"
                        );
                        return (vec![], vec![]);
                    }
                };
                let raw_events = match txn_data {
                    TxnData::BlockMetadata(tx_inner) => &tx_inner.events,
                    TxnData::Genesis(tx_inner) => &tx_inner.events,
                    TxnData::User(tx_inner) => &tx_inner.events,
                    _ => &vec![],
                };
                // let sender = match txn_data {
                //     TxnData::User(tx_inner) => {
                //         tx_inner.request.as_ref().map(|req| req.sender.clone())
                //     }
                //     _ => None,
                // };
                let txn_events = ContractEvent::from_events(
                    self.contract_address.as_str(),
                    raw_events,
                    txn_version,
                );
                let txn_changes = ContractUpgradeChange::from_changes(
                    self.contract_address.as_str(),
                    txn_version,
                    txn_info.changes.as_slice(),
                );

                (txn_events, txn_changes)
            })
            .collect::<Vec<(Vec<ContractEvent>, Vec<ContractUpgradeChange>)>>();

        let (events, changes): (Vec<ContractEvent>, Vec<ContractUpgradeChange>) =
            results.into_iter().fold(
                (Vec::new(), Vec::new()),
                |(mut events_acc, mut changes_acc), (events, changes)| {
                    events_acc.extend(events);
                    changes_acc.extend(changes);
                    (events_acc, changes_acc)
                },
            );

        Ok(Some(TransactionContext {
            data: TransactionContextData { events, changes },
            metadata: item.metadata,
        }))
    }
}

#[derive(Debug, Clone)]
pub struct TransactionContextData {
    pub events: Vec<ContractEvent>,
    pub changes: Vec<ContractUpgradeChange>,
}

#[derive(Debug, Clone)]
pub enum ContractEvent {
    PremarketTokenCreatedEvent(PremarketToken),
    PremarketTokenSettleDurationUpdateEvent(PremarketTokenSettleDurationUpdated),
    PremarketTokenStatusUpdatedEvent(PremarketTokenStatusUpdated),
    PremarketTokenFaUpdatedEvent(PremarketTokenFaUpdated),
    PremarketOfferCreatedEvent(PremarketOffer),
    PremarketOfferCancelledEvent(PremarketOfferCancelled),
    PremarketOrderCreatedEvent(PremarketOrder),
    PremarketOrderSettledEvent(PremarketOrderSettled),
    PremarketOrderClaimedEvent(PremarketOrderClaimed),
    PremarketOrderCancelledEvent(PremarketOrderCancelled)
}

impl ContractEvent {
    fn from_event(
        contract_address: &str,
        _event_idx: usize,
        event: &EventPB,
        txn_version: i64,
    ) -> Option<Self> {
        // use standardize_address to pad the address in event type before processing
        let parts = event.type_str.split("::").collect::<Vec<_>>();
        let t = standardize_address(parts[0]) + "::" + parts[1] + "::" + parts[2];
        let should_include = t.starts_with(contract_address);
        println!("{}", event.type_str);

        if should_include {
            if t.starts_with(format!("{}::premarket::TokenCreated", contract_address).as_str()) {
                println!("premarket::TokenCreated {}", event.data.as_str());
                let token_create_event_on_chain: PremarketTokenCreatedOnChain =
                    serde_json::from_str(event.data.as_str()).unwrap_or_else(|_| {
                        panic!("Failed to parse premarket::TokenCreated, {}", event.data.as_str())
                    });
                Some(ContractEvent::PremarketTokenCreatedEvent(
                    token_create_event_on_chain.to_db_token(txn_version),
                ))
            } else if t.starts_with(format!("{}::premarket::TokenSettleDurationUpdated", contract_address).as_str()) {
                println!("premarket::TokenSettleDurationUpdated {}", event.data.as_str());
                let premarket_token_settle_duration_updated_on_chain: PremarketTokenSettleDurationUpdatedOnChain =
                    serde_json::from_str(event.data.as_str()).unwrap_or_else(|_| {
                        panic!("Failed to parse premarket::TokenSettleDurationUpdated, {}", event.data.as_str())
                    });
                Some(ContractEvent::PremarketTokenSettleDurationUpdateEvent(
                    premarket_token_settle_duration_updated_on_chain.to_db_token_updated(),
                ))
            } else if t.starts_with(format!("{}::premarket::TokenFaUpdated", contract_address).as_str()) {
                println!("premarket::TokenFaUpdated {}", event.data.as_str());
                let premarket_token_fa_updated_on_chain: PremarketTokenFaUpdatedOnChain =
                    serde_json::from_str(event.data.as_str()).unwrap_or_else(|_| {
                        panic!("Failed to parse premarket::TokenFaUpdated, {}", event.data.as_str())
                    });
                Some(ContractEvent::PremarketTokenFaUpdatedEvent(
                    premarket_token_fa_updated_on_chain.to_db_token_updated(),
                ))
            } else if t.starts_with(format!("{}::premarket::TokenStatusUpdated", contract_address).as_str()) {
                println!("premarket::TokenStatusUpdated {}", event.data.as_str());
                let premarket_token_status_updated_on_chain: PremarketTokenStatusUpdatedOnChain =
                    serde_json::from_str(event.data.as_str()).unwrap_or_else(|_| {
                        panic!("Failed to parse premarket::TokenStatusUpdated, {}", event.data.as_str())
                    });
                Some(ContractEvent::PremarketTokenStatusUpdatedEvent(
                    premarket_token_status_updated_on_chain.to_db_token_updated(),
                ))
            } else if t.starts_with(format!("{}::premarket::OfferCreated", contract_address).as_str()) {
                println!("premarket::OfferCreated {}", event.data.as_str());
                let premarket_offer_created_on_chain: PremarketOfferCreatedOnChain =
                    serde_json::from_str(event.data.as_str()).unwrap_or_else(|_| {
                        panic!("Failed to parse premarket::OfferCreated, {}", event.data.as_str())
                    });
                Some(ContractEvent::PremarketOfferCreatedEvent(
                    premarket_offer_created_on_chain.to_db_offer(txn_version),
                ))
            } else if t.starts_with(format!("{}::premarket::OfferCancelled", contract_address).as_str()) {
                println!("premarket::OfferCancelled {}", event.data.as_str());
                let premarket_offer_cancelled_on_chain: PremarketOfferCancelledOnChain =
                    serde_json::from_str(event.data.as_str()).unwrap_or_else(|_| {
                        panic!("Failed to parse premarket::OfferCancelled, {}", event.data.as_str())
                    });
                Some(ContractEvent::PremarketOfferCancelledEvent(
                    premarket_offer_cancelled_on_chain.to_db_offer_updated(),
                ))
            } else if t.starts_with(format!("{}::premarket::OrderCreated", contract_address).as_str()) {
                println!("premarket::OrderCreated {}", event.data.as_str());
                let premarket_order_created_on_chain: PremarketOrderCreatedOnChain =
                    serde_json::from_str(event.data.as_str()).unwrap_or_else(|_| {
                        panic!("Failed to parse premarket::OrderCreated, {}", event.data.as_str())
                    });
                Some(ContractEvent::PremarketOrderCreatedEvent(
                    premarket_order_created_on_chain.to_db_order(txn_version),
                ))
            } else if t.starts_with(format!("{}::premarket::OrderCancelled", contract_address).as_str()) {
                println!("premarket::OrderCancelled {}", event.data.as_str());
                let premarket_order_cancelled_on_chain: PremarketOrderCancelledOnChain =
                    serde_json::from_str(event.data.as_str()).unwrap_or_else(|_| {
                        panic!("Failed to parse premarket::OrderCancelled, {}", event.data.as_str())
                    });
                Some(ContractEvent::PremarketOrderCancelledEvent(
                    premarket_order_cancelled_on_chain.to_db_order_updated(),
                ))
            } else if t.starts_with(format!("{}::premarket::OrderClaimed", contract_address).as_str()) {
                println!("premarket::OrderClaimed {}", event.data.as_str());
                let premarket_order_claimed_on_chain: PremarketOrderClaimedOnChain =
                    serde_json::from_str(event.data.as_str()).unwrap_or_else(|_| {
                        panic!("Failed to parse premarket::OrderClaimed, {}", event.data.as_str())
                    });
                Some(ContractEvent::PremarketOrderClaimedEvent(
                    premarket_order_claimed_on_chain.to_db_order_updated(),
                ))
            } else if t.starts_with(format!("{}::premarket::OrderSettled", contract_address).as_str()) {
                println!("premarket::OrderClaimed {}", event.data.as_str());
                let premarket_order_settled_on_chain: PremarketOrderSettledOnChain =
                    serde_json::from_str(event.data.as_str()).unwrap_or_else(|_| {
                        panic!("Failed to parse premarket::OrderClaimed, {}", event.data.as_str())
                    });
                Some(ContractEvent::PremarketOrderSettledEvent(
                    premarket_order_settled_on_chain.to_db_order_updated(),
                ))
            } else {
                None
            }
        } else {
            None
        }
    }

    pub fn from_events(
        contract_address: &str,
        events: &[EventPB],
        tx_version: i64,
    ) -> Vec<Self> {
        events
            .iter()
            .enumerate()
            .filter_map(|(idx, event)| {
                Self::from_event(contract_address, idx, event, tx_version)
            })
            .collect()
    }
}

#[derive(Debug, Clone)]
pub enum ContractUpgradeChange {
    ModuleUpgradeChange(ModuleUpgrade),
    PackageUpgradeChange(PackageUpgrade),
}

impl ContractUpgradeChange {
    pub fn from_changes(
        contract_address: &str,
        txn_version: i64,
        changes: &[WriteSetChange],
    ) -> Vec<Self> {
        let mut raw_module_changes: AHashMap<(String, String), MoveModuleBytecode> =
            AHashMap::new();
        let mut raw_package_changes: Vec<PackageUpgradeChangeOnChain> = vec![];

        changes
            .iter()
            .for_each(|change| match change.change.as_ref() {
                Some(change) => match change {
                    Change::WriteModule(write_module_change) => {
                        if standardize_address(write_module_change.address.as_str())
                            == contract_address
                        {
                            raw_module_changes.insert(
                                (
                                    standardize_address(write_module_change.address.as_str()),
                                    write_module_change
                                        .data
                                        .clone()
                                        .unwrap_or_else(|| {
                                            panic!("MoveModuleBytecode data is missing",)
                                        })
                                        .abi
                                        .clone()
                                        .unwrap_or_else(|| {
                                            panic!("MoveModuleBytecode abi is missing",)
                                        })
                                        .name,
                                ),
                                write_module_change.data.clone().unwrap(),
                            );
                        }
                    }
                    Change::WriteResource(write_resource_change) => {
                        if standardize_address(write_resource_change.address.as_str())
                            == contract_address
                            && write_resource_change.type_str == "0x1::code::PackageRegistry"
                        {
                            let package_upgrade: PackageUpgradeChangeOnChain =
                                serde_json::from_str(write_resource_change.data.as_str())
                                    .unwrap_or_else(|_| {
                                        panic!(
                                            "Failed to parse PackageUpgradeChangeOnChain, {}",
                                            write_resource_change.data.as_str()
                                        )
                                    });
                            raw_package_changes.push(package_upgrade);
                        }
                    }
                    _ => {}
                },
                None => {}
            });

        let package_changes = raw_package_changes
            .iter()
            .flat_map(|package_change| {
                package_change.to_db_package_upgrade(txn_version, contract_address.to_string())
            })
            .collect::<Vec<PackageUpgrade>>();

        let module_changes = raw_package_changes
            .iter()
            .flat_map(|package_change| package_change.packages.clone())
            .map(|package| {
                package
                    .modules
                    .iter()
                    .map(|module| {
                        let raw_module = raw_module_changes
                            .get(&(contract_address.to_string(), module.name.clone()))
                            .unwrap_or_else(|| {
                                panic!("Module bytecode not found for module {}", module.name)
                            });
                        ModuleUpgrade {
                            module_addr: contract_address.to_string(),
                            module_name: module.name.clone(),
                            upgrade_number: package.upgrade_number.parse().unwrap(),
                            module_bytecode: raw_module.bytecode.clone(),
                            module_source_code: module.source.clone(),
                            module_abi: serde_json::json!(raw_module.abi.clone().unwrap_or_else(
                                || { panic!("Module abi is missing for module {}", module.name) }
                            )),
                            tx_version: txn_version,
                        }
                    })
                    .collect::<Vec<ModuleUpgrade>>()
            })
            .flatten()
            .collect::<Vec<ModuleUpgrade>>();

        module_changes
            .into_iter()
            .map(ContractUpgradeChange::ModuleUpgradeChange)
            .chain(
                package_changes
                    .into_iter()
                    .map(ContractUpgradeChange::PackageUpgradeChange),
            )
            .collect()
    }
}
