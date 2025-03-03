import { SubjectDTO } from "@/types/dtos/subjectDTO";
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export const subjectConverter = {
    toFirestore: (subject: SubjectDTO) => {
        return subject
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        const { exercises: _exercises, ...subjectWithoutExercises } = data as SubjectDTO
        return {...subjectWithoutExercises, id: snapshot.id}
    }
};