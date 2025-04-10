import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase/clientApp";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { createNewUser, doesUserExist } from "@/actions/userActions";

export function onAuthStateChanged(cb: (user: User | null) => void) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle(router: AppRouterInstance) {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);

    if (!(await doesUserExist(result.user.uid))) {
      const user = result.user;
      await createNewUser({
        id: user.uid,
        email: user.email || "",
        displayName: user.displayName || "",
        photoUrl: user.photoURL || "",
        learnedExercises: [],
        role: "user"
      });
    }
    router.push("/");
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}

export const handleSignIn = async (
  event: { preventDefault: () => void },
  router: AppRouterInstance,
) => {
  event.preventDefault();
  await signInWithGoogle(router);
};
