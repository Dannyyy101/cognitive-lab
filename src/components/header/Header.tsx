'use client'

import {signOut} from "@/lib/firebase/auth";
import {useUserSession} from "@/hooks/useUserSession";
import {User} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";

export const Header = ({initialUser}: { initialUser: User | null }) => {

    const user = useUserSession(initialUser);

    const handleSignOut = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        await signOut();
    };


    return (
        <header className="absolute top-0 h-20 w-screen z-50 bg-bgColor_muted flex justify-end">
            <div className="w-2/3 flex items-center justify-start ml-5">
            <Link href={"/"} className="text-2xl font-bold">Cognitive Lab</Link>
            </div>
            <div className="flex h-full items-center mr-5 w-1/3 justify-end">
                {user ?
                    <>
                        <button onClick={handleSignOut}>Sign out</button>
                        <p className="mr-4">
                            {user.displayName}
                        </p>
                        {user.photoURL &&
                            <Image width={48} height={48} className="w-10 h-10 rounded-full" src={user.photoURL}
                                   alt="user-photo"/>
                        }

                    </>
                    : <Link href={"/auth"}>Einloggen
                    </Link>
                }
            </div>
        </header>
    );
}