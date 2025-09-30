'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { PSmall } from "@/components/ui/typography";
import { useApp } from "@/contexts/AppProvider";
import { useBalance } from "@/contexts/BalanceContext";
import { testnetTokens, TokenConfig } from "@/cross-chain-core";
import { getTokenDecimals, getSigner } from "@/cross-chain-core/config/testnet/helpers";
import { Token } from "@/types/premarket";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChainAddress, TokenId, toNative, toUniversal, Wormhole, wormhole } from "@wormhole-foundation/sdk";
import aptos from "@wormhole-foundation/sdk/aptos";
import solana from "@wormhole-foundation/sdk/solana";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { toast } from "sonner";

interface DepositProps {
    crossChainTokens: Token[]
    handleKeyPress: (value: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function DepositToken({ crossChainTokens, handleKeyPress }: DepositProps) {
    const { originWalletDetails, sourceChain, sponsorAccount, provider } = useApp()
    const { account, wallet, network } = useWallet();
    const { refetchBalancesWithDelay, refetchBalances, originBalance, fetchOriginBalance, isLoadingOriginBalance, } = useBalance()
    const [amount, setAmount] = useState<string>('');
    const [selectedToken, setSelectedToken] = useState<{ type: "collateral" | "crosschain", token: TokenConfig | Token }>();
    const [transferInProgress, setTransferInProgress] = useState(false);
    const collateralTokens = sourceChain ? testnetTokens[sourceChain] : testnetTokens["Aptos"]
    console.log('origin', originWalletDetails)


    const handleSelectedToken = (type: "collateral" | "crosschain", token: TokenConfig | Token) => {
        setSelectedToken({ type, token });
        // fetch balances based on token + type
        if (type === "collateral") {
            const t = token as TokenConfig;
            fetchOriginBalance(
                originWalletDetails?.address.toString() || '',  //user address
                "Solana",
                t.tokenId.address,
                t.decimals
            );
        } else if (type === "crosschain") {
            const t = token as Token;
            fetchOriginBalance(
                originWalletDetails?.address.toString() || '',
                "Solana",
                t.cross_chain_address,
                6
            );
        }
    };

    // // deposit handler
    // const handleDeposit = async () => {
    //     if (!account) {
    //         throw new Error("No account connected");
    //     }
    //     if (!selectedToken) {
    //         toast.error("Select a token first!");
    //         return;
    //     }

    //     setTransferInProgress(true);
    //     try {
    //         const depositAmount = Number(amount);

    //         if (selectedToken.type === "collateral" && (selectedToken.token as TokenConfig).symbol === "USDC") {
    //             // 👉 Normal CCTP flow
    //             const dstToken = testnetTokens["Aptos"].find((t) => t.symbol === "USDC");
    //             if (!dstToken) throw new Error("Destination token not found");

    //             const quote = await provider.getQuote({
    //                 amount: depositAmount.toString(),
    //                 originChain: sourceChain,
    //                 type: "transfer",
    //                 sourceTokenAddr: (selectedToken.token as TokenConfig).tokenId.address,
    //                 dstTokenAddr: dstToken.tokenId.address,
    //             });
    //             console.log("Quote received:", quote);

    //             const transferResult = await provider.transfer({
    //                 sourceChain,
    //                 wallet,
    //                 destinationAddress: account.address.toString(),
    //                 mainSigner: sponsorAccount,
    //                 amount: depositAmount.toString(),
    //                 sponsorAccount,
    //                 sourceTokenAddr: (selectedToken.token as TokenConfig).tokenId.address,
    //                 dstTokenAddr: dstToken.tokenId.address,
    //             });

    //             toast.success(`Transaction Success.`, {
    //                 action: <a
    //                     href={`https://explorer.aptoslabs.com/txn/${transferResult.destinationChainTxnId}?network=${network}`}
    //                     target="_blank"
    //                     rel="noopener noreferrer"
    //                 >
    //                     <p className="text-md underline">View Txn.</p>
    //                 </a>,
    //                 icon: <IoCheckmark />
    //             });
    //         } else if (selectedToken.type === "crosschain") {
    //             //   -------
    //             // const token = selectedToken.token as Token;
    //             // const wh = await wormhole('Testnet', [solana, aptos]);
    //             // const srcChain = wh.getChain('Solana');
    //             // const tokenId: TokenId = Wormhole.tokenId(
    //             //     srcChain.chain,
    //             //     token.cross_chain_address || ""
    //             // );
    //             // const decimals = await getTokenDecimals(wh, tokenId, srcChain);
    //             // console.log("decimals::", decimals)

    //             // const quote = await provider.getQuote({
    //             //     amount: depositAmount,
    //             //     originChain: sourceChain,
    //             //     type: "transfer",
    //             //     sourceTokenAddr: token.cross_chain_address,
    //             //     dstTokenAddr: token.fa,
    //             //     decimals: decimals
    //             // });
    //             // console.log("Quote received:", quote);

    //             // const transferResult = await provider.transfer({
    //             //     sourceChain,
    //             //     wallet,
    //             //     destinationAddress: account.address.toString(),
    //             //     mainSigner: sponsorAccount,
    //             //     amount: depositAmount.toString(),
    //             //     sponsorAccount,
    //             //     sourceTokenAddr: token.cross_chain_address,
    //             //     dstTokenAddr: token.fa,
    //             // });
    //             // console.log(transferResult)

    //             //script method-----
    //             const token = selectedToken.token as Token;

    //             const wh = await wormhole('Testnet', [solana, aptos]);
    //             const srcChain = wh.getChain('Solana');
    //             const dstChain = wh.getChain('Aptos');

    //             const tokenId: TokenId = Wormhole.tokenId(
    //                 srcChain.chain,
    //                 token.cross_chain_address || ""     // 'INSERT_TOKEN_CONTRACT_ADDRESS'
    //             );
    //             const tokenamount = Number(amount);     //token amount
    //             const decimals = await getTokenDecimals(wh, tokenId, srcChain);
    //             const transferAmount = BigInt(Math.floor(tokenamount * 10 ** decimals));
    //             let wrappedToken: TokenId;
    //             try {
    //                 wrappedToken = await wh.getWrappedAsset(dstChain.chain, tokenId);
    //                 console.log(
    //                     '✅ Token already registered on destination:',
    //                     wrappedToken.address
    //                 );
    //             } catch (e) {
    //                 console.log(
    //                     '⚠️ Token is NOT registered on destination. Attestation required before transfer can proceed...'
    //                 );
    //             }
    //             // Insert Initiate Transfer on Source Chain code
    //             // Solana (base58 string → NativeAddress)
    //             const sourceChainAddress = toNative("Solana", originWalletDetails?.address.toString() ?? '');
    //             // Aptos (hex string → UniversalAddress)
    //             const destinationChainAddress = toUniversal("Aptos", account.address.toString());
    //             console.log("sourceChainAddress:", sourceChainAddress)
    //             console.log("destinationChainAddress:", destinationChainAddress)

    //             const from: ChainAddress = {
    //                 chain: "Solana",
    //                 address: sourceChainAddress
    //             };
    //             const to: ChainAddress = {
    //                 chain: "Aptos",
    //                 address: destinationChainAddress
    //             };

    //             const xfer = await wh.tokenTransfer(
    //                 tokenId,
    //                 transferAmount,
    //                 from,      // from address
    //                 to,  // to address
    //                 'TokenBridge',
    //                 undefined // no payload
    //             );
    //             console.log('🚀 Built transfer object:', xfer);

    //             const sourceSigner = await provider.createSigner({
    //                 sourceChain,
    //                 wallet
    //             })
    //             const destinationSigner = await provider.createSigner({
    //                 sourceChain: "Aptos",
    //                 wallet
    //             })
    //             console.log(sourceSigner)
    //             console.log(destinationSigner)


    //             // Initiate, sign, and send the token transfer
    //             const srcTxs = await xfer.initiateTransfer(sourceSigner);
    //             console.log('🔗 Source chain tx sent:', srcTxs);

    //             // // For manual transfers, wait for VAA
    //             console.log('⏳ Waiting for attestation (VAA) for manual transfer...');
    //             const timeout = 10 * 60 * 1000; // 10 minutes timeout
    //             const attIds = await xfer.fetchAttestation(timeout);
    //             console.log('✅ Got attestation ID(s):', attIds);

    //             // Complete the manual transfer on the destination chain
    //             console.log('↪️ Redeeming transfer on destination...');

    //             const destTxs = await xfer.completeTransfer(destinationSigner);
    //             console.log('🎉 Destination tx(s) submitted:', destTxs);

    //             toast.success(`Wormhole transfer started for ${token.symbol}`);
    //         }

    //         refetchBalancesWithDelay(8000);
    //         refetchBalances;
    //     } catch (error: any) {
    //         console.error("Deposit failed:", error);
    //         const errorMessage = error.message || error.toString();
    //         toast.error(`Failed to process deposit: ${errorMessage}`);


    //     } finally {
    //         setTransferInProgress(false);
    //     }
    // };

    const handleDeposit = async () => {
        if (!account) {
            throw new Error("No account connected");
        }
        if (!selectedToken) {
            toast.error("Select a token first!");
            return;
        }

        setTransferInProgress(true);
        try {
            const depositAmount = Number(amount);

            if (selectedToken.type === "collateral" && (selectedToken.token as TokenConfig).symbol === "USDC") {
                // Normal CCTP flow remains the same
                const dstToken = testnetTokens["Aptos"].find((t) => t.symbol === "USDC");
                if (!dstToken) throw new Error("Destination token not found");

                const quote = await provider.getQuote({
                    amount: depositAmount.toString(),
                    originChain: sourceChain,
                    type: "transfer",
                    sourceTokenAddr: (selectedToken.token as TokenConfig).tokenId.address,
                    dstTokenAddr: dstToken.tokenId.address,
                });
                console.log("Quote received:", quote);

                const transferResult = await provider.transfer({
                    sourceChain,
                    wallet,
                    destinationAddress: account.address.toString(),
                    mainSigner: sponsorAccount,
                    amount: depositAmount.toString(),
                    sponsorAccount,
                    sourceTokenAddr: (selectedToken.token as TokenConfig).tokenId.address,
                    dstTokenAddr: dstToken.tokenId.address,
                });

                toast.success(`Transaction Success.`, {
                    action: <a
                        href={`https://explorer.aptoslabs.com/txn/${transferResult.destinationChainTxnId}?network=${network}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className="text-md underline">View Txn.</p>
                    </a>,
                    icon: <IoCheckmark />
                });

            } else if (selectedToken.type === "crosschain") {
                const token = selectedToken.token as Token;
                const wh = await wormhole('Testnet', [solana, aptos]);
                const srcChain = wh.getChain('Solana');
                const dstChain = wh.getChain('Aptos');

                const tokenId: TokenId = Wormhole.tokenId(
                    srcChain.chain,
                    token.cross_chain_address || ""
                );

                const tokenamount = Number(amount);
                const decimals = await getTokenDecimals(wh, tokenId, srcChain);
                const transferAmount = BigInt(Math.floor(tokenamount * 10 ** decimals));

                // Check if token is registered on destination
                let wrappedToken: TokenId;
                try {
                    wrappedToken = await wh.getWrappedAsset(dstChain.chain, tokenId);
                    console.log('✅ Token already registered on destination:', wrappedToken.address);
                } catch (e) {
                    console.log('⚠️ Token is NOT registered on destination. Attestation required...', e);
                    throw new Error("Token not registered on destination chain. Please register it first.");
                }

                // Prepare addresses
                const sourceChainAddress = toNative("Solana", originWalletDetails?.address.toString() ?? '');
                const destinationChainAddress = toUniversal("Aptos", account.address.toString());

                const from: ChainAddress = {
                    chain: "Solana",
                    address: sourceChainAddress
                };
                const to: ChainAddress = {
                    chain: "Aptos",
                    address: destinationChainAddress
                };
                console.log("from", from)
                console.log("to", to)

                const solanaSigner = await getSigner(srcChain)
                const destinationSigner = await getSigner(dstChain)

                // const solanaSigner = connected && originWalletDetails.address
                //     ? {
                //         signer: { signTransaction },
                //         address: originWalletDetails.address.toBase58(),
                //     }
                //     : null;


                // const solanaSigner = await provider.createSigner({
                //     sourceChain,
                //     wallet
                // })
                // const destinationSigner = await provider.createSigner({
                //     sourceChain: "Aptos",
                //     wallet
                // })
                console.log("tokenId:", tokenId)
                console.log(transferAmount)
                // console.log(solanaSigner.address)
                console.log(destinationSigner.address)

                const xfer = await wh.tokenTransfer(
                    tokenId,
                    transferAmount,
                    from,
                    to,
                    // originWalletDetails.address,
                    // to,
                    "TokenBridge",
                    undefined
                );
                console.log('🚀 Built transfer object:', xfer.transfer);

                const srcTxids = await xfer.initiateTransfer(solanaSigner.signer);
                console.log("Source Tx", srcTxids);


                // const response = await signTransaction({
                //     transactionOrPayload: rawTransaction,
                // });

                // const sponsorAuthenticator = aptosClient.transaction.signAsFeePayer({
                //     signer: sponsorAccount,
                //     transaction: rawTransaction,
                // });

                // OR if using a specific wallet adapter:
                // const solanaSigner = {
                //     signTransaction: async (txn) => await wallet.signTransaction(xfer),
                //     signAllTransactions: async (txns) => await wallet.signAllTransactions(txns),
                //     address: () => wallet.publicKey.toString()
                // };


                // // Wait for VAA (Verified Action Approval)
                // console.log('⏳ Waiting for attestation (VAA)...');
                // const timeout = 10 * 60 * 1000; // 10 minutes timeout
                // const attIds = await xfer.fetchAttestation(timeout);
                // console.log('✅ Got attestation ID(s):', attIds);

                // // Complete transfer on destination (Aptos) - This is automatic for derived wallets
                // console.log('↪️ Completing transfer on Aptos...');

                // // For derived wallets, you might not need a signer here
                // // The transfer should complete automatically using the VAA
                // try {
                //     // Try without destination signer first (for derived wallets)
                //     const destTxs = await xfer.completeTransfer(AptosSigner.signer);
                //     console.log('🎉 Transfer completed automatically:', destTxs);
                // } catch (error) {
                //     // If automatic completion fails, you might need manual completion
                //     console.log('Manual completion required on Aptos...');

                //     // For manual completion, you would need an Aptos signer
                //     // But since it's a derived wallet, this might not be possible
                //     // Check if your X Chain provider handles this
                //     // const aptosCompletion = await provider.completeWormholeTransfer({
                //     const aptosCompletion = await provider.transfer({
                //         vaa: attIds[0], // Use the VAA
                //         destinationAddress: account.address.toString(),
                //         sourceChain: "Solana",
                //         destinationChain: "Aptos"
                //     });
                //     console.log('🎉 Manual completion result:', aptosCompletion);
                // }

                toast.success(`Wormhole transfer completed for ${token.symbol}`);
            }

            refetchBalancesWithDelay(8000);
            refetchBalances();

        } catch (error: any) {
            console.error("Deposit failed:", error);
            const errorMessage = error.message || error.toString();
            toast.error(`Failed to process deposit: ${errorMessage}`);
        } finally {
            setTransferInProgress(false);
        }
    };


    const [sourceBalance, setSourceBalance] = useState<string>("")
    useEffect(() => {
        const combinedBalance = originBalance ? Number(originBalance) : 0;
        setSourceBalance(combinedBalance.toString());
        console.log("combined:", combinedBalance)
    }, [originBalance, selectedToken]);

    return (
        <>
            <div className="bg-card-bg rounded-md p-4 mt-4">
                <div className="flex items-center gap-4 justify-between">
                    <PSmall>Deposit</PSmall>
                    {
                        selectedToken &&
                        <PSmall>Bal: {isLoadingOriginBalance ? '...' : sourceBalance}</PSmall>
                    }
                </div>
                <div className="mt-2 flex justify-between items-center mb-2 text-tertiary-text-color">
                    <div className="flex items-center gap-4 justify-between w-full">
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="0.000"
                            inputMode="decimal"
                            className="text-xl font-bold bg-transparent outline-none w-full"
                            autoComplete="off"
                        />

                        <div className="w-fit">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="py-2 px-3 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer gap-2">
                                    {selectedToken ? (
                                        <>
                                            <Image
                                                src={
                                                    selectedToken.type === "collateral"
                                                        ? (selectedToken.token as TokenConfig).icon || ""
                                                        : (selectedToken.token as Token).image || ""
                                                }
                                                alt="token-icon"
                                                height={20}
                                                width={20}
                                                className="rounded-full"
                                            />
                                            {selectedToken.type === "collateral"
                                                ? (selectedToken.token as TokenConfig).symbol
                                                : (selectedToken.token as Token).symbol}
                                            <IoIosArrowDown className="ms-2 h-9 w-9" />
                                        </>
                                    ) : (
                                        <>
                                            Select
                                            <IoIosArrowDown className="h-5 w-5" />
                                        </>

                                    )}

                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-secondary-button-color w-fit rounded-md z-90 p-2">

                                    <p className="text-xs px-2 text-gray-400">Collateral Tokens</p>
                                    {collateralTokens.map((token, i) => (
                                        <DropdownMenuItem
                                            key={`collateral-${i}`}
                                            // onClick={() => setSelectedToken({ type: "collateral", token })}
                                            onClick={() => handleSelectedToken("collateral", token)}
                                            className="capitalize flex items-center gap-2 px-3 py-2 hover:bg-primary-button-color cursor-pointer text-action-text-color"
                                        >
                                            <Image
                                                src={token.icon || ''}
                                                alt="token-icon"
                                                height={20}
                                                width={20}
                                                className="rounded-full"
                                            />
                                            {token.symbol}
                                        </DropdownMenuItem>
                                    ))}

                                    <p className="text-xs px-2 mt-2 text-gray-400">Cross-Chain Tokens</p>
                                    {crossChainTokens.map((token, i) => (
                                        <DropdownMenuItem
                                            key={`crosschain-${i}`}
                                            // onClick={() => setSelectedToken({ type: "crosschain", token })}
                                            onClick={() => handleSelectedToken("crosschain", token)}
                                            className="capitalize flex items-center gap-2 px-3 py-2 hover:bg-primary-button-color cursor-pointer text-action-text-color"
                                        >
                                            <Image
                                                src={token.image || ''}
                                                alt="token-icon"
                                                height={20}
                                                width={20}
                                                className="rounded-full"
                                            />
                                            {token.symbol}
                                            {/* {token.cross_chain_address} */}
                                        </DropdownMenuItem>
                                    ))}

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4 ">
                <Button className="w-full" onClick={handleDeposit} disabled={transferInProgress || !amount} >
                    {transferInProgress ?
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                        : 'Deposit'}
                </Button>
            </div>
        </>
    )
}