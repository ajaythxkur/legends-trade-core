import { wormhole, Wormhole, TokenId, ChainAddress } from '@wormhole-foundation/sdk';
import aptos from '@wormhole-foundation/sdk/aptos';
import solana from '@wormhole-foundation/sdk/solana';
import { getSigner, getTokenDecimals } from './helpers';

async function transferTokens() {
    // Initialize wh instance
    const wh = await wormhole('Testnet', [solana, aptos]);
    // Define sourceChain and destinationChain, get chain contexts
    const sourceChain = wh.getChain('Solana');
    const destinationChain = wh.getChain('Aptos');
    // Load signers for both chains
    const sourceSigner = await getSigner(sourceChain);
    const destinationSigner = await getSigner(destinationChain);

    // Define token and amount to transfer
    const tokenId: TokenId = Wormhole.tokenId(
        sourceChain.chain,
        // 'INSERT_TOKEN_CONTRACT_ADDRESS'
        // '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'
        '3H75WaXd2RVJpU3AdPQEKB1j7KZ7y16rcJ3MKLjck9ao' //trump
    );
    // Replace with amount you want to transfer
    // This is a human-readable number, e.g., 0.2 for 0.2 tokens
    //   const amount = INSERT_AMOUNT;
    const amount = 10;
    // Convert to raw units based on token decimals
    const decimals = await getTokenDecimals(wh, tokenId, sourceChain);
    const transferAmount = BigInt(Math.floor(amount * 10 ** decimals));

    // Check if the token is registered with destinationChain WTT (Token Bridge) contract
    // Registered = returns the wrapped token ID, continues with transfer
    // Not registered = runs the attestation flow to register the token
    let wrappedToken: TokenId;
    try {
        wrappedToken = await wh.getWrappedAsset(destinationChain.chain, tokenId);
        console.log(
            '✅ Token already registered on destination:',
            wrappedToken.address
        );
    } catch (e) {
        console.log(
            '⚠️ Token is NOT registered on destination. Attestation required before transfer can proceed...'
        );
    }
    // Insert Initiate Transfer on Source Chain code

    // Manual------------
    // Build the token transfer object
    const xfer = await wh.tokenTransfer(
        tokenId,
        transferAmount,
        sourceSigner.address,
        destinationSigner.address,
        'TokenBridge',
        undefined // no payload
    );
    console.log('🚀 Built transfer object:', xfer.transfer);

    // Initiate, sign, and send the token transfer
    const srcTxs = await xfer.initiateTransfer(sourceSigner.signer);
    console.log('🔗 Source chain tx sent:', srcTxs);

    // For manual transfers, wait for VAA
    console.log('⏳ Waiting for attestation (VAA) for manual transfer...');
    const timeout = 10 * 60 * 1000; // 10 minutes timeout
    const attIds = await xfer.fetchAttestation(timeout);
    console.log('✅ Got attestation ID(s):', attIds);

    // Complete the manual transfer on the destination chain
    console.log('↪️ Redeeming transfer on destination...');
    const destTxs = await xfer.completeTransfer(destinationSigner.signer);
    console.log('🎉 Destination tx(s) submitted:', destTxs);

    //Automatic--------------
    // // Optional native gas amount for automatic transfers only
    // const nativeGasAmount = '0.001'; // 0.001 of native gas in human-readable format
    // // Get the decimals for the source chain
    // const nativeGasDecimals = destinationChain.config.nativeTokenDecimals;
    // // Convert to raw units, otherwise set to 0n
    // const nativeGas = BigInt(Number(nativeGasAmount) * 10 ** nativeGasDecimals);

    // // Build the token transfer object
    // const xfer = await wh.tokenTransfer(
    //     tokenId,
    //     transferAmount,
    //     sourceSigner.address,
    //     destinationSigner.address,
    //     'AutomaticTokenBridge',
    //     nativeGas
    // );
    // console.log('🚀 Built transfer object:', xfer.transfer);

    // // Initiate, sign, and send the token transfer
    // const srcTxs = await xfer.initiateTransfer(sourceSigner.signer);
    // console.log('🔗 Source chain tx sent:', srcTxs);

    // // If automatic, no further action is required. The relayer completes the transfer.
    // console.log('✅ Automatic transfer: relayer is handling redemption.');

    // process.exit(0);
}

transferTokens().catch((e) => {
    console.error('❌ Error in transferTokens', e);
    process.exit(1);
});




// ajaykumar@Ajays-MacBook-Air attest-token % npx tsx transfer.ts
// [dotenv@17.2.2] injecting env (2) from .env -- tip: ⚙️  suppress all logs with { quiet: true }
// (node:54551) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
// (Use `node --trace-deprecation ...` to show where the warning was created)
// ✅ Token already registered on destination: AptosAddress {
//   type: 'Native',
//   address: Uint8Array(32) [
//      19, 137, 164, 219,  97, 205,  64,
//      52, 144, 150, 149, 200, 128, 129,
//      91, 137, 224, 104, 145, 172, 101,
//     190,  65,  91,  59,  50,  52, 160,
//     120, 155, 133, 223
//   ],
//   module: 'coin::T'
// }
// 🚀 Built transfer object: {
//   token: {
//     chain: 'Solana',
//     address: SolanaAddress {
//       type: 'Native',
//       address: [PublicKey [PublicKey(4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU)]]
//     }
//   },
//   amount: 100000n,
//   from: {
//     chain: 'Solana',
//     address: SolanaAddress {
//       type: 'Native',
//       address: [PublicKey [PublicKey(48tHJrtsDAonHv4b6uc8tzgNuuCbuqYgZjQydd4uvgNo)]]
//     }
//   },
//   to: {
//     chain: 'Aptos',
//     address: AptosAddress {
//       type: 'Native',
//       address: [Uint8Array],
//       module: undefined
//     }
//   },
//   protocol: 'TokenBridge',
//   payload: undefined
// }
// 🔗 Source chain tx sent: [
//   '4rNugXUjefG6LXS1mueSTXRKUH5mRC2ei9xUFcQruupef5d7XV1GeuBSZnurzWjz7Pbfr5YtNnLvEt5zwtKAHga9'
// ]
// ⏳ Waiting for attestation (VAA) for manual transfer...
// Retrying Wormholescan:GetVaaBytes, attempt 0/300 
// Retrying Wormholescan:GetVaaBytes, attempt 1/300 
// Retrying Wormholescan:GetVaaBytes, attempt 2/300 
// ✅ Got attestation ID(s): [
//   {
//     chain: 'Solana',
//     emitter: UniversalAddress { address: [Uint8Array] },
//     sequence: 38306n
//   }
// ]
// ↪️ Redeeming transfer on destination...
// 🎉 Destination tx(s) submitted: [
//   '0x4bf78f2d06a1e0f650c711e36fd0c7eec03e6653c609b49242dbfcb2f320680d'
// ]