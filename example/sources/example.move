module example::example {
    use std::signer;
    use aptos_framework::object::{Self, Object};
    use aptos_framework::fungible_asset::{Self, FungibleStore, Metadata};
    use aptos_framework::dispatchable_fungible_asset;
    use aptos_framework::primary_fungible_store;

    #[resource_group_member(group=aptos_framework::object::ObjectGroup)]
    struct Store has key {
        fa_store: Object<FungibleStore>,
        extend_ref: object::ExtendRef
    }

    public entry fun store_bridged_asset(
        acc: &signer,
        metadata: Object<Metadata>,
        amount: u64
    ) {
        let store = primary_fungible_store::ensure_primary_store_exists(
            signer::address_of(acc),
            metadata
        );
        let fa = dispatchable_fungible_asset::withdraw(acc, store, amount);
        let constructor_ref = &object::create_named_object(acc, b"named");
        let obj_signer = &object::generate_signer(constructor_ref);
        let fa_store = fungible_asset::create_store(constructor_ref, metadata);
        dispatchable_fungible_asset::deposit(fa_store, fa);
        move_to(obj_signer, Store {
            fa_store,
            extend_ref: object::generate_extend_ref(constructor_ref)
        })
    }
}