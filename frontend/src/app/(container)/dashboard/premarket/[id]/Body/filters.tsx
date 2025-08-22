import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
export default function Filters() {
    return (
        <div className='flex gap-4'>
            {/* Type Filter */}
            <DropdownMenu>
                {/* <DropdownMenuTrigger><Button variant="ghost">Type <IoIosArrowDown className='ms-2' /></Button></DropdownMenuTrigger> */}
                 <DropdownMenuTrigger className="py-3.5 px-4 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer">
                    Type <IoIosArrowDown className='ms-2' />
                 </DropdownMenuTrigger>

                <DropdownMenuContent>
                    {/* <DropdownMenuLabel>Type <IoCloseCircleOutline className="h-5 w-5"/></DropdownMenuLabel> */}
                    <DropdownMenuLabel>Type </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>All</DropdownMenuItem>
                    <DropdownMenuItem>Buy</DropdownMenuItem>
                    <DropdownMenuItem>Sell</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Fill Type Filter */}
            {/* <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost">Fill Type <IoIosArrowDown className='ms-2' /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuTrigger className="py-3.5 px-4 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer">
                    Fill Type <IoIosArrowDown className='ms-2' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className="flex justify-between">
                        Type <IoCloseCircleOutline /></DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>All</DropdownMenuItem>
                    <DropdownMenuItem>Buy</DropdownMenuItem>
                    <DropdownMenuItem>Sell</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> */}

            {/* Status Filter */}
            <DropdownMenu>
                {/* <DropdownMenuTrigger><Button variant="ghost">Status <IoIosArrowDown className='ms-2' /></Button></DropdownMenuTrigger>*/}
                <DropdownMenuTrigger className="py-3.5 px-4 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer">
                    Status <IoIosArrowDown className='ms-2' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Status <IoCloseCircleOutline className="h-5 w-5"/></DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>All</DropdownMenuItem>
                    <DropdownMenuItem>Success</DropdownMenuItem>
                    <DropdownMenuItem>Failed</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}