import Section from '@/components/section'
import { PLarge, PSmall } from '@/components/typography'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaDiscord } from 'react-icons/fa'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { RiTwitterXFill } from 'react-icons/ri'


const Footer = () => {
    return (
        <Section rounded='rounded-t-xl' className='bg-[#9FE878] overflow-hidden mt-4 relative text-left'>
            <Image src={"/logo.svg"} height={52} width={52} alt='' />

            <div className='flex gap-3'>
                <button disabled className='p-3 mt-7 cursor-pointer border-2 rounded-2xl bg-white flex items-center justify-center border-black' style={{ boxShadow: "0 2px 0 0 #000" }} >
                    <PLarge weight='medium'><IoDocumentTextOutline size={18} /></PLarge>
                </button>
                <Link href={"https://x.com/legendsdottrade"}>
                    <button className='p-3 mt-7 cursor-pointer border-2 rounded-2xl bg-white flex items-center justify-center border-black' style={{ boxShadow: "0 2px 0 0 #000" }} >
                        <PLarge weight='medium'><RiTwitterXFill size={18} /></PLarge>
                    </button>
                </Link>
                <Link href={"https://discord.gg/5ZsvF3vvTe"}>
                    <button className='p-3 mt-7 cursor-pointer border-2 rounded-2xl bg-white flex items-center justify-center border-black' style={{ boxShadow: "0 2px 0 0 #000" }} >
                        <PLarge weight='medium'><FaDiscord size={18} /></PLarge>
                    </button>
                </Link>
            </div>


            {/* pages link */}
            <div className='mt-6 flex flex-col w-fit gap-3'>
                <Link href={"/privacy-policy"}>
                    <PSmall className='underline' style={{}}>Privacy Policy </PSmall>
                </Link>
                <Link href={"/terms-and-conditions"}>
                    <PSmall className='underline' style={{}}>Terms & conditions</PSmall>
                </Link>
            </div>

            <PSmall weight='medium' className='mt-3'>© 2025 Legends trade. All rights reserved.</PSmall>


            {/* Backgroun text */}

            <div className='lg:block hidden'>
                <h1 className='absolute pointer-events-none text-[#2F4524] right-14 top-0 text-[112px] font-bold'>Legends trade</h1>
                <h1 className='absolute pointer-events-none  text-[#2F4524] -right-10 top-1/2 transform -translate-y-1/2 opacity-70 text-[112px] font-bold'>Legends trade</h1>
                <h1 className='absolute pointer-events-none text-[#2F4524] -right-60 bottom-0 opacity-70 text-[112px] font-bold'>Legends trade</h1>
            </div>
        </Section>
    )
}

export default Footer
