import {
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { SubjectDTO } from "@/types/dtos/subjectDTO";
import { db } from "@/lib/firebase/clientApp";

export const subjectWithExercisesConverter = {
  toFirestore: (subject: SubjectDTO) => {
    const { id: _id, ...subjectWithoutId } = subject;
    return {
      ...subjectWithoutId,
      exercises: subjectWithoutId.exercises.map((exercise) => {
        return doc(db, "exercises", exercise.id)
      }),
      children: subjectWithoutId.children.map((child) =>
        doc(db, "subjects", child.id),
      ),
      parent: subject.parent ? doc(db, "subjects", subject.parent.id) : null,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options: SnapshotOptions,
  ) => {
    const data = snapshot.data(options);

    if (!data) return null;

    return data;
  },
};
