'use client'

import { useUserSession } from '@/hooks/useUserSession'
import { User } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import { ToggleThemeButton } from '@/components/ui/button/ToggleThemeButton'
import { IsUserAdmin } from '@/components/auth/IsUserAdmin'

export const Header = ({ initialUser }: { initialUser: User | null }) => {
    const user = useUserSession(initialUser)
    return (
        <header className="absolute top-0 h-20 w-screen z-50 bg-bgColor_muted flex justify-end">
            <div className="w-1/3 flex items-center justify-start md:ml-5 md:w-1/3">
                <Link href={'/'} className="text-2xl font-bold text-fgColor_default">
                    Cognitive Lab
                </Link>
            </div>
            <div className="w-2/3 flex justify-center items-center">
                <Link className="hover:underline text-fgColor_default text-xl font-semibold px-6" href={'/exercises'}>
                    Aufgaben
                </Link>
                <Link className="hover:underline text-fgColor_default text-xl font-semibold px-6" href={'/wiki'}>
                    Wiki
                </Link>
                <IsUserAdmin>
                    <Link className="hover:underline text-fgColor_default text-xl font-semibold px-6" href={'/users'}>
                        Users
                    </Link>
                </IsUserAdmin>
            </div>
            <div className="flex h-full items-center mr-5 w-1/3 justify-end">
                <ToggleThemeButton />
                {user ? (
                    <Link className="flex items-center" href={`/users/${user.uid}`}>
                        <p className="ml-6 mr-4 text-fgColor_default">{user.displayName}</p>
                        {user.photoURL && (
                            <Image
                                width={48}
                                height={48}
                                className="w-10 h-10 rounded-full"
                                src={user.photoURL}
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
        </header>
    )
}
