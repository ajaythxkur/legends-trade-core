import dotenv from 'dotenv';
dotenv.config();
import {
    Chain,
    ChainAddress,
    ChainContext,
    Wormhole,
    Network,
    Signer,
} from '@wormhole-foundation/sdk';
import type { SignAndSendSigner } from '@wormhole-foundation/sdk';
// import solana from '@wormhole-foundation/sdk/solana';
import solana from '@wormhole-foundation/sdk/solana';
import aptos from '@wormhole-foundation/sdk/aptos';

/**
 * Returns a signer for the given chain using locally scoped credentials.
 * The required values (EVM_PRIVATE_KEY, SOL_PRIVATE_KEY, SUI_MNEMONIC) must
 * be loaded securely beforehand, for example via a keystore, secrets
 * manager, or environment variables (not recommended).
 */
export async function getSigner<N extends Network, C extends Chain>(
    chain: ChainContext<N, C>
): Promise<{
    chain: ChainContext<N, C>;
    signer: SignAndSendSigner<N, C>;
    address: ChainAddress<C>;
}> {
    let signer: Signer<any, any>;
    const platform = chain.platform.utils()._platform;
    const SolPrivateKey = process.env.SOL_PRIVATE_KEY;
    const AptosPrivateKey = process.env.APTOS_PRIVATE_KEY;

    // Customize the signer by adding or removing platforms as needed. Be sure
    // to import the necessary packages for the platforms you want to support
    switch (platform) {
        case 'Solana':
            signer = await (
                await solana()
            ).getSigner(await chain.getRpc(), SolPrivateKey!);
            break;

        case 'Aptos':
            signer = await (
                await aptos()
            ).getSigner(await chain.getRpc(), AptosPrivateKey!);
            break;
        default:
            throw new Error(`Unsupported platform: ${platform}`);
    }

    const typedSigner = signer as SignAndSendSigner<N, C>;

    return {
        chain,
        signer: typedSigner,
        address: Wormhole.chainAddress(chain.chain, signer.address()),
    };
}