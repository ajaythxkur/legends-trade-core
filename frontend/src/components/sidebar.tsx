'use client';
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LI, PMedium } from "./ui/typography";
import { ModeToggle } from "./theme-toggle";
import { useDrawer } from "@/contexts/DrawerContext";
import Link from "next/link";
import Logo from "./icons/logo";
import { Button } from "./ui/button";
import { menuitems } from "@/utils/constants";

export default function Sidebar() {
    const [isMinimized, setIsMinimized] = useState(false);
    const pathname = usePathname();
    const { isVisible } = useDrawer()
    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

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
                    <div key={index}>
                        {
                            item.disabled ?
                                <Button variant="ghost" className={`bg-transparent ${isMinimized ? 'justify-center px-3.75 py-2.5 md:py-3 md:px-4.5 ' : ''}`} disabled>
                                    {/* <div className="flex-shrink-0">{item.icon}</div> */}
                                    <item.icon size={18} />
                                    {isVisible ? '' :
                                        (
                                            <PMedium className={`hidden md:block whitespace-nowrap ${isMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                                                {item.name}
                                            </PMedium>
                                        )
                                    }
                                </Button>
                                :
                                <Link href={item.url} key={index}>
                                    <LI className={`flex items-center gap-2 px-3.75 py-2.5 md:py-3 md:px-4.5 rounded-2xl rounded-bl-sm hover:bg-primary-button-color hover:text-action-text-color  transition-all duration-200 
                        ${pathname === item.url || pathname.startsWith(item.url) ? "bg-primary-button-color text-action-text-color" : "text-tertiary-text-color"}
                        ${isMinimized ? 'justify-center px-3' : ''}`}
                                    >
                                        {/* <div className="flex-shrink-0">{item.icon}</div> */}
                                        <item.icon size={18} />
                                        {isVisible ? '' :
                                            (
                                                <PMedium className={`hidden md:block whitespace-nowrap ${isMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                                                    {item.name}
                                                </PMedium>
                                            )
                                        }
                                    </LI>
                                </Link>
                        }
                    </div>
                ))}
            </ul>
            <ModeToggle />
        </>
    )
}
