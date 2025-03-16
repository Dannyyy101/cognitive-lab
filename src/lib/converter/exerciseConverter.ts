import { ExerciseBaseDTO } from "@/types/dtos/exerciseDTO";
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export const exerciseConverter = {
  toFirestore: (exercise: ExerciseBaseDTO) => {
    const { id: _id, ...exerciseWithoutId } = exercise;
    return exerciseWithoutId;
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options: SnapshotOptions,
  ) => {
    const data = snapshot.data(options);

    if (!data) return null;

    return data as ExerciseBaseDTO;
  },
};
