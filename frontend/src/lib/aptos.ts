
import { NETWORK } from "@/utils/env";
import { Aptos, AptosConfig } from "@aptos-labs/ts-sdk";

export function getTxnOnExplorer(hash: string) {
    return `https://explorer.aptoslabs.com/txn/${hash}?network=${NETWORK}`
}

const aptosClient = new Aptos(
    new AptosConfig({
        network: NETWORK
    })
);

export default aptosClient;