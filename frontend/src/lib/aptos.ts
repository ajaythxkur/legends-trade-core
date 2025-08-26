import { Aptos, AptosConfig, NetworkToNetworkName } from "@aptos-labs/ts-sdk";

const aptosClient = new Aptos(
    new AptosConfig({
        network: NetworkToNetworkName["testnet"]
    })
);

export default aptosClient