import { DocumentReference } from "firebase/firestore";
import { ExerciseBase } from "./exercise";

export interface Subject {
    id: string;
    name: string;
    color: string;
    exercises:ExerciseBase[]
}

export interface SubjectFirebase {
    id: string;
    name: string;
    color: string;
    exercises:DocumentReference[]
}