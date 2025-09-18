import { wormhole, Wormhole, TokenId } from '@wormhole-foundation/sdk';
import aptos from '@wormhole-foundation/sdk/aptos';
import solana from '@wormhole-foundation/sdk/solana';
import { getSigner, getTokenDecimals } from './helpers';

async function transferTokens() {
    // Initialize wh instance
    const wh = await wormhole('Testnet', [aptos, solana]);
    // Define sourceChain and destinationChain, get chain contexts
    const sourceChain = wh.getChain('Aptos');
    const destinationChain = wh.getChain('Solana');
    // Load signers for both chains
    const sourceSigner = await getSigner(sourceChain);
    const destinationSigner = await getSigner(destinationChain);

    // Define token and amount to transfer
    const tokenId: TokenId = Wormhole.tokenId(
        sourceChain.chain,
        // Replace with your Aptos token address
        // 'INSERT_APTOS_TOKEN_ADDRESS'
        '0x1389a4db61cd4034909695c880815b89e06891ac65be415b3b3234a0789b85df::coin::T'
    );
    // Replace with amount you want to transfer
    const amount = 0.01;
    // Convert to raw units based on token decimals
    const decimals = await getTokenDecimals(wh, tokenId, sourceChain);
    const transferAmount = BigInt(Math.floor(amount * 10 ** decimals));

    // Check if the token is registered with destinationChain WTT (Token Bridge) contract
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
}

transferTokens().catch((e) => {
    console.error('❌ Error in transferTokens', e);
    process.exit(1);
});
