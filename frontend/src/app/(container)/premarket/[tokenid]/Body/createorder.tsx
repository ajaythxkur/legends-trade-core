"use client"

import { useEffect, useState } from "react"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"
import { PExtraSmall, PMedium, PSmall } from "@/components/ui/typography"
import { RiArrowRightDoubleFill } from "react-icons/ri"
import { LuWalletMinimal } from "react-icons/lu"
import { useDrawer } from "@/contexts/DrawerContext"
import { Badge } from "@/components/ui/badge"
import { Token, TokenOffers } from "@/types/premarket"
import { useWallet, InputTransactionData } from "@aptos-labs/wallet-adapter-react"
import { moduleAddress } from "@/utils/env"
import aptosClient, { getTxnOnExplorer } from "@/lib/aptos"
import { toast } from "sonner"
import { WalletButton } from "@/components/WalletButton"
import { useApp } from "@/contexts/AppProvider"
import { useUSDCBalance } from "@/contexts/USDCBalanceContext"
import { testnetTokens } from "@/cross-chain-core"
import { InputGenerateTransactionPayloadData } from "@aptos-labs/ts-sdk"
import { IoCheckmark } from "react-icons/io5"

interface CreateOrderProps {
    type: string;
    token: Token
    amount: number;
    filled_amount: number;
    collateral: number
    price: number
    offer: TokenOffers
}

