'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Dispatch, SetStateAction, useMemo } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
export type SortOrder = "asc" | "desc"
interface FilterProps {
    sortOrder: SortOrder;
    network: number;
    setSortOrder: Dispatch<SetStateAction<SortOrder>>
    setNetwork: Dispatch<SetStateAction<number>>
    setDebounce: Dispatch<SetStateAction<string>>
    debounce: string;
    isLoading: boolean;
}

export default function Filters({ setSortOrder, setNetwork, setDebounce, debounce, isLoading, sortOrder, network }: FilterProps) {
    const networks = useMemo(() => [
        { chain: 4, name: 'All' },
        { chain: 0, name: 'Aptos' },
        { chain: 1, name: 'Solana' },
        { chain: 2, name: 'Ethereum' }
    ], []);

    return (
        <div className="flex gap-2 md:gap-4 items-center">
            {/* sortby */}
            <DropdownMenu>
                <DropdownMenuTrigger className="p-2 md:py-3.5 md:px-4 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer">
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
                <DropdownMenuTrigger className="p-2 md:py-3.5 md:px-4 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer">
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
                <div className=""><LuSearch className="text-tag-stroke-color h-4 w-4 md:h-5 md:w-5" /></div>
                <div className="w-fit md:w-full overflow-hidden">
                    <input
                        type="text"
                        value={debounce}
                        onChange={(e) => setDebounce(e.target.value)}
                        placeholder="Search by token name"
                        className="pe-4 py-2 md:py-3.5 focus:outline-none w-full"
                    />
                </div>

                {isLoading && (
                    <div className="animate-spin border-2 border-gray-300 border-t-blue-500 rounded-full h-4 w-4" />
                )}
            </div>
        </div>
    )
}