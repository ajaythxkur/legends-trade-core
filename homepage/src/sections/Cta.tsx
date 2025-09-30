import Section from '@/components/section'
import { H1, PLarge, PXLarge } from '@/components/typography'
import Image from 'next/image'
import React from 'react'

const Cta = () => {
    return (
        <Section className='relative overflow-hidden'>
            <H1 weight='regular' className='font-bold '>
                <span className='text-[#3BA502]'>All phases.</span> One <br />hub.
            </H1>
            <PXLarge className='text-[#525450]'>Trade points, premarket, IDOs, and curve launches without leaving the <br /> platform.</PXLarge>
            <button className='px-5 py-2 mt-7 cursor-pointer border-2 rounded-2xl bg-white border-black' style={{ boxShadow: "0 2px 0 0 #000" }} >
                <PLarge weight='medium'>Browse Live Markets</PLarge>
            </button>
            <div className=' absolute top-2 left-1/2 transform pointer-events-none -translate-x-1/2 md:block hidden'>
                <Image src="/hero-bg.png" className='pointer-events-none' height={568} width={1048} alt="" />
            </div>
        </Section>
    )
}

export default Cta
