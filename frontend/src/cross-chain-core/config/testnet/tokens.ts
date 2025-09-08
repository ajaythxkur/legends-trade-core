import { TokenConfig } from "../types";
import { APTOS_FA } from "@aptos-labs/ts-sdk";

const usdcIcon = "https://pbs.twimg.com/profile_images/1916937910928211968/CKblfanr_400x400.png";
const aptIcon = "https://pbs.twimg.com/profile_images/1556801889282686976/tuHF27-8_400x400.jpg";

export const testnetTokens: Record<string, TokenConfig[]> = {
    Sepolia: [
        {
            symbol: "USDC",
            icon: usdcIcon,
            decimals: 6,
            tokenId: {
                chain: "Sepolia",
                address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
            },
        }
    ],
    Solana: [
        {
            symbol: "USDC",
            tokenId: {
                chain: "Solana",
                address: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
            },
            icon: usdcIcon,
            decimals: 6,
        }
    ],
    Aptos: [
         {
            symbol: "APT",
            decimals: 8,
            tokenId: {
                chain: "Aptos",
                address:
                    APTOS_FA,
            },
            icon: aptIcon,
        },
        {
            symbol: "USDC",
            decimals: 6,
            tokenId: {
                chain: "Aptos",
                address:
                    "0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832",
            },
            icon: usdcIcon,
        },
    ],
};
