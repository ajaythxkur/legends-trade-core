import Section from '@/components/section'
import { H1, PLarge, PXLarge } from '@/components/typography'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <Section className='relative   overflow-hidden' id='hero'>
            <div className='space-y-6'>
                <PLarge className='text-[#399F03]'>A centralized experience across decenvtralized markets.</PLarge>
                <H1 weight='regular' className='font-bold sticky z-1'>Speculate. Trade. <br /> Launch.</H1>
            </div>
            <PXLarge weight='medium' className='text-[#525450] mt-4'>Empowering your token launch journey with innovative solutions.</PXLarge>
            <button className='px-5 py-2 mt-7 cursor-pointer border-2 rounded-2xl bg-white border-black' style={{ boxShadow: "0 2px 0 0 #000" }} >
                <PLarge weight='medium'>Join Trade</PLarge>
            </button>
            <div className=' absolute top-2 left-1/2 transform pointer-events-none -translate-x-1/2 hidden md:block'>
                <Image src="/hero-bg.png" className='pointer-events-none ' height={568} width={1048} alt="" />
            </div>
            <div className=''>
                <Image src="/hero-dgrm.svg" className='pointer-events-none mx-auto ' priority height={494} width={1024} alt="" />
            </div>
        </Section>
    )
}

export default Hero
