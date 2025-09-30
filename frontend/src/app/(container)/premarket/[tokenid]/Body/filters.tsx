'use client'
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { H4 } from "@/components/ui/typography";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dispatch, SetStateAction, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuFilter } from "react-icons/lu";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { collateral_assets } from "@/utils/constants";
import { testnetTokens } from "@/cross-chain-core";
import { useApp } from "@/contexts/AppProvider";

interface FilterProps {
    fillType: string;
    setFillType: Dispatch<SetStateAction<string>>;
    collateral: string;
    setCollateral: Dispatch<SetStateAction<string>>;
}

export default function Filters({ fillType, setFillType, collateral, setCollateral }: FilterProps) {
    const isMobile = useIsMobile()

    if (isMobile) return <MobileFilter fillType={fillType} setFillType={setFillType} collateral={collateral} setCollateral={setCollateral} />
    return <DesktopFilter fillType={fillType} setFillType={setFillType} collateral={collateral} setCollateral={setCollateral} />

}

const MobileFilter = ({ fillType, setFillType, collateral, setCollateral }: FilterProps) => {
    const [open, setOpen] = useState(false);
    const fillTypes = ['all', 'partial', 'full']
    return (
        <>
            <Button variant="ghost" className="p-3.5 md:hidden w-fit" onClick={() => setOpen(!open)}>
                <LuFilter className="h-4 w-4" />
            </Button>

            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent className="max-h-[80vh] bg-bottom-layer-2 scrollbar-hide px-4 overflow-y-auto pb-4">
                    <DrawerTitle>{''}</DrawerTitle>
                    <H4>Set Filter</H4>
                    <Accordion type="single" collapsible defaultValue="item-1" className="mt-4">
                        <AccordionItem value="item-1" >
                            <AccordionTrigger className="bg-bottom-layer-1 py-2 px-3">Collateral</AccordionTrigger>
                            <AccordionContent className="mt-4">
                                <RadioGroup defaultValue={collateral} onValueChange={(value) => setCollateral(value)}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value='all' id="all" />
                                        <Label htmlFor="all">All</Label>
                                    </div>
                                    {
                                        collateral_assets.map((c, i) => {
                                            return (
                                                <div key={i} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={c.address} id={c.symbol} />
                                                    <Label htmlFor={c.symbol}>{c.symbol}</Label>
                                                </div>
                                            )
                                        })
                                    }
                                </RadioGroup>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="mt-4">
                            <AccordionTrigger className="bg-bottom-layer-1 py-2 px-3">Fill Type</AccordionTrigger>
                            <AccordionContent className="mt-4">
                                <RadioGroup defaultValue={fillType} onValueChange={(value) => setFillType((value))} >
                                    {
                                        fillTypes.map((f, i) => {
                                            return (
                                                <div key={i} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={f} id={f} />
                                                    <Label htmlFor={f}>{f}</Label>
                                                </div>
                                            )
                                        })
                                    }
                                </RadioGroup>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <div className="flex mt-4 justify-center">
                        <Button onClick={() => setOpen(!open)}>Apply</Button>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}

const DesktopFilter = ({ fillType, setFillType, collateral, setCollateral }: FilterProps) => {
    const fillTypes = ['all', 'partial', 'full']
    const {sourceChain} = useApp()
    const collateralTokens = sourceChain ? testnetTokens[sourceChain] : testnetTokens["Aptos"];
    return (
        <>
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
                                        onClick={() => setCollateral(collateralitem.tokenId.address)}
                                        className={`${collateral === collateralitem.tokenId.address ? 'bg-primary-button-color text-action-text-color' : ''} `}
                                    >
                                        {collateralitem.symbol}
                                    </DropdownMenuItem>
                                )
                            })
                        }
                    </DropdownMenuContent>
                    {/* <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setCollateral('all')} className={`${collateral === 'all' ? 'bg-primary-button-color text-action-text-color' : ''} `}>All</DropdownMenuItem>
                        {
                            collateral_assets.map((collateralitem, i) => {
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
                    </DropdownMenuContent> */}
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




// import { Button } from "@/components/ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Dispatch, SetStateAction } from "react";
// import { IoIosArrowDown } from "react-icons/io";
// import { LuFilter } from "react-icons/lu";

// interface FilterProps {
//     fillType: string;
//     setFillType: Dispatch<SetStateAction<string>>;
//     collateral: string;
//     setCollateral: Dispatch<SetStateAction<string>>;
// }

// export default function Filters({ fillType, setFillType, collateral, setCollateral }: FilterProps) {
//     const collateralTokens = [
//         {
//             symbol: 'APT',
//             address: '0x000000000000000000000000000000000000000000000000000000000000000a',
//         },
//         {
//             symbol: 'USDT',
//             address: '0x000000000000000000000000000000000000000000000000000000000000000b',
//         },
//         {
//             symbol: 'USDC',
//             address: '0x000000000000000000000000000000000000000000000000000000000000000c',
//         }
//     ]
//     const fillTypes = ['all', 'partial', 'full']
//     return (
//         <>
//             <Button variant="ghost" className="md:hidden w-fit" >
//                 <LuFilter className="h-4 w-4"/>
//             </Button>

//             <div className="flex items-center gap-4">
//                 <DropdownMenu>
//                     <DropdownMenuTrigger className="py-3.5 px-4 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer">
//                         Collateral  <IoIosArrowDown className='ms-2' />
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent>
//                         <DropdownMenuItem onClick={() => setCollateral('all')} className={`${collateral === 'all' ? 'bg-primary-button-color text-action-text-color' : ''} `}>All</DropdownMenuItem>
//                         {
//                             collateralTokens.map((collateralitem, i) => {
//                                 return (
//                                     <DropdownMenuItem
//                                         key={i}
//                                         onClick={() => setCollateral(collateralitem.address)}
//                                         className={`${collateral === collateralitem.address ? 'bg-primary-button-color text-action-text-color' : ''} `}
//                                     >
//                                         {collateralitem.symbol}
//                                     </DropdownMenuItem>
//                                 )
//                             })
//                         }
//                     </DropdownMenuContent>
//                 </DropdownMenu>

//                 <DropdownMenu>
//                     <DropdownMenuTrigger className="py-3.5 px-4 bg-secondary-button-color text-action-text-color rounded flex items-center border-0 focus:outline-none cursor-pointer">
//                         Fill Type: <IoIosArrowDown className='ms-2' />
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent>
//                         {
//                             fillTypes.map((f, i) => {
//                                 return (
//                                     <DropdownMenuItem
//                                         key={i}
//                                         onClick={() => setFillType(f)}
//                                         className={`capitalize ${fillType === f ? 'bg-primary-button-color text-action-text-color' : ''} `}
//                                     >
//                                         {f}
//                                     </DropdownMenuItem>
//                                 )
//                             })
//                         }
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             </div>
//         </>
//     )
// }

