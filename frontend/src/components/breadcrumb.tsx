'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import { PMedium } from './ui/typography';

export default function BreadCrumb() {
    const pathname = usePathname();

    const routeMap: { [key: string]: string } = {
        '/premarket': 'Pre Market',
        '/points': 'Points',
        '/launchpad': 'Launchpad',
        '/dashboard': 'Dashboard',
    };

    const base = Object.keys(routeMap).find((basePath) =>
        pathname.startsWith(basePath + '/')
    );

    if (!base) return null;

    return (
        <Link href={base}>
            <PMedium className="flex gap-2 items-center cursor-pointer">
                <IoArrowBack className="text-xl" />
                {routeMap[base]}
            </PMedium>
        </Link>
    );
}


