export interface Token {
    token_addr: String
    name: String
    symbol: String
    website?: String
    twitter?: String
    telegram?: String
    settle_duration: BigInt
    // temp_starts_at?: Date
    // temp_ends_at?: Date
    temp_starts_at?: BigInt
    temp_ends_at?: BigInt
    settle_started_at?: BigInt
    status: number
    fa?: String
    createdAt: Date
    updatedAt: Date
    chain_type: number;
    image: string;
    txn_version: number;
    totalOffers: number;
    totalOrders: number;
    lastPrice: number;
    volAll: number;
    vol24h: number;
    priceChange: number;
    cross_chain_address: string;
    lastPriceUSD:number
}

export interface TokenOffers {
    offer_addr: string;
    token_addr: string;
    price: BigInt;
    amount: BigInt;
    is_buy: boolean;
    is_full_match: boolean;
    created_by: string;
    ts: BigInt;
    filled_amount: BigInt;
    is_active: boolean;
    tsx_version: string;
    collateral_asset: string;
    is_creator: boolean
    orders: TokenOrder[];
}


export interface TokenOrder {
    order_addr: String
    token_addr: String
    offer_addr: String
    buyer: String
    seller: String
    amount: BigInt
    created_by: String
    ts: BigInt
    is_settled: Boolean
    is_claimed: Boolean
    is_cancelled: Boolean
}

export interface UserData {
    total_orders: number;
    total_offers: number;
    settled_orders: number,
    unsettled_orders: number
}




// export interface TokenOffers{
//     offer_addr:string;
//     token_addr:string;
//     price:string;
//     amount:string;
//     is_buy:boolean;
//     is_full_match:boolean;
//     created_by:string;
//     ts:string;
//     filled_amount:string;
//     is_active:boolean;
//     tsx_version:string;
//     collateral_asset:string;
// }