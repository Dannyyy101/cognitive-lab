import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "@/lib/firebase/clientApp";
import {UserDTO} from "@/types/dtos/userDTO";

const COLLECTION = "users"

export const getUserById = async (userId: string): Promise<UserDTO | null> => {
    const ref = doc(db, COLLECTION, userId)
    const documentSnapshot = await getDoc(ref)
    return documentSnapshot.exists() ? documentSnapshot.data() as UserDTO : null
}

export const createNewUser = async (user: UserDTO) => {
    const dbUser = await getUserById(user.id)
    if (dbUser) {
        return dbUser
    }
    const ref = doc(db, COLLECTION, user.id)
    await setDoc(ref, user)

    return await getUserById(user.id)
}

export const setExercisesLearnedForUser = async (userId: string, learnedExercises: {
    exerciseId: string,
    correct: boolean
}[]) => {
    const ref = doc(db, COLLECTION, userId)
    await updateDoc(ref, {learnedExercises: learnedExercises})
}