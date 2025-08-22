"use client"

import { useState } from "react"
import { Info, ChevronDown, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"
import { PExtraSmall, PMedium, PSmall } from "@/components/ui/typography"
import { RiArrowRightDoubleFill } from "react-icons/ri"
import { LuWalletMinimal } from "react-icons/lu"
import { useDrawer } from "@/contexts/DrawerContext"
import { Badge } from "@/components/ui/badge"

interface CreateOrderProps {
    type: 'buy' | 'sell';
}

export default function CreateOrder({ type }: CreateOrderProps) {
    const { closeDrawer } = useDrawer();
    const [desiredAmount, setDesiredAmount] = useState('');
    const [collateralAmount, setCollateralAmount] = useState('');
    const [sliderValue, setSliderValue] = useState([10.64]) // 0.266/40k * 100 ≈ 10.64
    const [isMarketChartOpen, setIsMarketChartOpen] = useState(false)

    const maxAmount = 40000
    const currentCount = Math.round((sliderValue[0] / 100) * maxAmount)

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
                    <PSmall className="text-secondary-text-color">Max 40k</PSmall>
                </div>

                <div className="flex items-center justify-between mt-4 min-w-0 overflow-hidden">
                    <input
                        type="text"
                        name="desired-amt"
                        value={desiredAmount}
                        onChange={(e) => setDesiredAmount(e.target.value)}
                        placeholder="0.000"
                        className="text-xl font-bold bg-transparent outline-none w-full truncate"
                    />

                    <div className="flex items-center gap-2 flex-shrink-0 ms-2">
                        <Image
                            src="/media/token-img.png"
                            alt="token-image"
                            width={24}
                            height={24}
                            className="rounded-full w-6 h-6 object-contain"
                        />
                        <PSmall className="font-medium whitespace-nowrap">AJU</PSmall>
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
                    <PSmall className="text-secondary-text-color">Bal. 0</PSmall>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <input
                        type="text"
                        name="collateral-amt"
                        value={collateralAmount}
                        onChange={(e) => setCollateralAmount(e.target.value)}
                        placeholder="0.000"
                        className="text-xl font-bold bg-transparent min-w-0 outline-none"
                    />
                    <div className="flex items-center flex-shrink-0 gap-2">
                        <Image
                            src="/media/token-img.png"
                            alt="token-image"
                            width={24}
                            height={24}
                            className="rounded-full"
                        />
                        <PSmall className="font-medium">USDC</PSmall>
                    </div>
                </div>
            </div>

            {/* Slider Section */}
            <div className="mt-4">
                <div className="flex justify-between items-center">
                    <PExtraSmall >Select desired amount</PExtraSmall>
                    <PExtraSmall >Count {currentCount.toLocaleString()}</PExtraSmall>
                </div>
                <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={0.1} className="w-full mt-3" />
                <div className="flex justify-between text-xs text-gray-500 mt-3">
                    <PExtraSmall>0</PExtraSmall>
                    <PExtraSmall>40k</PExtraSmall>
                </div>
            </div>

            {/* Connect Wallet Button */}
            <div className="text-center mt-4">
                <Button className="m-auto w-fit">Connect Wallet <LuWalletMinimal /></Button>
            </div>

            {/* Warning Message */}
            <div className="flex items-center gap-2 text-warning-text bg-surface-warning w-fit mt-5 m-auto p-1 rounded">
                <AlertTriangle className="w-4 h-4" />
                <PSmall>The order value must exceed $10.</PSmall>
            </div>

            {/* Price Breakdown */}
            <div className="py-4">
                <div className="flex justify-between">
                    <PMedium className="text-tertiary-text-color">Price</PMedium>
                    <PMedium className="font-medium">$ 0.25</PMedium>
                </div>
                <div className="flex justify-between mt-4">
                    <PMedium className="text-tertiary-text-color">Buying</PMedium>
                    <PMedium className="font-medium">1 <span className="text-xs">AJU</span></PMedium>
                </div>
                <div className="flex justify-between mt-4">
                    <PMedium className="text-tertiary-text-color">Collateral</PMedium>
                    <PMedium className="font-medium">15 <span className="text-xs">USDC</span></PMedium>
                </div>
            </div>

            {/* Market Chart Section */}
            <div className="border-t pt-4">
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
            </div>
        </>
    )
}
