"use client"
import { ChangeEvent, useState } from "react"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { H5, H6, PExtraSmall, PMedium, PSmall } from "@/components/ui/typography"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { IoIosArrowDown } from "react-icons/io"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { PremarketSvg } from "@/components/icons/icons"
import { Badge } from "@/components/ui/badge"
import { useWallet, InputTransactionData, } from "@aptos-labs/wallet-adapter-react";
import { toast } from "sonner"
import aptosClient from "@/lib/aptos"
import { Token } from "@/types/premarket"
import { moduleAddress } from "@/utils/env"

interface CreateOfferModalProps {
    isOpen: boolean
    onClose: () => void
    token: Token
    tokenAddr: string;
}

export default function CreateOfferModal({ isOpen, onClose, token, tokenAddr }: CreateOfferModalProps) {
    const { account, signAndSubmitTransaction } = useWallet();
    const [isBuy, setIsBuy] = useState(true);
    const [tokenprice, setTokenPrice] = useState<string>('');
    const [desiredAmount, setDesiredAmount] = useState('')
    const [collateralAmount, setCollateralAmount] = useState(0);
    const [acturalPrice, setActuralPrice] = useState(0);
    const [selectedCollateral, setSelectedCollateral] = useState("APT")
    const [orderType, setOrderType] = useState<string>("full");
    const isFullMatch = orderType === "full"; // boolean
    const [currentStep, setCurrentStep] = useState(1);

    const aptAddress = '0xa'
    const Aptprice = 5; // in USD

    const handleTokenPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const token_price = Number(e.target.value);
        setTokenPrice(token_price.toString());

        const actualPrice = token_price / Aptprice;
        setActuralPrice(actualPrice);

        const collateral = actualPrice * Number(desiredAmount || 0);
        setCollateralAmount(collateral);
    };

    const handleDesiredAmount = (e: ChangeEvent<HTMLInputElement>) => {
        const d_amount = Number(e.target.value);
        setDesiredAmount(d_amount.toString());

        const collateral = d_amount * acturalPrice;
        setCollateralAmount(collateral);
    };

    if (!isOpen) return null
    const tokens = [
        { name: "APT", icon: "/media/token-img.png", address: "0xa" },
        { name: "USDT", icon: "/media/token-img.png", address: "0xa" },
        { name: "USDC", icon: "/media/token-img.png", address: "0xa" },
    ]

    const getselectedCollateral = () => {
        const selected = tokens.find(token => token.name === selectedCollateral)
        return selected ? selected.name : "Select Network"
    }

    const goToNextStep = () => {
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const createOffer = async () => {
        if (!account) return [];

        const price = (Number(tokenprice) / Aptprice) * Math.pow(10, 8);
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
                        aptAddress
                    ]
                    //                     [
                    //     "0x123e617d3a10c3191ed79b0316ec9e409c65d11c93b970c5e3216142c8ae8f51",
                    //     "1",
                    //     "1",
                    //     "false",
                    //     "true",
                    //     "0xa"
                    // ]
                }
            }
            // sign and submit transaction to chain
            const response = await signAndSubmitTransaction(transaction);
            // wait for transaction
            await aptosClient.waitForTransaction({ transactionHash: response.hash });
            // setAccountHasList(true);
            toast.success('offer created')
        } catch (error: any) {
            console.log(error);
            toast.error(`${error} failed to create offer`)
            // setAccountHasList(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-90">
            <div className="bg-bottom-layer-2 rounded-2xl w-full max-w-lg 2xl:max-w-md mx-auto py-4 px-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <Badge variant="outline">Step {currentStep}/2</Badge>
                    <Button variant="modal" onClick={onClose} className="cursor-pointer text-tertiary-action-text-color">Esc</Button>
                </div>
                <div className="flex items-center gap-2 mt-4">
                    <div className="space-y-2">
                        <H5 className="text-primary-text-color">Create CTK Offer</H5>
                        <PSmall className="text-start text-tertiary-text-color">Points-Market offer</PSmall>
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
                            <div className="flex gap-1 items-center">
                                <PExtraSmall className="text-input-field-text-color">Max</PExtraSmall>
                                <PSmall className="text-primary-text-color">40k</PSmall>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <H6 className="text-start font-bold">$</H6>
                            <input
                                type="string"
                                name="token_price"
                                value={tokenprice}
                                onChange={handleTokenPrice}
                                placeholder="0.000"
                                className="text-xl font-bold bg-transparent outline-none w-full"
                            />
                        </div>
                    </div>

                    {/* Desired Amount */}
                    <div className="bg-card-bg rounded-md p-4 text-start mt-2">
                        <PSmall className="text-tertiary-text-color">Desired Amount you buy</PSmall>
                        <div className="flex items-center justify-between mt-4">
                            <input
                                type="text"
                                name="desired-amt"
                                value={desiredAmount}
                                // onChange={(e) => setDesiredAmount(e.target.value)}
                                onChange={handleDesiredAmount}
                                placeholder="0.000"
                                className="text-xl font-bold bg-transparent outline-none w-3/4"
                            />
                            <Button variant="ghost" className="p-1">
                                <Image src="/media/token-img.png" alt="token-icon" height={20} width={20} className="rounded-full" />
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
                            <PSmall>Bal. 0</PSmall>
                        </div>
                        <div className="flex items-center justify-between text-start mt-4">
                            <H6>{collateralAmount}</H6>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="focus:outline-none">
                                    <Button variant="ghost" className="p-1">
                                        <Image src="/media/token-img.png" alt="token-icon" height={20} width={20} className="rounded-full" />
                                        {getselectedCollateral()} <IoIosArrowDown />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-secondary-button-color py-2 rounded-md w-40">
                                    <DropdownMenuRadioGroup value={selectedCollateral} onValueChange={setSelectedCollateral}>
                                        {tokens.map((token) => (
                                            <DropdownMenuRadioItem key={token.name} value={token.name} className="py-2 px-6 hover:bg-card-bg flex gap-2 items-center">
                                                <Image src={token.icon} alt="token-icon" height={20} width={20} className="rounded-full" />
                                                {token.name}
                                            </DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
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
                    {/* <div className="flex items-center justify-between">
                        <PMedium>Fee</PMedium>
                        <PMedium>2.5 <span className="text-tertiary-text-color text-xs">CTK</span></PMedium>
                    </div> */}
                    <div className="flex items-center justify-between">
                        <PMedium>Fill Type</PMedium>
                        <Badge variant="outline">{isFullMatch ? 'Full' : 'Partial'}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-6">
                        <Checkbox id="confirm-order" className="cursor-pointer" />
                        <PSmall className="text-start leading-5">Confirm that you want to {isBuy ? 'buy' : 'sell'} {desiredAmount} {token.symbol} for {collateralAmount} APT IN Pre-market.</PSmall>
                    </div>
                </div>

                <div className="flex justify-between">
                    {/* Step 1 Buttons */}
                    {currentStep === 1 && (
                        <Button onClick={goToNextStep} className="w-full mt-4">Next</Button>
                    )}

                    {/* Step 2 Buttons */}
                    {currentStep === 2 && (
                        <div className="flex items-center justify-between gap-4 mt-6 w-full">
                            <Button variant="ghost" className="flex-1" onClick={goToPreviousStep}>Back</Button>
                            <Button className="flex-1" onClick={() => createOffer()}>Confirm</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
