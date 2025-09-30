import { Network, NetworkToNetworkName } from "@aptos-labs/ts-sdk";

export const NETWORK = NetworkToNetworkName[process.env.NETWORK as string] === Network.MAINNET ? Network.MAINNET : Network.TESTNET;
export const backendUrl = process.env.BACKEND_URL as string;
export const moduleAddress = process.env.MODULE_ADDRESS as string;
export const FEE_PAYER_ACCOUNT_PRIVATE_KEY = process.env.FEE_PAYER_ACCOUNT_PRIVATE_KEY as string;
export const APTOS_API_KEY_TESNET = process.env.APTOS_API_KEY_TESNET as string;
export const APTOS_API_KEY_DEVNET = process.env.APTOS_API_KEY_DEVNET as string;
export const SOL_PRIVATE_KEY = process.env.SOL_PRIVATE_KEY as string;
