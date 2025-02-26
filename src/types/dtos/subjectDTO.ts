import { DocumentReference } from "firebase/firestore";
import { ExerciseBaseDTO } from "./exerciseDTO";

export interface SubjectDTO {
    id: string;
    name: string;
    color: string;
    exercises: ExerciseBaseDTO[];
}

export interface SubjectWithExercisesDTO {
    id: string;
    name: string;
    color: string;
    exercises: ExerciseBaseDTO[];
}

export interface SubjectWithExercisePromisesDTO {
    id: string;
    name: string;
    color: string;
    exercises: DocumentReference[];
}
