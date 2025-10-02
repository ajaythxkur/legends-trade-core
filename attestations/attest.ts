import {
    wormhole,
    Wormhole,
    TokenId,
    TokenAddress,
} from '@wormhole-foundation/sdk';
import { chain, signSendWait, toNative } from '@wormhole-foundation/sdk-connect';
import solana from '@wormhole-foundation/sdk/solana';
import aptos from '@wormhole-foundation/sdk/aptos';
import { getSigner } from './helper';

async function attestToken() {
    // Initialize wormhole instance with Solana + Aptos
    const wh = await wormhole('Testnet', [solana, aptos]);
    const sourceChain = wh.getChain('Solana');
    const destinationChain = wh.getChain('Aptos');

    console.log(sourceChain.config.rpc);
    console.log(destinationChain.config.rpc);

    // Define the token you want to attest (Solana mint address)
    const tokenId: TokenId = Wormhole.tokenId(
        sourceChain.chain,
        'DQxAbjHwsWD1cWsTmxuJiEGna3kBhjpiPJTNXDNkBsbW' 
    );

    // console.log(tokenId)

    let wrappedToken: TokenId;
    try {
        wrappedToken = await wh.getWrappedAsset(destinationChain.chain, tokenId);
        console.log(
            '✅ Token already registered on destination:',
            wrappedToken.address.toString()
        );
    } catch (e) {
        console.log(
            '⚠️ Token is NOT registered on destination. Running attestation flow...'
        );

        // // Retrieve the WTT (Token Bridge) contract text for the source chain
        // const tb = await sourceChain.getTokenBridge();
        // // Get the signer for the source chain
        // const sourceSigner = await getSigner(sourceChain);
        // // Define the token to attest and a payer address
        // const token: TokenAddress<typeof sourceChain.chain> = toNative(
        //     sourceChain.chain,
        //     tokenId.address.toString()
        // );
        // const payer = toNative(sourceChain.chain, sourceSigner.signer.address());
        // // Create a new attestation and sign and send the transaction
        // for await (const tx of tb.createAttestation(token, payer)) {
        //     const txids = await signSendWait(
        //         sourceChain,
        //         tb.createAttestation(token, payer),
        //         sourceSigner.signer
        //     );
        //     // Attestation on the destination chain flow code
        //     console.log('✅ Attestation transaction sent:', txids);
        // }

        const tb = await sourceChain.getTokenBridge();
        const sourceSigner = await getSigner(sourceChain);
        const destinationSigner = await getSigner(destinationChain);

        const token: TokenAddress<typeof sourceChain.chain> = toNative(
            sourceChain.chain,
            tokenId.address.toString()
        );
        console.log("🎯 Source Address:", sourceSigner.signer.address().toString())
        console.log("🎯 Destination address:", destinationSigner.signer.address().toString())
        console.log("🎯 Token mint:", tokenId.address.toString());
        const payerSol = toNative(
            sourceChain.chain,
            sourceSigner.signer.address()   // Solana address
        );

        // Create attestation on Solana
        console.log('Createing transaction........');
        for await (const tx of tb.createAttestation(token, payerSol)) {
            const txids = await signSendWait(
                sourceChain,
                tb.createAttestation(token, payerSol),
                sourceSigner.signer
            );
            console.log('✅ Attestation transaction sent:', txids);

            // Extract Wormhole messages
            const messages = await sourceChain.parseTransaction(txids[0].txid);
            console.log('✅ Attestation messages:', messages);

            // Wait for VAA
            const timeout = 25 * 60 * 1000;
            const vaa = await wh.getVaa(
                messages[0]!,
                'TokenBridge:AttestMeta',
                timeout
            );
            if (!vaa) throw new Error('❌ VAA not found before timeout.');

            // Submit attestation on Aptos
            const destTb = await destinationChain.getTokenBridge();
            // const destinationSigner = await getSigner(destinationChain);

            const payerAptos = toNative(
                destinationChain.chain,
                destinationSigner.signer.address()
            );
            const destTxids = await signSendWait(
                destinationChain,
                destTb.submitAttestation(vaa, payerAptos),
                destinationSigner.signer
            );
            console.log('✅ Attestation submitted on Aptos:', destTxids);
        }

        // Poll until wrapped token is registered on Aptos
        const maxAttempts = 50;
        const interval = 6000;
        let attempt = 0;
        let registered = false;

        while (attempt < maxAttempts && !registered) {
            attempt++;
            try {
                const wrapped = await wh.getWrappedAsset(
                    destinationChain.chain,
                    tokenId
                );

                console.log(
                    `✅ Wrapped token is now available on ${destinationChain.chain}:`,
                    wrapped.address.toString()
                );
                registered = true;
            } catch {
                console.log(
                    `⏳ Waiting for wrapped token to register on ${destinationChain.chain}...`
                );
                await new Promise((res) => setTimeout(res, interval));
            }
        }

        if (!registered) {
            throw new Error(
                `❌ Token attestation did not complete in time on ${destinationChain.chain}`
            );
        }
        console.log(
            `🚀 Token attestation complete! Token registered with ${destinationChain.chain}.`
        );
    }
}

attestToken().catch((e) => {
    console.error('❌ Error in attestToken', e);
    process.exit(1);
});



// 1st try---
// ✅ Attestation transaction sent: [
//   {
//     chain: 'Solana',
//     txid: '2hQenFCbSwNdP3jt3orVQPqiUzbQCQKhjLTyMYW7k9tkAam8BdQkCfKmjaRpPj79vHR7gE2hXQFcFvV6zfoaLQA1'
//   }
// ]

//2nd try---
// ✅ Attestation transaction sent: [
//   {
//     chain: 'Solana',
//     txid: '3TrgMVsmFEtKyDBbHumPwQas1TtRj6cuuJiRYXSGs8o6j8BiXt8oXPFRbetznutnmUn3SGxXqmTXzf4i5n6QXcCY'
//   }

// 3rd full attempt---
// ✅ Attestation transaction sent: [
//   {
//     chain: 'Solana',
//     txid: '4m3o85hmDAh3bZSzzbjavFsQMoxdPPsLpvpcZBkUKvTvhi8mim22NRStZ8dXVVkShRSuxnfwc1ZgZe3QqTxRKvQi'
//   }
// ]
// ✅ Attestation messages: [
//   {
//     chain: 'Solana',
//     emitter: UniversalAddress { address: [Uint8Array] },
//     sequence: 38305n
//   }
// ]
// Retrying Wormholescan:GetVaaBytes, attempt 0/750 
// Retrying Wormholescan:GetVaaBytes, attempt 1/750 
// Retrying Wormholescan:GetVaaBytes, attempt 2/750 
// Retrying Wormholescan:GetVaaBytes, attempt 3/750 
// ✅ Attestation submitted on Aptos: [
//   {
//     chain: 'Aptos',
//     txid: '0x8e20b45601707f62d2769142f70a97828375c62e8d7a878158d607edfa9164d6'
//   },
//   {
//     chain: 'Aptos',
//     txid: '0x44cfd521a3be45b1321aad1695ce3b8633d5653bd9786acf33023bca416df5fd'
//   }
// ]
// ✅ Wrapped token is now available on Aptos: AptosAddress {
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
// 🚀 Token attestation complete! Token registered with Aptos.