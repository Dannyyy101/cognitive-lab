"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/clientApp";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);

      if (authUser) {
        const idTokenResult = await authUser.getIdTokenResult();
        console.log(idTokenResult.claims.roles);
        setRole(idTokenResult.claims.role as string);
      } else {
        setRole("");
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, role };
}
