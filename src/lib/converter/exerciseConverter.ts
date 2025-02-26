import { ExerciseBaseDTO, ExerciseMultipleChoiceDTO } from "@/types/dtos/exerciseDTO";
import { ExerciseBase } from "@/types/models/exercise";
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export const exerciseConverter = {
    toFirestore: (exercise: ExerciseBase) => {
        const { id:_id, ...exerciseWithoutId } = exercise;
        return exerciseWithoutId;
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>, options: SnapshotOptions) => {
        const data = snapshot.data(options);

        if (!data) return null;

        switch (data.type) {
            case "normal":
                return { ...data, id:snapshot.id } as ExerciseBaseDTO;
            case "multiple-choice":
                return { ...data } as ExerciseMultipleChoiceDTO;
            default:
                return { ...data } as ExerciseBaseDTO;
        }
    }
};
