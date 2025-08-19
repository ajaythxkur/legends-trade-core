module legends_trade::premarket {
    use std::signer;
    use std::option::{Self, Option};
    use std::string::{Self, String};
    use aptos_framework::object::{Self, Object};
    use aptos_framework::fungible_asset::{Self, Metadata, FungibleStore};
    use aptos_framework::timestamp;

    struct Config has key {
        owner: address,
        pending_owner: address,
        fee_wallet: address,
        fee_settle: u64,
        fee_cancel: u64,
        extend_ref: object::ExtendRef,
    }

    #[resource_group_member(group=aptos_framework::object::ObjectGroup)]
    struct Token has key {
        name: String,
        symbol: String,
        image: String,
        website: Option<String>,
        twitter: Option<String>,
        telegram: Option<String>,
        settle_duration: u64,
        settle_started_at: Option<u64>,
        fa: Option<Object<Metadata>>,
        status: u64,
    }

    #[resource_group_member(group=aptos_framework::object::ObjectGroup)]
    struct Offer has key {
        token: Object<Token>,
        collateral: Object<FungibleStore>,
        price: u64,
        amount: u64,
        is_buy: bool,
        is_full_match: bool,
        filled_amount: u64,
        extend_ref: object::ExtendRef,
        delete_ref: object::DeleteRef,
    }

    #[event]
    struct TokenCreated has drop, store {
        token_addr: address,
        name: String,
        symbol: String,
        image: String,
        website: Option<String>,
        twitter: Option<String>,
        telegram: Option<String>,
        settle_duration: u64,
    }

    #[event]
    struct TokenSettleDurationUpdated has drop, store {
        token_addr: address,
        settle_duration: u64,
    }

    #[event]
    struct TokenStatusUpdated has drop, store {
        token_addr: address,
        settle_started_at: u64,
        status: u64
    }

    #[event]
    struct TokenFaUpdated has drop, store {
        token_addr: address,
        fa: address,
    }

    /// Not the owner.
    const ERR_NOT_OWNER: u64 = 0;
    /// Fee exceeds max bps
    const ERR_FEE_TOO_HIGH: u64 = 1;
    /// Not initialized
    const ERR_NOT_INITIALIZED: u64 = 2;
    /// Not pending owner in Config
    const ERR_NOT_PENDING_OWNER: u64 = 3;
    /// Token status is not active i.e. 0
    const ERR_TOKEN_STATUS_NOT_ACTIVE: u64 = 4;
    /// Token status not settle i.e 1
    const ERR_TOKEN_STATUS_NOT_SETTLE: u64 = 5;
    /// Settle duration must be greater than 1 day
    const ERR_SETTLE_DURATION_TOO_LOW: u64 = 6;
    /// Token address is not set
    const ERR_TOKEN_ADDRESS_NOT_SET: u64 = 7;
    /// Token settle started time is not set 
    const ERR_TOKEN_SETTLE_TIME_NOT_SET: u64 = 8;
    /// Settle time has not ended yet
    const ERR_SETTLE_TIME_HAS_NOT_ENDED: u64 = 9;
    /// Token status passed is invalid
    const ERR_INVALID_TOKEN_STATUS: u64 = 10;

    const SEED: vector<u8> = b"premarket";
    const BASIS_POINT_MAX: u64 = 10000;

    // This function is only called once
    public entry fun initialize(owner: &signer, fee_wallet: address, fee_settle: u64, fee_cancel: u64) {
        assert!(signer::address_of(owner) == @owner, ERR_NOT_OWNER);
        assert!(fee_settle < BASIS_POINT_MAX && fee_cancel < BASIS_POINT_MAX, ERR_FEE_TOO_HIGH);
        let config_constructor_ref = &object::create_named_object(owner, SEED);
        let config_signer = &object::generate_signer(config_constructor_ref);
        move_to(config_signer, Config {
            owner: @owner,
            pending_owner: @0x0,
            fee_wallet,
            fee_settle,
            fee_cancel,
            extend_ref: object::generate_extend_ref(config_constructor_ref)
        });
    }

    fun get_config_addr(): address {
        object::create_object_address(&@owner, SEED)
    }

    inline fun get_config_signer(): signer {
        let config_addr = get_config_addr();
        assert!(exists<Config>(config_addr), ERR_NOT_INITIALIZED);
        object::generate_signer_for_extending(
            &borrow_global<Config>(config_addr).extend_ref
        )
    }

    #[view]
    public fun get_config(): (address, address, address, u64, u64) acquires Config {
        let config_addr = get_config_addr();
        assert!(exists<Config>(config_addr), ERR_NOT_INITIALIZED);
        let config = borrow_global<Config>(config_addr);
        (config.owner, config.pending_owner, config.fee_wallet, config.fee_settle, config.fee_cancel)
    }

    // This function is called by the owner to set the new pending owner
    public entry fun update_owner(owner: &signer, pending_owner: address) acquires Config {
        assert_config_initialized();
        let config = borrow_global_mut<Config>(get_config_addr());
        assert!(config.owner == signer::address_of(owner), ERR_NOT_OWNER);
        config.pending_owner = pending_owner;
    }

    fun assert_config_initialized() {
        assert!(exists<Config>(get_config_addr()), ERR_NOT_INITIALIZED);
    }

    public entry fun accept_owner(account: &signer) acquires Config {
        assert_config_initialized();
        let config = borrow_global_mut<Config>(get_config_addr());
        assert!(config.pending_owner == signer::address_of(account), ERR_NOT_PENDING_OWNER);
        config.owner = config.pending_owner;
        config.pending_owner = @0x0;
    }

    public entry fun update_fee_wallet(owner: &signer, fee_wallet: address) acquires Config {
        assert_config_initialized();
        let config = borrow_global_mut<Config>(get_config_addr());
        assert!(config.owner == signer::address_of(owner), ERR_NOT_OWNER);
        config.fee_wallet = fee_wallet;
    }

    public entry fun update_fee_settle(owner: &signer, fee_settle: u64) acquires Config {
        assert_config_initialized();
        assert!(fee_settle < BASIS_POINT_MAX, ERR_FEE_TOO_HIGH);
        let config = borrow_global_mut<Config>(get_config_addr());
        assert!(config.owner == signer::address_of(owner), ERR_NOT_OWNER);
        config.fee_settle = fee_settle;
    }

    public entry fun update_fee_cancel(owner: &signer, fee_cancel: u64) acquires Config {
        assert_config_initialized();
        assert!(fee_cancel < BASIS_POINT_MAX, ERR_FEE_TOO_HIGH);
        let config = borrow_global_mut<Config>(get_config_addr());
        assert!(config.owner == signer::address_of(owner), ERR_NOT_OWNER);
        config.fee_cancel = fee_cancel;
    }

    public fun create_token(owner: &signer, name: String, symbol: String, image: String, website: Option<String>, twitter: Option<String>, telegram: Option<String>): Object<Token> acquires Config {
        assert_config_initialized();
        // creator is owner
        let config = borrow_global_mut<Config>(get_config_addr());
        assert!(config.owner == signer::address_of(owner), ERR_NOT_OWNER);
        // token creation
        let token_constructor_ref = &object::create_object(signer::address_of(owner));
        let token_signer = &object::generate_signer(token_constructor_ref);
        let token = Token {
            name,
            symbol,
            image,
            website,
            twitter,
            telegram,
            settle_duration: 86400, // 1day
            settle_started_at: option::none(),
            fa: option::none(),
            status: 0, // 0 active, 1 settle phase, 2 ended, 3 cancelled
        };
        move_to(token_signer, token);
        event::emit(TokenCreated {
            token_addr: object::address_from_constructor_ref(token_constructor_ref),
            name,
            symbol,
            image,
            website,
            twitter,
            telegram,
            settle_duration: token.settle_duration,
        });
        object::object_from_constructor_ref(token_constructor_ref)
    }

    public entry fun create_token_entry(owner: &signer, name: String, symbol: String, image: String, website: Option<String>, twitter: Option<String>, telegram: Option<String>) acquires Config {
        create_token(owner, name, symbol, image, website, twitter, telegram);
    }

    public entry fun update_fa(owner: &signer, token: Object<Token>, fa: Object<Metadata>) acquires Config, Token {
        let config = borrow_global_mut<Config>(get_config_addr());
        assert!(config.owner == signer::address_of(owner), ERR_NOT_OWNER);
        let token_addr = object::object_address(&token);
        let token = borrow_global_mut<Token>(token_addr);
        assert!(token.status == 0, ERR_TOKEN_STATUS_NOT_ACTIVE);
        token.fa = option::some(fa);
        event::emit(TokenFaUpdated {
            token_addr,
            fa: object::object_address(&fa),
        });
    }

    public entry fun update_settle_duration(owner: &signer, token: Object<Token>, settle_duration: u64) {
        let config = borrow_global_mut<Config>(get_config_addr());
        assert!(config.owner == signer::address_of(owner), ERR_NOT_OWNER);
        assert!(settle_duration >= 86400, ERR_SETTLE_DURATION_TOO_LOW);
        let token_addr = object::object_address(&token);
        let token = borrow_global_mut<Token>(token_addr);
        assert!(token.status == 0, ERR_TOKEN_STATUS_NOT_ACTIVE);
        token.settle_duration = settle_duration;
        event::emit(TokenSettleDurationUpdated {
            token_addr,
            settle_duration,
        });
    }

    public entry fun update_token_status(owner: &signer, token: Object<Token>, status: u64) {
        let config = borrow_global_mut<Config>(get_config_addr());
        assert!(config.owner == signer::address_of(owner), ERR_NOT_OWNER);
        let token_addr = object::object_address(&token);
        let token = borrow_global_mut<Token>(token_addr);
        let ts = timestamp::now_seconds();
        if(status == 1) {
            // Token is being sent to settle phase
            assert!(token.status == 0, ERR_TOKEN_STATUS_NOT_ACTIVE);
            assert!(token.fa.is_some(), ERR_TOKEN_ADDRESS_NOT_SET);
            token.settle_started_at = option::some(ts);
            token.status = 1;
            event::emit(TokenStatusUpdated {
                token_addr,
                settle_started_at: ts,
                status: 1
            });
        } else if(status == 2) {
            // Token is being sent to ended phase from settle phase
            assert!(token.status == 1, ERR_TOKEN_STATUS_NOT_SETTLE);
            assert!(token.settle_started_at.is_some(), ERR_TOKEN_SETTLE_TIME_NOT_SET);
            let settle_started_at = token.settle_started_at.destroy_some();
            let settle_ends_at = settle_started_at + token.settle_duration;
            assert!(ts > settle_ends_at, ERR_SETTLE_TIME_HAS_NOT_ENDED);
            event::emit(TokenStatusUpdated {
                token_addr,
                settle_started_at,
                status: 2
            });
        } else if(status == 3) {
            // Token premarket is being cancelled
            assert!(token.status == 0, ERR_TOKEN_STATUS_NOT_ACTIVE);
            token.status = 3;
            event::emit(TokenStatusUpdated {
                token_addr,
                settle_started_at: 0,
                status: 3
            });
        } else {
            abort ERR_INVALID_TOKEN_STATUS
        };
    }

    // User Interaction
    // public fun create_offer(sender: &signer, token: Object<Token>, )
}