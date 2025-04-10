import { SubjectDTO } from "@/types/dtos/subjectDTO";
import {
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { db } from "@/lib/firebase/clientApp";

export const subjectConverter = {
  toFirestore: (subject: SubjectDTO) => {
    const { id: _id, ...subjectWithoutId } = subject;
    const parent = subject.parent
      ? doc(db, "subjects", subject.parent.id)
      : null;

    const exercises = subject.exercises.map((exercise) =>
      doc(db, "exercises", exercise.id),
    );

    const children = subject.children.map((child) =>
      doc(db, "subjects", child.id),
    );

    return {
      ...subjectWithoutId,
      parent: parent,
      exercises: exercises,
      children: children,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options: SnapshotOptions,
  ) => {
    const data = snapshot.data(options);
    return { ...data, id: snapshot.id }
  },
};