export default function CreateOrder({ type, token, amount, filled_amount, collateral, price, offer }: CreateOrderProps) {
    const { connected, account, signAndSubmitTransaction, wallet, signTransaction } = useWallet()
    const { sourceChain, originWalletDetails, provider, sponsorAccount } = useApp()
    const { fetchAptosBalance, fetchOriginBalance, aptosBalance, originBalance, refetchBalancesWithDelay } = useUSDCBalance()
    const { network } = useWallet()
    const { closeDrawer } = useDrawer();
    // const [desiredAmount, setDesiredAmount] = useState(0)
    const [desiredAmount, setDesiredAmount] = useState('')
    const [collateralAmount, setCollateralAmount] = useState<number>(collateral);

    // const [isMarketChartOpen, setIsMarketChartOpen] = useState(false)

    const [sliderValue, setSliderValue] = useState(0) // percentage (0 → 100)
    const maxAmount = amount - filled_amount;
    const currentCount = Math.round((sliderValue / 100) * maxAmount)

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        if (key === "Backspace" || key === "Delete" || key === "ArrowLeft" || key === "ArrowRight" || key === "Tab") { return; }
        if (!/[0-9.]/.test(key)) {
            e.preventDefault();
        }
        if (key === "." && e.currentTarget.value.includes(".")) {
            e.preventDefault();
        }
    };

    const handleSliderChange = (val: number[]) => {
        const percent = val[0]
        setSliderValue(percent)
        // setDesiredAmount(Math.round((percent / 100) * maxAmount))
        // setCollateralAmount((desiredAmount * price) / 5) // 5 is apt price static
        setDesiredAmount(Math.round((percent / 100) * maxAmount).toString())
        setCollateralAmount((Number(desiredAmount) * price) / 5) // 5 is apt price static
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        setDesiredAmount(value)
        // if (value > amount) {
        //     setDesiredAmount(amount)
        // } else {
        //     setDesiredAmount(value)
        // }
        // clamp between 0 and maxAmount
        const clamped = Math.min(Math.max(Number(value), 0), maxAmount)
        setSliderValue((clamped / maxAmount) * 100)
        setCollateralAmount((clamped * price) / 5) // 5 is apt price static
    }

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = Number(e.target.value)
    //     if (value > amount) {
    //         setDesiredAmount(amount)
    //     } else {
    //         setDesiredAmount(value)
    //     }
    //     // clamp between 0 and maxAmount
    //     const clamped = Math.min(Math.max(Number(value), 0), maxAmount)
    //     setSliderValue((clamped / maxAmount) * 100)
    //     setCollateralAmount((clamped * price) / 5) // 5 is apt price static
    // }




    const collateralToken = testnetTokens["Aptos"];
    const onCreateOrder = async () => {
        try {
            if (!account) throw new Error("Wallet not connected");
            const amount = Number(desiredAmount) * 10000;
            const transactionData: InputGenerateTransactionPayloadData = {
                function: `${moduleAddress}::premarket::create_order_entry`,
                functionArguments: [
                    offer.offer_addr,
                    amount
                ]
            };
            const collateral = Number(offer.price) / 10000;
            let hash = ""
            if (sourceChain !== "Aptos") {
                if (collateral > Number(aptosBalance)) {
                    const desiredAmount = collateral - Number(aptosBalance);
                    const quote = await provider?.getQuote({
                        amount: desiredAmount.toString(),
                        originChain: sourceChain,
                        type: "transfer",
                    });
                    console.log(quote, desiredAmount)
                    await provider.transfer({
                        sourceChain,
                        wallet,
                        destinationAddress: account?.address?.toString() ?? "",
                        mainSigner: sponsorAccount,
                        amount: desiredAmount.toString(),
                        sponsorAccount,
                    })
                };

                const rawTransaction = await aptosClient.transaction.build.simple({
                    data: transactionData,
                    options: {
                        maxGasAmount: 2000,
                    },
                    sender: account.address,
                    withFeePayer: true,
                });

                const response = await signTransaction({
                    transactionOrPayload: rawTransaction,
                });

                const sponsorAuthenticator = aptosClient.transaction.signAsFeePayer({
                    signer: sponsorAccount,
                    transaction: rawTransaction,
                });

                const txnSubmitted = await aptosClient.transaction.submit.simple(
                    {
                        transaction: rawTransaction,
                        senderAuthenticator: response.authenticator,
                        feePayerAuthenticator: sponsorAuthenticator,
                    }
                );

                hash = txnSubmitted.hash;
            } else {
                const response = await signAndSubmitTransaction({ data: transactionData });
                hash = response.hash;
            }
            await aptosClient.waitForTransaction({ transactionHash: hash });
            toast.success(`Transaction completed`, {
                action: <a target="_blank" href={getTxnOnExplorer(hash)} style={{ color: "green", textDecoration: "underline" }}>View Txn</a>,
                icon: <IoCheckmark />
            });

            refetchBalancesWithDelay(300);
        } catch (error) {
            toast.error(`Failed to create Order: ${error}`)
        }


        // try {
        //     // sign and submit transaction to chain
        //     const response = await signAndSubmitTransaction(transaction);
        //     // wait for transaction
        //     await aptosClient.waitForTransaction({ transactionHash: response.hash });
        //     toast.success('order created successfully')
        // } catch (error) {
        //     console.log(error);
        //     toast.error(`Failed to create Order: ${error}`)
        // }

    }

    useEffect(() => {
        if (offer.is_full_match) {
            // full match → lock to full amount
            // setDesiredAmount(amount)
            setDesiredAmount(amount.toString())
            setCollateralAmount((amount * price) / 5)
        } else {
            // setDesiredAmount(0)
            setDesiredAmount('')
            setCollateralAmount(0)
            setSliderValue(0)
        }
    }, [offer.is_full_match, amount, price])

    const [combinedUsdcBalance, setCombinedUsdcBalance] = useState<string>("");
    useEffect(() => {
        if (!sourceChain) return;
        if (account) {
            fetchAptosBalance(account.address.toString());
        }
        if (originWalletDetails) {
            fetchOriginBalance(originWalletDetails.address.toString(), sourceChain);
        }
    }, [originWalletDetails, network, sourceChain, fetchOriginBalance, fetchAptosBalance]);

    useEffect(() => {
        let combinedBalance = aptosBalance ? Number(aptosBalance) : 0;
        combinedBalance += originBalance ? Number(originBalance) : 0;
        setCombinedUsdcBalance(
            combinedBalance.toString()
        )
    }, [aptosBalance, originBalance])

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between">
                <Badge variant="outline">{type === 'buy' ? 'Buy' : 'Sell'}</Badge>

                <div className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-tertiary-text-color" />
                    <RiArrowRightDoubleFill className="w-5 h-5 text-tertiary-text-color cursor-pointer" onClick={() => closeDrawer()} />
                </div>
            </div>

            {/* Desired Amount Section */}
            <div className="bg-card-bg p-4 rounded-md mt-4">
                <div className="flex justify-between items-center">
                    <PSmall className="text-secondary-text-color">Desired Amount you buy</PSmall>
                    <PSmall className="text-secondary-text-color">Max {maxAmount}</PSmall>
                </div>

                <div className="flex items-center justify-between mt-4 min-w-0 overflow-hidden">
                    <input
                        type="text"
                        name="desired-amt"
                        value={desiredAmount}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        inputMode="decimal"
                        placeholder="0.000"
                        className="text-xl font-bold bg-transparent outline-none w-full"
                        disabled={offer.is_full_match}
                    />

                    <div className="flex items-center gap-2 flex-shrink-0 ms-2">
                        <Image src={token.image} alt="token-image" width={24} height={24} className="rounded-full w-6 h-6 object-contain" />
                        <PSmall className="font-medium whitespace-nowrap">{token.symbol}</PSmall>
                    </div>
                </div>
            </div>

            {/* Arrow/Divider */}
            <Image
                src="/media/pre-market.svg"
                alt="token-image"
                width={24}
                height={24}
                className="my-1 m-auto"
            />

            {/* Collateral Section */}
            <div className="bg-card-bg p-4 rounded-md">
                <div className="flex justify-between items-center">
                    <PSmall className="text-secondary-text-color">Collateral</PSmall>
                    <PSmall className="text-secondary-text-color">Bal. {combinedUsdcBalance}</PSmall>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <input
                        type="text"
                        name="collateral-amt"
                        value={collateralAmount.toFixed(2)}
                        placeholder="0.000"
                        className="text-xl font-bold bg-transparent min-w-0 outline-none"
                        disabled
                    />
                    <div className="flex items-center flex-shrink-0 gap-2">
                        <Image
                            src="/media/usdc.png"
                            alt="token-image"
                            width={24}
                            height={24}
                            className="rounded-full"
                        />
                        <PSmall className="font-medium">{collateralToken.symbol}</PSmall>
                        {/* <PSmall className="font-medium">{offer.collateral_asset}</PSmall> */}
                    </div>
                </div>
            </div>

            {/* Slider Section for partial offers */}
            {
                !offer.is_full_match && (
                    <div className="mt-4">
                        <div className="flex justify-between items-center">
                            <PExtraSmall>Select desired amount</PExtraSmall>
                            <PExtraSmall>{currentCount.toLocaleString()} {token.symbol}</PExtraSmall>
                        </div>

                        <Slider
                            value={[sliderValue]}
                            onValueChange={handleSliderChange}
                            max={100}
                            // step={1}
                            step={0.001}
                            className="w-full mt-3"
                        />

                        <div className="flex justify-between text-xs text-gray-500 mt-3">
                            <PExtraSmall>0</PExtraSmall>
                            <PExtraSmall>{maxAmount}</PExtraSmall>
                        </div>
                    </div>
                )
            }

            <div className="text-center mt-4">
                {
                    connected ?
                        <Button className="m-auto w-fit"
                            onClick={() => onCreateOrder()}
                            disabled={!collateralAmount || !desiredAmount}
                        >Confirm {type === 'buy' ? 'Buy' : 'Sell'} Order</Button>
                        :
                        <WalletButton />
                }
            </div>

            {/* Warning Message */}
            {/* <div className="flex items-center gap-2 text-warning-text bg-surface-warning w-fit mt-5 m-auto p-1 rounded">
                <AlertTriangle className="w-4 h-4" />
                <PSmall>The order value must exceed $10.</PSmall>
            </div> */}

            {/* Price Breakdown */}
            <div className="py-4">
                <div className="flex justify-between">
                    <PMedium className="text-tertiary-text-color">Order type</PMedium>
                    <Badge variant='outline' className='text-xs py-2 px-3'>{offer.is_full_match ? 'Full' : 'Partial'}</Badge>
                </div>
                <div className="flex justify-between mt-4">
                    <PMedium className="text-tertiary-text-color">Price</PMedium>
                    <PMedium className="font-medium">$ {price}</PMedium>
                </div>
                <div className="flex justify-between mt-4">
                    <PMedium className="text-tertiary-text-color">Buying</PMedium>
                    <PMedium className="font-medium">{desiredAmount} <span className="text-xs">{token.symbol}</span></PMedium>
                </div>
                <div className="flex justify-between mt-4">
                    <PMedium className="text-tertiary-text-color">Collateral</PMedium>
                    <PMedium className="font-medium">{collateralAmount.toFixed(2)} <span className="text-xs">APT</span></PMedium>
                </div>
            </div>

            {/* Market Chart Section */}
            {/* <div className="border-t pt-4">
                <button
                    onClick={() => setIsMarketChartOpen(!isMarketChartOpen)}
                    className="flex items-center justify-between w-full text-left"
                >
                    <span className="font-medium">Market chart</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${isMarketChartOpen ? "rotate-180" : ""}`} />
                </button>
                {isMarketChartOpen && (
                    <div className="mt-4 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                        Chart placeholder
                    </div>
                )}
            </div> */}
        </>
    )
}
