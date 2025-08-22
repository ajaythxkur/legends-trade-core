'use client';
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LI, PMedium } from "./ui/typography";
import { ModeToggle } from "./theme-toggle";
import { PremarketSvg } from "./icons/icons";
import { useDrawer } from "@/contexts/DrawerContext";
import { PiRocketLaunchLight } from "react-icons/pi";
import { Coins } from "lucide-react";
import { RxDashboard } from "react-icons/rx";
import { IoDiamondOutline } from "react-icons/io5";
import Link from "next/link";
import Logo from "./icons/logo";



export default function Sidebar() {
    const [isMinimized, setIsMinimized] = useState(false);
    const pathname = usePathname();
    const { isVisible } = useDrawer()
    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

    // const menuitems = [
    //     { name: "Pre Market", url: "/premarket", icon: <PremarketSvg className="text-action-text-color" /> },
    //     { name: "Launch Pad", url: "/launchpad", icon: <LaunchpadSvg className="text-action-text-color" /> },
    //     { name: "Points", url: "/points", icon: <PointsSvg className="text-action-text-color" /> },
    //     { name: "Dashboard", url: "/dashboard", icon: <DashboardSvg className="text-secondary-text-color" /> },
    //     { name: "Rewards", url: "/rewards", icon: <RewardsSvg className="text-action-text-color" /> }
    // ];
    const menuitems = [
        { name: "Pre Market", url: "/premarket", icon: <PremarketSvg className="text-action-text-color" /> },
        { name: "Launch Pad", url: "/launchpad", icon: <PiRocketLaunchLight strokeWidth={1.5} className="h-4.5 w-4.5" /> },
        { name: "Points", url: "/points", icon: <Coins strokeWidth={1.5} className="h-4.5 w-4.5" /> },
        { name: "Dashboard", url: "/dashboard", icon: <RxDashboard className="h-4.5 w-4.5" /> },
        { name: "Rewards", url: "/rewards", icon: <IoDiamondOutline className="h-4.5 w-4.5" /> }
    ];

    return (
        <>
            <div className={`hidden md:flex items-center  ${isMinimized || isVisible ? 'flex-col gap-4' : 'justify-between'}`}>
                <Logo />
                <button onClick={() => { if (!isVisible) toggleSidebar(); }}
                    className={`h-6 w-6 text-gray-600 transition-colors duration-200 cursor-pointer ${isVisible ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-800'}`} disabled={isVisible} >
                    {isMinimized ? (
                        <RiArrowRightDoubleFill className="h-6 w-6 text-tertiary-action-text-color" />
                    ) : (
                        <RiArrowLeftDoubleFill className="h-6 w-6 text-tertiary-action-text-color" />
                    )}
                </button>
            </div>

            <ul className="flex justify-between md:flex-col gap-4 mt-0 md:mt-14">
                {menuitems.map((item, index) => (
                    <Link href={item.url} key={index}>
                        <LI className={`flex items-center gap-2 px-3.75 py-2.5 md:py-3 md:px-4.5 rounded-2xl rounded-bl-sm hover:bg-primary-button-color hover:text-action-text-color  transition-all duration-200 
                        ${pathname === item.url || pathname.startsWith(item.url) ? "bg-primary-button-color text-action-text-color" : "text-tertiary-text-color"}
                        ${isMinimized ? 'justify-center px-3' : ''}`}
                        >
                            <div className="flex-shrink-0">{item.icon}</div>
                            {isVisible ? '' :
                                (
                                    <PMedium className={`hidden md:block whitespace-nowrap ${isMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                                        {item.name}
                                    </PMedium>
                                )
                            }
                        </LI>
                    </Link>
                ))}
            </ul>
            <ModeToggle />
        </>
    )
}
