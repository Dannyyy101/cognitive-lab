import { SubjectDTO } from "@/types/dtos/subjectDTO";
import { Subject } from "@/types/models/subject";
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export const subjectConverter = {
    toFirestore: (subject: Subject) => {
        const { id: _id, ...subjectWithoutId } = subject;
        return subjectWithoutId;
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>, options: SnapshotOptions) => {
        const data = snapshot.data(options);

        if (!data) return null;
        const { exercises: _exercises, ...subjectWithoutExercises } = data as SubjectDTO
        return subjectWithoutExercises
    }
};