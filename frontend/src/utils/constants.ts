
import { Presentation, Rocket, Coins, Gem } from "lucide-react"
import { RxDashboard } from "react-icons/rx";
export const menuitems = [
    {
        name: "Pre Market",
        url: "/premarket",
        icon: Presentation,
        disabled: false
    },
    {
        name: "Launch Pad",
        url: "/launchpad",
        icon: Rocket,
        disabled: true
    },
    {
        name: "Points",
        url: "/points",
        icon: Coins,
        disabled: true
    },
    {
        name: "Dashboard",
        url: "/dashboard",
        icon: RxDashboard,
        disabled: false

    },
    {
        name: "Rewards",
        url: "/rewards",
        icon: Gem,
        disabled: true
    }
];

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
// Chain icons
export const chainIcons: Record<number, string> = {
    0: "/media/aptos.svg",
    1: "/media/solana.jpg",
    2: "/media/ethereum.jpg",
};


export interface collateralProps {
    name: string;
    symbol: string;
    icon: string;
    address: string;
    usdPrice: number;
    decimals: number;
}
export const collateral_assets: collateralProps[] = [
    {
        name: 'Aptos',
        symbol: 'APT',
        icon: '/media/aptos.png',
        address: '0x000000000000000000000000000000000000000000000000000000000000000a',
        usdPrice: 4.3,
        decimals: 8,
    },
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
        address: '0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832',
        usdPrice: 1,
        decimals: 6
    }
]