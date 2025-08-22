'use client';
import { LuWalletMinimal } from 'react-icons/lu';
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { PExtraSmall } from './ui/typography';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
// import { RxExit } from 'react-icons/rx';
import { Button } from './ui/button';
export default function ConnectWallet() {
    const [isOpen, setIsOpen] = useState(false);

    const wallets = [
        {
            name: 'Petra',
            icon: '🦊',
            description: 'Connect to your Petra wallet',
            popular: true
        },
        {
            name: 'Martian',
            icon: '🔗',
            description: 'Martian wallet'
        },
        {
            name: 'Phontem',
            icon: '🔵',
            description: 'Connect to your phontem Wallet'
        },
    ];

    return (
        <>
            {/* Trigger Button */}
            <Button onClick={() => setIsOpen(true)} className='p-3 md:px-4 md:py-3'>
                <span className="hidden md:block">Connect Wallet </span>
                <LuWalletMinimal className='md:ms-2' />
            </Button>

            {/* On Wallet connected */}
            {/* <div className="">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className='rounded-lg'>OX6...S125S <LuWalletMinimal className='ms-2' /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-secondary-button-color py-2 rounded-md shadow-lg mt-1">
                        <DropdownMenuGroup>
                                <DropdownMenuItem className='py-2 px-6 hover:bg-card-bg text-sm flex gap-2 items-center cursor-pointer focus:outline-none focus:ring-0'>Disconnect Wallet <RxExit /></DropdownMenuItem>
                                <DropdownMenuItem className='py-2 px-6 hover:bg-card-bg text-sm flex gap-2 items-center cursor-pointer focus:outline-none focus:ring-0'>Dashboard</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div> */}


            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Connect Wallet</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <CgClose className='text-2xl' />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <p className="text-gray-600 text-sm mb-6">
                                Choose how you want to connect. There are several wallet providers.
                            </p>

                            {/* Wallet Options */}
                            <div className="space-y-3">
                                {wallets.map((wallet, index) => (
                                    <button
                                        key={index}
                                        // onClick={() => handleWalletConnect(wallet.name)}
                                        className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                                                {wallet.icon}
                                            </div>
                                            <div className="text-left">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-900">{wallet.name}</span>
                                                    {wallet.popular && (
                                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                            Popular
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600">{wallet.description}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <PExtraSmall className="text-xs text-gray-500 text-center">
                                    New to Crypto?{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                                        Learn more about wallets
                                    </a>
                                </PExtraSmall>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}