'use client'

import { PLarge } from '@/components/typography'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className='bg-[#9FE878] px-6 py-4 mb-4 rounded-xl w-full'>
            {/* Desktop and Mobile Top Bar */}
            <div className='flex items-center justify-between'>
                <Link href={"/"}>
                    <Image src={"/logo.svg"} height={52} width={52} alt='' />
                </Link>

                {/* Desktop Menu */}
                <div className='hidden md:flex gap-8'>
                    <Link href={"#solution"}>
                        <PLarge>
                            Features
                        </PLarge>
                    </Link>
                    <Link href={"https://discord.gg/5ZsvF3vvTe"} target='_blank'>
                        <PLarge>
                            Contact Us
                        </PLarge>
                    </Link>
                    <PLarge className='pointer-events-none opacity-50'>
                        Docs (Coming soon...)
                    </PLarge>
                </div>

                {/* Desktop CTA Button */}
                <button className='hidden md:block px-5 py-2 cursor-pointer border-2 rounded-2xl bg-white border-black'
                    style={{ boxShadow: "0 2px 0 0 #000" }}>
                    <PLarge weight='medium'>Join Now</PLarge>
                </button>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleMenu}
                    className='md:hidden cursor-pointer flex flex-col justify-center items-center w-8 h-8 space-y-1'
                    aria-label="Toggle menu"
                >
                    <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className='pt-4 space-y-4'>
                    <Link href={"#solution"} onClick={() => setIsMenuOpen(false)} className='block'>
                        <PLarge>
                            Features
                        </PLarge>
                    </Link>
                    <Link href={"https://discord.gg/5ZsvF3vvTe"} target='_blank' onClick={() => setIsMenuOpen(false)} className='block'>
                        <PLarge>
                            Contact Us
                        </PLarge>
                    </Link>
                    <div className='block'>
                        <PLarge className='pointer-events-none opacity-50'>
                            Docs (Coming soon...)
                        </PLarge>
                    </div>
                    <button
                        className='w-full px-5 py-2 cursor-pointer border-2 rounded-2xl bg-white border-black mt-4'
                        style={{ boxShadow: "0 2px 0 0 #000" }}
                    >
                        <PLarge weight='medium'>Join Now</PLarge>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Header