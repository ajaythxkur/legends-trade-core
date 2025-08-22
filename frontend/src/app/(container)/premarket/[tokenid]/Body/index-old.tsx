
// 'use client';
// import React, { useState } from 'react';
// import { ChevronDown } from 'lucide-react';
// import Image from 'next/image';
// import { H5, H6, PExtraSmall, PLarge, PMedium, PSmall } from '@/components/ui/typography';
// import { FaXTwitter } from 'react-icons/fa6';
// // import { SlGlobe } from 'react-icons/sl';
// import { IoCloseOutline } from 'react-icons/io5';
// import { Button } from '@/components/ui/button';
// import CreateOfferModal from './CreateOffer';
// import { PremarketSvg } from '@/components/icons/icons';
// import { useDrawer } from '@/app/contexts/DrawerContext';
// // import CreateOrder from './CreateOrder';
// import { Badge } from '@/components/ui/badge';
// import Link from 'next/link';
// import { LuGlobe } from 'react-icons/lu';
// import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { TabsContent } from '@radix-ui/react-tabs';

// interface BodyProps {
//     id: string;
// }
// export default function Body({ id }: BodyProps) {
//     const { openDrawer } = useDrawer();
//     const [activeTab, setActiveTab] = useState('Buy');
//     const [filters, setFilters] = useState({
//         floorPrice: '0.8 - 0.87',
//         sol: true,
//         full: true
//     });

//     // Mock data for offers
//     const buyoffers = Array(15).fill(null).map((_, index) => ({
//         id: index + 1,
//         offer: 500,
//         rate: 0.210,
//         for: 500,
//         price: 10.50,
//         type: 'FULL'
//     }));

//     const selloffers = Array(15).fill(null).map((_, index) => ({
//         id: index + 1,
//         offer: 500,
//         rate: 0.210,
//         for: 500,
//         price: 10.50,
//         type: 'FULL'
//     }));

//     const removeFilter = (filterType: string) => {
//         setFilters(prev => ({
//             ...prev,
//             [filterType]: filterType === 'floorPrice' ? '' : false
//         }));
//     };

//     return (
//         <>
//             {/* Header */}
//             <div className="border-b border-border-color pb-4">
//                 <div className="flex flex-wrap md:flex-nowrap items-center justify-between text-primary-text-color">
//                     <div className="flex items-center gap-3">
//                         <Image src="/media/token-img.png" alt="token-image" width={50} height={50} className="rounded-full" />
//                         <div>
//                             <H5>CTK {id}</H5>
//                             <PExtraSmall className="text-tertiary-text-color mt-1.5">CryptoKitty</PExtraSmall>
//                         </div>
//                     </div>

//                     <div className="text-center">
//                         <div className="flex items-center gap-2">
//                             <H6>$ 0.78</H6>
//                             <Badge variant="positive">+ 3.2%</Badge>
//                         </div>
//                         <PSmall className="text-tertiary-text-color mt-2">Last Price</PSmall>
//                     </div>

//                     <div className="text-center pt-4 md:pt-0">
//                         <div className="flex items-center gap-2">
//                             <PLarge>$ 300,000</PLarge>
//                             <Badge variant="negative">- 3.2%</Badge>
//                         </div>
//                         <PSmall className="text-sm text-tertiary-text-color">24h Volume</PSmall>
//                     </div>

//                     <div className="text-center  mt-4 md:mt-0">
//                         <div className="flex items-center gap-2">
//                             <PLarge>$ 432,000</PLarge>
//                             <Badge variant="positive">+ 3.2%</Badge>
//                         </div>
//                         <PSmall className="text-sm text-tertiary-text-color">Total volume</PSmall>
//                     </div>

//                     <div className="text-center  mt-4 md:mt-0">
//                         <PLarge>-</PLarge>
//                         <PSmall className="text-tertiary-text-color">Settle time start</PSmall>
//                     </div>

//                     <div className="text-center mt-4 md:mt-0">
//                         <PLarge>-</PLarge>
//                         <PSmall className="text-sm text-tertiary-text-color">Settle time end</PSmall>
//                     </div>

