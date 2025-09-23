export interface Token {
    token_addr: string
    name: string
    symbol: string
    website?: string
    twitter?: string
    telegram?: string
    settle_duration: BigInt
    temp_starts_at?: BigInt
    temp_ends_at?: BigInt
    settle_started_at?: BigInt
    status: number
    fa?: string
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
    vol24hChange: number;
    cross_chain_address: string;

    lastPriceUSD: number
    lastPriceCollateral:string
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
    order_addr: string
    token_addr: string
    offer_addr: string
    buyer: string
    seller: string
    amount: BigInt
    created_by: string
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