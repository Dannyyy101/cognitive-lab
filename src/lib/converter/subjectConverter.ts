import {SubjectDTO} from "@/types/dtos/subjectDTO";
import {doc, DocumentData, QueryDocumentSnapshot, SnapshotOptions} from "firebase/firestore";
import {db} from "@/lib/firebase";

export const subjectConverter = {
    toFirestore: (subject: SubjectDTO) => {
        const {id: _id, ...subjectWithoutId} = subject
        return {...subjectWithoutId, parent: doc(db, "subjects", subject.parent.id)}
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        const {exercises: _exercises, ...subjectWithoutExercises} = data as SubjectDTO
        return {...subjectWithoutExercises, id: snapshot.id}
    }
};