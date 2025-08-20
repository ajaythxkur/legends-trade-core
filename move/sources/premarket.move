module legends_trade::premarket {
    use std::signer;
    use std::option::{Self, Option};
    use std::string::String;
    use aptos_std::math128;
    use aptos_std::math64;
    use aptos_framework::object::{Self, Object};
    use aptos_framework::fungible_asset::{Self, Metadata, FungibleStore};
    use aptos_framework::timestamp;
    use aptos_framework::primary_fungible_store;
    use aptos_framework::event;
    use legends_trade::chain_type;

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
        chain_type: u64,
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

    #[resource_group_member(group=aptos_framework::object::ObjectGroup)]
    struct Order has key {
        token: Object<Token>,
        collateral: Object<FungibleStore>,
        buyer: address,
        seller: address,
        amount: u64, // need when offer cancelled
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
    #[event]
    struct OfferCreated has drop, store {
        token_addr: address,
        offer_addr: address,
        price: u64,
        amount: u64,
        is_buy: bool,
        is_full_match: bool,
        created_by: address,
        ts: u64
    }
    #[event]
    struct OfferCancelled has drop, store {
        offer_addr: address,
        ts: u64
    }

    #[event]
    struct OrderCreated has drop, store {
        token_addr: address,
        offer_addr: address,
        order_addr: address,
        buyer: address,
        seller: address,
        amount: u64,
        is_offer_filled: bool,
        created_by: address,
        ts: u64
    }

    #[event]
    struct OrderSettled has drop, store {
        order_addr: address,
        ts: u64
    }

    #[event]
    struct OrderClaimed has drop, store {
        order_addr: address,
        ts: u64
    }

    #[event]
    struct OrderCancelled has drop, store {
        order_addr: address,
        ts: u64
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
    /// Not the owner of the offer
    const ERR_NOT_OFFER_OWNER: u64 = 11;
    /// The remaining offer amount is less
    const ERR_INSUFFICIENT_REMAINING_AMOUNT: u64 = 12;
    /// Unexpected zero input amount
    const ERR_ZERO_INPUT: u64 = 13;
    /// Amount must be full matched with offer amount
    const ERR_INSUFFICIENT_FULL_MATCH_AMOUNT: u64 = 14;
    /// Cannot create order on own offer
    const ERR_INVALID_SENDER: u64 = 15;
    /// Not the seller of the order
    const ERR_NOT_SELLER: u64 = 16;
    /// Settle time has ended
    const ERR_SETTLE_TIME_HAS_ENDED: u64 = 17;
    /// Token status is either active or cancelled
    const ERR_TOKEN_STATUS_ACTIVE_OR_CANCELLED: u64 = 18;
    /// Not the buyer of the order
    const ERR_NOT_BUYER: u64 = 19;
    /// This means user is not either buyer or seller of the order
    const ERR_NOT_ORDER_OWNER: u64 = 20;
    /// Token premarket is not cancelled
    const ERR_TOKEN_STATUS_NOT_CANCELLED: u64 = 21;

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

    public fun create_token(owner: &signer, name: String, symbol: String, image: String, website: Option<String>, twitter: Option<String>, telegram: Option<String>, chain_type: u64): Object<Token> acquires Config {
        assert_config_initialized();
        // creator is owner
        let config = borrow_global_mut<Config>(get_config_addr());
        assert!(config.owner == signer::address_of(owner), ERR_NOT_OWNER);
        chain_type::assert_valid_chain_type(chain_type);
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
            chain_type,
            settle_duration: 86400, // 1day
            settle_started_at: option::none(),
            fa: option::none(),
            status: 0, // 0 active, 1 settle phase, 2 ended, 3 cancelled
        };
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
        move_to(token_signer, token);
        object::object_from_constructor_ref(token_constructor_ref)
    }

    public entry fun create_token_entry(owner: &signer, name: String, symbol: String, image: String, website: Option<String>, twitter: Option<String>, telegram: Option<String>, chain_type: u64) acquires Config {
        create_token(owner, name, symbol, image, website, twitter, telegram, chain_type);
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

    public entry fun update_settle_duration(owner: &signer, token: Object<Token>, settle_duration: u64) acquires Config, Token {
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

    public entry fun update_token_status(owner: &signer, token: Object<Token>, status: u64) acquires Config, Token {
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
    public fun create_offer(sender: &signer, token_obj: Object<Token>, price: u64, amount: u64, is_buy: bool, is_full_match: bool, collateral_asset: Object<Metadata>): Object<Offer> acquires Token {
        assert!(price != 0 && amount != 0, ERR_ZERO_INPUT);
        let token_addr = object::object_address(&token_obj);
        let token = borrow_global<Token>(token_addr);
        assert!(token.status == 0, ERR_TOKEN_STATUS_NOT_ACTIVE);
        chain_type::assert_valid_chain_asset(collateral_asset, token.chain_type);
        let offer_constructor_ref = &object::create_object(signer::address_of(sender));
        let offer_signer = &object::generate_signer(offer_constructor_ref);
        // disable transfers of offers for now!! enable when traced in indexer
        let offer_transfer_ref = &object::generate_transfer_ref(offer_constructor_ref);
        object::disable_ungated_transfer(offer_transfer_ref);

        let offer = Offer {
            token: token_obj,
            collateral: create_token_store(offer_signer, collateral_asset),
            price,
            amount,
            is_buy,
            is_full_match,
            filled_amount: 0,
            extend_ref: object::generate_extend_ref(offer_constructor_ref),
            delete_ref: object::generate_delete_ref(offer_constructor_ref),
        };
        // amount is in bps
        let collateral_amount = (price * amount) / BASIS_POINT_MAX;
        let asset = primary_fungible_store::withdraw(sender, collateral_asset, collateral_amount);
        fungible_asset::deposit(offer.collateral, asset);
        move_to(offer_signer, offer);
        event::emit(OfferCreated {
            token_addr,
            offer_addr: object::address_from_constructor_ref(offer_constructor_ref),
            price,
            amount,
            is_buy,
            is_full_match,
            created_by: signer::address_of(sender),
            ts: timestamp::now_seconds()
        });
        object::object_from_constructor_ref<Offer>(offer_constructor_ref)
    }

    fun create_token_store(obj_signer: &signer, token: Object<Metadata>): Object<FungibleStore> {
        let constructor_ref = &object::create_object_from_object(obj_signer);
        fungible_asset::create_store(constructor_ref, token)
    }

    public entry fun create_offer_entry(sender: &signer, token_obj: Object<Token>, price: u64, amount: u64, is_buy: bool, is_full_match: bool, collateral_asset: Object<Metadata>) acquires Token {
        create_offer(sender, token_obj, price, amount, is_buy, is_full_match, collateral_asset);
    }

    /// Can be cancelled any time
    public entry fun cancel_offer_entry(sender: &signer, offer_obj: Object<Offer>) acquires Offer, Config {
        assert_config_initialized();
        assert!(object::is_owner(offer_obj, signer::address_of(sender)), ERR_NOT_OFFER_OWNER);
        let offer_addr = object::object_address(&offer_obj);
        let Offer {
            token: _,
            collateral,
            price: _,
            amount: _,
            is_buy: _,
            is_full_match: _,
            filled_amount: _,
            extend_ref,
            delete_ref,
        } = move_from<Offer>(offer_addr);
        let remaining_collateral = fungible_asset::balance(collateral);
        if(remaining_collateral > 0) {
            let offer_signer = &object::generate_signer_for_extending(&extend_ref);
            let asset = fungible_asset::withdraw(offer_signer, collateral, remaining_collateral);
            let config = borrow_global<Config>(get_config_addr());
            // extract and deposit fee to fee wallet upon cancellation
            let fee_amount = math64::mul_div(remaining_collateral, config.fee_cancel, BASIS_POINT_MAX);
            primary_fungible_store::deposit(config.fee_wallet, fungible_asset::extract(&mut asset, fee_amount));
            primary_fungible_store::deposit(signer::address_of(sender), asset);
        };
        object::delete(delete_ref);
        event::emit(OfferCancelled {
            offer_addr,
            ts: timestamp::now_seconds()
        });
    }

    public fun create_order(sender: &signer, offer_obj: Object<Offer>, amount: u64): Object<Order> acquires Token, Offer {
        assert!(amount != 0, ERR_ZERO_INPUT);
        assert!(!object::is_owner(offer_obj, signer::address_of(sender)), ERR_INVALID_SENDER);
        let offer_addr = object::object_address(&offer_obj);
        let offer = borrow_global_mut<Offer>(offer_addr);
        let remaining_amount = offer.amount - offer.filled_amount;
        assert!(remaining_amount <= amount, ERR_INSUFFICIENT_REMAINING_AMOUNT);
        if(offer.is_full_match) {
            assert!(amount == remaining_amount, ERR_INSUFFICIENT_FULL_MATCH_AMOUNT)
        };
        let token_addr = object::object_address(&offer.token);
        let token = borrow_global<Token>(token_addr);
        assert!(token.status == 0, ERR_TOKEN_STATUS_NOT_ACTIVE);
        
        let order_constructor_ref = &object::create_object(signer::address_of(sender));
        let order_signer = &object::generate_signer(order_constructor_ref);
        // enable transfers when traced in indexer
        let order_transfer_ref = &object::generate_transfer_ref(order_constructor_ref);
        object::disable_ungated_transfer(order_transfer_ref);
        let collateral_asset = fungible_asset::store_metadata(offer.collateral);

        let (buyer, seller) = if(offer.is_buy) {
            (object::owner(offer_obj), signer::address_of(sender))
        } else {
            (signer::address_of(sender), object::owner(offer_obj))
        };
        let order = Order {
            token: offer.token,
            collateral: create_token_store(order_signer, collateral_asset),
            buyer,
            seller,
            amount,
            extend_ref: object::generate_extend_ref(order_constructor_ref),
            delete_ref: object::generate_delete_ref(order_constructor_ref)
        };
        // amount is in bps
        let collateral_amount = (offer.price * amount) / BASIS_POINT_MAX;
        let asset = primary_fungible_store::withdraw(sender, collateral_asset, collateral_amount);
        // withdraw the same amount from offer and merge for order collateral
        let offer_signer = &object::generate_signer_for_extending(&offer.extend_ref);
        fungible_asset::merge(&mut asset, fungible_asset::withdraw(offer_signer, offer.collateral, collateral_amount));
        fungible_asset::deposit(order.collateral, asset);
        offer.filled_amount += amount;
        event::emit(OrderCreated {
            token_addr,
            offer_addr,
            order_addr: object::address_from_constructor_ref(order_constructor_ref),
            buyer,
            seller,
            amount,
            is_offer_filled: offer.filled_amount == offer.amount,
            created_by: signer::address_of(sender),
            ts: timestamp::now_seconds()
        });
        move_to(order_signer, order);
        object::object_from_constructor_ref<Order>(order_constructor_ref)
    }

    public entry fun create_order_entry(sender: &signer, offer_obj: Object<Offer>, amount: u64) acquires Token, Offer {
        create_order(sender, offer_obj, amount);
    }

    public fun settle_order_entry(sender: &signer, order_obj: Object<Order>) acquires Order, Token, Config {
        assert_config_initialized();
        // seller settles the order
        let order_addr = object::object_address(&order_obj);
        let Order {
            token: token_obj,
            collateral,
            buyer,
            seller,
            amount,
            extend_ref,
            delete_ref
        } = move_from<Order>(order_addr);
        assert!(signer::address_of(sender) == seller, ERR_NOT_SELLER);
        let token_addr = object::object_address(&token_obj);
        let token = borrow_global<Token>(token_addr);
        assert!(token.status == 1, ERR_TOKEN_STATUS_NOT_SETTLE);
        assert!(token.settle_started_at.is_some(), ERR_TOKEN_SETTLE_TIME_NOT_SET);
        let ts = timestamp::now_seconds();
        let settle_started_at = token.settle_started_at.destroy_some();
        let settle_ends_at = settle_started_at + token.settle_duration;
        assert!(ts <= settle_ends_at, ERR_SETTLE_TIME_HAS_ENDED);
        assert!(token.fa.is_some(), ERR_TOKEN_ADDRESS_NOT_SET);
        // transfer asset to buyer
        let metadata = token.fa.destroy_some();
        let decimals = fungible_asset::decimals(metadata);
        let amount_to_transfer =(((amount as u128) * math128::pow(10, (decimals as u128))) / (BASIS_POINT_MAX as u128) as u64);
        let asset = primary_fungible_store::withdraw(sender, metadata, amount_to_transfer);
        primary_fungible_store::deposit(buyer, asset);
        // transfer collateral to seller (deduct settle fee)
        let collateral_amount = fungible_asset::balance(collateral);
        let order_signer = &object::generate_signer_for_extending(&extend_ref);
        let collateral_asset = fungible_asset::withdraw(order_signer, collateral, collateral_amount);
        let config = borrow_global<Config>(get_config_addr());
        let fee_amount = math64::mul_div(collateral_amount, config.fee_settle, BASIS_POINT_MAX);
        // deposit fee and collateral
        primary_fungible_store::deposit(
            config.fee_wallet, 
            fungible_asset::extract(&mut collateral_asset, fee_amount)
        );
        primary_fungible_store::deposit(
            seller,
            collateral_asset
        );
        event::emit(OrderSettled {
            order_addr,
            ts
        });
        object::delete(delete_ref);
    }

    public entry fun claim_order_entry(sender: &signer, order_obj: Object<Order>) acquires Order, Token, Config {
        assert_config_initialized();
        // buyer claims the order with all the collateral if seller fails to settle in time
        let order_addr = object::object_address(&order_obj);
        let Order {
            token: token_obj,
            collateral,
            buyer,
            seller:_,
            amount: _,
            extend_ref,
            delete_ref
        } = move_from<Order>(order_addr);
        assert!(signer::address_of(sender) == buyer, ERR_NOT_BUYER);
        let token_addr = object::object_address(&token_obj);
        let token = borrow_global<Token>(token_addr);
        // Claim can be done on settle and ended status of token
        assert!(token.status != 0 && token.status != 3, ERR_TOKEN_STATUS_ACTIVE_OR_CANCELLED);
        assert!(token.settle_started_at.is_some(), ERR_TOKEN_SETTLE_TIME_NOT_SET);
        let ts = timestamp::now_seconds();
        let settle_started_at = token.settle_started_at.destroy_some();
        let settle_ends_at = settle_started_at + token.settle_duration;
        assert!(ts > settle_ends_at, ERR_SETTLE_TIME_HAS_NOT_ENDED);
        // transfer collateral to buyer (deduct settle fee)
        let collateral_amount = fungible_asset::balance(collateral);
        let order_signer = &object::generate_signer_for_extending(&extend_ref);
        let collateral_asset = fungible_asset::withdraw(order_signer, collateral, collateral_amount);
        let config = borrow_global<Config>(get_config_addr());
        let fee_amount = math64::mul_div(collateral_amount, config.fee_settle, BASIS_POINT_MAX);
        // deposit fee and collateral
        primary_fungible_store::deposit(
            config.fee_wallet, 
            fungible_asset::extract(&mut collateral_asset, fee_amount)
        );
        primary_fungible_store::deposit(
            buyer,
            collateral_asset
        );
        event::emit(OrderClaimed {
            order_addr,
            ts
        });
        object::delete(delete_ref);
    }

    // either buyer or seller cancel the order, Only when token is cancelled, status is updated for both
    public entry fun cancel_order(sender: &signer, order_obj: Object<Order>) acquires Order, Token {
        let order_addr = object::object_address(&order_obj);
        let Order {
            token: token_obj,
            collateral,
            buyer,
            seller,
            amount: _,
            extend_ref,
            delete_ref
        } = move_from<Order>(order_addr);
        assert!(signer::address_of(sender) == buyer || signer::address_of(sender) == seller, ERR_NOT_ORDER_OWNER);
        let token_addr = object::object_address(&token_obj);
        let token = borrow_global<Token>(token_addr);
        // Claim can be done on settle and ended status of token
        assert!(token.status == 3, ERR_TOKEN_STATUS_NOT_CANCELLED);
        // transfer collateral to buyer (deduct settle fee)
        let collateral_amount = fungible_asset::balance(collateral);
        let order_signer = &object::generate_signer_for_extending(&extend_ref);
        let collateral_asset = fungible_asset::withdraw(order_signer, collateral, collateral_amount);
        // no fee deduction during token premarket cancellation
        // deposit half of the asset to buyer's wallet
        primary_fungible_store::deposit(
            buyer,
            fungible_asset::extract(&mut collateral_asset, collateral_amount / 2)
        );
        // deposit remaining half of the collateral asset to seller's wallet
        primary_fungible_store::deposit(
            seller,
            collateral_asset
        );
        event::emit(OrderCancelled {
            order_addr,
            ts: timestamp::now_seconds()
        });
        object::delete(delete_ref);
    }
}