//                     {/* Social */}
//                     <div className="flex items-center gap-3  pt-4 md:pt-0">
//                         <Link href="#" className="p-2 hover:bg-card-bg rounded-full cursor-pointer"><FaXTwitter className='text-2xl' /></Link>
//                         <Link href="#" className="p-2 hover:bg-card-bg rounded-full cursor-pointer"><LuGlobe className='text-2xl' /></Link>
//                     </div>
//                 </div>
//             </div>

//             {/* Trading Controls */}
//             <div className="mt-6 mb-8">
//                 <div className="flex flex-wrap md:flex-nowrap justify-between mb-4 overflow-x-auto scrollbar-hidden">
//                     {/* <div> */}
//                     {/* <div className="flex items-center mb-4 bg-secondary-button-color w-fit rounded">
//                             <div onClick={() => setActiveTab('Buy')}
//                                 className={`p-[14px] rounded transition-colors text-action-text-color cursor-pointer 
//                                     ${activeTab === 'Buy' ? 'bg-primary-button-color text-black' : ''}`}>Buy</div>

//                             <div onClick={() => setActiveTab('Sell')}
//                                 className={`p-[14px] rounded transition-colors text-action-text-color cursor-pointer 
//                                     ${activeTab === 'Sell' ? 'bg-primary-button-color text-black' : ''}`}>Sell</div>
//                         </div> */}
//                     <Tabs defaultValue="buy" className="mt-6 w-full">
//                         <div className="flex items-start justify-between pb-8">
//                             <div className="space-y-4 flex flex-col justify-between h-full">
//                                 <TabsList>
//                                     <TabsTrigger value="buy">Buy</TabsTrigger>
//                                     <TabsTrigger value="sell">Sell</TabsTrigger>
//                                 </TabsList>
//                                 <div className="badges flex gap-4 items-center">
//                                     <Badge variant="outline" className="flex items-center gap-2" onClick={() => removeFilter('floorPrice')}>Floor Price {filters.floorPrice}<IoCloseOutline className="w-5 h-5" /></Badge>
//                                     <Badge variant="outline" className="flex items-center gap-2" onClick={() => removeFilter('sol')}>SOL <IoCloseOutline className="w-5 h-5" /></Badge>
//                                     <Badge variant="outline" className="flex items-center gap-2" onClick={() => removeFilter('full')}>Full<IoCloseOutline className="w-5 h-5" /></Badge>
//                                 </div>
//                             </div>

//                             <div className="space-y-4">
//                                 <div className='text-end'>
//                                     {/* Create Offer Modal */}
//                                     <CreateOfferModal />

//                                     <div className="flex items-center gap-3">
//                                         <div className="flex items-center gap-2 text-action-text-color bg-secondary-button-color px-4 py-[14px] rounded font-medium">
//                                             <PMedium className="font-medium">Floor Price</PMedium>
//                                             <ChevronDown className="w-4 h-4" />
//                                         </div>
//                                         <div className="flex items-center gap-2 text-action-text-color bg-secondary-button-color px-4 py-[14px] rounded font-medium">
//                                             <PMedium className="font-medium">Collateral</PMedium>
//                                             <ChevronDown className="w-4 h-4 " />
//                                         </div>
//                                         <div className="flex items-center gap-2 text-action-text-color bg-secondary-button-color px-4 py-[14px] rounded font-medium">
//                                             <PMedium className="">Type</PMedium>
//                                             <ChevronDown className="w-4 h-4" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <TabsContent value="buy">
//                             <div className="grid gap-6 grid-cols-1 md:[grid-template-columns:repeat(auto-fit,minmax(350px,1fr))]">
//                                 {buyoffers.map((offer) => (
//                                     <div key={offer.id} className="bg-card-bg rounded-lg px-4 py-5 border-2 border-card-border-buy flex flex-col" >
//                                         <div className="flex justify-between items-start mb-4">
//                                             <div className="text-start">
//                                                 <PSmall className="text-secondary-text-color">Offer</PSmall>
//                                                 <div className="flex gap-1 items-center mt-2">
//                                                     <Image src="/media/token-image.svg" alt="token-image" width={20} height={20} className="rounded-full" />
//                                                     <PLarge>500</PLarge>
//                                                 </div>
//                                                 <PExtraSmall className="text-tertiary-text-color font-medium mt-2">$ {offer.price}</PExtraSmall>
//                                             </div>

