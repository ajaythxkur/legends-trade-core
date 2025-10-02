// @generated automatically by Diesel CLI.

diesel::table! {
    ledger_infos (chain_id) {
        chain_id -> Int8,
    }
}

diesel::table! {
    module_upgrade_history (module_addr, module_name, upgrade_number) {
        #[max_length = 300]
        module_addr -> Varchar,
        #[max_length = 300]
        module_name -> Varchar,
        upgrade_number -> Int8,
        module_bytecode -> Bytea,
        module_source_code -> Text,
        module_abi -> Json,
        tx_version -> Int8,
    }
}

diesel::table! {
    package_upgrade_history (package_addr, package_name, upgrade_number) {
        #[max_length = 300]
        package_addr -> Varchar,
        #[max_length = 300]
        package_name -> Varchar,
        upgrade_number -> Int8,
        upgrade_policy -> Int8,
        package_manifest -> Text,
        source_digest -> Text,
        tx_version -> Int8,
    }
}

diesel::table! {
    premarket_offers (offer_addr) {
        #[max_length = 66]
        offer_addr -> Varchar,
        #[max_length = 66]
        token_addr -> Varchar,
        price -> Int8,
        amount -> Int8,
        is_buy -> Bool,
        is_full_match -> Bool,
        #[max_length = 66]
        created_by -> Varchar,
        ts -> Int8,
        filled_amount -> Int8,
        is_active -> Bool,
        txn_version -> Int8,
        #[max_length = 66]
        collateral_asset -> Varchar,
    }
}

diesel::table! {
    premarket_orders (order_addr) {
        #[max_length = 66]
        order_addr -> Varchar,
        #[max_length = 66]
        token_addr -> Varchar,
        #[max_length = 66]
        offer_addr -> Varchar,
        #[max_length = 66]
        buyer -> Varchar,
        #[max_length = 66]
        seller -> Varchar,
        amount -> Int8,
        #[max_length = 66]
        created_by -> Varchar,
        ts -> Int8,
        is_settled -> Bool,
        is_claimed -> Bool,
        is_cancelled -> Bool,
        txn_version -> Int8,
    }
}

diesel::table! {
    premarket_tokens (token_addr) {
        #[max_length = 66]
        token_addr -> Varchar,
        name -> Varchar,
        symbol -> Varchar,
        image -> Varchar,
        website -> Nullable<Varchar>,
        twitter -> Nullable<Varchar>,
        telegram -> Nullable<Varchar>,
        settle_duration -> Int8,
        temp_starts_at -> Nullable<Int8>,
        temp_ends_at -> Nullable<Int8>,
        settle_started_at -> Nullable<Int8>,
        status -> Int4,
        #[max_length = 66]
        fa -> Nullable<Varchar>,
        chain_type -> Int4,
        created_at -> Timestamp,
        updated_at -> Timestamp,
        #[max_length = 66]
        cross_chain_address -> Nullable<Varchar>,
        txn_version -> Int8,
    }
}

diesel::table! {
    processor_status (processor) {
        #[max_length = 50]
        processor -> Varchar,
        last_success_version -> Int8,
        last_updated -> Timestamp,
        last_transaction_timestamp -> Nullable<Timestamp>,
    }
}

diesel::joinable!(premarket_offers -> premarket_tokens (token_addr));
diesel::joinable!(premarket_orders -> premarket_offers (offer_addr));
diesel::joinable!(premarket_orders -> premarket_tokens (token_addr));

diesel::allow_tables_to_appear_in_same_query!(
    ledger_infos,
    module_upgrade_history,
    package_upgrade_history,
    premarket_offers,
    premarket_orders,
    premarket_tokens,
    processor_status,
);
