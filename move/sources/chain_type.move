module legends_trade::chain_type {
    use aptos_framework::object::{Self, Object};
    use aptos_framework::fungible_asset::Metadata;

    /// Chain type passed by owner is not among the specified chains
    const ERR_INVALID_CHAIN_TYPE: u64 = 0;
    /// Asset specified as collateral asset is not valid
    const ERR_INVALID_ASSET: u64 = 1;

    const APTOS: u64 = 0;
    const SOLANA: u64 = 1;
    const ETHEREUM: u64 = 2;

    const APTOS_FA: address = @0xa;
    const USDC_FA: address = @0x11;
    const USDT_FA: address = @0x12;

    public fun assert_valid_chain_type(type: u64) {
        assert!(type == APTOS || type == SOLANA || type == ETHEREUM, ERR_INVALID_CHAIN_TYPE);
    }

    public fun assert_valid_chain_asset(asset: Object<Metadata>, type: u64) {
        assert_valid_chain_type(type);
        let asset_addr = object::object_address(&asset);
        if(type == 0) {
            assert!(asset_addr == APTOS_FA || asset_addr == USDC_FA || asset_addr == USDT_FA, ERR_INVALID_ASSET);
        } else {
            // only usdc and usdt allowed for solana and ethereum
            assert!(asset_addr == USDC_FA || asset_addr == USDT_FA, ERR_INVALID_ASSET);
        };
    }
}