//                                             <div className="text-center">
//                                                 <PExtraSmall className="text-tertiary-text-color font-semibold">Rate</PExtraSmall>
//                                                 <PExtraSmall className="text-info-text bg-surface-info font-semibold mt-2 p-1">$ {offer.rate}</PExtraSmall>
//                                                 <div className="mt-4 flex justify-center">
//                                                     <PremarketSvg className="text-secondary-text-color" />
//                                                 </div>
//                                             </div>

//                                             <div className="text-end">
//                                                 <PSmall className="text-secondary-text-color">For</PSmall>
//                                                 <div className="flex gap-2 items-center mt-2">
//                                                     <Image src="/media/token-image.svg" alt="token-image" width={20} height={20} className="rounded-full" />
//                                                     <PLarge>500</PLarge>
//                                                 </div>
//                                                 <PExtraSmall className="text-tertiary-text-color font-medium mt-2">$ {offer.price}</PExtraSmall>
//                                             </div>
//                                         </div>

//                                         <div className="flex items-center justify-between">
//                                             <Button variant="outline" size="xs">{offer.type}</Button>
//                                             <Button size="md" onClick={() => openDrawer(<CreateOrder type="buy" />)}>Buy</Button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </TabsContent>

//                         <TabsContent value="sell">
//                             <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(350px,1fr))]">
//                                 {selloffers.map((offer) => (
//                                     <div key={offer.id} className="bg-card-bg rounded-lg px-4 py-5 border-2 border-card-border-sell flex flex-col" >
//                                         <div className="flex justify-between items-start mb-4">
//                                             <div className="text-start">
//                                                 <PSmall className="text-secondary-text-color">Offer</PSmall>
//                                                 <div className="flex gap-1 items-center mt-2">
//                                                     <Image src="/media/token-image.svg" alt="token-image" width={20} height={20} className="rounded-full" />
//                                                     <PLarge>500</PLarge>
//                                                 </div>
//                                                 <PExtraSmall className="text-tertiary-text-color font-medium mt-2">$ {offer.price}</PExtraSmall>
//                                             </div>

//                                             <div className="text-center">
//                                                 <PExtraSmall className="text-tertiary-text-color font-semibold">Rate</PExtraSmall>
//                                                 <PExtraSmall className="text-info-text bg-surface-info font-semibold mt-2 p-1">$ {offer.rate}</PExtraSmall>
//                                                 <div className="mt-4 flex justify-center">
//                                                     <PremarketSvg className="text-secondary-text-color" />
//                                                 </div>
//                                             </div>

//                                             <div className="text-end">
//                                                 <PSmall className="text-secondary-text-color">For</PSmall>
//                                                 <div className="flex gap-2 items-center mt-2">
//                                                     <Image src="/media/token-image.svg" alt="token-image" width={20} height={20} className="rounded-full" />
//                                                     <PLarge>500</PLarge>
//                                                 </div>
//                                                 <PExtraSmall className="text-tertiary-text-color font-medium mt-2">$ {offer.price}</PExtraSmall>
//                                             </div>
//                                         </div>
//                                         <div className="flex items-center justify-between">
//                                             <Button variant="outline" size="xs">{offer.type}</Button>
//                                             <Button size="md" onClick={() => openDrawer(<CreateOrder type="sell" />)}>Sell</Button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </TabsContent>

//                     </Tabs>

//                     {/* </div> */}

//                     {/* <div className='text-end'>
//                         <CreateOfferModal />
//                         <div className="flex items-center gap-3">
//                             <div className="flex items-center gap-2 text-action-text-color bg-secondary-button-color px-4 py-[14px] rounded font-medium">
//                                 <PMedium className="font-medium">Floor Price</PMedium>
//                                 <ChevronDown className="w-4 h-4" />
//                             </div>
//                             <div className="flex items-center gap-2 text-action-text-color bg-secondary-button-color px-4 py-[14px] rounded font-medium">
//                                 <PMedium className="font-medium">Collateral</PMedium>
//                                 <ChevronDown className="w-4 h-4 " />
//                             </div>
//                             <div className="flex items-center gap-2 text-action-text-color bg-secondary-button-color px-4 py-[14px] rounded font-medium">
//                                 <PMedium className="">Type</PMedium>
//                                 <ChevronDown className="w-4 h-4" />
//                             </div>
//                         </div>
//                     </div> */}
//                 </div>
//             </div>

