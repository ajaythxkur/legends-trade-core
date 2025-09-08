"use client"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { H5, H6, PExtraSmall, PMedium, PSmall } from "@/components/ui/typography"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import Image from "next/image"
import { PremarketSvg } from "@/components/icons/icons"
import { Badge } from "@/components/ui/badge"
import { useWallet, } from "@aptos-labs/wallet-adapter-react";
import { toast } from "sonner"
import aptosClient, { getTxnOnExplorer } from "@/lib/aptos"
import { Token } from "@/types/premarket"
import { moduleAddress } from "@/utils/env"
import { WalletSelector } from "@/components/connectwallet"
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { IoCheckmark } from "react-icons/io5"
import { useApp } from "@/contexts/AppProvider"
import { InputGenerateTransactionPayloadData } from "@aptos-labs/ts-sdk"
import { TokenConfig } from "@/cross-chain-core"
import { useBalance } from "@/contexts/BalanceContext"
interface CreateOfferModalProps {
    token: Token
    tokenAddr: string;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    balance: string;
    collateralTokens: TokenConfig[];
    collateralToken: TokenConfig;
    onCollateralChange: (t: TokenConfig) => void;
    priceInUsd: number;
}
export default function CreateOfferModal({ open, setOpen, token, tokenAddr, balance, collateralTokens, collateralToken, onCollateralChange, priceInUsd }: CreateOfferModalProps) {
    const { sourceChain, sponsorAccount, provider } = useApp()
    const { aptosBalance, refetchBalancesWithDelay } = useBalance()
    const { account, signAndSubmitTransaction, wallet, signTransaction } = useWallet();
    const [isBuy, setIsBuy] = useState(true);
    const [tokenprice, setTokenPrice] = useState<string>('');
    const [desiredAmount, setDesiredAmount] = useState('')
    const [collateralAmount, setCollateralAmount] = useState(0);
    const [acturalPrice, setActuralPrice] = useState(0);
    const [orderType, setOrderType] = useState<string>("full");
    const isFullMatch = orderType === "full"; // boolean
    const [currentStep, setCurrentStep] = useState(1);
    const [isError, setIsError] = useState(false)

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


    const handleTokenPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "" || value === ".") {
            setTokenPrice(value);
            setActuralPrice(0);
            setCollateralAmount(0);
            return;
        }
        const token_price = parseFloat(value);
        setTokenPrice(value);
        console.log(token_price, priceInUsd)
        const priceInApt = token_price / priceInUsd;
        setActuralPrice(priceInApt);

        const collateral = priceInApt * Number(desiredAmount || 0);
        setCollateralAmount(collateral);
    };
    const handleDesiredAmount = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "" || value === ".") {
            setDesiredAmount(value);
            setCollateralAmount(0);
            return;
        }

        const d_amount = parseFloat(value);
        setDesiredAmount(value); // keep as string

        const collateral = d_amount * acturalPrice;
        setCollateralAmount(collateral);
    };

    const createOffer = async () => {
        if (!account) return [];

        const price = (Number(tokenprice) / priceInUsd) * Math.pow(10, (collateralToken.decimals || 0));
        const amount = Number(desiredAmount) * 10000

        try {
            const collateral = Number(tokenprice) / priceInUsd;
            const transactionData: InputGenerateTransactionPayloadData = {
                function: `${moduleAddress}::premarket::create_offer_entry`,
                functionArguments: [
                    tokenAddr,
                    price,
                    amount,
                    isBuy,
                    isFullMatch,
                    collateralToken.tokenId.address
                ]
            }
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
            setOpen(false)
        } catch (error: any) {
            console.log(error);
            toast.error(`Failed to create offer: ${error} `)
        }
    };

    const handleNextClick = () => {
        // if (Number(desiredAmount) < 10) {
        //     setIsError(true);
        //     return;
        // }
        setIsError(false);
        setCurrentStep(2);
    }

 

    return (
        <div className="bg-bottom-layer-2 rounded-2xl w-full py-4 px-5 mt-0 ">
            <div className="flex items-center justify-between">
                <Badge variant="outline">Step {currentStep}/2</Badge>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <div className="space-y-2">
                    <H5 className="text-primary-text-color">Create {token.symbol} Offer</H5>
                    <PSmall className="text-start text-tertiary-text-color">Pre-Market offer</PSmall>
                </div>
                <Info className="w-5 h-5 text-tertiary-action-text-color ml-auto" />
            </div>
            {/* ------------------------------------- */}
            {/* Step-1 */}
            {/* ------------------------------------- */}
            <div className={currentStep === 1 ? 'block' : 'hidden'}>
                {/* Buy/Sell Toggle */}
                <div className="flex items-center mb-4 bg-secondary-button-color w-fit rounded m-auto mt-4">
                    <div onClick={() => setIsBuy(true)}
                        className={`p-[14px] rounded transition-colors text-base text-teryiary-action-text-color cursor-pointer 
                                    ${isBuy ? 'bg-primary-button-color text-black' : ''}`}>
                        Want to Buy
                    </div>

                    <div onClick={() => setIsBuy(false)}
                        className={`p-[14px] rounded transition-colors text-base text-teryiary-action-text-color cursor-pointer 
                                    ${!isBuy ? 'bg-primary-button-color text-black' : ''}`}>
                        Want to sell
                    </div>
                </div>

                {/* Price per token */}
                <div className="bg-card-bg rounded-md p-4 mt-4">
                    <div className="flex justify-between items-center mb-2">
                        <PSmall className="text-tertiary-text-color">Price per token</PSmall>
                        {/* <div className="flex gap-1 items-center">
                                <PExtraSmall className="text-input-field-text-color">Max</PExtraSmall>
                                <PSmall className="text-primary-text-color">40k</PSmall>
                            </div> */}
                    </div>
                    <div className="flex items-center gap-2">
                        <H6 className="text-start font-bold">$</H6>
                        <input
                            type="text"
                            name="token_price"
                            value={tokenprice}
                            onChange={handleTokenPrice}
                            onKeyDown={handleKeyPress}
                            placeholder="0.000"
                            className="text-xl font-bold bg-transparent outline-none w-full"
                        />
                    </div>
                </div>

                {/* Desired Amount */}
                <div className="bg-card-bg rounded-md p-4 text-start mt-2">
                    <PSmall className="text-tertiary-text-color">Desired Amount you {isBuy ? 'buy' : 'sell'}</PSmall>
                    <div className="flex items-center justify-between mt-4">
                        <input
                            type="text"
                            name="desired-amt"
                            value={desiredAmount}
                            onChange={handleDesiredAmount}
                            onKeyDown={handleKeyPress}
                            placeholder="0.000"
                            className="text-xl font-bold bg-transparent outline-none w-3/4"
                        />
                        <Button variant="ghost" className="p-1">
                            <Image src={token.image ? token.image : '/media/token-img.png'} alt="token-icon" height={20} width={20} className="rounded-full" />
                            {token.symbol}
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-center py-2">
                    <PremarketSvg className="text-secondary-text-color" />
                </div>
                {/* Collateral */}
                <div className="bg-card-bg rounded-md p-4">
                    <div className="flex justify-between items-center mb-2 text-tertiary-text-color">
                        <PSmall>Collateral</PSmall>
                        <PSmall className="flex gap-1">Bal. {balance}</PSmall>
                    </div>
                    <div className="flex items-center justify-between text-start mt-4">
                        <H6>{collateralAmount}</H6>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="py-2 px-3 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer gap-2">
                                <Image src={collateralToken.icon} alt={collateralToken.symbol} height={20} width={20} className="rounded-full" />
                                {collateralToken.symbol}
                                {/* <IoIosArrowDown className='ms-2' /> */}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-secondary-button-color w-40 rounded-md">
                                <DropdownMenuSeparator />
                                {
                                    collateralTokens.map((coll, i) => {
                                        return (
                                            <DropdownMenuItem
                                                key={i}
                                                onClick={() => {
                                                    onCollateralChange(coll)
                                                }}
                                                className={`capitalize flex items-center gap-2`}
                                            >
                                                <Image src={coll.icon ?? ''} alt="token-icon" height={20} width={20} className="rounded-full" />
                                                {coll.symbol}
                                            </DropdownMenuItem>
                                        )
                                    })
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <PExtraSmall>~ ${Number(tokenprice) * Number(desiredAmount)}</PExtraSmall>
                </div>

                {/* Select Type */}
                <div className="flex items-center justify-between gap-2 py-4">
                    <PSmall className="text-secondary-text-color" >Select the Type</PSmall>
                    <Info className="w-5 h-5" />
                </div>
                <RadioGroup value={orderType} onValueChange={setOrderType}>
                    <div className="flex items-center space-x-3">
                        <RadioGroupItem value="full" id="full" />
                        <PMedium className="text-primary-text-color">Full</PMedium>
                    </div>
                    <div className="flex items-center space-x-3">
                        <RadioGroupItem value="partial" id="partial" />
                        <PMedium className="text-primary-text-color">Partial</PMedium>
                    </div>
                </RadioGroup>
            </div>

            {/* Warning Message */}
            {
                isError &&
                <div className="flex items-center gap-2 text-warning-text bg-surface-warning w-fit mt-5 m-auto p-1 rounded">
                    <AlertTriangle className="w-4 h-4" />
                    <PSmall>The offer value must exceed $10.</PSmall>
                </div>
            }



            {/* ------------------------------------- */}
            {/* Step 2 */}
            {/* ------------------------------------- */}
            <div className={`text-primary-text-color space-y-4 px-1 ${currentStep === 2 ? 'block' : 'hidden'}`}>
                <div className="flex items-cente justify-between mt-6">
                    <PMedium>Offer type</PMedium>
                    {
                        isBuy ?
                            <Badge variant="positive">Want to Buy</Badge>
                            :
                            <Badge variant="negative">Want to Sell</Badge>
                    }
                </div>
                <div className="flex items-center justify-between">
                    <PMedium>Price</PMedium>
                    <PMedium>$ {tokenprice}</PMedium>
                </div>
                <div className="flex items-center justify-between">
                    <PMedium>Amount</PMedium>
                    <PMedium>{desiredAmount} <span className="text-tertiary-text-color text-xs">{token.symbol}</span></PMedium>
                </div>
                <div className="flex items-center justify-between">
                    <PMedium>For</PMedium>
                    <PMedium>{collateralAmount} <span className="text-tertiary-text-color text-xs">APT</span></PMedium>
                </div>
                <div className="flex items-center justify-between">
                    <PMedium>Fill Type</PMedium>
                    <Badge variant="outline">{isFullMatch ? 'Full' : 'Partial'}</Badge>
                </div>
                {/* <div className="flex items-center gap-3 mt-6">
                    <Checkbox id="confirm-order" className="cursor-pointer" />
                    <PSmall className="text-start leading-5">Confirm that you want to {isBuy ? 'buy' : 'sell'} {desiredAmount} {token.symbol} for {collateralAmount} APT IN Pre-market.</PSmall>
                </div> */}
            </div>

            <div className="flex justify-between">
                {/* Step 1 Buttons */}
                {currentStep === 1 && (
                    <Button onClick={() => handleNextClick()} className="w-full mt-4" disabled={!collateralAmount || !tokenprice || !desiredAmount}>Next</Button>
                )}

                {/* Step 2 Buttons */}
                {currentStep === 2 && (
                    <div className="flex items-center justify-between gap-4 mt-6 w-full">
                        <Button variant="ghost" className="flex-1" onClick={() => setCurrentStep(1)}>Back</Button>
                        {
                            account ?
                                <Button className="flex-1" onClick={() => createOffer()}>Confirm</Button>
                                :
                                <WalletSelector />
                        }
                    </div>
                )}
            </div>
        </div>
        // </div>
    )
}
