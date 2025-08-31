'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Dispatch, SetStateAction } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
interface FilterProps {
    sortOrder: string;
    network: number;
    setSortOrder: Dispatch<SetStateAction<string>>
    setNetwork: Dispatch<SetStateAction<number>>
    setDebounce: Dispatch<SetStateAction<string>>
    debounce: string;
    isLoading: boolean;
}

export default function Filters({ setSortOrder, setNetwork, setDebounce, debounce, isLoading, sortOrder, network }: FilterProps) {
    const networks = [
        {
            chain: 0,
            name: 'Aptos'
        },
        {
            chain: 1,
            name: 'Solana'
        },
        {
            chain: 2,
            name: 'Ethereum'
        }
    ]
    return (
        <div className="flex gap-4 items-center">
            {/* sortby */}
            <DropdownMenu>
                <DropdownMenuTrigger className="py-3.5 px-4 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer">
                    Sort<IoIosArrowDown className='ms-2' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSortOrder('desc')} className={`capitalize ${sortOrder === 'desc' ? 'bg-primary-button-color text-action-text-color' : ''} `}>Latest</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOrder('asc')} className={`capitalize ${sortOrder === 'asc' ? 'bg-primary-button-color text-action-text-color' : ''} `}>Older</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* network */}
            <DropdownMenu>
                <DropdownMenuTrigger className="py-3.5 px-4 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer">
                    Network <IoIosArrowDown className='ms-2' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    {
                        networks.map((n, i) => {
                            return (
                                <DropdownMenuItem key={i}
                                    onClick={() => setNetwork(n.chain)}
                                    className={`capitalize ${network === n.chain ? 'bg-primary-button-color text-action-text-color' : ''} `}
                                >
                                    {n.name}
                                </DropdownMenuItem>
                            )
                        })
                    }
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Search */}
            <div className="flex items-center gap-2 bg-card-bg text-input-field-text-color rounded px-2 md:px-4.5 w-full">
                <div className=""><LuSearch className="text-tag-stroke-color h-5 w-5" /></div>
                <div className="w-fit md:w-full overflow-hidden">
                    <input
                        type="text"
                        value={debounce}
                        onChange={(e) => setDebounce(e.target.value)}
                        placeholder="Search by token name"
                        className="pe-4 py-3 focus:outline-none"
                    />
                </div>
                {
                    isLoading &&
                    <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                }
            </div>
        </div>
    )
}