//             {/* Offers Grid */}
//             {/* Buy */}
//             {/* {
//                 activeTab === 'Buy' && (
//                     <div className="grid gap-6 grid-cols-1 md:[grid-template-columns:repeat(auto-fit,minmax(350px,1fr))]">
//                         {buyoffers.map((offer) => (
//                             <div key={offer.id} className="bg-card-bg rounded-lg px-4 py-5 border-2 border-card-border-buy flex flex-col" >
//                                 <div className="flex justify-between items-start mb-4">
//                                     <div className="text-start">
//                                         <PSmall className="text-secondary-text-color">Offer</PSmall>
//                                         <div className="flex gap-1 items-center mt-2">
//                                             <Image src="/media/token-image.svg" alt="token-image" width={20} height={20} className="rounded-full" />
//                                             <PLarge>500</PLarge>
//                                         </div>
//                                         <PExtraSmall className="text-tertiary-text-color font-medium mt-2">$ {offer.price}</PExtraSmall>
//                                     </div>

//                                     <div className="text-center">
//                                         <PExtraSmall className="text-tertiary-text-color font-semibold">Rate</PExtraSmall>
//                                         <PExtraSmall className="text-info-text bg-surface-info font-semibold mt-2 p-1">$ {offer.rate}</PExtraSmall>
//                                         <div className="mt-4 flex justify-center">
//                                             <PremarketSvg className="text-secondary-text-color" />
//                                         </div>
//                                     </div>

//                                     <div className="text-end">
//                                         <PSmall className="text-secondary-text-color">For</PSmall>
//                                         <div className="flex gap-2 items-center mt-2">
//                                             <Image src="/media/token-image.svg" alt="token-image" width={20} height={20} className="rounded-full" />
//                                             <PLarge>500</PLarge>
//                                         </div>
//                                         <PExtraSmall className="text-tertiary-text-color font-medium mt-2">$ {offer.price}</PExtraSmall>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <Button variant="outline" size="xs">{offer.type}</Button>
//                                     <Button size="md" onClick={() => openDrawer(<CreateOrder type="buy" />)}>Buy</Button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )
//             }
//             {
//                 activeTab === 'Sell' && (
//                     <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(350px,1fr))]">
//                         {selloffers.map((offer) => (
//                             <div key={offer.id} className="bg-card-bg rounded-lg px-4 py-5 border-2 border-card-border-sell flex flex-col" >
//                                 <div className="flex justify-between items-start mb-4">
//                                     <div className="text-start">
//                                         <PSmall className="text-secondary-text-color">Offer</PSmall>
//                                         <div className="flex gap-1 items-center mt-2">
//                                             <Image src="/media/token-image.svg" alt="token-image" width={20} height={20} className="rounded-full" />
//                                             <PLarge>500</PLarge>
//                                         </div>
//                                         <PExtraSmall className="text-tertiary-text-color font-medium mt-2">$ {offer.price}</PExtraSmall>
//                                     </div>

//                                     <div className="text-center">
//                                         <PExtraSmall className="text-tertiary-text-color font-semibold">Rate</PExtraSmall>
//                                         <PExtraSmall className="text-info-text bg-surface-info font-semibold mt-2 p-1">$ {offer.rate}</PExtraSmall>
//                                         <div className="mt-4 flex justify-center">
//                                             <PremarketSvg className="text-secondary-text-color" />
//                                         </div>
//                                     </div>

//                                     <div className="text-end">
//                                         <PSmall className="text-secondary-text-color">For</PSmall>
//                                         <div className="flex gap-2 items-center mt-2">
//                                             <Image src="/media/token-image.svg" alt="token-image" width={20} height={20} className="rounded-full" />
//                                             <PLarge>500</PLarge>
//                                         </div>
//                                         <PExtraSmall className="text-tertiary-text-color font-medium mt-2">$ {offer.price}</PExtraSmall>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                     <Button variant="outline" size="xs">{offer.type}</Button>
//                                     <Button size="md" onClick={() => openDrawer(<CreateOrder type="sell" />)}>Sell</Button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )
//             } */}
//         </>
//     );
// };



