import { H5, H6, PExtraSmall, PMedium, } from "@/components/ui/typography";
import Image from "next/image";
import { IoMdArrowUp } from "react-icons/io";
import { LuCopy } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import DashTabs from "./dashtabs";

export default function Body() {
    return (
        <>
            <div className="md:p-4">
                <div className="flex items-center gap-4">
                    <Image src="/media/ido-token.png" alt="user-img" height={40} width={40} />
                    <H6 className="text-primary-text-color font-bold flex gap-4 items-center">OX6...S125S <LuCopy /></H6>
                </div>

                {/* <div className="flex gap-6 justify-between mt-12"> */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 justify-between mt-6 lg:mt-8 xl:mt-10 2xl:mt-12">
                    <div className="bg-card-bg p-4 rounded-lg flex-1">
                        <PMedium className="text-tertiary-text-color">Total Trades</PMedium>
                        <H5 className="text-text-emphasis mt-[10px]">113</H5>
                        <div className="flex items-center gap-2 mt-[10px]">
                            <PExtraSmall className="text-tertiary-text-color">1 Order - 36 offer</PExtraSmall>
                        </div>
                    </div>
                    <div className="bg-card-bg p-4 rounded-lg flex-1">
                        <PMedium className="text-tertiary-text-color">Total Settled</PMedium>
                        <H5 className="text-text-emphasis mt-[10px]">113</H5>
                        <div className="flex items-center gap-2 mt-[10px]">
                            <PExtraSmall className="text-tertiary-text-color">23/36 Offer Settled</PExtraSmall>
                        </div>
                    </div>
                    <div className="bg-card-bg p-4 rounded-lg flex-1">
                        <PMedium className="text-tertiary-text-color">Total Volume</PMedium>
                        <H5 className="text-text-emphasis mt-[10px]">#15th</H5>
                        <div className="flex gap-2 items-center mt-[10px]">
                            <Badge variant="positive" className="flex gap-1 items-center"><IoMdArrowUp /> 0% </Badge>
                            <PExtraSmall className="text-tertiary-text-color">This month </PExtraSmall>
                        </div>
                    </div>
                </div>
                
                <DashTabs />
            </div>
        </>
    )
}
