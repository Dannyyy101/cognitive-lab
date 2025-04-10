import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "@/lib/firebase/clientApp";
import {LearnedExercise, Role, UserDTO} from "@/types/dtos/userDTO";
import {arrayUnion} from "firebase/firestore";
import {userConverter} from "@/lib/converter/userConverter";

const COLLECTION = "users";

export const getAllUsers = async () => {
    const col = collection(db, COLLECTION).withConverter(userConverter)
    const docs = await getDocs(col)

    return docs.docs.map((user) => user.data()).filter((user) => user !== null)
}

export const getUserById = async (userId: string): Promise<UserDTO | null> => {
    const ref = doc(db, COLLECTION, userId);
    const documentSnapshot = await getDoc(ref);
    return documentSnapshot.exists()
        ? (documentSnapshot.data() as UserDTO)
        : null;
};

export const doesUserExist = async (userId: string) => {
    const ref = doc(db, COLLECTION, userId);
    const documentSnapshot = await getDoc(ref);
    return documentSnapshot.exists();
};

export const changeRoleFromUser = async (userId: string, newRole: Role) => {
    const userCollection = doc(db, COLLECTION, userId)
    await updateDoc(userCollection, {role: newRole});
}

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
        await updateDoc(ref, {learnedExercises: arrayUnion(learnedExercise)});
    } else {
        const temp = [...(user.data() as UserDTO).learnedExercises];
        temp[index] = learnedExercise;
        await updateDoc(ref, {...user, learnedExercises: temp});
    }
};
