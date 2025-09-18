import {
    Chain,
    ChainAddress,
    ChainContext,
    Wormhole,
    Network,
    isTokenId,
} from "@wormhole-foundation/sdk";
import type { SignAndSendSigner, TokenId, UnsignedTransaction } from "@wormhole-foundation/sdk";
import { PublicKey, Transaction } from "@solana/web3.js";


/**
 * Get a signer for Solana (Phantom) or Aptos (Petra/Martian).
 */
export async function getSigner<N extends Network, C extends Chain>(
    chain: ChainContext<N, C>
): Promise<{
    chain: ChainContext<N, C>;
    signer: SignAndSendSigner<N, C>;
    address: ChainAddress<C>;
}> {
    const platform = chain.platform.utils()._platform;

    let signer: SignAndSendSigner<N, C>;
    let address: string;

    switch (platform) {
        case "Solana": {
            const solana = (window as any).solana;
            if (!solana?.isPhantom) {
                throw new Error("Phantom wallet not found");
            }

            // Connect Phantom if not already connected
            await solana.connect();
            const pubKey: PublicKey = solana.publicKey;
            signer = {
                chain: () => chain.chain,
                address: () => pubKey.toBase58(),
                signAndSend: async (txs: UnsignedTransaction<N, C>[]) => {
                    const results: string[] = [];
                    for (const tx of txs) {
                        // Wormhole sometimes gives { transaction: Transaction }
                        const solTx: Transaction =
                            (tx as any).transaction instanceof Transaction
                                ? (tx as any).transaction
                                : new Transaction(tx as any); // force wrap

                        const { signature } = await solana.signAndSendTransaction(solTx);
                        results.push(signature);
                    }

                    return results;
                },
            } as unknown as SignAndSendSigner<N, C>;

            address = pubKey.toBase58();
            break;
        }

        case "Aptos": {
            // Import and use a wallet adapter instead of window.aptos

            const walletAdapter = (window as any).aptosWalletAdapter;
            if (!walletAdapter) throw new Error("No Aptos wallet adapter found");
            await walletAdapter.connect();

            const account = walletAdapter.account || walletAdapter.accounts?.[0];
            if (!account) throw new Error("Failed to get Aptos account from adapter");

            // Connect wallet
            await walletAdapter.connect();
            // const account = walletAdapter.account;

            signer = {
                chain: () => chain.chain,
                address: () => account.address,
                signAndSend: async (txn: any) => {
                    const response = await walletAdapter.signAndSubmitTransaction(txn);
                    return [response.hash];
                },
            } as SignAndSendSigner<N, C>;

            address = account.address;
            break;
        }

        default:
            throw new Error(`Unsupported platform: ${platform}`);
    }

    return {
        chain,
        signer,
        address: Wormhole.chainAddress(chain.chain, address),
    };
}




// // import dotenv from 'dotenv';
// // dotenv.config();

// import {
//     Chain,
//     ChainAddress,
//     ChainContext,
//     isTokenId,
//     Wormhole,
//     Network,
//     Signer,
//     TokenId,
// } from '@wormhole-foundation/sdk';
// import type { SignAndSendSigner } from '@wormhole-foundation/sdk';
// import solana from '@wormhole-foundation/sdk/solana';
// import aptos from '@wormhole-foundation/sdk/aptos';

// /**
//  * Returns a signer for the given chain using locally scoped credentials.
//  * The required values (EVM_PRIVATE_KEY, SOL_PRIVATE_KEY, SUI_MNEMONIC) must
//  * be loaded securely beforehand, for example via a keystore, secrets
//  * manager, or environment variables (not recommended).
//  */
// export async function getSigner<N extends Network, C extends Chain>(
//     chain: ChainContext<N, C>,
//     gasLimit?: bigint
// ): Promise<{
//     chain: ChainContext<N, C>;
//     signer: SignAndSendSigner<N, C>;
//     address: ChainAddress<C>;
// }> {
//     let signer: Signer<any, any>;
//     const platform = chain.platform.utils()._platform;
//     const SolPrivateKey = process.env.SOL_PRIVATE_KEY;
//     const AptosPrivateKey = process.env.APTOS_PRIVATE_KEY;

//     // Customize the signer by adding or removing platforms as needed
//     // Be sure to import the necessary packages for the platforms you want to support
//     switch (platform) {
//         case 'Solana':
//             signer = await (
//                 await solana()
//             ).getSigner(await chain.getRpc(), SolPrivateKey!);
//             break;
//         case 'Aptos':
//             signer = await (
//                 await aptos()
//             ).getSigner(await chain.getRpc(), AptosPrivateKey!);
//             break;
//         default:
//             throw new Error(`Unsupported platform: ${platform}`);
//     }

//     const typedSigner = signer as SignAndSendSigner<N, C>;

//     return {
//         chain,
//         signer: typedSigner,
//         address: Wormhole.chainAddress(chain.chain, signer.address()),
//     };
// }

/**
 * Get the number of decimals for the token on the source chain.
 * This helps convert a user-friendly amount (e.g., '1') into raw units.
 */
export async function getTokenDecimals<N extends Network>(
    wh: Wormhole<N>,
    token: TokenId,
    chain: ChainContext<N, any>
): Promise<number> {
    return isTokenId(token)
        ? Number(await wh.getDecimals(token.chain, token.address))
        : chain.config.nativeTokenDecimals;
}