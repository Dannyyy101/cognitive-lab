'use client'
import React from "react";
import {useUser} from "@/lib/firebase/getUser";

export const UserUnauthorized: React.FC<{ children: React.ReactNode }> = ({children,}) => {
    const {role} = useUser();
    if (role === "admin") {
        return <>{children}</>;
    } else {
        return <main className="w-screen h-screen justify-center items-center flex">
            <section className="w-96 h-96 flex flex-col justify-center items-center">
                <h1 className="text-5xl font-bold">401</h1>
                <p className="text-fgColor_disabled">Unauthorisiert</p>
            </section>
        </main>
    }

}
