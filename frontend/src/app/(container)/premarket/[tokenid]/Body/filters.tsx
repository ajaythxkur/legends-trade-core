import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dispatch, SetStateAction } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuFilter } from "react-icons/lu";

interface FilterProps {
    fillType: string;
    setFillType: Dispatch<SetStateAction<string>>;
    collateral: string;
    setCollateral: Dispatch<SetStateAction<string>>;
}

export default function Filters({ fillType, setFillType, collateral, setCollateral }: FilterProps) {
    const collateralTokens = [
        {
            symbol: 'APT',
            address: '0x000000000000000000000000000000000000000000000000000000000000000a',
        },
        {
            symbol: 'USDT',
            address: '0x000000000000000000000000000000000000000000000000000000000000000b',
        },
        {
            symbol: 'USDC',
            address: '0x000000000000000000000000000000000000000000000000000000000000000c',
        }
    ]
    const fillTypes = ['all', 'partial', 'full']
    return (
        <>
            {/* <Button variant="ghost" className="w-fit" >
                <span className="hidden sm:block">Filters</span>
                <LuFilter className="h-4 w-4"/>
            </Button> */}
            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger className="py-3.5 px-4 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer">
                        Collateral  <IoIosArrowDown className='ms-2' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setCollateral('all')} className={`${collateral === 'all' ? 'bg-primary-button-color text-action-text-color' : ''} `}>All</DropdownMenuItem>
                        {
                            collateralTokens.map((collateralitem, i) => {
                                return (
                                    <DropdownMenuItem
                                        key={i}
                                        onClick={() => setCollateral(collateralitem.address)}
                                        className={`${collateral === collateralitem.address ? 'bg-primary-button-color text-action-text-color' : ''} `}
                                    >
                                        {collateralitem.symbol}
                                    </DropdownMenuItem>
                                )
                            })
                        }
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger className="py-3.5 px-4 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer">
                        Fill Type: <IoIosArrowDown className='ms-2' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {
                            fillTypes.map((f, i) => {
                                return (
                                    <DropdownMenuItem
                                        key={i}
                                        onClick={() => setFillType(f)}
                                        className={`capitalize ${fillType === f ? 'bg-primary-button-color text-action-text-color' : ''} `}
                                    >
                                        {f}
                                    </DropdownMenuItem>
                                )
                            })
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}