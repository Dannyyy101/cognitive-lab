import {
    DocumentData,
    QueryDocumentSnapshot,
    SnapshotOptions,
} from "firebase/firestore";
import {UserDTO} from "@/types/dtos/userDTO";

export const userConverter = {
    toFirestore: (user: UserDTO) => {
        const { learnedExercises: _learnedExercises, ...userWithoutLearnedExercises } = user;
        return userWithoutLearnedExercises;
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options: SnapshotOptions,
    ) => {
        const data = snapshot.data(options);

        if (!data) return null;

        return data as UserDTO;
    },
};
