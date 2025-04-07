"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/clientApp";
import {getUserById} from "@/actions/userActions";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);

      if (authUser) {
        const roles = (await getUserById(authUser.uid))?.role;
        setRole(roles as string);
      } else {
        setRole("");
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, role };
}
