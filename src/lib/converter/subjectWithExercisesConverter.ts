import { SubjectFirebase } from "@/types/models/subject";
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export const subjectWithExercisesConverter = {
    toFirestore: (subject: SubjectFirebase) => {
        const { id:_id, ...subjectWithoutId } = subject;
        return subjectWithoutId;
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>, options: SnapshotOptions) => {
        const data = snapshot.data(options);

        if (!data) return null;
        
        return data as SubjectFirebase
    }
};
