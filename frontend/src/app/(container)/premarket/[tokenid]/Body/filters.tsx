import { Button } from "@/components/ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { IoIosArrowDown } from "react-icons/io";
import { LuFilter } from "react-icons/lu";

export default function Filters() {
    return (
        <>
            <Button variant="ghost" className="w-fit" >
                <span className="hidden sm:block">Filters</span>
                <LuFilter className="h-3 w-3"/>
            </Button>
            {/* <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger className="py-3.5 px-4 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer">
                        Floor Price <IoIosArrowDown className='ms-2' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>All</DropdownMenuItem>
                        <DropdownMenuItem>-</DropdownMenuItem>
                        <DropdownMenuItem>-</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger className="py-3.5 px-4 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer">
                        Collateral <IoIosArrowDown className='ms-2' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>All</DropdownMenuItem>
                        <DropdownMenuItem>APT</DropdownMenuItem>
                        <DropdownMenuItem>USDT</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger className="py-3.5 px-4 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer">
                        Fill Type <IoIosArrowDown className='ms-2' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>All</DropdownMenuItem>
                        <DropdownMenuItem>Partial</DropdownMenuItem>
                        <DropdownMenuItem>Full</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div> */}
        </>
    )
}