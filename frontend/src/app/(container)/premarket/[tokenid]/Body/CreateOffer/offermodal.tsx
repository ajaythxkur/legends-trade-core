"use client"
import { useState } from "react"
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

interface CreateOfferModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function CreateOfferModal({ isOpen, onClose }: CreateOfferModalProps) {
    const [offerType, setOfferType] = useState("buy")
    const [orderType, setOrderType] = useState("full")
    const [selectedCollateral, setSelectedCollateral] = useState("APT")
    const [selectedToken, setSelectedToken] = useState<string>("USDT")
    const [desiredAmount, setDesiredAmount] = useState('')
    const [currentStep, setCurrentStep] = useState(1);

    if (!isOpen) return null
    const tokens = [
        { name: "USDT", icon: "/media/token-img.png" },
        { name: "APT", icon: "/media/token-img.png" },
        { name: "SOL", icon: "/media/token-img.png" },
    ]
    const getSelectedTokenName = () => {
        const selected = tokens.find(token => token.name === selectedToken)
        return selected ? selected.name : "Select Network"
    }
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
                        <div onClick={() => setOfferType('buy')}
                            className={`p-[14px] rounded transition-colors text-base text-teryiary-action-text-color cursor-pointer 
                                    ${offerType === 'buy' ? 'bg-primary-button-color text-black' : ''}`}>
                            Want to Buy
                        </div>

                        <div onClick={() => setOfferType('sell')}
                            className={`p-[14px] rounded transition-colors text-base text-teryiary-action-text-color cursor-pointer 
                                    ${offerType === 'sell' ? 'bg-primary-button-color text-black' : ''}`}>
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
                        <H6 className="text-start font-bold mt-4">$ 0.266</H6>
                    </div>

                    {/* Desired Amount */}
                    <div className="bg-card-bg rounded-md p-4 text-start mt-2">
                        <PSmall className="text-tertiary-text-color">Desired Amount you buy</PSmall>
                        <div className="flex items-center justify-between mt-4">
                            <input
                                type="text"
                                name="desired-amt"
                                value={desiredAmount}
                                onChange={(e) => setDesiredAmount(e.target.value)}
                                placeholder="0.000"
                                className="text-xl font-bold bg-transparent outline-none w-3/4"
                            />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="py-1">
                                    <Button variant="ghost" className="p-1">
                                        <Image src="/media/token-img.png" alt="token-icon" height={20} width={20} className="rounded-full" />
                                        {getSelectedTokenName()} <IoIosArrowDown />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-secondary-button-color py-2 rounded-md w-40">
                                    <DropdownMenuRadioGroup value={selectedToken} onValueChange={setSelectedToken}>
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
                            <H6>0.266</H6>
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
                    <RadioGroup value={orderType} onValueChange={setOrderType} className="">
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
                        <Badge variant="positive">Want to buy</Badge> {/* variant="negative"  for sell */}
                    </div>
                    <div className="flex items-center justify-between">
                        <PMedium>Price</PMedium>
                        <PMedium>$ 15.65</PMedium>
                    </div>
                    <div className="flex items-center justify-between">
                        <PMedium>Amount</PMedium>
                        <PMedium>15 <span className="text-tertiary-text-color text-xs">CTK</span></PMedium>
                    </div>
                    <div className="flex items-center justify-between">
                        <PMedium>For</PMedium>
                        <PMedium>100 <span className="text-tertiary-text-color text-xs">APT</span></PMedium>
                    </div>
                    <div className="flex items-center justify-between">
                        <PMedium>Fee</PMedium>
                        <PMedium>2.5 <span className="text-tertiary-text-color text-xs">CTK</span></PMedium>
                    </div>
                    <div className="flex items-center justify-between">
                        <PMedium>Fill Type</PMedium>
                        <Badge variant="outline">Partial</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-6">
                        <Checkbox id="confirm-order" className="cursor-pointer" />
                        <PSmall className="text-start leading-5">Confirm that you want to Buy 100 CTK for 20 APT IN Pre-market.</PSmall>
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
                            <Button className="flex-1">Confirm Buy</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
