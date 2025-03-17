import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/clientApp";
import { LearnedExercise, UserDTO } from "@/types/dtos/userDTO";
import { arrayUnion } from "firebase/firestore";

const COLLECTION = "users";

export const getUserById = async (userId: string): Promise<UserDTO | null> => {
  const ref = doc(db, COLLECTION, userId);
  const documentSnapshot = await getDoc(ref);
  return documentSnapshot.exists()
    ? (documentSnapshot.data() as UserDTO)
    : null;
};

export const createNewUser = async (user: UserDTO) => {
  const dbUser = await getUserById(user.id);
  if (dbUser) {
    return dbUser;
  }
  const ref = doc(db, COLLECTION, user.id);
  await setDoc(ref, user);

  return await getUserById(user.id);
};

export const setExerciseLearnedForUser = async (
  userId: string,
  learnedExercise: LearnedExercise,
) => {
  const ref = doc(db, COLLECTION, userId);
  const user = await getDoc(ref);

  if (!user.exists()) return null;

  const index = (user.data() as UserDTO).learnedExercises.findIndex(
    (e) => e.exerciseId === learnedExercise.exerciseId,
  );

  if (index === -1) {
    await updateDoc(ref, { learnedExercises: arrayUnion(learnedExercise) });
  } else {
    const temp = [...(user.data() as UserDTO).learnedExercises];
    temp[index] = learnedExercise;
    await updateDoc(ref, { ...user, learnedExercises: temp });
  }
};
