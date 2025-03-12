"use client";

import {onAuthStateChanged, User} from "firebase/auth";
import {useEffect, useState} from "react";
import {auth} from "@/lib/firebase/clientApp";


export function useUser() {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser)
                setUser(authUser);
        });

        return () => unsubscribe();
    }, []);

    return user;
}