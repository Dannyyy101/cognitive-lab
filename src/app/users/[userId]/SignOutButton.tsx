"use client";

import { signOut } from "@/lib/firebase/auth";

export const SignOutButton = () => {
  const handleSignout = async () => {
    await signOut();
  };

  return (
    <button
      onClick={handleSignout}
      className="w-32 h-10 bg-bgColor_danger_muted text-fgColor_danger rounded-md"
    >
      Sign out
    </button>
  );
};
