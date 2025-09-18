'use client'

import { useIsMobile } from "@/hooks/use-mobile"
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog"
import { Drawer, DrawerContent, DrawerTitle } from "../ui/drawer"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { useApp } from "@/contexts/AppProvider"
import { toast } from "sonner"
import { useBalance } from "@/contexts/BalanceContext"
import { useCallback, useEffect, useState } from "react"
import { testnetTokens, TokenConfig } from "@/cross-chain-core"
import { IoCheckmark } from "react-icons/io5"
import { Token } from "@/types/premarket"
import backendApi from "@/utils/backendApi"
import ModalContent from "./ModalContent"

export default function DepositModal() {
    const isMobile = useIsMobile()
    const { originWalletDetails, sourceChain, sponsorAccount, provider } = useApp()
    const { account, wallet, network } = useWallet();
    const { aptosBalance, refetchBalancesWithDelay, fetchAptosBalance, fetchOriginBalance, originBalance } = useBalance()

    const [amount, setAmount] = useState<string>('');
    const [withdrawAmount, setWithdrawAmount] = useState<string>('');

    const [sourceBalance, setSourceBalance] = useState<string>("");
    const [sourceToken, setSourceToken] = useState<TokenConfig>(testnetTokens["Aptos"][0]);

    const [transferInProgress, setTransferInProgress] = useState(false);
    const [withdrawInProgress, setWithdrawInProgress] = useState(false);

    const [crossChainTokens, setCrossChainTokens] = useState<Token[]>([]);
    const [crossChainToken, setCrossChainToken] = useState<Token>();

    const collateralTokens = sourceChain ? testnetTokens[sourceChain] : testnetTokens["Aptos"]

    //deposit usdc
    const handleDeposit = async () => {
        if (!account) {
            throw new Error("No account connected");
        }
        setTransferInProgress(true);
        try {
            if (sourceChain !== "Aptos") {
                const depositAmount = Number(amount);
                const dstToken = testnetTokens["Aptos"].find((t) => t.symbol === sourceToken.symbol);
                if (!dstToken) throw new Error("Destination token not found")

                console.log(sourceToken.tokenId.address)
                console.log(dstToken.tokenId.address)

                console.log(crossChainToken?.cross_chain_address)
                console.log(crossChainToken?.fa)
                console.log(account?.address.toString())

                const quote = await provider.getQuote({
                    amount: depositAmount.toString(),
                    originChain: sourceChain,
                    type: "transfer",
                    // sourceTokenAddr: sourceToken.tokenId.address,
                    // dstTokenAddr: dstToken.tokenId.address

                    sourceTokenAddr: crossChainToken?.cross_chain_address,
                    dstTokenAddr: crossChainToken?.fa
                    // dstTokenAddr: account?.address.toString()
                });
                console.log("Quote received:", quote);

                const transferResult = await provider.transfer({
                    sourceChain,
                    wallet,
                    destinationAddress: account.address.toString(),
                    mainSigner: sponsorAccount,
                    amount: depositAmount.toString(),
                    sponsorAccount,
                    // sourceTokenAddr: sourceToken.tokenId.address,
                    // dstTokenAddr: dstToken.tokenId.address

                    sourceTokenAddr: crossChainToken?.cross_chain_address,
                    dstTokenAddr: crossChainToken?.fa
                });
                refetchBalancesWithDelay(8000);

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
            }
        } catch (error: any) {
            console.error("Deposit failed:", error);
            const errorMessage = error.message || error.toString();
            if (typeof toast !== 'undefined' && toast.error) {
                toast.error(`Failed to process deposit: ${errorMessage}`);
            }
            throw error;
        } finally {
            setTransferInProgress(false);
        }
    };

    //withdraw usdc
    const onWithdrawClick = async () => {
        if (!account) {
            throw new Error("No account connected");
        }
        setWithdrawInProgress(true)
        try {
            if (sourceChain !== "Aptos") {
                // const wdthAmount = Number(withdrawAmount) - Number(aptosBalance || 0);
                console.log(withdrawAmount)

                const dstToken = testnetTokens["Solana"].find((t) => t.symbol === sourceToken.symbol);
                const srcToken = testnetTokens["Aptos"].find((t) => t.symbol === sourceToken.symbol);
                if (!dstToken) throw new Error("Destination token not found")
                if (!srcToken) throw new Error("Source token not found")

                const quote = await provider.getQuote({
                    amount: withdrawAmount.toString(),
                    originChain: sourceChain,
                    type: "withdraw",
                    sourceTokenAddr: srcToken.tokenId.address, // Aptos hex
                    dstTokenAddr: dstToken.tokenId.address,       // Solana Base58
                });
                // console.log("Quote received:", quote);

                await provider.withdraw({
                    sourceChain,
                    wallet,
                    destinationAddress: originWalletDetails?.address.toString(),
                    mainSigner: sponsorAccount,
                    amount: withdrawAmount.toString(),
                    sponsorAccount,
                    sourceTokenAddr: sourceToken.tokenId.address,
                    dstTokenAddr: dstToken.tokenId.address
                });
                toast.success('Withdraw Transaction Completed.')
            }
        } catch (error) {
            console.error("Error transferring", error);
            toast.error(`Error transferring: ${error}`)
        } finally {
            setWithdrawInProgress(false)
        }
    }

    const getCrossChainTokens = useCallback(async () => {
        try {
            const response = await backendApi.getCrossChainTokens(1);
            setCrossChainTokens(response.data)
        } catch (err) {
            console.log(err)
        }
    }, [])
    useEffect(() => {
        getCrossChainTokens()
    }, [getCrossChainTokens])

    useEffect(() => {
        if (!sourceChain) return;
        if (account) {
            fetchAptosBalance(account.address.toString(), sourceToken.tokenId.address, sourceToken.decimals);
        }
        if (originWalletDetails) {
            fetchOriginBalance(originWalletDetails.address.toString(), sourceChain, sourceToken.tokenId.address, sourceToken.decimals);
        }
    }, [originWalletDetails, network, sourceChain, fetchOriginBalance, fetchAptosBalance, sourceToken]);

    useEffect(() => {
        if (!sourceChain) {
            setSourceToken(testnetTokens["Aptos"][0])
        } else {
            setSourceToken(testnetTokens[sourceChain][0])
        }
    }, [sourceChain]);

    return (
        <>
            {
                isMobile ?
                    <Drawer>
                        <DrawerContent>
                            <DrawerTitle></DrawerTitle>
                            <ModalContent
                                aptosBalance={aptosBalance}
                                amount={amount}
                                setAmount={setAmount}
                                handleDeposit={handleDeposit}
                                balance={sourceBalance}
                                collateralTokens={collateralTokens}
                                collateralToken={sourceToken}
                                onCollateralChange={(t: TokenConfig) => setSourceToken(t)}
                                transferInProgress={transferInProgress}
                                withdrawAmount={withdrawAmount}
                                setWithdrawAmount={setWithdrawAmount}
                                onWithdrawClick={onWithdrawClick}
                                originBalance={originBalance}
                                withdrawInProgress={withdrawInProgress}
                                crossChainTokens={crossChainTokens}
                                crossChainToken={crossChainToken}
                                setCrossChainToken={setCrossChainToken}
                            />
                        </DrawerContent>
                    </Drawer>
                    :
                    <Dialog>
                        <DialogTrigger className="bg-secondary-button-color py-3.25 px-6 rounded">Deposit/Withdraw</DialogTrigger>
                        <DialogContent className="bg-bottom-layer-2 p-4">
                            <DialogTitle></DialogTitle>
                            <ModalContent
                                aptosBalance={aptosBalance}
                                amount={amount}
                                setAmount={setAmount}
                                handleDeposit={handleDeposit}
                                balance={sourceBalance}
                                collateralTokens={collateralTokens}
                                collateralToken={sourceToken}
                                onCollateralChange={(t: TokenConfig) => setSourceToken(t)}
                                transferInProgress={transferInProgress}
                                onWithdrawClick={onWithdrawClick}
                                withdrawAmount={withdrawAmount}
                                setWithdrawAmount={setWithdrawAmount}
                                originBalance={originBalance}
                                withdrawInProgress={withdrawInProgress}
                                crossChainTokens={crossChainTokens}
                                crossChainToken={crossChainToken}
                                setCrossChainToken={setCrossChainToken}

                            />
                        </DialogContent>
                    </Dialog>
            }
        </>
    )
}


