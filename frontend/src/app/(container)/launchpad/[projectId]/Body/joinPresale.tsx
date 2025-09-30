'use client';
import { Button } from "@/components/ui/button";
import { PExtraSmall, PMedium, PSmall } from "@/components/ui/typography";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa6";
import { LuPartyPopper } from "react-icons/lu";
import { Info } from "lucide-react";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { BiError } from "react-icons/bi";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
interface joinProps {
    status: boolean,
    onClose: () => void
}
export default function JoinPresale({ status, onClose }: joinProps) {
    const [sliderValue, setSliderValue] = useState([10.64]) // 0.266/40k * 100 ≈ 10.64
    const maxAmount = 40000
    const currentCount = Math.round((sliderValue[0] / 100) * maxAmount)
    return (
        <>
            <div className={`pt-4 xl:p-4 bg-bottom-layer-2 rounded-lg ${status ? 'w-full xl:shadow-lg xl:w-1/3 2xl:w-1/4' : ''}`}>
                <div className="flex items-center justify-between">
                    <Button variant="outline" size="xs" className="bg-white">Token Sale</Button>
                    <div className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-tertiary-text-color" />
                        <RiArrowRightDoubleFill className="w-5 h-5 text-tertiary-text-color cursor-pointer" onClick={onClose} />
                    </div>
                </div>

                <div className="bg-card-bg p-4 rounded-md mt-4">
                    <div className="flex justify-between items-center">
                        <PSmall className="text-tertiary-text-color">Enter  amount</PSmall>
                        <PSmall className="text-tertiary-text-color">Bal. 0</PSmall>
                    </div>

                    <div className="flex items-center justify-between mt-2 min-w-0 overflow-hidden">
                        <input
                            type="text"
                            name="desired-amt"
                            // value={desiredAmount}
                            // onChange={(e) => setDesiredAmount(e.target.value)}
                            placeholder="0.000"
                            className="text-xl font-bold bg-transparent outline-none text-text-emphasis w-full truncate"
                        />
                        <div className="flex items-center gap-2 flex-shrink-0 ms-2">
                            <Image
                                src="/media/aptos.svg"
                                alt="token-image"
                                width={24}
                                height={24}
                                className="rounded-full w-6 h-6 object-contain"
                            />
                            <PSmall className="text-secondary-text-color whitespace-nowrap">APT</PSmall>
                        </div>
                    </div>


                    <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-1">
                            <PExtraSmall className="text-tertiary-text-color">Min. limit</PExtraSmall>
                            <PSmall className="text-secondary-text-color">10 APT</PSmall>
                        </div>
                        <div className="flex items-center gap-1">
                            <PExtraSmall className="text-tertiary-text-color">Max. limit</PExtraSmall>
                            <PSmall className="text-secondary-text-color">20 APT</PSmall>
                        </div>
                    </div>
                    <PExtraSmall className="text-negative-text bg-surface-negative p-1 rounded w-fit mt-4 flex gap-1 items-center">
                        <BiError />
                        Please enter at least min. amount
                    </PExtraSmall>

                    <div className="mt-4">
                        <div className="flex justify-between items-center">
                            <PExtraSmall className="text-tertiary-text-color">Select Min. amount</PExtraSmall>
                            <PSmall>
                                <span className="text-tertiary-text-color">Count </span>
                                <span className="text-text-emphasis">{currentCount.toLocaleString()}</span>
                            </PSmall>
                        </div>
                        <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={0.1} className="w-full mt-3" />
                        <div className="flex justify-between text-xs text-gray-500 mt-3">
                            <PSmall className="text-secondary-text-color">0</PSmall>
                            <PSmall className="text-secondary-text-color">40k</PSmall>
                        </div>
                    </div>
                </div>
                <FaArrowDown className="m-auto mt-1" />

                <div className="bg-card-bg p-4 rounded-md mt-1">
                    <div className="flex justify-between items-center">
                        <PSmall className="text-tertiary-text-color">Total Token you will get</PSmall>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div className="text-xl font-bold bg-transparent outline-none text-text-emphasis">0.245</div>
                        <div className="flex items-center gap-2">
                            <Image src="/media/ido-token.png" alt="token-image" width={24} height={24} className="rounded-full" />
                            <PSmall className="text-secondary-text-color">DOG</PSmall>
                        </div>
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <Button>Join Now</Button>
                    {/* connect wallet if not connected */}
                </div>

                {/* Order Details */}
                <div className="order-detail">
                    <div className="flex justify-between text-xs text-gray-500 mt-3">
                        <PMedium className="text-primary-text-color">Price</PMedium>
                        <PMedium className="text-primary-text-color">$0.25</PMedium>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-3">
                        <PMedium className="text-primary-text-color">Buying</PMedium>
                        <PMedium className="text-primary-text-color">156 <span className="text-tertiary-text-color text-xs">DOG</span></PMedium>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-3">
                        <PMedium className="text-primary-text-color">Inexchange</PMedium>
                        <PMedium className="text-primary-text-color">15 <span className="text-tertiary-text-color text-xs">APT</span></PMedium>
                    </div>
                </div>

                {/* Success Message */}
                <PMedium className="text-positive-text bg-surface-positive rounded-md flex items-center gap-1 p-2 mt-4">
                    <LuPartyPopper className="h-6 w-6" />
                    <span>Congrats the sales has been successfully completed and hit the soft cap within the give time of Pre-Sale.</span>
                </PMedium>
            </div>
        </>
    )
}