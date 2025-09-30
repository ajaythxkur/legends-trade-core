'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { PSmall } from "@/components/ui/typography";
import { useApp } from "@/contexts/AppProvider";
import { useBalance } from "@/contexts/BalanceContext";
import { testnetTokens, TokenConfig } from "@/cross-chain-core";
import { getTokenDecimals } from "@/cross-chain-core/config/testnet/helpers";
import { Token } from "@/types/premarket";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Chain, ChainAddress, TokenId, toNative, toUniversal, Wormhole, wormhole } from "@wormhole-foundation/sdk";
import aptos from "@wormhole-foundation/sdk/aptos";
import solana from "@wormhole-foundation/sdk/solana";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { toast } from "sonner";
interface WithdrawProps {
    crossChainTokens: Token[]
    handleKeyPress: (value: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Withdraw({ crossChainTokens, handleKeyPress }: WithdrawProps) {
    const { sourceChain, sponsorAccount, provider, originWalletDetails } = useApp()
    const { account, wallet, network, } = useWallet();
    const { refetchBalancesWithDelay, refetchBalances, aptosBalance, fetchAptosBalance, isLoadingAptosBalance } = useBalance()
    const [amount, setAmount] = useState<string>('');
    const [selectedToken, setSelectedToken] = useState<{ type: "collateral" | "crosschain", token: TokenConfig | Token }>();
    const [transferInProgress, setTransferInProgress] = useState(false);
    const [sourceBalance, setSourceBalance] = useState<string>("")

    const collateralTokens = sourceChain ? testnetTokens[sourceChain] : testnetTokens["Aptos"]

    const handleSelectedToken = (type: "collateral" | "crosschain", token: TokenConfig | Token) => {
        setSelectedToken({ type, token });
        if (!account) return;

        // fetch balances based on token + type
        if (type === "collateral") {
            const t = token as TokenConfig;
            fetchAptosBalance(
                account.address.toString(),
                // t.tokenId.address,
                '0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832',  //usdc only here
                t.decimals
            );
        } else if (type === "crosschain") {
            const t = token as Token;
            fetchAptosBalance(
                account.address.toString(),
                `${t.fa}::coin::T`,   // coin address
                // '0xf63c92e6c9088fc6305f894614e7b6adf3d85dd2a9ee0652e11038c86f52535b',   //token fa
                // '0x99a2394c350532b502c48b8778a16423754af56c82205f3f00485171232c7ade::coin::T',   //coin address
                8
            );
        }
    };

    // deposit handler
    const handleWithdraw = async () => {
        if (!account) {
            throw new Error("No account connected");
        }
        if (!selectedToken) {
            toast.error("Select a token first!");
            return;
        }

        setTransferInProgress(true);
        try {
            // const withdrawamount = Number(amount);
            if (selectedToken.type === "collateral" && (selectedToken.token as TokenConfig).symbol === "USDC") {
                // 👉 Normal CCTP flow
                const token = selectedToken.token as TokenConfig;

                const srcToken = testnetTokens["Aptos"].find((t) => t.symbol === token.symbol);
                const dstToken = testnetTokens["Solana"].find((t) => t.symbol === token.symbol);
                if (!srcToken) throw new Error("Source token not found")
                if (!dstToken) throw new Error("Destination token not found")
                console.log(srcToken)
                console.log(dstToken)


                const quote = await provider.getQuote({
                    amount: amount.toString(),
                    originChain: sourceChain,
                    type: "withdraw",
                    sourceTokenAddr: srcToken.tokenId.address, // Aptos hex
                    dstTokenAddr: dstToken.tokenId.address,       // Solana Base58
                });
                console.log("Quote received:", quote);

                const transferResult = await provider.withdraw({
                    sourceChain,
                    wallet,
                    destinationAddress: originWalletDetails?.address.toString(),
                    mainSigner: sponsorAccount,
                    amount: amount.toString(),
                    sponsorAccount,
                    sourceTokenAddr: srcToken.tokenId.address,
                    dstTokenAddr: dstToken.tokenId.address
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
                // 👉 Wormhole flow
                const token = selectedToken.token as Token;
                console.log(token)

                const wh = await wormhole('Testnet', [aptos, solana]);
                const sourceChain = wh.getChain('Aptos');
                const destinationChain = wh.getChain('Solana');

                // Define token and amount to transfer
                const tokenId: TokenId = Wormhole.tokenId(
                    sourceChain.chain,
                    // 'INSERT_APTOS_TOKEN_ADDRESS'
                    // '0x1389a4db61cd4034909695c880815b89e06891ac65be415b3b3234a0789b85df::coin::T',
                    `${token.fa}::coin::T`
                    // "0xf63c92e6c9088fc6305f894614e7b6adf3d85dd2a9ee0652e11038c86f52535b::coin::T"
                );
                console.log(tokenId)
                // // Replace with amount you want to transfer
                // // const amount = amount;
                // // Convert to raw units based on token decimals
                // const decimals = await getTokenDecimals(wh, tokenId, sourceChain);
                // const transferAmount = BigInt(Math.floor(Number(amount) * 10 ** decimals));

                // // Check if the token is registered with destinationChain WTT (Token Bridge) contract
                // let wrappedToken: TokenId;
                // try {
                //     wrappedToken = await wh.getWrappedAsset(destinationChain.chain, tokenId);
                //     console.log(
                //         '✅ Token already registered on destination:',
                //         wrappedToken.address
                //     );
                // } catch (e) {
                //     console.log(
                //         '⚠️ Token is NOT registered on destination. Attestation required before transfer can proceed...'
                //     );
                // }
                // // Solana (base58 string → NativeAddress)
                // const destinationChainAddress = toNative("Solana", originWalletDetails?.address.toString() ?? '');
                // // Aptos (hex string → UniversalAddress)
                // const sourceChainAddress = toUniversal("Aptos", account.address.toString());
                // console.log("sourceChainAddress:", sourceChainAddress)
                // console.log("destinationChainAddress:", destinationChainAddress)


                // const from: ChainAddress = {
                //     chain: "Aptos",
                //     address: sourceChainAddress
                // };
                // const to: ChainAddress = {
                //     chain: "Solana",
                //     address: destinationChainAddress
                // };

                // const xfer = await wh.tokenTransfer(
                //     tokenId,
                //     transferAmount,
                //     from,      // from address
                //     to,  // to address
                //     'TokenBridge',
                //     undefined // no payload
                // );
                // console.log('🚀 Built transfer object:', xfer.transfer);

                // // Initiate, sign, and send the token transfer
                // const srcTxs = await xfer.initiateTransfer(sourceSigner.signer);
                // console.log('🔗 Source chain tx sent:', srcTxs);

                // // For manual transfers, wait for VAA
                // console.log('⏳ Waiting for attestation (VAA) for manual transfer...');
                // const timeout = 10 * 60 * 1000; // 10 minutes timeout
                // const attIds = await xfer.fetchAttestation(timeout);
                // console.log('✅ Got attestation ID(s):', attIds);

                // // Complete the manual transfer on the destination chain
                // console.log('↪️ Redeeming transfer on destination...');
                // const destTxs = await xfer.completeTransfer(destinationSigner.signer);
                // console.log('🎉 Destination tx(s) submitted:', destTxs);

            }
            refetchBalancesWithDelay(8000);
            refetchBalances;
        } catch (error: any) {
            console.error("Deposit failed:", error);
            const errorMessage = error.message || error.toString();
            toast.error(`Failed to process withdraw: ${errorMessage}`);
        } finally {
            setTransferInProgress(false);
        }
    };

    useEffect(() => {
        let combinedBalance = aptosBalance ? Number(aptosBalance) : 0;
        setSourceBalance(combinedBalance.toString());
        console.log("combined:", combinedBalance)
    }, [aptosBalance, selectedToken]);


    return (
        <>
            <div className="bg-card-bg rounded-md p-4 mt-4 ">
                <div className="flex items-center gap-4 justify-between">
                    <PSmall>Withdraw</PSmall>
                    {
                        selectedToken &&
                        <PSmall>Bal: {isLoadingAptosBalance ? '...' : sourceBalance}</PSmall>
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
                <Button className="w-full" onClick={handleWithdraw} disabled={transferInProgress || !amount} >
                    {transferInProgress ?
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                        : 'Withdraw'}
                </Button>
            </div>
        </>
    )
}