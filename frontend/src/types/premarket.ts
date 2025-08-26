export interface Token {
    token_addr: String
    name: String
    symbol: String
    website?: String
    twitter?: String
    telegram?: String
    settle_duration: BigInt
    temp_starts_at?: Date
    temp_ends_at?: Date
    settle_started_at?: BigInt
    status: number
    fa?: String
    createdAt: Date
    updatedAt: Date
    chain_type:number;
    image:string;
    txn_version:number
}

export interface TokenOffers{
    token_addr:string;
    price:string;
    amount:string;
    is_buy:boolean;
    is_full_match:boolean;
    created_by:string;
    ts:string;
    filled_amount:string;
    is_active:boolean;
    tsx_version:string;
    collateral_asset:string;
}