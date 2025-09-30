import Section from '@/components/section'
import { H2, PLarge, PXLarge, PXXLarge, Tagline } from '@/components/typography'
import React from 'react'
import { LiaAngrySolid } from 'react-icons/lia'
import { MdOutlineOutlet, MdOutlineSick } from 'react-icons/md'
import { PiSmileySad } from 'react-icons/pi'

const Problem = () => {
    return (
        <Section className='space-y-20'>
            <div>
                <Tagline>Problem</Tagline>
                <H2>
                    Web3 token access is <br /> broken
                </H2>
                <PXLarge weight='regular'>
                    Fragmented platforms. Risky OTC trades. Bots everywhere. <br />
                    Most users miss early access or get burned trying.
                </PXLarge>
            </div>

            {/* Problem Cards */}
            <div className='max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-11 mx-auto'>
                <div className='p-6 md:p-8 flex gap-2  lg:min-w-sm w-full text-left bg-[#FEFBE7] rounded-[40px] flex-col'>
                    <MdOutlineOutlet size={40} color='#C4A000' />
                    <PXXLarge weight='medium'>Points are locked.</PXXLarge>
                    <PXLarge weight='regular'>You earn them, but can’t use or trade them.</PXLarge>
                </div>
                <div className='p-6 md:p-8 flex gap-2 lg:min-w-sm w-full text-left bg-[#F4E7FE] rounded-[40px] flex-col'>
                    <MdOutlineSick size={40} color='#A171FF' />
                    <PXXLarge weight='medium'>Premarket is sketchy.</PXXLarge>
                    <PXLarge weight='regular'>OTC deals often rely on trust. Scams are everywhere.</PXLarge>
                </div>
                <div className='p-6 md:p-8 flex gap-2  lg:min-w-sm w-full text-left bg-[#FEE7FB] rounded-[40px] flex-col'>
                    <LiaAngrySolid size={40} color='#D70DBC' />
                    <PXXLarge weight='medium'>Launches are chaotic.</PXXLarge>
                    <PXLarge weight='regular'>Price volatility, zero control, no visibility.</PXLarge>
                </div>
                <div className='p-6 md:p-8 flex gap-2  lg:min-w-sm w-full text-left bg-[#E7F7FE] rounded-[40px] flex-col'>
                    <PiSmileySad size={40} color='#1CA6EC' />
                    <PXXLarge weight='medium'>Points are locked.</PXXLarge>
                    <PXLarge weight='regular'>You earn them, but can’t use or trade them.</PXLarge>
                </div>
            </div>
        </Section>
    )
}

export default Problem
