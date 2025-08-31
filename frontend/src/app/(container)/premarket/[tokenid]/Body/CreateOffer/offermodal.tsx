"use client"
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { H5, H6, PExtraSmall, PMedium, PSmall } from "@/components/ui/typography"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { IoIosArrowDown } from "react-icons/io"
import Image from "next/image"
import { PremarketSvg } from "@/components/icons/icons"
import { Badge } from "@/components/ui/badge"
import { useWallet, InputTransactionData, } from "@aptos-labs/wallet-adapter-react";
import { toast } from "sonner"
import aptosClient from "@/lib/aptos"
import { Token } from "@/types/premarket"
import { moduleAddress } from "@/utils/env"
import { WalletSelector } from "@/components/connectwallet"
import WalletBalance from "@/components/WalletBalance"
import { collateral_assets, collateralProps } from "@/utils/constants"
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

interface CreateOfferModalProps {
    token: Token
    tokenAddr: string;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}
export default function CreateOfferModal({ open, setOpen, token, tokenAddr }: CreateOfferModalProps) {
    const { account, signAndSubmitTransaction } = useWallet();
    const [isBuy, setIsBuy] = useState(true);
    const [tokenprice, setTokenPrice] = useState<string>('');
    const [desiredAmount, setDesiredAmount] = useState('')
    const [collateralAmount, setCollateralAmount] = useState(0);
    const [acturalPrice, setActuralPrice] = useState(0);
    // const [selectedCollateral, setSelectedCollateral] = useState("APT")
    const [selectedCollateral, setSelectedCollateral] = useState<collateralProps>(collateral_assets[0])
    const [orderType, setOrderType] = useState<string>("full");
    const isFullMatch = orderType === "full"; // boolean
    const [currentStep, setCurrentStep] = useState(1);

    const priceInUsd = selectedCollateral.usdPrice; // in USD

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

    // const handleTokenPrice = (e: ChangeEvent<HTMLInputElement>) => {
    //     const token_price = Number(e.target.value);
    //     setTokenPrice(token_price.toString());

    //     const actualPrice = token_price / Aptprice;
    //     setActuralPrice(actualPrice);

    //     const collateral = actualPrice * Number(desiredAmount || 0);
    //     setCollateralAmount(collateral);
    // };

    // const handleDesiredAmount = (e: ChangeEvent<HTMLInputElement>) => {
    //     const d_amount = Number(e.target.value);
    //     setDesiredAmount(d_amount.toString());

    //     const collateral = d_amount * acturalPrice;
    //     setCollateralAmount(collateral);
    // };


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

        const price = (Number(tokenprice) / priceInUsd) * Math.pow(10, (selectedCollateral.decimals || 0) );
        const amount = Number(desiredAmount) * 10000

        try {

            const transaction: InputTransactionData = {
                data: {
                    function: `${moduleAddress}::premarket::create_offer_entry`,
                    typeArguments: [],
                    functionArguments: [
                        tokenAddr,
                        price,
                        amount,
                        isBuy,
                        isFullMatch,
                        selectedCollateral.address
                    ]
                }
            }
            // sign and submit transaction to chain
            const response = await signAndSubmitTransaction(transaction);
            // wait for transaction
            await aptosClient.waitForTransaction({ transactionHash: response.hash });
            toast.success('offer created successfully')
            setOpen(!open)
        } catch (error: any) {
            console.log(error);
            toast.error(`${error} failed to create offer`)
        }
    };

    return (
        <div className="bg-bottom-layer-2 rounded-2xl w-full py-4 px-5 mt-0">
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
                        <PSmall className="flex gap-1">Bal. <WalletBalance /></PSmall>
                    </div>
                    <div className="flex items-center justify-between text-start mt-4">
                        <H6>{collateralAmount}</H6>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="py-2 px-3 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer gap-2">
                                <Image src={selectedCollateral.icon ?? ''} alt="token-icon" height={20} width={20} className="rounded-full" />
                                {selectedCollateral.symbol}
                                <IoIosArrowDown className='ms-2' />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-secondary-button-color w-40 rounded-md">
                                <DropdownMenuSeparator />
                                {
                                    collateral_assets.map((coll, i) => {
                                        return (
                                            <DropdownMenuItem
                                                key={i}
                                                onClick={() => {
                                                    setSelectedCollateral(coll)
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
                    <Button onClick={() => setCurrentStep(2)} className="w-full mt-4" disabled={!collateralAmount || !tokenprice || !desiredAmount}>Next</Button>
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
