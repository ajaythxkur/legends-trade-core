export const rewardPoints = [
    {
        title: "Refer a Friend",
        points: 100,
        score: 200
    },
    {
        title: "Complete any buy/sell order",
        points: 5,
        score: 50
    },
    {
        title: "Complete Launch pad presale",
        points: 20,
        score: 100
    }
]

// Dummy data for offer management interface
export const manageOrder = [
    {
        user: '16zW...s15cd5',
        time: '6m',
        filledTxn: '7kY...g23h',
        collateral: 100,
        status: 'Claimed',
        action: 'view'
    },
    {
        user: '16zW...s15cd5',
        time: '6m',
        filledTxn: '7kY...g23h',
        collateral: 100,
        status: 'Pending',
        action: 'claim'
    },
    {
        user: '16zW...s15cd5',
        time: '6m',
        filledTxn: '7kY...g23h',
        collateral: 100,
        status: 'Pending',
        action: 'claim'
    },
    {
        user: '16zW...s15cd5',
        time: '6m',
        filledTxn: '7kY...g23h',
        collateral: 100,
        status: 'Settled',
        action: 'view'
    }
];

export interface collateralProps{
    name:string;
    symbol:string;
    icon:string;
    address:string;
    usdPrice:number;
    decimals:number;
}
export const collateral_assets:collateralProps[] = [
    // {
    //     name: 'Aptos',
    //     symbol: 'APT',
    //     icon: '/media/aptos.png',
    //     address: '0x000000000000000000000000000000000000000000000000000000000000000a',
    //     usdPrice:5,
    //     decimals: 8,
    // },
    // {
    //     name: 'Teather USDT',
    //     symbol: 'USDT',
    //     icon: '/media/usdt.jpg',
    //     address: '0x000000000000000000000000000000000000000000000000000000000000000b',
    //     usdPrice:1,
    //     decimals: 6
    // },
    {
        name: 'Teather USDC',
        symbol: 'USDC',
        icon: '/media/usdc.png',
        address: '0x000000000000000000000000000000000000000000000000000000000000000c',
        usdPrice:1,
        decimals: 6
    }
]