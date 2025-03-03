import { DocumentReference } from "firebase/firestore";
import { ExerciseBase } from "./exercise";

export interface Subject {
    id: string;
    name: string;
    color: string;
    exercises:ExerciseBase[]
}
export interface SubjectWithoutExercises{
    id: string;
    name: string;
    color: string;
}

export interface SubjectFirebase {
    id: string;
    name: string;
    color: string;
    exercises:DocumentReference[]
    parent: DocumentReference
    children: DocumentReference[]
    lastEdited: Date
    createdOn: Date
}