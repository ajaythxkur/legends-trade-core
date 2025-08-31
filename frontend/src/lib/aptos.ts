import { network } from "@/utils/env";
import { Aptos, AptosConfig, NetworkToNetworkName } from "@aptos-labs/ts-sdk";

const aptosClient = new Aptos(
    new AptosConfig({
        network: NetworkToNetworkName[network]
    })
);

export default aptosClient