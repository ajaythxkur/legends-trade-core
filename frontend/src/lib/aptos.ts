
import { network } from "@/utils/env";
import { Aptos, AptosConfig, NetworkToNetworkName } from "@aptos-labs/ts-sdk";

export function getTxnOnExplorer(hash: string) {
    return `https://explorer.aptoslabs.com/txn/${hash}?network=${network}`
}

const aptosClient = new Aptos(
    new AptosConfig({
        network: NetworkToNetworkName[network]
    })
);

export default aptosClient