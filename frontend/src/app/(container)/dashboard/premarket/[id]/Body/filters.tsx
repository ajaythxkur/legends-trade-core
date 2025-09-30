import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Dispatch, SetStateAction } from "react";
import { IoIosArrowDown } from "react-icons/io";
interface FilterProps {
    offerType: string
    setOfferType: Dispatch<SetStateAction<string>>
    offerStatus: string
    setOfferStatus: Dispatch<SetStateAction<string>>
}
export default function Filters({ offerType, setOfferType, offerStatus, setOfferStatus }: FilterProps) {
    const offertypes = ['all', 'buy', 'sell']
    const offerstatus = ['all', 'active', 'cancelled']

    return (
        <div className='flex gap-4'>
            {/* Type Filter */}
            <DropdownMenu>
                <DropdownMenuTrigger className="py-2.5 md:py-3.5 px-4 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer">
                    Type <IoIosArrowDown className='ms-2' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Type </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                        offertypes.map((o, i) => {
                            return (
                                <DropdownMenuItem
                                    key={i}
                                    onClick={() => setOfferType(o)}
                                    className={`capitalize ${offerType === o ? 'bg-primary-button-color text-action-text-color' : ''} `}
                                >
                                    {o}
                                </DropdownMenuItem>
                            )
                        })
                    }
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Filter */}
            <DropdownMenu>
                <DropdownMenuTrigger className="py-2.5 md:py-3.5 px-4 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer">
                    Status<IoIosArrowDown className='ms-2' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Status </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                        offerstatus.map((o, i) => {
                            return (
                                <DropdownMenuItem
                                    key={i}
                                    onClick={() => setOfferStatus(o)}
                                    className={`capitalize ${offerStatus === o ? 'bg-primary-button-color text-action-text-color' : ''} `}
                                >
                                    {o}
                                </DropdownMenuItem>
                            )
                        })
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}