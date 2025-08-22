import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function Logo(){
     const { theme } = useTheme()
    return(
        <div className="bg-logo-surface p-2 rounded-xl">
            {
                theme === 'dark' ?
                <Link href="/"><Image src="/media/logo-dark.svg" alt="logo" height={500} width={500} className={`h-8 w-8 transition-all duration-300 `} /></Link>
                :
                <Link href="/"><Image src="/media/logo-light.svg" alt="logo" height={500} width={500} className={`h-8 w-8 transition-all duration-300 `} /></Link>
            }
        </div>
    )
}