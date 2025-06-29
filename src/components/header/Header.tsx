'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ToggleThemeButton } from '@/components/ui/button/ToggleThemeButton'
import { IsUserAdmin } from '@/components/auth/IsUserAdmin'
import { User } from '@supabase/supabase-js'
import { ThreeBarsIcon } from '@primer/octicons-react'
import { useState } from 'react'

export const Header = ({ user }: { user: User | null }) => {
    const [showSideBar, setShowSideBar] = useState<boolean>(false)
    const metadata = user?.user_metadata

    return (
        <header className="absolute top-0 h-20 w-screen z-10 bg-bgColor_muted flex">
            <div className="w-full md:w-1/3 flex items-center justify-start ml-5">
                <Link href={'/'} className="text-2xl font-bold text-fgColor_default text-left w-full">
                    Cognitive Lab
                </Link>
            </div>
            <div className="w-1/3 hidden md:flex justify-center items-center">
                <Link className="hover:underline text-fgColor_default text-xl font-semibold px-4" href={'/exercises'}>
                    Aufgaben
                </Link>
                <Link className="hover:underline text-fgColor_default text-xl font-semibold px-4" href={'/wiki'}>
                    Wiki
                </Link>
                <IsUserAdmin>
                    <Link className="hover:underline text-fgColor_default text-xl font-semibold px-4" href={'/users'}>
                        Users
                    </Link>
                </IsUserAdmin>
            </div>
            <div className="hidden md:flex h-full items-center mr-5 w-1/3 justify-end">
                <ToggleThemeButton />
                {metadata ? (
                    <Link className="flex items-center" href={`/users/${metadata.sub}`}>
                        <p className="ml-6 mr-4 text-fgColor_default">
                            {metadata.firstName} {metadata.lastName}
                        </p>
                        {metadata.photo && (
                            <Image
                                width={48}
                                height={48}
                                className="w-10 h-10 rounded-full"
                                src={metadata.photo}
                                alt="user-photo"
                            />
                        )}
                    </Link>
                ) : (
                    <Link className="ml-6 text-fgColor_default" href={'/auth'}>
                        Einloggen
                    </Link>
                )}
            </div>
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 md:hidden flex"
                onClick={() => setShowSideBar((prev) => !prev)}
            >
                <ThreeBarsIcon size={24} />
            </button>
            {showSideBar && (
                <div className="absolute w-48 right-0 top-0 h-screen bg-bgColor_muted ">
                    <div className="h-1/3">
                        <button className="absolute left-4 top-8" onClick={() => setShowSideBar((prev) => !prev)}>
                            <ThreeBarsIcon size={24} />
                        </button>
                    </div>
                    <div className="flex h-1/3 flex-col">
                        <Link
                            className="mt-4 hover:underline text-fgColor_default text-xl font-semibold px-4"
                            href={'/exercises'}
                        >
                            Aufgaben
                        </Link>
                        <Link
                            className="mt-4 hover:underline text-fgColor_default text-xl font-semibold px-4"
                            href={'/wiki'}
                        >
                            Wiki
                        </Link>
                        <IsUserAdmin>
                            <Link
                                className="mt-4 hover:underline text-fgColor_default text-xl font-semibold px-4"
                                href={'/users'}
                            >
                                Users
                            </Link>
                        </IsUserAdmin>
                    </div>
                    <div className="h-1/3 flex justify-end flex-col">
                        <div className="ml-4">
                            <ToggleThemeButton />
                        </div>
                        {metadata ? (
                            <Link className="flex items-center" href={`/users/${metadata.sub}`}>
                                <p className="ml-4 mb-4 text-fgColor_default">
                                    {metadata.firstName} {metadata.lastName}
                                </p>
                            </Link>
                        ) : (
                            <Link className="ml-6 text-fgColor_default" href={'/auth'}>
                                Einloggen
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}
