'use client';
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5"
import { useState, useEffect } from 'react'

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <>
            {isClient ?
                <Button className="rounded-full p-2 absolute bottom-14 md:bottom-4 right-4" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {theme == "light" ? <IoSunnyOutline /> : <IoMoonOutline />}
                </Button>
                : ''}
        </>
    )
}

