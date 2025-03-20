'use client'

import {useUserSession} from "@/hooks/useUserSession";
import {User} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import {ToggleThemeButton} from "@/components/ui/button/ToggleThemeButton";

export const Header = ({initialUser}: { initialUser: User | null }) => {

    const user = useUserSession(initialUser);
    return (
        <header className="absolute top-0 h-20 w-screen z-50 bg-bgColor_muted flex justify-end">
            <div className="w-2/3 flex items-center justify-start ml-5">
                <Link href={"/"} className="text-2xl font-bold text-fgColor_default">Cognitive Lab</Link>
            </div>

            <div className="flex h-full items-center mr-5 w-1/3 justify-end">
                <ToggleThemeButton/>
                {user ?
                    <Link className="flex items-center" href={`/users/${user.uid}`}>
                        <p className="ml-6 mr-4 text-fgColor_default">
                            {user.displayName}
                        </p>
                        {user.photoURL &&
                            <Image width={48} height={48} className="w-10 h-10 rounded-full" src={user.photoURL}
                                   alt="user-photo"/>
                        }

                    </Link>
                    : <Link href={"/auth"}>Einloggen
                    </Link>
                }
            </div>
        </header>
    );
}