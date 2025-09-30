import { H5, H6, PExtraSmall, PMedium } from "@/components/ui/typography";
import Image from "next/image";
import { IoMdArrowUp } from "react-icons/io";
import { LuCopy } from "react-icons/lu";
import ReferModal from "./refermodal";
import { Badge } from "@/components/ui/badge";
import RewardTabs from "./rewardtabs";

export default function Body() {
    return (
        <>
            <div className="xl:p-2">
                <div className="flex flex-wrap lg:flex-nowrap justify-between">
                    <div className="flex items-center gap-4">
                        <Image src="/media/ido-token.png" alt="user-img" height={40} width={40} />
                        <H6 className="text-primary-text-color font-bold flex gap-4 items-center">OX6...S125S <LuCopy /></H6>
                    </div>

                    {/* show if wallet connected */}
                    <div className="flex gap-4 items-center ms-auto pt-3 md:pt-0">
                        <ReferModal />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 justify-between mt-6 lg:mt-8 xl:mt-10 2xl:mt-12">
                    <div className="bg-card-bg p-4 rounded-lg flex-1">
                        <PMedium className="text-tertiary-text-color">Total Referred</PMedium>
                        <H5 className="text-text-emphasis mt-[10px]">5</H5>
                        <div className="flex items-center gap-2 mt-[10px]">
                            <PExtraSmall className="text-tertiary-text-color">Total Earned </PExtraSmall>
                            <PMedium className="text-tertiary-action-text-color">125</PMedium>
                            <Image src="/media/reward-picon.svg" alt="user-img" height={24} width={24} />
                        </div>
                    </div>
                    <div className="bg-card-bg p-4 rounded-lg flex-1">
                        <PMedium className="text-tertiary-text-color">Total Engagement</PMedium>
                        <H5 className="text-text-emphasis mt-[10px]">113</H5>
                        <div className="flex items-center gap-2 mt-[10px]">
                            <PExtraSmall className="text-tertiary-text-color">Total Earned </PExtraSmall>
                            <PMedium className="text-tertiary-action-text-color">1205 </PMedium>
                            <Image src="/media/reward-picon.svg" alt="user-img" height={24} width={24} />
                        </div>
                    </div>
                    <div className="bg-card-bg p-4 rounded-lg flex-1">
                        <PMedium className="text-tertiary-text-color">Leaderboard position</PMedium>
                        <H5 className="text-text-emphasis mt-[10px]">#15th</H5>
                        <div className="flex gap-2 items-center mt-[10px]">
                            <Badge variant="positive" className="flex gap-1 items-center"><IoMdArrowUp /> 10 Spots </Badge>
                            <PExtraSmall className="text-tertiary-text-color">Climbed </PExtraSmall>
                        </div>
                    </div>
                </div>

                {/* RewardTabs */}
                <RewardTabs />

            </div>
        </>
    )
}