// This module is helper to fa & dispatchable fa withdraw/deposit
module legends_trade::fa_helper {
    use aptos_framework::object::Object;
    use aptos_framework::fungible_asset::{Self, FungibleAsset, FungibleStore};
    use aptos_framework::dispatchable_fungible_asset;
    use aptos_framework::primary_fungible_store;

    friend legends_trade::premarket;
    
    public(friend) fun withdraw(
        owner: &signer,
        store: Object<FungibleStore>,
        amount: u64
    ): FungibleAsset {
        if(fungible_asset::is_store_dispatchable(store)) {
            dispatchable_fungible_asset::withdraw(owner, store, amount)
        } else {
            let metadata = fungible_asset::store_metadata(store);
            primary_fungible_store::withdraw(owner, metadata, amount)
        }
    }

    public(friend) fun deposit(
        store: Object<FungibleStore>,
        fa: FungibleAsset
    ) {
        if(fungible_asset::is_store_dispatchable(store)) {
            dispatchable_fungible_asset::deposit(store, fa);
        } else {
            fungible_asset::deposit(store, fa);
        }
    }
}